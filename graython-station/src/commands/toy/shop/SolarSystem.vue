<template>
  <div id="container">
    <div class="solar-syst">
    <div class="sun"></div>
    <div class="mercury"></div>
    <div class="venus"></div>
    <div class="earth"></div>
    <div class="mars"></div>
    <div class="jupiter"></div>
    <div class="saturn"></div>
    <div class="uranus"></div>
    <div class="neptune"></div>
    <div class="pluto"></div>
    <div class="asteroids-belt"></div>
</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#container {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 750px;
  width: 100vw;
  background-color: unset;
}
*,*:before,*:after{padding:0;margin:0;box-sizing:border-box;}html,body{height:100%;width:100%;}body{font:normal 1em/1.45em 'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#fff;background:radial-gradient(
            ellipse at bottom,#1c2837 0%,#050608 100%
          );background-attachment:fixed;}.solar-syst{margin:0 auto;width:100%;height:100%;position:relative;}.solar-syst:after{content:'';position:absolute;height:2px;width:2px;top:-2px;background:white;border-radius:100px;}.solar-syst div{border-radius:1000px;top:50%;left:50%;position:absolute;z-index:999;}.solar-syst div:not(.sun){border:1px solid rgba(102,166,229,0.12);}.solar-syst div:not(.sun):before{left:50%;border-radius:100px;content:'';position:absolute;}.solar-syst div:not(.asteroids-belt):before{box-shadow:inset 0 6px 0 -2px rgba(0,0,0,0.25);}.sun{background:radial-gradient(
            ellipse at center,#ffd000 1%,#f9b700 39%,#f9b700 39%,#e06317 100%
          );height:40px;width:40px;margin-top:-20px;margin-left:-20px;background-clip:padding-box;border:0 !important;background-position:-28px -103px;background-size:175%;box-shadow:0 0 10px 2px rgba(255,107,0,0.4),0 0 22px 11px rgba(255,203,0,0.13);}.mercury{height:70px;width:70px;margin-top:-35px;margin-left:-35px;-webkit-animation:orb 7.1867343561s linear infinite;animation:orb 7.1867343561s linear infinite;}.mercury:before{height:4px;width:4px;background:#9f5e26;margin-top:-2px;margin-left:-2px;}.venus{height:100px;width:100px;margin-top:-50px;margin-left:-50px;-webkit-animation:orb 18.4555338265s linear infinite;animation:orb 18.4555338265s linear infinite;}.venus:before{height:8px;width:8px;background:#beb768;margin-top:-4px;margin-left:-4px;}.earth{height:145px;width:145px;margin-top:-72.5px;margin-left:-72.5px;-webkit-animation:orb 30s linear infinite;animation:orb 30s linear infinite;}.earth:before{height:6px;width:6px;background:#11abe9;margin-top:-3px;margin-left:-3px;}.earth:after{position:absolute;content:'';height:18px;width:18px;left:50%;top:0px;margin-left:-9px;margin-top:-9px;border-radius:100px;box-shadow:0 -10px 0 -8px grey;-webkit-animation:orb 2.2440352158s linear infinite;animation:orb 2.2440352158s linear infinite;}.mars{height:190px;width:190px;margin-top:-95px;margin-left:-95px;-webkit-animation:orb 56.4261314589s linear infinite;animation:orb 56.4261314589s linear infinite;}.mars:before{height:6px;width:6px;background:#cf3921;margin-top:-3px;margin-left:-3px;}.jupiter{height:340px;width:340px;margin-top:-170px;margin-left:-170px;-webkit-animation:orb 355.7228171013s linear infinite;animation:orb 355.7228171013s linear infinite;}.jupiter:before{height:18px;width:18px;background:#c76e2a;margin-top:-9px;margin-left:-9px;}.saturn{height:440px;width:440px;margin-top:-220px;margin-left:-220px;-webkit-animation:orb 882.6952471456s linear infinite;animation:orb 882.6952471456s linear infinite;}.saturn:before{height:12px;width:12px;background:#e7c194;margin-top:-6px;margin-left:-6px;}.saturn:after{position:absolute;content:'';height:2.34%;width:4.676%;left:50%;top:0px;transform:rotateZ(-52deg);margin-left:-2.3%;margin-top:-1.2%;border-radius:50% 50% 50% 50%;box-shadow:0 1px 0 1px #987641,3px 1px 0 #987641,-3px 1px 0 #987641;-webkit-animation:orb 882.6952471456s linear infinite;animation:orb 882.6952471456s linear infinite;animation-direction:reverse;transform-origin:52% 60%;}.uranus{height:520px;width:520px;margin-top:-260px;margin-left:-260px;-webkit-animation:orb 2512.4001967933s linear infinite;animation:orb 2512.4001967933s linear infinite;}.uranus:before{height:10px;width:10px;background:#b5e3e3;margin-top:-5px;margin-left:-5px;}.neptune{height:630px;width:630px;margin-top:-315px;margin-left:-315px;-webkit-animation:orb 4911.7838624549s linear infinite;animation:orb 4911.7838624549s linear infinite;}.neptune:before{height:10px;width:10px;background:#175e9e;margin-top:-5px;margin-left:-5px;}.asteroids-belt{opacity:0.7;border-color:transparent !important;height:300px;width:300px;margin-top:-150px;margin-left:-150px;-webkit-animation:orb 179.9558282773s linear infinite;animation:orb 179.9558282773s linear infinite;overflow:hidden;}.asteroids-belt:before{top:50%;height:210px;width:210px;margin-left:-105px;margin-top:-105px;background:transparent;border-radius:140px !important;}.pluto{height:780px;width:780px;margin-top:-450px;margin-left:-320px;-webkit-animation:orb 7439.7074054575s linear infinite;animation:orb 7439.7074054575s linear infinite;}.pluto:before{height:3px;width:3px;background:#fff;margin-top:-1.5px;margin-left:-1.5px;}.hide{display:none;}.links{margin-top:5px !important;font-size:1em !important;}@-webkit-keyframes orb{from{transform:rotate(0deg);}to{transform:rotate(-360deg);}}@keyframes orb{from{transform:rotate(0deg);}to{transform:rotate(-360deg);}}
</style>
