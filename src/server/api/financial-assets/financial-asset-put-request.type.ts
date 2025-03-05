import type { AssetType } from "@/server/domain/financial-asset.type";

/**
 * Represents a financial asset update DTO
 */
export type FinancialAssetPutRequest = {
	name?: string;
	type?: AssetType;
	value?: number;
	purchase_date?: string;
	description?: string;
};
