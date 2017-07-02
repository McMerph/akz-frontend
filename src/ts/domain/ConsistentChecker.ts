export class ConsistentChecker {

	public static check(object: any): boolean {
		return Object.keys(object).every(
			key =>
				object[key] !== null &&
				object[key] !== undefined
		);
	}

}
