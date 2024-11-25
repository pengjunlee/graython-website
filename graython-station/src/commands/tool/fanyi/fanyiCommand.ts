import { CommandType } from "../../core/command";
import { baiduTranslateApi } from "../../../api/terminal";

/**
 * 翻译命令
 * @author pengjunlee
 */
const fanyiCommand: CommandType = {
  func: "fanyi",
  name: "英汉互译",
  alias: ["fy"],
  params: [
    {
      key: "word",
      desc: "要翻译的内容",
      required: true,
    },
  ],
  options: [
    {
      key: "from",
      desc: "源语言",
      alias: ["f"],
      type: "string",
      defaultValue: "auto",
    },
    {
      key: "to",
      desc: "目标语言",
      alias: ["t"],
      type: "string",
      defaultValue: "auto",
    },
  ],
  collapsible: true,
  icon: "🧰",
  async action(options, terminal) {
    const { _, from, to } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("缺少参数");
      return;
    }
    const word = _.join(" ");
    const res: any = await baiduTranslateApi({
      word,
      from,
      to,
    });
    if (res?.success) {
      terminal.writeTextSuccessResult(
        `翻译结果：${res.data.trans_result[0].dst}`
      );
    } else {
      terminal.writeTextErrorResult(res?.message ?? "翻译失败");
    }
  },
};

export default fanyiCommand;
