import { supabase } from "@pkg/functions/Client";
import type { AuthSession } from "@supabase/supabase-js";

export const fetchUser = async (_session: AuthSession | null) => {
    const query = `id, email, first_name, last_name, pseudo, image, role`
    if (!_session?.user) return;
    try {
      const newQuery = supabase
        .from('users')
        .select(query)
        .eq('id', _session.user.id)
        .limit(1)
        .single();
      const { data, error } = await newQuery;
      if (data) return data;
      else if (error && error.code !== 'PGRST116') {
        console.log('🚀 ~ fetchUser ~ error:', JSON.stringify(error, null, 2));
      }
    } catch (err) {
        if (import.meta.hot) return;
        console.error('🚀 ~ fetchUser ~ error:', err);
    }
};