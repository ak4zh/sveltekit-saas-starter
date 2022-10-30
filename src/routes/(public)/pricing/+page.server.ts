import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import Stripe from 'stripe';
import type { PageServerLoad } from './$types';

const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2022-08-01'
});

export const load: PageServerLoad = async () => {
	let prices: Array<Stripe.Price> = []
	if (!publicEnv.PUBLIC_STRIPE_PRICING_TABLE_ID) {
		let resp = await stripe.prices.list({
			expand: ['data.product'],
			active: true
		});
		prices = resp.data
	}
	return {
		prices
	};
}
