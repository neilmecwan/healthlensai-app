import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface MetricsFilters {
  organizationId?: string;
  physicianId?: string;
  clinicId?: string;
  startDate?: string;
  endDate?: string;
}

export function useMetrics(filters: MetricsFilters) {
  const [metrics, setMetrics] = useState({
    revenuePerPatient: 0,
    totalRevenue: 0,
    patientVisits: 0,
    avgReimbursementRate: 0,
    providerProductivity: 0,
    collectionEfficiency: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function calculateMetrics() {
      try {
        let query = supabase
          .from('billing_data')
          .select('*');

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

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (data) {
          const totalRevenue = data.reduce((sum, record) => sum + record.payments, 0);
          const uniquePatients = new Set(data.map(record => record.patient_id)).size;
          const totalCharges = data.reduce((sum, record) => sum + record.charges, 0);

          setMetrics({
            revenuePerPatient: uniquePatients ? totalRevenue / uniquePatients : 0,
            totalRevenue,
            patientVisits: data.length,
            avgReimbursementRate: totalCharges ? (totalRevenue / totalCharges) * 100 : 0,
            providerProductivity: data.length / (new Set(data.map(record => record.physician_id)).size || 1),
            collectionEfficiency: totalCharges ? (totalRevenue / totalCharges) * 100 : 0
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error calculating metrics'));
      } finally {
        setLoading(false);
      }
    }

    calculateMetrics();
  }, [filters]);

  return { metrics, loading, error };
}

export function useServiceLineMetrics(filters: MetricsFilters) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchServiceLineData() {
      try {
        let query = supabase
          .from('billing_data')
          .select(`
            *,
            physicians (
              specialties
            )
          `);

        if (filters.organizationId) {
          query = query.eq('organization_id', filters.organizationId);
        }
        if (filters.startDate) {
          query = query.gte('date_of_service', filters.startDate);
        }
        if (filters.endDate) {
          query = query.lte('date_of_service', filters.endDate);
        }

        const { data: billingData, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (billingData) {
          const serviceLines = billingData.reduce((acc: any, record) => {
            const specialty = record.physicians?.specialties?.[0] || 'Unknown';
            
            if (!acc[specialty]) {
              acc[specialty] = {
                revenue: 0,
                patients: new Set(),
                encounters: 0
              };
            }

            acc[specialty].revenue += record.payments;
            acc[specialty].patients.add(record.patient_id);
            acc[specialty].encounters += 1;

            return acc;
          }, {});

          const formattedData = Object.entries(serviceLines).map(([name, metrics]: [string, any]) => ({
            name,
            revenue: metrics.revenue,
            patients: metrics.patients.size,
            rpp: metrics.revenue / metrics.patients.size
          }));

          setData(formattedData);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error fetching service line metrics'));
      } finally {
        setLoading(false);
      }
    }

    fetchServiceLineData();
  }, [filters]);

  return { data, loading, error };
}

export function useReimbursementTrend(filters: MetricsFilters) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchReimbursementTrend() {
      try {
        let query = supabase
          .from('billing_data')
          .select('*');

        if (filters.organizationId) {
          query = query.eq('organization_id', filters.organizationId);
        }
        if (filters.startDate) {
          query = query.gte('date_of_service', filters.startDate);
        }
        if (filters.endDate) {
          query = query.lte('date_of_service', filters.endDate);
        }

        const { data: billingData, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (billingData) {
          const monthlyData = billingData.reduce((acc: any, record) => {
            const month = record.date_of_service.substring(0, 7); // YYYY-MM
            
            if (!acc[month]) {
              acc[month] = {
                charges: 0,
                payments: 0
              };
            }

            acc[month].charges += record.charges;
            acc[month].payments += record.payments;

            return acc;
          }, {});

          const formattedData = Object.entries(monthlyData).map(([month, values]: [string, any]) => ({
            month: new Date(month).toLocaleString('default', { month: 'short' }),
            rate: (values.payments / values.charges) * 100
          }));

          setData(formattedData.sort((a, b) => 
            new Date(a.month).getTime() - new Date(b.month).getTime()
          ));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error fetching reimbursement trend'));
      } finally {
        setLoading(false);
      }
    }

    fetchReimbursementTrend();
  }, [filters]);

  return { data, loading, error };
}