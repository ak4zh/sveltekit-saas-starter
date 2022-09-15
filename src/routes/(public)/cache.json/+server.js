import priceStore from '$lib/priceStore';
import { json } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export function GET() {
	return json({
		blocks: get(priceStore)
	});
}