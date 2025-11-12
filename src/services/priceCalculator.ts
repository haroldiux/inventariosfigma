import { SupabaseClient } from "@supabase/supabase-js";

export interface PriceCalculationInput {
  grossPrice: number;
  regionId: string;
  isInvoiced: boolean;
  ivaPercentage: number;
  uninvoicedIncrement: number;
}

export interface PriceCalculationResult {
  grossPrice: number;
  taxRate: number;
  taxAmount: number;
  netPrice: number;
}

export async function getSystemConfig(
  supabase: SupabaseClient
): Promise<{ iva: number; uninvoicedIncrement: number }> {
  try {
    const { data, error } = await supabase
      .from("system_config")
      .select("config_key, config_value");

    if (error) throw error;

    const config = {
      iva: 19,
      uninvoicedIncrement: 5,
    };

    data?.forEach((item) => {
      if (item.config_key === "iva_percentage") {
        config.iva = parseFloat(item.config_value);
      } else if (item.config_key === "uninvoiced_increment") {
        config.uninvoicedIncrement = parseFloat(item.config_value);
      }
    });

    return config;
  } catch (error) {
    console.error("Error fetching system config:", error);
    return { iva: 19, uninvoicedIncrement: 5 };
  }
}

export async function getRegionTaxStatus(
  supabase: SupabaseClient,
  regionId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("regions")
      .select("has_tax")
      .eq("id", regionId)
      .maybeSingle();

    if (error) throw error;

    return data?.has_tax ?? true;
  } catch (error) {
    console.error("Error fetching region tax status:", error);
    return true;
  }
}

export async function calculatePrice(
  input: PriceCalculationInput,
  supabase: SupabaseClient
): Promise<PriceCalculationResult> {
  const regionHasTax = await getRegionTaxStatus(supabase, input.regionId);

  let taxRate = 0;
  let taxAmount = 0;

  if (!input.isInvoiced) {
    taxRate = input.uninvoicedIncrement;
    taxAmount = (input.grossPrice * taxRate) / 100;
  } else if (regionHasTax) {
    taxRate = input.ivaPercentage;
    taxAmount = (input.grossPrice * taxRate) / 100;
  }

  const netPrice = input.grossPrice + taxAmount;

  return {
    grossPrice: input.grossPrice,
    taxRate,
    taxAmount,
    netPrice,
  };
}

export async function recalculatePriceHistory(
  supabase: SupabaseClient,
  priceHistoryId: string
): Promise<void> {
  try {
    const { data: priceData, error: fetchError } = await supabase
      .from("supplier_price_history")
      .select("*, regions(has_tax)")
      .eq("id", priceHistoryId)
      .maybeSingle();

    if (fetchError || !priceData) throw fetchError;

    const config = await getSystemConfig(supabase);
    const regionHasTax = (priceData.regions as any)?.has_tax ?? true;

    let taxRate = 0;
    let taxAmount = 0;

    if (!priceData.is_invoiced) {
      taxRate = config.uninvoicedIncrement;
      taxAmount = (priceData.gross_price * taxRate) / 100;
    } else if (regionHasTax) {
      taxRate = config.iva;
      taxAmount = (priceData.gross_price * taxRate) / 100;
    }

    const netPrice = priceData.gross_price + taxAmount;

    await supabase
      .from("supplier_price_history")
      .update({
        tax_rate: taxRate,
        tax_amount: taxAmount,
        net_price: netPrice,
        updated_at: new Date().toISOString(),
      })
      .eq("id", priceHistoryId);
  } catch (error) {
    console.error("Error recalculating price history:", error);
  }
}
