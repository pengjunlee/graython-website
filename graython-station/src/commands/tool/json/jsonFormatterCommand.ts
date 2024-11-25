import { CommandType } from "../../core/command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = GrayTerminal.ComponentOutputType;

/**
 * 待办事项命令
 * @author pengjunlee
 */
const jsonFormatCommand: CommandType = {
  func: "json",
  name: "JSON美化",
  desc: "在线格式化JSON字符串",
  params: [],
  options: [],
  subCommands: {},
  collapsible: true,
  icon:"🧰",
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: markRaw(defineAsyncComponent(() => import("./JsonFormatterBox.vue"))),
    };
    terminal.writeResult(output);
    return;
  },
};

export default jsonFormatCommand;
