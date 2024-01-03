"use strict";(self.webpackChunkpolity=self.webpackChunkpolity||[]).push([[143],{8143:(D,I,r)=>{r.r(I),r.d(I,{LANDING_ROUTES:()=>B});var d=r(631),T=r(1197),e=r(9212);const y=()=>["/landing/sign-in"],b=()=>["/landing/signup"];let N=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["polity-feature-description"]],standalone:!0,features:[e.jDz],decls:14,vars:7,consts:[[1,"tui-text_h1"],[1,"tui-text_body-m"],["size","l","tuiButton","",1,"tui-form__button",3,"routerLink"],["appearance","flat","size","l","tuiButton","",1,"tui-form__button",3,"routerLink"],[1,"tui-text_h2"]],template:function(o,s){1&o&&(e.TgZ(0,"h1",0),e._uU(1," Willkommen\n"),e.qZA(),e.TgZ(2,"p",1),e._uU(3," Erstelle einen Account oder log dich ein."),e.qZA(),e.TgZ(4,"button",2),e._uU(5,"LOGIN\n"),e.qZA(),e.TgZ(6,"button",3),e._uU(7," SIGNUP\n"),e.qZA(),e.TgZ(8,"h1",0),e._uU(9,"Features"),e.qZA(),e.TgZ(10,"h2",4),e._uU(11,"Profil"),e.qZA(),e.TgZ(12,"p",1),e._uU(13," Auf Polity kannst du dein Profil erstellen, deine Arbeit bewerben und der politischen Arbeit von anderen zu folgen.\n"),e.qZA()),2&o&&(e.xp6(2),e.uIk("data-cy","welcome-instruction"),e.xp6(2),e.Q6J("routerLink",e.DdM(5,y)),e.uIk("data-cy","sign-in"),e.xp6(2),e.Q6J("routerLink",e.DdM(6,b)),e.uIk("data-cy","signup"))},dependencies:[d.fN,d.v0,T.Bz,T.rH]})}return i})();var w=r(5861),t=r(95),a=r(7887),f=r(6586),m=r(282),c=r(2897),_=r(2096),p=r(7618),g=r(7415),l=r(8299),Z=r(6814),h=r(388);function x(i,v){1&i&&e._UZ(0,"tui-svg",13)}function P(i,v){1&i&&e._UZ(0,"tui-svg",13)}const U=()=>[];let F=(()=>{class i{constructor(n){this.authService=n,this.signInForm=new t.cw({email:new t.NI("user1@gmail.com",[t.kI.required,t.kI.email]),password:new t.NI("12345678",[t.kI.required,t.kI.minLength(6)])})}onSignIn(){var n=this;return(0,w.Z)(function*(){yield n.authService.signIn({email:n.signInForm.value.email,password:n.signInForm.value.password}),n.signInForm.reset()})()}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(h.$))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["polity-sign-in"]],standalone:!0,features:[e._Bn([(0,a.Go)({icons:{hide:"tuiIconLockLarge",show:"tuiIconUnlockLarge"}}),{provide:f.yL,useValue:(0,_.of)([""])},{provide:f.Z4,useValue:{required:"Bitte ausf\xfcllen.",email:"Bitte eine g\xfcltige E-Mail-Adresse eingeben.",minlength:({requiredLength:n})=>(0,_.of)(`Passwort ben\xf6tigt mindestens ${n} Zeichen.`)}}]),e.jDz],decls:27,vars:22,consts:[[1,"tui-text_h1"],[1,"tui-text_body-l"],[3,"formGroup","ngSubmit"],[1,"tui-form__row"],["formControlName","email","tuiHintContent","It will be used for sending documents",3,"tuiTextfieldCleaner","tuiTextfieldCustomContent"],["success",""],["formControlName","email",3,"error"],["formControlName","password",3,"tuiTextfieldCleaner","tuiTextfieldCustomContent"],["formControlName","password",3,"error"],[1,"tui-space_top-3","tui-space_left-3"],["routerLink","/landing/request-reset-password",1,"polity-link"],[1,"tui-form__buttons"],["size","l","tuiButton","","type","submit",1,"tui-form__button",3,"disabled"],["src","tuiIconCheck",1,"polity-success","tui-space_left-3"]],template:function(o,s){if(1&o&&(e.TgZ(0,"h1",0),e._uU(1," Login\n"),e.qZA(),e.TgZ(2,"p",1),e._uU(3,"Login in deinen Account.\n"),e.qZA(),e.TgZ(4,"form",2),e.NdJ("ngSubmit",function(){return s.onSignIn()}),e.TgZ(5,"div",3)(6,"tui-input",4),e._uU(7," Type an email "),e.qZA(),e.YNc(8,x,1,0,"ng-template",null,5,e.W1O),e._UZ(10,"tui-error",6),e.ALo(11,"async"),e.ALo(12,"tuiFieldError"),e.qZA(),e.TgZ(13,"div",3)(14,"tui-input-password",7),e._uU(15," Gebe ein Password ein. "),e.qZA(),e.YNc(16,P,1,0,"ng-template",null,5,e.W1O),e._UZ(18,"tui-error",8),e.ALo(19,"async"),e.ALo(20,"tuiFieldError"),e.qZA(),e.TgZ(21,"div",9)(22,"a",10),e._uU(23,"Passwort vergessen?"),e.qZA()(),e.TgZ(24,"div",11)(25,"button",12),e._uU(26," LOGIN "),e.qZA()()()),2&o){const u=e.MAs(9);e.xp6(2),e.uIk("data-cy","sign-in-instruction"),e.xp6(2),e.Q6J("formGroup",s.signInForm),e.xp6(2),e.Q6J("tuiTextfieldCleaner",!0)("tuiTextfieldCustomContent",s.signInForm.controls.email.valid?u:""),e.uIk("data-cy","email"),e.xp6(4),e.Q6J("error",e.lcZ(11,12,e.lcZ(12,14,e.DdM(20,U)))),e.xp6(4),e.Q6J("tuiTextfieldCleaner",!0)("tuiTextfieldCustomContent",s.signInForm.controls.password.valid?u:""),e.uIk("data-cy","password"),e.xp6(4),e.Q6J("error",e.lcZ(19,16,e.lcZ(20,18,e.DdM(21,U)))),e.xp6(7),e.Q6J("disabled",!s.signInForm.valid),e.uIk("data-cy","sign-in")}},dependencies:[p.S,p.v,d.fN,d.v0,a.UO,a.Vs,a.F6,m.Yu,m.Ag,g.EI,g.PN,l.cn,l.be,l.B7,t.UX,t._Y,t.JJ,t.JL,t.sg,t.u,c.Qf,c.K3,c.wU,Z.ez,Z.Ov,T.rH]})}return i})();function L(i,v){1&i&&e._UZ(0,"tui-svg",11)}function S(i,v){1&i&&e._UZ(0,"tui-svg",11)}const A=()=>[];let q=(()=>{class i{constructor(n){this.authService=n,this.signUpForm=new t.cw({email:new t.NI("test987@gmail.com",[t.kI.required,t.kI.email]),password:new t.NI("12345678",[t.kI.required,t.kI.minLength(6)])})}onSignUp(){var n=this;return(0,w.Z)(function*(){yield n.authService.signUp({email:n.signUpForm.value.email,password:n.signUpForm.value.password}),n.signUpForm.reset()})()}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(h.$))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["polity-sign-up"]],standalone:!0,features:[e._Bn([(0,a.Go)({icons:{hide:"tuiIconLockLarge",show:"tuiIconUnlockLarge"}}),{provide:f.yL,useValue:(0,_.of)([""])},{provide:f.Z4,useValue:{required:"Bitte ausf\xfcllen.",email:"Bitte eine g\xfcltige E-Mail-Adresse eingeben.",minlength:({requiredLength:n})=>(0,_.of)(`Passwort ben\xf6tigt mindestens ${n} Zeichen.`)}}]),e.jDz],decls:24,vars:22,consts:[[1,"tui-text_h1"],[1,"tui-text_body-l"],[3,"formGroup","ngSubmit"],[1,"tui-form__row"],["formControlName","email","tuiHintContent","It will be used for sending documents",3,"tuiTextfieldCleaner","tuiTextfieldCustomContent"],["success",""],["formControlName","email",3,"error"],["formControlName","password",3,"tuiTextfieldCleaner","tuiTextfieldCustomContent"],["formControlName","password",3,"error"],[1,"tui-form__buttons"],["size","l","tuiButton","","type","submit",1,"tui-form__button",3,"disabled"],["src","tuiIconCheck",1,"polity-success","tui-space_left-3"]],template:function(o,s){if(1&o&&(e.TgZ(0,"h1",0),e._uU(1," Neuer Account\n"),e.qZA(),e.TgZ(2,"p",1),e._uU(3," Erstelle einen neuen Account.\n"),e.qZA(),e.TgZ(4,"form",2),e.NdJ("ngSubmit",function(){return s.onSignUp()}),e.TgZ(5,"div",3)(6,"tui-input",4),e._uU(7," Type an email "),e.qZA(),e.YNc(8,L,1,0,"ng-template",null,5,e.W1O),e._UZ(10,"tui-error",6),e.ALo(11,"async"),e.ALo(12,"tuiFieldError"),e.qZA(),e.TgZ(13,"div",3)(14,"tui-input-password",7),e._uU(15," Gebe ein Password ein. "),e.qZA(),e.YNc(16,S,1,0,"ng-template",null,5,e.W1O),e._UZ(18,"tui-error",8),e.ALo(19,"async"),e.ALo(20,"tuiFieldError"),e.qZA(),e.TgZ(21,"div",9)(22,"button",10),e._uU(23," ERSTELLEN "),e.qZA()()()),2&o){const u=e.MAs(9);e.xp6(2),e.uIk("data-cy","signup-instruction"),e.xp6(2),e.Q6J("formGroup",s.signUpForm),e.xp6(2),e.Q6J("tuiTextfieldCleaner",!0)("tuiTextfieldCustomContent",s.signUpForm.controls.email.valid?u:""),e.uIk("data-cy","email"),e.xp6(4),e.Q6J("error",e.lcZ(11,12,e.lcZ(12,14,e.DdM(20,A)))),e.xp6(4),e.Q6J("tuiTextfieldCleaner",!0)("tuiTextfieldCustomContent",s.signUpForm.controls.password.valid?u:""),e.uIk("data-cy","password"),e.xp6(4),e.Q6J("error",e.lcZ(19,16,e.lcZ(20,18,e.DdM(21,A)))),e.xp6(4),e.Q6J("disabled",!s.signUpForm.valid),e.uIk("data-cy","signup")}},dependencies:[c.Qf,c.K3,c.wU,t.UX,t._Y,t.JJ,t.JL,t.sg,t.u,l.cn,l.be,l.B7,p.S,p.v,g.EI,g.PN,m.Yu,m.Ag,a.UO,a.Vs,a.F6,Z.ez,Z.Ov,d.fN,d.v0]})}return i})();var C=r(8890);function k(i,v){1&i&&e._UZ(0,"tui-svg",9)}const J=()=>[];let R=(()=>{class i{constructor(n){this.authService=n,this.updatePasswordForm=new t.cw({password:new t.NI("",[t.kI.required,t.kI.minLength(6)])})}onUpdatePassword(){var n=this;return(0,w.Z)(function*(){yield n.authService.updatePassword(n.updatePasswordForm.value.password),n.updatePasswordForm.reset()})()}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(h.$))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["polity-reset-password"]],standalone:!0,features:[e._Bn([(0,a.Go)({icons:{hide:"tuiIconLockLarge",show:"tuiIconUnlockLarge"}}),{provide:f.yL,useValue:(0,_.of)([""])},{provide:f.Z4,useValue:{required:"Bitte ausf\xfcllen.",minlength:({requiredLength:n})=>(0,_.of)(`Passwort ben\xf6tigt mindestens ${n} Zeichen.`)}}]),e.jDz],decls:17,vars:12,consts:[[1,"danger-zone"],[3,"formGroup","ngSubmit"],[1,"tui-island__title"],[1,"tui-island__paragraph"],[1,"tui-space_top-3"],["formControlName","password",3,"tuiTextfieldCleaner","tuiTextfieldCustomContent"],["success",""],["formControlName","password",3,"error"],["size","l","tuiButton","","type","submit",1,"tui-form__button",3,"disabled"],["src","tuiIconCheck",1,"polity-success","tui-space_left-3"]],template:function(o,s){if(1&o&&(e.TgZ(0,"tui-island",0)(1,"form",1),e.NdJ("ngSubmit",function(){return s.onUpdatePassword()}),e.TgZ(2,"h3",2),e._uU(3,"Passwort neu vergeben"),e.qZA(),e.TgZ(4,"p",3),e._uU(5," Vergebe dein Passwort neu. Dein neues Passwort wird beim n\xe4chsten Login ben\xf6tigt. "),e.qZA(),e.TgZ(6,"div",4)(7,"tui-input-password",5),e._uU(8," Gebe ein Password ein. "),e.qZA(),e.YNc(9,k,1,0,"ng-template",null,6,e.W1O),e._UZ(11,"tui-error",7),e.ALo(12,"async"),e.ALo(13,"tuiFieldError"),e.qZA(),e.TgZ(14,"div",4)(15,"button",8),e._uU(16," PASSWORT \xc4NDERN "),e.qZA()()()()),2&o){const u=e.MAs(10);e.xp6(1),e.Q6J("formGroup",s.updatePasswordForm),e.xp6(6),e.Q6J("tuiTextfieldCleaner",!0)("tuiTextfieldCustomContent",s.updatePasswordForm.controls.password.valid?u:""),e.uIk("data-cy","password"),e.xp6(4),e.Q6J("error",e.lcZ(12,7,e.lcZ(13,9,e.DdM(11,J)))),e.xp6(4),e.Q6J("disabled",!s.updatePasswordForm.valid),e.uIk("data-cy","sign-in")}},dependencies:[C.y,C.h,Z.Ov,t.UX,t._Y,t.JJ,t.JL,t.sg,t.u,d.fN,d.v0,p.S,p.v,m.Yu,m.Ag,a.UO,a.Vs,a.F6,g.EI,g.PN,l.cn,l.be,l.B7]})}return i})();function E(i,v){1&i&&e._UZ(0,"tui-svg",9)}const Q=()=>[],B=[{path:"",component:N},{path:"sign-in",component:F},{path:"signup",component:q},{path:"request-reset-password",component:(()=>{class i{constructor(n){this.authService=n,this.requestPasswordResetForm=new t.cw({email:new t.NI("",[t.kI.required,t.kI.email])})}onRequestPasswordReset(){var n=this;return(0,w.Z)(function*(){yield n.authService.requestPasswordReset(n.requestPasswordResetForm.value.email),n.requestPasswordResetForm.reset()})()}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(h.$))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["polity-request-reset-password"]],standalone:!0,features:[e._Bn([{provide:f.Z4,useValue:{required:"Bitte ausf\xfcllen.",email:"Bitte eine g\xfcltige E-Mail-Adresse eingeben."}}]),e.jDz],decls:17,vars:12,consts:[[1,"danger-zone"],[3,"formGroup","ngSubmit"],[1,"tui-island__title"],[1,"tui-island__paragraph"],[1,"tui-space_top-3"],["formControlName","email","tuiHintContent","It will be used for sending documents",3,"tuiTextfieldCleaner","tuiTextfieldCustomContent"],["success",""],["formControlName","email",3,"error"],["size","l","tuiButton","","type","submit",1,"tui-form__button",3,"disabled"],["src","tuiIconCheck",1,"polity-success","tui-space_left-3"]],template:function(o,s){if(1&o&&(e.TgZ(0,"tui-island",0)(1,"form",1),e.NdJ("ngSubmit",function(){return s.onRequestPasswordReset()}),e.TgZ(2,"h3",2),e._uU(3,"Passwort Wiederherstellung"),e.qZA(),e.TgZ(4,"p",3),e._uU(5," Email zur Passwort Wiederherstellung anfordern. "),e.qZA(),e.TgZ(6,"div",4)(7,"tui-input",5),e._uU(8," Type an email "),e.qZA(),e.YNc(9,E,1,0,"ng-template",null,6,e.W1O),e._UZ(11,"tui-error",7),e.ALo(12,"async"),e.ALo(13,"tuiFieldError"),e.qZA(),e.TgZ(14,"div",4)(15,"button",8),e._uU(16," EMAIL ANFORDERN "),e.qZA()()()()),2&o){const u=e.MAs(10);e.xp6(1),e.Q6J("formGroup",s.requestPasswordResetForm),e.xp6(6),e.Q6J("tuiTextfieldCleaner",!0)("tuiTextfieldCustomContent",s.requestPasswordResetForm.controls.email.valid?u:""),e.uIk("data-cy","email"),e.xp6(4),e.Q6J("error",e.lcZ(12,7,e.lcZ(13,9,e.DdM(11,Q)))),e.xp6(4),e.Q6J("disabled",!s.requestPasswordResetForm.valid),e.uIk("data-cy","sign-in")}},dependencies:[Z.Ov,t.UX,t._Y,t.JJ,t.JL,t.sg,t.u,d.fN,d.v0,p.S,p.v,m.Yu,m.Ag,c.Qf,c.K3,c.wU,C.y,C.h,g.EI,g.PN,l.cn,l.be,l.B7]})}return i})()},{path:"reset-password",component:R}]}}]);