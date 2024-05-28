import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        include: ['packages/**/src/**/*.test.ts'],
        exclude: ['node_modules', 'dist'],
        retry: 1,
        coverage: {
            provider: 'istanbul',
            reporter: ['lcov', 'text'],
            skipFull: true,
            include: ['packages/**/src/**/*.ts'],
            thresholds: {
                global: {
                    lines: 80
                }
            },
            exclude: ['packages/**/src/schemas/*']
        }
    }
})
