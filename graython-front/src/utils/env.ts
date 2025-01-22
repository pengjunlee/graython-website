import { isNull, isNotBlank } from '@/utils/obj';

// import { blossomApi } from '@/api/resources';

const print = () => {
  console.log('Graython-Website ===> 环境:', import.meta.env.MODE);
  console.log(window.blconfig);
};

print();

export const getBlossomApiBaseUrl = () => {
  if (isSpring()) {
    return 'http://' + window.location.hostname + ':9999/';
  }

  // const { protocol, hostname, port } = window.location;
  if (window.location.hostname === 'graython.us.kg') {
    return window.blconfig.ENV.BLOSSOM_API_BASE_URI;
  } else if (window.location.hostname === '192.168.31.66') {
    return 'http://192.168.31.66:9999/';
  } else {
    return 'http://192.168.192.66:9999/';
  }
};

export const getWebsiteApiBaseUrl = () => {
  if (isSpring()) {
    return '../';
  }

  if (import.meta.env.MODE == 'development') {
    return window.blconfig.ENV.WEBSITE_DEV_BASE_URI;
  }

  if (window.location.hostname === 'graython.us.kg') {
    return window.blconfig.ENV.WEBSITE_API_BASE_URI;
  } else {
    return 'http://192.168.192.66:8081/';
  }
};

/**
 * 是否集成到 Spring 环境
 * @returns
 */
export const isSpring = () => {
  return import.meta.env.MODE === 'spring';
};

export const getUserId = () => {
  if (isNull(window.blconfig.SYS.USER_ID)) {
    return 1;
  }
  return window.blconfig.SYS.USER_ID;
};

//#region ------------------------------------------- 基础信息 -------------------------------------------

export const getSysName = () => {
  if (isNull(window.blconfig.SYS.NAME)) {
    return 'Graython';
  }
  return window.blconfig.SYS.NAME;
};

export const getEmail = () => {
  if (isNull(window.blconfig.SYS.EMAIL)) {
    return '';
  }
  return window.blconfig.SYS.EMAIL;
};

export const getGwab = () => {
  if (isNull(window.blconfig.SYS.GONG_WANG_AN_BEI)) {
    return '';
  }
  return window.blconfig.SYS.GONG_WANG_AN_BEI;
};

export const getIpc = () => {
  if (isNull(window.blconfig.SYS.ICP_BEI_AN_HAO)) {
    return '';
  }
  return window.blconfig.SYS.ICP_BEI_AN_HAO;
};

//#endregion

export const getThemeLogoStyle = () => {
  if (isNull(window.blconfig.THEME.LOGO_STYLE)) {
    return {
      'border-radius': '50%',
    };
  }
  return window.blconfig.THEME.LOGO_STYLE;
};

export const getThemeSubjecTitle = () => {
  if (isNull(window.blconfig.THEME.SUBJECT_TITLE)) {
    return true;
  }
  return window.blconfig.THEME.SUBJECT_TITLE;
};

// 判断是否是 IP 地址
const isIPHostname = (hostname: string) => {
  // 判断是否是 IP 地址（IPv4）
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // 判断 hostname 是否符合 IP 地址格式
  if (ipPattern.test(hostname)) {
    return true;
  }

  return false;
};
