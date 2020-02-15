(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ponyfills = {}));
}(this, (function (exports) { 'use strict';

    function arrayFromPolyfill(source, mapFn, thisArg) {
        const caller = (thisArg === null || thisArg === undefined) ? this : thisArg;
        if (source === null || source === undefined) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }
        if (mapFn !== null && mapFn !== undefined) {
            if (!(mapFn instanceof Function)) {
                throw new TypeError('Array.from: when provided, the second argument must be a function');
            }
            const result = [...source].reduce((prev, curr, idx) => ([...prev, mapFn.call(caller, curr, idx)]), []);
            return result;
        }
        return [...source];
    }
    const arrayFrom = (Array.hasOwnProperty('from') ? Array.from : arrayFromPolyfill);

    function objectAssignPolyfill(target, ...sources) {
        sources.forEach((source) => {
            if (source === null || source === undefined) {
                return;
            }
            Object.getOwnPropertyNames(source).forEach((key) => {
                target[key] = source[key];
            });
        });
        return target;
    }
    const objectAssign = (Object.hasOwnProperty('assign') ? Object.assign : objectAssignPolyfill);

    function reflectOwnKeysPolyfill(source) {
        return [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)];
    }
    const reflectOwnKeys = (Reflect.hasOwnProperty('ownKeys') ? Reflect.ownKeys : reflectOwnKeysPolyfill);

    function objectEntriesPolyfill(source) {
        const keys = reflectOwnKeys(source);
        const result = keys.reduce((prev, curr) => {
            if (curr.constructor === String && source.propertyIsEnumerable(curr)) {
                return [...prev, [curr, source[curr]]];
            }
            return prev;
        }, []);
        return result;
    }
    const objectEntries = (Object.hasOwnProperty('entries') ? Object.entries : objectEntriesPolyfill);

    function objectValuesPolyfill(source) {
        const keys = reflectOwnKeys(source);
        const result = keys.reduce((prev, curr) => {
            if (curr.constructor === String && source.propertyIsEnumerable(curr)) {
                return [...prev, source[curr]];
            }
            return prev;
        }, []);
        return result;
    }
    const objectValues = (Object.hasOwnProperty('values') ? Object.values : objectValuesPolyfill);

    const library = {
        arrayFrom,
        arrayFromPolyfill,
        objectAssign,
        objectAssignPolyfill,
        objectEntries,
        objectEntriesPolyfill,
        objectValues,
        objectValuesPolyfill,
        reflectOwnKeys,
        reflectOwnKeysPolyfill,
    };

    exports.arrayFrom = arrayFrom;
    exports.arrayFromPolyfill = arrayFromPolyfill;
    exports.default = library;
    exports.objectAssign = objectAssign;
    exports.objectAssignPolyfill = objectAssignPolyfill;
    exports.objectEntries = objectEntries;
    exports.objectEntriesPolyfill = objectEntriesPolyfill;
    exports.objectValues = objectValues;
    exports.objectValuesPolyfill = objectValuesPolyfill;
    exports.reflectOwnKeys = reflectOwnKeys;
    exports.reflectOwnKeysPolyfill = reflectOwnKeysPolyfill;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
