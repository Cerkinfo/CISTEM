import { supabase } from "@client";
import type { Database } from "@db";
import { useEffect, useState } from "react";

export function useInventoryList({ tableName, subscribe } : { tableName: keyof Database["public"]["Tables"], subscribe?: boolean }) {
    const [list, setList] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select("id(id,name, image),*");
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
      if(subscribe) {
        const subscription = supabase
          .channel(`${tableName}-changes`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: tableName },
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
      }
    }, [tableName]);
    
    return { list, isLoading };
}