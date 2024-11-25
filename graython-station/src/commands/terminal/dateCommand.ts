import { CommandType } from "../core/command";
import myDayjs from "../../plugins/myDayjs";

/**
 * 日期命令
 * @author pengjunlee
 */
const dateCommand: CommandType = {
  func: "date",
  name: "查看当前日期",
  options: [],
  collapsible:true,
  icon:"⚙",
  action(options, terminal): void {
    const dateStr = myDayjs().format("YYYY-MM-DD HH:mm:ss");
    const output = `当前时间：${dateStr}`;
    terminal.writeTextResult(output);
  },
};

export default dateCommand;
