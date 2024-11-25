import { CommandType } from "../core/command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = GrayTerminal.ComponentOutputType;

/**
 * 玩具命令
 * @author pengjunlee
 */
const toyCommand: CommandType = {
  func: "toy",
  name: "一个玩具",
  desc: "收集的一些好玩的前端代码特效",
  params: [
    {
      key: "index",
      desc: "玩具序号",
      required: false,
    },
  ],
  options: [],
  subCommands: {},
  collapsible: true,
  icon: '🧩',
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      // 查看列表
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./ToyShopBox.vue"))),
        props: { toys: toyList },
      };
      terminal.writeResult(output);
      return;
    } else {
      const index: number = parseInt(_[0], 10);
      // 查看列表
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(loadComponent(toyList[index - 1].value))),
      };
      terminal.writeResult(output);
      return;
    }
  },
};
const components = import.meta.glob('./shop/*.vue');

function loadComponent(name: string) {
  return components[`./shop/${name}`];
}
const toyList: ToyType[] = [
  {
    name: "描绘文字",
    desc: "动态描绘出文字的效果",
    value: "TextAnimation.vue",
  },
  {
    name: "图片立方体",
    desc: "旋转的立方体，每个面都是一张图片",
    value: "ImageCube.vue",
  },
  {
    name: "小黄人",
    desc: "纯CSS制作的小黄人动画",
    value: "Minions.vue",
  },
  {
    name: "发光立方体",
    desc: "纯CSS制作的发光立方体",
    value: "GlowingCube.vue",
  },
  {
    name: "文字立方体",
    desc: "纯CSS制作的文字立方体",
    value: "TextCube.vue",
  },
  {
    name: "幸运轮盘",
    desc: "纯CSS制作的幸运轮盘游戏",
    value: "LuckWheel.vue",
  },
  {
    name: "彩色时钟",
    desc: "由彩色方块组成的时钟",
    value: "ColorBarClock.vue",
  },
  {
    name: "文本时钟",
    desc: "文本转动组成的时钟",
    value: "TextClock.vue",
  },
  {
    name: "熔岩光线",
    desc: "熔岩光线特效",
    value: "LavaLight.vue",
  },
  {
    name: "PacMan",
    desc: "纯CSS实现的经典PacMan吃米加载动画",
    value: "PacMan.vue",
  },
  {
    name: "旋转文本",
    desc: "纯CSS实现的文本3D旋转动画",
    value: "RotateTextLoading.vue",
  },
  {
    name: "沙漏动画",
    desc: "纯CSS实现的沙漏动画",
    value: "SandGlassLoading.vue",
  },
  {
    name: "太阳系动画",
    desc: "纯CSS实现的太阳系动画",
    value: "SolarSystem.vue",
  },
];

export default toyCommand;
