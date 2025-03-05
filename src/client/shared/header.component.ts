import { renderAnchor } from "./dom.utils";
import { navigate } from "./navigation.utils";
import { ThemeToggle } from "./toggle-theme.component";

const html = String.raw;
customElements.define("app-theme-toggle", ThemeToggle);

/**
 * A semantic header web component with navigation
 */
export class Header extends HTMLElement {
	#appName = "Full stack Blueprint";
	#state = [{ href: "#tools", text: "Tools" }];
	#anchors = Array.from(this.querySelectorAll<HTMLAnchorElement>("a"));
	#template = html`
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <a href="#home"><strong>${this.#appName}</strong></a>
          </li>
        </ul>
        <ul>
          ${this.#renderLinks()}
          <li>
            <app-theme-toggle></app-theme-toggle>
          </li>
        </ul>
      </nav>
    </header>
  `;
	constructor() {
		super();
		this.#render();
		navigate(window.location.hash);
	}

	connectedCallback() {
		for (const anchor of this.#anchors) {
			anchor.addEventListener("click", (event: Event) =>
				this.#handleClick(event),
			);
		}
	}

	#render() {
		this.innerHTML = this.#template;
		this.#anchors = Array.from(this.querySelectorAll<HTMLAnchorElement>("a"));
	}

	#renderLinks() {
		const links = this.#state.map(
			(link) => html`<li>${renderAnchor(link.href, link.text)}</li>`,
		);
		return links.join("");
	}

	#handleClick(event: Event) {
		event.preventDefault();
		const anchor = event.target as HTMLAnchorElement;
		const href = anchor.getAttribute("href");
		navigate(href);
	}
}
