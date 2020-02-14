//? if (target === 'playground' || target === 'immunity') {
//? if (target === 'playground') {
import * as ponyfills from '../ponyfills/index';
//? } else {
import * as ponyfills from 'ponyfills';
//? }

function test() {
    console.log('here:');
    console.log(ponyfills.test);
    console.log(ponyfills.test());
}

export {
    test,
};
//? }
