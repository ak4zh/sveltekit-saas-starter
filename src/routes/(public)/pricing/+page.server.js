import { STRIPE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_STRIPE_PRICING_TABLE_ID } from '$env/static/public';

import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01'
});

/** @type {import('./$types').PageLoad} */
export async function load() {
	let prices = {};
	if (!PUBLIC_STRIPE_PRICING_TABLE_ID) {
		prices = await stripe.prices.list({
			expand: ['data.product'],
			active: true
		});
	}
	return {
		prices
	};
}
