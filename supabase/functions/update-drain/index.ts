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

    let body;
    try {
        body = await req.json();
    } catch (_) {
        return new Response("Invalid JSON", {
        status: 401,
        headers: corsHeaders,
        });
    }
    const payload = body.drain;

    const { data, error } = await supabaseAdminClient
    .from('drain')
    .update({
        status: payload.status,
        updated_at: new Date().toISOString(),
        last_scanner: user.id
    })
    .eq("id", payload.id)
    .select()
    .limit(1)
    .single();
    if (error) {
        return new Response(error.message, {
            status: 400,
            headers: corsHeaders
        });
    }

    return new Response(JSON.stringify({ user: data }), {
        status: 200,
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
        },
    });
});