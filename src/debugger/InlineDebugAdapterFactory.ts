/*
 * @Author: DevMoxi moxiout@gmail.com
 * @Date: 2022-09-04 14:54:26
 * @LastEditTime: 2022-09-04 14:54:37
 */
import * as vscode from "vscode";
import { ProviderResult } from "vscode";
import { workspaceFileAccessor } from "../utils/FileAccessor";
import { ESDebugSession } from "./ESDebugSession";

export class InlineDebugAdapterFactory
	implements vscode.DebugAdapterDescriptorFactory
{
	createDebugAdapterDescriptor(
		_session: vscode.DebugSession
	): ProviderResult<vscode.DebugAdapterDescriptor> {
		return new vscode.DebugAdapterInlineImplementation(
			new ESDebugSession(workspaceFileAccessor)
		);
	}
}
