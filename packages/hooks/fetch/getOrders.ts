import { supabase } from "@client";
import { useEffect, useState } from "react";

export function useOrdersList({ status } : { status: any }) {
    const [orders, setList] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('orders')
            .select("*,location(name)")
            .eq('status', status);
          if (data) setList(data);
          else if (error && error.code !== 'PGRST116') {
            console.log('🚀 ~ fetchInventory ~ error:', JSON.stringify(error, null, 2));
          }
        } catch (err) {
          if (import.meta.hot) return;
          console.error('🚀 ~ fetchInventory ~ error:', err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
        const subscription = supabase
          .channel(`orders-changes`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'orders' },
            () => {
              setTimeout(() => {
                  fetchData();
              }, 500);
            }
          )
          .subscribe();
          return () => {
              supabase.removeChannel(subscription);
          };
    }, [status]);
    
    return { orders, isLoading };
}