import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["react-datetime-picker"])],
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "src/assets/variables.scss";',
      },
    },
  },
});
