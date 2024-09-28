import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = '<SUPABASE_ANON_KEY>';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to save or update user data in Supabase
const saveUserData = async (username: string, coins: number) => {
  const { data, error } = await supabase
    .from('users')
    .upsert({ username, coins });
  
  if (error) console.error(error);
  return data;
};
