const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://djjygexkdcvuiimqlyke.supabase.co';
const supabaseAnonKey = 'sb_publishable_GUlcRJT0O-tNmdcbS452yw_C8h1Al8u';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  let log = '--- Checking Database Setup ---\n';
  
  // Check profiles table
  const { error: profileError } = await supabase.from('profiles').select('id').limit(1);
  if (profileError) {
    log += 'Profiles Table Error: ' + profileError.message + '\n';
  } else {
    log += 'Profiles Table: OK (Exists)\n';
  }

  // Check todos table
  const { error: todosError } = await supabase.from('todos').select('id').limit(1);
  if (todosError) {
    log += 'Todos Table Error: ' + todosError.message + '\n';
  } else {
    log += 'Todos Table: OK (Exists)\n';
  }
  
  fs.writeFileSync('tmp/test_tables_output.txt', log, 'utf8');
  console.log('Done writing log');
}

checkDatabase();
