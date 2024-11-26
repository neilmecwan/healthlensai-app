import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Database['public']['Tables']['organizations']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .order('name');

        if (error) throw error;
        setOrganizations(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchOrganizations();
  }, []);

  return { organizations, loading, error };
}

export function useUsers(organizationId?: string) {
  const [users, setUsers] = useState<Database['public']['Tables']['users']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        let query = supabase.from('users').select('*');
        
        if (organizationId) {
          query = query.eq('organization_id', organizationId);
        }

        const { data, error } = await query.order('full_name');

        if (error) throw error;
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [organizationId]);

  return { users, loading, error };
}

export function usePhysicians(organizationId?: string) {
  const [physicians, setPhysicians] = useState<Database['public']['Tables']['physicians']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPhysicians() {
      try {
        let query = supabase.from('physicians').select('*');
        
        if (organizationId) {
          query = query.eq('organization_id', organizationId);
        }

        const { data, error } = await query.order('name');

        if (error) throw error;
        setPhysicians(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchPhysicians();
  }, [organizationId]);

  return { physicians, loading, error };
}

export function useClinics(organizationId?: string) {
  const [clinics, setClinics] = useState<Database['public']['Tables']['clinics']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchClinics() {
      try {
        let query = supabase.from('clinics').select('*');
        
        if (organizationId) {
          query = query.eq('organization_id', organizationId);
        }

        const { data, error } = await query.order('name');

        if (error) throw error;
        setClinics(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchClinics();
  }, [organizationId]);

  return { clinics, loading, error };
}

export function useBillingData(filters: {
  organizationId?: string;
  physicianId?: string;
  clinicId?: string;
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<Database['public']['Tables']['billing_data']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBillingData() {
      try {
        let query = supabase.from('billing_data').select('*');
        
        if (filters.organizationId) {
          query = query.eq('organization_id', filters.organizationId);
        }
        if (filters.physicianId) {
          query = query.eq('physician_id', filters.physicianId);
        }
        if (filters.clinicId) {
          query = query.eq('clinic_id', filters.clinicId);
        }
        if (filters.startDate) {
          query = query.gte('date_of_service', filters.startDate);
        }
        if (filters.endDate) {
          query = query.lte('date_of_service', filters.endDate);
        }

        const { data, error } = await query.order('date_of_service', { ascending: false });

        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchBillingData();
  }, [filters]);

  return { data, loading, error };
}