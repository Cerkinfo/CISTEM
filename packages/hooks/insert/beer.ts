import { supabase } from "@pkg/functions/Client";
import { useEffect, useState } from "react";
import { useSession } from "../ctx";

export function BeerInsert({ form } : { form: any }) {
    const { session } = useSession()
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    console.log(form)

    // const formData = new FormData();
    // formData.append('infos', JSON.stringify({ infos }))
    // formData.append('taste', JSON.stringify({ taste }))
    // formData.append('flavors', JSON.stringify({ flavors }))
    // console.log('formData', formData)

    useEffect(() => {
        async function insert() {
            setIsLoading(true);
            const { data, error } = await supabase.functions.invoke(
                'insert-beer', {
                body: '',
                headers: { Authorization: `Bearer ${session?.access_token}` }
            })
            if(data) setData(data);
            else if (error) setError(error);
        }
        //insert()
    })

    return { data, error, isLoading }
}