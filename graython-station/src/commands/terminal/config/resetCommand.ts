import { CommandType } from "../../core/command";
import { useTerminalConfigStore } from "./terminalConfigStore";

/**
 * 重置配置
 * @author pengjunlee
 */
const resetCommand: CommandType = {
  func: "reset",
  name: "重置终端配置",
  alias: [],
  options: [],
  collapsible:false,
  icon:"⚙",
  action(options, terminal): void {
    const { reset } = useTerminalConfigStore();
    reset();
    terminal.writeTextSuccessResult("已重置终端配置");
  },
};

export default resetCommand;
