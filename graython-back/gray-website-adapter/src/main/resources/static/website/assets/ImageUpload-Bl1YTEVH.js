import{g as U,a as F,_ as b}from"./index-BrhFncrl.js";import{d as w,I as B,r as o,G as R,b as z,o as i,c as d,a as g,S as c,u as t,Q as C}from"./@vue-BV9Q_yhH.js";const I=["src"],S=w({__name:"ImageUpload",props:{imageUrl:{},size:{}},emits:["selectFile"],setup(f,{emit:v}){const r=f,{size:s}=B(r),e=o(r.imageUrl),a=o(null),p=()=>e.value?e.value.startsWith("http")||e.value.startsWith("data")?e.value:U()+e.value:"",u=o(),h=v,x=m=>{const l=m.target;if(l.files&&l.files[0]){a.value=l.files[0];const n=new FileReader;n.onload=k=>{var _;e.value=(_=k.target)==null?void 0:_.result},n.readAsDataURL(a.value),h("selectFile",a.value)}},y=()=>{u.value.click()};return R(()=>{a.value=null}),z(()=>{}),(m,l)=>{const n=F;return i(),d("div",{class:"image-upload",style:c({height:t(s)?t(s)+"px":"200px"}),onClick:y},[g("input",{ref_key:"fileselectRef",ref:u,style:{display:"none"},type:"file",accept:"image/*",onChange:x},null,544),g("div",{class:"image-preview",style:c({border:e.value?"none":"1px solid var(--gw-bg-active)",width:t(s)?t(s)+"px":"200px"})},[p()?(i(),d("img",{key:0,class:"img",style:c({height:t(s)?t(s)+"px":"200px"}),src:p(),alt:"预览图片"},null,12,I)):(i(),C(n,{key:1,size:50,"icon-class":"add"}))],4)],4)}}}),D=b(S,[["__scopeId","data-v-25850ba8"]]);export{D as _};