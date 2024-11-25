import { CommandType } from "./command";
import searchCommands from "../search/searchCommands";
import gotoCommand from "../tool/gotoCommand";
import dateCommand from "../terminal/dateCommand";
import clearCommand from "../terminal/clearCommand";
import historyCommand from "../terminal/historyCommand";
import userCommands from "../user/userCommands";
import toyCommand from "../toy/toyCommand";
import timingCommand from "../tool/timing/timingCommand";
import backgroundCommand from "../terminal/config/backgroundCommand";
import resetCommand from "../terminal/config/resetCommand";
import fanyiCommand from "../tool/fanyi/fanyiCommand";
import helpCommand from "../terminal/help/helpCommand";
import aboutCommand from "../terminal/about/aboutCommand";
import hintCommand from "../terminal/config/hintCommand";
import todoCommand from "../tool/todo/todoCommand";
import jsonCommand from "../tool/json/jsonFormatterCommand";
import musicCommand from "../relax/music/musicCommand";
import moyuCommand from "../relax/moyu/moyuCommand";
import shortcutCommand from "../terminal/shortcut/shortcutCommand";
import ikunCommand from "../relax/ikun/ikunCommand";
import welcomeCommand from "../terminal/config/welcomeCommand";

/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
  // 工具箱
  fanyiCommand,
  jsonCommand,
  todoCommand,
  timingCommand,
  gotoCommand,

  // 玩具
  toyCommand,

  // 终端
  helpCommand,
  shortcutCommand,
  aboutCommand,
  backgroundCommand,
  welcomeCommand,
  resetCommand,
  hintCommand,
  clearCommand,
  historyCommand,
  dateCommand,

  // 娱乐
  ikunCommand,
  moyuCommand,
  musicCommand,

  // 用户
  ...userCommands,

  // 搜索
  ...searchCommands,

];

/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
