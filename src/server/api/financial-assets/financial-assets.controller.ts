import type { FinancialAsset } from "@/server/domain/financial-asset.type";
import { AppError } from "@/server/shared/app-error.class";
import { guardGetUserId } from "@/server/shared/request.utils";
import type { Raw } from "@/server/shared/sql.type";
import { ok } from "@server/shared/response.utils";
import type { FinancialAssetPostRequest } from "./financial-asset-post-request.type";
import type { FinancialAssetPutRequest } from "./financial-asset-put-request.type";
import {
	deleteFinancialAsset,
	insertFinancialAsset,
	selectAllFinancialAssets,
	selectFinancialAssetById,
	selectFinancialAssetsByUserId,
	updateFinancialAsset,
} from "./financial-assets.repository";

/**
 * Routes controller for /api/financial-assets
 * - GET: Get all financial assets or assets for current user
 * - POST: Create a new financial asset
 * @description Object that wires the request to the correct controller
 */
export const financialAssetsRoutes = {
	GET: async (request: Request) => await getFinancialAssets(request),
	POST: async (request: Request) => await postFinancialAsset(request),
};

/**
 * Routes controller for /api/financial-assets/:id
 * - GET: Get a financial asset by id
 * - PUT: Update a financial asset
 * - DELETE: Delete a financial asset
 * @description Object that wires the request to the correct controller
 */
export const financialAssetByIdRoutes = {
	GET: async (request: Request) => await getFinancialAssetById(request),
	PUT: async (request: Request) => await putFinancialAsset(request),
	DELETE: async (request: Request) => await deleteFinancialAssetById(request),
};

/**
 * Extracts an ID from the URL path
 * @param request - The HTTP request
 * @returns The ID from the path
 */
const extractIdFromPath = (request: Request): number => {
	const path = new URL(request.url).pathname;
	const segments = path.split("/");
	const idString = segments[segments.length - 1];
	const id = Number(idString);

	if (Number.isNaN(id)) {
		throw new AppError("Invalid ID in URL", "LOGIC");
	}

	return id;
};

/**
 * Get all financial assets
 * Handles the GET request to retrieve all financial assets or assets for a specific user
 * @param request - The HTTP request object
 * @returns A response containing the financial assets
 */
const getFinancialAssets = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const userOnly = url.searchParams.get("userOnly") === "true";

	let assets: FinancialAsset[];

	if (userOnly) {
		const userId = guardGetUserId(request);
		assets = selectFinancialAssetsByUserId(userId);
	} else {
		assets = selectAllFinancialAssets();
	}

	return ok<FinancialAsset[]>(assets);
};

/**
 * Get a financial asset by id
 * Handles the GET request to retrieve a financial asset by id
 * @param request - The HTTP request object
 * @returns A response containing the financial asset
 */
const getFinancialAssetById = async (request: Request): Promise<Response> => {
	const id = extractIdFromPath(request);
	const asset = selectFinancialAssetById(id);
	return ok<FinancialAsset>(asset);
};

/**
 * Create a new financial asset
 * Handles the POST request to create a new financial asset
 * @param request - The HTTP request object
 * @returns A response containing the created financial asset
 */
const postFinancialAsset = async (request: Request): Promise<Response> => {
	const userId = guardGetUserId(request);
	const assetDto = (await request.json()) as FinancialAssetPostRequest;

	const assetToInsert: Raw<FinancialAsset> = {
		...assetDto,
		user_id: userId,
		purchase_date: assetDto.purchase_date
			? new Date(assetDto.purchase_date)
			: new Date(),
		description: assetDto.description || "", // Ensure description is not undefined
	};

	const asset = insertFinancialAsset(assetToInsert);
	return ok<FinancialAsset>(asset);
};

/**
 * Update a financial asset
 * Handles the PUT request to update a financial asset
 * @param request - The HTTP request object
 * @returns A response containing the updated financial asset
 */
const putFinancialAsset = async (request: Request): Promise<Response> => {
	const id = extractIdFromPath(request);
	const userId = guardGetUserId(request);
	const assetDto = (await request.json()) as FinancialAssetPutRequest;

	// Ensure the asset belongs to the current user
	const existingAsset = selectFinancialAssetById(id);
	if (existingAsset.user_id !== userId) {
		throw new AppError("Not authorized to update this asset", "LOGIC");
	}

	const assetToUpdate: Partial<FinancialAsset> = {
		...assetDto,
		purchase_date: assetDto.purchase_date
			? new Date(assetDto.purchase_date)
			: undefined,
	};

	const asset = updateFinancialAsset(id, assetToUpdate);
	return ok<FinancialAsset>(asset);
};

/**
 * Delete a financial asset
 * Handles the DELETE request to delete a financial asset
 * @param request - The HTTP request object
 * @returns A response indicating success
 */
const deleteFinancialAssetById = async (
	request: Request,
): Promise<Response> => {
	const id = extractIdFromPath(request);
	const userId = guardGetUserId(request);

	// Ensure the asset belongs to the current user
	const existingAsset = selectFinancialAssetById(id);
	if (existingAsset.user_id !== userId) {
		throw new AppError("Not authorized to delete this asset", "LOGIC");
	}

	const success = deleteFinancialAsset(id);
	return ok({ success });
};
