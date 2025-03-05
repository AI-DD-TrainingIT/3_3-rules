import { AppError } from "../shared/app-error.class";

/**
 * Represents a financial asset with its properties
 */
export type FinancialAsset = {
	id: number;
	name: string;
	type: string;
	value: number;
	purchase_date: Date;
	user_id: number;
	description: string;
	created_at: Date;
	updated_at: Date;
};

/**
 * Valid financial asset types
 */
export const ASSET_TYPES = [
	"stock",
	"bond",
	"fund",
	"crypto",
	"real_estate",
	"cash",
	"other",
] as const;
export type AssetType = (typeof ASSET_TYPES)[number];

/**
 * Default empty financial asset object
 */
export const NULL_FINANCIAL_ASSET: FinancialAsset = {
	id: 0,
	name: "",
	type: "",
	value: 0,
	purchase_date: new Date(),
	user_id: 0,
	description: "",
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a financial asset
 * @param asset - The financial asset to validate
 * @throws AppError if the asset is invalid
 */
export const validateFinancialAsset = (
	asset: Partial<FinancialAsset>,
): void => {
	if (!asset.name) {
		throw new AppError("Asset name is required", "LOGIC");
	}

	if (!asset.type) {
		throw new AppError("Asset type is required", "LOGIC");
	}

	if (!ASSET_TYPES.includes(asset.type as AssetType)) {
		throw new AppError(
			`Invalid asset type. Must be one of: ${ASSET_TYPES.join(", ")}`,
			"LOGIC",
		);
	}

	if (asset.value === undefined || asset.value < 0) {
		throw new AppError("Asset value must be a non-negative number", "LOGIC");
	}
};
