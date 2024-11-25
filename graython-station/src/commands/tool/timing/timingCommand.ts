import { CommandType } from "../../core/command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = GrayTerminal.ComponentOutputType;

/**
 * 计时命令
 * @author pengjunlee
 */
const timingCommand: CommandType = {
  func: "timing",
  name: "计时器",
  options: [
    {
      key: "seconds",
      desc: "秒数",
      alias: ["s"],
      type: "string",
      required: true,
    },
  ],
  collapsible: true,
  icon: "🧰",
  action(options, terminal) {
    const { _, seconds } = options;
    if (!seconds) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const output: ComponentOutputType = {
      type: "component",
      component: markRaw(defineAsyncComponent(() => import("./TimingBox.vue"))),
      props: {
        seconds,
      },
    };
    terminal.writeResult(output);
  },
};

export default timingCommand;
