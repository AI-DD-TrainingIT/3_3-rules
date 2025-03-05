import { HomePage } from "../app/home/home.page";
import { ToolsPage } from "../app/tools/tools.page";

customElements.define("app-tools-page", ToolsPage);
customElements.define("app-home-page", HomePage);

/**
 * Navigates to the specified path
 * @param path - The path to navigate to
 */
export const navigate = (path: string | null) => {
	// Hack for the home page on initial load
	const pageComponent = path
		? path.replace("#", "").replace(/\//g, "-")
		: "home";
	const pageSelector = `<app-${pageComponent}-page></app-${pageComponent}-page>`;
	const routerOutlet = document.getElementById("router-outlet");
	if (!routerOutlet) return;
	routerOutlet.innerHTML = pageSelector;
};
