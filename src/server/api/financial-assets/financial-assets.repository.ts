import type { Raw } from "@/server/shared/sql.type";
import {
	type FinancialAsset,
	validateFinancialAsset,
} from "@server/domain/financial-asset.type";
import {
	insert,
	readCommands,
	selectAll,
	selectById,
	selectByUserId,
	update,
} from "@server/shared/sql.utils";
import { Database } from "bun:sqlite";

const financialAssetsSql = await readCommands("financial_assets");

/**
 * Selects all financial assets
 * @returns The financial assets array
 */
export const selectAllFinancialAssets = (): FinancialAsset[] => {
	const results = selectAll<FinancialAsset>(financialAssetsSql.SELECT_ALL);
	return results || [];
};

/**
 * Selects a financial asset by id
 * @param id - The id of the financial asset
 * @returns The financial asset
 * @throws AppError if the financial asset is not found
 */
export const selectFinancialAssetById = (id: number): FinancialAsset => {
	const result = selectById<FinancialAsset>(
		financialAssetsSql.SELECT_BY_ID,
		id,
	);
	return result;
};

/**
 * Selects financial assets by user id
 * @param userId - The user id
 * @returns The financial assets array
 */
export const selectFinancialAssetsByUserId = (
	userId: number,
): FinancialAsset[] => {
	const results = selectByUserId<FinancialAsset>(
		financialAssetsSql.SELECT_BY_USER_ID,
		userId,
	);
	return results || [];
};

/**
 * Inserts a financial asset
 * @param assetToInsert - The financial asset to insert
 * @returns The financial asset inserted
 * @throws AppError if the financial asset is not valid
 */
export const insertFinancialAsset = (
	assetToInsert: Raw<FinancialAsset>,
): FinancialAsset => {
	validateFinancialAsset(assetToInsert);
	const assetId = insert<Raw<FinancialAsset>>(
		financialAssetsSql.INSERT,
		assetToInsert,
	);
	const asset = selectById<FinancialAsset>(
		financialAssetsSql.SELECT_BY_ID,
		assetId,
	);
	return asset;
};

/**
 * Updates a financial asset
 * @param id - The id of the financial asset to update
 * @param assetToUpdate - The financial asset data to update
 * @returns The updated financial asset
 * @throws AppError if the financial asset is not valid or not found
 */
export const updateFinancialAsset = (
	id: number,
	assetToUpdate: Partial<FinancialAsset>,
): FinancialAsset => {
	// First retrieve the existing asset to ensure it exists
	const existingAsset = selectFinancialAssetById(id);

	// Merge the existing asset with the updates
	const mergedAsset = {
		...existingAsset,
		...assetToUpdate,
		id: existingAsset.id, // Ensure ID doesn't change
		updated_at: new Date(),
	};

	// Validate the merged asset
	validateFinancialAsset(mergedAsset);

	// Update the asset
	update<Partial<FinancialAsset>>(financialAssetsSql.UPDATE, mergedAsset);

	// Retrieve and return the updated asset
	return selectFinancialAssetById(id);
};

/**
 * Deletes a financial asset
 * @param id - The id of the financial asset to delete
 * @returns True if the financial asset was deleted
 * @throws AppError if the financial asset is not found
 */
export const deleteFinancialAsset = (id: number): boolean => {
	// First check if the asset exists
	selectFinancialAssetById(id);

	// Delete the asset by directly executing the query
	const db = new Database(":memory:", { safeIntegers: false, strict: true });
	const query = db.query(financialAssetsSql.DELETE);
	const result = query.run({ id });

	return result.changes > 0;
};
