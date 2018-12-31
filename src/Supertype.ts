import { ObjectTemplate } from './ObjectTemplate';
import * as serializer from './serializer';
import { UtilityFunctions } from './UtilityFunctions';

type DefinePropertyType = { type: any, of: any, body: any, on: any, validate: any, value: any };
export type Constructable = new (...args: any[]) => {};

/**
 * This is the base class for typescript classes. 
 * It will inject members into the object from both the template and objectTemplate
 * @param {ObjectTemplate} - other layers can pass in their own object template (this is the object not ObjectTemplate)
 * @returns {Object} the object itself
 */

export class Supertype {
    /**
     * The constructor, or the class definition itself.
     * @type {typeof Supertype}
     * @memberof Supertype
     */
    __template__: typeof Supertype;

    /**
    * The constructor, or the class definition itself.
    * @type {typeof Supertype}
    * @memberof Supertype
    */
    amorphicClass: typeof Supertype;

    amorphic: typeof ObjectTemplate;
    __name__: string;
    static __injections__: Array<Function> = [];
    static isObjectTemplate = true;
    static amorphicProperties: any;
    static amorphicChildClasses: Array<Constructable>;
    static amorphicParentClass: Constructable;
    static amorphicClassName: string;
    static amorphicStatic: typeof ObjectTemplate;
    static __objectTemplate__ = ObjectTemplate;

    /**
     * @TODO: Doublecheck this true/true setup
     */
    static __toClient__ = true;
    static __toServer__ = true;
    static __shadowChildren__ = [];

    // Object members
    __id__: string;
    amorphicLeaveEmpty: boolean;

    // Deprecated legacy naming
    static __children__: Array<Supertype>;
    static __parent__: typeof Supertype;
    __amorphicprops__: any;
    __exceptions__: any;
    static amorphicCreateProperty(prop: string, defineProperty: DefinePropertyType) {
        if (defineProperty.body) {
            this.prototype[prop] = ObjectTemplate._setupFunction(prop, defineProperty.body, defineProperty.on, defineProperty.validate);
        }
        else {
            this.prototype.__amorphicprops__[prop] = defineProperty;
            if (typeof defineProperty.value in ['string', 'number'] || defineProperty.value == null) {
                Object.defineProperty(this.prototype, prop, { enumerable: true, writable: true, value: defineProperty.value });
            }
            else {
                Object.defineProperty(this.prototype, prop,
                    {
                        enumerable: true,
                        get: () => {
                            if (!this['__' + prop]) {
                                this['__' + prop] =
                                    ObjectTemplate.clone(defineProperty.value, defineProperty.of || defineProperty.type || null);
                            }
                            return this['__' + prop];
                        },
                        set: (value) => {
                            this['__' + prop] = value;
                        }
                    });
            }
        }
    }

    static amorphicGetProperties(includeVirtualProperties?: boolean): any {
        // Implemented in the decorator @supertypeClass
    }
    static amorphicFromJSON(json: string, idPrefix) {
        return ObjectTemplate.fromJSON(json, this, idPrefix);
    }

    /**
     * Legacy 
     *
     * @static
     * @param {string} prop
     * @param {Object} defineProperty
     * @memberof Supertype
     */
    static createProperty(prop: string, defineProperty: DefinePropertyType) {
        if (defineProperty.body) {
            this.prototype[prop] = ObjectTemplate._setupFunction(prop, defineProperty.body, defineProperty.on, defineProperty.validate);
        }
        else {
            this.prototype.__amorphicprops__[prop] = defineProperty;
            if (typeof defineProperty.value in ['string', 'number'] || defineProperty.value == null) {
                Object.defineProperty(this.prototype, prop, { enumerable: true, writable: true, value: defineProperty.value });
            }
            else {
                Object.defineProperty(this.prototype, prop,
                    {
                        enumerable: true,
                        get: () => {
                            if (!this['__' + prop]) {
                                this['__' + prop] =
                                    ObjectTemplate.clone(defineProperty.value, defineProperty.of || defineProperty.type || null);
                            }
                            return this['__' + prop];
                        },
                        set: (value) => {
                            this['__' + prop] = value;
                        }
                    });
            }
        }
    }
    static getProperties() {
        // Implemented in the decorator @supertypeClass
    }
    amorphicGetClassName(): string {
        // Implemented in the decorator @supertypeClass
        return '';
    }

