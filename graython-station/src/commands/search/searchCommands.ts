import { CommandType } from "../core/command";
import baiduCommand from "./baiduCommand";
import baidudevCommand from "./baidudevCommand";
import bilibiliCommand from "./bilibili/bilibiliCommand";
import bingCommand from "./bingCommand";
import googleCommand from "./googleCommand";
import zhihuCommand from "./zhihuCommand";

/**
 * 搜索源
 */
const fromDict: Record<string, CommandType> = {
  baidu: baiduCommand,
  baidudev: baidudevCommand,
  bilibili: bilibiliCommand,
  bing: bingCommand,
  google: googleCommand,
  zhihu: zhihuCommand,
};

/**
 * 搜索命令
 * @author pengjunlee
 */
const searchCommand: CommandType = {
  func: "search",
  name: "网页搜索",
  alias: ["s", "sousuo", "sou", "query"],
  desc: "支持从不同平台快捷搜索内容",
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      // 来源
      key: "from",
      alias: ["f"],
      type: "string",
      defaultValue: "baidu",
    },
    {
      key: "self",
      desc: "是否当前页面打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  // 默认使用百度搜索
  action: (options, terminal) => {
    const { from = "baidu" } = options;
    // 执行不同搜索源的搜索方法
    const fromObj = fromDict[from];
    if (!fromObj) {
      terminal.writeTextErrorResult("找不到搜索源");
      return;
    }
    return fromObj.action(options, terminal);
  },
};

export default [searchCommand, ...Object.values(fromDict)];
