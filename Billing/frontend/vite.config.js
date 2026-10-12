import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    proxy: {
      "/user": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/vendor-customer": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/item": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/stock": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/purchase": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/sale": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [react()],
});
