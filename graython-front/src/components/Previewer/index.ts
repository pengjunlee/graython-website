import { createVNode, render, h, type App } from "vue";
import ImageViewer from "./ImageViewer.vue";
import VideoViewer from "./VideoViewer.vue";
import PdfViewer from "./PdfViewer.vue";
let imagePreviewVNode: any = null; // 存储 VNode 的引用
let imagePreviewContainer: any = null; // 存储预览容器的引用

const imageVisible = ref<boolean>(false);
const imageSrc = ref<string>();
const imageName = ref<string>();
// 显示图片预览
const previewImage = (src: string, name: string) => {
  imageVisible.value = true;
  imageSrc.value = src;
  imageName.value = name;
  
  // 确保 VNode 只创建一次
  if (!imagePreviewVNode) {
    imagePreviewVNode = createVNode(ImageViewer, {
      src:imageSrc,
      name:imageName,
      visible: imageVisible,
      onClose: hideImagePreview, // 当关闭时调用的函数
    });

    // 创建一个用于挂载的容器
    imagePreviewContainer = document.createElement("div");
    document.body.appendChild(imagePreviewContainer);
  } else {
    // 更新 VNode 的 props
    imagePreviewVNode.props.src = imageSrc;
    imagePreviewVNode.props.name = imageName;
    imagePreviewVNode.props.visible = imageVisible;
  }
  // 更新渲染
  render(imagePreviewVNode, imagePreviewContainer);
};

// 隐藏图片预览
const hideImagePreview = () => {
  if (imagePreviewVNode) {
    imageVisible.value = false;
    imagePreviewVNode.props.visible = imageVisible; // 设置组件为不可见
    render(imagePreviewVNode, imagePreviewContainer);
  }
};

let videoPreviewVNode: any = null; // 存储 VNode 的引用
let videoPreviewContainer: any = null; // 存储预览容器的引用

const videoVisible = ref(false);
const videoSrc = ref<string>();
const videoName = ref<string>();

// 显示视频预览
const previewVideo = (src: string, name: string) => {
  videoVisible.value = true;
  videoSrc.value = src;
  videoName.value = name;
  
  // 确保 VNode 只创建一次
  if (!videoPreviewVNode) {
    videoPreviewVNode = createVNode(VideoViewer, {
      src:videoSrc,
      name:videoName,
      visible: videoVisible,
      onClose: hideVideoPreview, // 当关闭时调用的函数
    });

    // 创建一个用于挂载的容器
    videoPreviewContainer = document.createElement("div");
    document.body.appendChild(videoPreviewContainer);
  } else {
    // 更新 VNode 的 props
    videoPreviewVNode.props.src = videoSrc;
    videoPreviewVNode.props.name = videoName;
    videoPreviewVNode.props.visible = videoVisible;
  }

  // 更新渲染
  render(videoPreviewVNode, videoPreviewContainer);
};

// 隐藏视频预览
const hideVideoPreview = () => {
  if (videoPreviewVNode) {
    videoVisible.value = false;
    videoPreviewVNode.props.visible = videoVisible; // 设置组件为不可见
    render(videoPreviewVNode, videoPreviewContainer);
  }
};

let pdfPreviewVNode: any = null; // 存储 VNode 的引用
let pdfPreviewContainer: HTMLDivElement; // 存储预览容器的引用
let pdfPreviewDiv: HTMLDivElement | null;
const pdfParams = reactive<any>({});
// 显示视频预览
const previewPdf = (params: any) => {
  pdfParams.doc =  params.doc;
  pdfParams.title =  params.title;
  pdfParams.pages =  params.pages;
  pdfParams.url =  params.url;
  // 确保 VNode 只创建一次
  if (!pdfPreviewVNode) {
    pdfPreviewVNode = createVNode(PdfViewer, {
      params:pdfParams,
      onClose: hidePdfPreview, // 当关闭时调用的函数
    });

    // 创建一个用于挂载的容器
    pdfPreviewContainer = document.createElement("div");
    document.body.appendChild(pdfPreviewContainer);
  }

  // 更新渲染
  render(pdfPreviewVNode, pdfPreviewContainer);
  pdfPreviewDiv = pdfPreviewContainer.querySelector(".pdf-preview");
  if (pdfPreviewDiv) {
    pdfPreviewDiv.classList.remove("hidden");
  }
};

// 隐藏视频预览
const hidePdfPreview = () => {
  if (pdfPreviewDiv) {
    pdfPreviewDiv.classList.add("hidden");
  }
};
export const PreviewerApi = { previewImage, previewVideo, previewPdf };
