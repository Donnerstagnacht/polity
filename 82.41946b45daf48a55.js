"use strict";(self.webpackChunkpolity=self.webpackChunkpolity||[]).push([[82],{4082:(R,b,a)=>{a.r(b),a.d(b,{SEARCH_ROUTES:()=>Z});var c=a(5861),t=a(9212),d=a(95),T=a(3620),j=a(2897),h=a(282),U=a(7618),e=a(8890),s=a(1197);let n=(()=>{class r{constructor(o){this.router=o,this.profile=null,this.isLoading=(0,t.tdS)(!0)}onClick(){var o=this;return(0,c.Z)(function*(){yield o.router.navigate(["/profile/",o.profile?.id])})()}static#t=this.\u0275fac=function(i){return new(i||r)(t.Y36(s.F0))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["polity-search-profile-result"]],inputs:{profile:"profile",isLoading:"isLoading"},standalone:!0,features:[t.jDz],decls:5,vars:7,consts:[[3,"hoverable","click"],[1,"tui-island__category"],[1,"tui-island__title"]],template:function(i,l){1&i&&(t.TgZ(0,"tui-island",0),t.NdJ("click",function(){return l.onClick()}),t.TgZ(1,"p",1),t._uU(2,"USER"),t.qZA(),t.TgZ(3,"h3",2),t._uU(4),t.qZA()()),2&i&&(t.Q6J("hoverable",!0),t.xp6(1),t.ekj("tui-skeleton",l.isLoading()),t.xp6(2),t.ekj("tui-skeleton",l.isLoading()),t.xp6(1),t.AsE(" ",null==l.profile?null:l.profile.first_name," ",null==l.profile?null:l.profile.last_name," "))},dependencies:[e.y,e.h]})}return r})();var u=a(6814),p=a(225),g=a(6605);let S=(()=>{class r{constructor(){this.profilSearchResults=new g.q}static#t=this.\u0275fac=function(i){return new(i||r)};static#e=this.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})(),v=(()=>{class r{constructor(o){this.searchStoreService=o,this.supabaseClient=p._}searchUser(o){var i=this;return(0,c.Z)(function*(){i.searchStoreService.profilSearchResults.resetObjects(),yield i.searchStoreService.profilSearchResults.wrapSelectFunction((0,c.Z)(function*(){const l=yield i.supabaseClient.rpc("search_user",{search_term:o}).throwOnError();l.data&&i.searchStoreService.profilSearchResults.setObjects(l.data)}))})()}static#t=this.\u0275fac=function(i){return new(i||r)(t.LFG(S))};static#e=this.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})();function y(r,C){if(1&r&&(t.TgZ(0,"div",7),t._UZ(1,"polity-search-profile-result",8),t.qZA()),2&r){const o=C.$implicit,i=t.oxw(2);t.uIk("data-cy","user-search-results"),t.xp6(1),t.Q6J("isLoading",i.loading)("profile",o)}}function f(r,C){if(1&r&&(t.TgZ(0,"div",6),t.SjG(1,y,2,3,"div",9,t.x6l),t.qZA()),2&r){const o=t.oxw();t.xp6(1),t.wJu(o.searchResults())}}function O(r,C){1&r&&(t.TgZ(0,"p"),t._uU(1," Suche etwas. "),t.qZA()),2&r&&t.uIk("data-cy","search-instruction")}const m=()=>[],Z=[{path:"",component:(()=>{class r{constructor(o,i){this.searchService=o,this.searchStoreService=i,this.loading=(0,t.tdS)(!1),this.searchResults=(0,t.tdS)([]),this.searchForm=new d.cw({search:new d.NI("",d.kI.required)}),this.loading=this.searchStoreService.profilSearchResults.loading.getLoading(),this.searchResults=this.searchStoreService.profilSearchResults.getObjects(),this.searchForm.get("search")?.valueChanges.pipe((0,T.b)(1e3)).subscribe(()=>this.onKeyUp())}focused(){this.searchStoreService.profilSearchResults.resetObjects()}onKeyUp(){var o=this;return(0,c.Z)(function*(){let i=o.searchForm.controls.search.value;i&&(i.endsWith(" ")&&(i=i.substring(0,i.length-1)),i=i.replace(/ /g,"|"),yield o.searchService.searchUser(i))})()}static#t=this.\u0275fac=function(i){return new(i||r)(t.Y36(v),t.Y36(S))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["polity-search-user"]],standalone:!0,features:[t.jDz],decls:10,vars:10,consts:[[3,"formGroup"],[1,"tui-form__row"],["formControlName","search","tuiHintContent","Bitte einen Suchterm eingeben",3,"focusin"],["formControlName","search",3,"error"],["class","grid tui-space_top-4"],[1,"center-grid"],[1,"grid","tui-space_top-4"],[1,"grid-item","tui-space_top-4"],[3,"isLoading","profile"],["class","grid-item tui-space_top-4"]],template:function(i,l){1&i&&(t.TgZ(0,"form",0)(1,"div",1)(2,"tui-input",2),t.NdJ("focusin",function(){return l.focused()}),t._uU(3," Gebe einen Suchterm ein "),t.qZA(),t._UZ(4,"tui-error",3),t.ALo(5,"async"),t.ALo(6,"tuiFieldError"),t.qZA()(),t.YNc(7,f,3,0,"div",4),t.TgZ(8,"div",5),t.YNc(9,O,2,1,"p"),t.qZA()),2&i&&(t.Q6J("formGroup",l.searchForm),t.xp6(2),t.uIk("data-cy","search"),t.xp6(2),t.Q6J("error",t.lcZ(5,5,t.lcZ(6,7,t.DdM(9,m)))),t.xp6(3),t.um2(7,l.searchResults()||l.loading()?7:-1),t.xp6(2),t.um2(9,l.searchResults()?-1:9))},dependencies:[d.UX,d._Y,d.JJ,d.JL,d.sg,d.u,j.Qf,j.K3,j.wU,U.S,U.v,h.Yu,h.Ag,n,u.ez,u.Ov]})}return r})()}]},6605:(R,b,a)=>{a.d(b,{q:()=>j});var c=a(9212),t=a(1210),d=a(3111);let T=(()=>{class h{constructor(e){this.step=e,this.pagination={from:0,to:20,step:20},this.pagination.to=this.step,this.pagination.step=this.step}incrementTo(){this.pagination.to+=this.pagination.step}getTo(){return this.pagination.to}getStep(){return this.pagination.step}static#t=this.\u0275fac=function(s){return new(s||h)(c.LFG(20))};static#e=this.\u0275prov=c.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"})}return h})(),j=(()=>{class h extends d.n{constructor(e=!1,s=20,n={}){super(n),this.usePagination=e,this.step=s,this.uiFlags=n,this.displayedObjects=(0,c.tdS)([]),this.storedObjects=(0,c.tdS)([]),this.pagination=new T(this.step)}getObjects(){return this.displayedObjects}resetObjects(){this.displayedObjects.set([])}setObjects(e){this.usePagination?(this.storedObjects.set(e),this.displayedObjects.set(this.initialObjectsWithPagination())):(this.storedObjects.set(e),this.displayedObjects.set(e))}pushObjectItem(e){this.displayedObjects.update(s=>[...s,e]),this.storedObjects.update(s=>[...s,e])}mutateObjects(e){const s=[...this.displayedObjects(),...e];this.displayedObjects.set(s),this.storedObjects.set(s)}resetDisplayedObjects(){this.displayedObjects.set(this.storedObjects())}removeObjectByPropertyValue(e,s,n=this.storedObjects()){const u=n.filter(p=>p[e]!==s);return this.displayedObjects.set(u),this.storedObjects.set(u),u}onScrollToBottom(){this.pagination.incrementTo();let e=this.pagination.getTo();const s=e-this.pagination.getStep();e>this.storedObjects().length&&(e=this.storedObjects().length);const n=this.storedObjects().slice(s,e);this.displayedObjects.set(this.displayedObjects().concat(n))}filterArray(e=!1,s,n,u=!1,p,g,S=!1,v,y,f,O=this.storedObjects){let m=O;return e&&n&&s&&(m=this.filterMultipleArrayFieldsByString(s,n,m())),u&&p&&g&&(m=this.filterArrayByDisjunctiveValues(p,g,m())),S&&v&&y&&f&&(m=this.filterArrayByDateRange(v,y,f,m())),this.displayedObjects.set(m()),m}filterMultipleArrayFieldsByString(e,s,n=this.storedObjects()){const u=s.toLowerCase();let p=n,g=[];return e.forEach(S=>{const v=p.filter(f=>String(f[S]).toLowerCase().includes(u));p=p.filter(f=>!String(f[S]).toLowerCase().includes(u)),g.push(...v)}),(0,c.tdS)(g)}filterArrayByDisjunctiveValues(e,s,n=this.storedObjects()){const u=n.filter(p=>s.includes(p[e]));return(0,c.tdS)(u)}filterArrayByDateRange(e,s,n,u=this.storedObjects()){n instanceof t.TU&&(n=n.toLocalNativeDate()),s instanceof t.TU&&(s=s.toLocalNativeDate());const p=s.setHours(0,0,0,0),g=n.setHours(0,0,0,0),S=u.filter(v=>{const f=new Date(v[e]).setHours(0,0,0,0);return p<=f&&f<=g});return(0,c.tdS)(S)}initialObjectsWithPagination(){const e=this.pagination.getTo();return this.storedObjects().slice(0,e)}static#t=this.\u0275fac=function(s){return new(s||h)(c.LFG(!1),c.LFG(20),c.LFG({}))};static#e=this.\u0275prov=c.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"})}return h})()}}]);