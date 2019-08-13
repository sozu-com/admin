(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{BmJZ:function(n,l,e){"use strict";e.d(l,"a",function(){return i});var t=e("gFX4"),a=e("nhiD"),i=(e("AJ6+"),e("OlR4"),e("XY7g"),function(){function n(n,l,e,t,a,i){this.element=n,this.admin=l,this.cs=e,this.model=t,this.constant=a,this.spinner=i,this.durationInSec=0,this.videoObj={thumbnail:"",original:""},this.loadmore=!0,this.loadmoring=!1,this.scrollbarOptions={axis:"y",theme:"dark"},this.parameter={}}return n.prototype.ngOnInit=function(){var n=this;this.parameter.messages=[],setTimeout(function(){n.initSocket(),n.sent_as===n.constant.userType.notary||n.sent_as===n.constant.userType.bank?n.getLeadConversation():n.getMessages()},100)},n.prototype.getLeadConversation=function(){var n=this,l={lead_id:this.lead_id,other_sent_as:this.other_sent_as,other_id:this.user_id,sent_as:this.sent_as};this.spinner.show(),this.admin.postDataApi("conversation/getLeadConversation",l).subscribe(function(l){n.spinner.hide(),console.log("conversation/getLeadConversation",l),l.data&&(n.parameter.messages=l.data[0].messages,n.parameter.messages.length<30&&(n.loadmore=!1),n.parameter.conversation_id=l.data[0].id,n.scrollToBottom())},function(l){n.spinner.hide()})},n.prototype.getMessages=function(){var n=this;this.admin.postDataApi("conversation/getMessages",{lead_id:this.lead_id,user_id:this.user_id,sent_as:this.sent_as}).subscribe(function(l){n.parameter.messages=l.data[0].messages,console.log("messages",n.parameter.messages),n.parameter.messages.length<30&&(n.loadmore=!1),n.parameter.conversation_id=l.data[0].id,n.scrollToBottom()})},n.prototype.initSocket=function(){var n=this;this.parameter.socket=t.connect(this.admin.socketUrl),this.parameter.socket.on("connect",function(l){console.log("connect"),console.log("connect",n.parameter.socket),n.parameter.socket_id=n.parameter.socket.id,n.parameter.connected=n.parameter.socket.connected,n.parameter.connected&&(n.parameter.socket.emit("add-admin",{admin_id:n.admin_id,socket_id:n.parameter.socket_id,device_id:n.admin.deviceId+"_"+n.admin_id},function(n){}),n.parameter.socket.on("message",function(l){l.data.conversation_id===n.parameter.conversation_id&&(n.scrollToBottom(),n.parameter.messages.push(l.data))}))})},n.prototype.scrollToBottom=function(){setTimeout(function(){$(".chat-area").mCustomScrollbar("scrollTo","bottom")},200)},n.prototype.updateModel=function(n){this.model[n]="",this.model.message_type=1},n.prototype.js_yyyy_mm_dd_hh_mm_ss=function(){var n=new Date,l=""+n.getFullYear(),e=""+(n.getMonth()+1);1===e.length&&(e="0"+e);var t=""+n.getDate();1===t.length&&(t="0"+t);var a=""+n.getHours();1===a.length&&(a="0"+a);var i=""+n.getMinutes();1===i.length&&(i="0"+i);var u=""+n.getSeconds();return 1===u.length&&(u="0"+u),l+"-"+e+"-"+t+" "+a+":"+i+":"+u},n.prototype.onSelectFile=function(n,l){var e=this;if(l.target.files[0].size>this.constant.fileSizeLimit)swal("Error",this.constant.errorMsg.FILE_SIZE_EXCEEDS,"error");else{this.optionsButton.nativeElement.click();var t=new a.a;t.message=this.textMessage,t.message_type=2,t.loading=!0,t.uid=Math.random().toString(36).substr(2,15),t.conversation_id=this.parameter.conversation_id,t.conversation_user={admin_id:this.admin_id},t.admin_id=this.admin_id;var i=new Date;if(t.updated_at=i.toUTCString(),this.parameter.messages.push(t),setTimeout(function(){e.scrollToBottom()},100),l.target.files&&l.target.files[0]){var u=new FileReader;u.onload=function(a){e.image=a.target.result,t[n]=a.target.result,setTimeout(function(){e.scrollToBottom()},100),e.cs.saveImage(l.target.files[0]).subscribe(function(n){t.image=n.data.image,e.sendMessage(t)})},u.readAsDataURL(l.target.files[0])}}},n.prototype.saveAttachment=function(n){var l=this;if(n.target.files[0].size>this.constant.fileSizeLimit)swal("Error",this.constant.errorMsg.FILE_SIZE_EXCEEDS,"error");else{this.optionsButton.nativeElement.click();var e=new a.a;e.message=this.textMessage,e.message_type=4,e.loading=!0,e.uid=Math.random().toString(36).substr(2,15),e.conversation_id=this.parameter.conversation_id,e.conversation_user={admin_id:this.admin_id},e.admin_id=this.admin_id,e.attachment_name=n.target.files[0].name;var t=new Date;e.updated_at=t.toUTCString(),this.parameter.messages.push(e),setTimeout(function(){l.scrollToBottom()},100),this.cs.saveAttachment(n.target.files[0]).subscribe(function(n){e.attachment=n.data.name,l.sendMessage(e)})}},n.prototype.playVideo=function(n){this.parameter.messages[n].play=!0},n.prototype.showCanvas=function(n){var l=this;if(n.target.files[0].size>this.constant.fileSizeLimit)swal("Error",this.constant.errorMsg.FILE_SIZE_EXCEEDS,"error");else{this.optionsButton.nativeElement.click();var e=new a.a;e.message=this.textMessage,e.message_type=3,e.loading=!0,e.uid=Math.random().toString(36).substr(2,15),e.conversation_id=this.parameter.conversation_id;var t=new Date;e.updated_at=t.toUTCString(),e.conversation_user={admin_id:this.admin_id},e.admin_id=this.admin_id,this.parameter.messages.push(e),setTimeout(function(){l.scrollToBottom()},100),setTimeout(function(){l.video=document.getElementById("video1");var t=new FileReader,a=l.element.nativeElement.querySelector(".video55");t.onload=(function(l){var t=this;a.src=l.target.result;var i=setInterval(function(){4===a.readyState&&(t.durationInSec=a.duration.toFixed(0),setTimeout(function(){t.newcanvas(a,n.target.files[0],e)},3e3),clearInterval(i))},1e3)}).bind(l),t.readAsDataURL(n.target.files[0])},1e3)}},n.prototype.newcanvas=function(n,l,e){var t=this,a=document.getElementById("canvas"),i=(a.getContext("2d").drawImage(n,0,0,n.videoWidth,n.videoHeight,0,0,a.width,a.height),a.toDataURL("image/jpeg"));e.image=i;var u=this.dataURLtoFile(i,"tempFile.png");this.cs.saveVideo(l,u).subscribe(function(n){e.video=n.data.video,e.image=n.data.thumb,t.sendMessage(e)},function(n){})},n.prototype.dataURLtoFile=function(n,l){for(var e=n.split(","),t=e[0].match(/:(.*?);/)[1],a=atob(e[1]),i=a.length,u=new Uint8Array(i);i--;)u[i]=a.charCodeAt(i);return new File([u],l,{type:t})},n.prototype.toUTCDate=function(n){return new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds())},n.prototype.setText=function(){var n=this;if(!this.textMessage||!this.textMessage.trim())return!1;if(this.sent_as===this.constant.userType.csr_buyer&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Buyer Lead Management"].can_update||0===this.admin.permissions.can_csr_buyer)||this.sent_as===this.constant.userType.inhouse_broker&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Broker Lead Management"].can_update||0===this.admin.permissions.can_in_house_broker)||this.sent_as===this.constant.userType.notary&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Notary Lead Management"].can_update||0===this.admin.permissions.can_noatary)||this.sent_as===this.constant.userType.bank&&(0!==Object.keys(this.admin.admin_acl).length&&0===this.admin.admin_acl["Bank Lead Management"].can_update||0===this.admin.permissions.can_bank))return!1;var l=new a.a;l.message=this.textMessage,l.message_type=1,l.loading=!0,l.uid=Math.random().toString(36).substr(2,15),l.conversation_id=this.parameter.conversation_id,l.conversation_user={admin_id:this.admin_id};var e=new Date;console.log("11",e),l.updated_at=e.toUTCString(),console.log("22",l.updated_at),l.admin_id=this.admin_id,this.parameter.messages.push(l),this.textMessage="",setTimeout(function(){n.scrollToBottom()},100),this.sendMessage(l)},n.prototype.sendMessage=function(n){var l=this;1!=n.message_type||n.message?(console.log("Appending",n),this.admin.postDataApi("conversation/sendMessage",n).subscribe(function(e){if(console.log("sendMessage",e),1==n.loading){n.loading=!1;var t=l.parameter.messages.findIndex(function(l){return l.uid==n.uid});l.parameter.messages[t]=e.data}setTimeout(function(){l.scrollToBottom()},100)},function(n){swal("Error",n.error.message,"error")})):swal("Error","Please enter some text.","error")},n.prototype.loadMore=function(n){var l=this;this.loadmoring=!0,this.admin.postDataApi("conversation/getMessages",{lead_id:this.lead_id,user_id:this.user_id,sent_as:this.sent_as,last_message_id:this.parameter.messages[0].id}).subscribe(function(e){l.loadmoring=!1,l.admin_id=n,e.data[0].messages.length<30&&(l.loadmore=!1),l.parameter.messages=e.data[0].messages.concat(l.parameter.messages)})},n.prototype.sendProperty=function(n){var l=new a.a;l.message=n.configuration.name+" in "+n.building.name,l.message_type=5,l.property_id=n.id,l.image=n.image,l.property_url=n.property_url,l.loading=!0,l.uid=Math.random().toString(36).substr(2,15),l.conversation_id=this.parameter.conversation_id,l.conversation_user={admin_id:this.admin_id},this.parameter.messages.push(l);var e=new Date;l.updated_at=e.toUTCString(),this.sendMessage(l)},n}())},uMVi:function(n,l,e){"use strict";var t=e("CcnG"),a=e("Ip0R"),i=e("uM2D"),u=e("APq1"),s=e("gIcY"),o=e("LRqG"),r=e("GJ0d"),d=e("AJ6+"),c=e("XY7g");e("nhiD"),e("BmJZ"),e("OlR4"),e("miAi"),e.d(l,"a",function(){return m}),e.d(l,"b",function(){return N});var m=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function p(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"img",[["src","assets/img/loading-p.gif"]],null,null,null,null,null))],null,null)}function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"div",[["class","chat-load-more"]],null,[[null,"click"]],function(n,l,e){var t=!0,a=n.component;return"click"===l&&(t=!1!==a.loadMore(a.admin_id)&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,[" Previous Messages "])),(n()(),t["\u0275and"](16777216,null,null,1,null,p)),t["\u0275did"](3,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,3,0,l.component.loadmoring)},null)}function f(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"p",[["style","word-wrap: break-word;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](2,null,["",""]))],null,function(n,l){n(l,2,0,l.parent.context.$implicit.message)})}function h(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function _(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"a",[["data-lightbox","image"],["title","image"]],[[8,"href",4]],null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["class","ui bordered small image"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,h)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,4,0,l.parent.context.$implicit.loading)},function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,"")),n(l,2,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,""))})}function v(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"img",[["class","vid-icon"],["src","assets/img/play-button.png"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.playVideo(n.parent.parent.context.index)&&t),t},null,null))],null,null)}function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function I(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,7,"div",[["class","chat-vid"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,6,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["class","ui bordered small image"],["onerror","this.src='assets/img/placeholder.png'"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](6,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](7,0,null,null,0,"div",[["class","clearfix"]],null,null,null,null,null))],function(n,l){n(l,4,0,!l.parent.context.$implicit.loading),n(l,6,0,l.parent.context.$implicit.loading)},function(n,l){n(l,2,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,""))})}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"video",[["autoplay",""],["controls",""],["type","video/mp4"]],[[8,"src",4]],null,null,null,null))],null,function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.video,""))})}function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function w(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"span",[["class","m-loader"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"img",[["class","ui bordered small image"],["src","assets/img/placeholder.png"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](3,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,3,0,l.parent.parent.context.$implicit.loading)},null)}function T(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"a",[["href","javascript://"],["target","_blank"]],[[8,"href",4]],null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,[""," "])),(n()(),t["\u0275eld"](4,0,null,null,0,"img",[["class","viewfull"],["src","assets/img/viewfull.png"]],null,null,null,null,null))],null,function(n,l){n(l,1,0,t["\u0275inlineInterpolate"](1,"",l.parent.parent.context.$implicit.attachment,"")),n(l,3,0,l.parent.parent.context.$implicit.attachment_name)})}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","chat-shared-file"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](2,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,T)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,2,0,l.parent.context.$implicit.loading),n(l,4,0,!l.parent.context.$implicit.loading)},null)}function C(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","loaderr"]],null,null,null,null,null))],null,null)}function k(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"a",[["target","_blank"],["title","image"]],[[8,"href",4]],null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["class","ui bordered small image"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](5,0,null,null,1,"h5",[],null,null,null,null,null)),(n()(),t["\u0275ted"](6,null,["",""]))],function(n,l){n(l,4,0,l.parent.context.$implicit.loading)},function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.property_url,"")),n(l,2,0,t["\u0275inlineInterpolate"](1,"",l.parent.context.$implicit.image,"")),n(l,6,0,l.parent.context.$implicit.message)})}function R(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""])),t["\u0275ppd"](2,1)],null,function(n,l){n(l,1,0,t["\u0275unv"](l,1,0,n(l,2,0,t["\u0275nov"](l.parent.parent,0),l.parent.context.$implicit.updated_at)))})}function $(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",", ",""])),t["\u0275ppd"](2,2),t["\u0275ppd"](3,1),t["\u0275ppd"](4,2)],null,function(n,l){n(l,1,0,t["\u0275unv"](l,1,0,n(l,3,0,t["\u0275nov"](l.parent.parent,1),t["\u0275unv"](l,1,0,n(l,2,0,t["\u0275nov"](l.parent.parent,2),l.parent.context.$implicit.updated_at,"h:mm a")))),t["\u0275unv"](l,1,1,n(l,4,0,t["\u0275nov"](l.parent.parent,2),l.parent.context.$implicit.updated_at,"MMM d y")))})}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"span",[["class","time"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,2,"strong",[],null,null,null,null,null)),(n()(),t["\u0275ted"](2,null,["By - ",""])),t["\u0275ppd"](3,1)],null,function(n,l){n(l,2,0,null!=l.parent.context.$implicit&&null!=l.parent.context.$implicit.conversation_user&&null!=l.parent.context.$implicit.conversation_user.user&&l.parent.context.$implicit.conversation_user.user.name?null==l.parent.context.$implicit?null:null==l.parent.context.$implicit.conversation_user?null:null==l.parent.context.$implicit.conversation_user.user?null:l.parent.context.$implicit.conversation_user.user.name:t["\u0275unv"](l,2,0,n(l,3,0,t["\u0275nov"](l.parent.parent,3),null==l.parent.context.$implicit?null:null==l.parent.context.$implicit.conversation_user?null:null==l.parent.context.$implicit.conversation_user.admin?null:l.parent.context.$implicit.conversation_user.admin.name)))})}function L(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,19,"div",[["class","chat-user"]],null,null,null,null,null)),t["\u0275did"](1,278528,null,0,a.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](3,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](5,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](7,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](9,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](11,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](13,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,R)),t["\u0275did"](15,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,$)),t["\u0275did"](17,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](19,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,1,0,"chat-user",(null==l.context.$implicit?null:null==l.context.$implicit.conversation_user?null:l.context.$implicit.conversation_user.admin_id)==e.admin_id?"chat-user-one":"chat-user-two"),n(l,3,0,1==l.context.$implicit.message_type),n(l,5,0,2==l.context.$implicit.message_type),n(l,7,0,3==l.context.$implicit.message_type&&!l.context.$implicit.play),n(l,9,0,3==l.context.$implicit.message_type&&l.context.$implicit.play),n(l,11,0,4==l.context.$implicit.message_type),n(l,13,0,5==l.context.$implicit.message_type),n(l,15,0,l.context.$implicit.updated_at&&l.context.$implicit.id),n(l,17,0,l.context.$implicit.updated_at&&!l.context.$implicit.id),n(l,19,0,(null==l.context.$implicit?null:null==l.context.$implicit.conversation_user?null:l.context.$implicit.conversation_user.admin_id)!=e.admin_id)},null)}function E(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,[[1,0],["optionsButton",1]],null,1,"a",[["class","dropdown-toggle"],["data-toggle","dropdown"],["href","javascript://"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-paperclip"]],null,null,null,null,null))],null,null)}function B(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"a",[],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-paperclip"]],null,null,null,null,null))],null,null)}function N(n){return t["\u0275vid"](0,[t["\u0275pid"](0,i.a,[]),t["\u0275pid"](0,a.LowerCasePipe,[]),t["\u0275pid"](0,a.DatePipe,[t.LOCALE_ID]),t["\u0275pid"](0,a.TitleCasePipe,[]),t["\u0275qud"](671088640,1,{optionsButton:0}),(n()(),t["\u0275eld"](5,0,null,null,46,"div",[["class","white-bg move-below"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,5,"div",[["class","chat-area scrollbox"],["malihu-scrollbar",""],["style","height: 704px; width: 429px; padding-right: 17px; outline: none; overflow: hidden;"]],null,null,null,null,null)),t["\u0275did"](7,4341760,null,0,u.a,[t.ElementRef,u.c],{scrollbarOptions:[0,"scrollbarOptions"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](9,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,L)),t["\u0275did"](11,278528,null,0,a.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275eld"](12,0,null,null,4,"div",[["style","position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](13,0,null,null,3,"div",[["class","enscroll-track track3"],["style","position: relative; height: 367px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](14,0,null,null,2,"a",[["class","handle3"],["href",""],["style","position: absolute; z-index: 1; height: 199.244px; top: 0px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](15,0,null,null,0,"div",[["class","top"]],null,null,null,null,null)),(n()(),t["\u0275eld"](16,0,null,null,0,"div",[["class","bottom"]],null,null,null,null,null)),(n()(),t["\u0275eld"](17,0,null,null,34,"div",[["class","chat-text"]],null,null,null,null,null)),(n()(),t["\u0275eld"](18,0,null,null,23,"div",[["class","dropdown attach-items"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](20,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t["\u0275and"](0,[["noPermissiom",2]],null,0,null,B)),(n()(),t["\u0275eld"](22,0,null,null,19,"div",[["class","dropdown-menu"]],null,null,null,null,null)),(n()(),t["\u0275eld"](23,0,null,null,4,"div",[["class","dropdown-item"]],null,null,null,null,null)),(n()(),t["\u0275eld"](24,0,null,null,0,"input",[["accept","image/*"],["name","image"],["type","file"]],null,[[null,"change"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.onSelectFile("image",e)&&t),t},null,null)),(n()(),t["\u0275eld"](25,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-camera"]],null,null,null,null,null)),(n()(),t["\u0275eld"](26,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Photo"])),(n()(),t["\u0275eld"](28,0,null,null,4,"a",[["class","dropdown-item"]],null,null,null,null,null)),(n()(),t["\u0275eld"](29,0,null,null,0,"input",[["accept","video/mp4,video/x-m4v,video/*"],["name","video1"],["type","file"]],null,[[null,"change"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.showCanvas(e)&&t),t},null,null)),(n()(),t["\u0275eld"](30,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-video-camera"]],null,null,null,null,null)),(n()(),t["\u0275eld"](31,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Video"])),(n()(),t["\u0275eld"](33,0,null,null,4,"a",[["class","dropdown-item"]],null,null,null,null,null)),(n()(),t["\u0275eld"](34,0,null,null,0,"input",[["accept",".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"],["name","attachment"],["type","file"]],null,[[null,"change"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.saveAttachment(e)&&t),t},null,null)),(n()(),t["\u0275eld"](35,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-file"]],null,null,null,null,null)),(n()(),t["\u0275eld"](36,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Document"])),(n()(),t["\u0275eld"](38,0,null,null,3,"a",[["class","dropdown-item cursor-pointer"]],null,[[null,"click"]],function(n,l,e){var a=!0;return"click"===l&&(a=!1!==t["\u0275nov"](n,53).showModal()&&a),a},null,null)),(n()(),t["\u0275eld"](39,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-file"]],null,null,null,null,null)),(n()(),t["\u0275eld"](40,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Property"])),(n()(),t["\u0275eld"](42,0,null,null,5,"input",[["autocomplete","off"],["class","chat-input"],["id","message"],["name","message"],["placeholder","Type your message here \u2026"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup.enter"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var a=!0,i=n.component;return"input"===l&&(a=!1!==t["\u0275nov"](n,43)._handleInput(e.target.value)&&a),"blur"===l&&(a=!1!==t["\u0275nov"](n,43).onTouched()&&a),"compositionstart"===l&&(a=!1!==t["\u0275nov"](n,43)._compositionStart()&&a),"compositionend"===l&&(a=!1!==t["\u0275nov"](n,43)._compositionEnd(e.target.value)&&a),"ngModelChange"===l&&(a=!1!==(i.textMessage=e)&&a),"keyup.enter"===l&&(a=!1!==i.setText()&&a),a},null,null)),t["\u0275did"](43,16384,null,0,s.DefaultValueAccessor,[t.Renderer2,t.ElementRef,[2,s.COMPOSITION_BUFFER_MODE]],null,null),t["\u0275prd"](1024,null,s.NG_VALUE_ACCESSOR,function(n){return[n]},[s.DefaultValueAccessor]),t["\u0275did"](45,671744,null,0,s.NgModel,[[8,null],[8,null],[8,null],[6,s.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,s.NgControl,null,[s.NgModel]),t["\u0275did"](47,16384,null,0,s.NgControlStatus,[[4,s.NgControl]],null,null),(n()(),t["\u0275eld"](48,0,null,null,0,"video",[["autoplay",""],["class","video55"],["controls",""],["style","width: 100%; height: 100%;"],["type","video/mp4"]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275eld"](49,0,null,null,0,"canvas",[["height","600"],["id","canvas"],["style","display: none;"],["width","800"]],null,null,null,null,null)),(n()(),t["\u0275eld"](50,0,null,null,1,"button",[["class","btn"]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.setText()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Send"])),(n()(),t["\u0275eld"](52,0,null,null,1,"app-block-get-property",[],null,[[null,"itemSelect"]],function(n,l,e){var t=!0;return"itemSelect"===l&&(t=!1!==n.component.sendProperty(e)&&t),t},o.b,o.a)),t["\u0275did"](53,114688,[["blockGetProperty",4]],0,r.a,[d.a,c.a],null,{itemSelect:"itemSelect"})],function(n,l){var e=l.component;n(l,7,0,e.scrollbarOptions),n(l,9,0,e.loadmore),n(l,11,0,e.parameter.messages),n(l,20,0,e.sent_as==e.constant.userType.csr_buyer&&(1==(null==e.admin?null:null==e.admin.admin_acl["Buyer Lead Management"]?null:e.admin.admin_acl["Buyer Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_csr_buyer))||e.sent_as==e.constant.userType.inhouse_broker&&(1==(null==e.admin?null:null==e.admin.admin_acl["Broker Lead Management"]?null:e.admin.admin_acl["Broker Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_in_house_broker))||e.sent_as==e.constant.userType.notary&&(1==(null==e.admin?null:null==e.admin.admin_acl["Notary Lead Management"]?null:e.admin.admin_acl["Notary Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_noatary))||e.sent_as==e.constant.userType.bank&&(1==(null==e.admin?null:null==e.admin.admin_acl["Bank Lead Management"]?null:e.admin.admin_acl["Bank Lead Management"].can_update)||1==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_bank)),t["\u0275nov"](l,21)),n(l,45,0,"message",e.textMessage),n(l,53,0)},function(n,l){var e=l.component;n(l,42,0,t["\u0275nov"](l,47).ngClassUntouched,t["\u0275nov"](l,47).ngClassTouched,t["\u0275nov"](l,47).ngClassPristine,t["\u0275nov"](l,47).ngClassDirty,t["\u0275nov"](l,47).ngClassValid,t["\u0275nov"](l,47).ngClassInvalid,t["\u0275nov"](l,47).ngClassPending),n(l,48,0,t["\u0275inlineInterpolate"](1,"",e.videoSrc,"")),n(l,50,0,e.sent_as==e.constant.userType.csr_buyer&&(0==(null==e.admin?null:null==e.admin.admin_acl["Buyer Lead Management"]?null:e.admin.admin_acl["Buyer Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_csr_buyer))||e.sent_as==e.constant.userType.inhouse_broker&&(0==(null==e.admin?null:null==e.admin.admin_acl["Broker Lead Management"]?null:e.admin.admin_acl["Broker Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_in_house_broker))||e.sent_as==e.constant.userType.notary&&(0==(null==e.admin?null:null==e.admin.admin_acl["Notary Lead Management"]?null:e.admin.admin_acl["Notary Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_noatary))||e.sent_as==e.constant.userType.bank&&(0==(null==e.admin?null:null==e.admin.admin_acl["Bank Lead Management"]?null:e.admin.admin_acl["Bank Lead Management"].can_update)||0==(null==e.admin?null:null==e.admin.permissions?null:e.admin.permissions.can_bank)))})}}}]);