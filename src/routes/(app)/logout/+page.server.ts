import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Actions, RequestEvent } from './$types';
// @ts-ignore
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	async default(event: RequestEvent) {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();
		throw redirect(303, '/');
	}
};