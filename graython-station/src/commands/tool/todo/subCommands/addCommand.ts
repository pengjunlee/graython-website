import { CommandType } from "../../../core/command";
import { useTodoStore } from "../todoStore";
import TaskType = Todo.TaskType;

/**
 * 添加待办事项命令
 * @author pengjunlee
 */
const addCommand: CommandType = {
  func: "add",
  name: "添加待办事项",
  options: [
    {
      key: "name",
      desc: "待办事项名称",
      alias: ["n"],
      type: "string",
      required: true,
    },
  ],
  collapsible: true,
  icon: "🧰",
  action(options: any, terminal: any) {
    const { name } = options;
    if (!name) {
      terminal.writeTextErrorResult("请输入待办事项名称");
      return;
    }
    const { addTask } = useTodoStore();
    const newTask = {
      name,
    } as TaskType;
    const res = addTask(newTask);
    if (res) {
      terminal.writeTextSuccessResult("添加待办事项成功");
    } else {
      terminal.writeTextErrorResult("操作失败");
    }
  },
};

export default addCommand;
