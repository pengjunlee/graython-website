import { CommandType } from "../../core/command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = GrayTerminal.ComponentOutputType;

/**
 * ikun 命令（整活）
 * @author pengjunlee
 */
const ikunCommand: CommandType = {
  func: "ikun",
  name: "ikun",
  options: [],
  collapsible: true,
  icon: "🛥︎",
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: markRaw(defineAsyncComponent(() => import("./IkunBox.vue"))),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ikunCommand;
