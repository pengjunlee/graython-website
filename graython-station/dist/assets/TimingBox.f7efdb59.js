import{d as p,A as F,l as r,b as g,K as k,o as u,c,g as i,t as d,u as B,h as s,F as h,L as v,w as m,C,M as D}from"./main.52daf70d.js";const E=s(" \u6682\u505C "),x=s("\u7EE7\u7EED"),N=p({__name:"TimingBox",props:{seconds:null},setup(f){const _=f,{seconds:n}=F(_),e=r(Number(n.value)),a=r(!0);let t;const o=()=>{a.value=!a.value};return g(()=>{!e.value||(t=window.setInterval(()=>{a.value&&e.value--,e.value<=0&&(alert(`${n.value} \u79D2\u5012\u8BA1\u65F6\u7ED3\u675F`),t&&clearInterval(t))},1e3))}),k(()=>{t&&clearInterval(t)}),(A,w)=>{const l=D;return u(),c("div",null,[i("div",null,"\u5012\u8BA1\u65F6\uFF1A"+d(B(n))+" \u79D2",1),i("div",null,[s(" \u5269\u4F59\uFF1A"+d(e.value)+" \u79D2 ",1),e.value>0?(u(),c(h,{key:0},[a.value?(u(),v(l,{key:0,size:"small",ghost:"",danger:"",onClick:o},{default:m(()=>[E]),_:1})):(u(),v(l,{key:1,size:"small",ghost:"",onClick:o},{default:m(()=>[x]),_:1}))],64)):C("",!0)])])}}});export{N as default};