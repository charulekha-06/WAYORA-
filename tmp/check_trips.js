const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://djjygexkdcvuiimqlyke.supabase.co';
const supabaseAnonKey = 'sb_publishable_GUlcRJT0O-tNmdcbS452yw_C8h1Al8u';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTripSchema() {
  const { data, error } = await supabase.rpc('get_trip_columns');
  
  // Since we might not have RPC, let's try a direct query if open, or an intentional bad insert
  const { error: insertError } = await supabase.from('trips').insert([{ totally_fake_column: 'test' }]);
  fs.writeFileSync('tmp/trip_schema.log', 'Error data: ' + JSON.stringify(insertError));
}
checkTripSchema();
