import { Router } from "../../../../Router";
import { Icons } from "../../Icons";
import { ButtonHandler } from "../basic/ButtonHandler";
import { FormGroupHandler } from "../basic/form/FormGroupHandler";
import { FormHandler } from "../basic/form/FormHandler";

export class BackFormHandler extends FormHandler {

	private static readonly TEXT: string = " К журналу звеньев";

	public constructor() {
		super();

		this.embed(new FormGroupHandler()
			.embed(new ButtonHandler()
				.setSubmitType()
				.addDefaultStyle()
				.addBlockStyle()
				.addClonedNodes(Icons.BOOK)
				.addText(BackFormHandler.TEXT)));

		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			let router: Router = Router.getInstance()
			router.routeToJournalView();
		});
	}

	protected getConcreteHandler(): BackFormHandler {
		return this;
	}

}
