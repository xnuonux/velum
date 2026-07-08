// velum ... vite config. nothing exotic: react, and ?raw imports carry the
// site runtime (a vanilla js string) into the export pipeline.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
