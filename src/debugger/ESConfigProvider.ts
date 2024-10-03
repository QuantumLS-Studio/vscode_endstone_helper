import * as vscode from "vscode";

export class ESConfigProvider
	implements vscode.DebugConfigurationProvider
{
	/**
	 * 用于初始化运行配置
	 * @param folder
	 * @param config
	 * @param token
	 * @returns
	 */
	resolveDebugConfiguration(
		folder: vscode.WorkspaceFolder | undefined,
		config: vscode.DebugConfiguration,
		token?: vscode.CancellationToken
	): vscode.ProviderResult<vscode.DebugConfiguration> {
		// if launch.json is missing or empty
		if (!config.type && !config.request && !config.name) {
			const editor = vscode.window.activeTextEditor;
			if (
				editor &&
				(editor.document.languageId === "python" )
			) {
				config.type = "endstone";
				config.name = "Launch";
				config.request = "launch";
				config.program = "${file}";
			}
		}

		if (config.name !== "Attach" && !config.program) {
			return vscode.window
				.showInformationMessage("Cannot find a Ruby file to debug")
				.then((_) => {
					return undefined; // abort launch
				});
		}
		return config;
	}
}
