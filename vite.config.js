import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/rapidmatedesktop/',
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://16.171.224.246:3009', // Your backend server
  //       changeOrigin: true,
  //       secure: false, // Set to true if your backend supports HTTPS
  //     },
  //   },
  // },
  build: {
    target: 'esnext', // Optimize for modern JavaScript
    cssCodeSplit: true, // Enable CSS splitting for better performance
    sourcemap: false, // Disable source maps for production builds
    minify: 'esbuild', // Use esbuild for faster minification
    rollupOptions: {
      input: '/index.html',

     /*  output: {
        // Avoid chunk file name issues
        manualChunks: undefined,
      },
      onwarn(warning, warn) {
        // Suppress eval warnings for lottie-web used by lottie-react
        if (warning.code === 'EVAL' && /lottie-web/.test(warning.id)) {
          console.warn('Warning suppressed:', warning.message);
          return;
        }
        warn(warning); // Log other warnings
      }, */
    },
  },
  server: {
    // Add this to catch all routes and redirect them to index.html
    historyApiFallback: true
  },
  optimizeDeps: {
    include: ['lottie-react'], // Pre-bundle lottie-react for better optimization
  },
});
