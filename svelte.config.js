import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			"crypto": "crypto-browserify",
			"events": "events/",
			"path": "path-browserify",
			"stream": "stream-browserify"
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
