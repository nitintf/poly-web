import 'localenv';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import svgr from 'vite-plugin-svgr';
import react from 'vite-preset-react';

const serverVars = ['baseQueryUrl', 'baseWsUrl'];

const config = {};

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  for (const value of serverVars) {
    config[value] = process.env[value];
  }

  // https://vitejs.dev/config/
  return defineConfig({
    define: {
      'process.env': process.env,
    },
    plugins: [
      react(),
      svgr(),
      ViteEjsPlugin(
        {
          serverVars,
          config,
        },
        {
          ejs: {
            beautify: true,
          },
        },
      ),
    ],
    server: {
      base: 'localhost',
      origin: 'localhost',
      port: 7337,
      host: true,
      open: true,
    },
    preview: {
      port: 7337,
      host: true,
    },
    build: {
      sourcemap: true,
      minify: true,
      manifest: true,
    },
    resolve: {
      alias: [{ find: 'app', replacement: path.resolve(__dirname, 'src') }],
    },
  });
};
