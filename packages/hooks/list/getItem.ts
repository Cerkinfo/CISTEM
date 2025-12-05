import { supabase } from "@client";
import type { Database } from "@db";
import { useEffect, useState } from "react";

export function useItem({ tableName, key } : { tableName: keyof Database["public"]["Tables"], key: any }) {
    const [item, setItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq("id", key)
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
    const subscription = supabase
      .channel(`${tableName}-${key}-changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        (payload) => {
          console.log("Changement détecté :", payload);
          setTimeout(() => {
              fetchData();
          }, 500);
        }
      )
      .subscribe();
      return () => {
          supabase.removeChannel(subscription);
      };
    }, [tableName]);
    
    return { item, isLoading };
}