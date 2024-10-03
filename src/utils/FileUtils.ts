/* eslint-disable @typescript-eslint/naming-convention */
/*
 * @Author: DevMoxi moxiout@gmail.com
 * @Date: 2022-09-13 10:56:15
 * @LastEditTime: 2022-09-18 15:26:19
 */
/*
 * @Author: DevMoxi moxiout@gmail.com
 * @Date: 2022-09-13 10:56:15
 * @LastEditTime: 2022-09-13 11:38:44
 */
import * as fs from "fs";
import * as vscode from "vscode";
import { ConfigScope, Sections } from "../data/ConfigScope";

/**
 * 同步查找文件匹配
 * @param sourceDir
 * @param rule
 * @returns
 */
export function findFileMatchSync(
	sourceDir: string,
	rule: string
): string | null {
	var files = fs.readdirSync(sourceDir);
	for (var i = 0; i < files.length; i++) {
		var fileName = files[i];
		var filePath = sourceDir + "/" + fileName;
		var stat = fs.lstatSync(filePath);
		if (stat.isFile()) {
			if (filePath.match(rule)) {
				return filePath;
			} else {
				continue;
			}
		} else {
			var result = findFileMatchSync(filePath, rule);
			if (result) {
				return result;
			}
		}
	}
	return null;
}

/**
 * 调起选择目录
 * @param  {string} title
 */
export function selectFolder(title: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const USER_HOME = process.env.HOME || process.env.USERPROFILE;
		// 选择目录
		var back = vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
			openLabel: title,
			defaultUri: vscode.Uri.file(USER_HOME as string),
		});

		back.then((uri) => {
			if (uri === undefined || uri === null) {
				reject("NULLABLE");
				return;
			}
			resolve(uri[0].fsPath);
		});
	});
}

export function isBDSPath(path: string | null): boolean {
	if (path === null || path === undefined) {
		return false;
	}
	if (!fs.statSync(path).isDirectory()) {
		return false;
	}
	// platform
	if (process.platform === "win32") {
		return fs.existsSync(path + "\\bedrock_server.exe");
	}
	return fs.existsSync(path + "/bedrock_server");
}

export function getBDSpath(): string {
	const path = ConfigScope.setting().get(Sections.bdsPath) as string;
	console.log(path);
	if (isBDSPath(path)) {
		return path;
	}
	vscode.commands.executeCommand("extension.esda.config");
	throw new Error("BDS PATH 未配置");
}
