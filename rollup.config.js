import metascript from 'rollup-plugin-metascript';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

export default (args) => {
    const argTarget = args.target || 'playground';

    // eslint-disable-next-line no-param-reassign
    delete args.target;

    return [
        {
            input: `./src/${argTarget}/index.ts`,
            output: [
                // browser-friendly UMD build
                {
                    file: `./dist/${argTarget}/index.umd.js`,
                    format: 'umd',
                    exports: 'named',
                    name: argTarget,
                },
                // browser-friendly UMD build (minified)
                {
                    file: `./dist/${argTarget}/index.umd.min.js`,
                    format: 'umd',
                    exports: 'named',
                    name: argTarget,
                },
                // ES module
                {
                    file: `./dist/${argTarget}/index.js`,
                    format: 'es',
                },
                // ES module (minified)
                {
                    file: `./dist/${argTarget}/index.min.js`,
                    format: 'es',
                },
            ],
            external: [], // Object.keys(pkg.dependencies),
            plugins: [
                metascript({
                    scope: {
                        target: argTarget,
                    },
                }),
                typescript({
                    tsconfigOverride: {
                        compilerOptions: {
                            declaration: false,
                            module: 'es2015',
                        },
                    },
                }),
                terser({
                    include: [ /^.+\.min\.js$/ ],
                }),
                sizeSnapshot(),
            ],
        },
        // {
        //     input: `./dist/${argTarget}/index.d.ts`,
        //     output: [
        //         // ES module
        //         {
        //             file: `./dist/${argTarget}/index.d.ts`,
        //             format: 'es',
        //         },
        //     ],
        //     plugins: [
        //         dts(),
        //     ],
        // },
    ];
};
