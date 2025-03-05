import type { AssetType } from "@/server/domain/financial-asset.type";

/**
 * Represents a new financial asset DTO
 */
export type FinancialAssetPostRequest = {
	name: string;
	type: AssetType;
	value: number;
	purchase_date?: string;
	description?: string;
};
