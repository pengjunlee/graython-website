type Directory = {
  name: string;
  path: string;
  children: Directory[]
}

type Collection = {
  id?: number;
  name: string;
  thumbnailUrl?: string;
}

type Link = {
  id?: number;
  name: string;
  remark: string;
  url: string;
  cover: string;
  coverUrl?: string;
  groupType:number;
}

type Library = {
  id?: number;
  folderId?: number;
  collectionId?: number;
  folderName?:string;
  collectionName?:string;
  folderPath?:string;
  name: string;
  cover?: number;
  coverUrl?: string;
  updateTime?: string;
}

type Resource = {
  id: number,
  folderId?: number,
  name: string,
  md5?: string,
  ext?: string,
  size?: number,
  mimeType?: string,
  resourceType?: string,
  classification?:string,
  thumbnail?: string,
  thumbnailUrl: string,
  previewUrl: string,
  title?:string,
  artist?:string,
  album?:string,
  lastModified?: string,
  createTime?: string,
  updateTime?: string,
  unclassified?: boolean;
}

type Movie = {
  id: number,
  title: string,
  thumbnail?: string,
  coverUrl: string,
  previewUrl: string,
  series?: string,
  files?: any[],
  size?:number
}

interface ResourceSearch {
  resourceTypes?: number[]|number;
  collectionId?: number[]|number;
  libraryId?: number[]|number;
}

interface IntEnumOption {
  value: number;
  name: string;
}

export type {
  Directory,Library,Resource,ResourceSearch,IntEnumOption,Collection,Link,Movie
}

