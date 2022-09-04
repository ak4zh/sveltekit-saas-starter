import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			"http": false,
			"https": false,
			"buffer": require.resolve("buffer"),
			"crypto": require.resolve("crypto-browserify"),
			"events": require.resolve("events/"),
			"path": require.resolve("path-browserify"),
			"stream": require.resolve("stream-browserify")
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
