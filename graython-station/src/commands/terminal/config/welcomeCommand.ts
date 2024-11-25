import { CommandType } from "../../core/command";
import { useTerminalConfigStore } from "./terminalConfigStore";

/**
 * 自定义终端欢迎语
 * @author pengjunlee
 */
const welcomeCommand: CommandType = {
  func: "welcome",
  name: "自定义终端欢迎语",
  alias: [],
  params: [
    {
      key: "texts",
      desc: "欢迎语文本，可输入多个",
      required: true,
    },
  ],
  options: [],
  collapsible:false,
  icon:"⚙",
  async action(options, terminal) {
    const { _ } = options;
    let welcomeTexts = _;
    if (welcomeTexts.length < 1) {
      terminal.writeTextErrorResult("缺少欢迎语参数");
    } else {
      const { setWelcomeTexts } = useTerminalConfigStore();
      setWelcomeTexts(welcomeTexts);
      terminal.writeTextSuccessResult("欢迎语设置成功，刷新页面后生效");
    }
  },
};

export default welcomeCommand;
