import{d as $,I as A,r,Z as O,_ as U,u as n,o as B,c as D,a as s,S as Y,U as F,L as x,H as Z,am as C}from"./@vue-BV9Q_yhH.js";import{F as X}from"./file-saver-CJAWeVrG.js";import{_ as L}from"./index-B2YTKe62.js";import{l as j}from"./vue-pdf-embed-BcRweBTn.js";const G=["src","alt"],H=.1,J=.5,K=3,M=$({__name:"ImageViewer",props:{src:{},name:{},visible:{}},emits:["close"],setup(o,{emit:l}){const f=o,{src:d,name:_,visible:w}=A(f),v=l;function u(){v("close")}const h=()=>{d.value&&fetch(d.value).then(e=>e.blob()).then(e=>{X.saveAs(e,_.value||"image.png")}).catch(e=>console.error("下载图片异常:",e))},m=r(),i=()=>{const e=m.value;e&&(e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen&&e.msRequestFullscreen())},t=r(1),y=e=>{e.preventDefault(),e.deltaY<0?p():W()},p=()=>{t.value<K&&(t.value+=H)},W=()=>{t.value>J&&(t.value-=H)};return(e,he)=>O((B(),D("div",{class:"preview-container",onWheel:y},[s("div",{class:"preview-btns"},[s("span",{style:{"font-size":"24px"},onClick:u,class:"iconfont icon-plus-circle-fill"}),s("span",{style:{"font-size":"24px"},onClick:h,class:"iconfont icon-download1"}),s("span",{style:{"font-size":"24px"},onClick:i,class:"iconfont icon-a-ScreenExpand"})]),s("div",{class:"preview-content",onClick:u},[s("img",{src:n(d),alt:n(_),style:Y({transform:`scale(${n(t)})`}),class:"preview-image",ref_key:"previewImageRef",ref:m},null,12,G)])],544)),[[U,n(w)]])}}),Q=L(M,[["__scopeId","data-v-8da864e2"]]),T={class:"preview-container"},ee={class:"preview-content"},se=["src"],oe=$({__name:"VideoViewer",props:{src:{},name:{},visible:{}},emits:["close"],setup(o,{emit:l}){const f=o,{src:d,name:_,visible:w}=A(f),v=l;function u(){var t=document.getElementById("videoPlayer");t==null||t.pause(),v("close")}const h=()=>{console.log("视频暂停")},m=()=>{console.log("视频播放结束")},i=()=>{console.log("视频加载被中止")};return(t,y)=>O((B(),D("div",T,[s("div",{class:"preview-btns"},[s("span",{style:{"font-size":"30px"},onClick:u,class:"iconfont icon-plus-circle-fill"})]),s("div",ee,[s("video",{id:"videoPlayer",controls:"",src:n(d),onPause:h,onEnded:m,onAbort:i}," 你的浏览器不支持视频播放。 ",40,se)])],512)),[[U,n(w)]])}}),te=L(oe,[["__scopeId","data-v-a052a338"]]),ie={class:"pdf-preview"},ne={class:"pdf-header"},le={class:"title"},ce={class:"page-tool"},ae={class:"page-tool-item"},re={class:"pdf-container"},de=$({__name:"PdfViewer",props:{params:{}},emits:["close"],setup(o,{emit:l}){const f=o,{title:d,url:_,doc:w,pages:v}=A(f.params),u=l;function h(){u("close")}function m(){fetch(w.value).then(p=>p.blob()).then(p=>{X.saveAs(p,d.value)}).catch(p=>console.error("下载图片异常:",p))}const i=r(1);function t(){i.value>1&&(i.value-=1)}function y(){i.value<v.value&&(i.value+=1)}return(p,W)=>(B(),D("div",ie,[s("div",ne,[s("p",le,F(n(d)),1),s("div",ce,[s("div",{class:"page-tool-item",onClick:t},"上一页"),s("div",{class:"page-tool-item",onClick:y},"下一页"),s("div",ae,F(i.value)+"/"+F(n(v)),1),s("div",{class:"page-tool-item",onClick:m},"下载"),s("div",{class:"page-tool-item",onClick:h},"关闭")])]),s("div",re,[x(n(j),{class:"paper-pdf",source:n(_),page:i.value},null,8,["source","page"])])]))}}),pe=L(de,[["__scopeId","data-v-20624ec2"]]);let c=null,S=null;const P=r(!1),z=r(),q=r(),ve=(o,l)=>{P.value=!0,z.value=o,q.value=l,c?(c.props.src=z,c.props.name=q,c.props.visible=P):(c=x(Q,{src:z,name:q,visible:P,onClose:ue}),S=document.createElement("div"),document.body.appendChild(S)),C(c,S)},ue=()=>{c&&(P.value=!1,c.props.visible=P,C(c,S))};let a=null,I=null;const b=r(!1),E=r(),R=r(),me=(o,l)=>{b.value=!0,E.value=o,R.value=l,a?(a.props.src=E,a.props.name=R,a.props.visible=b):(a=x(te,{src:E,name:R,visible:b,onClose:fe}),I=document.createElement("div"),document.body.appendChild(I)),C(a,I)},fe=()=>{a&&(b.value=!1,a.props.visible=b,C(a,I))};let N=null,k,V;const g=Z({}),_e=o=>{g.doc=o.doc,g.title=o.title,g.pages=o.pages,g.url=o.url,N||(N=x(pe,{params:g,onClose:we}),k=document.createElement("div"),document.body.appendChild(k)),C(N,k),V=k.querySelector(".pdf-preview"),V&&V.classList.remove("hidden")},we=()=>{V&&V.classList.add("hidden")},Ce={previewImage:ve,previewVideo:me,previewPdf:_e};export{Ce as P};