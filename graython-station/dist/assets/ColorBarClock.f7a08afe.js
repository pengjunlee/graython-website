import{_ as b,d as C,l as r,b as S,o as B,c as A,g as e}from"./main.52daf70d.js";const P={class:"container"},D={class:"main"},M=C({__name:"ColorBarClock",setup(w){const d=r(),u=r(),_=r(),f=r(),v=r(),y=r();S(()=>{var s=u.value,a=_.value,n=f.value,o=v.value,l=y.value,c=d.value;setInterval(()=>{h(c,s,a,n,o,l)},1e3)});const h=(s,a,n,o,l,c)=>{var t=new Date,i=t.getMonth(),p=t.getDate(),g=t.getHours(),m=t.getMinutes(),k=t.getSeconds(),R=t.getFullYear();a.style.setProperty("--s",String(i/12*100)+"%"),a.setAttribute("datatext",("0"+(i+1)).slice(-2));var x=new Date(R,i+1,0).getDate();n.style.setProperty("--s",String(p/x*100)+"%"),n.setAttribute("datatext",("0"+p).slice(-2)),o.style.setProperty("--s",String(g/24*100)+"%"),o.setAttribute("datatext",("0"+g).slice(-2)),l.style.setProperty("--s",String(m/60*100)+"%"),l.setAttribute("datatext",("0"+m).slice(-2)),c.style.setProperty("--s",String(k/60*100)+"%"),c.setAttribute("datatext",("0"+k).slice(-2)),s.innerText=R.toString()};return(s,a)=>(B(),A("div",P,[e("div",{id:"year",ref_key:"yearRef",ref:d},null,512),e("div",D,[e("span",{ref_key:"monthRef",ref:u,id:"month"},null,512),e("span",{ref_key:"dayRef",ref:_,id:"day"},null,512),e("span",{ref_key:"hourRef",ref:f,id:"hour"},null,512),e("span",{ref_key:"minRef",ref:v,id:"min"},null,512),e("span",{ref_key:"secRef",ref:y,id:"sec"},null,512)])]))}});var E=b(M,[["__scopeId","data-v-627e2a8b"]]);export{E as default};