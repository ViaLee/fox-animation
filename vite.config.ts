import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     'three/examples/jsm': 'three/examples/jsm',
  //     'three/addons': 'three/examples/jsm',
  //     'three/tsl': 'three/webgpu',
  //     'three': 'three/webgpu',
  //   }
  // }
})
