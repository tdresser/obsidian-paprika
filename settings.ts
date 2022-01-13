import { App, PluginSettingTab, Setting } from "obsidian";
import { ObsidianPaprikaPlugin } from "main";

export interface ObsidianPaprikaSettings {
	email: string;
	password: string;
	recipes_path: string;
}

export const DEFAULT_SETTINGS: ObsidianPaprikaSettings = {
	email: "",
	password: "",
	recipes_path: "recipes",
};

export class ObsidianPaprikaSettingTab extends PluginSettingTab {
	plugin: ObsidianPaprikaPlugin;

	constructor(app: App, plugin: ObsidianPaprikaPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Obsidian Paprika Settings." });

		new Setting(containerEl)
			.setName("Email")
			.setDesc("Email for obsidian sync service.")
			.addText((text) =>
				text
					.setPlaceholder("youraddress@site.com")
					.setValue(this.plugin.settings.email)
					.onChange(async (value) => {
						this.plugin.settings.email = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Password")
			.setDesc("Password for obsidian sync service.")
			.addText((text) => {
				text.setPlaceholder("••••••")
					.setValue(this.plugin.settings.email)
					.onChange(async (value) => {
						this.plugin.settings.email = value;
						await this.plugin.saveSettings();
					});
				text.inputEl.type = "password";
			});

        new Setting(containerEl)
			.setName("Path")
			.setDesc("Path to store recipes. Clean up the old folder if you change this.")
			.addText((text) => {
				text.setPlaceholder("recipes")
					.setValue(this.plugin.settings.recipes_path)
					.onChange(async (value) => {
						this.plugin.settings.recipes_path = value;
						await this.plugin.saveSettings();
					});
			});
	}
}
