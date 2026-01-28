
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://rwvxtwdprplvcyxfjuld.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dnh0d2RwcnBsdmN5eGZqdWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTI5MjYsImV4cCI6MjA4NTA2ODkyNn0.0_vStrlbEITLX4-64U7IWwNKva_jFFj8WM1UDc0pubI';

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
