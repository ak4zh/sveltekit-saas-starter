import { STRIPE_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { Stripe } from 'stripe';
import type { RequestEvent } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const { request } = event;
		const formData = await request.formData();

		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(303, '/');
		}
		const priceId = formData.get('priceId') as string;
		const user = session.user;
		const {
			data: { stripe_customer_id }
		} = await supabaseClient
			.from('user_data')
			.select('stripe_customer_id')
			.eq('id', user.id)
			.single();
		const stripe = new Stripe(STRIPE_SECRET_KEY, {
			apiVersion: '2022-08-01'
		});

		const checkoutSession = await stripe.checkout.sessions.create({
			customer: stripe_customer_id,
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: `${request.url.origin}/payment/stripe/success`,
			cancel_url: `${request.url.origin}/payment/stripe/cancelled`
		});
		throw redirect(303, checkoutSession.url);
	}
};
