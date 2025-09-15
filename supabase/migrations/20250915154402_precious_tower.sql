/*
  # Fix RLS Policies for Admin Access

  1. Changes
    - Update all admin policies to use JWT claims instead of querying auth.users table
    - Replace `EXISTS (SELECT 1 FROM auth.users...)` with `auth.jwt() ->> 'email' LIKE '%@admin.%'`
    - This resolves the "permission denied for table users" error

  2. Security
    - Maintains same security model but uses accessible JWT claims
    - Admin users identified by email domain containing '@admin.'
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can read all clients" ON clients;
DROP POLICY IF EXISTS "Admins can insert clients" ON clients;
DROP POLICY IF EXISTS "Admins can update clients" ON clients;
DROP POLICY IF EXISTS "Clients can read own alerts" ON alerts;
DROP POLICY IF EXISTS "Admins can update alerts" ON alerts;

-- Recreate policies using JWT claims
CREATE POLICY "Admins can read all clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@admin.%');

CREATE POLICY "Admins can insert clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' LIKE '%@admin.%');

CREATE POLICY "Admins can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@admin.%');

CREATE POLICY "Clients can read own alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (
    client_id = auth.uid() OR
    auth.jwt() ->> 'email' LIKE '%@admin.%'
  );

CREATE POLICY "Admins can update alerts"
  ON alerts
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@admin.%');