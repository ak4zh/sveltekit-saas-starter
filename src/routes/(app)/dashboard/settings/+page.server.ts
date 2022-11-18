import { getServerSession, getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async (event)  => {
      const session = await getServerSession(event)
      const formData = await event.request.formData();
      const full_name = formData.get('full_name');
      const username = formData.get('username');
      const { supabaseClient } = await getSupabase(event);
      const {data, error} = await supabaseClient
        .from('profiles')
        .update({full_name: full_name, username: username})
        .eq('id', session?.user.id)
      return { success: true };
    }
};