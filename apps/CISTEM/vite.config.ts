import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const r = (...segments: string[]) => path.resolve(__dirname, ...segments);

export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [r("../../interfaces/web/styles")],
      },
    },
  },

  resolve: {
    alias: {
      "@": r("./src"),
      "@styles": r("../../interfaces/web/styles"),
      "@front": r("../../interfaces/web"),
      "@pkg": r("../../packages"),
      "@session": r("../../packages/hooks/ctx.ts"),
      "@db": r("../../packages/types/Database.ts"),
      "@client": r("../../packages/functions/Client.ts")
    },
  },

  optimizeDeps: {
    exclude: [
      "@pkg",
      "@front",
      "@session",
      "@db",
      "@client"
    ],
  },

  define: {
    "process.env": {},
  },

  server: {
    proxy: {
      "/supabase": {
        target: "https://twavujkympalstdxyxti.supabase.co",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/supabase/, ""),
      },
    },

    fs: {
      allow: [
        r("."),
        r("../../interfaces"),
        r("../../packages"),
        r("../../interfaces")
      ],
    },

    watch: {
      usePolling: false
    },
    hmr: {
      overlay: true,
      // @ts-expect-error
      fullReload: [
        "../../packages/**",
        "../../interfaces/web/**/*.{js,ts,jsx,tsx}",
      ],
    },
  },
});
