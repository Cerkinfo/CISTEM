import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { supabaseAdminClient, supabaseClient } from "../../utils/Client.ts";
import { corsHeaders } from "../../utils/cors.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        });
    }
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return new Response('Token Unauthorized', { 
        status: 401,
        headers: corsHeaders,
    });

    const client = supabaseClient(req);
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || !user) return new Response('Client Unauthorized', { 
        status: 401,
        headers: corsHeaders,
    });

    let formData;
    try {
        formData = await req.formData();
    } catch (_) {
        return new Response("Invalid FormData", {
        status: 401,
        headers: corsHeaders,
        });
    }

    const beerData = formData.get('infos')
    const { data: beer, error1 } = await supabaseAdminClient
    .from('beers')
    .insert({
        name: beerData.name,
        image: 'https://raw.githubusercontent.com/Cerkinfo/CISTEM/main/apps/CISTEM/public/cistem.png',
        volume: beerData.volume,
        type: beerData.type,
        description: beerData.description,
        price: beerData.price
    })
    .select()
    .single();
    if (error1) {
        return new Response(error1.message, {
            status: 400,
            headers: corsHeaders
        });
    }

    const tasteData = formData.get('taste')
    const { data: taste, error2 } = await supabaseAdminClient
    .from('beers_taste')
    .insert({
        bitterness: tasteData.bitterness,
        power: tasteData.power,
        roundness: tasteData.roundness,
        fruity: tasteData.fruity,
        liveliness: tasteData.liveliness,
        acidity: tasteData.acidity
    })
    .select()
    .single();
    if (error2) {
        return new Response(error2.message, {
            status: 400,
            headers: corsHeaders
        });
    }

    const flavorsData = formData.get('flavors')
    const { data: flavors, error3 } = await supabaseAdminClient
    .from('beers_flavors')
    .insert({
        visual: flavorsData.visual,
        smell: flavorsData.smell,
        taste: flavorsData.taste
    })
    .select()
    .single();
    if (error3) {
        return new Response(error3.message, {
            status: 400,
            headers: corsHeaders
        });
    }

    const file = formData.get('picture') as File;
    if (file) {
        const { data: ImgData, error: ImgError } = await supabaseAdminClient
        .storage
        .from('beer-images')
        .upload(file, { upsert: true });
        if (ImgError) {
            console.error("Image upload error:", ImgError);
            return new Response(ImgError.message, { 
                status: 500,
                headers: corsHeaders
            });
        } else {
            const imageUrl = supabaseAdminClient
            .storage
            .from('beer-images')
            .getPublicUrl(ImgData.path).data.publicUrl;

            const { data: UpdateData, error: UpdateError } = await supabaseAdminClient
            .from('beers')
            .update({ image: imageUrl })
            .eq('id', beer.id)
            .select()
            .single();
            if (UpdateError) {
                console.error("Beer update error:", UpdateError);
                return new Response(UpdateError.message, { 
                    status: 500,
                    headers: corsHeaders
                });
            }
            beer.image = UpdateData.image;
        }
    }

    return new Response(JSON.stringify({ data: { beer, taste, flavors }}), {
        status: 200,
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
        },
    });
});