global.window = {}; require('../dex.js');
const DEX = window.DEX.map(([num,name,types,stats,legend])=>({num,name,types,stats,legend:!!legend}));
const NFE = new Set(window.NFE);
const R=[[1,151],[152,251],[252,386],[387,493],[494,649],[650,721],[722,809],[810,905],[906,1025]];
const lin=(x,lo,hi)=>Math.max(0,Math.min(100,(x-lo)/(hi-lo)*100)), bst=s=>s.reduce((a,b)=>a+b,0);
const roles=[s=>lin(.6*s[1]+.4*s[5],45,125),s=>lin(.6*s[3]+.4*s[5],45,125),s=>lin((s[0]+s[2]+s[4])/3,50,115),s=>lin(.75*s[5]+.25*Math.max(s[1],s[3]),45,125),s=>lin(bst(s),300,600),s=>lin(bst(s),480,680)];
const LEAGUE=[62,66,70,74,78,82,85,88,91,92,93,94,96];
function run(){ // greedy "expert": each round pick the best (mon, open role) by fit
  const open=new Set([0,1,2,3,4,5]); let fits=[];
  for(let k=0;k<6;k++){const [lo,hi]=R[Math.floor(Math.random()*9)]; let best=null;
    for(const m of DEX.slice(lo-1,hi)) for(const r of open){ if((r===5)!==m.legend) continue; const f=roles[r](m.stats); if(!best||f>best.f) best={f,r}; }
    open.delete(best.r); fits.push(best.f);}
  const ovr=40+0.5*fits.reduce((a,b)=>a+b)/6+6+3.5-2; // assume decent coverage, champion, small penalty
  const p=LEAGUE.reduce((a,o)=>a*1/(1+Math.exp(-(ovr-o)/3)),1); return {ovr,p};}
let N=5000,s=0,so=0,arr=[];for(let i=0;i<N;i++){const r=run();s+=r.p;so+=r.ovr;arr.push(r.ovr)}arr.sort((a,b)=>a-b);
console.log('expert avg OVR',(so/N).toFixed(1),'p10',arr[N*.1|0].toFixed(1),'p90',arr[N*.9|0].toFixed(1),'P(13-0)',(s/N).toFixed(3));
