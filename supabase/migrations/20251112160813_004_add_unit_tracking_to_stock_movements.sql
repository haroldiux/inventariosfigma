/*
  # Agregar tabla de movimientos de stock
  
  1. Nueva Tabla:
    - stock_movements: Registro de todos los movimientos de stock
  
  2. Descripción:
    - Rastrea todas las entradas y salidas de inventario
    - Incluye información de unidades de medida
    - Permite auditoría completa del inventario
  
  3. Seguridad:
    - RLS habilitado
*/

CREATE TABLE IF NOT EXISTS stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity_change decimal(10, 2) NOT NULL,
  movement_type text NOT NULL,
  reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stock movements can be read by anyone"
  ON stock_movements FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_stock_movements_product_id 
  ON stock_movements(product_id);

CREATE INDEX IF NOT EXISTS idx_stock_movements_created_at 
  ON stock_movements(created_at DESC);

ALTER TABLE stock_movements
  ADD CONSTRAINT check_movement_type CHECK (movement_type IN ('entrada', 'salida', 'ajuste'));
