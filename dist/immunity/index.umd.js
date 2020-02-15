(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.immunity = {}));
}(this, (function (exports) { 'use strict';

    function appendToArray(instance, ...values) {
        return [
            ...instance,
            ...values,
        ];
    }

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

    function appendToObject(instance, ...values) {
        return objectAssign({}, instance, ...values);
    }

    function copy(instance) {
        const Type = instance.constructor;
        return Object.keys(instance).reduce((obj, itemKey) => {
            if (!(instance[itemKey] instanceof Function) && (instance[itemKey] instanceof Object)) {
                return objectAssign(new Type(), obj, {
                    [itemKey]: copy(instance[itemKey]),
                });
            }
            return objectAssign(new Type(), obj, {
                [itemKey]: instance[itemKey],
            });
        }, new Type());
    }

    function dropFromArray(instance, n) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        return arrInstance.slice(n);
    }

    function dropFromObject(instance, n) {
        const keys = Object.keys(instance);
        let index = 0;
        return keys.reduce((obj, itemKey) => {
            if (n > index) {
                index += 1;
                return obj;
            }
            return objectAssign({}, obj, {
                [itemKey]: instance[itemKey],
            });
        }, {});
    }

    function filterArray(instance, predicate) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        return arrInstance.filter(predicate);
    }

    function filterObject(instance, predicate) {
        return Object.keys(instance).reduce((obj, itemKey) => {
            if (predicate(instance[itemKey], itemKey, obj)) {
                return objectAssign({}, obj, {
                    [itemKey]: instance[itemKey],
                });
            }
            return obj;
        }, {});
    }

    function mapArray(instance, predicate) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        return arrInstance.map(predicate);
    }

    function mapObject(instance, predicate) {
        return Object.keys(instance).reduce((obj, itemKey) => {
            const value = predicate(instance[itemKey], itemKey, obj);
            if (value !== null) {
                return objectAssign({}, obj, value);
            }
            return obj;
        }, {});
    }

    function mergeArrays(...arrays) {
        return arrays.reduce((obj, array) => [...obj, ...array], []);
    }

    function mergeObjects(...objects) {
        return objectAssign({}, ...objects);
    }

    function pickFromArray(instance, items) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        const arrItems = (items.constructor === Array) ?
            items :
            [...items];
        return arrInstance.reduce((obj, itemValue) => {
            if (arrItems.indexOf(itemValue) !== -1) {
                return {
                    items: [...obj.items, itemValue],
                    rest: obj.rest,
                };
            }
            return {
                items: obj.items,
                rest: [...obj.rest, itemValue],
            };
        }, {
            items: [],
            rest: [],
        });
    }

    function pickFromObject(instance, items) {
        const keys = Object.keys(instance);
        return keys.reduce((obj, itemKey) => {
            if (items.indexOf(itemKey) !== -1) {
                return {
                    items: objectAssign({}, obj.items, { [itemKey]: instance[itemKey] }),
                    rest: obj.rest,
                };
            }
            return {
                items: obj.items,
                rest: objectAssign({}, obj.rest, { [itemKey]: instance[itemKey] }),
            };
        }, {
            items: {},
            rest: {},
        });
    }

    function prependToArray(instance, ...values) {
        return [
            ...values,
            ...instance,
        ];
    }

    function prependToObject(instance, ...values) {
        return objectAssign({}, ...values, instance);
    }

    function removeFirstMatchFromArray(instance, predicate) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        let notFound = true;
        return arrInstance.filter((itemValue, itemKey, obj) => {
            if (notFound && predicate(itemValue, itemKey, obj)) {
                notFound = false;
                return false;
            }
            return true;
        });
    }

    function removeFirstMatchFromObject(instance, predicate) {
        let notFound = true;
        return Object.keys(instance).reduce((obj, itemKey) => {
            if (notFound && predicate(instance[itemKey], itemKey, obj)) {
                notFound = false;
                return obj;
            }
            return objectAssign({}, obj, {
                [itemKey]: instance[itemKey],
            });
        }, {});
    }

    function removeFromArray(instance, ...values) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        return arrInstance.filter(item => values.indexOf(item) === -1);
    }

    function removeKeyFromObject(instance, ...keys) {
        return Object.keys(instance).reduce((obj, itemKey) => {
            if (keys.indexOf(itemKey) === -1) {
                return objectAssign({}, obj, {
                    [itemKey]: instance[itemKey],
                });
            }
            return obj;
        }, {});
    }

    function removeValueFromObject(instance, ...values) {
        return Object.keys(instance).reduce((obj, itemKey) => {
            if (values.indexOf(instance[itemKey]) === -1) {
                return objectAssign({}, obj, {
                    [itemKey]: instance[itemKey],
                });
            }
            return obj;
        }, {});
    }

    function reverseArray(instance) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        return arrInstance.reduce((obj, itemValue) => ([itemValue, ...obj]), []);
    }

    function reverseObject(instance) {
        const keys = Object.keys(instance);
        return keys.reduce((obj, itemKey) => objectAssign({}, { [itemKey]: instance[itemKey] }, obj), {});
    }

    function splitArray(instance, n) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        return {
            items: arrInstance.slice(0, n),
            rest: arrInstance.slice(n),
        };
    }

    function splitObject(instance, n) {
        const keys = Object.keys(instance);
        let index = 0;
        return keys.reduce((obj, itemKey) => {
            if (index < n) {
                index += 1;
                return {
                    items: objectAssign({}, obj.items, { [itemKey]: instance[itemKey] }),
                    rest: obj.rest,
                };
            }
            return {
                items: obj.items,
                rest: objectAssign({}, obj.rest, { [itemKey]: instance[itemKey] }),
            };
        }, {
            items: {},
            rest: {},
        });
    }

    function takeFromArray(instance, n) {
        const arrInstance = (instance.constructor === Array) ?
            instance :
            [...instance];
        return arrInstance.slice(0, n);
    }

    function takeFromObject(instance, n) {
        let index = 0;
        return Object.keys(instance).reduce((obj, itemKey) => {
            if (index < n) {
                index += 1;
                return objectAssign({}, obj, { [itemKey]: instance[itemKey] });
            }
            return obj;
        }, {});
    }

    const library = {
        appendToArray,
        appendToObject,
        copy,
        dropFromArray,
        dropFromObject,
        filterArray,
        filterObject,
        mapArray,
        mapObject,
        mergeArrays,
        mergeObjects,
        pickFromArray,
        pickFromObject,
        prependToArray,
        prependToObject,
        removeFirstMatchFromArray,
        removeFirstMatchFromObject,
        removeFromArray,
        removeKeyFromObject,
        removeValueFromObject,
        reverseArray,
        reverseObject,
        splitArray,
        splitObject,
        takeFromArray,
        takeFromObject,
    };

    exports.appendToArray = appendToArray;
    exports.appendToObject = appendToObject;
    exports.copy = copy;
    exports.default = library;
    exports.dropFromArray = dropFromArray;
    exports.dropFromObject = dropFromObject;
    exports.filterArray = filterArray;
    exports.filterObject = filterObject;
    exports.mapArray = mapArray;
    exports.mapObject = mapObject;
    exports.mergeArrays = mergeArrays;
    exports.mergeObjects = mergeObjects;
    exports.pickFromArray = pickFromArray;
    exports.pickFromObject = pickFromObject;
    exports.prependToArray = prependToArray;
    exports.prependToObject = prependToObject;
    exports.removeFirstMatchFromArray = removeFirstMatchFromArray;
    exports.removeFirstMatchFromObject = removeFirstMatchFromObject;
    exports.removeFromArray = removeFromArray;
    exports.removeKeyFromObject = removeKeyFromObject;
    exports.removeValueFromObject = removeValueFromObject;
    exports.reverseArray = reverseArray;
    exports.reverseObject = reverseObject;
    exports.splitArray = splitArray;
    exports.splitObject = splitObject;
    exports.takeFromArray = takeFromArray;
    exports.takeFromObject = takeFromObject;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
