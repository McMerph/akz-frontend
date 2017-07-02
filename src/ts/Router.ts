import { EditingController } from "./controllers/EditingController";
import { PassportController } from "./controllers/PassportController";
import { CreationController } from "./controllers/CreationController";
import { JournalController } from "./controllers/JournalController";
import { ViewController } from "./controllers/ViewController";

export class Router {

	private static uniqueInstance: Router;

	private viewControllers: ViewController[] = [];
	private editingController: EditingController;
	private passportController: PassportController;
	private creationController: CreationController;
	private journalController: JournalController;

	private constructor() {
		window.onpopstate = (event) => {
			this.routeViaQueryParams();
			this.animate();
		};
	}

	public static getInstance(): Router {
		if (!Router.uniqueInstance) {
			Router.uniqueInstance = new Router();
		}

		return Router.uniqueInstance;
	}

	public routeToEditingView(id: number): void {
		this.changeWindowHistory(this.editingController.getQueryParams(id));
		this.editingController.retrieveJointedTrackPartById(id);
		this.hideViews(this.editingController);
	}

	public routeToPassportView(id: number): void {
		this.changeWindowHistory(this.passportController.getQueryParams(id));
		this.passportController.retrievePassport(id);
		this.hideViews(this.passportController);
	}

	public routeToCreationView(): void {
		this.changeWindowHistory(this.creationController.getQueryParams());
		this.creationController.init();
		this.hideViews(this.creationController);
	}

	public routeToJournalView(): void {
		this.changeWindowHistory(this.journalController.getQueryParams());
		this.journalController.update();
		this.hideViews(this.journalController);
	}

	public routeViaQueryParams() {
		let routed: boolean = false;
		for (let viewController of this.viewControllers) {
			if (viewController.isActiveView()) {
				let normalizedQueryParamsFromUrl = viewController.updateFromUrl();
				this.changeWindowHistory(normalizedQueryParamsFromUrl);
				this.hideViews(viewController);
				routed = true;
				break;
			}
		}
		if (!routed) {
			this.routeToJournalView();
		}
		//TODO In journal view scroll to last clicked passport or edit button?
		this.animate();
	}

	public setEditingController(editingController: EditingController): void {
		this.viewControllers.push(editingController);
		this.editingController = editingController;
	}

	public setPassportController(passportController: PassportController): void {
		this.viewControllers.push(passportController);
		this.passportController = passportController;
	}

	public setCreationController(creationController: CreationController): void {
		this.viewControllers.push(creationController);
		this.creationController = creationController;
	}

	public setJournalController(journalController: JournalController): void {
		this.viewControllers.push(journalController);
		this.journalController = journalController;
	}

	private changeWindowHistory(queryParams: string): void {
		window.history.pushState({}, "", queryParams);
	}

	private hideViews(except: ViewController): void {
		for (let viewController of this.viewControllers) {
			if (viewController !== except) {
				viewController.hideView();
			}
		}
		except.showView();
		this.animate();
	}

	private animate(): void {
		$("html, body").animate({ scrollTop: "0px" }, 300);
	}

}
