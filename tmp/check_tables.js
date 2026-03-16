
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://djjygexkdcvuiimqlyke.supabase.co';
const supabaseAnonKey = 'sb_publishable_GUlcRJT0O-tNmdcbS452yw_C8h1Al8u';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listTables() {
  console.log('Listing tables in public schema...');
  try {
    // Note: We can't use standard postgres queries via anon key usually for meta tables,
    // but we can try to select from a known table or use a query that fails informativeley.
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error && error.code === '42P01') {
      console.error('CONFIRMED: The table "profiles" does NOT exist.');
    } else if (error) {
      console.error('Error selecting from profiles:', error.message);
    } else {
      console.log('Table "profiles" exists.');
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

listTables();
