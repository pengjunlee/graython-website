export {}

interface envMeta {
  WEBSITE_DEV_BASE_URI:string
  WEBSITE_API_BASE_URI:string
  BLOSSOM_API_BASE_URI:string
  BLOSSOM_SPRING_API_URI:string
}

declare global {
  interface Window {
    blconfig: {
      SYS: {
        NAME: string
        LOGO: string
        GONG_WANG_AN_BEI: string
        ICP_BEI_AN_HAO: string
        EMAIL: string
        USER_ID: string
      }
      THEME: {
        LOGO_STYLE: {
          'border-radius': string
        }
        SUBJECT_TITLE: string
      }
      ENV: envMeta
    };
    _MusicPlayer: any; // 或者指定更具体的类型
  }

}
