import typescript from 'rollup-plugin-typescript2';


const plugins = [
  typescript({tsconfigOverride: { compilerOptions: { module: 'ESNext'} }})
]

export default [
  {
    input: './src/index.ts',
    plugins: plugins,
    output: {
      dir: 'dist/esm',
      format: 'esm'
    }
  },
  {
    input: './src/index.ts',
    plugins: plugins,
    output: {
      dir: 'dist/lib',
      format: 'cjs'
    }
  },
]
