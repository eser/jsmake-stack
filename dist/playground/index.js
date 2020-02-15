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

function reverseArray(instance) {
    const arrInstance = (instance.constructor === Array) ?
        instance :
        [...instance];
    return arrInstance.reduce((obj, itemValue) => ([itemValue, ...obj]), []);
}

function test() {
    console.log('ponyfills:');
    console.log(arrayFrom);
    console.log(arrayFrom(['a', 'b']));
    console.log('immunity:');
    console.log(reverseArray);
    console.log(reverseArray(['a', 'b']));
}

export { test };
