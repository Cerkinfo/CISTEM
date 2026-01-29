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

    let body;
    try {
        body = await req.json();
    } catch (_) {
        return new Response("Invalid JSON", {
        status: 401,
        headers: corsHeaders,
        });
    }
    const payload = body.email;

    const { data, error } = await supabaseAdminClient
    .from('users')
    .select('id, email')
    .eq("email", payload)
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