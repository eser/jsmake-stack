(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.evangelist = {}));
}(this, (function (exports) { 'use strict';

    function compose(...funcs) {
        return funcs.reduce((previousFunction, currentFunction) => (...args) => currentFunction(previousFunction(...args)));
    }

    function curry(func, ...args) {
        return (...args2) => func(...args, ...args2);
    }

    function curryRight(func, ...args) {
        return (...args2) => func(...args2, ...args);
    }

    function decorate(target, decorator) {
        return function func(...args) {
            return decorator(...args, target);
        };
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function dispatcher(state, mutators, subscribers) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasSubscribers = (subscribers !== undefined);
            let index = 0;
            const next = (newState) => __awaiter(this, void 0, void 0, function* () {
                const layer = mutators[index];
                if (layer === undefined) {
                    return newState;
                }
                index += 1;
                return layer(newState, (currentState) => __awaiter(this, void 0, void 0, function* () {
                    if (hasSubscribers) {
                        subscribers.forEach((subscriber) => {
                            subscriber({ action: layer.name, previousState: newState, newState: currentState });
                        });
                    }
                    return next(currentState);
                }));
            });
            return next(state);
        });
    }

    function emitter(events, eventName, args, subscribers) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEventWildcard = (eventName === '*');
            const argsPass = (args !== undefined) ? args : [];
            for (const eventKey of Object.keys(events)) {
                if (!isEventWildcard && eventName !== eventKey) {
                    continue;
                }
                for (const eventSubscriber of events[eventKey]) {
                    if (subscribers !== undefined) {
                        subscribers.forEach((subscriber) => {
                            subscriber({ event: eventKey, subscriber: eventSubscriber.name, args: args });
                        });
                    }
                    yield eventSubscriber(...argsPass);
                }
            }
        });
    }

    function iterate(iterable, func) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const value of yield iterable) {
                yield func(value);
            }
        });
    }

    const library = {
        compose,
        curry,
        curryRight,
        decorate,
        dispatcher,
        emitter,
        iterate,
    };

    exports.compose = compose;
    exports.curry = curry;
    exports.curryRight = curryRight;
    exports.decorate = decorate;
    exports.default = library;
    exports.dispatcher = dispatcher;
    exports.emitter = emitter;
    exports.iterate = iterate;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
