import { supabase } from "@client";
import type { Database } from "@db";
import { useEffect, useState } from "react";

export function useItem({ tableName, key, eq, subscribe } : { tableName: keyof Database["public"]["Tables"], key: any, eq?: string, subscribe?: boolean }) {
    const [item, setItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq(eq ? eq : "id", key)
            .limit(1)
            .single();
          if (data) setItem(data);
          else if (error && error.code !== 'PGRST116') {
            console.log('🚀 ~ fetchItem ~ error:', JSON.stringify(error, null, 2));
          }
        } catch (err) {
          if (import.meta.hot) return;
          console.error('🚀 ~ fetchItem ~ error:', err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
      if(subscribe) {
        const subscription = supabase
          .channel(`${tableName}-${key}-changes`)
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
    
    return { item, isLoading };
}