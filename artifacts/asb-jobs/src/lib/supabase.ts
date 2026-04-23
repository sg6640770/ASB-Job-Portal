import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zmmpbjcnuwnewymwwmon.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbXBiamNudXduZXd5bXd3bW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4OTQyNjgsImV4cCI6MjA5MjQ3MDI2OH0.HZRdmszZEzXyYmuKNqmZpgw7FwiCpZWmkDcRIdKtf1c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Job = {
  job_id: string;
  job_title: string;
  company_name: string;
  location: string;
  date_posted: string;
  employment_type: string;
  apply_link: string;
  seniority_level: string;
};
