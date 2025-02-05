import { defineConfig } from 'vite';
import path from 'path';


export default defineConfig({
	base: "/linkfield/",
	resolve: {
	  alias: {
	    '@': path.resolve(__dirname, 'src'),
	  },
	},
	build: {
	 	minify: false
	}
});