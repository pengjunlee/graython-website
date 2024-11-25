import { CommandType } from "../../core/command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = GrayTerminal.ComponentOutputType;

/**
 * 音乐命令
 * @author pengjunlee
 */
const musicCommand: CommandType = {
  func: "music",
  name: "音乐",
  desc: "在线听音乐",
  params: [
    {
      key: "name",
      desc: "音乐名称",
      required: true,
    },
  ],
  options: [],
  collapsible: true,
  icon: "🛥︎",
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: markRaw(defineAsyncComponent(() => import("./MusicBox.vue"))),
      props: {
        id:songList[Math.floor(Math.random() * songList.length)],
      },
    };
    terminal.writeResult(output);
  },
};

const songList:string[] = [
  "29771231",
"2611596618",
"2611222522"

]

export default musicCommand;
