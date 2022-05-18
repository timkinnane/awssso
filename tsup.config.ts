import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.tsx'],
	loader: {
		'.md': 'file'
	},
	splitting: false,
	sourcemap: true,
	clean: true,
	target: 'node16.15.0'
})
