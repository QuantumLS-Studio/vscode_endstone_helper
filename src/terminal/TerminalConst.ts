/* eslint-disable @typescript-eslint/naming-convention */
/*
 * @Author: DevMoxi moxiout@gmail.com
 * @Date: 2022-09-05 20:47:57
 * @LastEditTime: 2022-09-06 11:48:33
 */
export enum TerminalState {
	OPENED,
	STOPED,
	CRASHED,
}
export enum CommandType {
	LOAD,
	UNLOAD,
	RELOAD,
}
export const TerminalKeys = {
	STATE: "terminal_state",
	NAME: "ESAIDS",
};
