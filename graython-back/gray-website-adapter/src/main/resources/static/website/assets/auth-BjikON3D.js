import{s as l}from"./pinia-UVQjpmfQ.js";import{h as c,u as i,A as s,L as o,s as u,t as g}from"./index-kmAYPRuw.js";const p=a=>c.post("/login",a),n=i(),{auth:t}=l(n),m=async(a,r)=>{t.value={token:"",status:s.Loging},await p({username:a,password:r,clientId:"blossom",grantType:"password"}).then(e=>{t.value={token:e.data.token,status:s.Succ},o.set(u,t.value),g("/home")}).catch(e=>{n.reset(),t.value={token:"",status:s.Fail}})},v=()=>{t.value={token:"",status:s.Wait},o.set(u,{token:"",status:s.Wait})};export{v as a,m as l};