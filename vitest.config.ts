import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			enabled: true,
			provider: 'v8',
			reporter: ['text', 'text-summary', 'html'],
			all: true,
			include: ['src/**/*.ts'],
			exclude: [
				'**/*.test.ts',
				'src/tests/**',
				'build/**',
				'src/domain/repositories/**',
			],
		},
	},
});
