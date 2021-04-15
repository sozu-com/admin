(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{BmJZ:function(n,l,e){"use strict";e.d(l,"a",function(){return i});var t=e("gFX4"),a=e("nhiD"),i=(e("AJ6+"),e("OlR4"),e("XY7g"),function(){function n(n,l,e,t,a,i,u){this.element=n,this.admin=l,this.cs=e,this.model=t,this.constant=a,this.spinner=i,this.translate=u,this.durationInSec=0,this.videoObj={thumbnail:"",original:""},this.loadmore=!0,this.loadmoring=!1,this.scrollbarOptions={axis:"y",theme:"dark"},this.parameter={}}return n.prototype.ngOnInit=function(){var n=this;this.parameter.messages=[],setTimeout(function(){n.initSocket(),n.sent_as===n.constant.userType.notary||n.sent_as===n.constant.userType.bank?n.getLeadConversation(!1):n.getMessages()},100)},n.prototype.getLeadConversation=function(n){var l=this,e={lead_id:this.lead_id,other_sent_as:this.other_sent_as,other_id:this.user_id,sent_as:this.sent_as};n&&this.spinner.show(),this.admin.postDataApi("conversation/getLeadConversation",e).subscribe(function(n){l.spinner.hide(),n.data&&(l.parameter.messages=n.data[0].messages,l.parameter.messages.length<30&&(l.loadmore=!1),l.parameter.conversation_id=n.data[0].id,l.scrollToBottom())},function(n){l.spinner.hide()})},n.prototype.getMessages=function(){var n=this;this.admin.postDataApi("conversation/getMessages",{lead_id:this.lead_id,user_id:this.user_id,sent_as:this.sent_as}).subscribe(function(l){n.parameter.messages=l.data[0].messages,n.parameter.messages.length<30&&(n.loadmore=!1),n.parameter.conversation_id=l.data[0].id,n.scrollToBottom()})},n.prototype.initSocket=function(){var n=this;this.parameter.socket=t.connect(this.admin.socketUrl),this.parameter.socket.on("connect",function(l){n.parameter.socket_id=n.parameter.socket.id,n.parameter.connected=n.parameter.socket.connected,n.parameter.connected&&(n.parameter.socket.emit("add-admin",{admin_id:n.admin_id,socket_id:n.parameter.socket_id,device_id:n.admin.deviceId+"_"+n.admin_id},function(n){}),n.parameter.socket.on("message",function(l){l.data.conversation_id===n.parameter.conversation_id&&(n.scrollToBottom(),n.parameter.messages.push(l.data))}))})},n.prototype.scrollToBottom=function(){setTimeout(function(){$(".chat-area").mCustomScrollbar("scrollTo","bottom")},200)},n.prototype.updateModel=function(n){this.model[n]="",this.model.message_type=1},n.prototype.js_yyyy_mm_dd_hh_mm_ss=function(){var n=new Date,l=""+n.getFullYear(),e=""+(n.getMonth()+1);1===e.length&&(e="0"+e);var t=""+n.getDate();1===t.length&&(t="0"+t);var a=""+n.getHours();1===a.length&&(a="0"+a);var i=""+n.getMinutes();1===i.length&&(i="0"+i);var u=""+n.getSeconds();return 1===u.length&&(u="0"+u),l+"-"+e+"-"+t+" "+a+":"+i+":"+u},n.prototype.onSelectFile=function(n,l){var e=this;if(l.target.files[0].size>this.constant.fileSizeLimit)swal(this.translate.instant("swal.error"),this.translate.instant("message.error.fileSizeExceeds"),"error");else{this.optionsButton.nativeElement.click();var t=new a.a;t.message=this.textMessage,t.message_type=2,t.loading=!0,t.uid=Math.random().toString(36).substr(2,15),t.conversation_id=this.parameter.conversation_id,t.conversation_user={admin_id:this.admin_id},t.admin_id=this.admin_id;var i=new Date;if(t.updated_at=i.toUTCString(),this.parameter.messages.push(t),setTimeout(function(){e.scrollToBottom()},100),l.target.files&&l.target.files[0]){var u=new FileReader;u.onload=function(a){e.image=a.target.result,t[n]=a.target.result,setTimeout(function(){e.scrollToBottom()},100),e.cs.saveImage(l.target.files[0]).subscribe(function(n){t.image=n.data.image,e.sendMessage(t)})},u.readAsDataURL(l.target.files[0])}}},n.prototype.saveAttachment=function(n){var l=this;if(n.target.files[0].size>this.constant.fileSizeLimit)swal(this.translate.instant("swal.error"),this.translate.instant("message.error.fileSizeExceeds"),"error");else{this.optionsButton.nativeElement.click();var e=new a.a;e.message=this.textMessage,e.message_type=4,e.loading=!0,e.uid=Math.random().toString(36).substr(2,15),e.conversation_id=this.parameter.conversation_id,e.conversation_user={admin_id:this.admin_id},e.admin_id=this.admin_id,e.attachment_name=n.target.files[0].name;var t=new Date;e.updated_at=t.toUTCString(),this.parameter.messages.push(e),setTimeout(function(){l.scrollToBottom()},100),this.cs.saveAttachment(n.target.files[0]).subscribe(function(n){e.attachment=n.data.name,l.sendMessage(e)})}},n.prototype.playVideo=function(n){this.parameter.messages[n].play=!0},n.prototype.showCanvas=function(n){var l=this;if(n.target.files[0].size>this.constant.fileSizeLimit)swal(this.translate.instant("swal.error"),this.translate.instant("message.error.fileSizeExceeds"),"error");else{this.optionsButton.nativeElement.click();var e=new a.a;e.message=this.textMessage,e.message_type=3,e.loading=!0,e.uid=Math.random().toString(36).substr(2,15),e.conversation_id=this.parameter.conversation_id;var t=new Date;e.updated_at=t.toUTCString(),e.conversation_user={admin_id:this.admin_id},e.admin_id=this.admin_id,this.parameter.messages.push(e),setTimeout(function(){l.scrollToBottom()},100),setTimeout(function(){l.video=document.getElementById("video1");var t=new FileReader,a=l.element.nativeElement.querySelector(".video55");t.onload=(function(l){var t=this;a.src=l.target.result;var i=setInterval(function(){4===a.readyState&&(t.durationInSec=a.duration.toFixed(0),setTimeout(function(){t.newcanvas(a,n.target.files[0],e)},3e3),clearInterval(i))},1e3)}).bind(l),t.readAsDataURL(n.target.files[0])},1e3)}},n.prototype.newcanvas=function(n,l,e){var t=this,a=document.getElementById("canvas"),i=(a.getContext("2d").drawImage(n,0,0,n.videoWidth,n.videoHeight,0,0,a.width,a.height),a.toDataURL("image/jpeg"));e.image=i;var u=this.dataURLtoFile(i,"tempFile.png");this.cs.saveVideo(l,u).subscribe(function(n){e.video=n.data.video,e.image=n.data.thumb,t.sendMessage(e)},function(n){})},n.prototype.dataURLtoFile=function(n,l){for(var e=n.split(","),t=e[0].match(/:(.*?);/)[1],a=atob(e[1]),i=a.length,u=new Uint8Array(i);i--;)u[i]=a.charCodeAt(i);return new File([u],l,{type:t})},n.prototype.toUTCDate=function(n){return new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds())},n.prototype.setText=function(){var n=this;if(!this.textMessage||!this.textMessage.trim())return!1;if(this.sent_as===this.constant.userType.csr_buyer&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Buyer Lead Management"].can_update||0===this.admin.permissions.can_csr_buyer)||this.sent_as===this.constant.userType.inhouse_broker&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Inhouse Agent Lead Management"].can_update||0===this.admin.permissions.can_in_house_broker)||this.sent_as===this.constant.userType.notary&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Notary Lead Management"].can_update||0===this.admin.permissions.can_noatary)||this.sent_as===this.constant.userType.bank&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Bank Lead Management"].can_update||0===this.admin.permissions.can_bank))return!1;var l=new a.a;l.message=this.textMessage,l.message_type=1,l.loading=!0,l.uid=Math.random().toString(36).substr(2,15),l.conversation_id=this.parameter.conversation_id,l.conversation_user={admin_id:this.admin_id};var e=new Date;l.updated_at=e.toUTCString(),l.admin_id=this.admin_id,this.parameter.messages.push(l),this.textMessage="",setTimeout(function(){n.scrollToBottom()},100),this.sendMessage(l)},n.prototype.sendMessage=function(n){var l=this;n.sent_as=this.sent_as,1!=n.message_type||n.message?this.admin.postDataApi("conversation/sendMessage",n).subscribe(function(e){if(1==n.loading){n.loading=!1;var t=l.parameter.messages.findIndex(function(l){return l.uid==n.uid});l.parameter.messages[t]=e.data}setTimeout(function(){l.scrollToBottom()},100)},function(n){swal(l.translate.instant("swal.error"),n.error.message,"error")}):swal(this.translate.instant("swal.error"),this.translate.instant("message.error.pleaseEnterText"),"error")},n.prototype.loadMore=function(n){var l=this;this.loadmoring=!0,this.admin.postDataApi("conversation/getMessages",{lead_id:this.lead_id,user_id:this.user_id,sent_as:this.sent_as,last_message_id:this.parameter.messages[0].id}).subscribe(function(e){l.loadmoring=!1,l.admin_id=n,e.data[0].messages.length<30&&(l.loadmore=!1),l.parameter.messages=e.data[0].messages.concat(l.parameter.messages)})},n.prototype.sendProperty=function(n){var l=new a.a;l.message=n.name+" "+this.translate.instant("commonBlock.with")+" ",n.configuration.bedroom&&(l.message+=n.configuration.bedroom+" "+this.translate.instant("commonBlock.bed")+" "),n.configuration.bathroom&&(l.message+=this.constant.middleDot+n.configuration.bathroom+" "+this.translate.instant("commonBlock.bath")+" "),n.configuration.half_bathroom&&(l.message+=this.constant.middleDot+n.configuration.half_bathroom+" "+this.translate.instant("commonBlock.halfBath")+" "),n.property_type.name&&(l.message+=this.constant.middleDot+n.property_type.name),l.message+=" "+this.translate.instant("commonBlock.in")+" "+n.building.name,l.message_type=5,l.property_id=n.id,l.image=n.image,l.property_url=n.property_url,l.loading=!0,l.uid=Math.random().toString(36).substr(2,15),l.conversation_id=this.parameter.conversation_id,l.conversation_user={admin_id:this.admin_id},this.parameter.messages.push(l);var e=new Date;l.updated_at=e.toUTCString(),this.sendMessage(l)},n}())},uMVi:function(n,l,e){"use strict";var t=e("CcnG"),a=e("A7o+"),i=e("Ip0R"),u=e("uM2D"),s=e("APq1"),o=e("gIcY"),r=e("LRqG"),d=e("GJ0d"),c=e("AJ6+"),m=e("XY7g");e("nhiD"),e("BmJZ"),e("OlR4"),e("miAi"),e.d(l,"a",function(){return p}),e.d(l,"b",function(){return V});var p=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"img",[["src","assets/img/loading-p.gif"]],null,null,null,null,null))],null,null)}function f(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","chat-load-more"]],null,[[null,"click"]],function(n,l,e){var t=!0,a=n.component;return"click"===l&&(t=!1!==a.loadMore(a.admin_id)&&t),t},null,null)),(n()(),t["\u0275ted"](1,null,[" "," "])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,4,0,l.component.loadmoring)},function(n,l){n(l,1,0,t["\u0275unv"](l,1,0,t["\u0275nov"](l,2).transform("commonBlock.previousMessages")))})}function h(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"p",[["style","word-wrap: break-word;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](2,null,["",""]))],null,function(n,l){n(l,2,0,l.parent.context.$implicit.message)})}function v(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function _(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"a",[["data-lightbox","image"],["title","image"]],[[8,"href",4]],null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["class","ui bordered small image"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,4,0,l.parent.context.$implicit.loading)},function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,"")),n(l,2,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,""))})}function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"img",[["class","vid-icon"],["src","assets/img/play-button.png"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.playVideo(n.parent.parent.context.index)&&t),t},null,null))],null,null)}function I(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,7,"div",[["class","chat-vid"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,6,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["class","ui bordered small image"],["onerror","this.src='assets/img/placeholder.png'"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](6,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](7,0,null,null,0,"div",[["class","clearfix"]],null,null,null,null,null))],function(n,l){n(l,4,0,!l.parent.context.$implicit.loading),n(l,6,0,l.parent.context.$implicit.loading)},function(n,l){n(l,2,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,""))})}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"video",[["autoplay",""],["controls",""],["type","video/mp4"]],[[8,"src",4]],null,null,null,null))],null,function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.video,""))})}function w(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function C(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"span",[["class","m-loader"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"img",[["class","ui bordered small image"],["src","assets/img/placeholder.png"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](3,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,3,0,l.parent.parent.context.$implicit.loading)},null)}function T(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"a",[["href","javascript://"],["target","_blank"]],[[8,"href",4]],null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,[""," "])),(n()(),t["\u0275eld"](4,0,null,null,0,"img",[["class","viewfull"],["src","assets/img/viewfull.png"]],null,null,null,null,null))],null,function(n,l){n(l,1,0,t["\u0275inlineInterpolate"](1,"",l.parent.parent.context.$implicit.attachment,"")),n(l,3,0,l.parent.parent.context.$implicit.attachment_name)})}function k(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","chat-shared-file"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](2,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,T)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,2,0,l.parent.context.$implicit.loading),n(l,4,0,!l.parent.context.$implicit.loading)},null)}function R(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"a",[["target","_blank"],["title","image"]],[[8,"href",4]],null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["class","ui bordered small image"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,R)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](5,0,null,null,1,"h5",[],null,null,null,null,null)),(n()(),t["\u0275ted"](6,null,["",""]))],function(n,l){n(l,4,0,l.parent.context.$implicit.loading)},function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.property_url,"")),n(l,2,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,"")),n(l,6,0,l.parent.context.$implicit.message)})}function $(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""])),t["\u0275ppd"](2,1)],null,function(n,l){var e=t["\u0275unv"](l,1,0,n(l,2,0,t["\u0275nov"](l.parent.parent,0),l.parent.context.$implicit.updated_at));n(l,1,0,e)})}function B(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",", ",""])),t["\u0275ppd"](2,2),t["\u0275ppd"](3,1),t["\u0275ppd"](4,2)],null,function(n,l){var e=t["\u0275unv"](l,1,0,n(l,3,0,t["\u0275nov"](l.parent.parent,1),t["\u0275unv"](l,1,0,n(l,2,0,t["\u0275nov"](l.parent.parent,2),l.parent.context.$implicit.updated_at,"h:mm a")))),a=t["\u0275unv"](l,1,1,n(l,4,0,t["\u0275nov"](l.parent.parent,2),l.parent.context.$implicit.updated_at,"MMM d y"));n(l,1,0,e,a)})}function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"strong",[],null,null,null,null,null)),(n()(),t["\u0275ted"](2,null,[""," - ",""])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),t["\u0275ppd"](4,1)],null,function(n,l){var e=t["\u0275unv"](l,2,0,t["\u0275nov"](l,3).transform("commonBlock.by")),a=null!=l.parent.context.$implicit&&null!=l.parent.context.$implicit.conversation_user&&null!=l.parent.context.$implicit.conversation_user.user&&l.parent.context.$implicit.conversation_user.user.name?null==l.parent.context.$implicit?null:null==l.parent.context.$implicit.conversation_user?null:null==l.parent.context.$implicit.conversation_user.user?null:l.parent.context.$implicit.conversation_user.user.name:t["\u0275unv"](l,2,1,n(l,4,0,t["\u0275nov"](l.parent.parent,3),null==l.parent.context.$implicit?null:null==l.parent.context.$implicit.conversation_user?null:null==l.parent.context.$implicit.conversation_user.admin?null:l.parent.context.$implicit.conversation_user.admin.name));n(l,2,0,e,a)})}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,19,"div",[["class","chat-user"]],null,null,null,null,null)),t["\u0275did"](1,278528,null,0,i.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,h)),t["\u0275did"](3,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](5,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](7,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](9,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](11,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](13,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,$)),t["\u0275did"](15,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,B)),t["\u0275did"](17,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,D)),t["\u0275did"](19,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,1,0,"chat-user",(null==l.context.$implicit?null:null==l.context.$implicit.conversation_user?null:l.context.$implicit.conversation_user.admin_id)==e.admin_id?"chat-user-one":"chat-user-two"),n(l,3,0,1==l.context.$implicit.message_type),n(l,5,0,2==l.context.$implicit.message_type),n(l,7,0,3==l.context.$implicit.message_type&&!l.context.$implicit.play),n(l,9,0,3==l.context.$implicit.message_type&&l.context.$implicit.play),n(l,11,0,4==l.context.$implicit.message_type),n(l,13,0,5==l.context.$implicit.message_type),n(l,15,0,l.context.$implicit.updated_at&&l.context.$implicit.id),n(l,17,0,l.context.$implicit.updated_at&&!l.context.$implicit.id),n(l,19,0,(null==l.context.$implicit?null:null==l.context.$implicit.conversation_user?null:l.context.$implicit.conversation_user.admin_id)!=e.admin_id)},null)}function L(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,[[1,0],["optionsButton",1]],null,1,"a",[["class","dropdown-toggle"],["data-toggle","dropdown"],["href","javascript://"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-paperclip"]],null,null,null,null,null))],null,null)}function N(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"a",[],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-paperclip"]],null,null,null,null,null))],null,null)}function V(n){return t["\u0275vid"](0,[t["\u0275pid"](0,u.a,[]),t["\u0275pid"](0,i.LowerCasePipe,[]),t["\u0275pid"](0,i.DatePipe,[t.LOCALE_ID]),t["\u0275pid"](0,i.TitleCasePipe,[]),t["\u0275qud"](671088640,1,{optionsButton:0}),t["\u0275qud"](402653184,2,{msgInput:0}),(n()(),t["\u0275eld"](6,0,null,null,60,"div",[["class","white-bg move-below"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,6,"div",[["class","page-title-3 marginB0"]],null,null,null,null,null)),(n()(),t["\u0275eld"](8,0,null,null,5,"h4",[],null,null,null,null,null)),(n()(),t["\u0275eld"](9,0,null,null,1,"i",[],null,null,null,null,null)),(n()(),t["\u0275eld"](10,0,null,null,0,"img",[["alt","img"],["src","assets/img/chat-icon.png"]],null,null,null,null,null)),(n()(),t["\u0275ted"](11,null,[" "," ",""])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](14,0,null,null,6,"div",[["class","cust-tabs-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](15,0,null,null,5,"div",[["class","chat-area scrollbox"],["malihu-scrollbar",""],["style","height: 704px; width: 429px; padding-right: 17px; outline: none; overflow: hidden;"]],null,null,null,null,null)),t["\u0275did"](16,4341760,null,0,s.a,[t.ElementRef,s.c],{scrollbarOptions:[0,"scrollbarOptions"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](18,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](20,278528,null,0,i.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275eld"](21,0,null,null,4,"div",[["style","position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](22,0,null,null,3,"div",[["class","enscroll-track track3"],["style","position: relative; height: 367px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](23,0,null,null,2,"a",[["class","handle3"],["href",""],["style","position: absolute; z-index: 1; height: 199.244px; top: 0px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](24,0,null,null,0,"div",[["class","top"]],null,null,null,null,null)),(n()(),t["\u0275eld"](25,0,null,null,0,"div",[["class","bottom"]],null,null,null,null,null)),(n()(),t["\u0275eld"](26,0,null,null,40,"div",[["class","chat-text"]],null,null,null,null,null)),(n()(),t["\u0275eld"](27,0,null,null,27,"div",[["class","dropdown attach-items"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,L)),t["\u0275did"](29,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t["\u0275and"](0,[["noPermissiom",2]],null,0,null,N)),(n()(),t["\u0275eld"](31,0,null,null,23,"div",[["class","dropdown-menu"]],null,null,null,null,null)),(n()(),t["\u0275eld"](32,0,null,null,5,"div",[["class","dropdown-item"]],null,null,null,null,null)),(n()(),t["\u0275eld"](33,0,null,null,0,"input",[["accept","image/*"],["name","image"],["type","file"]],null,[[null,"change"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.onSelectFile("image",e)&&t),t},null,null)),(n()(),t["\u0275eld"](34,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-camera"]],null,null,null,null,null)),(n()(),t["\u0275eld"](35,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](36,null,["",""])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](38,0,null,null,5,"a",[["class","dropdown-item"]],null,null,null,null,null)),(n()(),t["\u0275eld"](39,0,null,null,0,"input",[["accept","video/mp4,video/x-m4v,video/*"],["name","video1"],["type","file"]],null,[[null,"change"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.showCanvas(e)&&t),t},null,null)),(n()(),t["\u0275eld"](40,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-video-camera"]],null,null,null,null,null)),(n()(),t["\u0275eld"](41,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](42,null,["",""])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](44,0,null,null,5,"a",[["class","dropdown-item"]],null,null,null,null,null)),(n()(),t["\u0275eld"](45,0,null,null,0,"input",[["accept",".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"],["name","attachment"],["type","file"]],null,[[null,"change"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.saveAttachment(e)&&t),t},null,null)),(n()(),t["\u0275eld"](46,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-file"]],null,null,null,null,null)),(n()(),t["\u0275eld"](47,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](48,null,["",""])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](50,0,null,null,4,"a",[["class","dropdown-item cursor-pointer"]],null,[[null,"click"]],function(n,l,e){var a=!0;return"click"===l&&(a=!1!==t["\u0275nov"](n,68).showModal()&&a),a},null,null)),(n()(),t["\u0275eld"](51,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-file"]],null,null,null,null,null)),(n()(),t["\u0275eld"](52,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](53,null,["",""])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](55,0,[[2,0],["msgInput",1]],null,6,"input",[["autocomplete","off"],["class","chat-input"],["id","message"],["name","message"],["type","text"]],[[8,"placeholder",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup.enter"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var a=!0,i=n.component;return"input"===l&&(a=!1!==t["\u0275nov"](n,56)._handleInput(e.target.value)&&a),"blur"===l&&(a=!1!==t["\u0275nov"](n,56).onTouched()&&a),"compositionstart"===l&&(a=!1!==t["\u0275nov"](n,56)._compositionStart()&&a),"compositionend"===l&&(a=!1!==t["\u0275nov"](n,56)._compositionEnd(e.target.value)&&a),"ngModelChange"===l&&(a=!1!==(i.textMessage=e)&&a),"keyup.enter"===l&&(a=!1!==i.setText()&&a),a},null,null)),t["\u0275did"](56,16384,null,0,o.DefaultValueAccessor,[t.Renderer2,t.ElementRef,[2,o.COMPOSITION_BUFFER_MODE]],null,null),t["\u0275prd"](1024,null,o.NG_VALUE_ACCESSOR,function(n){return[n]},[o.DefaultValueAccessor]),t["\u0275did"](58,671744,null,0,o.NgModel,[[8,null],[8,null],[8,null],[6,o.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,o.NgControl,null,[o.NgModel]),t["\u0275did"](60,16384,null,0,o.NgControlStatus,[[4,o.NgControl]],null,null),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](62,0,null,null,0,"video",[["class","video55"],["controls",""],["style","width: 100%; height: 100%;"],["type","video/mp4"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275eld"](63,0,null,null,0,"canvas",[["height","600"],["id","canvas"],["style","display: none;"],["width","800"]],null,null,null,null,null)),(n()(),t["\u0275eld"](64,0,null,null,2,"button",[["class","btn"]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.setText()&&t),t},null,null)),(n()(),t["\u0275ted"](65,null,["",""])),t["\u0275pid"](131072,a.i,[a.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](67,0,null,null,1,"app-block-get-property",[],null,[[null,"itemSelect"]],function(n,l,e){var t=!0;return"itemSelect"===l&&(t=!1!==n.component.sendProperty(e)&&t),t},r.b,r.a)),t["\u0275did"](68,114688,[["blockGetProperty",4]],0,d.a,[c.a,m.a],null,{itemSelect:"itemSelect"})],function(n,l){var e=l.component;n(l,16,0,e.scrollbarOptions),n(l,18,0,e.loadmore),n(l,20,0,e.parameter.messages),n(l,29,0,e.sent_as==e.constant.userType.csr_buyer&&(1==(null==e.admin?null:null==e.admin.admin_acl["Buyer Lead Management"]?null:e.admin.admin_acl["Buyer Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_csr_buyer))||e.sent_as==e.constant.userType.inhouse_broker&&(1==(null==e.admin?null:null==e.admin.admin_acl["Inhouse Agent Lead Management"]?null:e.admin.admin_acl["Inhouse Agent Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_in_house_broker))||e.sent_as==e.constant.userType.notary&&(1==(null==e.admin?null:null==e.admin.admin_acl["Notary Lead Management"]?null:e.admin.admin_acl["Notary Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_noatary))||e.sent_as==e.constant.userType.bank&&(1==(null==e.admin?null:null==e.admin.admin_acl["Bank Lead Management"]?null:e.admin.admin_acl["Bank Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_bank)),t["\u0275nov"](l,30)),n(l,58,0,"message",e.textMessage),n(l,68,0)},function(n,l){var e=l.component;n(l,11,0,t["\u0275unv"](l,11,0,t["\u0275nov"](l,12).transform("commonBlock.chatWith")),3==e.other_sent_as?t["\u0275unv"](l,11,1,t["\u0275nov"](l,13).transform("commonBlock.CSRClosure")):""),n(l,36,0,t["\u0275unv"](l,36,0,t["\u0275nov"](l,37).transform("commonBlock.photo"))),n(l,42,0,t["\u0275unv"](l,42,0,t["\u0275nov"](l,43).transform("commonBlock.video"))),n(l,48,0,t["\u0275unv"](l,48,0,t["\u0275nov"](l,49).transform("commonBlock.document"))),n(l,53,0,t["\u0275unv"](l,53,0,t["\u0275nov"](l,54).transform("commonBlock.property"))),n(l,55,0,t["\u0275inlineInterpolate"](1,"",t["\u0275unv"](l,55,0,t["\u0275nov"](l,61).transform("addForm.placeholder.typeMsgHere")),""),t["\u0275nov"](l,60).ngClassUntouched,t["\u0275nov"](l,60).ngClassTouched,t["\u0275nov"](l,60).ngClassPristine,t["\u0275nov"](l,60).ngClassDirty,t["\u0275nov"](l,60).ngClassValid,t["\u0275nov"](l,60).ngClassInvalid,t["\u0275nov"](l,60).ngClassPending),n(l,62,0,t["\u0275inlineInterpolate"](1,"",e.videoSrc,"")),n(l,64,0,e.sent_as==e.constant.userType.csr_buyer&&(0==(null==e.admin?null:null==e.admin.admin_acl["Buyer Lead Management"]?null:e.admin.admin_acl["Buyer Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_csr_buyer))||e.sent_as==e.constant.userType.inhouse_broker&&(0==(null==e.admin?null:null==e.admin.admin_acl["Inhouse Agent Lead Management"]?null:e.admin.admin_acl["Inhouse Agent Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_in_house_broker))||e.sent_as==e.constant.userType.notary&&(0==(null==e.admin?null:null==e.admin.admin_acl["Notary Lead Management"]?null:e.admin.admin_acl["Notary Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_noatary))||e.sent_as==e.constant.userType.bank&&(0==(null==e.admin?null:null==e.admin.admin_acl["Bank Lead Management"]?null:e.admin.admin_acl["Bank Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_bank))),n(l,65,0,t["\u0275unv"](l,65,0,t["\u0275nov"](l,66).transform("commonBlock.send")))})}}}]);