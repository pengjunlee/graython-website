import { CommandType } from "../core/command";

/**
 * 知乎搜索命令
 * @author pengjunlee
 */
const zhihuCommand: CommandType = {
  func: "zhihu",
  name: "知乎快捷搜索",
  alias: [],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      desc: "是否当前页面打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  icon: '🔍️',
  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ? _[0] : "";
    const targetLink = `https://www.zhihu.com/search?q=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default zhihuCommand;
