import{_ as g,d as p,A as B,l as r,b as F,K as h,o as n,c as i,g as c,t as d,u as k,h as s,F as x,L as m,w as v,C as y,M as C}from"./main.66e5f742.js";const w=s(" \u6682\u505C "),D=s("\u7EE7\u7EED"),E=p({__name:"TimingBox",props:{seconds:{type:String,required:!0}},setup(_){const f=_,{seconds:o}=B(f),e=r(Number(o.value)),a=r(!0);let t;const u=()=>{a.value=!a.value};return F(()=>{!e.value||(t=window.setInterval(()=>{a.value&&e.value--,e.value<=0&&(alert(`${o.value} \u79D2\u5012\u8BA1\u65F6\u7ED3\u675F`),t&&clearInterval(t))},1e3))}),h(()=>{t&&clearInterval(t)}),(A,T)=>{const l=C;return n(),i("div",null,[c("div",null,"\u5012\u8BA1\u65F6\uFF1A"+d(k(o))+" \u79D2",1),c("div",null,[s(" \u5269\u4F59\uFF1A"+d(e.value)+" \u79D2 ",1),e.value>0?(n(),i(x,{key:0},[a.value?(n(),m(l,{key:0,size:"small",ghost:"",danger:"",onClick:u},{default:v(()=>[w]),_:1})):(n(),m(l,{key:1,size:"small",ghost:"",onClick:u},{default:v(()=>[D]),_:1}))],64)):y("v-if",!0)])])}}});var N=g(E,[["__file","/Users/pengjunlee/workspace/graython-website/graython-station/src/commands/tool/timing/TimingBox.vue"]]);export{N as default};