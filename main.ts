import { Plugin } from 'obsidian';
import {Paprika} from "paprika";
import {ObsidianPaprikaSettings, ObsidianPaprikaSettingTab, DEFAULT_SETTINGS} from "settings";

export class ObsidianPaprikaPlugin extends Plugin {
	settings: ObsidianPaprikaSettings;
	paprika: Paprika;

	async onload() {
		console.log("Loading Paprika");
		await this.loadSettings();
		this.addSettingTab(new ObsidianPaprikaSettingTab(this.app, this));

		this.paprika = new Paprika();
		await this.paprika.init();

		const vault = this.app.vault;

		if (vault.getAbstractFileByPath(this.settings.recipes_path) == null) {
			vault.createFolder(this.settings.recipes_path);
		}

		const templatePath = this.settings.recipes_path + "/template.md"
		const template = vault.getAbstractFileByPath(templatePath);
		if (template == null) {
			vault.create(templatePath, this.paprika.getDefaultTemplate())
		}
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

export default ObsidianPaprikaPlugin;