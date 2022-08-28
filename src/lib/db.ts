import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(
	PUBLIC_SUPABASE_URL as string,
	PUBLIC_SUPABASE_ANON_KEY as string
);
