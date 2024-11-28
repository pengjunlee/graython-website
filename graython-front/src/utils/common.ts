import { isNull } from './obj';
function formatNum(num: number) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}


export default {
  /**
   * 跳转新开页面
   * @param url 地址
   */
  toView(url: string): void {
    window.open(url);
  },

  /**
   * 获取当前时间的 yyyy-MM-dd HH:mm:ss
   * @returns {string}
   */
  getNowTimeFormat(): string {
    const now = new Date();
    let y = now.getFullYear();
    let m = formatNum(now.getMonth() + 1);
    let d = formatNum(now.getDate());
    let h = formatNum(now.getHours());
    let min = formatNum(now.getMinutes());
    let s = formatNum(now.getSeconds());
    return '' + y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
  },

  /**
   * 将 秒级时间戳 转为 yyyy-MM-dd HH:mm:ss
   * @param seconds 秒级时间戳
   */
  secondsToDatetime(seconds: number | string | Date): string {
    const now = new Date(Number(seconds) * 1000);
    let y = now.getFullYear();
    let m = formatNum(now.getMonth() + 1);
    let d = formatNum(now.getDate());
    let h = formatNum(now.getHours());
    let min = formatNum(now.getMinutes());
    let s = formatNum(now.getSeconds());
    return '' + y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
  },

  /**
   * 将 毫秒时间戳 转为 yyyy-MM-dd HH:mm:ss.sss
   * @param timestamp 毫秒时间戳
   */
  timestampToDatetime(timestamp: number | string | Date): string {
    const now = new Date(timestamp);
    let y = now.getFullYear();
    let m = formatNum(now.getMonth() + 1);
    let d = formatNum(now.getDate());
    let h = formatNum(now.getHours());
    let min = formatNum(now.getMinutes());
    let s = formatNum(now.getSeconds());
    let SSS = formatNum(now.getMilliseconds());
    return (
      '' + y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s + '.' + SSS
    );
  },

  /**
   * 获取当前时间的 yyyy-MM-dd HH:mm:ss
   * @returns {string}
   */
  getDateTimeFormat(): string {
    const now = new Date();
    let y = now.getFullYear();
    let m = formatNum(now.getMonth() + 1);
    let d = formatNum(now.getDate());
    let h = formatNum(now.getHours());
    let min = formatNum(now.getMinutes());
    let s = formatNum(now.getSeconds());
    return '' + y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
  },

  /**
   * 获取下一天
   * @param date
   * @param next
   * @param format
   * @returns
   */
  getNextDay(date: string, next: number = 1, format = '{y}-{m}-{d}'): string {
    if (!date) {
      return '日期错误';
    }
    date = date.match(/\d+/g)!.join('-'); // 格式为2022年09月19日处理
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + next);

    const formatObj: any = {
      y: nextDay.getFullYear(),
      m: nextDay.getMonth() + 1,
      d: nextDay.getDate(),
    };
    return format.replace(/{([ymd])+}/g, (_result, key) => {
      const value = formatObj[key];
      return value.toString().padStart(2, '0');
    });
  },

  /**
   * 格式化JSON字符串
   * @param msg
   * @param customRetract 缩进
   * @returns {string}
   */
  formatJson(msg: string, customRetract?: string): string {
    // 格式化缩进为2个空格
    const retract = isNull(customRetract) ? '  ' : customRetract;
    let rep = '~';
    let jsonStr = JSON.stringify(msg, null, rep);
    let str = '';
    for (let i = 0; i < jsonStr.length; i++) {
      let text2 = jsonStr.charAt(i);
      if (i > 1) {
        let text = jsonStr.charAt(i - 1);
        if (rep !== text && rep === text2) {
          // str += '\n'
        }
      }
      str += text2;
    }
    jsonStr = '';
    for (let i = 0; i < str.length; i++) {
      let text = str.charAt(i);
      if (rep === text) {
        jsonStr += retract;
      } else {
        jsonStr += text;
      }
      if (i === str.length - 2) {
        jsonStr += '\n';
      }
    }
    return jsonStr;
  },

    /**
   * 判断是否为空
   */
    isEmpty(value:any): boolean {
      if (typeof value === "undefined" || value === null || (typeof value === "string" && value.trim() === "") || (Array.prototype.isPrototypeOf(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)) {
        return true;
      } else {
        return false;
      }
    },

    getDateDiff(dateStr:any): any {
      let publishTime = isNaN(Date.parse(dateStr.replace(/-/gi, "/")) / 1000) ? Date.parse(dateStr) / 1000 : Date.parse(dateStr.replace(/-/gi, "/")) / 1000;
      let d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = Math.floor(new Date().getTime() / 1000),
        d,
        date = new Date(publishTime * 1000),
        Y = date.getFullYear(),
        M:any = date.getMonth() + 1,
        D:any = date.getDate(),
        H:any = date.getHours(),
        m:any = date.getMinutes(),
        s:any = date.getSeconds();
      //小于10的在前面补0
      if (M < 10) {
        M = '0' + M;
      }
      if (D < 10) {
        D = '0' + D;
      }
      if (H < 10) {
        H = '0' + H;
      }
      if (m < 10) {
        m = '0' + m;
      }
      if (s < 10) {
        s = '0' + s;
      }
      d = timeNow - publishTime;
      d_days = Math.floor(d / 86400);
      d_hours = Math.floor(d / 3600);
      d_minutes = Math.floor(d / 60);
      d_seconds = Math.floor(d);
      if (d_days > 0 && d_days < 3) {
        return d_days + '天前';
      } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + '小时前';
      } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + '分钟前';
      } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
          return '刚刚发表';
        } else {
          return d_seconds + '秒前';
        }
      } else if (d_days >= 3) {
        return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
      }
    },
};
