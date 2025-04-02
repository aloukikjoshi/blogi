import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // or switch to @vitejs/plugin-react if preferred
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "::", // Using IPv6 loopback; consider "localhost" if having issues
        port: 8080,
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});