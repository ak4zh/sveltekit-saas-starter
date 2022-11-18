import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2022-08-01'
});

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
  const { session } = await event.parent();
  const { supabaseClient } = await getSupabase(event);
  const {
    data: { stripe_customer_id },
  } = await supabaseClient
    .from("user_data")
    .select("stripe_customer_id")
    .match({ id: session.user.id })
    .single();

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripe_customer_id,
    return_url: `${event.url.origin}/dashboard`,
  });
  throw redirect(301, stripeSession.url);
}
