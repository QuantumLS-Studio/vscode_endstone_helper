/* eslint-disable @typescript-eslint/naming-convention */
/*
 * @Author: DevMoxi moxiout@gmail.com
 * @Date: 2022-09-16 08:28:20
 * @LastEditTime: 2022-09-18 15:19:46
 */

import * as vscode from "vscode";
import { globalState } from "../extension";
export class ConfigScope {
	static setting(): vscode.WorkspaceConfiguration {
		return vscode.workspace.getConfiguration("extension.esda");
	}

	static global() {
		return {
			save: (key: string, value: any): Thenable<void> => {
				return globalState.update("extension.esda." + key, value);
			},
			get: (key: string): any => {
				return globalState.get("extension.esda." + key);
			},
		};
	}
}

export const Sections = {
	noReminder: "noReminder",
	noReminder2: "noReminder2",
	bdsPath: "bdsPath",
};
