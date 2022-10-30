import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event: LayoutServerLoadEvent) => {
  return {
    session: await getServerSession(event)
  };
};