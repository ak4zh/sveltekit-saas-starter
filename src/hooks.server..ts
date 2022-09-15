import { supabase } from '$lib/db';
import { parse } from 'cookie';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');
	const accessToken = cookies['sb-access-token'];
	supabase.auth.setAuth(accessToken);
	const { user } = await supabase.auth.api.getUser(accessToken);
	if (user) {
		event.locals.user = user;
	}
	return resolve(event);
};
