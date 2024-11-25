import { CommandType } from "../../core/command";
import { userRegister } from "../userApi";

/**
 * 用户注册命令
 * @author pengjunlee
 */
const registerCommand: CommandType = {
  func: "register",
  name: "用户注册",
  options: [
    {
      key: "username",
      desc: "用户名",
      alias: ["u"],
      type: "string",
      required: true,
    },
    {
      key: "password",
      desc: "密码",
      alias: ["p"],
      type: "string",
      required: true,
    },
    {
      key: "email",
      desc: "邮箱",
      alias: ["e"],
      type: "string",
      required: true,
    },
  ],
  icon:"💁🏻",
  async action(options, terminal) {
    const { username, password, email } = options;
    if (!username) {
      terminal.writeTextErrorResult("请输入用户名");
      return;
    }
    if (!password) {
      terminal.writeTextErrorResult("请输入密码");
      return;
    }
    if (!email) {
      terminal.writeTextErrorResult("请输入邮箱");
      return;
    }
    const res: any = await userRegister(username, password, email);
    if (res?.code === 20000) {
      terminal.writeTextSuccessResult("注册成功");
    } else {
      terminal.writeTextErrorResult(res?.message ?? "注册失败");
    }
  },
};

export default registerCommand;
