import { CommandType } from "../../core/command";
import { useTerminalConfigStore } from "./terminalConfigStore";
import { randomBgApi } from "../../../api/terminal";
import { globalConfig } from "../../../plugins/globalConfig";
/**
 * 切换终端背景
 * @author pengjunlee
 */
const backgroundCommand: CommandType = {
  func: "background",
  name: "切换终端背景",
  alias: ["bg"],
  params: [
    {
      key: "url",
      desc: "图片地址（不填则随机）",
      required: false,
    },
  ],
  options: [],
  collapsible:false,
  icon:"⚙",
  async action(options, terminal) {
    const { _ } = options;
    let url = _[0];
    if (_.length > 0) {
      url = _[0];
    }
    const { setBackground } = useTerminalConfigStore();
    if (!url) {
      // 随机获取壁纸
      const res = await randomBgApi();
      if (res?.success && res.data) {
        setBackground(globalConfig.apiHost + "/"+res.data);
      }
    } else {
      setBackground(url);
    }
  },
};

export default backgroundCommand;
