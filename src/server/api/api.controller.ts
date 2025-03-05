import { corsPreflight } from "../shared/response.utils";
import {
	financialAssetByIdRoutes,
	financialAssetsRoutes,
} from "./financial-assets/financial-assets.controller";
import { toolsRoutes } from "./tools/tools.controller";

/**
 * API Routes
 * - /api/tools - Tools API
 * - /api/financial-assets - Financial Assets API
 * - /api/financial-assets/:id - Financial Asset by ID API
 */
export const apiRoutes = {
	"/api/*": {
		OPTIONS: (request: Request) => corsPreflight(request),
	},
	"/api/tools": toolsRoutes,
	"/api/financial-assets": financialAssetsRoutes,
	"/api/financial-assets/:id": financialAssetByIdRoutes,
};
