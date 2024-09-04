import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts", // 엔트리 파일 경로 설정
      formats: ["es"], // ES 모듈 형식으로 빌드
      fileName: (format) => `index.${format}.js`, // 출력 파일 이름 설정
    },
    rollupOptions: {
      output: {
        format: "es",
        preserveModules: true, // 개별 모듈로 출력
        entryFileNames: "[name].js",
      },
    },
    minify: "esbuild", // 빠른 빌드와 최소화를 위해 esbuild 사용
  },
});
