/*
  # Tablas de \u00d3rdenes de Compra
  
  1. Nuevas Tablas:
    - purchase_orders: \u00d3rdenes de compra principales
    - purchase_order_items: \u00cdtems individuales en cada orden
  
  2. Descripci\u00f3n:
    - purchase_orders: Datos generales de la orden, proveedor, estado
    - purchase_order_items: Detalles de cada producto con precio calculado, cantidad y subtotal
  
  3. Seguridad:
    - RLS habilitado
    - Pol\u00edticas de acceso restrictivas
*/

CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  order_date date NOT NULL DEFAULT CURRENT_DATE,
  expected_delivery_date date,
  status text DEFAULT 'pending',
  subtotal decimal(12, 2) DEFAULT 0,
  total_tax decimal(12, 2) DEFAULT 0,
  total_amount decimal(12, 2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS purchase_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  region_id uuid NOT NULL REFERENCES regions(id) ON DELETE RESTRICT,
  quantity decimal(10, 2) NOT NULL,
  gross_price decimal(12, 2) NOT NULL,
  tax_rate decimal(5, 2) DEFAULT 0,
  tax_amount decimal(12, 2) DEFAULT 0,
  net_price decimal(12, 2) NOT NULL,
  is_invoiced boolean DEFAULT true,
  line_total decimal(12, 2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Purchase orders can be read by anyone"
  ON purchase_orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Purchase order items can be read by anyone"
  ON purchase_order_items FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier_id 
  ON purchase_orders(supplier_id);

CREATE INDEX IF NOT EXISTS idx_purchase_orders_order_date 
  ON purchase_orders(order_date DESC);

CREATE INDEX IF NOT EXISTS idx_purchase_order_items_order_id 
  ON purchase_order_items(purchase_order_id);

CREATE INDEX IF NOT EXISTS idx_purchase_order_items_product_id 
  ON purchase_order_items(product_id);

ALTER TABLE purchase_order_items
  ADD CONSTRAINT check_quantity_positive CHECK (quantity > 0),
  ADD CONSTRAINT check_line_total_positive CHECK (line_total > 0);
