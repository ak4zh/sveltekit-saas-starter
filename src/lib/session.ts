import type { Session } from '@supabase/gotrue-js';

export const setServerSession = async (session: Session | null) => {
	const payload: { accessToken?: string; refreshToken?: string } = {};
	if (session) {
		payload.accessToken = session.access_token;
		payload.refreshToken = session.refresh_token;
	}
	await fetch('/api/auth', {
		method: 'POST',
		credentials: 'same-origin',
		body: JSON.stringify(payload)
	});
};