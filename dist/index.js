/* Copyright 2011-2012 Sam Elsamman
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*
 * ObjectTemplate - n Type System with Benefits
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ObjectTemplate", "./SupertypeLogger", "./Supertype", "./decorators"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectTemplate_1 = require("./ObjectTemplate");
    ObjectTemplate_1.ObjectTemplate.init();
    exports.default = ObjectTemplate_1.ObjectTemplate;
    var amorphicStatic = ObjectTemplate_1.ObjectTemplate.amorphicStatic;
    exports.amorphicStatic = amorphicStatic;
    var SupertypeSession = ObjectTemplate_1.ObjectTemplate.amorphicStatic;
    exports.SupertypeSession = SupertypeSession;
    var SupertypeLogger_1 = require("./SupertypeLogger");
    exports.SupertypeLogger = SupertypeLogger_1.SupertypeLogger;
    var Supertype_1 = require("./Supertype");
    exports.Supertype = Supertype_1.Supertype;
    var decorators_1 = require("./decorators");
    exports.supertypeClass = decorators_1.supertypeClass;
    exports.property = decorators_1.property;
    exports.remote = decorators_1.remote;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNIOztHQUVHOzs7Ozs7Ozs7Ozs7SUFFSCxtREFBZ0Q7SUFFaEQsK0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixrQkFBZSwrQkFBYyxDQUFDO0lBRTlCLElBQUksY0FBYyxHQUFHLCtCQUFjLENBQUMsY0FBYyxDQUFDO0lBRzNDLHdDQUFjO0lBRnRCLElBQUksZ0JBQWdCLEdBQUcsK0JBQWMsQ0FBQyxjQUFjLENBQUM7SUFFN0IsNENBQWdCO0lBQ3hDLHFEQUFrRDtJQUExQyw0Q0FBQSxlQUFlLENBQUE7SUFDdkIseUNBQXNDO0lBQTlCLGdDQUFBLFNBQVMsQ0FBQTtJQUNqQiwyQ0FBOEQ7SUFBdEQsc0NBQUEsY0FBYyxDQUFBO0lBQUUsZ0NBQUEsUUFBUSxDQUFBO0lBQUUsOEJBQUEsTUFBTSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTEtMjAxMiBTYW0gRWxzYW1tYW5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbiBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbiBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbiB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG4gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG4gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4gTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTlxuIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG4vKlxuICogT2JqZWN0VGVtcGxhdGUgLSBuIFR5cGUgU3lzdGVtIHdpdGggQmVuZWZpdHNcbiAqL1xuXG5pbXBvcnQge09iamVjdFRlbXBsYXRlfSBmcm9tICcuL09iamVjdFRlbXBsYXRlJztcblxuT2JqZWN0VGVtcGxhdGUuaW5pdCgpO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0VGVtcGxhdGU7XG5cbmxldCBhbW9ycGhpY1N0YXRpYyA9IE9iamVjdFRlbXBsYXRlLmFtb3JwaGljU3RhdGljO1xubGV0IFN1cGVydHlwZVNlc3Npb24gPSBPYmplY3RUZW1wbGF0ZS5hbW9ycGhpY1N0YXRpYztcblxuZXhwb3J0IHthbW9ycGhpY1N0YXRpYywgU3VwZXJ0eXBlU2Vzc2lvbn07XG5leHBvcnQge1N1cGVydHlwZUxvZ2dlcn0gZnJvbSAnLi9TdXBlcnR5cGVMb2dnZXInO1xuZXhwb3J0IHtTdXBlcnR5cGV9IGZyb20gJy4vU3VwZXJ0eXBlJztcbmV4cG9ydCB7c3VwZXJ0eXBlQ2xhc3MsIHByb3BlcnR5LCByZW1vdGV9IGZyb20gJy4vZGVjb3JhdG9ycyc7Il19