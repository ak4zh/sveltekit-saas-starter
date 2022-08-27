import type { RequestEvent } from '@sveltejs/kit';
import { serialize } from 'cookie';

export const POST = async ({ request }: RequestEvent) => {
	const { accessToken, refreshToken } = await request.json();
	const access = serialize('sb-access-token', accessToken, {
		httpOnly: true,
		path: '/',
		maxAge: accessToken ? 60 * 60 * 24 * 7 : -1
	});
	const refresh = serialize('sb-refresh-token', refreshToken, {
		httpOnly: true,
		path: '/',
		maxAge: accessToken ? 60 * 60 * 24 * 365 : -1
	});
	const headers = new Headers();
	headers.append('set-cookie', access);
	headers.append('set-cookie', refresh);
	return new Response(null, { headers });
};