(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{"0O6+":function(l,n,e){"use strict";e.r(n);var u=e("CcnG"),t=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),a=e("AJ6+"),o=e("wd/R"),d=e("FrUb"),r=function(){function l(l,n,e){this.admin=l,this.spinner=n,this.translate=e,this.selectedProject=[],this.selectedAvailability=0,this.selectedModels=[],this.multiDropdownSettings={},this.selectedGraph=1}return l.prototype.ngOnInit=function(){this.language_code=localStorage.getItem("language_code"),this.min_date=o().subtract(10,"months").toDate(),this.max_date=o().toDate(),this.iniDropDownSetting(),this.locale={firstDayOfWeek:0,dayNames:["domingo","lunes","martes","mi\xe9rcoles","jueves","viernes","s\xe1bado"],dayNamesShort:["dom","lun","mar","mi\xe9","jue","vie","s\xe1b"],dayNamesMin:["D","L","M","X","J","V","S"],monthNames:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],monthNamesShort:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],today:"Hoy",clear:"Clara",dateFormat:"mm/dd/yy",weekHeader:"Wk"},this.searchBuilding(),this.getdata()},l.prototype.iniDropDownSetting=function(){this.multiDropdownSettings={singleSelection:!1,idField:"id",textField:"name",selectAllText:this.translate.instant("commonBlock.selectAll"),unSelectAllText:this.translate.instant("commonBlock.unselectAll"),searchPlaceholderText:this.translate.instant("commonBlock.search"),allowSearchFilter:!0,itemsShowLimit:2}},l.prototype.searchBuilding=function(){var l=this;this.spinner.show(),this.admin.postDataApi("getProjectsForCollections",{}).subscribe(function(n){l.projects=n.data},function(n){l.spinner.hide()})},l.prototype.getModelsByBuilding=function(l){var n=this;this.admin.postDataApi("getModelsByBuilding",{project_id:l}).subscribe(function(l){n.models=l.data},function(l){n.spinner.hide()})},l.prototype.onCityChange=function(){},l.prototype.onCityChangeAll=function(l){},l.prototype.getdata=function(){this.getMarketPricesByModels(),this.getMarketPricesByMonth()},l.prototype.getMarketPricesByModels=function(){var l=this,n=[],e=[];this.selectedProject.length>0&&this.selectedProject.forEach(function(l){n.push(l.id)}),this.selectedModels.length>0&&this.selectedModels.forEach(function(l){e.push(l.id)}),this.admin.postDataApi("getMarketPricesByModels",{availability_filter:this.selectedAvailability,start_date:this.min_date,end_date:this.max_date,project_id:n,model_id:e}).subscribe(function(n){l.sold_property_details=n.data})},l.prototype.getMarketPricesByMonth=function(){var l=this,n=[],e=[];this.selectedProject.length>0&&this.selectedProject.forEach(function(l){n.push(l.id)}),this.selectedModels.length>0&&this.selectedModels.forEach(function(l){e.push(l.id)});var u={availability_filter:this.selectedAvailability,start_date:this.min_date,end_date:this.max_date,project_id:n,model_id:e,price_type:this.selectedGraph};this.spinner.show(),this.admin.postDataApi("getMarketPricesByMonth",u).subscribe(function(n){l.graph_data=n.data,new d.Chart("lineChartContainer",{animationEnabled:!0,exportFileName:"sales-booking",exportEnabled:!0,theme:"light2",toolTip:{shared:!0,contentFormatter:function(l){for(var n=" ",e=0;e<l.entries.length;e++)n+=l.entries[e].dataPoint.label+": "+l.entries[e].dataPoint.y,n+="<br/>",n+="Properties: "+l.entries[e].dataPoint.properties_count,n+="<br/>";return n}},title:{},axisY:{includeZero:!1},data:[{type:"line",indexLabelFontSize:16,dataPoints:l.graph_data}]}).render(),l.spinner.hide()},function(n){l.spinner.hide()})},l.prototype.onProjectchange=function(){var l=[];this.selectedProject.forEach(function(n){l.push(n.id)}),l.length>0?this.getModelsByBuilding(l):this.models=[]},l.prototype.onProjectChangeAll=function(l){var n=[];this.selectedProject.forEach(function(l){n.push(l.id)}),n.length>0?this.getModelsByBuilding(n):this.models=[]},l.prototype.onModelschange=function(){},l.prototype.onModelsChangeAll=function(l){},l.prototype.onSelectGraph=function(){this.getMarketPricesByMonth()},l}(),i=e("y8yD"),s={roles:["Property Management","can_create","can_csr_seller"]},c={roles:["Property Management","can_create","can_csr_seller"]},p=function(){return function(){}}(),g=e("pMnS"),m=e("yWMr"),v=e("t68o"),h=e("zbXB"),f=e("NcP4"),C=e("xYTU"),y=e("7Z8E"),_=e("A7o+"),b=e("Ip0R"),S=e("FUWh"),A=e("sdDj"),R=e("KB/w"),M=e("gIcY"),D=e("m/DL"),j=e("5NQ/"),P=e("CQ0i"),N=e("miAi"),w=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function E(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"div",[["class","no-sales-trend"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"h6",[],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef])],null,function(l,n){l(n,2,0,u["\u0275unv"](n,2,0,u["\u0275nov"](n,3).transform("viewProjectAnalysis.noSoldPropertiesAvailable")))})}function k(l){return u["\u0275vid"](0,[u["\u0275pid"](0,b.DecimalPipe,[u.LOCALE_ID]),(l()(),u["\u0275eld"](1,0,null,null,157,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,4,"div",[["class","col-lg-6 col-md-6 col-sm-6 col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,3,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,2,"p",[["class","p16"]],null,null,null,null,null)),(l()(),u["\u0275ted"](6,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](8,0,null,null,86,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](9,0,null,null,12,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](10,0,null,null,11,"div",[["class","form-group"],["style","display: grid;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](11,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](12,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](14,0,null,null,7,"p-calendar",[["class","coll-report-calendar"],["name","min_date"],["showButtonBar","true"],["showIcon","true"],["yearRange","2000:2040"]],[[2,"ui-inputwrapper-filled",null],[2,"ui-inputwrapper-focus",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.min_date=e)&&u),u},S.b,S.a)),u["\u0275prd"](512,null,A.DomHandler,A.DomHandler,[]),u["\u0275did"](16,13877248,null,1,R.Calendar,[u.ElementRef,A.DomHandler,u.Renderer2,u.ChangeDetectorRef],{name:[0,"name"],showIcon:[1,"showIcon"],monthNavigator:[2,"monthNavigator"],yearNavigator:[3,"yearNavigator"],yearRange:[4,"yearRange"],showButtonBar:[5,"showButtonBar"],locale:[6,"locale"]},null),u["\u0275qud"](603979776,1,{templates:1}),u["\u0275prd"](1024,null,M.NG_VALUE_ACCESSOR,function(l){return[l]},[R.Calendar]),u["\u0275did"](19,671744,null,0,M.NgModel,[[8,null],[8,null],[8,null],[6,M.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,M.NgControl,null,[M.NgModel]),u["\u0275did"](21,16384,null,0,M.NgControlStatus,[[4,M.NgControl]],null,null),(l()(),u["\u0275eld"](22,0,null,null,12,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](23,0,null,null,11,"div",[["class","form-group"],["style","display: grid;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](24,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](25,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](27,0,null,null,7,"p-calendar",[["class","coll-report-calendar"],["name","max_date"],["showButtonBar","true"],["showIcon","true"],["yearRange","2000:2040"]],[[2,"ui-inputwrapper-filled",null],[2,"ui-inputwrapper-focus",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.max_date=e)&&u),u},S.b,S.a)),u["\u0275prd"](512,null,A.DomHandler,A.DomHandler,[]),u["\u0275did"](29,13877248,null,1,R.Calendar,[u.ElementRef,A.DomHandler,u.Renderer2,u.ChangeDetectorRef],{name:[0,"name"],showIcon:[1,"showIcon"],monthNavigator:[2,"monthNavigator"],yearNavigator:[3,"yearNavigator"],yearRange:[4,"yearRange"],showButtonBar:[5,"showButtonBar"],minDate:[6,"minDate"],locale:[7,"locale"]},null),u["\u0275qud"](603979776,2,{templates:1}),u["\u0275prd"](1024,null,M.NG_VALUE_ACCESSOR,function(l){return[l]},[R.Calendar]),u["\u0275did"](32,671744,null,0,M.NgModel,[[8,null],[8,null],[8,null],[6,M.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,M.NgControl,null,[M.NgModel]),u["\u0275did"](34,16384,null,0,M.NgControlStatus,[[4,M.NgControl]],null,null),(l()(),u["\u0275eld"](35,0,null,null,10,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](36,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](37,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](38,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](40,0,null,null,5,"ng-multiselect-dropdown",[["class","col-3 section-section2 multi-select"],["name","selectedProject"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"onDeSelect"],[null,"onSelect"],[null,"onSelectAll"],[null,"onDeSelectAll"],[null,"blur"]],function(l,n,e){var t=!0,a=l.component;return"blur"===n&&(t=!1!==u["\u0275nov"](l,41).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(a.selectedProject=e)&&t),"onDeSelect"===n&&(t=!1!==a.onProjectchange()&&t),"onSelect"===n&&(t=!1!==a.onProjectchange()&&t),"onSelectAll"===n&&(t=!1!==a.onProjectChangeAll(e)&&t),"onDeSelectAll"===n&&(t=!1!==a.onCityChangeAll(e)&&t),t},D.b,D.a)),u["\u0275did"](41,49152,null,0,j.a,[u.ChangeDetectorRef],{placeholder:[0,"placeholder"],settings:[1,"settings"],data:[2,"data"]},{onSelect:"onSelect",onDeSelect:"onDeSelect",onSelectAll:"onSelectAll",onDeSelectAll:"onDeSelectAll"}),u["\u0275prd"](1024,null,M.NG_VALUE_ACCESSOR,function(l){return[l]},[j.a]),u["\u0275did"](43,671744,null,0,M.NgModel,[[8,null],[8,null],[8,null],[6,M.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,M.NgControl,null,[M.NgModel]),u["\u0275did"](45,16384,null,0,M.NgControlStatus,[[4,M.NgControl]],null,null),(l()(),u["\u0275eld"](46,0,null,null,30,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](47,0,null,null,29,"div",[["class","form-group"],["style","display: grid;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](48,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](49,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](51,0,null,null,25,"select",[["name","availability_filter"],["style","height:37px;"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var t=!0,a=l.component;return"change"===n&&(t=!1!==u["\u0275nov"](l,52).onChange(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,52).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(a.selectedAvailability=e)&&t),t},null,null)),u["\u0275did"](52,16384,null,0,M.SelectControlValueAccessor,[u.Renderer2,u.ElementRef],null,null),u["\u0275prd"](1024,null,M.NG_VALUE_ACCESSOR,function(l){return[l]},[M.SelectControlValueAccessor]),u["\u0275did"](54,671744,null,0,M.NgModel,[[8,null],[8,null],[8,null],[6,M.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,M.NgControl,null,[M.NgModel]),u["\u0275did"](56,16384,null,0,M.NgControlStatus,[[4,M.NgControl]],null,null),(l()(),u["\u0275eld"](57,0,null,null,4,"option",[["value","0"]],null,null,null,null,null)),u["\u0275did"](58,147456,null,0,M.NgSelectOption,[u.ElementRef,u.Renderer2,[2,M.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](59,147456,null,0,M["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](60,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](62,0,null,null,4,"option",[["value","1"]],null,null,null,null,null)),u["\u0275did"](63,147456,null,0,M.NgSelectOption,[u.ElementRef,u.Renderer2,[2,M.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](64,147456,null,0,M["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](65,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](67,0,null,null,4,"option",[["value","2"]],null,null,null,null,null)),u["\u0275did"](68,147456,null,0,M.NgSelectOption,[u.ElementRef,u.Renderer2,[2,M.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](69,147456,null,0,M["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](70,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](72,0,null,null,4,"option",[["value","3"]],null,null,null,null,null)),u["\u0275did"](73,147456,null,0,M.NgSelectOption,[u.ElementRef,u.Renderer2,[2,M.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](74,147456,null,0,M["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](75,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](77,0,null,null,10,"div",[["class","col-lg-2 col-md-2 col-sm-5 col-5"]],null,null,null,null,null)),(l()(),u["\u0275eld"](78,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](79,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](80,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](82,0,null,null,5,"ng-multiselect-dropdown",[["class","col-3 section-section2 multi-select"],["name","selectedModels"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"onDeSelect"],[null,"onSelect"],[null,"onSelectAll"],[null,"onDeSelectAll"],[null,"blur"]],function(l,n,e){var t=!0,a=l.component;return"blur"===n&&(t=!1!==u["\u0275nov"](l,83).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(a.selectedModels=e)&&t),"onDeSelect"===n&&(t=!1!==a.onCityChange()&&t),"onSelect"===n&&(t=!1!==a.onModelschange()&&t),"onSelectAll"===n&&(t=!1!==a.onModelsChangeAll(e)&&t),"onDeSelectAll"===n&&(t=!1!==a.onCityChangeAll(e)&&t),t},D.b,D.a)),u["\u0275did"](83,49152,null,0,j.a,[u.ChangeDetectorRef],{placeholder:[0,"placeholder"],settings:[1,"settings"],data:[2,"data"]},{onSelect:"onSelect",onDeSelect:"onDeSelect",onSelectAll:"onSelectAll",onDeSelectAll:"onDeSelectAll"}),u["\u0275prd"](1024,null,M.NG_VALUE_ACCESSOR,function(l){return[l]},[j.a]),u["\u0275did"](85,671744,null,0,M.NgModel,[[8,null],[8,null],[8,null],[6,M.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,M.NgControl,null,[M.NgModel]),u["\u0275did"](87,16384,null,0,M.NgControlStatus,[[4,M.NgControl]],null,null),(l()(),u["\u0275eld"](88,0,null,null,6,"div",[["class","col-lg-2 col-md-2 col-sm-2 col-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](89,0,null,null,5,"div",[["class","form-group btn-cont"]],null,null,null,null,null)),(l()(),u["\u0275eld"](90,0,null,null,1,"label",[["style","display: block; margin-top: 3px;"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\xa0"])),(l()(),u["\u0275eld"](92,0,null,null,2,"button",[["class","btn btn-primary-new width100P P86"],["href","javascript://"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.getdata()&&u),u},null,null)),(l()(),u["\u0275ted"](93,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](95,0,null,null,63,"div",[["class","cust-tabs"]],null,null,null,null,null)),(l()(),u["\u0275eld"](96,0,null,null,62,"div",[["class","tab-content white-bg"]],null,null,null,null,null)),(l()(),u["\u0275eld"](97,0,null,null,61,"div",[["class","row"],["style","margin: 0;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](98,0,null,null,22,"div",[["class","col-lg-6 col-md-12 col-sm-12 col-12"],["style","margin-bottom: 10px;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](99,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](100,0,null,null,20,"div",[["class","col-md-10 pt-2 mt-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](101,0,null,null,9,"p",[],null,null,null,null,null)),(l()(),u["\u0275eld"](102,0,null,null,5,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275eld"](103,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),u["\u0275ted"](104,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](106,0,null,null,1,"i",[["aria-hidden","true"],["class","fa fa-info"],["style","color: #00b96f;margin-left: 10px;"]],[[8,"title",0]],null,null,null,null)),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](108,0,null,null,2,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275ted"](109,null,["$",""])),u["\u0275ppd"](110,2),(l()(),u["\u0275eld"](111,0,null,null,9,"p",[],null,null,null,null,null)),(l()(),u["\u0275eld"](112,0,null,null,5,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275eld"](113,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),u["\u0275ted"](114,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](116,0,null,null,1,"i",[["aria-hidden","true"],["class","fa fa-info"],["style","color: #00b96f;margin-left: 10px;"]],[[8,"title",0]],null,null,null,null)),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](118,0,null,null,2,"span",[["class","w-50 d-inline-block"]],null,null,null,null,null)),(l()(),u["\u0275ted"](119,null,["$",""])),u["\u0275ppd"](120,2),(l()(),u["\u0275eld"](121,0,null,null,0,"div",[["class","col-lg-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](122,0,null,null,22,"div",[["class","col-lg-2 col-md-3 col-sm-2 col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](123,0,null,null,21,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](124,0,null,null,2,"label",[],null,null,null,null,null)),(l()(),u["\u0275ted"](125,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](127,0,null,null,0,"div",[["class","clearfix"]],null,null,null,null,null)),(l()(),u["\u0275eld"](128,0,null,null,15,"select",[["id","graph"],["name","graph"],["style","min-width: 115px;"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,e){var t=!0,a=l.component;return"change"===n&&(t=!1!==u["\u0275nov"](l,129).onChange(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,129).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(a.selectedGraph=e)&&t),"change"===n&&(t=!1!==a.onSelectGraph()&&t),t},null,null)),u["\u0275did"](129,16384,null,0,M.SelectControlValueAccessor,[u.Renderer2,u.ElementRef],null,null),u["\u0275prd"](1024,null,M.NG_VALUE_ACCESSOR,function(l){return[l]},[M.SelectControlValueAccessor]),u["\u0275did"](131,671744,null,0,M.NgModel,[[8,null],[8,null],[8,null],[6,M.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,M.NgControl,null,[M.NgModel]),u["\u0275did"](133,16384,null,0,M.NgControlStatus,[[4,M.NgControl]],null,null),(l()(),u["\u0275eld"](134,0,null,null,4,"option",[["selected","selectedGraph == '1'"]],null,null,null,null,null)),u["\u0275did"](135,147456,null,0,M.NgSelectOption,[u.ElementRef,u.Renderer2,[2,M.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](136,147456,null,0,M["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](137,null,[""," "])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](139,0,null,null,4,"option",[["selected","selectedGraph == '2'"]],null,null,null,null,null)),u["\u0275did"](140,147456,null,0,M.NgSelectOption,[u.ElementRef,u.Renderer2,[2,M.SelectControlValueAccessor]],{value:[0,"value"]},null),u["\u0275did"](141,147456,null,0,M["\u0275angular_packages_forms_forms_r"],[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](142,null,[""," "])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](144,0,null,null,0,"div",[["class","clearfix"]],null,null,null,null,null)),(l()(),u["\u0275eld"](145,0,null,null,0,"div",[["class","col-lg-10 col-md-9 col-sm-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](146,0,null,null,12,"div",[["class","col-md-12 col-sm-12 col-12"],["style","margin-top: 20px"]],null,null,null,null,null)),(l()(),u["\u0275eld"](147,0,null,null,11,"div",[["class","dashboard-bx"]],null,null,null,null,null)),(l()(),u["\u0275eld"](148,0,null,null,4,"h4",[],null,null,null,null,null)),(l()(),u["\u0275eld"](149,0,null,null,3,"strong",[],null,null,null,null,null)),(l()(),u["\u0275ted"](150,null,["",""])),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),u["\u0275pid"](131072,_.i,[_.j,u.ChangeDetectorRef]),(l()(),u["\u0275eld"](153,0,null,null,3,"div",[],null,null,null,null,null)),u["\u0275did"](154,278528,null,0,b.NgStyle,[u.KeyValueDiffers,u.ElementRef,u.Renderer2],{ngStyle:[0,"ngStyle"]},null),u["\u0275pod"](155,{display:0}),(l()(),u["\u0275eld"](156,0,null,null,0,"div",[["id","lineChartContainer"],["style","height: 415px; width: 90%; margin-left:auto;margin-right:auto;"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,E)),u["\u0275did"](158,16384,null,0,b.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component;l(n,16,0,"min_date","true",!0,!0,"2000:2040","true",e.locale),l(n,19,0,"min_date",e.min_date),l(n,29,0,"max_date","true",!0,!0,"2000:2040","true",e.min_date,e.locale),l(n,32,0,"max_date",e.max_date),l(n,41,0,"",e.multiDropdownSettings,e.projects),l(n,43,0,"selectedProject",e.selectedProject),l(n,54,0,"availability_filter",e.selectedAvailability),l(n,58,0,"0"),l(n,59,0,"0"),l(n,63,0,"1"),l(n,64,0,"1"),l(n,68,0,"2"),l(n,69,0,"2"),l(n,73,0,"3"),l(n,74,0,"3"),l(n,83,0,"",e.multiDropdownSettings,e.models),l(n,85,0,"selectedModels",e.selectedModels),l(n,131,0,"graph",e.selectedGraph),l(n,135,0,1),l(n,136,0,1),l(n,140,0,2),l(n,141,0,2);var u=l(n,155,0,e.graph_data&&e.graph_data.length>0?"block":"none");l(n,154,0,u),l(n,158,0,!e.graph_data||0==e.graph_data.length)},function(l,n){var e=n.component;l(n,6,0,u["\u0275unv"](n,6,0,u["\u0275nov"](n,7).transform("viewProjectAnalysis.label"))),l(n,12,0,u["\u0275unv"](n,12,0,u["\u0275nov"](n,13).transform("filters.time.custom.from"))),l(n,14,0,u["\u0275nov"](n,16).filled,u["\u0275nov"](n,16).focus,u["\u0275nov"](n,21).ngClassUntouched,u["\u0275nov"](n,21).ngClassTouched,u["\u0275nov"](n,21).ngClassPristine,u["\u0275nov"](n,21).ngClassDirty,u["\u0275nov"](n,21).ngClassValid,u["\u0275nov"](n,21).ngClassInvalid,u["\u0275nov"](n,21).ngClassPending),l(n,25,0,u["\u0275unv"](n,25,0,u["\u0275nov"](n,26).transform("filters.time.custom.to"))),l(n,27,0,u["\u0275nov"](n,29).filled,u["\u0275nov"](n,29).focus,u["\u0275nov"](n,34).ngClassUntouched,u["\u0275nov"](n,34).ngClassTouched,u["\u0275nov"](n,34).ngClassPristine,u["\u0275nov"](n,34).ngClassDirty,u["\u0275nov"](n,34).ngClassValid,u["\u0275nov"](n,34).ngClassInvalid,u["\u0275nov"](n,34).ngClassPending),l(n,38,0,u["\u0275unv"](n,38,0,u["\u0275nov"](n,39).transform("viewProjectAnalysis.project"))),l(n,40,0,u["\u0275nov"](n,45).ngClassUntouched,u["\u0275nov"](n,45).ngClassTouched,u["\u0275nov"](n,45).ngClassPristine,u["\u0275nov"](n,45).ngClassDirty,u["\u0275nov"](n,45).ngClassValid,u["\u0275nov"](n,45).ngClassInvalid,u["\u0275nov"](n,45).ngClassPending),l(n,49,0,u["\u0275unv"](n,49,0,u["\u0275nov"](n,50).transform("viewProjectAnalysis.availability"))),l(n,51,0,u["\u0275nov"](n,56).ngClassUntouched,u["\u0275nov"](n,56).ngClassTouched,u["\u0275nov"](n,56).ngClassPristine,u["\u0275nov"](n,56).ngClassDirty,u["\u0275nov"](n,56).ngClassValid,u["\u0275nov"](n,56).ngClassInvalid,u["\u0275nov"](n,56).ngClassPending),l(n,60,0,u["\u0275unv"](n,60,0,u["\u0275nov"](n,61).transform("table.th.all"))),l(n,65,0,u["\u0275unv"](n,65,0,u["\u0275nov"](n,66).transform("table.th.buy"))),l(n,70,0,u["\u0275unv"](n,70,0,u["\u0275nov"](n,71).transform("table.th.rent"))),l(n,75,0,u["\u0275unv"](n,75,0,u["\u0275nov"](n,76).transform("table.th.inventory"))),l(n,80,0,u["\u0275unv"](n,80,0,u["\u0275nov"](n,81).transform("viewProjectAnalysis.models"))),l(n,82,0,u["\u0275nov"](n,87).ngClassUntouched,u["\u0275nov"](n,87).ngClassTouched,u["\u0275nov"](n,87).ngClassPristine,u["\u0275nov"](n,87).ngClassDirty,u["\u0275nov"](n,87).ngClassValid,u["\u0275nov"](n,87).ngClassInvalid,u["\u0275nov"](n,87).ngClassPending),l(n,92,0,!e.min_date||!e.max_date),l(n,93,0,u["\u0275unv"](n,93,0,u["\u0275nov"](n,94).transform("filters.time.custom.applyBtn"))),l(n,104,0,u["\u0275unv"](n,104,0,u["\u0275nov"](n,105).transform("viewProjectAnalysis.averagePrice"))),l(n,106,0,u["\u0275inlineInterpolate"](1,"",u["\u0275unv"](n,106,0,u["\u0275nov"](n,107).transform("viewProjectAnalysis.averagePriceH")),""));var t=null!=e.sold_property_details&&e.sold_property_details.average_price?u["\u0275unv"](n,109,0,l(n,110,0,u["\u0275nov"](n,0),null==e.sold_property_details?null:e.sold_property_details.average_price,"1.2-2")):0;l(n,109,0,t),l(n,114,0,u["\u0275unv"](n,114,0,u["\u0275nov"](n,115).transform("viewProjectAnalysis.averagepriceperM2"))),l(n,116,0,u["\u0275inlineInterpolate"](1,"",u["\u0275unv"](n,116,0,u["\u0275nov"](n,117).transform("viewProjectAnalysis.averagePricePerM")),""));var a=null!=e.sold_property_details&&e.sold_property_details.average_carpate_area?u["\u0275unv"](n,119,0,l(n,120,0,u["\u0275nov"](n,0),null==e.sold_property_details?null:e.sold_property_details.average_carpate_area,"1.2-2")):0;l(n,119,0,a),l(n,125,0,u["\u0275unv"](n,125,0,u["\u0275nov"](n,126).transform("viewProjectAnalysis.selectGraph"))),l(n,128,0,u["\u0275nov"](n,133).ngClassUntouched,u["\u0275nov"](n,133).ngClassTouched,u["\u0275nov"](n,133).ngClassPristine,u["\u0275nov"](n,133).ngClassDirty,u["\u0275nov"](n,133).ngClassValid,u["\u0275nov"](n,133).ngClassInvalid,u["\u0275nov"](n,133).ngClassPending),l(n,137,0,u["\u0275unv"](n,137,0,u["\u0275nov"](n,138).transform("viewProjectAnalysis.averagePrice"))),l(n,142,0,u["\u0275unv"](n,142,0,u["\u0275nov"](n,143).transform("viewProjectAnalysis.averagepriceperM2"))),l(n,150,0,u["\u0275unv"](n,150,0,1==e.selectedGraph?u["\u0275nov"](n,151).transform("viewProjectAnalysis.averagePrice"):u["\u0275nov"](n,152).transform("viewProjectAnalysis.averagepriceperM2")))})}function B(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"app-project-analysis",[],null,null,null,k,w)),u["\u0275prd"](4608,null,P.a,P.a,[]),u["\u0275did"](2,114688,null,0,r,[a.a,N.c,_.j],null,null)],function(l,n){l(n,2,0)},null)}var L=u["\u0275ccf"]("app-project-analysis",r,B,{},{},[]),V=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function x(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" location-analysis works!\n"]))],null,null)}function I(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-location-analysis",[],null,null,null,x,V)),u["\u0275did"](1,114688,null,0,t,[],null,null)],function(l,n){l(n,1,0)},null)}var O=u["\u0275ccf"]("app-location-analysis",t,I,{},{},[]),U=e("eDkP"),F=e("Fzqc"),G=e("4tE/"),T=e("M2Lx"),H=e("Wf4p"),Z=e("o3x0"),W=e("jQLj"),q=e("mVsa"),K=e("dWZg"),z=e("uGex"),Y=e("v9Dh"),J=e("4epT"),Q=e("ZYjt"),X=e("OkvK"),$=e("wmQ5"),ll=e("lLAP"),nl=e("OBdK"),el=e("xkgV"),ul=e("APq1"),tl=e("Se1k"),al=e("k/Rj"),ol=e("ZYCi"),dl=e("VSng"),rl=e("7LN8"),il=e("4c35"),sl=e("qAlS"),cl=e("6Wmm"),pl=e("BgWK"),gl=e("UodH"),ml=e("u7R8"),vl=e("FVSy"),hl=e("de3e"),fl=e("/dO6"),Cl=e("YhbO"),yl=e("jlZm"),_l=e("r43C"),bl=e("SMsm"),Sl=e("/VYK"),Al=e("seP3"),Rl=e("b716"),Ml=e("LC5p"),Dl=e("0/Q6"),jl=e("Z+uX"),Pl=e("Blfk"),Nl=e("9It4"),wl=e("Nsh5"),El=e("w+lc"),kl=e("kWGw"),Bl=e("vARd"),Ll=e("Lwpp"),Vl=e("y4qS"),xl=e("BHnd"),Il=e("La40"),Ol=e("J12g"),Ul=e("8mMr"),Fl=e("vvyD"),Gl=e("JbCa"),Tl=e("6fHJ"),Hl=e("jvDc"),Zl=e("/qvy"),Wl=e("b3E/"),ql=e("w6+6"),Kl=e("IZET"),zl=e("1jDe"),Yl=e("T8sE"),Jl=e("skic"),Ql=e("KeWI"),Xl=e("UsZU"),$l=e("50k4"),ln=e("o56U"),nn=e("U3vz"),en=e("r6ye"),un=e("KktT"),tn=e("eby4"),an=e("YSh2");e.d(n,"MarketAnalysisModuleNgFactory",function(){return on});var on=u["\u0275cmf"](p,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[g.a,m.a,v.a,h.b,h.a,f.a,C.a,C.b,y.a,L,O]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,b.NgLocalization,b.NgLocaleLocalization,[u.LOCALE_ID,[2,b["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,M["\u0275angular_packages_forms_forms_i"],M["\u0275angular_packages_forms_forms_i"],[]),u["\u0275mpd"](4608,U.c,U.c,[U.i,U.e,u.ComponentFactoryResolver,U.h,U.f,u.Injector,u.NgZone,b.DOCUMENT,F.b]),u["\u0275mpd"](5120,U.j,U.k,[U.c]),u["\u0275mpd"](5120,G.a,G.b,[U.c]),u["\u0275mpd"](4608,T.c,T.c,[]),u["\u0275mpd"](4608,H.d,H.d,[]),u["\u0275mpd"](4608,b.LocationStrategy,b.PathLocationStrategy,[b.PlatformLocation,[2,b.APP_BASE_HREF]]),u["\u0275mpd"](4608,b.Location,b.Location,[b.LocationStrategy]),u["\u0275mpd"](5120,Z.b,Z.c,[U.c]),u["\u0275mpd"](4608,Z.d,Z.d,[U.c,u.Injector,[2,b.Location],[2,Z.a],Z.b,[3,Z.d],U.e]),u["\u0275mpd"](4608,W.h,W.h,[]),u["\u0275mpd"](5120,W.a,W.b,[U.c]),u["\u0275mpd"](5120,q.a,q.c,[U.c]),u["\u0275mpd"](4608,H.c,H.z,[[2,H.h],K.a]),u["\u0275mpd"](5120,z.a,z.b,[U.c]),u["\u0275mpd"](5120,Y.a,Y.b,[U.c]),u["\u0275mpd"](5120,J.b,J.a,[[3,J.b]]),u["\u0275mpd"](4608,Q.f,H.e,[[2,H.i],[2,H.n]]),u["\u0275mpd"](5120,X.b,X.a,[[3,X.b]]),u["\u0275mpd"](4608,$.a,$.a,[]),u["\u0275mpd"](135680,ll.g,ll.g,[u.NgZone,K.a]),u["\u0275mpd"](4608,nl.e,nl.e,[u.TemplateRef]),u["\u0275mpd"](4608,M.FormBuilder,M.FormBuilder,[]),u["\u0275mpd"](4608,el.e,el.e,[]),u["\u0275mpd"](4608,ul.c,ul.c,[u.NgZone]),u["\u0275mpd"](4608,tl.a,tl.a,[u.ApplicationRef,u.ComponentFactoryResolver,u.Injector]),u["\u0275mpd"](4608,al.a,al.a,[tl.a]),u["\u0275mpd"](1073742336,b.CommonModule,b.CommonModule,[]),u["\u0275mpd"](1073742336,ol.s,ol.s,[[2,ol.y],[2,ol.o]]),u["\u0275mpd"](1073742336,M["\u0275angular_packages_forms_forms_bb"],M["\u0275angular_packages_forms_forms_bb"],[]),u["\u0275mpd"](1073742336,M.FormsModule,M.FormsModule,[]),u["\u0275mpd"](1073742336,dl.ButtonModule,dl.ButtonModule,[]),u["\u0275mpd"](1073742336,rl.SharedModule,rl.SharedModule,[]),u["\u0275mpd"](1073742336,R.CalendarModule,R.CalendarModule,[]),u["\u0275mpd"](1073742336,F.a,F.a,[]),u["\u0275mpd"](1073742336,H.n,H.n,[[2,H.f]]),u["\u0275mpd"](1073742336,K.b,K.b,[]),u["\u0275mpd"](1073742336,H.y,H.y,[]),u["\u0275mpd"](1073742336,H.w,H.w,[]),u["\u0275mpd"](1073742336,H.t,H.t,[]),u["\u0275mpd"](1073742336,il.g,il.g,[]),u["\u0275mpd"](1073742336,sl.a,sl.a,[]),u["\u0275mpd"](1073742336,U.g,U.g,[]),u["\u0275mpd"](1073742336,G.c,G.c,[]),u["\u0275mpd"](1073742336,T.d,T.d,[]),u["\u0275mpd"](1073742336,ll.a,ll.a,[]),u["\u0275mpd"](1073742336,cl.a,cl.a,[]),u["\u0275mpd"](1073742336,pl.c,pl.c,[]),u["\u0275mpd"](1073742336,gl.c,gl.c,[]),u["\u0275mpd"](1073742336,ml.a,ml.a,[]),u["\u0275mpd"](1073742336,vl.a,vl.a,[]),u["\u0275mpd"](1073742336,hl.a,hl.a,[]),u["\u0275mpd"](1073742336,fl.b,fl.b,[]),u["\u0275mpd"](1073742336,Z.g,Z.g,[]),u["\u0275mpd"](1073742336,W.i,W.i,[]),u["\u0275mpd"](1073742336,Cl.c,Cl.c,[]),u["\u0275mpd"](1073742336,yl.a,yl.a,[]),u["\u0275mpd"](1073742336,H.o,H.o,[]),u["\u0275mpd"](1073742336,_l.a,_l.a,[]),u["\u0275mpd"](1073742336,bl.b,bl.b,[]),u["\u0275mpd"](1073742336,Sl.b,Sl.b,[]),u["\u0275mpd"](1073742336,Al.d,Al.d,[]),u["\u0275mpd"](1073742336,Rl.a,Rl.a,[]),u["\u0275mpd"](1073742336,Ml.a,Ml.a,[]),u["\u0275mpd"](1073742336,Dl.a,Dl.a,[]),u["\u0275mpd"](1073742336,q.b,q.b,[]),u["\u0275mpd"](1073742336,H.A,H.A,[]),u["\u0275mpd"](1073742336,H.q,H.q,[]),u["\u0275mpd"](1073742336,z.d,z.d,[]),u["\u0275mpd"](1073742336,Y.c,Y.c,[]),u["\u0275mpd"](1073742336,J.c,J.c,[]),u["\u0275mpd"](1073742336,jl.a,jl.a,[]),u["\u0275mpd"](1073742336,Pl.a,Pl.a,[]),u["\u0275mpd"](1073742336,Nl.a,Nl.a,[]),u["\u0275mpd"](1073742336,wl.a,wl.a,[]),u["\u0275mpd"](1073742336,El.a,El.a,[]),u["\u0275mpd"](1073742336,kl.a,kl.a,[]),u["\u0275mpd"](1073742336,Bl.d,Bl.d,[]),u["\u0275mpd"](1073742336,X.c,X.c,[]),u["\u0275mpd"](1073742336,Ll.d,Ll.d,[]),u["\u0275mpd"](1073742336,$.b,$.b,[]),u["\u0275mpd"](1073742336,Vl.o,Vl.o,[]),u["\u0275mpd"](1073742336,xl.a,xl.a,[]),u["\u0275mpd"](1073742336,Il.a,Il.a,[]),u["\u0275mpd"](1073742336,nl.c,nl.c,[]),u["\u0275mpd"](1073742336,Ol.c,Ol.c,[]),u["\u0275mpd"](1073742336,Ul.a,Ul.a,[]),u["\u0275mpd"](1073742336,Fl.a,Fl.a,[]),u["\u0275mpd"](1073742336,M.ReactiveFormsModule,M.ReactiveFormsModule,[]),u["\u0275mpd"](1073742336,ul.b,ul.b,[]),u["\u0275mpd"](1073742336,el.a,el.a,[]),u["\u0275mpd"](1073742336,Gl.b,Gl.b,[]),u["\u0275mpd"](1073742336,Tl.a,Tl.a,[]),u["\u0275mpd"](1073742336,_.g,_.g,[]),u["\u0275mpd"](1073742336,j.b,j.b,[]),u["\u0275mpd"](1073742336,Hl.a,Hl.a,[]),u["\u0275mpd"](1073742336,Zl.a,Zl.a,[]),u["\u0275mpd"](1073742336,Wl.a,Wl.a,[]),u["\u0275mpd"](1073742336,ql.a,ql.a,[]),u["\u0275mpd"](1073742336,Kl.a,Kl.a,[]),u["\u0275mpd"](1073742336,zl.a,zl.a,[]),u["\u0275mpd"](1073742336,Yl.a,Yl.a,[]),u["\u0275mpd"](1073742336,Jl.a,Jl.a,[]),u["\u0275mpd"](1073742336,Ql.a,Ql.a,[]),u["\u0275mpd"](1073742336,Xl.a,Xl.a,[]),u["\u0275mpd"](1073742336,$l.a,$l.a,[]),u["\u0275mpd"](1073742336,ln.a,ln.a,[]),u["\u0275mpd"](1073742336,nn.a,nn.a,[]),u["\u0275mpd"](1073742336,en.a,en.a,[]),u["\u0275mpd"](1073742336,un.a,un.a,[]),u["\u0275mpd"](1073742336,tn.a,tn.a,[]),u["\u0275mpd"](1073742336,N.b,N.b,[]),u["\u0275mpd"](1073742336,p,p,[]),u["\u0275mpd"](256,fl.a,{separatorKeyCodes:[an.f]},[]),u["\u0275mpd"](256,H.g,H.k,[]),u["\u0275mpd"](1024,ol.m,function(){return[[{path:"project-analysis",component:r,canActivate:[i.a],data:s},{path:"location-analysis",component:t,canActivate:[i.a],data:c}]]},[])])})}}]);