/*
  # Schema Inicial - Sistema de Control de Inventarios UNITEPC
  
  1. Tablas Principales:
    - regions: Regiones (Cojiba, Zona Franca, etc)
    - units_of_measure: Unidades de medida (Gramos, Litros, ML, etc)
    - categories: Categorías de productos
    - products: Productos/Items con tipo de unidad
    - suppliers: Proveedores
    - supplier_price_history: Historial de precios con detalles de facturación, región e IVA
    - system_config: Configuración del sistema (IVA, incremento sin factura)
  
  2. Seguridad:
    - RLS habilitado en todas las tablas
    - Políticas restrictivas por defecto
*/

-- Crear tabla de regiones
CREATE TABLE IF NOT EXISTS regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  has_tax boolean DEFAULT true,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de unidades de medida
CREATE TABLE IF NOT EXISTS units_of_measure (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  abbreviation text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de productos con tipo de unidad
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE,
  description text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  unit_of_measure_id uuid NOT NULL REFERENCES units_of_measure(id) ON DELETE RESTRICT,
  current_stock integer DEFAULT 0,
  min_stock integer DEFAULT 0,
  max_stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de proveedores
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_email text,
  contact_phone text,
  address text,
  city text,
  country text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de historial de precios con detalles completos
CREATE TABLE IF NOT EXISTS supplier_price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  region_id uuid NOT NULL REFERENCES regions(id) ON DELETE RESTRICT,
  gross_price decimal(12, 2) NOT NULL,
  tax_rate decimal(5, 2) DEFAULT 0,
  tax_amount decimal(12, 2) DEFAULT 0,
  net_price decimal(12, 2) NOT NULL,
  is_invoiced boolean DEFAULT true,
  invoice_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de configuración del sistema
CREATE TABLE IF NOT EXISTS system_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key text NOT NULL UNIQUE,
  config_value text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE units_of_measure ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;

-- Políticas para regions (lectura pública)
CREATE POLICY "Regions can be read by anyone"
  ON regions FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para units_of_measure (lectura pública)
CREATE POLICY "Units of measure can be read by anyone"
  ON units_of_measure FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para categories (lectura pública)
CREATE POLICY "Categories can be read by anyone"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para products (lectura pública)
CREATE POLICY "Products can be read by anyone"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para suppliers (lectura pública)
CREATE POLICY "Suppliers can be read by anyone"
  ON suppliers FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para supplier_price_history (lectura pública)
CREATE POLICY "Price history can be read by anyone"
  ON supplier_price_history FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para system_config (lectura pública)
CREATE POLICY "System config can be read by anyone"
  ON system_config FOR SELECT
  TO authenticated
  USING (true);

-- Insertar datos iniciales de regiones
INSERT INTO regions (name, has_tax, description) VALUES
  ('Región Principal', true, 'Región con impuestos normales'),
  ('Cojiba', false, 'Región Cojiba - Sin IVA'),
  ('Zona Franca', false, 'Zona Franca - Sin IVA');

-- Insertar unidades de medida comunes
INSERT INTO units_of_measure (name, abbreviation, description) VALUES
  ('Gramos', 'g', 'Peso en gramos'),
  ('Kilogramos', 'kg', 'Peso en kilogramos'),
  ('Litros', 'L', 'Volumen en litros'),
  ('Mililitros', 'ml', 'Volumen en mililitros'),
  ('Unidades', 'un', 'Cantidad de unidades'),
  ('Metros', 'm', 'Longitud en metros'),
  ('Centímetros', 'cm', 'Longitud en centímetros'),
  ('Cajas', 'caja', 'Por caja');

-- Insertar configuración del sistema
INSERT INTO system_config (config_key, config_value, description) VALUES
  ('iva_percentage', '19', 'Porcentaje de IVA a aplicar'),
  ('uninvoiced_increment', '5', 'Incremento en porcentaje para productos sin factura');
