import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  proxy:{
    "./api":{
      target:'http://localhost:3007',
      secure:false
    }
  },
  plugins: [react()],
})
