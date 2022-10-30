import Spinner from '../components/Spinner.svelte';

export const loader = (node, loading) => {
	let Spin;
	const unsubscribe = loading.subscribe((loading) => {
		if (loading) {
			Spin = new Spinner({
				target: node,
				intro: true
			});
		} else {
			if (Spin) {
				Spin?.$destroy?.();
				Spin = undefined;
			}
		}
	});
};
