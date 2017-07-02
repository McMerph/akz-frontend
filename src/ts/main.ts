import "babel-polyfill"; // for ie11
import "../../bower_components/classList.js/classList.min.js"; // for ie11

import * as $ from "jquery";
(window as any).$ = (window as any).jQuery = $;
import "jquery-deparam";

import * as moment from "moment";
(window as any).moment = moment;
import "../../node_modules/moment/locale/ru.js";

import "bootstrap";
import "eonasdan-bootstrap-datetimepicker";

import { RestApi } from "./rest-api/RestApi";
import { EditingModel } from "./models/EditingModel";
import { PassportModel } from "./models/PassportModel";
import { CreationModel } from "./models/CreationModel";
import { JournalModel } from "./models/JournalModel";
import { ControllersRelations } from "./controllers/ControllersRelations";
import { EditingController } from "./controllers/EditingController";
import { PassportController } from "./controllers/PassportController";
import { CreationController } from "./controllers/CreationController";
import { JournalController } from "./controllers/JournalController";
import { ModalHandler } from "./views/html-elements/handlers/basic/ModalHandler";
import { FixedTopHandler } from "./views/html-elements/handlers/basic/FixedTopHandler";
import { Router } from "./Router";

document.addEventListener("DOMContentLoaded", () => {
	ModalHandler.appendToBody();
	FixedTopHandler.appendToBody();
	initRouter();
});

function initRouter(): void {
	let restApi = new RestApi();
	let editingModel: EditingModel = new EditingModel(restApi);
	let passportModel: PassportModel = new PassportModel(restApi);
	let creationModel: CreationModel = new CreationModel(restApi);
	let journalModel: JournalModel = new JournalModel(restApi);

	let controllersRelations: ControllersRelations = new ControllersRelations();
	let editingController: EditingController = new EditingController(controllersRelations, editingModel);
	let passportController: PassportController = new PassportController(controllersRelations, passportModel);
	let creationController: CreationController = new CreationController(controllersRelations, creationModel);
	let journalController: JournalController = new JournalController(controllersRelations, journalModel);
	controllersRelations.setEditingController(editingController);
	controllersRelations.setJounalController(journalController);

	let router: Router = Router.getInstance();
	router.setEditingController(editingController);
	router.setPassportController(passportController);
	router.setCreationController(creationController);
	router.setJournalController(journalController);
	router.routeViaQueryParams();
}
