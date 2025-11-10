/*
  # Índices y Constraints Adicionales
  
  1. Índices para mejorar rendimiento en queries frecuentes
  2. Constraints para garantizar integridad de datos
*/

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_supplier_price_history_supplier_id 
  ON supplier_price_history(supplier_id);

CREATE INDEX IF NOT EXISTS idx_supplier_price_history_product_id 
  ON supplier_price_history(product_id);

CREATE INDEX IF NOT EXISTS idx_supplier_price_history_region_id 
  ON supplier_price_history(region_id);

CREATE INDEX IF NOT EXISTS idx_products_category_id 
  ON products(category_id);

CREATE INDEX IF NOT EXISTS idx_products_unit_of_measure_id 
  ON products(unit_of_measure_id);

CREATE INDEX IF NOT EXISTS idx_supplier_price_history_created_at 
  ON supplier_price_history(created_at DESC);

-- Constraint para garantizar que net_price sea coherente
ALTER TABLE supplier_price_history
  ADD CONSTRAINT check_net_price_positive CHECK (net_price > 0),
  ADD CONSTRAINT check_gross_price_positive CHECK (gross_price > 0);
