import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Ensures it's accessible externally
    port: 5173, // Explicitly define the port (or change if needed)
    strictPort: true, // Ensures Vite doesn't switch ports automatically
  },
  build: {
    outDir: "dist", // Ensure output directory is correct for Vercel
  },
});
