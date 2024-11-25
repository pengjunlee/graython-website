import { CommandType } from "../core/command";

/**
 * 查看历史命令
 * @author pengjunlee
 */
const historyCommand: CommandType = {
  func: "history",
  name: "查看执行历史",
  alias: ["h"],
  options: [],
  collapsible: true,
  icon:"⚙",
  action(options, terminal): void {
    const commandOutputTypes = terminal.listCommandHistory();
    // terminal.writeTextResult(`⭐️ 输入 ![序号] 可以快速执行某条历史命令`);
    commandOutputTypes.forEach((command, index) => {
      terminal.writeTextResult(`${index + 1} ${command.text}`);
    });
  },
};

export default historyCommand;