    /**
     * Legacy 
     *
     * @static
     * @param {string} json
     * @param {string} [idPrefix]
     * @memberof Supertype
     */
    static fromJSON(json: string, idPrefix?: string) {
        return ObjectTemplate.fromJSON(json, this, idPrefix);
    }

    static fromPOJO(pojo) {
        return ObjectTemplate.fromPOJO(pojo, this);
    }

    static inject(injector: any) {
        // Implemented in Line 128, of ObjectTemplate.ts (static performInjections)
    }
    constructor(objectTemplate = ObjectTemplate) {
        var template = this.__template__;
        if (!template) {
            throw new Error(UtilityFunctions.constructorName(Object.getPrototypeOf(this).constructor) + ' missing @supertypeClass');
        }

        // Tell constructor not to execute as this is an empty object
        this.amorphicLeaveEmpty = objectTemplate._stashObject(this, template);

        // Template level injections that the application may use
        var targetTemplate = template;
        while (targetTemplate) {
            for (var ix = 0; ix < targetTemplate.__injections__.length; ++ix) {
                targetTemplate.__injections__[ix].call(this, this);
            }
            targetTemplate = targetTemplate.__parent__;
        }

        // Global injections used by the framework
        for (var j = 0; j < objectTemplate.__injections__.length; ++j) {
            objectTemplate.__injections__[j].call(this, this);
        }

        this.amorphic = objectTemplate;
        this.__template__ = this.constructor as typeof Supertype;
        this.amorphicClass = this.constructor as typeof Supertype;

        if (this.__exceptions__) {
            objectTemplate.__exceptions__ = objectTemplate.__exceptions__ || [];
            for (var exceptionKey in this.__exceptions__) {
                objectTemplate.__exceptions__.push({
                    func: this.__exceptions__[exceptionKey],
                    class: UtilityFunctions.getName,
                    prop: exceptionKey
                });
            }
        }

        //@TODO: fill the properties of 'this' in? do I need this after deleting the callerContext approach
        // https://github.com/haven-life/supertype/issues/7
        return this;
    }
    amorphicToJSON(cb?) {
        return serializer.toJSONString(this, cb);
    }

    amorphicGetPropertyDefinition(prop) {
        return ObjectTemplate._getDefineProperty(prop, this.__template__);
    }
    amorphicGetPropertyValues(prop) {
        var defineProperty = this.__prop__(prop) || this.__prop__('_' + prop);

        if (typeof (defineProperty.values) === 'function') {
            return defineProperty.values.call(this);
        }
        return defineProperty.values;
    }
    amorphicGetPropertyDescriptions(prop) {
        var defineProperty = this.__prop__(prop) || this.__prop__('_' + prop);

        if (typeof (defineProperty.descriptions) === 'function') {
            return defineProperty.descriptions.call(this);
        }

        return defineProperty.descriptions;
    }

    createCopy(creator) {
        var obj = this;
        return ObjectTemplate.fromPOJO(obj, obj.__template__, null, null, undefined, null, null, creator);
    }

    inject(injector) {
        ObjectTemplate.inject(this, injector);
    }

    copyProperties(obj) {
        for (var prop in obj) {
            this[prop] = obj[prop];
        }
    }
    __prop__(prop) {
        return this.amorphicGetPropertyDefinition(prop);
    }
    __values__(prop) {
        return this.amorphicGetPropertyValues(prop);
    }
    __descriptions__(prop) {
        return this.amorphicGetPropertyDescriptions(prop);
    }
    toJSONString(cb?) {
        return this.amorphicToJSON(cb)
    }
}