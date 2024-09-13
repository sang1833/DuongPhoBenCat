import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": fileURLToPath(
        new URL("src/components/index.d.ts", import.meta.url)
      ),
      "@utils": fileURLToPath(new URL("src/utils/index.d.ts", import.meta.url)),
      "@types": fileURLToPath(new URL("src/types/index.d.ts", import.meta.url)),
      "@pages": fileURLToPath(new URL("src/pages/index.d.ts", import.meta.url)),
      "@images": fileURLToPath(
        new URL("src/images/index.d.ts", import.meta.url)
      ),
      "@hooks": fileURLToPath(new URL("src/hooks/index.ts", import.meta.url)),
      "@contexts": fileURLToPath(
        new URL("src/contexts/index.d.ts", import.meta.url)
      ),
      "@api": fileURLToPath(
        new URL("src/generated-api/index.ts", import.meta.url)
      )
    }
  }
});
