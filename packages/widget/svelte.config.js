import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import visualizer from 'rollup-plugin-visualizer';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [WindiCSS.default(), visualizer.default()],
			server: {
				fs: {
					strict: false
				}
			}
		}
	}
};

export default config;
