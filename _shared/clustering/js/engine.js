(function(root){'use strict';
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function silhouette(points, labels, i, squared = false) {
  const distances = new Map();
  const ownLabel = labels[i];
  for (let j = 0; j < points.length; j++) {
    if (j === i) continue;
    const label = labels[j];
    const group = distances.get(label) ?? {total: 0, count: 0};
    const distance = dist(points[i], points[j]);
    group.total += squared ? distance ** 2 : distance;
    group.count++;
    distances.set(label, group);
  }
  const own = distances.get(ownLabel);
  const count = distances.size + Number(!own);
  if (count < 2 || count >= points.length) return {a:null,b:null,s:null,neighbor:null};
  const a = own ? own.total / own.count : 0;
  let b = Infinity;
  let neighbor;
  // Keep a consistent tie rule in the order in which groups occur in the dataset.
  for (const label of new Set(labels)) {
    if (label === ownLabel) continue;
    const group = distances.get(label);
    const average = group.total / group.count;
    if (average < b) {
      b = average;
      neighbor = label;
    }
  }
  return {a, b, s: own && Math.max(a, b) > 0 ? (b-a)/Math.max(a,b) : 0, neighbor};
}
function responsibility(model,p){const scores=model.means.map((m,k)=>{const s=model.covariances[k],det=s[0][0]*s[1][1]-s[0][1]*s[1][0],dx=p[0]-m[0],dy=p[1]-m[1];return Math.log(model.weights[k])-Math.log(2*Math.PI)-.5*Math.log(det)-.5*(s[1][1]*dx*dx-2*s[0][1]*dx*dy+s[0][0]*dy*dy)/det;}),max=Math.max(...scores),v=scores.map(s=>Math.exp(s-max)),sum=v.reduce((a,b)=>a+b,0);return v.map(x=>x/sum);}
function projection(points,angle){const n=points.length,mean=[0,1].map(j=>points.reduce((s,p)=>s+p[j],0)/n),u=[Math.cos(angle),Math.sin(angle)],scores=points.map(p=>(p[0]-mean[0])*u[0]+(p[1]-mean[1])*u[1]),projected=scores.map(t=>[mean[0]+t*u[0],mean[1]+t*u[1]]),variance=scores.reduce((s,t)=>s+t*t,0)/(n-1),total=points.reduce((s,p)=>s+(p[0]-mean[0])**2+(p[1]-mean[1])**2,0)/(n-1),sse=points.reduce((s,p,i)=>s+dist(p,projected[i])**2,0);return {mean,u,scores,projected,variance,total,ratio:variance/total,sse};}
function partition(merges,n,count){const groups=new Map(Array.from({length:n},(_,i)=>[i,[i]]));for(let i=0;i<count;i++){const [a,b]=merges[i],g=[...groups.get(a),...groups.get(b)];groups.delete(a);groups.delete(b);groups.set(n+i,g);}const labels=Array(n);[...groups.values()].forEach((g,k)=>g.forEach(i=>labels[i]=k));return labels;}
root.ClusterEngine={dist,silhouette,responsibility,projection,partition};if(typeof module!=='undefined')module.exports=root.ClusterEngine;
})(typeof window==='undefined'?globalThis:window);
