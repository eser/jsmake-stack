import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
// import dts from 'rollup-plugin-dts';
import typescriptModule from 'typescript';
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
            external: [
                ...Object.keys(pkg.dependencies || {}),
                ...Object.keys(pkg.peerDependencies || {}),
                'ponyfills',
                'immunity',
                'evangelist',
                'enthusiast',
                'servicemanager',
                'cofounder',
                'senior',
                'maester',
                'consultant',
                'jsmake',
            ],
            plugins: [
                (argTarget !== 'playground') && alias({
                    entries: [
                        // { find: '../../ponyfills', replacement: 'ponyfills' },
                        // { find: '../ponyfills', replacement: 'ponyfills' },

                        // { find: '../../immunity', replacement: 'immunity' },
                        // { find: '../immunity', replacement: 'immunity' },

                        // { find: '../../evangelist', replacement: 'evangelist' },
                        // { find: '../evangelist', replacement: 'evangelist' },

                        // { find: '../../enthusiast', replacement: 'enthusiast' },
                        // { find: '../enthusiast', replacement: 'enthusiast' },

                        // { find: '../../servicemanager', replacement: 'servicemanager' },
                        // { find: '../servicemanager', replacement: 'servicemanager' },

                        // { find: '../../cofounder', replacement: 'cofounder' },
                        // { find: '../cofounder', replacement: 'cofounder' },

                        // { find: '../../senior', replacement: 'senior' },
                        // { find: '../senior', replacement: 'senior' },

                        // { find: '../../maester', replacement: 'maester' },
                        // { find: '../maester', replacement: 'maester' },

                        // { find: '../../consultant', replacement: 'consultant' },
                        // { find: '../consultant', replacement: 'consultant' },

                        // { find: '../../jsmake', replacement: 'jsmake' },
                        // { find: '../jsmake', replacement: 'jsmake' },
                    ],
                }),
                typescript({
                    typescript: typescriptModule,
                    useTsconfigDeclarationDir: true,
                    tsconfigOverride: {
                        compilerOptions: {
                            declaration: true,
                            declarationDir: `./tmp/declarations/${argTarget}`,
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
        //     input: `./tmp/declarations/${argTarget}/**/*.d.ts`,
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
