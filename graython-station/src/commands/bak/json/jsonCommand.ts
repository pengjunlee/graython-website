import { CommandType } from "../../core/command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = GrayTerminal.ComponentOutputType;

/**
 * json字符串格式化
 * @author pengjunlee
 */
const jsonCommand: CommandType = {
  func: "json",
  name: "格式化Json格式字符串",
  params: [
    {
      key: "word",
      desc: "要格式化的内容",
      required: true,
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    } else {
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./JsonBox.vue"))),
        props: { rawJson: _[0] },
      };
      terminal.writeResult(output);
    }
  },
  options: [],
};

export default jsonCommand;
