function e(e,t,i,o){Object.defineProperty(e,t,{get:i,set:o,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},o={},s=t.parcelRequiree4df;null==s&&((s=function(e){if(e in i)return i[e].exports;if(e in o){var t=o[e];delete o[e];var s={id:e,exports:{}};return i[e]=s,t.call(s.exports,s,s.exports),s.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},t.parcelRequiree4df=s),s.register("27Lyk",(function(t,i){var o,s;e(t.exports,"register",(()=>o),(e=>o=e)),e(t.exports,"resolve",(()=>s),(e=>s=e));var n={};o=function(e){for(var t=Object.keys(e),i=0;i<t.length;i++)n[t[i]]=e[t[i]]},s=function(e){var t=n[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),s("27Lyk").register(JSON.parse('{"aT88m":"index.7777d581.js","7sEqG":"pop.7e3fcb45.mp3","fWR5C":"swap.ae4d5dc0.mp3"}'));class n{constructor(e,t){this.x=e,this.y=t}static areSiblings(e,t){return(e.x===t.x||e.y===t.y)&&(Math.abs(e.x-t.x)<=1&&Math.abs(e.y-t.y)<=1)}}let r;!function(e){e.Beacon="beacon",e.Candy="candy",e.Chocolate="chocolate",e.Dice="dice",e.Lollypop="lollypop",e.Poop="poop"}(r||(r={}));class l{eventListeners=new Map;constructor(){const e=this;return new Proxy(e,{set:(t,i,o,s)=>(e.notify(i,o),Reflect.set(t,i,o,s))})}subscribe(e,t){this.eventListeners.has(e)?this.eventListeners.get(e)?.push(t):this.eventListeners.set(e,[t])}notify(e,t){this.eventListeners.get(e)?.forEach((e=>e(t)))}}class c extends l{constructor(e,t){super(),this.position=e,this.icon=t}}[[r.Beacon,r.Dice,r.Poop,r.Dice,r.Lollypop,r.Beacon,r.Chocolate,r.Dice],[r.Lollypop,r.Chocolate,r.Poop,r.Dice,r.Candy,r.Candy,r.Lollypop,r.Candy],[r.Chocolate,r.Poop,r.Beacon,r.Beacon,r.Dice,r.Dice,r.Beacon,r.Lollypop],[r.Dice,r.Lollypop,r.Chocolate,r.Candy,r.Chocolate,r.Poop,r.Candy,r.Poop],[r.Candy,r.Dice,r.Lollypop,r.Chocolate,r.Lollypop,r.Beacon,r.Dice,r.Lollypop],[r.Dice,r.Candy,r.Dice,r.Beacon,r.Dice,r.Poop,r.Candy,r.Poop],[r.Poop,r.Beacon,r.Poop,r.Dice,r.Chocolate,r.Lollypop,r.Dice,r.Chocolate],[r.Candy,r.Chocolate,r.Candy,r.Lollypop,r.Beacon,r.Chocolate,r.Beacon,r.Lollypop]].flat();class a extends l{constructor(e=8){super(),this.size=e,this.score=0,this.tiles=[]}generate(){this.tiles=[],this.score=0;for(let e=0;e<this.size;e++)for(let t=0;t<this.size;t++){const i=new n(e,t);this.tiles.push(new c(i,this.getIcon(i)))}this.notify("tiles",this.tiles)}findByPosition(e,t){return this.tiles[e*this.size+t]}findVerticalLine(e){const t=[];for(let i=0;i<this.size;i++){const o=this.findByPosition(e,i);o&&t.push(o)}return t}findHorizontalLine(e){const t=[];for(let i=0;i<this.size;i++){const o=this.findByPosition(i,e);o&&t.push(o)}return t}swapTiles(e,t){const i=this.tiles.indexOf(e),o=this.tiles.indexOf(t);if(i<0||o<0)return;const s=e.position;e.position=t.position,t.position=s,this.tiles[i]=t,this.tiles[o]=e}resolveMatches(){for(let e=0;e<this.size;e++)[...a.findClusters(this.findVerticalLine(e)),...a.findClusters(this.findHorizontalLine(e))].filter((e=>e.length>=3)).flat().forEach((e=>e.icon=null))}hasMatches(){for(let e=0;e<this.size;e++){if([...a.findClusters(this.findVerticalLine(e)),...a.findClusters(this.findHorizontalLine(e))].filter((e=>e.length>=3)).length>0)return!0}return!1}shiftItems(){for(let e=0;e<this.size;e++){const t=this.findVerticalLine(e);for(let e=t.length-1;e>=0;e--)for(let i=e-1;i>=0;i--){const o=t[e],s=t[i];(o.icon||s.icon)&&(!o.icon&&s.icon&&(this.swapTiles(o,s),t[e]=s,t[i]=o))}}this.tiles.forEach((e=>{e.icon||(e.position=new n(e.position.x,e.position.y-this.size))}))}calculateScore(e){console.log(e),this.tiles.forEach((t=>{t.icon||(this.score+=100*e)}))}fillUp(){this.tiles.forEach((e=>{if(e.icon)return;const t=new n(e.position.x,e.position.y+this.size);e.position=t,e.icon=this.getIcon(t)}))}getIcon({x:e,y:t}){let i=[r.Beacon,r.Candy,r.Chocolate,r.Dice,r.Lollypop,r.Poop];const o=this.findByPosition(e,t-1),s=this.findByPosition(e-1,t);return i=i.filter((e=>![s?.icon,o?.icon].includes(e))),i[Math.floor(Math.random()*i.length)]}static areSwappable(e,t){return e.icon!==t.icon&&(!(!e.icon||!t.icon)&&!!n.areSiblings(e.position,t.position))}static findClusters(e){const t=[];let i=[];for(let o=0;o<e.length;o++){const s=e[o];i.length?i[0].icon!==s.icon?(t.push(i),i=[s]):i.push(s):i.push(s)}return t.push(i),t}toMatrix(){const e=[];for(let t=0;t<this.size;t++){const i=[];for(let e=0;e<this.size;e++)i.push(this.findByPosition(e,t)?.icon);e.push(i)}return e}}const h=e=>new Promise((t=>{setTimeout(t,e)}));var p;p=new URL(s("27Lyk").resolve("7sEqG"),import.meta.url).toString();var d;d=new URL(s("27Lyk").resolve("fWR5C"),import.meta.url).toString();const f=new Map([["pop",new URL(p)],["swap",new URL(d)]]),u=(e,t={})=>{const i=new Audio(f.get(e)?.toString());return Object.keys(t).forEach((e=>{i[e]=t[e]||i[e]})),i},y=async e=>{await e.play().catch((e=>{const t=document.createElement("div");t.innerText=e.message,document.body.append(t)})),await h(1500*e.duration)},w=u("pop"),m=u("swap"),g=document.getElementById("field"),L=document.getElementById("score"),v=document.getElementById("time"),b=document.getElementById("multiplier"),C=new KeyframeEffect(b,[{opacity:1},{transform:"scale(1.5)"},{opacity:0}],{duration:500,direction:"normal",easing:"ease-in-out",fill:"forwards"}),x=new Animation(C,document.timeline);function E(e,t){e.style.top=`${t.y}em`,e.style.left=`${t.x}em`}const B=new a(8),z=new class extends l{constructor(e){super(),this.seconds=e,this.time=e}add(e){this.time+=e}start(){this.interval||(this.interval=setInterval((()=>{0!==this.time?this.time--:this.stop()}),1e3))}stop(){this.interval&&(clearInterval(this.interval),this.interval=null)}reset(){this.time=this.seconds}}(15);let P=null;B.subscribe("tiles",(e=>{if(!g)return;g.style.width=`${B.size}em`,g.style.height=`${B.size}em`;const t=e.map((e=>{const t=document.createElement("div");return t.tile=e,t.classList.add("tile",e.icon||""),E(t,e.position),e.subscribe("position",(e=>{E(t,e)})),e.subscribe("icon",(i=>{(e.icon||i)&&(e.icon&&t.classList.remove(e.icon),i&&t.classList.add(i))})),t.addEventListener("click",(e=>async()=>{if(!P)return P=e,e.classList.add("active"),void z.start();if(P.classList.remove("active"),P===e)return void(P=null);let t=0;if(a.areSwappable(P.tile,e.tile)){if(B.swapTiles(P.tile,e.tile),await y(m),B.hasMatches())do{t++,B.resolveMatches(),B.shiftItems(),B.calculateScore(t),z.add(5),b&&(b.innerText=`${t}X`,x.play()),await y(w),B.fillUp(),await h(400)}while(B.hasMatches());else B.swapTiles(P.tile,e.tile),await y(m);z.start()}P=null})(t)),t}));g.replaceChildren(...t)})),B.subscribe("score",(e=>{L&&(L.innerText=`${e}`)})),z.subscribe("time",(e=>{v&&(v.innerText=`${new Date(1e3*e).toISOString().substring(14,19)}`,0!==e||h(1e3).then((()=>{z.reset(),B.generate()})))})),window.addEventListener("resize",(function(e){if(!g)return;const t=(window.innerWidth-20)/B.size;g.style.fontSize=`${t}px`})),B.generate(),window.board=B,window.timer=z,window.animation=x;
//# sourceMappingURL=index.7777d581.js.map
