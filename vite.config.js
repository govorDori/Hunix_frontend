import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
	plugins: [
		tailwindcss(),
	],
	build: {
		chunkSizeWarningLimit: 2600,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.js',
		css: true,
		// reporters: [
		// 	'default',
		// 	['json', { outputFile: 'results.json' }]
		// ]

	}
})