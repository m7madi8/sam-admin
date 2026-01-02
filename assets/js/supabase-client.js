// Supabase client singleton
const SUPABASE_URL = 'https://kxaeupfrgkhqkvcrndmc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_KlnOoXIu-TIdq3ZbTjcTSQ_GJVBeYy6';

let supabaseClientInstance = null;

function getSupabaseClient() {
    if (!window.supabase) {
        throw new Error('Supabase SDK not loaded');
    }
    if (!supabaseClientInstance) {
        supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClientInstance;
}

