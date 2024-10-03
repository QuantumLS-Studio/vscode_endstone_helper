/*
 * @Author: DevMoxi moxiout@gmail.com
 * @Date: 2022-09-04 13:46:32
 * @LastEditTime: 2022-09-04 15:02:06
 */
import * as vscode from "vscode";
import { InlineDebugAdapterFactory } from "./InlineDebugAdapterFactory";
import { ESConfigProvider } from "./ESConfigProvider";
export function activateDebugger(context: vscode.ExtensionContext) {
	const provider = new ESConfigProvider();
	context.subscriptions.push(
		vscode.debug.registerDebugConfigurationProvider("endstone", provider)
	);
	var factory = new InlineDebugAdapterFactory();
	context.subscriptions.push(
		vscode.debug.registerDebugAdapterDescriptorFactory("endstone", factory)
	);
}