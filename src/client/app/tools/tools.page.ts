import type { Tool } from "../../domain/tool.type";
import { ToolsTableComponent } from "./tools-table.component";
import { getTools } from "./tools.repository";

const html = String.raw;
customElements.define("app-tools-table", ToolsTableComponent);

/**
 * About page component
 */
export class ToolsPage extends HTMLElement {
	#template = html`
    <h1>Tools used in this project</h1>
    <app-tools-table></app-tools-table>
  `;
	#state: Tool[] = [];
	#toolsTable: ToolsTableComponent | null = null;

	constructor() {
		super();
		this.#render();
	}

	async connectedCallback() {
		this.#state = await getTools();
		this.#render();
	}

	#render() {
		this.innerHTML = this.#template;
		this.#toolsTable = this.querySelector("app-tools-table");
		if (this.#toolsTable) {
			this.#toolsTable.tools = this.#state;
		}
	}
}
