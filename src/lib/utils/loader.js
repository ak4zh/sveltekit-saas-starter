import Spinner from '../components/Spinner.svelte';
import { Jumper } from 'svelte-loading-spinners'

export const key = Symbol();

export const loader = (node, loading) => {
	let Spin, loadingValue;
	const unsubscribe = loading.subscribe(loading => {
		if(loading){
			Spin = new Spinner({
				target: node,
				intro: true
			})
		} else {
			if(Spin){
				Spin?.$destroy?.()
				Spin = undefined;
			}
		}
	})
}