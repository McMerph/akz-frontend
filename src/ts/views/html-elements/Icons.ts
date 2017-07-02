export class Icons {

	private static getIcon(...classes: string[]): HTMLSpanElement {
		let icon: HTMLSpanElement = document.createElement("span");
		icon.classList.add("icon", ...classes);

		return icon;
	}

	public static readonly BOOK: HTMLSpanElement = Icons.getIcon("icon-book");
	public static readonly CALENDAR: HTMLSpanElement = Icons.getIcon("icon-calendar");
	public static readonly CHEVRON_DOWN: HTMLSpanElement = Icons.getIcon("icon-chevron-down");
	public static readonly CHEVRON_LEFT: HTMLSpanElement = Icons.getIcon("icon-chevron-left");
	public static readonly CHEVRON_RIGHT: HTMLSpanElement = Icons.getIcon("icon-chevron-right");
	public static readonly CHEVRON_UP: HTMLSpanElement = Icons.getIcon("icon-chevron-up");
	public static readonly CROSSHAIR: HTMLSpanElement = Icons.getIcon("icon-crosshairs");
	public static readonly OK: HTMLSpanElement = Icons.getIcon("icon-ok");
	public static readonly PENCIL: HTMLSpanElement = Icons.getIcon("icon-pencil");
	public static readonly PLUS: HTMLSpanElement = Icons.getIcon("icon-plus");
	public static readonly REFRESH: HTMLSpanElement = Icons.getIcon("icon-refresh");
	public static readonly SEARCH: HTMLSpanElement = Icons.getIcon("icon-search");
	public static readonly TEXT: HTMLSpanElement = Icons.getIcon("icon-text");
	public static readonly TIME: HTMLSpanElement = Icons.getIcon("icon-time");
	public static readonly TIMES: HTMLSpanElement = Icons.getIcon("icon-times");
	public static readonly TRASH: HTMLSpanElement = Icons.getIcon("icon-trash");
	public static readonly XLSX: HTMLSpanElement = Icons.getIcon("icon-xlsx");

}
