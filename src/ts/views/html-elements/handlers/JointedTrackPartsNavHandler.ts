import { JournalModel } from "../../../models/JournalModel";
import { JournalController } from "../../../controllers/JournalController";
import { AnchorHandler } from "./basic/AnchorHandler";
import { LiHandler } from "./basic/LiHandler";
import { PaginationHandler } from "./basic/PaginationHandler";
import { HtmlElementHandler } from "./basic/HtmlElementHandler";

export class JointedTrackPartsNavHandler extends HtmlElementHandler<HTMLElement, JointedTrackPartsNavHandler> {

	private static readonly PREVIOUS_TEXT = "<<";
	private static readonly NEXT_TEXT = ">>";

	private readonly journalModel: JournalModel;
	private readonly previousLiHandler: LiHandler;
	private readonly nextLiHandler: LiHandler;
	private readonly middleAnchorHandler: AnchorHandler;

	public constructor(journalController: JournalController, journalModel: JournalModel) {
		let previousLiHandler: LiHandler = new LiHandler()
			.embed(new AnchorHandler("previous-journal-page")
				.addText(JointedTrackPartsNavHandler.PREVIOUS_TEXT));
		previousLiHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			journalController.previous();
		});

		let middleAnchorHandler: AnchorHandler = new AnchorHandler("current-journal-page");
		let middleLiHandler: LiHandler = new LiHandler()
			.embed(middleAnchorHandler)
			.disable();
		middleLiHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
		});

		let nextLiHandler: LiHandler = new LiHandler()
			.embed(new AnchorHandler("next-journal-page")
				.addText(JointedTrackPartsNavHandler.NEXT_TEXT));
		nextLiHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			journalController.next();
		});

		let pagination: HTMLUListElement = new PaginationHandler()
			.embed(previousLiHandler)
			.embed(middleLiHandler)
			.embed(nextLiHandler)
			.getHtmlElement();

		let nav = document.createElement("nav");
		nav.classList.add("text-center");
		nav.appendChild(pagination);

		super(nav);
		this.journalModel = journalModel;
		this.previousLiHandler = previousLiHandler;
		this.nextLiHandler = nextLiHandler;
		this.middleAnchorHandler = middleAnchorHandler;
	}

	public update(): void {
		if (this.journalModel.hasPrevious()) {
			this.previousLiHandler.enable();
		} else {
			this.previousLiHandler.disable();
		}

		this.middleAnchorHandler.removeChilds();
		this.middleAnchorHandler.addText(this.journalModel.generateInfo());

		if (this.journalModel.hasNext()) {
			this.nextLiHandler.enable();
		} else {
			this.nextLiHandler.disable();
		}
	}

	protected getConcreteHandler(): JointedTrackPartsNavHandler {
		return this;
	}

}
