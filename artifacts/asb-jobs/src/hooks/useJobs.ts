import { useEffect, useState, useCallback } from 'react';
import { supabase, type Job } from '@/lib/supabase';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('job_listings')
      .select('*')
      .order('date_posted', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setJobs([]);
    } else {
      setJobs((data ?? []) as Job[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, refetch: fetchJobs };
}
