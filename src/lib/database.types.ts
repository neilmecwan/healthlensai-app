export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          tax_id: string
          address: string
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tax_id: string
          address: string
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tax_id?: string
          address?: string
          status?: 'active' | 'inactive'
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          organization_id: string
          role: 'admin' | 'provider' | 'staff'
          status: 'active' | 'inactive'
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          organization_id: string
          role?: 'admin' | 'provider' | 'staff'
          status?: 'active' | 'inactive'
          features?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          full_name?: string
          organization_id?: string
          role?: 'admin' | 'provider' | 'staff'
          status?: 'active' | 'inactive'
          features?: string[]
          updated_at?: string
        }
      }
      physicians: {
        Row: {
          id: string
          name: string
          npi: string
          organization_id: string
          specialties: string[]
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          npi: string
          organization_id: string
          specialties?: string[]
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          npi?: string
          organization_id?: string
          specialties?: string[]
          status?: 'active' | 'inactive'
          updated_at?: string
        }
      }
      clinics: {
        Row: {
          id: string
          name: string
          organization_id: string
          address: string
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          organization_id: string
          address: string
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          organization_id?: string
          address?: string
          status?: 'active' | 'inactive'
          updated_at?: string
        }
      }
      billing_data: {
        Row: {
          id: string
          organization_id: string
          physician_id: string
          clinic_id: string
          patient_id: string
          encounter_id: string
          date_of_service: string
          cpt_code: string
          icd10_codes: string[]
          charges: number
          payments: number
          adjustments: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          physician_id: string
          clinic_id: string
          patient_id: string
          encounter_id: string
          date_of_service: string
          cpt_code: string
          icd10_codes?: string[]
          charges: number
          payments: number
          adjustments: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          organization_id?: string
          physician_id?: string
          clinic_id?: string
          patient_id?: string
          encounter_id?: string
          date_of_service?: string
          cpt_code?: string
          icd10_codes?: string[]
          charges?: number
          payments?: number
          adjustments?: number
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}