/* Pure functions shared by the browser and verification tests. */
(function(root){
'use strict';
const copy=x=>JSON.parse(JSON.stringify(x));
function validate(n){
 if(!n||!Array.isArray(n.W)||n.W.length!==4||n.W.some(r=>!Array.isArray(r)||r.length!==2)||!Array.isArray(n.b)||n.b.length!==4||!Array.isArray(n.v)||n.v.length!==4)throw Error('Expected W[4][2], b[4], v[4], and a numeric bias.');
 const values=[...n.W.flat(),...n.b,...n.v,n.bias];
 if(values.some(x=>typeof x!=='number'||!Number.isFinite(x)||Math.abs(x)>100))throw Error('All 17 parameters must be finite numbers between -100 and 100.');
 return {W:copy(n.W),b:[...n.b],v:[...n.v],bias:n.bias};
}
function probability(n,x,y){return 1/(1+Math.exp(-n.W.reduce((s,w,i)=>s+n.v[i]*Math.max(0,w[0]*x+w[1]*y+n.b[i]),n.bias)));}
function zeros(){return {W:Array.from({length:4},()=>[0,0]),b:[0,0,0,0],v:[0,0,0,0],bias:0};}
function parse(text){let t=text.trim();if(t.startsWith('```'))t=t.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'');const o=JSON.parse(t);if(!o||typeof o!=='object'||Array.isArray(o))throw Error('Return a JSON object.');return o;}
function rng(seed){let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
function score(n,task,seed,count=1024){const random=rng(seed);let good=0,loss=0;for(let i=0;i<count;i++){let x=random()*2-1,y=random()*2-1,t=task(x,y)?1:0,p=probability(n,x,y);good+=Number((p>.5)===Boolean(t));loss+=-(t*Math.log(Math.max(p,1e-12))+(1-t)*Math.log(Math.max(1-p,1e-12)));}return {agreement:good/count,loss:loss/count,count};}
function delta(a,b){let x=[...a.W.flat(),...a.b,...a.v,a.bias],y=[...b.W.flat(),...b.b,...b.v,b.bias];return x.filter((v,i)=>Math.abs(v-y[i])>1e-8).length;}
function shuffled(n,random){let ids=[0,1,2,3];for(let i=3;i>0;i--){let j=Math.floor(random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]];}return {W:ids.map(i=>[...n.W[i]]),b:ids.map(i=>n.b[i]),v:ids.map(i=>n.v[i]),bias:n.bias};}
const api={copy,validate,probability,zeros,parse,rng,score,delta,shuffled};root.WeightLab=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
