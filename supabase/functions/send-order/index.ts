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
    const order = JSON.parse(body.order);

    const { data: role, error: e1 } = await supabaseAdminClient
    .from('users')
    .select('role')
    .eq('id', user.id)
    .limit(1)
    .single();
    if (e1) {
        return new Response(e1.message, {
            status: 400,
            headers: corsHeaders
        });
    }
    if (role.role !== 'MANAGER_BAR' && role.role !== 'WATER_SELLER') {
        return new Response("User can't send order", {
            status: 400,
            headers: corsHeaders
        });
    }

    const { data: location, error: e2 } = await supabaseAdminClient
    .from('managers')
    .select('manager(id), location(*)')
    .eq('manager:users!managers_manager_id_fkey(id)', user.id)
    .limit(1)
    .single();
    if (e2) {
        return new Response(e1.message, {
            status: 400,
            headers: corsHeaders
        });
    }

    const { data, error } = await supabaseAdminClient
    .from('orders')
    .insert({
        location: location.location.id,
        name: `${location.location.prefix}-${String(location.location.orders + 1).padStart(3, '0')}`,
        order: order,
        status: 'PENDING'
    })
    .select()
    .single();
    if (error) {
        return new Response(error.message, {
            status: 400,
            headers: corsHeaders
        });
    }

    return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
        },
    });
});