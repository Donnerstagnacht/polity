"use strict";(self.webpackChunkpolity=self.webpackChunkpolity||[]).push([[50],{7050:(O,v,t)=>{t.r(v),t.d(v,{FEATURE_ROUTES:()=>A});var l=t(5861),n=t(3146),d=t(2351),u=t(2934),p=t(9259),a=t(6814),e=t(9212);function C(o,P){if(1&o){const i=e.EpF();e.TgZ(0,"button",1),e.NdJ("click",function(){const T=e.CHM(i).$implicit,S=e.oxw();return e.KtG(S.onClick(T))}),e.qZA()}if(2&o){const i=P.$implicit;e.s9C("tuiHint",i.text),e.Q6J("badge",i.badge)("icon",i.icon)("routerLink",i.link),e.uIk("data-cy",i.dataCy)}}let s=(()=>{class o{constructor(){this.items=d.N7,this.activeItemIndex=1}onClick(i){i.badge=0}static#e=this.\u0275fac=function(r){return new(r||o)};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["polity-second-bar-top"]],inputs:{items:"items"},standalone:!0,features:[e.jDz],decls:5,vars:1,consts:[["tuiTabBar","",3,"activeItemIndex","activeItemIndexChange"],["routerLinkActive","","tuiTabBarItem","",3,"badge","icon","routerLink","tuiHint","click"],["routerLinkActive","","tuiTabBarItem","",3,"badge","icon","routerLink","tuiHint"]],template:function(r,f){1&r&&(e.TgZ(0,"nav",0),e.NdJ("activeItemIndexChange",function(S){return f.activeItemIndex=S}),e.SjG(1,C,1,5,"button",2,e.x6l),e.qZA(),e.TgZ(3,"h1"),e._uU(4,"This is a dynamic top bar"),e.qZA()),2&r&&(e.Q6J("activeItemIndex",f.activeItemIndex),e.xp6(1),e.wJu(f.items))},dependencies:[u.JU,u.Mx,u.F4,u.YO,n.Bz,n.rH,n.Od,p.go,p.D,p.xn,p.t6,p.DM,a.ez],styles:["nav[_ngcontent-%COMP%]:before{box-shadow:none}nav[_ngcontent-%COMP%]{box-shadow:0 .125rem 1rem #00000014;position:fixed;top:0;width:100%}button[_ngcontent-%COMP%]{margin:auto}"]})}return o})();function c(o,P){if(1&o){const i=e.EpF();e.TgZ(0,"button",1),e.NdJ("click",function(){const T=e.CHM(i).$implicit,S=e.oxw();return e.KtG(S.onClick(T))}),e.qZA()}if(2&o){const i=P.$implicit;e.s9C("tuiHint",i.text),e.Q6J("badge",i.badge)("icon",i.icon)("routerLink",i.link),e.uIk("data-cy",i.dataCyDesktop)}}let y=(()=>{class o{constructor(){this.items=d.A$,this.activeItemIndex=1}onClick(i){i.badge=0}static#e=this.\u0275fac=function(r){return new(r||o)};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["polity-second-bar-side"]],inputs:{items:"items"},standalone:!0,features:[e.jDz],decls:3,vars:1,consts:[["tuiTabBar","",3,"activeItemIndex","activeItemIndexChange"],["routerLinkActive","","tuiTabBarItem","",3,"badge","icon","routerLink","tuiHint","click"],["routerLinkActive","","tuiTabBarItem","",3,"badge","icon","routerLink","tuiHint"]],template:function(r,f){1&r&&(e.TgZ(0,"nav",0),e.NdJ("activeItemIndexChange",function(S){return f.activeItemIndex=S}),e.SjG(1,c,1,5,"button",2,e.x6l),e.qZA()),2&r&&(e.Q6J("activeItemIndex",f.activeItemIndex),e.xp6(1),e.wJu(f.items))},dependencies:[u.JU,u.Mx,u.F4,u.YO,n.Bz,n.rH,n.Od,p.go,p.D,p.xn,p.t6,p.DM,a.ez],styles:["nav[_ngcontent-%COMP%]:before{box-shadow:none}nav[_ngcontent-%COMP%]{box-shadow:0 .125rem 1rem #00000014;position:fixed;bottom:0;height:100%;width:80px;display:grid}button[_ngcontent-%COMP%]{margin:auto;width:100%}"]})}return o})();var m=t(7250),g=t(7989),h=t(4457),I=t(9107),E=t(2705);let M=(()=>{class o{constructor(i,r,f,T,S,D){this.sessionStoreService=i,this.profileStoreService=r,this.profileService=f,this.route=T,this.profileCounterService=S,this.profileCountersStoreService=D,this.menuItemsProfile=d._z}ngOnInit(){var i=this;return(0,l.Z)(function*(){const r=i.route.snapshot.params.id,f=i.sessionStoreService.getSessionId();i.checkIsOwner(r,f),yield Promise.all([i.profileService.selectProfile(r),i.profileCounterService.selectProfileCounter(r)]),yield i.profileCounterService.checkIfFollowing()})()}ngOnDestroy(){this.profileStoreService.profile.resetObject(),this.profileCountersStoreService.profileCounters.resetObject()}checkIsOwner(i,r){r==i?(this.profileStoreService.profile.uiFlagStore.setUiFlagTrue("isOwner"),this.menuItemsProfile=d.au,this.menuItemsProfile[0].link="/profile/"+i,this.menuItemsProfile[1].link="/profile/"+i+"/edit",this.menuItemsProfile[2].link="/profile/"+i+"/follower/edit"):(this.profileStoreService.profile.uiFlagStore.setUiFlagFalse("isOwner"),this.menuItemsProfile=d._z,this.menuItemsProfile[0].link="/profile/"+i)}static#e=this.\u0275fac=function(r){return new(r||o)(e.Y36(m.I),e.Y36(g.$),e.Y36(h.d),e.Y36(n.gz),e.Y36(I.B),e.Y36(E.W))};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["polity-profile"]],standalone:!0,features:[e.jDz],decls:3,vars:2,consts:[[3,"items"]],template:function(r,f){1&r&&e._UZ(0,"polity-second-bar-top",0)(1,"router-outlet")(2,"polity-second-bar-side",0),2&r&&(e.Q6J("items",f.menuItemsProfile),e.xp6(2),e.Q6J("items",f.menuItemsProfile))},dependencies:[s,n.lC,y,a.ez],styles:["polity-second-bar-top[_ngcontent-%COMP%]{top:0;left:0;position:fixed}"]})}return o})();var F=t(9216);let x=(()=>{class o{static#e=this.\u0275fac=function(r){return new(r||o)};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["polity-search"]],standalone:!0,features:[e.jDz],decls:3,vars:1,template:function(r,f){1&r&&(e.TgZ(0,"h1"),e._uU(1,"Suche in der POLITY Welt"),e.qZA(),e._UZ(2,"router-outlet")),2&r&&e.uIk("data-cy","search-instruction")},dependencies:[n.lC],styles:[".grid[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:stretch}@media screen and (max-width: 47.9625em){.grid-item[_ngcontent-%COMP%]{width:100%}}@media screen and (min-width: 48em){.grid-item[_ngcontent-%COMP%]{width:48%;margin:1%}}@media screen and (min-width: 64em){.grid-item[_ngcontent-%COMP%]{width:30%;margin:1%}}.center-grid[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;text-align:center;width:100%;height:50vh}"]})}return o})();var _=t(6848);const A=[{path:"",component:F.O,loadChildren:()=>t.e(755).then(t.bind(t,2755)).then(o=>o.HOME_ROUTES)},{path:"search",component:x,loadChildren:()=>t.e(82).then(t.bind(t,4082)).then(o=>o.SEARCH_ROUTES)},{path:"profile/:id",component:M,loadChildren:()=>Promise.all([t.e(450),t.e(222)]).then(t.bind(t,1222)).then(o=>o.PROFILE_ROUTES)},{path:"home",component:F.O,loadChildren:()=>t.e(755).then(t.bind(t,2755)).then(o=>o.HOME_ROUTES)},{path:"new",component:_.q,loadChildren:()=>t.e(402).then(t.bind(t,8402)).then(o=>o.NEW_ROUTES)},{path:"office",component:(()=>{class o{constructor(){this.menuItemsProfile=d.Zw}static#e=this.\u0275fac=function(r){return new(r||o)};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["polity-office"]],standalone:!0,features:[e.jDz],decls:4,vars:3,consts:[[3,"items"]],template:function(r,f){1&r&&e._UZ(0,"polity-second-bar-top",0)(1,"h1")(2,"router-outlet")(3,"polity-second-bar-side",0),2&r&&(e.Q6J("items",f.menuItemsProfile),e.xp6(1),e.uIk("data-cy","office-instruction"),e.xp6(2),e.Q6J("items",f.menuItemsProfile))},dependencies:[s,n.lC,y]})}return o})(),loadChildren:()=>Promise.all([t.e(450),t.e(390)]).then(t.bind(t,2390)).then(o=>o.OFFICE_ROUTES)}]},9216:(O,v,t)=>{t.d(v,{O:()=>s});var l=t(5861),n=t(9212),d=t(8890),u=t(3146);let p=(()=>{class c{constructor(m){this.router=m,this.sessionId=null,this.isLoading=(0,n.tdS)(!0),this.profile=(0,n.tdS)(null),this.dataCyTag="link-card"}onClick(){var m=this;return(0,l.Z)(function*(){yield m.router.navigate(["/profile/",m.sessionId])})()}static#e=this.\u0275fac=function(g){return new(g||c)(n.Y36(u.F0))};static#t=this.\u0275cmp=n.Xpm({type:c,selectors:[["polity-link-card"]],inputs:{sessionId:"sessionId",isLoading:"isLoading",profile:"profile",dataCyTag:"dataCyTag"},standalone:!0,features:[n.jDz],decls:3,vars:6,consts:[[3,"hoverable","click"],[1,"title","title_size_s"]],template:function(g,h){if(1&g&&(n.TgZ(0,"tui-island",0),n.NdJ("click",function(){return h.onClick()}),n.TgZ(1,"p",1),n._uU(2),n.qZA()()),2&g){let I;n.Q6J("hoverable",!0),n.xp6(1),n.ekj("tui-skeleton",h.isLoading()),n.uIk("data-cy",h.dataCyTag),n.xp6(1),n.AsE(" ",null==(I=h.profile())?null:I.first_name," ",null==(I=h.profile())?null:I.last_name," ")}},dependencies:[d.y,d.h],styles:[".title[_ngcontent-%COMP%]{font:var(--tui-font-heading-4);margin:2px}.title_size_s[_ngcontent-%COMP%]{font:var(--tui-font-heading-6)}"]})}return c})();var a=t(7250),e=t(4457),C=t(7989);let s=(()=>{class c{constructor(m,g,h){this.sessionStoreService=m,this.profileService=g,this.profileStoreService=h,this.profile=(0,n.tdS)(null),this.isProfileLoading=(0,n.tdS)(!0),this.isProfileLoading=this.profileStoreService.profile.loading.getLoading(),this.sessionId=this.sessionStoreService.getSessionId()}ngOnInit(){var m=this;return(0,l.Z)(function*(){yield m.profileService.selectProfile(m.sessionId),m.profile=m.profileStoreService.profile.getObject()})()}onDestroy(){this.profileStoreService.profile.resetObject()}static#e=this.\u0275fac=function(g){return new(g||c)(n.Y36(a.I),n.Y36(e.d),n.Y36(C.$))};static#t=this.\u0275cmp=n.Xpm({type:c,selectors:[["polity-home"]],standalone:!0,features:[n.jDz],decls:3,vars:8,consts:[[3,"dataCyTag","isLoading","profile","sessionId"]],template:function(g,h){1&g&&(n.TgZ(0,"h1"),n._uU(1," Dein Profil und Gruppen.\n"),n.qZA(),n._UZ(2,"polity-link-card",0)),2&g&&(n.uIk("data-cy","home-instruction"),n.xp6(2),n.ekj("tui-skeleton",h.isProfileLoading()),n.Q6J("dataCyTag","home-first-name")("isLoading",h.isProfileLoading)("profile",h.profile)("sessionId",h.sessionId),n.uIk("data-cy","home-to-profile"))},dependencies:[p]})}return c})()},6848:(O,v,t)=>{t.d(v,{q:()=>n});var l=t(9212);let n=(()=>{class d{static#e=this.\u0275fac=function(a){return new(a||d)};static#t=this.\u0275cmp=l.Xpm({type:d,selectors:[["polity-new"]],standalone:!0,features:[l.jDz],decls:2,vars:0,template:function(a,e){1&a&&(l.TgZ(0,"p"),l._uU(1,"new works!"),l.qZA())}})}return d})()},9107:(O,v,t)=>{t.d(v,{B:()=>a});var l=t(5861),n=t(77),d=t(9212),u=t(2705),p=t(7989);let a=(()=>{class e{constructor(s,c){this.profileCountersStoreService=s,this.profileStoreService=c,this.supabaseClient=n._}selectProfileCounter(s){var c=this;return(0,l.Z)(function*(){yield c.profileCountersStoreService.profileCounters.wrapSelectFunction((0,l.Z)(function*(){const y=yield c.supabaseClient.rpc("select_following_counter",{user_id:s}).single().throwOnError();y.data&&c.profileCountersStoreService.profileCounters.setObject(y.data)}))})()}checkIfFollowing(){var s=this;return(0,l.Z)(function*(){const c=s.profileCountersStoreService.profileCounters.getValueByKey("profile_id");yield s.profileCountersStoreService.profileCounters.wrapSelectFunction((0,l.Z)(function*(){s.profileStoreService.profile.uiFlagStore.setUiFlagTrue("isFollowingCheckLoading"),(yield s.supabaseClient.rpc("check_if_following",{following_id:c}).single().throwOnError()).data?s.profileStoreService.profile.uiFlagStore.setUiFlagTrue("isFollowing"):s.profileStoreService.profile.uiFlagStore.setUiFlagFalse("isFollowing"),s.profileStoreService.profile.uiFlagStore.setUiFlagFalse("isFollowingCheckLoading")}))})()}followProfile(){var s=this;return(0,l.Z)(function*(){const c=s.profileCountersStoreService.profileCounters.getValueByKey("profile_id");yield s.profileCountersStoreService.profileCounters.wrapUpdateFunction((0,l.Z)(function*(){yield s.supabaseClient.rpc("follow_transaction",{following_id:c}).throwOnError(),s.profileStoreService.profile.uiFlagStore.setUiFlagTrue("isFollowing"),s.profileCountersStoreService.profileCounters.incrementKey("follower_counter")}),!0,"Successful followed!")})()}unFollowProfile(){var s=this;return(0,l.Z)(function*(){const c=s.profileCountersStoreService.profileCounters.getValueByKey("profile_id");yield s.profileCountersStoreService.profileCounters.wrapUpdateFunction((0,l.Z)(function*(){yield s.supabaseClient.rpc("unfollow_transaction",{following_id:c}).throwOnError(),s.profileStoreService.profile.uiFlagStore.setUiFlagFalse("isFollowing"),s.profileCountersStoreService.profileCounters.decrementKey("follower_counter")}),!0,"Successful unfollowed!")})()}static#e=this.\u0275fac=function(c){return new(c||e)(d.LFG(u.W),d.LFG(p.$))};static#t=this.\u0275prov=d.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})()},2705:(O,v,t)=>{t.d(v,{W:()=>d});var l=t(5226),n=t(9212);let d=(()=>{class u{constructor(){this.profileCounters=new l.N}static#e=this.\u0275fac=function(e){return new(e||u)};static#t=this.\u0275prov=n.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})()},8890:(O,v,t)=>{t.d(v,{h:()=>u,y:()=>p});var l=t(9212),n=t(6814);const d=["*"];let u=(()=>{class a{constructor(){this.size="m",this.textAlign="left",this.hoverable=!1,this.transparent=!1}get sizeS(){return"s"===this.size}get sizeM(){return"m"===this.size}get sizeL(){return"l"===this.size}get textAlignLeft(){return"left"===this.textAlign}get textAlignCenter(){return"center"===this.textAlign}get textAlignRight(){return"right"===this.textAlign}}return a.\u0275fac=function(C){return new(C||a)},a.\u0275cmp=l.Xpm({type:a,selectors:[["tui-island"],["a","tuiIsland",""]],hostAttrs:[1,"tui-island"],hostVars:16,hostBindings:function(C,s){2&C&&l.ekj("tui-island_hoverable",s.hoverable)("tui-island_transparent",s.transparent)("tui-island_size_s",s.sizeS)("tui-island_size_m",s.sizeM)("tui-island_size_l",s.sizeL)("tui-island_text-align_left",s.textAlignLeft)("tui-island_text-align_center",s.textAlignCenter)("tui-island_text-align_right",s.textAlignRight)},inputs:{size:"size",textAlign:"textAlign",hoverable:"hoverable",transparent:"transparent"},ngContentSelectors:d,decls:1,vars:0,template:function(C,s){1&C&&(l.F$t(),l.Hsn(0))},styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0}),a})(),p=(()=>{class a{}return a.\u0275fac=function(C){return new(C||a)},a.\u0275mod=l.oAB({type:a}),a.\u0275inj=l.cJS({imports:[[n.ez]]}),a})()}}]);