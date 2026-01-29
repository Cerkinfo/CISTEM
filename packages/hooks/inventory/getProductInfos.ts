import { supabase } from "@pkg/functions/Client";

export const fetchProductsInfos = async (id: string) => {
    const query = `id, name, image, type`
    if (!id) return;
    try {
      const newQuery = supabase
        .from('products_view')
        .select(query)
        .eq('id', id)
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