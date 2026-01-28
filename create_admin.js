
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://rwvxtwdprplvcyxfjuld.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dnh0d2RwcnBsdmN5eGZqdWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTI5MjYsImV4cCI6MjA4NTA2ODkyNn0.0_vStrlbEITLX4-64U7IWwNKva_jFFj8WM1UDc0pubI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createAdmin() {
    const email = '09111111111@san.school';
    const password = 'admin123';

    console.log('Creating user...');
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
        console.error('Error creating user:', error);
        return;
    }

    console.log('User created:', data.user.id);

    // Now we need to update the role. 
    // Since we can't easily do it from client (RLS), we will output the ID and let the agent run SQL.
}

createAdmin();
