class CustomIterator {
    constructor(nextPointer) {
        this.nextPointer = nextPointer;
    }
    next() {
        const result = this.nextPointer();
        if (result !== null) {
            return { done: false, value: result };
        }
        return { done: true, value: null };
    }
    [Symbol.iterator]() {
        return this;
    }
}

function fromNodeStream(source, size) {
    return new Promise((resolve, reject) => {
        source.on('readable', () => {
            const nextPointer = () => {
                const buffer = source.read(size);
                if (buffer === null) {
                    return null;
                }
                return { type: 'chunk', data: buffer };
            };
            resolve(new CustomIterator(nextPointer));
        });
    });
}

function toNodeStream(target) {
    return (value) => new Promise((resolve, reject) => {
        const errorCallback = err => reject(err);
        target.on('error', errorCallback);
        target.write(value, () => resolve(value));
        target.removeListener('error', errorCallback);
    });
}

const library = {
    fromNodeStream,
    CustomIterator,
    toNodeStream,
};

export default library;
export { CustomIterator, fromNodeStream, toNodeStream };
