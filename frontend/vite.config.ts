import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    base: process.env.VITE_BASE_URL || "/",
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api": {
          target: process.env.VITE_BACKEND_URL || "http://localhost:8000",
          changeOrigin: false,
        },
      },
    },
    plugins: [react()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
