import { createVNode, render, h, type App } from "vue";
import ImageViewer from "./ImageViewer.vue";
import VideoViewer from "./VideoViewer.vue";
import PdfViewer from "./PdfViewer.vue";
let imagePreviewVNode: any = null; // 存储 VNode 的引用
let imagePreviewContainer: any = null; // 存储预览容器的引用

const imageVisible = ref(false);

// 显示图片预览
const previewImage = (src: string, name: string) => {
  imageVisible.value = true;
  // 确保 VNode 只创建一次
  if (!imagePreviewVNode) {
    imagePreviewVNode = createVNode(ImageViewer, {
      src,
      name,
      visible: imageVisible,
      onClose: hideImagePreview, // 当关闭时调用的函数
    });

    // 创建一个用于挂载的容器
    imagePreviewContainer = document.createElement("div");
    document.body.appendChild(imagePreviewContainer);
  } else {
    // 更新 VNode 的 props
    imagePreviewVNode.props.src = src;
    imagePreviewVNode.props.name = name;
    imagePreviewVNode.props.visible = imageVisible.value;
  }
  // 更新渲染
  render(imagePreviewVNode, imagePreviewContainer);
};

// 隐藏图片预览
const hideImagePreview = () => {
  if (imagePreviewVNode) {
    imageVisible.value = false;
    imagePreviewVNode.props.visible = imageVisible.value; // 设置组件为不可见
    render(imagePreviewVNode, imagePreviewContainer);
  }
};

let videoPreviewVNode: any = null; // 存储 VNode 的引用
let videoPreviewContainer: any = null; // 存储预览容器的引用

const videoVisible = ref(false);

// 显示视频预览
const previewVideo = (src: string, name: string) => {
  videoVisible.value = true;
  // 确保 VNode 只创建一次
  if (!videoPreviewVNode) {
    videoPreviewVNode = createVNode(VideoViewer, {
      src,
      name,
      visible: videoVisible,
      onClose: hideVideoPreview, // 当关闭时调用的函数
    });

    // 创建一个用于挂载的容器
    videoPreviewContainer = document.createElement("div");
    document.body.appendChild(videoPreviewContainer);
  } else {
    // 更新 VNode 的 props
    videoPreviewVNode.props.src = src;
    videoPreviewVNode.props.name = name;
    videoPreviewVNode.props.visible = videoVisible.value;
  }

  // 更新渲染
  render(videoPreviewVNode, videoPreviewContainer);
};

// 隐藏视频预览
const hideVideoPreview = () => {
  if (videoPreviewVNode) {
    videoVisible.value = false;
    videoPreviewVNode.props.visible = videoVisible.value; // 设置组件为不可见
    render(videoPreviewVNode, videoPreviewContainer);
  }
};

let pdfPreviewVNode: any = null; // 存储 VNode 的引用
let pdfPreviewContainer: HTMLDivElement; // 存储预览容器的引用
let pdfPreviewDiv: HTMLDivElement | null;
// 显示视频预览
const previewPdf = (params: any) => {
  // 确保 VNode 只创建一次
  if (!pdfPreviewVNode) {
    pdfPreviewVNode = createVNode(PdfViewer, {
      doc: params.doc,
      title: params.title,
      pages: params.pages,
      url: params.url,
      onClose: hidePdfPreview, // 当关闭时调用的函数
    });

    // 创建一个用于挂载的容器
    pdfPreviewContainer = document.createElement("div");
    document.body.appendChild(pdfPreviewContainer);
  } else {
    // 更新 VNode 的 props
    pdfPreviewVNode.props.doc = params.doc;
    pdfPreviewVNode.props.title = params.title;
    pdfPreviewVNode.props.pages = params.pages;
    pdfPreviewVNode.props.url = params.url;
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
