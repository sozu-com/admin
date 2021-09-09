(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"0O6+":function(l,n,e){"use strict";e.r(n);var u=e("CcnG"),t=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),o=e("AJ6+"),a=e("wd/R"),d=e("FrUb"),r=function(){function l(l,n,e){this.admin=l,this.spinner=n,this.translate=e,this.selectedProject=[],this.selectedAvailability=0,this.selectedModels=[],this.multiDropdownSettings={},this.selectedGraph=1}return l.prototype.ngOnInit=function(){this.language_code=localStorage.getItem("language_code"),this.min_date=a().subtract(10,"months").toDate(),this.max_date=a().toDate(),this.iniDropDownSetting(),this.locale={firstDayOfWeek:0,dayNames:["domingo","lunes","martes","mi\xe9rcoles","jueves","viernes","s\xe1bado"],dayNamesShort:["dom","lun","mar","mi\xe9","jue","vie","s\xe1b"],dayNamesMin:["D","L","M","X","J","V","S"],monthNames:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],monthNamesShort:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],today:"Hoy",clear:"Clara",dateFormat:"mm/dd/yy",weekHeader:"Wk"},this.searchBuilding(),this.getdata()},l.prototype.iniDropDownSetting=function(){this.multiDropdownSettings={singleSelection:!1,idField:"id",textField:"name",selectAllText:this.translate.instant("commonBlock.selectAll"),unSelectAllText:this.translate.instant("commonBlock.unselectAll"),searchPlaceholderText:this.translate.instant("commonBlock.search"),allowSearchFilter:!0,itemsShowLimit:2}},l.prototype.searchBuilding=function(){var l=this;this.spinner.show(),this.admin.postDataApi("getProjectsForCollections",{}).subscribe(function(n){l.projects=n.data},function(n){l.spinner.hide()})},l.prototype.getModelsByBuilding=function(l){var n=this;this.admin.postDataApi("getModelsByBuilding",{project_id:l}).subscribe(function(l){n.models=l.data},function(l){n.spinner.hide()})},l.prototype.onCityChange=function(){},l.prototype.onCityChangeAll=function(l){},l.prototype.getdata=function(){this.getMarketPricesByModels(),this.getMarketPricesByMonth()},l.prototype.getMarketPricesByModels=function(){var l=this,n=[],e=[];this.selectedProject.length>0&&this.selectedProject.forEach(function(l){n.push(l.id)}),this.selectedModels.length>0&&this.selectedModels.forEach(function(l){e.push(l.id)}),this.admin.postDataApi("getMarketPricesByModels",{availability_filter:this.selectedAvailability,start_date:this.min_date,end_date:this.max_date,project_id:n,model_id:e}).subscribe(function(n){l.sold_property_details=n.data})},l.prototype.getMarketPricesByMonth=function(){var l=this,n=[],e=[];this.selectedProject.length>0&&this.selectedProject.forEach(function(l){n.push(l.id)}),this.selectedModels.length>0&&this.selectedModels.forEach(function(l){e.push(l.id)});var u={availability_filter:this.selectedAvailability,start_date:this.min_date,end_date:this.max_date,project_id:n,model_id:e,price_type:this.selectedGraph};this.spinner.show(),this.admin.postDataApi("getMarketPricesByMonth",u).subscribe(function(n){l.graph_data=n.data,new d.Chart("lineChartContainer",{animationEnabled:!0,exportFileName:"sales-booking",exportEnabled:!0,theme:"light2",toolTip:{shared:!0,contentFormatter:function(l){for(var n=" ",e=0;e<l.entries.length;e++)n+=l.entries[e].dataPoint.label+": "+l.entries[e].dataPoint.y,n+="<br/>",n+="Properties: "+l.entries[e].dataPoint.properties_count,n+="<br/>";return n}},title:{},axisY:{includeZero:!1},data:[{type:"line",indexLabelFontSize:16,dataPoints:l.graph_data}]}).render(),l.spinner.hide()},function(n){l.spinner.hide()})},l.prototype.onProjectchange=function(){var l=[];this.selectedProject.forEach(function(n){l.push(n.id)}),l.length>0?this.getModelsByBuilding(l):this.models=[]},l.prototype.onProjectChangeAll=function(l){var n=[];this.selectedProject.forEach(function(l){n.push(l.id)}),n.length>0?this.getModelsByBuilding(n):this.models=[]},l.prototype.onModelschange=function(){},l.prototype.onModelsChangeAll=function(l){},l.prototype.onSelectGraph=function(){this.getMarketPricesByMonth()},l}(),i=e("y8yD"),s={roles:["Property Management","can_create","can_csr_seller"]},c={roles:["Property Management","can_create","can_csr_seller"]},g=function(){return function(){}}(),p=e("pMnS"),m=e("7Z8E"),v=e("A7o+"),h=e("Ip0R"),f=e("FUWh"),C=e("sdDj"),y=e("KB/w"),_=e("gIcY"),S=e("m/DL"),b=e("5NQ/"),A=e("CQ0i"),R=e("miAi"),M=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function D(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"div",[["class","no-sales-trend"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"h6",[],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef])],null,function(l,n){l(n,2,0,u["\u0275unv"](n,2,0,u["\u0275nov"](n,3).transform("viewProjectAnalysis.noSoldPropertiesAvailable")))})}function j(l){return u["\u0275vid"](0,[u["\u0275pid"](0,h.DecimalPipe,[u.LOCALE_ID]),(l()(),u["\u0275eld"](1,0,null,null,157,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,4,"div",[["class","col-lg-6 col-md-6 col-sm-6 col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,3,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,2,"p",[["class","p16"]],null,null,null,null,null)),(l()(),u["\u0275ted"](6,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](8,0,null,null,86,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](9,0,null,null,12,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](10,0,null,null,11,"div",[["class","form-group"],["style","display: grid;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](11,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](12,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](14,0,null,null,7,"p-calendar",[["class","coll-report-calendar"],["name","min_date"],["showButtonBar","true"],["showIcon","true"],["yearRange","2000:2040"]],[[2,"ui-inputwrapper-filled",null],[2,"ui-inputwrapper-focus",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.min_date=e)&&u),u},f.b,f.a)),u["\u0275prd"](512,null,C.DomHandler,C.DomHandler,[]),u["\u0275did"](16,13877248,null,1,y.Calendar,[u.ElementRef,C.DomHandler,u.Renderer2,u.ChangeDetectorRef],{name:[0,"name"],showIcon:[1,"showIcon"],monthNavigator:[2,"monthNavigator"],yearNavigator:[3,"yearNavigator"],yearRange:[4,"yearRange"],showButtonBar:[5,"showButtonBar"],locale:[6,"locale"]},null),u["\u0275qud"](603979776,1,{templates:1}),u["\u0275prd"](1024,null,_.NG_VALUE_ACCESSOR,function(l){return[l]},[y.Calendar]),u["\u0275did"](19,671744,null,0,_.NgModel,[[8,null],[8,null],[8,null],[6,_.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,_.NgControl,null,[_.NgModel]),u["\u0275did"](21,16384,null,0,_.NgControlStatus,[[4,_.NgControl]],null,null),(l()(),u["\u0275eld"](22,0,null,null,12,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](23,0,null,null,11,"div",[["class","form-group"],["style","display: grid;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](24,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](25,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](27,0,null,null,7,"p-calendar",[["class","coll-report-calendar"],["name","max_date"],["showButtonBar","true"],["showIcon","true"],["yearRange","2000:2040"]],[[2,"ui-inputwrapper-filled",null],[2,"ui-inputwrapper-focus",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.max_date=e)&&u),u},f.b,f.a)),u["\u0275prd"](512,null,C.DomHandler,C.DomHandler,[]),u["\u0275did"](29,13877248,null,1,y.Calendar,[u.ElementRef,C.DomHandler,u.Renderer2,u.ChangeDetectorRef],{name:[0,"name"],showIcon:[1,"showIcon"],monthNavigator:[2,"monthNavigator"],yearNavigator:[3,"yearNavigator"],yearRange:[4,"yearRange"],showButtonBar:[5,"showButtonBar"],minDate:[6,"minDate"],locale:[7,"locale"]},null),u["\u0275qud"](603979776,2,{templates:1}),u["\u0275prd"](1024,null,_.NG_VALUE_ACCESSOR,function(l){return[l]},[y.Calendar]),u["\u0275did"](32,671744,null,0,_.NgModel,[[8,null],[8,null],[8,null],[6,_.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,_.NgControl,null,[_.NgModel]),u["\u0275did"](34,16384,null,0,_.NgControlStatus,[[4,_.NgControl]],null,null),(l()(),u["\u0275eld"](35,0,null,null,10,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](36,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](37,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](38,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](40,0,null,null,5,"ng-multiselect-dropdown",[["class","col-3 section-section2 multi-select"],["name","selectedProject"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"onDeSelect"],[null,"onSelect"],[null,"onSelectAll"],[null,"onDeSelectAll"],[null,"blur"]],function(l,n,e){var t=!0,o=l.component;return"blur"===n&&(t=!1!==u["\u0275nov"](l,41).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(o.selectedProject=e)&&t),"onDeSelect"===n&&(t=!1!==o.onProjectchange()&&t),"onSelect"===n&&(t=!1!==o.onProjectchange()&&t),"onSelectAll"===n&&(t=!1!==o.onProjectChangeAll(e)&&t),"onDeSelectAll"===n&&(t=!1!==o.onCityChangeAll(e)&&t),t},S.b,S.a)),u["\u0275did"](41,49152,null,0,b.a,[u.ChangeDetectorRef],{placeholder:[0,"placeholder"],settings:[1,"settings"],data:[2,"data"]},{onSelect:"onSelect",onDeSelect:"onDeSelect",onSelectAll:"onSelectAll",onDeSelectAll:"onDeSelectAll"}),u["\u0275prd"](1024,null,_.NG_VALUE_ACCESSOR,function(l){return[l]},[b.a]),u["\u0275did"](43,671744,null,0,_.NgModel,[[8,null],[8,null],[8,null],[6,_.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,_.NgControl,null,[_.NgModel]),u["\u0275did"](45,16384,null,0,_.NgControlStatus,[[4,_.NgControl]],null,null),(l()(),u["\u0275eld"](46,0,null,null,30,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](47,0,null,null,29,"div",[["class","form-group"],["style","display: grid;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](48,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](49,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](51,0,null,null,25,"select",[["name","availability_filter"],["style","height:37px;"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var t=!0,o=l.component;return"change"===n&&(t=!1!==u["\u0275nov"](l,52).onChange(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,52).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(o.selectedAvailability=e)&&t),t},null,null)),u["\u0275did"](52,16384,null,0,_.SelectControlValueAccessor,[u.Renderer2,u.ElementRef],null,null),u["\u0275prd"](1024,null,_.NG_VALUE_ACCESSOR,function(l){return[l]},[_.SelectControlValueAccessor]),u["\u0275did"](54,671744,null,0,_.NgModel,[[8,null],[8,null],[8,null],[6,_.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,_.NgControl,null,[_.NgModel]),u["\u0275did"](56,16384,null,0,_.NgControlStatus,[[4,_.NgControl]],null,null),(l()(),u["\u0275eld"](57,0,null,null,4,"option",[["value","0"]],null,null,null,null,null)),u["\u0275did"](58,147456,null,0,_.NgSelectOption,[u.ElementRef,u.Renderer2,[2,_.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](59,147456,null,0,_["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](60,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](62,0,null,null,4,"option",[["value","1"]],null,null,null,null,null)),u["\u0275did"](63,147456,null,0,_.NgSelectOption,[u.ElementRef,u.Renderer2,[2,_.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](64,147456,null,0,_["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](65,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](67,0,null,null,4,"option",[["value","2"]],null,null,null,null,null)),u["\u0275did"](68,147456,null,0,_.NgSelectOption,[u.ElementRef,u.Renderer2,[2,_.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](69,147456,null,0,_["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](70,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](72,0,null,null,4,"option",[["value","3"]],null,null,null,null,null)),u["\u0275did"](73,147456,null,0,_.NgSelectOption,[u.ElementRef,u.Renderer2,[2,_.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](74,147456,null,0,_["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](75,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](77,0,null,null,10,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](78,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](79,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](80,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](82,0,null,null,5,"ng-multiselect-dropdown",[["class","col-3 section-section2 multi-select"],["name","selectedModels"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"onDeSelect"],[null,"onSelect"],[null,"onSelectAll"],[null,"onDeSelectAll"],[null,"blur"]],function(l,n,e){var t=!0,o=l.component;return"blur"===n&&(t=!1!==u["\u0275nov"](l,83).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(o.selectedModels=e)&&t),"onDeSelect"===n&&(t=!1!==o.onCityChange()&&t),"onSelect"===n&&(t=!1!==o.onModelschange()&&t),"onSelectAll"===n&&(t=!1!==o.onModelsChangeAll(e)&&t),"onDeSelectAll"===n&&(t=!1!==o.onCityChangeAll(e)&&t),t},S.b,S.a)),u["\u0275did"](83,49152,null,0,b.a,[u.ChangeDetectorRef],{placeholder:[0,"placeholder"],settings:[1,"settings"],data:[2,"data"]},{onSelect:"onSelect",onDeSelect:"onDeSelect",onSelectAll:"onSelectAll",onDeSelectAll:"onDeSelectAll"}),u["\u0275prd"](1024,null,_.NG_VALUE_ACCESSOR,function(l){return[l]},[b.a]),u["\u0275did"](85,671744,null,0,_.NgModel,[[8,null],[8,null],[8,null],[6,_.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,_.NgControl,null,[_.NgModel]),u["\u0275did"](87,16384,null,0,_.NgControlStatus,[[4,_.NgControl]],null,null),(l()(),u["\u0275eld"](88,0,null,null,6,"div",[["class","col-lg-2 col-md-2 col-sm-2 col-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](89,0,null,null,5,"div",[["class","form-group btn-cont"]],null,null,null,null,null)),(l()(),u["\u0275eld"](90,0,null,null,1,"label",[["style","display: block; margin-top: 3px;"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\xa0"])),(l()(),u["\u0275eld"](92,0,null,null,2,"button",[["class","btn btn-primary-new width100P P86"],["href","javascript://"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.getdata()&&u),u},null,null)),(l()(),u["\u0275ted"](93,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](95,0,null,null,63,"div",[["class","cust-tabs"]],null,null,null,null,null)),(l()(),u["\u0275eld"](96,0,null,null,62,"div",[["class","tab-content white-bg"]],null,null,null,null,null)),(l()(),u["\u0275eld"](97,0,null,null,61,"div",[["class","row"],["style","margin: 0;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](98,0,null,null,22,"div",[["class","col-lg-6 col-md-12 col-sm-12 col-12"],["style","margin-bottom: 10px;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](99,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](100,0,null,null,20,"div",[["class","col-md-10 pt-2 mt-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](101,0,null,null,9,"p",[],null,null,null,null,null)),(l()(),u["\u0275eld"](102,0,null,null,5,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275eld"](103,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),u["\u0275ted"](104,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](106,0,null,null,1,"i",[["aria-hidden","true"],["class","fa fa-info"],["style","color: #00b96f;margin-left: 10px;"]],[[8,"title",0]],null,null,null,null)),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](108,0,null,null,2,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275ted"](109,null,["$",""])),u["\u0275ppd"](110,2),(l()(),u["\u0275eld"](111,0,null,null,9,"p",[],null,null,null,null,null)),(l()(),u["\u0275eld"](112,0,null,null,5,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275eld"](113,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),u["\u0275ted"](114,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](116,0,null,null,1,"i",[["aria-hidden","true"],["class","fa fa-info"],["style","color: #00b96f;margin-left: 10px;"]],[[8,"title",0]],null,null,null,null)),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](118,0,null,null,2,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275ted"](119,null,["$",""])),u["\u0275ppd"](120,2),(l()(),u["\u0275eld"](121,0,null,null,0,"div",[["class","col-lg-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](122,0,null,null,22,"div",[["class","col-lg-2 col-md-3 col-sm-2 col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](123,0,null,null,21,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](124,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](125,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](127,0,null,null,0,"div",[["class","clearfix"]],null,null,null,null,null)),(l()(),u["\u0275eld"](128,0,null,null,15,"select",[["id","graph"],["name","graph"],["style","min-width: 115px;"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var t=!0,o=l.component;return"change"===n&&(t=!1!==u["\u0275nov"](l,129).onChange(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,129).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(o.selectedGraph=e)&&t),"change"===n&&(t=!1!==o.onSelectGraph()&&t),t},null,null)),u["\u0275did"](129,16384,null,0,_.SelectControlValueAccessor,[u.Renderer2,u.ElementRef],null,null),u["\u0275prd"](1024,null,_.NG_VALUE_ACCESSOR,function(l){return[l]},[_.SelectControlValueAccessor]),u["\u0275did"](131,671744,null,0,_.NgModel,[[8,null],[8,null],[8,null],[6,_.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,_.NgControl,null,[_.NgModel]),u["\u0275did"](133,16384,null,0,_.NgControlStatus,[[4,_.NgControl]],null,null),(l()(),u["\u0275eld"](134,0,null,null,4,"option",[["selected","selectedGraph == '1'"]],null,null,null,null,null)),u["\u0275did"](135,147456,null,0,_.NgSelectOption,[u.ElementRef,u.Renderer2,[2,_.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](136,147456,null,0,_["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](137,null,[""," "])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](139,0,null,null,4,"option",[["selected","selectedGraph == '2'"]],null,null,null,null,null)),u["\u0275did"](140,147456,null,0,_.NgSelectOption,[u.ElementRef,u.Renderer2,[2,_.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](141,147456,null,0,_["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](142,null,[""," "])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](144,0,null,null,0,"div",[["class","clearfix"]],null,null,null,null,null)),(l()(),u["\u0275eld"](145,0,null,null,0,"div",[["class","col-lg-10 col-md-9 col-sm-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](146,0,null,null,12,"div",[["class","col-md-12 col-sm-12 col-12"],["style","margin-top: 20px"]],null,null,null,null,null)),(l()(),u["\u0275eld"](147,0,null,null,11,"div",[["class","dashboard-bx"]],null,null,null,null,null)),(l()(),u["\u0275eld"](148,0,null,null,4,"h4",[],null,null,null,null,null)),(l()(),u["\u0275eld"](149,0,null,null,3,"strong",[],null,null,null,null,null)),(l()(),u["\u0275ted"](150,null,["",""])),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),u["\u0275pid"](131072,v.i,[v.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](153,0,null,null,3,"div",[],null,null,null,null,null)),u["\u0275did"](154,278528,null,0,h.NgStyle,[u.KeyValueDiffers,u.ElementRef,u.Renderer2],{ngStyle:[0,"ngStyle"]},null),u["\u0275pod"](155,{display:0}),(l()(),u["\u0275eld"](156,0,null,null,0,"div",[["id","lineChartContainer"],["style","height: 415px; width: 90%; margin-left:auto;margin-right:auto;"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,D)),u["\u0275did"](158,16384,null,0,h.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component;l(n,16,0,"min_date","true",!0,!0,"2000:2040","true",e.locale),l(n,19,0,"min_date",e.min_date),l(n,29,0,"max_date","true",!0,!0,"2000:2040","true",e.min_date,e.locale),l(n,32,0,"max_date",e.max_date),l(n,41,0,"",e.multiDropdownSettings,e.projects),l(n,43,0,"selectedProject",e.selectedProject),l(n,54,0,"availability_filter",e.selectedAvailability),l(n,58,0,"0"),l(n,59,0,"0"),l(n,63,0,"1"),l(n,64,0,"1"),l(n,68,0,"2"),l(n,69,0,"2"),l(n,73,0,"3"),l(n,74,0,"3"),l(n,83,0,"",e.multiDropdownSettings,e.models),l(n,85,0,"selectedModels",e.selectedModels),l(n,131,0,"graph",e.selectedGraph),l(n,135,0,1),l(n,136,0,1),l(n,140,0,2),l(n,141,0,2);var u=l(n,155,0,e.graph_data&&e.graph_data.length>0?"block":"none");l(n,154,0,u),l(n,158,0,!e.graph_data||0==e.graph_data.length)},function(l,n){var e=n.component;l(n,6,0,u["\u0275unv"](n,6,0,u["\u0275nov"](n,7).transform("viewProjectAnalysis.label"))),l(n,12,0,u["\u0275unv"](n,12,0,u["\u0275nov"](n,13).transform("filters.time.custom.from"))),l(n,14,0,u["\u0275nov"](n,16).filled,u["\u0275nov"](n,16).focus,u["\u0275nov"](n,21).ngClassUntouched,u["\u0275nov"](n,21).ngClassTouched,u["\u0275nov"](n,21).ngClassPristine,u["\u0275nov"](n,21).ngClassDirty,u["\u0275nov"](n,21).ngClassValid,u["\u0275nov"](n,21).ngClassInvalid,u["\u0275nov"](n,21).ngClassPending),l(n,25,0,u["\u0275unv"](n,25,0,u["\u0275nov"](n,26).transform("filters.time.custom.to"))),l(n,27,0,u["\u0275nov"](n,29).filled,u["\u0275nov"](n,29).focus,u["\u0275nov"](n,34).ngClassUntouched,u["\u0275nov"](n,34).ngClassTouched,u["\u0275nov"](n,34).ngClassPristine,u["\u0275nov"](n,34).ngClassDirty,u["\u0275nov"](n,34).ngClassValid,u["\u0275nov"](n,34).ngClassInvalid,u["\u0275nov"](n,34).ngClassPending),l(n,38,0,u["\u0275unv"](n,38,0,u["\u0275nov"](n,39).transform("viewProjectAnalysis.project"))),l(n,40,0,u["\u0275nov"](n,45).ngClassUntouched,u["\u0275nov"](n,45).ngClassTouched,u["\u0275nov"](n,45).ngClassPristine,u["\u0275nov"](n,45).ngClassDirty,u["\u0275nov"](n,45).ngClassValid,u["\u0275nov"](n,45).ngClassInvalid,u["\u0275nov"](n,45).ngClassPending),l(n,49,0,u["\u0275unv"](n,49,0,u["\u0275nov"](n,50).transform("viewProjectAnalysis.availability"))),l(n,51,0,u["\u0275nov"](n,56).ngClassUntouched,u["\u0275nov"](n,56).ngClassTouched,u["\u0275nov"](n,56).ngClassPristine,u["\u0275nov"](n,56).ngClassDirty,u["\u0275nov"](n,56).ngClassValid,u["\u0275nov"](n,56).ngClassInvalid,u["\u0275nov"](n,56).ngClassPending),l(n,60,0,u["\u0275unv"](n,60,0,u["\u0275nov"](n,61).transform("table.th.all"))),l(n,65,0,u["\u0275unv"](n,65,0,u["\u0275nov"](n,66).transform("table.th.buy"))),l(n,70,0,u["\u0275unv"](n,70,0,u["\u0275nov"](n,71).transform("table.th.rent"))),l(n,75,0,u["\u0275unv"](n,75,0,u["\u0275nov"](n,76).transform("table.th.inventory"))),l(n,80,0,u["\u0275unv"](n,80,0,u["\u0275nov"](n,81).transform("viewProjectAnalysis.models"))),l(n,82,0,u["\u0275nov"](n,87).ngClassUntouched,u["\u0275nov"](n,87).ngClassTouched,u["\u0275nov"](n,87).ngClassPristine,u["\u0275nov"](n,87).ngClassDirty,u["\u0275nov"](n,87).ngClassValid,u["\u0275nov"](n,87).ngClassInvalid,u["\u0275nov"](n,87).ngClassPending),l(n,92,0,!e.min_date||!e.max_date),l(n,93,0,u["\u0275unv"](n,93,0,u["\u0275nov"](n,94).transform("filters.time.custom.applyBtn"))),l(n,104,0,u["\u0275unv"](n,104,0,u["\u0275nov"](n,105).transform("viewProjectAnalysis.averagePrice"))),l(n,106,0,u["\u0275inlineInterpolate"](1,"",u["\u0275unv"](n,106,0,u["\u0275nov"](n,107).transform("viewProjectAnalysis.averagePriceH")),""));var t=null!=e.sold_property_details&&e.sold_property_details.average_price?u["\u0275unv"](n,109,0,l(n,110,0,u["\u0275nov"](n,0),null==e.sold_property_details?null:e.sold_property_details.average_price,"1.2-2")):0;l(n,109,0,t),l(n,114,0,u["\u0275unv"](n,114,0,u["\u0275nov"](n,115).transform("viewProjectAnalysis.averagepriceperM2"))),l(n,116,0,u["\u0275inlineInterpolate"](1,"",u["\u0275unv"](n,116,0,u["\u0275nov"](n,117).transform("viewProjectAnalysis.averagePricePerM")),""));var o=null!=e.sold_property_details&&e.sold_property_details.average_carpate_area?u["\u0275unv"](n,119,0,l(n,120,0,u["\u0275nov"](n,0),null==e.sold_property_details?null:e.sold_property_details.average_carpate_area,"1.2-2")):0;l(n,119,0,o),l(n,125,0,u["\u0275unv"](n,125,0,u["\u0275nov"](n,126).transform("viewProjectAnalysis.selectGraph"))),l(n,128,0,u["\u0275nov"](n,133).ngClassUntouched,u["\u0275nov"](n,133).ngClassTouched,u["\u0275nov"](n,133).ngClassPristine,u["\u0275nov"](n,133).ngClassDirty,u["\u0275nov"](n,133).ngClassValid,u["\u0275nov"](n,133).ngClassInvalid,u["\u0275nov"](n,133).ngClassPending),l(n,137,0,u["\u0275unv"](n,137,0,u["\u0275nov"](n,138).transform("viewProjectAnalysis.averagePrice"))),l(n,142,0,u["\u0275unv"](n,142,0,u["\u0275nov"](n,143).transform("viewProjectAnalysis.averagepriceperM2"))),l(n,150,0,u["\u0275unv"](n,150,0,1==e.selectedGraph?u["\u0275nov"](n,151).transform("viewProjectAnalysis.averagePrice"):u["\u0275nov"](n,152).transform("viewProjectAnalysis.averagepriceperM2")))})}function P(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"app-project-analysis",[],null,null,null,j,M)),u["\u0275prd"](4608,null,A.a,A.a,[]),u["\u0275did"](2,114688,null,0,r,[o.a,R.c,v.j],null,null)],function(l,n){l(n,2,0)},null)}var N=u["\u0275ccf"]("app-project-analysis",r,P,{},{},[]),w=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function E(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" location-analysis works!\n"]))],null,null)}function k(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-location-analysis",[],null,null,null,E,w)),u["\u0275did"](1,114688,null,0,t,[],null,null)],function(l,n){l(n,1,0)},null)}var B=u["\u0275ccf"]("app-location-analysis",t,k,{},{},[]),V=e("xkgV"),L=e("APq1"),x=e("Se1k"),I=e("k/Rj"),O=e("ZYCi"),U=e("VSng"),G=e("7LN8"),F=e("JbCa"),T=e("6fHJ"),H=e("jvDc"),J=e("/qvy"),Z=e("b3E/"),z=e("w6+6"),q=e("IZET"),K=e("1jDe"),W=e("T8sE"),Y=e("skic"),Q=e("KeWI"),$=e("UsZU"),X=e("50k4"),ll=e("o56U"),nl=e("U3vz"),el=e("r6ye"),ul=e("KktT"),tl=e("eby4");e.d(n,"MarketAnalysisModuleNgFactory",function(){return ol});var ol=u["\u0275cmf"](g,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[p.a,m.a,N,B]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,h.NgLocalization,h.NgLocaleLocalization,[u.LOCALE_ID,[2,h["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,_["\u0275angular_packages_forms_forms_i"],_["\u0275angular_packages_forms_forms_i"],[]),u["\u0275mpd"](4608,_.FormBuilder,_.FormBuilder,[]),u["\u0275mpd"](4608,V.e,V.e,[]),u["\u0275mpd"](4608,L.c,L.c,[u.NgZone]),u["\u0275mpd"](4608,x.a,x.a,[u.ApplicationRef,u.ComponentFactoryResolver,u.Injector]),u["\u0275mpd"](4608,I.a,I.a,[x.a]),u["\u0275mpd"](4608,h.LocationStrategy,h.PathLocationStrategy,[h.PlatformLocation,[2,h.APP_BASE_HREF]]),u["\u0275mpd"](4608,h.Location,h.Location,[h.LocationStrategy]),u["\u0275mpd"](1073742336,h.CommonModule,h.CommonModule,[]),u["\u0275mpd"](1073742336,O.s,O.s,[[2,O.y],[2,O.o]]),u["\u0275mpd"](1073742336,_["\u0275angular_packages_forms_forms_bb"],_["\u0275angular_packages_forms_forms_bb"],[]),u["\u0275mpd"](1073742336,_.FormsModule,_.FormsModule,[]),u["\u0275mpd"](1073742336,U.ButtonModule,U.ButtonModule,[]),u["\u0275mpd"](1073742336,G.SharedModule,G.SharedModule,[]),u["\u0275mpd"](1073742336,y.CalendarModule,y.CalendarModule,[]),u["\u0275mpd"](1073742336,_.ReactiveFormsModule,_.ReactiveFormsModule,[]),u["\u0275mpd"](1073742336,L.b,L.b,[]),u["\u0275mpd"](1073742336,V.a,V.a,[]),u["\u0275mpd"](1073742336,F.b,F.b,[]),u["\u0275mpd"](1073742336,T.a,T.a,[]),u["\u0275mpd"](1073742336,v.g,v.g,[]),u["\u0275mpd"](1073742336,b.b,b.b,[]),u["\u0275mpd"](1073742336,H.a,H.a,[]),u["\u0275mpd"](1073742336,J.a,J.a,[]),u["\u0275mpd"](1073742336,Z.a,Z.a,[]),u["\u0275mpd"](1073742336,z.a,z.a,[]),u["\u0275mpd"](1073742336,q.a,q.a,[]),u["\u0275mpd"](1073742336,K.a,K.a,[]),u["\u0275mpd"](1073742336,W.a,W.a,[]),u["\u0275mpd"](1073742336,Y.a,Y.a,[]),u["\u0275mpd"](1073742336,Q.a,Q.a,[]),u["\u0275mpd"](1073742336,$.a,$.a,[]),u["\u0275mpd"](1073742336,X.a,X.a,[]),u["\u0275mpd"](1073742336,ll.a,ll.a,[]),u["\u0275mpd"](1073742336,nl.a,nl.a,[]),u["\u0275mpd"](1073742336,el.a,el.a,[]),u["\u0275mpd"](1073742336,ul.a,ul.a,[]),u["\u0275mpd"](1073742336,tl.a,tl.a,[]),u["\u0275mpd"](1073742336,R.b,R.b,[]),u["\u0275mpd"](1073742336,g,g,[]),u["\u0275mpd"](1024,O.m,function(){return[[{path:"project-analysis",component:r,canActivate:[i.a],data:s},{path:"location-analysis",component:t,canActivate:[i.a],data:c}]]},[])])})}}]);