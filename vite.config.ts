import { defineConfig } from 'vite';

export default defineConfig({
    base: '/game-box/',
    root: '.',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        target: 'es2022',
    },
    server: {
        port: 5173,
        open: true,
    },
});
