import { CommandType } from "../../core/command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = GrayTerminal.ComponentOutputType;
import addCommand from "./subCommands/addCommand";

/**
 * 待办事项命令
 * @author pengjunlee
 */
const todoCommand: CommandType = {
  func: "todo",
  name: "待办事项",
  desc: "记录和管理待办事项",
  params: [
    {
      key: "subCommand",
      desc: "子命令",
      required: true,
    },
  ],
  options: [],
  subCommands: {
    add: addCommand,
  },
  collapsible: true,
  icon:"🧰",
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./TodoBox.vue"))),
      };
      terminal.writeResult(output);
      return;
    }
  },
};

export default todoCommand;
