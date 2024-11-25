import { CommandType } from "../../core/command";
import { userLogout } from "../userApi";
import { useUserStore } from "../userStore";
import { LOCAL_USER } from "../userConstant";

/**
 * 用户注销命令
 * @author pengjunlee
 */
const logoutCommand: CommandType = {
  func: "logout",
  name: "用户注销",
  options: [],
  icon:"💁🏻",
  async action(options, terminal) {
    const res: any = await userLogout();
    const { setLoginUser } = useUserStore();
    if (res?.code === 20000) {
      setLoginUser(LOCAL_USER);
      terminal.writeTextSuccessResult("已退出登录");
    } else {
      terminal.writeTextErrorResult(res?.message ?? "注销失败");
    }
  },
};

export default logoutCommand;
