(function(scope){
 'use strict';
 const mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
 const rng=seed=>{let s=seed>>>0;return ()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296);};
 const gaussian=r=>Math.sqrt(-2*Math.log(Math.max(r(),1e-15)))*Math.cos(2*Math.PI*r());
 const points=t=>t.x.map((x,i)=>({x,y:t.y[i]}));
 const predict=(b,x)=>b.reduceRight((s,c)=>s*x+c,0);
 function metrics(data,fn,q=2){const ybar=mean(data.map(p=>p.y)),rss=data.reduce((s,p)=>s+(p.y-fn(p.x))**2,0),tss=data.reduce((s,p)=>s+(p.y-ybar)**2,0);return {n:data.length,rss,rmse:Math.sqrt(rss/data.length),rse:data.length>q?Math.sqrt(rss/(data.length-q)):null,r2:tss>1e-24?1-rss/tss:null,tss};}
 function ols(data){const xb=mean(data.map(p=>p.x)),yb=mean(data.map(p=>p.y)),sxx=data.reduce((s,p)=>s+(p.x-xb)**2,0),sxy=data.reduce((s,p)=>s+(p.x-xb)*(p.y-yb),0),slope=sxx>1e-24?sxy/sxx:0,intercept=yb-slope*xb;return {intercept,slope,sxx,identified:sxx>1e-24,...metrics(data,x=>intercept+slope*x,sxx>1e-24?2:1)};}
 function fit(data,degree){const n=data.length,m=degree+1;if(m>n)throw Error('Underdetermined design');const A=data.map(p=>Array.from({length:m},(_,j)=>p.x**j)),b=data.map(p=>p.y);
  for(let k=0;k<m;k++){const norm=Math.hypot(...A.slice(k).map(r=>r[k]));if(norm<1e-12)throw Error('Rank deficient design');const v=A.slice(k).map(r=>r[k]);v[0]+=v[0]>=0?norm:-norm;const vn=Math.hypot(...v);for(let i=0;i<v.length;i++)v[i]/=vn;for(let j=k;j<m;j++){let dot=0;for(let i=k;i<n;i++)dot+=v[i-k]*A[i][j];for(let i=k;i<n;i++)A[i][j]-=2*v[i-k]*dot;}let dot=0;for(let i=k;i<n;i++)dot+=v[i-k]*b[i];for(let i=k;i<n;i++)b[i]-=2*v[i-k]*dot;}
  const c=Array(m).fill(0);for(let i=m-1;i>=0;i--){let s=b[i];for(let j=i+1;j<m;j++)s-=A[i][j]*c[j];c[i]=s/A[i][i];}return c;
 }
 function logGamma(z){const c=[676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];if(z<.5)return Math.log(Math.PI)-Math.log(Math.sin(Math.PI*z))-logGamma(1-z);z--;let a=.99999999999980993;for(let i=0;i<c.length;i++)a+=c[i]/(z+i+1);const t=z+7.5;return .5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(a);}
 function betaFraction(a,b,x){const tiny=1e-300;let c=1,d=1-(a+b)*x/(a+1);if(Math.abs(d)<tiny)d=tiny;d=1/d;let h=d;for(let m=1;m<=300;m++){let aa=m*(b-m)*x/((a+2*m-1)*(a+2*m));d=1+aa*d;if(Math.abs(d)<tiny)d=tiny;c=1+aa/c;if(Math.abs(c)<tiny)c=tiny;d=1/d;h*=d*c;aa=-(a+m)*(a+b+m)*x/((a+2*m)*(a+2*m+1));d=1+aa*d;if(Math.abs(d)<tiny)d=tiny;c=1+aa/c;if(Math.abs(c)<tiny)c=tiny;d=1/d;const delta=d*c;h*=delta;if(Math.abs(delta-1)<3e-14)return h;}throw Error('Beta fraction did not converge');}
 function betaI(x,a,b){if(x<=0)return 0;if(x>=1)return 1;const front=Math.exp(logGamma(a+b)-logGamma(a)-logGamma(b)+a*Math.log(x)+b*Math.log1p(-x));return x<(a+1)/(a+b+2)?front*betaFraction(a,b,x)/a:1-front*betaFraction(b,a,1-x)/b;}
 const tP=(t,df)=>{if(!(df>0))throw Error('Positive df required');return betaI(df/(df+t*t),df/2,.5);};
 const tPDF=(t,df)=>Math.exp(logGamma((df+1)/2)-logGamma(df/2)-.5*Math.log(df*Math.PI)-(df+1)/2*Math.log1p(t*t/df));
 function critical(df,alpha=.05){let lo=0,hi=1;while(tP(hi,df)>alpha)hi*=2;for(let i=0;i<80;i++){const mid=(lo+hi)/2;if(tP(mid,df)>alpha)lo=mid;else hi=mid;}return (lo+hi)/2;}
 function infer(data){const o=ols(data),df=data.length-2;if(!o.identified||df<1)return {...o,se:null,t:null,p:null,ci:null,df};const se=o.rse/Math.sqrt(o.sxx),t=se>0?o.slope/se:o.slope===0?0:Math.sign(o.slope)*Infinity,crit=critical(df);return {...o,se,t,p:tP(t,df),ci:[o.slope-crit*se,o.slope+crit*se],df};}
 const truth=x=>2+1.2*x-.9*x*x;
 function ensemble(degree=2,n=25,seed=7){const fits=Array.from({length:60},(_,rep)=>{const r=rng(seed+1021*rep),data=Array.from({length:n},(_,i)=>{const x=-1+2*i/(n-1);return {x,y:truth(x)+.3*gaussian(r)};});return fit(data,degree);});return {fits,at(x){const vals=fits.map(c=>predict(c,x)),avg=mean(vals),bias2=(avg-truth(x))**2,variance=mean(vals.map(v=>(v-avg)**2));return {mean:avg,bias2,variance,noise:.09,total:bias2+variance+.09};}};}
 function diagnostic(kind='Well behaved',seed=7){const r=rng(seed);let prev=0;const data=Array.from({length:60},(_,i)=>{const x=kind==='Serial pattern'?2*r()-1:-1+2*i/59,z=gaussian(r);let err=.22*z;if(kind==='Curvature')err+=1.2*x*x;if(kind==='Unequal variance')err=(.08+.55*(x+1)/2)*z;if(kind==='Serial pattern'){prev=.85*prev+.18*z;err=prev;}return {x,y:1.5+1.1*x+err,order:i+1};});const o=ols(data);return {data,ols:o,residuals:data.map(p=>({...p,fitted:o.intercept+o.slope*p.x,residual:p.y-o.intercept-o.slope*p.x}))};}
 const api={mean,rng,gaussian,points,predict,metrics,ols,fit,tP,tPDF,critical,infer,truth,ensemble,diagnostic};if(typeof module!=='undefined')module.exports=api;else scope.RG=api;
})(typeof window==='undefined'?globalThis:window);
