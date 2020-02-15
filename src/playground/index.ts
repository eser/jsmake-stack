import * as ponyfills from '../ponyfills/index';
import * as immunity from '../immunity/index';

function test() {
    console.log('ponyfills:');
    console.log(ponyfills.arrayFrom);
    console.log(ponyfills.arrayFrom([ 'a', 'b' ]));

    console.log('immunity:');
    console.log(immunity.reverseArray);
    console.log(immunity.reverseArray([ 'a', 'b' ]));
}

export {
    test,
};
