import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // or switch to @vitejs/plugin-react if preferred

export default defineConfig(({ command }) => {
    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": "/src",
            },
        },
        ...(command === "serve" && {
            server: {
                port: 8080
            }
        })
    };
});