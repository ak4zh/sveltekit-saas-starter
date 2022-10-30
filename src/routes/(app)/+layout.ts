import type { LayoutLoad, LayoutLoadEvent } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
// @ts-ignore
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async (event: LayoutLoadEvent) => {
  const { session } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/auth');
  }
  return {
    user: session.user,
  };
};
