(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{tUVg:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),a=e("AJ6+"),u=e("XY7g"),o=function(){function l(l,n,e,t){this.admin=l,this.constant=n,this.router=e,this.spinner=t,this.parameter={}}return l.prototype.ngOnInit=function(){this.parameter.page=this.constant.p,this.parameter.itemsPerPage=this.constant.itemsPerPage,this.getNotifications()},l.prototype.getPage=function(l){this.parameter.page=l,this.getNotifications()},l.prototype.getNotifications=function(){var l=this;this.spinner.show(),this.admin.postDataApi("getNotifications",{page:this.parameter.page}).subscribe(function(n){l.spinner.hide(),l.parameter.items=n.data,l.parameter.total=n.total_count},function(n){l.spinner.hide()})},l.prototype.redirect=function(l){var n;switch(l.notification_type){case 2:case 3:n="/dashboard/projects/details";break;case 4:case 5:n="/dashboard/leads/csr-sellers";break;case 6:n="/dashboard/leads/csr-closers";break;case 7:n="/dashboard/leads/inhouse-broker";break;case 8:n="/dashboard/leads/csr-buyers";break;case 14:n="/dashboard/leads/inhouse-broker";break;case 21:n="/dashboard/projects/details";break;case 25:n="/dashboard/banks/bank-leads";break;case 26:n="/dashboard/notary/notary-leads"}5!==l.notification_type&&this.router.navigate([n,l.notification_data.ref_id])},l}(),r=function(){return function(){}}(),i=e("pMnS"),s=e("abRS"),c=e("xkgV"),d=e("uM2D"),p=e("A7o+"),m=e("Ip0R"),f=e("ZYCi"),g=e("miAi"),h=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"li",[["class","cursor-pointer"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.redirect(l.context.$implicit)&&t),t},null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),t["\u0275ted"](2,null,["",""])),(l()(),t["\u0275eld"](3,0,null,null,4,"p",[],null,null,null,null,null)),(l()(),t["\u0275ted"](4,null,[""," "])),(l()(),t["\u0275eld"](5,0,null,null,2,"span",[["class","pull-right"]],null,null,null,null,null)),(l()(),t["\u0275ted"](6,null,["",""])),t["\u0275ppd"](7,1)],null,function(l,n){l(n,2,0,n.context.$implicit.notification_text),l(n,4,0,n.context.$implicit.notification_desc);var e=t["\u0275unv"](n,6,0,l(n,7,0,t["\u0275nov"](n.parent,0),n.context.$implicit.updated_at));l(n,6,0,e)})}function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","center"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"img",[["src","assets/img/404-error.png"]],null,null,null,null,null))],null,null)}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","btn-cont text-right marginT15"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"pagination-controls",[["class","my-pagination"]],null,[[null,"pageChange"]],function(l,n,e){var t=!0;return"pageChange"===n&&(t=!1!==l.component.getPage(e)&&t),t},s.b,s.a)),t["\u0275did"](2,49152,null,0,c.c,[],null,{pageChange:"pageChange"})],null,null)}function k(l){return t["\u0275vid"](0,[t["\u0275pid"](0,d.a,[]),(l()(),t["\u0275eld"](1,0,null,null,20,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,8,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,7,"div",[["class","title-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,2,"h5",[],null,null,null,null,null)),(l()(),t["\u0275ted"](6,null,["",""])),t["\u0275pid"](131072,p.i,[p.j,t.ChangeDetectorRef]),(l()(),t["\u0275eld"](8,0,null,null,3,"p",[],null,null,null,null,null)),(l()(),t["\u0275ted"](9,null,[""," "," "," ",""])),t["\u0275pid"](131072,p.i,[p.j,t.ChangeDetectorRef]),t["\u0275pid"](131072,p.i,[p.j,t.ChangeDetectorRef]),(l()(),t["\u0275eld"](12,0,null,null,7,"div",[["class","white-bg padding20 profile-content-outer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,4,"ul",[["class","notifications"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,3,null,b)),t["\u0275did"](15,278528,null,0,m.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pod"](16,{itemsPerPage:0,currentPage:1,totalItems:2}),t["\u0275pid"](0,c.b,[c.e]),(l()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](19,16384,null,0,m.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](21,16384,null,0,m.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component,a=t["\u0275unv"](n,15,0,t["\u0275nov"](n,17).transform(e.parameter.items,l(n,16,0,e.parameter.itemsPerPage,e.parameter.page,e.parameter.total)));l(n,15,0,a),l(n,19,0,0==e.parameter.total),l(n,21,0,e.parameter.total)},function(l,n){var e=n.component;l(n,6,0,t["\u0275unv"](n,6,0,t["\u0275nov"](n,7).transform("viewNotifications.label"))),l(n,9,0,t["\u0275unv"](n,9,0,t["\u0275nov"](n,10).transform("table.pagination.showing")),null==e.parameter.items?null:e.parameter.items.length,t["\u0275unv"](n,9,2,t["\u0275nov"](n,11).transform("table.pagination.outof")),e.parameter.total?e.parameter.total:null==e.parameter?null:null==e.parameter.items?null:e.parameter.items.length)})}function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-notifications",[],null,null,null,k,h)),t["\u0275did"](1,114688,null,0,o,[a.a,u.a,f.o,g.c],null,null)],function(l,n){l(n,1,0)},null)}var R=t["\u0275ccf"]("app-notifications",o,C,{},{},[]),y=e("gIcY"),w=e("APq1"),M=e("JbCa"),N=e("jvDc");e.d(n,"NotificationsModuleNgFactory",function(){return D});var D=t["\u0275cmf"](r,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,R]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,m.NgLocalization,m.NgLocaleLocalization,[t.LOCALE_ID,[2,m["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,c.e,c.e,[]),t["\u0275mpd"](4608,y["\u0275angular_packages_forms_forms_i"],y["\u0275angular_packages_forms_forms_i"],[]),t["\u0275mpd"](4608,y.FormBuilder,y.FormBuilder,[]),t["\u0275mpd"](4608,w.c,w.c,[t.NgZone]),t["\u0275mpd"](1073742336,f.s,f.s,[[2,f.y],[2,f.o]]),t["\u0275mpd"](1073742336,m.CommonModule,m.CommonModule,[]),t["\u0275mpd"](1073742336,g.b,g.b,[]),t["\u0275mpd"](1073742336,c.a,c.a,[]),t["\u0275mpd"](1073742336,y["\u0275angular_packages_forms_forms_bb"],y["\u0275angular_packages_forms_forms_bb"],[]),t["\u0275mpd"](1073742336,y.FormsModule,y.FormsModule,[]),t["\u0275mpd"](1073742336,y.ReactiveFormsModule,y.ReactiveFormsModule,[]),t["\u0275mpd"](1073742336,p.g,p.g,[]),t["\u0275mpd"](1073742336,w.b,w.b,[]),t["\u0275mpd"](1073742336,M.b,M.b,[]),t["\u0275mpd"](1073742336,N.a,N.a,[]),t["\u0275mpd"](1073742336,r,r,[]),t["\u0275mpd"](1024,f.m,function(){return[[{path:"",component:o}]]},[])])})},uM2D:function(l,n,e){"use strict";e.d(n,"a",function(){return a});var t=e("wd/R"),a=function(){function l(){}return l.prototype.transform=function(l,n){return void 0===n&&(n="YYYY-MM-DD H:m:s"),t(l,n).utc(!0).local().format("h:mm a, MMM DD YYYY")},l}()}}]);