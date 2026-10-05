(function(root){'use strict';
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),predict=(w,p)=>w[0]+w[1]*p.x+w[2]*p.y>=0?1:0;
function training(points,eta=1,reverse=false,maxEpochs=25){const order=points.map((p,i)=>({...p,id:i}));if(reverse)order.reverse();let w=[0,0,0],updates=0;const states=[{w:[...w],seen:0,epoch:0,updates:0,last:null,converged:false}];let converged=false;
 for(let epoch=1;epoch<=maxEpochs;epoch++){let changed=0;for(const p of order){const before=[...w],guess=predict(w,p),error=p.c-guess,delta=[eta*error,eta*error*p.x,eta*error*p.y];w=w.map((v,j)=>v+delta[j]);if(error){updates++;changed++;}states.push({w:[...w],seen:states.length,epoch,updates,last:{id:p.id,x:p.x,y:p.y,c:p.c,guess,error,before,delta},converged:false});}if(changed===0){converged=true;states[states.length-1].converged=true;break;}}
 return {states,converged};}
function margin(points,normal,offset){const norm=Math.hypot(...normal);if(!(norm>0))throw Error('Nonzero normal required');const distances=points.map(p=>(2*p.c-1)*(normal[0]*p.x+normal[1]*p.y+offset)/norm),clearance=Math.min(...distances);return {distances,clearance,width:clearance>0?2*clearance:null,correct:distances.filter((d,i)=>d>0||(d===0&&points[i].c===1)).length};}
const psi=x=>[x[0]**2,Math.SQRT2*x[0]*x[1],x[1]**2];
function kernel(a,b,type,gamma=1){if(type==='linear')return dot(a,b);if(type==='poly')return dot(a,b)**2;return Math.exp(-gamma*((a[0]-b[0])**2+(a[1]-b[1])**2));}
const score=(m,x)=>m.bias+m.dual.reduce((s,v,i)=>s+v*kernel(m.vectors[i],x,m.kernel,m.gamma),0);
function clippedLine(w,b,bounds){const [xmin,xmax,ymin,ymax]=bounds,ps=[];if(Math.abs(w[1])>1e-12)for(const x of [xmin,xmax]){const y=-(w[0]*x+b)/w[1];if(y>=ymin-1e-9&&y<=ymax+1e-9)ps.push([x,y]);}if(Math.abs(w[0])>1e-12)for(const y of [ymin,ymax]){const x=-(w[1]*y+b)/w[0];if(x>=xmin-1e-9&&x<=xmax+1e-9)ps.push([x,y]);}const unique=ps.filter((p,i)=>ps.findIndex(q=>Math.hypot(p[0]-q[0],p[1]-q[1])<1e-8)===i);return unique.slice(0,2);}
const api={dot,predict,training,margin,psi,kernel,score,clippedLine};root.C2Engine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
