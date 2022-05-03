var Xt=Object.create;var J=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty;var ht=n=>J(n,"__esModule",{value:!0});var G=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),oe=(n,t)=>{ht(n);for(var e in t)J(n,e,{get:t[e],enumerable:!0})},re=(n,t,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ee(t))!se.call(n,s)&&s!=="default"&&J(n,s,{get:()=>t[s],enumerable:!(e=te(t,s))||e.enumerable});return n},R=n=>re(ht(J(n!=null?Xt(ne(n)):{},"default",n&&n.__esModule&&"default"in n?{get:()=>n.default,enumerable:!0}:{value:n,enumerable:!0})),n);var kt=G(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});var y=require("obsidian"),ot="YYYY-MM-DD",rt="gggg-[W]ww",mt="YYYY-MM",ft="YYYY-[Q]Q",yt="YYYY";function $(n){let t=window.app.plugins.getPlugin("periodic-notes");return t&&t.settings?.[n]?.enabled}function L(){try{let{internalPlugins:n,plugins:t}=window.app;if($("daily")){let{format:r,folder:c,template:u}=t.getPlugin("periodic-notes")?.settings?.daily||{};return{format:r||ot,folder:c?.trim()||"",template:u?.trim()||""}}let{folder:e,format:s,template:o}=n.getPluginById("daily-notes")?.instance?.options||{};return{format:s||ot,folder:e?.trim()||"",template:o?.trim()||""}}catch(n){console.info("No custom daily note settings found!",n)}}function M(){try{let n=window.app.plugins,t=n.getPlugin("calendar")?.options,e=n.getPlugin("periodic-notes")?.settings?.weekly;if($("weekly"))return{format:e.format||rt,folder:e.folder?.trim()||"",template:e.template?.trim()||""};let s=t||{};return{format:s.weeklyNoteFormat||rt,folder:s.weeklyNoteFolder?.trim()||"",template:s.weeklyNoteTemplate?.trim()||""}}catch(n){console.info("No custom weekly note settings found!",n)}}function U(){let n=window.app.plugins;try{let t=$("monthly")&&n.getPlugin("periodic-notes")?.settings?.monthly||{};return{format:t.format||mt,folder:t.folder?.trim()||"",template:t.template?.trim()||""}}catch(t){console.info("No custom monthly note settings found!",t)}}function _(){let n=window.app.plugins;try{let t=$("quarterly")&&n.getPlugin("periodic-notes")?.settings?.quarterly||{};return{format:t.format||ft,folder:t.folder?.trim()||"",template:t.template?.trim()||""}}catch(t){console.info("No custom quarterly note settings found!",t)}}function H(){let n=window.app.plugins;try{let t=$("yearly")&&n.getPlugin("periodic-notes")?.settings?.yearly||{};return{format:t.format||yt,folder:t.folder?.trim()||"",template:t.template?.trim()||""}}catch(t){console.info("No custom yearly note settings found!",t)}}function bt(...n){let t=[];for(let s=0,o=n.length;s<o;s++)t=t.concat(n[s].split("/"));let e=[];for(let s=0,o=t.length;s<o;s++){let r=t[s];!r||r==="."||e.push(r)}return t[0]===""&&e.unshift(""),e.join("/")}function ie(n){let t=n.substring(n.lastIndexOf("/")+1);return t.lastIndexOf(".")!=-1&&(t=t.substring(0,t.lastIndexOf("."))),t}async function ae(n){let t=n.replace(/\\/g,"/").split("/");if(t.pop(),t.length){let e=bt(...t);window.app.vault.getAbstractFileByPath(e)||await window.app.vault.createFolder(e)}}async function Y(n,t){t.endsWith(".md")||(t+=".md");let e=y.normalizePath(bt(n,t));return await ae(e),e}async function T(n){let{metadataCache:t,vault:e}=window.app,s=y.normalizePath(n);if(s==="/")return Promise.resolve(["",null]);try{let o=t.getFirstLinkpathDest(s,""),r=await e.cachedRead(o),c=window.app.foldManager.load(o);return[r,c]}catch(o){return console.error(`Failed to read the daily note template '${s}'`,o),new y.Notice("Failed to read the daily note template"),["",null]}}function F(n,t="day"){let e=n.clone().startOf(t).format();return`${t}-${e}`}function wt(n){return n.replace(/\[[^\]]*\]/g,"")}function le(n,t){if(t==="week"){let e=wt(n);return/w{1,2}/i.test(e)&&(/M{1,4}/.test(e)||/D{1,4}/.test(e))}return!1}function D(n,t){return Pt(n.basename,t)}function ce(n,t){return Pt(ie(n),t)}function Pt(n,t){let s={day:L,week:M,month:U,quarter:_,year:H}[t]().format.split("/").pop(),o=window.moment(n,s,!0);if(!o.isValid())return null;if(le(s,t)&&t==="week"){let r=wt(s);if(/w{1,2}/i.test(r))return window.moment(n,s.replace(/M{1,4}/g,"").replace(/D{1,4}/g,""),!1)}return o}var Ct=class extends Error{};async function Ft(n){let t=window.app,{vault:e}=t,s=window.moment,{template:o,format:r,folder:c}=L(),[u,g]=await T(o),a=n.format(r),l=await Y(c,a);try{let i=await e.create(l,u.replace(/{{\s*date\s*}}/gi,a).replace(/{{\s*time\s*}}/gi,s().format("HH:mm")).replace(/{{\s*title\s*}}/gi,a).replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,(d,b,C,f,h,m)=>{let N=s(),I=n.clone().set({hour:N.get("hour"),minute:N.get("minute"),second:N.get("second")});return C&&I.add(parseInt(f,10),h),m?I.format(m.substring(1).trim()):I.format(r)}).replace(/{{\s*yesterday\s*}}/gi,n.clone().subtract(1,"day").format(r)).replace(/{{\s*tomorrow\s*}}/gi,n.clone().add(1,"d").format(r)));return t.foldManager.save(i,g),i}catch(i){console.error(`Failed to create file: '${l}'`,i),new y.Notice("Unable to create new file.")}}function ue(n,t){return t[F(n,"day")]??null}function de(){let{vault:n}=window.app,{folder:t}=L(),e=n.getAbstractFileByPath(y.normalizePath(t));if(!e)throw new Ct("Failed to find daily notes folder");let s={};return y.Vault.recurseChildren(e,o=>{if(o instanceof y.TFile){let r=D(o,"day");if(r){let c=F(r,"day");s[c]=o}}}),s}var St=class extends Error{};function pe(){let{moment:n}=window,t=n.localeData()._week.dow,e=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];for(;t;)e.push(e.shift()),t--;return e}function ge(n){return pe().indexOf(n.toLowerCase())}async function Nt(n){let{vault:t}=window.app,{template:e,format:s,folder:o}=M(),[r,c]=await T(e),u=n.format(s),g=await Y(o,u);try{let a=await t.create(g,r.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,(l,i,d,b,C,f)=>{let h=window.moment(),m=n.clone().set({hour:h.get("hour"),minute:h.get("minute"),second:h.get("second")});return d&&m.add(parseInt(b,10),C),f?m.format(f.substring(1).trim()):m.format(s)}).replace(/{{\s*title\s*}}/gi,u).replace(/{{\s*time\s*}}/gi,window.moment().format("HH:mm")).replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi,(l,i,d)=>{let b=ge(i);return n.weekday(b).format(d.trim())}));return window.app.foldManager.save(a,c),a}catch(a){console.error(`Failed to create file: '${g}'`,a),new y.Notice("Unable to create new file.")}}function he(n,t){return t[F(n,"week")]??null}function me(){let n={};if(!Ot())return n;let{vault:t}=window.app,{folder:e}=M(),s=t.getAbstractFileByPath(y.normalizePath(e));if(!s)throw new St("Failed to find weekly notes folder");return y.Vault.recurseChildren(s,o=>{if(o instanceof y.TFile){let r=D(o,"week");if(r){let c=F(r,"week");n[c]=o}}}),n}var Et=class extends Error{};async function vt(n){let{vault:t}=window.app,{template:e,format:s,folder:o}=U(),[r,c]=await T(e),u=n.format(s),g=await Y(o,u);try{let a=await t.create(g,r.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,(l,i,d,b,C,f)=>{let h=window.moment(),m=n.clone().set({hour:h.get("hour"),minute:h.get("minute"),second:h.get("second")});return d&&m.add(parseInt(b,10),C),f?m.format(f.substring(1).trim()):m.format(s)}).replace(/{{\s*date\s*}}/gi,u).replace(/{{\s*time\s*}}/gi,window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi,u));return window.app.foldManager.save(a,c),a}catch(a){console.error(`Failed to create file: '${g}'`,a),new y.Notice("Unable to create new file.")}}function fe(n,t){return t[F(n,"month")]??null}function ye(){let n={};if(!xt())return n;let{vault:t}=window.app,{folder:e}=U(),s=t.getAbstractFileByPath(y.normalizePath(e));if(!s)throw new Et("Failed to find monthly notes folder");return y.Vault.recurseChildren(s,o=>{if(o instanceof y.TFile){let r=D(o,"month");if(r){let c=F(r,"month");n[c]=o}}}),n}var Tt=class extends Error{};async function be(n){let{vault:t}=window.app,{template:e,format:s,folder:o}=_(),[r,c]=await T(e),u=n.format(s),g=await Y(o,u);try{let a=await t.create(g,r.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,(l,i,d,b,C,f)=>{let h=window.moment(),m=n.clone().set({hour:h.get("hour"),minute:h.get("minute"),second:h.get("second")});return d&&m.add(parseInt(b,10),C),f?m.format(f.substring(1).trim()):m.format(s)}).replace(/{{\s*date\s*}}/gi,u).replace(/{{\s*time\s*}}/gi,window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi,u));return window.app.foldManager.save(a,c),a}catch(a){console.error(`Failed to create file: '${g}'`,a),new y.Notice("Unable to create new file.")}}function we(n,t){return t[F(n,"quarter")]??null}function Pe(){let n={};if(!At())return n;let{vault:t}=window.app,{folder:e}=_(),s=t.getAbstractFileByPath(y.normalizePath(e));if(!s)throw new Tt("Failed to find quarterly notes folder");return y.Vault.recurseChildren(s,o=>{if(o instanceof y.TFile){let r=D(o,"quarter");if(r){let c=F(r,"quarter");n[c]=o}}}),n}var Dt=class extends Error{};async function Ce(n){let{vault:t}=window.app,{template:e,format:s,folder:o}=H(),[r,c]=await T(e),u=n.format(s),g=await Y(o,u);try{let a=await t.create(g,r.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,(l,i,d,b,C,f)=>{let h=window.moment(),m=n.clone().set({hour:h.get("hour"),minute:h.get("minute"),second:h.get("second")});return d&&m.add(parseInt(b,10),C),f?m.format(f.substring(1).trim()):m.format(s)}).replace(/{{\s*date\s*}}/gi,u).replace(/{{\s*time\s*}}/gi,window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi,u));return window.app.foldManager.save(a,c),a}catch(a){console.error(`Failed to create file: '${g}'`,a),new y.Notice("Unable to create new file.")}}function Fe(n,t){return t[F(n,"year")]??null}function Se(){let n={};if(!qt())return n;let{vault:t}=window.app,{folder:e}=H(),s=t.getAbstractFileByPath(y.normalizePath(e));if(!s)throw new Dt("Failed to find yearly notes folder");return y.Vault.recurseChildren(s,o=>{if(o instanceof y.TFile){let r=D(o,"year");if(r){let c=F(r,"year");n[c]=o}}}),n}function Ne(){let{app:n}=window,t=n.internalPlugins.plugins["daily-notes"];if(t&&t.enabled)return!0;let e=n.plugins.getPlugin("periodic-notes");return e&&e.settings?.daily?.enabled}function Ot(){let{app:n}=window;if(n.plugins.getPlugin("calendar"))return!0;let t=n.plugins.getPlugin("periodic-notes");return t&&t.settings?.weekly?.enabled}function xt(){let{app:n}=window,t=n.plugins.getPlugin("periodic-notes");return t&&t.settings?.monthly?.enabled}function At(){let{app:n}=window,t=n.plugins.getPlugin("periodic-notes");return t&&t.settings?.quarterly?.enabled}function qt(){let{app:n}=window,t=n.plugins.getPlugin("periodic-notes");return t&&t.settings?.yearly?.enabled}function Ee(n){return{day:L,week:M,month:U,quarter:_,year:H}[n]()}function ve(n,t){return{day:Ft,month:vt,week:Nt}[n](t)}p.DEFAULT_DAILY_NOTE_FORMAT=ot;p.DEFAULT_MONTHLY_NOTE_FORMAT=mt;p.DEFAULT_QUARTERLY_NOTE_FORMAT=ft;p.DEFAULT_WEEKLY_NOTE_FORMAT=rt;p.DEFAULT_YEARLY_NOTE_FORMAT=yt;p.appHasDailyNotesPluginLoaded=Ne;p.appHasMonthlyNotesPluginLoaded=xt;p.appHasQuarterlyNotesPluginLoaded=At;p.appHasWeeklyNotesPluginLoaded=Ot;p.appHasYearlyNotesPluginLoaded=qt;p.createDailyNote=Ft;p.createMonthlyNote=vt;p.createPeriodicNote=ve;p.createQuarterlyNote=be;p.createWeeklyNote=Nt;p.createYearlyNote=Ce;p.getAllDailyNotes=de;p.getAllMonthlyNotes=ye;p.getAllQuarterlyNotes=Pe;p.getAllWeeklyNotes=me;p.getAllYearlyNotes=Se;p.getDailyNote=ue;p.getDailyNoteSettings=L;p.getDateFromFile=D;p.getDateFromPath=ce;p.getDateUID=F;p.getMonthlyNote=fe;p.getMonthlyNoteSettings=U;p.getPeriodicNoteSettings=Ee;p.getQuarterlyNote=we;p.getQuarterlyNoteSettings=_;p.getTemplateInfo=T;p.getWeeklyNote=he;p.getWeeklyNoteSettings=M;p.getYearlyNote=Fe;p.getYearlyNoteSettings=H});var Lt=G((en,$t)=>{var O=1e3,x=O*60,A=x*60,v=A*24,qe=v*7,ke=v*365.25;$t.exports=function(n,t){t=t||{};var e=typeof n;if(e==="string"&&n.length>0)return Ie(n);if(e==="number"&&isFinite(n))return t.long?$e(n):Re(n);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(n))};function Ie(n){if(n=String(n),!(n.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(n);if(!!t){var e=parseFloat(t[1]),s=(t[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return e*ke;case"weeks":case"week":case"w":return e*qe;case"days":case"day":case"d":return e*v;case"hours":case"hour":case"hrs":case"hr":case"h":return e*A;case"minutes":case"minute":case"mins":case"min":case"m":return e*x;case"seconds":case"second":case"secs":case"sec":case"s":return e*O;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return e;default:return}}}}function Re(n){var t=Math.abs(n);return t>=v?Math.round(n/v)+"d":t>=A?Math.round(n/A)+"h":t>=x?Math.round(n/x)+"m":t>=O?Math.round(n/O)+"s":n+"ms"}function $e(n){var t=Math.abs(n);return t>=v?Z(n,t,v,"day"):t>=A?Z(n,t,A,"hour"):t>=x?Z(n,t,x,"minute"):t>=O?Z(n,t,O,"second"):n+" ms"}function Z(n,t,e,s){var o=t>=e*1.5;return Math.round(n/e)+" "+s+(o?"s":"")}});var Ut=G((nn,Mt)=>{function Le(n){e.debug=e,e.default=e,e.coerce=g,e.disable=r,e.enable=o,e.enabled=c,e.humanize=Lt(),e.destroy=a,Object.keys(n).forEach(l=>{e[l]=n[l]}),e.names=[],e.skips=[],e.formatters={};function t(l){let i=0;for(let d=0;d<l.length;d++)i=(i<<5)-i+l.charCodeAt(d),i|=0;return e.colors[Math.abs(i)%e.colors.length]}e.selectColor=t;function e(l){let i,d=null,b,C;function f(...h){if(!f.enabled)return;let m=f,N=Number(new Date),I=N-(i||N);m.diff=I,m.prev=i,m.curr=N,i=N,h[0]=e.coerce(h[0]),typeof h[0]!="string"&&h.unshift("%O");let B=0;h[0]=h[0].replace(/%([a-zA-Z%])/g,(st,Kt)=>{if(st==="%%")return"%";B++;let gt=e.formatters[Kt];if(typeof gt=="function"){let Zt=h[B];st=gt.call(m,Zt),h.splice(B,1),B--}return st}),e.formatArgs.call(m,h),(m.log||e.log).apply(m,h)}return f.namespace=l,f.useColors=e.useColors(),f.color=e.selectColor(l),f.extend=s,f.destroy=e.destroy,Object.defineProperty(f,"enabled",{enumerable:!0,configurable:!1,get:()=>d!==null?d:(b!==e.namespaces&&(b=e.namespaces,C=e.enabled(l)),C),set:h=>{d=h}}),typeof e.init=="function"&&e.init(f),f}function s(l,i){let d=e(this.namespace+(typeof i=="undefined"?":":i)+l);return d.log=this.log,d}function o(l){e.save(l),e.namespaces=l,e.names=[],e.skips=[];let i,d=(typeof l=="string"?l:"").split(/[\s,]+/),b=d.length;for(i=0;i<b;i++)!d[i]||(l=d[i].replace(/\*/g,".*?"),l[0]==="-"?e.skips.push(new RegExp("^"+l.slice(1)+"$")):e.names.push(new RegExp("^"+l+"$")))}function r(){let l=[...e.names.map(u),...e.skips.map(u).map(i=>"-"+i)].join(",");return e.enable(""),l}function c(l){if(l[l.length-1]==="*")return!0;let i,d;for(i=0,d=e.skips.length;i<d;i++)if(e.skips[i].test(l))return!1;for(i=0,d=e.names.length;i<d;i++)if(e.names[i].test(l))return!0;return!1}function u(l){return l.toString().substring(2,l.toString().length-2).replace(/\.\*\?$/,"*")}function g(l){return l instanceof Error?l.stack||l.message:l}function a(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return e.enable(e.load()),e}Mt.exports=Le});var at=G((P,X)=>{P.formatArgs=Ue;P.save=_e;P.load=He;P.useColors=Me;P.storage=Ye();P.destroy=(()=>{let n=!1;return()=>{n||(n=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();P.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Me(){return typeof window!="undefined"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document!="undefined"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window!="undefined"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ue(n){if(n[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+n[0]+(this.useColors?"%c ":" ")+"+"+X.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;n.splice(1,0,t,"color: inherit");let e=0,s=0;n[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(e++,o==="%c"&&(s=e))}),n.splice(s,0,t)}P.log=console.debug||console.log||(()=>{});function _e(n){try{n?P.storage.setItem("debug",n):P.storage.removeItem("debug")}catch(t){}}function He(){let n;try{n=P.storage.getItem("debug")}catch(t){}return!n&&typeof process!="undefined"&&"env"in process&&(n=process.env.DEBUG),n}function Ye(){try{return localStorage}catch(n){}}X.exports=Ut()(P);var{formatters:je}=X.exports;je.j=function(n){try{return JSON.stringify(n)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});oe(exports,{default:()=>pt});var W=R(require("obsidian")),k=R(kt());var It=R(require("obsidian")),K=class extends It.Modal{constructor(t,e){super(t);this.config=e;let{cta:s,onAccept:o,text:r,title:c}=e;this.contentEl.createEl("h2",{text:c}),this.contentEl.createEl("p",{text:r}),this.contentEl.createEl("button",{text:"Never mind"}).addEventListener("click",()=>{this.close()}),this.contentEl.createEl("button",{cls:"mod-cta",text:s}).addEventListener("click",async u=>{this.accepted=!0,this.close(),setTimeout(()=>o(u),20)})}onClose(){var t,e;this.accepted||(e=(t=this.config).onCancel)==null||e.call(t)}};var S=R(require("obsidian")),Te="## Pinboard",De=30*60,Oe="pinboard/",xe="Username:SecretTokenCode",Ae=20,Rt=Object.freeze({apiToken:xe,hasAcceptedDisclaimer:!1,latestSyncTime:0,isSyncEnabled:!1,syncInterval:De,sectionHeading:Te,tagPrefix:Oe,recentCount:Ae}),it=class extends S.PluginSettingTab{constructor(t,e){super(t,e);this.plugin=e}display(){this.containerEl.empty(),this.containerEl.createEl("h3",{text:"Pinboard"}),this.addApiTokenSetting(),this.containerEl.createEl("h3",{text:"Format"}),this.addSectionHeadingSetting(),this.addTagPrefixSetting(),this.containerEl.createEl("h3",{text:"Sync"}),this.addSyncEnabledSetting(),this.addSyncIntervalSetting(),this.addRecentCountSetting()}addApiTokenSetting(){new S.Setting(this.containerEl).setName("Token").setDesc("Pinboard API Token").addText(t=>{t.setValue(this.plugin.settings.apiToken),t.onChange(async e=>{let s=e.trim();this.plugin.writeSettings({apiToken:s})})})}addRecentCountSetting(){new S.Setting(this.containerEl).setName("Recent Posts").setDesc("Number of recent posts the plugin will read to sync").addText(t=>{t.setValue(String(this.plugin.settings.recentCount)),t.inputEl.type="number",t.inputEl.onblur=e=>{let s=Number(e.target.value);t.setValue(String(s)),this.plugin.writeSettings({recentCount:s})}})}addSectionHeadingSetting(){new S.Setting(this.containerEl).setName("Section heading").setDesc("Markdown heading to use when adding the Pinboard links to a daily note").addText(t=>{t.setValue(this.plugin.settings.sectionHeading),t.onChange(async e=>{let s=e.trim();this.plugin.writeSettings({sectionHeading:s})})})}addSyncEnabledSetting(){new S.Setting(this.containerEl).setName("Enable periodic syncing").addToggle(t=>{t.setValue(this.plugin.settings.isSyncEnabled),t.onChange(async e=>{this.plugin.writeSettings({isSyncEnabled:e})})})}addSyncIntervalSetting(){new S.Setting(this.containerEl).setName("Sync Frequency").setDesc("Number of seconds the plugin will wait before syncing again").addText(t=>{t.setValue(String(this.plugin.settings.syncInterval)),t.inputEl.type="number",t.inputEl.onblur=e=>{let s=Number(e.target.value);t.setValue(String(s)),this.plugin.writeSettings({syncInterval:s})}})}addTagPrefixSetting(){new S.Setting(this.containerEl).setName("Tag Prefix").setDesc("Prefix added to Pinboard tags when imported into Obsidian (e.g. #pinboard/work)").addText(t=>{t.setValue(this.plugin.settings.tagPrefix),t.onChange(async e=>{this.plugin.writeSettings({tagPrefix:e})})})}};var Qe=require("http"),Ve=require("https"),ze=at(),_t=ze("shr"),w=class{constructor(t){this.name=t.noEncodeName?t.name:encodeURIComponent(t.name),this.value=t.noEncodeValue?t.value:encodeURIComponent(t.value)}clone(){return new w({name:this.name,value:this.value,noEncodeName:!0,noEncodeValue:!0})}},q=class{constructor(t){this.host=t.host,this.basePath=t.basePath,this.protocol=typeof t.protocol!="undefined"?t.protocol:"https:",this.port=typeof t.port!="undefined"?t.port:443,this.parseJson=typeof t.parseJson!="undefined"?t.parseJson:!1,this.queryParams=typeof t.queryParams!="undefined"?t.queryParams:[],this.method=typeof t.method!="undefined"?t.method:"GET",this.postData=typeof t.postData!="undefined"?t.postData:""}get path(){return`/${this.basePath.join("/")}${this.urlParametersString}`}get urlParametersString(){let t="";return this.queryParams.forEach(e=>{t.length===0?t+="?":t+="&",t+=`${e.name}=${e.value}`}),t}get fullUrl(){return`${this.protocol}//${this.host}:${this.port}${this.path}`}clone(t){let e=new q({host:this.host,basePath:[],protocol:this.protocol,port:this.port,parseJson:this.parseJson,queryParams:[],method:this.method,postData:this.postData});return this.basePath.forEach(s=>e.basePath.push(s)),this.queryParams.forEach(s=>e.queryParams.push(s.clone())),t&&t.subPath&&t.subPath.forEach(s=>e.basePath.push(s)),t&&t.appendQueryParams&&t.appendQueryParams.forEach(s=>e.queryParams.push(s.clone())),e}equals(t){return this.path===t.path&&this.parseJson===t.parseJson&&this.method===t.method&&this.postData===t.postData}get nodeRequestOpts(){return{host:this.host,path:this.path,protocol:this.protocol,port:this.port,method:this.method}}},j=class{req(t){return _t(`${t.method} ${t.fullUrl}`),new Promise((e,s)=>{let o=!1,r=t.nodeRequestOpts,c=[],u;if(t.protocol==="https:")u=Ve.request(r);else if(t.protocol==="http:")u=Qe.request(r);else throw new Error(`Unknown protocol ${t.protocol}`);u.on("response",g=>{g.statusCode?(g.statusCode<200||g.statusCode>=300)&&(o=!0):_t("Got a response from the webserver that has no .statusCode property"),g.on("data",a=>c.push(a)),g.on("end",()=>{let a=Buffer.concat(c).toString(),l,i;if(i=a,o)l=new Error(`ERROR ${g.statusCode} when attempting to ${t.method} '${t.fullUrl}'\r
${a}`);else if(t.parseJson)try{i=JSON.parse(a)}catch(d){l=new Error(`JSON Parse error: ${d} when receiving code ${g.statusCode} after performing ${t.method} on '${t.fullUrl}' and attempting to parse body:\r
${a}`)}l?s(l):e(i)})}),u.on("error",g=>s(g)),t.postData&&u.write(t.postData),u.end()})}};var We=at(),Q=We("pbsdk"),E=class{static boolean(t){if(t==="yes"||t==="true"||t===1)return!0;if(t==="no"||t==="false"||t===0)return!1;throw`Unable to parse '${t}'`}static dateFormatter(t){return t.toISOString()}},lt=class{constructor(t,e){this.name=t;e&&(this.count=e)}},tt=class{constructor(t,e,s,o,r,c,u,g,a=[]){this.href=t;this.description=e;this.extended=s;this.meta=o;this.hash=r;this.time=c;this.shared=u;this.toread=g;this.tags=a}static fromObj(t){let e=new tt(t.href,t.description,t.extended,t.meta,t.hash,new Date(t.time),E.boolean(t.shared),E.boolean(t.toread));return t.tags.split(" ").forEach(s=>e.tags.push(new lt(s))),e}uiString(){let t=[];this.tags.forEach(s=>t.push(s.name));let e="";return e+=`----------------
`,e+=this.description?`${this.description}
`:`UNTITLED BOOKMARK
`,e+=`<${this.href}>
`,e+=this.extended?`${this.extended}
`:"",e+=`bookmarked: ${E.dateFormatter(this.time)}
`,e+=`public: ${this.shared}, toread: ${this.toread}
`,e+=`tags: ${t.join(" ")}
`,e+=`----------------
`,e}},V=class{constructor(t,e,s=[]){this.date=t;this.user=e;this.posts=s}uiString(){let t=`PinboardPostCollection for user ${this.user} on ${E.dateFormatter(this.date)}
`;return t+=`================

`,this.posts.forEach(e=>t+=`${e.uiString()}
`),t+=`================
`,t}static fromHttpResponse(t){let e=new V(new Date(t.date),t.user);return t.posts.forEach(s=>e.posts.push(tt.fromObj(s))),Q(`Got a PostCollection with ${e.posts.length} posts`),e}},z=class{constructor(t,e,s,o,r,c){this.id=t;this.title=e;this.createDate=s;this.updateDate=o;this.hash=r;this.text=c}static fromHttpResponse(t){return new z(t.id,t.title,new Date(t.created_at),new Date(t.updated_at),t.text?t.text:"",t.hash)}},Ht=class{constructor(t,e){this.note=t;this.post=e}uiString(){let t=[];this.post.tags.forEach(s=>t.push(s.name));let e="";return e+=`----------------
`,e+=`Note: ${this.note.title} (id ${this.note.id}
`,e+=`${this.note.text}
`,e+=`added: ${E.dateFormatter(this.note.createDate)} `,e+=`updated: ${E.dateFormatter(this.note.updateDate)}
`,e+=`public: ${this.post.shared}`,e+=`tags: ${t.join(" ")}
`,e+=`----------------
`,e}},Yt=class{constructor(t,e=new j){this.request=e;this.noun="posts";this.urlOpts=t.clone({subPath:[this.noun]})}update(){let t=this.urlOpts.clone({subPath:["update"]});return this.request.req(t).then(e=>(Q(`Last update time: ${e.update_time}`),new Date(e.update_time)))}get(t=[],e,s,o=!1){if(t.length>3)throw"Only three tags are supported for this request";let r=this.urlOpts.clone({subPath:["get"]});return t.forEach(c=>{r.queryParams.push(new w({name:"tag",value:c}))}),e&&r.queryParams.push(new w({name:"dt",value:E.dateFormatter(e)})),s&&r.queryParams.push(new w({name:"url",value:s})),r.queryParams.push(new w({name:"meta",value:o?"yes":"no"})),this.request.req(r).then(c=>V.fromHttpResponse(c))}recent(t=[],e){if(t.length>3)throw"Only three tags are supported for this request";if(typeof e!="undefined"&&(e>100||e<0))throw`Invalid value for 'count': '${e}'. Must be between 0-100.`;let s=this.urlOpts.clone({subPath:["recent"]});return t.forEach(o=>{s.queryParams.push(new w({name:"tag",value:o}))}),e&&s.queryParams.push(new w({name:"count",value:String(e)})),this.request.req(s).then(o=>V.fromHttpResponse(o))}},jt=class{constructor(t,e=new j){this.request=e;this.noun="tags";this.urlOpts=t.clone({subPath:[this.noun]})}get(){let t=this.urlOpts.clone({subPath:["get"]});return this.request.req(t).then(e=>{let s=[];for(let o in e)s.push(new lt(o,e[o]));return Q(`Got ${s.length} tags`),s})}rename(t,e){let s=this.urlOpts.clone({subPath:["rename"]});return s.queryParams.push(new w({name:"old",value:t})),s.queryParams.push(new w({name:"new",value:e})),this.request.req(s).then(o=>(Q(`Got result: ${o}`),o))}},Qt=class{constructor(t,e=new j){this.request=e;this.noun="notes";this.urlOpts=t.clone({subPath:[this.noun]})}list(){let t=this.urlOpts.clone({subPath:["list"]});return this.request.req(t).then(e=>{let s=[];return e.notes.forEach(o=>s.push(z.fromHttpResponse(o))),s})}get(t){if(t.length<1)throw"An empty string is an invalid noteid.";let e=this.urlOpts.clone({subPath:[t]});return this.request.req(e).then(s=>z.fromHttpResponse(s))}},Vt=class{constructor(t,e,s){this.notesEndpoint=t;this.postsEndpoint=e;this.notesUrlOpts=s}postFromNote(t){let e=this.notesUrlOpts.clone({subPath:[t.id]}).fullUrl;return this.postsEndpoint.get(void 0,void 0,e).then(s=>{if(s.posts.length!=1)throw`Expected to find bookmark for URL ${e}, but found ${s.posts.length} instead.`;return new Ht(t,s.posts[0])})}list(){return this.notesEndpoint.list().then(t=>{let e=[];return t.forEach(s=>e.push(this.get(s.id))),Promise.all(e)})}get(t){return this.notesEndpoint.get(t).then(e=>this.postFromNote(e))}},et=class{constructor(t,e){this.user=t;this.secret=e;if(t.length<1||e.length<1)throw"Invalid API token string"}toString(){return`${this.user}${et.separator}${this.secret}`}static fromString(t){let e=t.split(this.separator),[s,o]=e;if(e.length!=2)throw"Invalid API token string";return new et(s,o)}},ct=et;ct.separator=":";var ut=class{constructor(t,e=new q({host:"api.pinboard.in",basePath:["v1"]}),s=new q({host:"notes.pinboard.in",basePath:[]})){this.baseUrlOpts=e;this.notesUrlOpts=s;this.apiToken=ct.fromString(t),this.baseUrlOpts.queryParams.push(new w({name:"auth_token",value:this.apiToken.toString(),noEncodeValue:!0}),new w({name:"format",value:"json"})),this.baseUrlOpts.parseJson=!0,this.notesUrlOpts.basePath.push(`u:${this.apiToken.user}`),this.posts=new Yt(this.baseUrlOpts),this.tags=new jt(this.baseUrlOpts),this.notes=new Qt(this.baseUrlOpts),this.notePosts=new Vt(this.notes,this.posts,this.notesUrlOpts),Q(`Pinboard object for user ${this.apiToken.user} set up`)}};var zt=R(require("obsidian"));function Wt(n,t){let e=null;return n.workspace.iterateAllLeaves(s=>{s.view instanceof zt.MarkdownView&&s.view.file===t&&(e=s.view.sourceMode.cmEditor)}),e}function nt(n=""){let t=n.match(/^(#{1,6})\s+\S/);return t?t[1].length:null}function Bt(n,t){return n?"	":"".padStart(t," ")}function Jt(n,t){return n.reduce((e,s)=>{let o=t(s);return e[o]=e[o]||[],e[o].push(s),e},{})}async function Gt(n,t,e,s){let o=nt(e),{vault:r}=n,u=(await r.read(t)).split(`
`),g=-1,a=-1;for(let i=0;i<u.length;i++)if(u[i].trim()===e)g=i;else if(g!==-1){let d=nt(u[i]);if(d&&d<=o){a=i;break}}let l=Wt(n,t);if(l)if(g!==-1){let i={line:g,ch:0},d=a!==-1?{line:a-1,ch:0}:{line:u.length,ch:0};l.replaceRange(`${s}
`,i,d);return}else{let i={line:u.length-1,ch:0};l.replaceRange(`

${s}`,i,i);return}if(g!==-1){let i=u.slice(0,g),d=a!==-1?u.slice(a):[];return r.modify(t,[...i,s,...d].join(`
`))}else return r.modify(t,[...u,"",s].join(`
`))}var dt=class{constructor(t,e){this.app=t,this.settings=e,this.renderPin=this.renderPin.bind(this)}renderPin(t){let e=this.app.vault,s=Bt(e.getConfig("useTab"),e.getConfig("tabSize")),o=this.settings.tagPrefix,r=[];t.tags.forEach(a=>r.push(a.name));let c=r.filter(a=>!!a).map(a=>a.replace(/\s+/g,"-").toLowerCase()).map(a=>a.replace(/\:/g,"-")).map(a=>`#${o}${a}`).join(" "),u=t.extended;return`- [${t.description}](${t.href}) ${u} ${c}`.trimEnd()}render(t){let{sectionHeading:e}=this.settings,s=nt(e),o=[e];return o.push(...t.map(this.renderPin)),o.join(`
`)}};var pt=class extends W.Plugin{async onload(){console.log("[Pinboard] loading plugin"),this.scheduleNextSync=this.scheduleNextSync.bind(this),this.syncPinboard=this.syncPinboard.bind(this),this.tryToScheduleSync=this.tryToScheduleSync.bind(this),this.tryToSyncPinboard=this.tryToSyncPinboard.bind(this),this.addCommand({id:"pinboard-sync-cmd",name:"Sync",callback:()=>setTimeout(this.tryToSyncPinboard,20)}),await this.loadSettings(),this.settingsTab=new it(this.app,this),this.addSettingTab(this.settingsTab),this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this))}onunload(){console.log("[Pinboard] unloading plugin")}async onLayoutReady(){this.settings.hasAcceptedDisclaimer&&this.settings.isSyncEnabled&&this.scheduleNextSync()}async tryToSyncPinboard(){this.settings.hasAcceptedDisclaimer?this.syncPinboard():new K(this.app,{cta:"Sync",onAccept:async()=>{await this.writeSettings({hasAcceptedDisclaimer:!0}),this.syncPinboard()},text:"Enabling sync will backfill your recent Pinboard into Obsidian. This means potentially creating or modifying hundreds of notes. Make sure to test the plugin in a test vault before continuing.",title:"Sync Now?"}).open()}async tryToScheduleSync(){this.settings.hasAcceptedDisclaimer?this.scheduleNextSync():new K(this.app,{cta:"Sync",onAccept:async()=>{await this.writeSettings({hasAcceptedDisclaimer:!0}),this.scheduleNextSync()},onCancel:async()=>{await this.writeSettings({isSyncEnabled:!1}),this.settingsTab.display()},text:"Enabling sync will backfill your recent Pinboard into Obsidian. This means potentially creating or modifying hundreds of notes. Make sure to test the plugin in a test vault before continuing.",title:"Sync Now?"}).open()}async getPostsFromPinboard(t,e){let s=new ut(e.apiToken),o=r=>{console.log(`API error: ${r}`)};return s.posts.recent([],e.recentCount)}async syncPinboard(){let t=new dt(this.app,this.settings),e=(0,k.getAllDailyNotes)(),s=this.settings.latestSyncTime||0,o=[];try{o=await this.getPostsFromPinboard(s,this.settings)}catch(c){new W.Notice("[Pinboard Sync] failed"),console.log(c);return}let r=Jt(o.posts.filter(c=>c.time),c=>window.moment(c.time).startOf("day").format());for(let[c,u]of Object.entries(r)){let g=window.moment(c),a=(0,k.getDailyNote)(g,e);a||(a=await(0,k.createDailyNote)(g)),await Gt(this.app,a,this.settings.sectionHeading,t.render(u))}new W.Notice("[Pinboard Sync] complete"),this.writeSettings({latestSyncTime:window.moment().unix()}),this.scheduleNextSync()}cancelScheduledSync(){this.syncTimeoutId!==void 0&&window.clearTimeout(this.syncTimeoutId)}scheduleNextSync(){let t=window.moment().unix();if(this.cancelScheduledSync(),!this.settings.isSyncEnabled||!this.settings.syncInterval){console.log("[Pinboard] scheduling skipped, no syncInterval set");return}let{latestSyncTime:e,syncInterval:s}=this.settings,o=s*1e3,r=Math.max(e+o-t,20);console.log(`[Pinboard] next sync scheduled in ${r}ms`),this.syncTimeoutId=window.setTimeout(this.syncPinboard,r)}async loadSettings(){this.settings=Object.assign({},Rt,await this.loadData()),this.settings.hasAcceptedDisclaimer||(this.settings.isSyncEnabled=!1)}async writeSettings(t){this.settings=Object.assign(this.settings,t),t.isSyncEnabled!==void 0?t.isSyncEnabled?this.tryToScheduleSync():this.cancelScheduledSync():t.syncInterval!==void 0&&this.settings.isSyncEnabled&&this.tryToScheduleSync(),await this.saveData(this.settings)}};0&&(module.exports={});
