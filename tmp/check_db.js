
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://djjygexkdcvuiimqlyke.supabase.co';
const supabaseAnonKey = 'sb_publishable_GUlcRJT0O-tNmdcbS452yw_C8h1Al8u';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkRecentSignups() {
  console.log('Checking for recent entries in profiles table...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, phone, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching profiles:', error.message);
    } else if (data && data.length > 0) {
      console.log('Recent profiles found:');
      data.forEach(p => console.log(`- ${p.full_name || 'No Name'} (${p.id})`));
    } else {
      console.log('No profiles found in the database yet.');
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

checkRecentSignups();
