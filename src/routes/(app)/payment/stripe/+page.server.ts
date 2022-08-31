import { STRIPE_SECRET_KEY } from '$env/static/private';
import { supabase } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { Stripe } from 'stripe';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request, url, locals }: RequestEvent) {
	const data = await request.formData();
	const priceId = data.get('priceId') as string;
	const user = locals.user;
	const {
		data: { stripe_customer_id }
	} = await supabase.from('user_data').select('stripe_customer_id').eq('id', user.id).single();
	const stripe = new Stripe(STRIPE_SECRET_KEY, {
		apiVersion: '2022-08-01'
	});

	const session = await stripe.checkout.sessions.create({
		customer: stripe_customer_id,
		mode: 'subscription',
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		success_url: `${url.origin}/payment/stripe/success`,
		cancel_url: `${url.origin}/payment/stripe/cancelled`
	});
	throw redirect(303, session.url);
}
