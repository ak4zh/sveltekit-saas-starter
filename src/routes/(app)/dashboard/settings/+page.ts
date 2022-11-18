import type { PageLoad, PageLoadEvent } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageLoad = async (event: PageLoadEvent) => {
    const { user } = await event.parent();
    const { supabaseClient } = await getSupabase(event);
    const {data, error} = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
    return {
        user,
        profile: data
    };
};
