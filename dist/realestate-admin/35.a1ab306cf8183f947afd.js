(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{tUVg:function(n,l,a){"use strict";a.r(l);var e=a("CcnG"),t=a("AJ6+"),o=a("XY7g"),i=a("OlR4"),d=function(){function n(n,l,a,e,t){this.admin=n,this.constant=l,this.router=a,this.spinner=e,this.commonSerice=t,this.parameter={}}return n.prototype.ngOnInit=function(){this.parameter.page=this.constant.p,this.parameter.itemsPerPage=this.constant.itemsPerPage,this.getNotifications(),this.getNotificationsCount()},n.prototype.getPage=function(n){this.parameter.page=n,this.getNotifications()},n.prototype.getNotifications=function(){var n=this;this.spinner.show(),this.admin.postDataApi("getNotifications",{page:this.parameter.page}).subscribe(function(l){n.spinner.hide(),n.parameter.items=l.data,n.parameter.total=l.total_count},function(l){n.spinner.hide()})},n.prototype.redirect=function(n){var l;switch(n.notification_type){case 2:case 3:l="/dashboard/projects/details";break;case 4:case 5:l="/dashboard/leads/csr-sellers";break;case 6:l="/dashboard/leads/csr-closers";break;case 7:l="/dashboard/leads/inhouse-broker";break;case 8:l="/dashboard/leads/csr-buyers";break;case 14:l="/dashboard/leads/inhouse-broker";break;case 21:l="/dashboard/projects/details";break;case 25:l="/dashboard/banks/bank-leads";break;case 26:l="/dashboard/notary/notary-leads"}5!==n.notification_type&&this.router.navigate([l,n.notification_data.ref_id])},n.prototype.readSingleNotification=function(n){var l=this;this.spinner.show(),this.admin.postDataApi("readSingleNotification",{id:n.id}).subscribe(function(a){l.spinner.hide(),l.redirect(n)},function(n){l.spinner.hide()})},n.prototype.getNotificationsCount=function(){var n=this;this.admin.postDataApi("getNotificationsCount",{}).subscribe(function(l){localStorage.setItem("notificationCount",l.data.count),n.commonSerice.notificationUnreadCount.next(l.data.count)})},n}(),u=function(){return function(){}}(),r=a("pMnS"),p=a("yWMr"),c=a("t68o"),s=a("zbXB"),m=a("NcP4"),f=a("xYTU"),g=a("Ip0R"),b=a("abRS"),h=a("xkgV"),v=a("uM2D"),C=a("A7o+"),_=a("ZYCi"),k=a("miAi"),y=e["\u0275crt"]({encapsulation:0,styles:[[".border-css[_ngcontent-%COMP%]{border-left:3px solid #00b96f}"]],data:{}});function M(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,9,"li",[["class","cursor-pointer"]],null,[[null,"click"]],function(n,l,a){var e=!0;return"click"===l&&(e=!1!==n.component.readSingleNotification(n.context.$implicit)&&e),e},null,null)),e["\u0275did"](1,278528,null,0,g.NgClass,[e.IterableDiffers,e.KeyValueDiffers,e.ElementRef,e.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e["\u0275pod"](2,{"border-css":0}),(n()(),e["\u0275eld"](3,0,null,null,1,"h5",[],null,null,null,null,null)),(n()(),e["\u0275ted"](4,null,["",""])),(n()(),e["\u0275eld"](5,0,null,null,4,"p",[],null,null,null,null,null)),(n()(),e["\u0275ted"](6,null,[""," "])),(n()(),e["\u0275eld"](7,0,null,null,2,"span",[["class","pull-right"]],null,null,null,null,null)),(n()(),e["\u0275ted"](8,null,["",""])),e["\u0275ppd"](9,1)],function(n,l){var a=n(l,2,0,0==l.context.$implicit.is_read);n(l,1,0,"cursor-pointer",a)},function(n,l){n(l,4,0,l.context.$implicit.notification_text),n(l,6,0,l.context.$implicit.notification_desc);var a=e["\u0275unv"](l,8,0,n(l,9,0,e["\u0275nov"](l.parent,0),l.context.$implicit.created_at));n(l,8,0,a)})}function N(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"div",[["class","center"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,0,"img",[["src","assets/img/404-error.png"]],null,null,null,null,null))],null,null)}function R(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","btn-cont text-right marginT15"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,1,"pagination-controls",[["class","my-pagination"]],null,[[null,"pageChange"]],function(n,l,a){var e=!0;return"pageChange"===l&&(e=!1!==n.component.getPage(a)&&e),e},b.b,b.a)),e["\u0275did"](2,49152,null,0,h.c,[],null,{pageChange:"pageChange"})],null,null)}function w(n){return e["\u0275vid"](0,[e["\u0275pid"](0,v.a,[]),(n()(),e["\u0275eld"](1,0,null,null,20,"div",[["class","container-fluid"]],null,null,null,null,null)),(n()(),e["\u0275eld"](2,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](3,0,null,null,8,"div",[["class","col-md-6"]],null,null,null,null,null)),(n()(),e["\u0275eld"](4,0,null,null,7,"div",[["class","title-group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](5,0,null,null,2,"h5",[],null,null,null,null,null)),(n()(),e["\u0275ted"](6,null,["",""])),e["\u0275pid"](131072,C.i,[C.j,e.ChangeDetectorRef]),(n()(),e["\u0275eld"](8,0,null,null,3,"p",[],null,null,null,null,null)),(n()(),e["\u0275ted"](9,null,[""," "," "," ",""])),e["\u0275pid"](131072,C.i,[C.j,e.ChangeDetectorRef]),e["\u0275pid"](131072,C.i,[C.j,e.ChangeDetectorRef]),(n()(),e["\u0275eld"](12,0,null,null,7,"div",[["class","white-bg padding20 profile-content-outer"]],null,null,null,null,null)),(n()(),e["\u0275eld"](13,0,null,null,4,"ul",[["class","notifications"]],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,3,null,M)),e["\u0275did"](15,278528,null,0,g.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),e["\u0275pod"](16,{itemsPerPage:0,currentPage:1,totalItems:2}),e["\u0275pid"](0,h.b,[h.e]),(n()(),e["\u0275and"](16777216,null,null,1,null,N)),e["\u0275did"](19,16384,null,0,g.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](21,16384,null,0,g.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var a=l.component,t=e["\u0275unv"](l,15,0,e["\u0275nov"](l,17).transform(a.parameter.items,n(l,16,0,a.parameter.itemsPerPage,a.parameter.page,a.parameter.total)));n(l,15,0,t),n(l,19,0,0==a.parameter.total),n(l,21,0,a.parameter.total)},function(n,l){var a=l.component;n(l,6,0,e["\u0275unv"](l,6,0,e["\u0275nov"](l,7).transform("viewNotifications.label"))),n(l,9,0,e["\u0275unv"](l,9,0,e["\u0275nov"](l,10).transform("table.pagination.showing")),null==a.parameter.items?null:a.parameter.items.length,e["\u0275unv"](l,9,2,e["\u0275nov"](l,11).transform("table.pagination.outof")),a.parameter.total?a.parameter.total:null==a.parameter?null:null==a.parameter.items?null:a.parameter.items.length)})}function D(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-notifications",[],null,null,null,w,y)),e["\u0275did"](1,114688,null,0,d,[t.a,o.a,_.o,k.c,i.a],null,null)],function(n,l){n(l,1,0)},null)}var I=e["\u0275ccf"]("app-notifications",d,D,{},{},[]),P=a("gIcY"),F=a("eDkP"),S=a("Fzqc"),Y=a("4tE/"),x=a("M2Lx"),j=a("Wf4p"),A=a("o3x0"),L=a("jQLj"),O=a("mVsa"),B=a("dWZg"),V=a("uGex"),T=a("v9Dh"),Z=a("4epT"),K=a("ZYjt"),q=a("OkvK"),J=a("wmQ5"),W=a("lLAP"),z=a("OBdK"),U=a("APq1"),$=a("4c35"),E=a("qAlS"),H=a("6Wmm"),Q=a("BgWK"),G=a("UodH"),X=a("u7R8"),nn=a("FVSy"),ln=a("de3e"),an=a("/dO6"),en=a("YhbO"),tn=a("jlZm"),on=a("r43C"),dn=a("SMsm"),un=a("/VYK"),rn=a("seP3"),pn=a("b716"),cn=a("LC5p"),sn=a("0/Q6"),mn=a("Z+uX"),fn=a("Blfk"),gn=a("9It4"),bn=a("Nsh5"),hn=a("w+lc"),vn=a("kWGw"),Cn=a("vARd"),_n=a("Lwpp"),kn=a("y4qS"),yn=a("BHnd"),Mn=a("La40"),Nn=a("J12g"),Rn=a("8mMr"),wn=a("vvyD"),Dn=a("JbCa"),In=a("VSng"),Pn=a("7LN8"),Fn=a("KB/w"),Sn=a("6fHJ"),Yn=a("5NQ/"),xn=a("jvDc"),jn=a("YSh2");a.d(l,"NotificationsModuleNgFactory",function(){return An});var An=e["\u0275cmf"](u,[],function(n){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[r.a,p.a,c.a,s.b,s.a,m.a,f.a,f.b,I]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,g.NgLocalization,g.NgLocaleLocalization,[e.LOCALE_ID,[2,g["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,h.e,h.e,[]),e["\u0275mpd"](4608,P["\u0275angular_packages_forms_forms_i"],P["\u0275angular_packages_forms_forms_i"],[]),e["\u0275mpd"](4608,P.FormBuilder,P.FormBuilder,[]),e["\u0275mpd"](4608,F.c,F.c,[F.i,F.e,e.ComponentFactoryResolver,F.h,F.f,e.Injector,e.NgZone,g.DOCUMENT,S.b]),e["\u0275mpd"](5120,F.j,F.k,[F.c]),e["\u0275mpd"](5120,Y.a,Y.b,[F.c]),e["\u0275mpd"](4608,x.c,x.c,[]),e["\u0275mpd"](4608,j.d,j.d,[]),e["\u0275mpd"](5120,A.b,A.c,[F.c]),e["\u0275mpd"](4608,A.d,A.d,[F.c,e.Injector,[2,g.Location],[2,A.a],A.b,[3,A.d],F.e]),e["\u0275mpd"](4608,L.h,L.h,[]),e["\u0275mpd"](5120,L.a,L.b,[F.c]),e["\u0275mpd"](5120,O.a,O.c,[F.c]),e["\u0275mpd"](4608,j.c,j.z,[[2,j.h],B.a]),e["\u0275mpd"](5120,V.a,V.b,[F.c]),e["\u0275mpd"](5120,T.a,T.b,[F.c]),e["\u0275mpd"](5120,Z.b,Z.a,[[3,Z.b]]),e["\u0275mpd"](4608,K.f,j.e,[[2,j.i],[2,j.n]]),e["\u0275mpd"](5120,q.b,q.a,[[3,q.b]]),e["\u0275mpd"](4608,J.a,J.a,[]),e["\u0275mpd"](135680,W.g,W.g,[e.NgZone,B.a]),e["\u0275mpd"](4608,z.e,z.e,[e.TemplateRef]),e["\u0275mpd"](4608,U.c,U.c,[e.NgZone]),e["\u0275mpd"](1073742336,_.s,_.s,[[2,_.y],[2,_.o]]),e["\u0275mpd"](1073742336,g.CommonModule,g.CommonModule,[]),e["\u0275mpd"](1073742336,k.b,k.b,[]),e["\u0275mpd"](1073742336,h.a,h.a,[]),e["\u0275mpd"](1073742336,P["\u0275angular_packages_forms_forms_bb"],P["\u0275angular_packages_forms_forms_bb"],[]),e["\u0275mpd"](1073742336,P.FormsModule,P.FormsModule,[]),e["\u0275mpd"](1073742336,P.ReactiveFormsModule,P.ReactiveFormsModule,[]),e["\u0275mpd"](1073742336,C.g,C.g,[]),e["\u0275mpd"](1073742336,S.a,S.a,[]),e["\u0275mpd"](1073742336,j.n,j.n,[[2,j.f]]),e["\u0275mpd"](1073742336,B.b,B.b,[]),e["\u0275mpd"](1073742336,j.y,j.y,[]),e["\u0275mpd"](1073742336,j.w,j.w,[]),e["\u0275mpd"](1073742336,j.t,j.t,[]),e["\u0275mpd"](1073742336,$.g,$.g,[]),e["\u0275mpd"](1073742336,E.a,E.a,[]),e["\u0275mpd"](1073742336,F.g,F.g,[]),e["\u0275mpd"](1073742336,Y.c,Y.c,[]),e["\u0275mpd"](1073742336,x.d,x.d,[]),e["\u0275mpd"](1073742336,W.a,W.a,[]),e["\u0275mpd"](1073742336,H.a,H.a,[]),e["\u0275mpd"](1073742336,Q.c,Q.c,[]),e["\u0275mpd"](1073742336,G.c,G.c,[]),e["\u0275mpd"](1073742336,X.a,X.a,[]),e["\u0275mpd"](1073742336,nn.a,nn.a,[]),e["\u0275mpd"](1073742336,ln.a,ln.a,[]),e["\u0275mpd"](1073742336,an.b,an.b,[]),e["\u0275mpd"](1073742336,A.g,A.g,[]),e["\u0275mpd"](1073742336,L.i,L.i,[]),e["\u0275mpd"](1073742336,en.c,en.c,[]),e["\u0275mpd"](1073742336,tn.a,tn.a,[]),e["\u0275mpd"](1073742336,j.o,j.o,[]),e["\u0275mpd"](1073742336,on.a,on.a,[]),e["\u0275mpd"](1073742336,dn.b,dn.b,[]),e["\u0275mpd"](1073742336,un.b,un.b,[]),e["\u0275mpd"](1073742336,rn.d,rn.d,[]),e["\u0275mpd"](1073742336,pn.a,pn.a,[]),e["\u0275mpd"](1073742336,cn.a,cn.a,[]),e["\u0275mpd"](1073742336,sn.a,sn.a,[]),e["\u0275mpd"](1073742336,O.b,O.b,[]),e["\u0275mpd"](1073742336,j.A,j.A,[]),e["\u0275mpd"](1073742336,j.q,j.q,[]),e["\u0275mpd"](1073742336,V.d,V.d,[]),e["\u0275mpd"](1073742336,T.c,T.c,[]),e["\u0275mpd"](1073742336,Z.c,Z.c,[]),e["\u0275mpd"](1073742336,mn.a,mn.a,[]),e["\u0275mpd"](1073742336,fn.a,fn.a,[]),e["\u0275mpd"](1073742336,gn.a,gn.a,[]),e["\u0275mpd"](1073742336,bn.a,bn.a,[]),e["\u0275mpd"](1073742336,hn.a,hn.a,[]),e["\u0275mpd"](1073742336,vn.a,vn.a,[]),e["\u0275mpd"](1073742336,Cn.d,Cn.d,[]),e["\u0275mpd"](1073742336,q.c,q.c,[]),e["\u0275mpd"](1073742336,_n.d,_n.d,[]),e["\u0275mpd"](1073742336,J.b,J.b,[]),e["\u0275mpd"](1073742336,kn.o,kn.o,[]),e["\u0275mpd"](1073742336,yn.a,yn.a,[]),e["\u0275mpd"](1073742336,Mn.a,Mn.a,[]),e["\u0275mpd"](1073742336,z.c,z.c,[]),e["\u0275mpd"](1073742336,Nn.c,Nn.c,[]),e["\u0275mpd"](1073742336,Rn.a,Rn.a,[]),e["\u0275mpd"](1073742336,wn.a,wn.a,[]),e["\u0275mpd"](1073742336,U.b,U.b,[]),e["\u0275mpd"](1073742336,Dn.b,Dn.b,[]),e["\u0275mpd"](1073742336,In.ButtonModule,In.ButtonModule,[]),e["\u0275mpd"](1073742336,Pn.SharedModule,Pn.SharedModule,[]),e["\u0275mpd"](1073742336,Fn.CalendarModule,Fn.CalendarModule,[]),e["\u0275mpd"](1073742336,Sn.a,Sn.a,[]),e["\u0275mpd"](1073742336,Yn.b,Yn.b,[]),e["\u0275mpd"](1073742336,xn.a,xn.a,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](256,an.a,{separatorKeyCodes:[jn.f]},[]),e["\u0275mpd"](256,j.g,j.k,[]),e["\u0275mpd"](1024,_.m,function(){return[[{path:"",component:d}]]},[])])})},uM2D:function(n,l,a){"use strict";a.d(l,"a",function(){return t});var e=a("wd/R"),t=function(){function n(){}return n.prototype.transform=function(n,l){return void 0===l&&(l="YYYY-MM-DD H:m:s"),e(n,l).utc(!0).local().format("h:mm a, MMM DD YYYY")},n}()}}]);