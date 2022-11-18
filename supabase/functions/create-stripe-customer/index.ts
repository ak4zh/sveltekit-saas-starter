import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@1.35.5';

const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
	httpClient: Stripe.createFetchHttpClient()
});

const supabase = createClient(
	Deno.env.get('SUPABASE_URL')!,
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
	const { record } = await req.json();

	const customer = await stripe.customers.create({
		// stripe customer name is mandadoty for few countries for exports
		name: record?.raw_user_meta_data?.full_name?.split('@')[0] || record.email,
		email: record.email,
		metadata: {
			supabase_id: record.id
		}
	});

	const { data, error } = await supabase
		.from('user_data')
		.update({
			stripe_customer_id: customer.id
		})
		.match({ id: record.id });

	return new Response(JSON.stringify({ customer_stripe_id: customer.id }), {
		headers: { 'Content-Type': 'application/json' }
	});
});
