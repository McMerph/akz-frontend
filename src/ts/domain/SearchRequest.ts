export class SearchRequest {

	public static readonly DEFAULT_FIRST_RESULT = 0;
	public static readonly DEFAULT_MAX_RESULTS = 50;
	public static readonly DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm:ss";

	public static readonly PREFIX_TEXT: string = "Звенья с";
	public static readonly TO_TEXT: string = "по";

	private firstResult: number;
	private maxResults: number;
	private dateMin: string;
	private dateMax: string;

	public constructor() {
		this.firstResult = SearchRequest.DEFAULT_FIRST_RESULT;
		this.maxResults = SearchRequest.DEFAULT_MAX_RESULTS;
		this.dateMin = (window as any).moment().startOf("day").format(SearchRequest.DATE_TIME_FORMAT);
		this.dateMax = (window as any).moment().startOf("day").add(1, "days").format(SearchRequest.DATE_TIME_FORMAT);
	}

	public generateDatesInfo(): string {
		return `${SearchRequest.PREFIX_TEXT} ${this.dateMin} ${SearchRequest.TO_TEXT} ${this.dateMax} (по данным на ${(window as any).moment().format(SearchRequest.DATE_TIME_FORMAT)})`;
	}

	public previous(): void {
		this.firstResult -= this.maxResults;

		if (this.firstResult < 0) {
			this.firstResult = 0;
		}
	}

	public next(): void {
		this.firstResult += this.maxResults;
	}

	public getFirstResult(): number {
		return this.firstResult;
	}

	public setFirstResult(firstResult: number) {
		this.firstResult = firstResult;
	}

	public getMaxResults(): number {
		return this.maxResults;
	}

	public setMaxResults(maxResults: number) {
		this.maxResults = maxResults;
	}

	public getDateMin(): string {
		return this.dateMin;
	}

	public setDateMin(dateMin: string) {
		this.dateMin = dateMin;
	}

	public getDateMax(): string {
		return this.dateMax;
	}

	public setDateMax(dateMax: string) {
		this.dateMax = dateMax;
	}

	public toString(): string {
		return `SearchRequest{firstResult = ${this.firstResult}, maxResults = ${this.maxResults}, dateMin = ${this.dateMin}, dateMax = ${this.dateMax}}`;
	}

}