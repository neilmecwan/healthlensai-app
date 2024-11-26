import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ImportResult {
  records: number;
  updates: number;
  errors: string[];
}

export function useDataImport() {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const processCSV = async (file: File): Promise<string[][]> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));
        resolve(rows);
      };
      reader.readAsText(file);
    });
  };

  const importData = async (file: File): Promise<ImportResult> => {
    setImporting(true);
    setProgress(0);
    
    try {
      const rows = await processCSV(file);
      const headers = rows[0];
      const data = rows.slice(1);
      
      let records = 0;
      let updates = 0;
      const errors: string[] = [];
      const batchSize = 100;
      
      for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, Math.min(i + batchSize, data.length));
        const billingData = batch.map(row => {
          const record: any = {};
          headers.forEach((header, index) => {
            record[header.trim()] = row[index]?.trim();
          });
          
          return {
            organization_id: record.organization_id,
            physician_id: record.physician_id,
            clinic_id: record.clinic_id,
            patient_id: record.patient_id,
            encounter_id: record.encounter_id,
            date_of_service: record.date_of_service,
            cpt_code: record.cpt_code,
            icd10_codes: record.icd10_codes?.split(';') || [],
            charges: parseFloat(record.charges) || 0,
            payments: parseFloat(record.payments) || 0,
            adjustments: parseFloat(record.adjustments) || 0
          };
        });

        const { data: insertedData, error } = await supabase
          .from('billing_data')
          .upsert(billingData, {
            onConflict: 'encounter_id',
            ignoreDuplicates: false
          });

        if (error) {
          errors.push(`Error in batch ${i/batchSize + 1}: ${error.message}`);
        } else {
          records += insertedData?.length || 0;
          updates += billingData.length - (insertedData?.length || 0);
        }

        setProgress(Math.min(((i + batch.length) / data.length) * 100, 100));
      }

      return { records, updates, errors };
    } catch (error) {
      throw new Error(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImporting(false);
      setProgress(100);
    }
  };

  return {
    importData,
    importing,
    progress
  };
}