
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rwvxtwdprplvcyxfjuld.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dnh0d2RwcnBsdmN5eGZqdWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTI5MjYsImV4cCI6MjA4NTA2ODkyNn0.0_vStrlbEITLX4-64U7IWwNKva_jFFj8WM1UDc0pubI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createAdmin() {
    const email = 'admin@sanschool.com';
    const password = 'admin123';

    console.log('Creating user...');

    // 1. Sign Up
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'System Admin',
                phone: '09111111111'
            }
        }
    });

    if (error) {
        console.error('Error creating user:', error.message);
        return;
    }

    const userId = data.user?.id;

    if (!userId) {
        console.error('User created but no ID returned (confirmation required?)');
        return;
    }

    console.log('User created:', userId);

    // 2. Elevate to Admin (Database Update)
    // We must do this via the script if RLS allows, or rely on a separate SQL call if this client is "anon".
    // Since RLS policies usually restrict "anon" from updating roles, this step might fail here 
    // unless we had the Service Role Key. 
    // BUT checking the task previously, I can use the MCP tool to execute SQL to upgrade this specific ID.

    console.log('Please run the SQL upgrade step for ID:', userId);
}

createAdmin();
