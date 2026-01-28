
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rwvxtwdprplvcyxfjuld.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dnh0d2RwcnBsdmN5eGZqdWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTI5MjYsImV4cCI6MjA4NTA2ODkyNn0.0_vStrlbEITLX4-64U7IWwNKva_jFFj8WM1UDc0pubI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testLogin() {
    try {
        console.log('Attempting login...');
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: 'admin@sanschool.com',
            password: 'admin123'
        });

        if (authError) {
            console.error('Auth Error:', authError.message);
            return;
        }

        console.log('Auth successful. User ID:', authData.user.id);

        console.log('Fetching profile...');
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (profileError) {
            console.error('Profile Error:', profileError);
            console.error('Profile Error Details:', JSON.stringify(profileError, null, 2));
        } else {
            console.log('Profile found:', profile);
        }

    } catch (e) {
        console.error('Unexpected error:', e);
    }
}

testLogin();
