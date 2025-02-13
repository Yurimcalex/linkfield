import CategoryMenu from './categoryMenu/MenuWrapper.js';
import MenuOpener from './categoryMenuOpener/OpenerWrapper.js';
import CommonComponent from './common/ComponentWrapper.js';
import Content from './linkCategories/ContentWrapper.js';
import SettingsMenu from './settingsMenu/SettingsMenuWrapper.js';
import SettingsWindow from './settingsWindow/SettingsWindowWrapper.js';
import ThemeMenu from './themeMenu/ThemeMenuWrapper.js';
import LoadingCover from './loadingCover/LoadingCoverWrapper.js';


export default class UI {
	constructor(store) {
		this.loadingCover = new LoadingCover(store);
		this.categoryMenu = new CategoryMenu(store);
		this.menuOpener = new MenuOpener(store);
		this.commonComponent = new CommonComponent(store);
		this.content = new Content(store);
		this.settingsMenu = new SettingsMenu(store);
		this.settingsWindow = new SettingsWindow(store);
		this.themeMenu = new ThemeMenu(store);
		
	}

	mount() {
		this.loadingCover.mount();
		this.categoryMenu.mount();
		this.menuOpener.mount();
		this.commonComponent.mount();
		this.content.mount();
		this.settingsMenu.mount();
		this.settingsWindow.mount();
		this.themeMenu.mount();	
	}

	update() {
		this.loadingCover.update();
		this.categoryMenu.update();
		this.content.update();
		this.menuOpener.update();
		this.commonComponent.update();
		this.settingsMenu.update();
		this.settingsWindow.update();
		this.themeMenu.update();
	}
}