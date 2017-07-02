export class ViewHelper {

	public static show(htmlElement: HTMLElement) {
		htmlElement.style.display = "";
	}

	public static hide(htmlElement: HTMLElement) {
		htmlElement.style.display = "none";
	}

	public static getSpaceSeparatedClasses(htmlElement: HTMLElement): string {
		return htmlElement.classList.toString();
	}

	public static getSelectorById(id: string): string {
		return "#" + id;
	}

}