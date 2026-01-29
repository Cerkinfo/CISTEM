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
    const userRaw = formData.get('user');
    const payload = JSON.parse(userRaw as string)
    const pseudo = payload.pseudo ? payload.pseudo : `${payload.first_name}_${payload.last_name}`

    const { data, error } = await supabaseAdminClient
    .from('users')
    .insert({
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        pseudo: pseudo,
        image: `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(pseudo)}`,
    })
    .select()
    .single();
    if (error) {
        return new Response(error.message, {
            status: 400,
            headers: corsHeaders
        });
    }

    const file = formData.get('image')

    if (file instanceof File) {
    const extension = file.name.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${extension}`

    const { data: ImgData, error: ImgError } =
        await supabaseAdminClient
        .storage
        .from('users-images')
        .upload(filePath, file, { upsert: true })
        if (ImgError) {
            console.error("Image upload error:", ImgError);
            return new Response(ImgError.message, { 
                status: 500,
                headers: corsHeaders
            });
        } else {
            const imageUrl = supabaseAdminClient
            .storage
            .from('users-images')
            .getPublicUrl(ImgData.path).data.publicUrl;

            const { data: UpdateData, error: UpdateError } = await supabaseAdminClient
            .from('users')
            .update({ image: imageUrl })
            .eq('id', data.id)
            .select()
            .single();
            if (UpdateError) {
                console.error("User update error:", UpdateError);
                return new Response(UpdateError.message, { 
                    status: 500,
                    headers: corsHeaders
                });
            }
            data.image = UpdateData.image;
        }
    }

    return new Response(JSON.stringify({ user: data }), {
        status: 200,
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
        },
    });
});