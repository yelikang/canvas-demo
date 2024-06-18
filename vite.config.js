import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue2'
import VitePluginStyleInject from 'vite-plugin-style-inject'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'vite-plugin-commonjs'
import visualizer from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VitePluginStyleInject(), commonjs(), visualizer()],
    base: './',
    resolve: {
        alias: {
            '@': resolve(__dirname, './src/')
        },
        extensions: ['.js', '.vue']
    },
    server: {
        host: 'localhost',
        port: 8082,
        proxy: {}
    },
    build: {
        outDir: 'lib',
        lib: {
            entry: resolve(__dirname, './src/canvas/list.vue'),
            formats: ['es'],
            fileName: 'canvas-list'
        },
        rollupOptions: {
            plugins: [terser()],
            external: ['axios', 'vue']
        }
    },
    define: {
        'process.env': {}
    }
})
