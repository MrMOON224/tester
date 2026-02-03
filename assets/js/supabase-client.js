
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://aebjlbbpwbjunxctosjp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlYmpsYmJwd2JqdW54Y3Rvc2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTA5MjQsImV4cCI6MjA4NTY2NjkyNH0.tfb_8DlXBefA4HEcqMnvsA3aMjZo71GtRZxkT2yXh1Y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper to check if user is logged in
export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// Helper to get profile
export async function getUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    return { data, error };
}
