import { supabase } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function POST({ request, url }: RequestEvent) {
	const data = await request.formData();
	const email = data.get('email') as string;
	if (!supabase) return { errors: { message: 'NO SUPABASE' } };
	const response = await supabase.auth.signIn({ email }, { redirectTo: `${url.origin}/login` });
	if (response.error) {
        return {
            status: 403,
            errors: {
                message: response.error.message
            }
        }
	}
    
	throw redirect(303, url.origin + url.pathname + '?sent=true');
}