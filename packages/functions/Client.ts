import type { Database } from '@pkg/types/Database';
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://twavujkympalstdxyxti.supabase.co';

export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3YXZ1amt5bXBhbHN0ZHh5eHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTgyNDQsImV4cCI6MjA4MDM3NDI0NH0.EIBEbjbTP88ylZ5u2Jo0Nhc6AGx5lN-_efphZt0N1p4';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});
