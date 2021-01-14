(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["collections-collections-module"],{

/***/ "./src/app/layout/collections/account-statement/account-statement.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/collections/account-statement/account-statement.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  th, td {\n    padding: 5px;\n    text-align: center;\n  }\n  h5{\n    margin-top: 15px;\n  }\n  textarea {\n    background: #fff !important;\n  }\n  .red-color{\n    color: red;\n  }\n  table.table-striped.quick-table{\n    table-layout: fixed;\n  }\n  table.table-striped.quick-table th, table.table-striped.quick-table td {\n  width: 70px;\n  word-break: break-word;\n}\n  .remaining_amt{\n  background: #faebd7b0 !important;\n  font-weight: 600;\n}\n  /* freeze first col and row */\n  .main-table{\n  height: 700px;\n}\n  table.table-striped.quick-table th, table.table-striped.quick-table td {\n  width: 190px;\n}\n  table.table-striped.quick-table {\n  table-layout: fixed;\n  width:100%;\n}\n  table.table-striped.quick-table td:nth-child(1), table.table-striped.quick-table th:nth-child(1),\ntable.table-striped.quick-table thead tr th \n{\n  position:-webkit-sticky;\n  position:sticky;\n  left:0;\n  top: 0;\n  z-index:1;\n  background-color: #00B96F;\n  color: #fff;\n}\n  table.table-striped.quick-table th:first-child {\n  z-index:2;\n}\n  /* freeze first col and row */\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbGxlY3Rpb25zL2FjY291bnQtc3RhdGVtZW50L2FjY291bnQtc3RhdGVtZW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtFQUNFO0lBQ0UsYUFBYTtJQUNiLG1CQUFtQjtHQUNwQjtFQUNEO0lBQ0UsaUJBQWlCO0dBQ2xCO0VBRUQ7SUFDRSw0QkFBNEI7R0FDN0I7RUFDRDtJQUNFLFdBQVc7R0FDWjtFQUNEO0lBQ0Usb0JBQW9CO0dBQ3JCO0VBRUg7RUFDRSxZQUFZO0VBQ1osdUJBQXVCO0NBQ3hCO0VBQ0Q7RUFDRSxpQ0FBaUM7RUFDakMsaUJBQWlCO0NBQ2xCO0VBRUQsOEJBQThCO0VBQzlCO0VBQ0UsY0FBYztDQUNmO0VBQ0Q7RUFDRSxhQUFhO0NBQ2Q7RUFDRDtFQUNFLG9CQUFvQjtFQUNwQixXQUFXO0NBQ1o7RUFDRDs7O0VBR0Usd0JBQWdCO0VBQWhCLGdCQUFnQjtFQUNoQixPQUFPO0VBQ1AsT0FBTztFQUNQLFVBQVU7RUFDViwwQkFBMEI7RUFDMUIsWUFBWTtDQUNiO0VBQ0Q7RUFDRSxVQUFVO0NBQ1g7RUFDRCw4QkFBOEIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvY29sbGVjdGlvbnMvYWNjb3VudC1zdGF0ZW1lbnQvYWNjb3VudC1zdGF0ZW1lbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICB0aCwgdGQge1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgaDV7XG4gICAgbWFyZ2luLXRvcDogMTVweDtcbiAgfVxuXG4gIHRleHRhcmVhIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmICFpbXBvcnRhbnQ7XG4gIH1cbiAgLnJlZC1jb2xvcntcbiAgICBjb2xvcjogcmVkO1xuICB9XG4gIHRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGV7XG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgfVxuICBcbnRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGgsIHRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGQge1xuICB3aWR0aDogNzBweDtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbn1cbi5yZW1haW5pbmdfYW10e1xuICBiYWNrZ3JvdW5kOiAjZmFlYmQ3YjAgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLyogZnJlZXplIGZpcnN0IGNvbCBhbmQgcm93ICovXG4ubWFpbi10YWJsZXtcbiAgaGVpZ2h0OiA3MDBweDtcbn1cbnRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGgsIHRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGQge1xuICB3aWR0aDogMTkwcHg7XG59XG50YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHtcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgd2lkdGg6MTAwJTtcbn1cbnRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGQ6bnRoLWNoaWxkKDEpLCB0YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHRoOm50aC1jaGlsZCgxKSxcbnRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGhlYWQgdHIgdGggXG57XG4gIHBvc2l0aW9uOnN0aWNreTtcbiAgbGVmdDowO1xuICB0b3A6IDA7XG4gIHotaW5kZXg6MTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwQjk2RjtcbiAgY29sb3I6ICNmZmY7XG59XG50YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHRoOmZpcnN0LWNoaWxkIHtcbiAgei1pbmRleDoyO1xufVxuLyogZnJlZXplIGZpcnN0IGNvbCBhbmQgcm93ICovIl19 */"

/***/ }),

/***/ "./src/app/layout/collections/account-statement/account-statement.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/layout/collections/account-statement/account-statement.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-lg-8 col-md-8 col-6\">\n          <div class=\"title-group\">\n            <h5><a routerLink=\"/dashboard/collections/view-collections\" href=\"javascript://\"><i\n                  class=\"fa fa-angle-double-left\"></i> </a> &nbsp;&nbsp;{{'quickVisualization.accountStatement' | translate}}</h5>\n          </div>\n        </div>\n         \n        <!-- <div class=\"col-lg-2 col-md-2 col-6\">\n          <div class=\"btn-cont text-right\">\n              <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#addInhouseUser\" #inhouseUserModalOpen>{{'table.addNewBtn' | translate}}</a>\n              <a class=\"btn btn-primary-new width100P\" href=\"javascript://\" (click)=\"exportData()\">{{'table.exportDataBtn' | translate}}</a>\n            </div>\n        </div>\n    \n        <div class=\"col-lg-2 col-md-2 col-6\">\n          <div class=\"btn-cont text-right\">\n              <a class=\"btn btn-primary-new width100P\" href=\"javascript://\" (click)=\"getCollectionDetails()\">Refresh</a>\n            </div>\n        </div> -->\n      </div>\n    \n      <hr>\n    \n      <h5>{{'quickVisualization.stackholdersInformation' | translate}}</h5>\n      <div class=\"row cust-tabs\">\n          <div class=\"col-md-4\">\n      \n              <div class=\"table-responsive\">\n                <table class=\"table table-bordered white-bg\">\n                  <tbody>\n                    <tr>\n                      <th rowspan=\"3\">{{'quickVisualization.buyer' | translate}}:</th>\n                      <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.comm_name || ('table.tr.td.NA' | translate)}}</td>\n                      <td *ngIf=\"model?.buyer_type!=2\">{{model?.buyer?.name || ('table.tr.td.NA' | translate)}}</td>\n                    </tr>\n                    <tr>\n                      <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.email || ('table.tr.td.NA' | translate)}}</td>\n                      <td *ngIf=\"model?.buyer_type!=2\">{{model?.buyer?.email || ('table.tr.td.NA' | translate)}}</td>\n                    </tr>\n                    <tr>\n                      <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.phone ? model?.buyer_legal_entity?.dial_code + ' ' + model?.buyer_legal_entity?.phone : ('table.tr.td.NA' | translate)}}</td>\n                      <td *ngIf=\"model?.buyer_type!=2\">{{model?.buyer?.phone ? model?.buyer?.dial_code + ' ' + model?.buyer?.phone : ('table.tr.td.NA' | translate)}}</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n                <div class=\"table-responsive\">\n                  <table class=\"table table-bordered white-bg\">\n                    <tbody>\n                      <tr>\n                        <th rowspan=\"3\">{{'quickVisualization.seller' | translate}}:</th>\n                        <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.comm_name || ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.seller_type!=2\">{{model?.seller?.name || ('table.tr.td.NA' | translate)}}</td>\n                      </tr>\n                      <tr>\n                        <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.email || ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.seller_type!=2\">{{model?.seller?.email || ('table.tr.td.NA' | translate)}}</td>\n                      </tr>\n                      <tr>\n                        <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.phone ? model?.seller_legal_entity?.dial_code + ' ' + model?.seller_legal_entity?.phone : ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.seller_type!=2\">{{model?.seller?.phone ? model?.seller?.dial_code + ' ' + model?.seller?.phone : ('table.tr.td.NA' | translate)}}</td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n                <div class=\"table-responsive\">\n                  <table class=\"table table-bordered white-bg\">\n                    <tbody>\n                      <tr>\n                        <th rowspan=\"3\">\n                          {{model?.deal_commission_agents?.length>0 && model?.deal_commission_agents[0]?.broker?.is_external_agent==1 ? ('quickVisualization.outsideAgent' | translate) : ('quickVisualization.inhouseAgent' | translate)}}:\n                        </th>\n                        <td>{{model?.deal_commission_agents?.length>0 ? model?.deal_commission_agents[0]?.name : ('table.tr.td.NA' | translate)}}</td>\n                      </tr>\n                      <tr>\n                        <td>{{model?.deal_commission_agents?.length>0 ? model?.deal_commission_agents[0]?.broker?.email : ('table.tr.td.NA' | translate)}}</td>\n                      </tr>\n                      <tr>\n                        <td>{{model?.deal_commission_agents?.length>0 ? model?.deal_commission_agents[0]?.broker?.dial_code + ' ' +model?.deal_commission_agents[0]?.broker?.phone : ('table.tr.td.NA' | translate)}}</td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n          </div>\n      \n          <div class=\"col-md-1\"></div>\n      \n          <div class=\"col-md-4\">\n      \n                <div class=\"table-responsive\">\n                  <table class=\"table table-bordered white-bg\">\n                    <tbody>\n                      <tr>\n                        <th rowspan=\"3\">{{'quickVisualization.buyerLegal' | translate}} <br> {{'quickVisualization.representativeContact' | translate}}:</th>\n                          <td *ngIf=\"model?.buyer_type==1\">{{model?.buyer_leg_rep_name || ('table.tr.td.NA' | translate)}}</td>\n                          <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.legal_reps?.name || ('table.tr.td.NA' | translate)}}</td>\n                          <td *ngIf=\"model?.buyer_type==3\">{{model?.buyer?.legal_representative?.name || ('table.tr.td.NA' | translate)}}</td>\n                       </tr>\n                      <tr>\n                        <td *ngIf=\"model?.buyer_type==1\">{{model?.buyer_leg_rep_email || ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.legal_reps?.email || ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.buyer_type==3\">{{model?.buyer?.legal_representative?.email || ('table.tr.td.NA' | translate)}}</td>\n                       </tr>\n                      <tr>\n                        <td *ngIf=\"model?.buyer_type==1\">{{model?.buyer_leg_rep_phone ? model?.buyer?.dial_code + ' '+ model?.buyer_leg_rep_phone : ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.legal_reps?.phone ? model?.buyer_legal_entity?.legal_reps?.dial_code + ' '+ model?.buyer_legal_entity?.legal_reps?.phone : ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.buyer_type==3\">{{model?.buyer?.legal_representative?.phone ? model?.buyer?.dial_code + ' ' + model?.buyer?.legal_representative?.phone : ('table.tr.td.NA' | translate)}}</td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n                  <div class=\"table-responsive\">\n                    <table class=\"table table-bordered white-bg\">\n                      <tbody>\n                        <tr>\n                          <th rowspan=\"3\">{{'quickVisualization.sellerLegal' | translate}} <br> {{'quickVisualization.representativeContact' | translate}}:</th>\n                          <td *ngIf=\"model?.seller_type==1\">{{model?.seller_leg_rep_name || ('table.tr.td.NA' | translate)}}</td>\n                          <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.legal_reps?.name || ('table.tr.td.NA' | translate)}}</td>\n                          <td *ngIf=\"model?.seller_type==3\">{{model?.seller?.legal_representative?.name || ('table.tr.td.NA' | translate)}}</td>\n                       </tr>\n                      <tr>\n                        <td *ngIf=\"model?.seller_type==1\">{{model?.seller_leg_rep_email || ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.legal_reps?.email || ('table.tr.td.NA' | translate)}}</td>\n                        <td *ngIf=\"model?.seller_type==3\">{{model?.seller?.legal_representative?.email || ('table.tr.td.NA' | translate)}}</td>\n                       </tr>\n                       <tr>\n                         <td *ngIf=\"model?.seller_type==1\">{{model?.seller_leg_rep_phone ? model?.seller?.dial_code + ' '+ model?.seller_leg_rep_phone : ('table.tr.td.NA' | translate)}}</td>\n                         <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.legal_reps?.phone ? model?.seller_legal_entity?.legal_reps?.dial_code + ' '+ model?.seller_legal_entity?.legal_reps?.phone : ('table.tr.td.NA' | translate)}}</td>\n                         <td *ngIf=\"model?.seller_type==3\">{{model?.seller?.legal_representative?.phone ? model?.seller?.dial_code + ' ' + model?.seller?.legal_representative?.phone : ('table.tr.td.NA' | translate)}}</td>\n                       </tr>\n                      </tbody>\n                    </table>\n                  </div>\n            </div>\n        </div>  \n    \n    \n        <h5>{{'quickVisualization.generalPropertyInformation' | translate}}</h5>\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n        \n                  <div class=\"table-responsive\">\n                    <table class=\"table table-bordered white-bg\">\n                      <tbody>\n                          <tr>\n                              <th>{{'quickVisualization.project' | translate}}:</th>\n                              <td>{{model?.property?.building?.name || ('table.tr.td.NA' | translate)}}</td>\n                            </tr>\n                            <tr>\n                              <th>{{'quickVisualization.tower' | translate}}:</th>\n                              <td>{{model?.property?.building_towers?.tower_name || ('table.tr.td.NA' | translate)}}</td>\n                            </tr>\n                            <tr>\n                              <th>{{'quickVisualization.floor' | translate}}:</th>\n                              <td>\n                                  {{model?.property?.floor_num ? (model?.property?.floor_num == 0 ? ('addCollection.groundFloor' | translate) : ('addCollection.floor' | translate) + ' ' + model?.property?.floor_num) : ('table.tr.td.NA' | translate)}}\n                              </td>\n                            </tr>\n                            <tr>\n                              <th>{{'quickVisualization.model' | translate}}:</th>\n                              <td>{{model?.property?.building_configuration?.name || ('table.tr.td.NA' | translate)}}</td>\n                            </tr>\n                            <tr>\n                              <th>{{'quickVisualization.propertyName' | translate}}:</th>\n                              <td>{{model?.property?.name || ('table.tr.td.NA' | translate)}}</td>\n                            </tr>\n                            <tr>\n                              <th>{{'quickVisualization.price' | translate}}:</th>\n                              <td>{{(model?.deal_price || 0) | currency}}</td>\n                            </tr>\n                      </tbody>\n                    </table>\n                  </div>\n              </div>\n          \n              <div class=\"col-md-1\"></div>\n          \n              <div class=\"col-md-4\">  \n                    <div class=\"table-responsive\">\n                      <table class=\"table table-bordered white-bg\">\n                          <tbody>\n                              <tr>\n                                  <th>{{'quickVisualization.purchaseDate' | translate}}:</th>\n                                  <td>{{model?.deal_purchase_date ? (model?.deal_purchase_date | date:'dd/MMM/yyyy') : ('table.tr.td.NA' | translate)}}</td>\n                                </tr>\n                                <tr>\n                                  <th>{{'quickVisualization.currency' | translate}}:</th>\n                                  <td>{{model?.currency?.code || ('table.tr.td.NA' | translate)}}</td>\n                                </tr>\n                          </tbody>\n                      </table>\n                    </div>\n                      <div class=\"table-responsive\">\n                        <table class=\"table table-bordered white-bg\">\n                            <tbody>\n                                <tr>\n                                    <th>{{'quickVisualization.paid' | translate}}:</th>\n                                    <td>{{(model?.total_payment_recieved || 0) | currency}}</td>\n                                    <!-- <td>{{(totalPaid || 0) | currency}}</td> -->\n                                  </tr>\n                                  <tr>\n                                    <th>{{'quickVisualization.remaining' | translate}}:</th>\n                                    <!-- <td>{{((model?.total || 0) - (model?.paid || 0)) | currency}}</td> -->\n                                    <td>{{remainingAmt > 0 ? (remainingAmt | currency) : ( 0 | currency)}}</td>                                   <!-- <td>{{(totalOutstanding || 0) | currency}}</td> -->\n                                  </tr>\n                                  <tr>\n                                    <th>{{'quickVisualization.totalPenalty' | translate}}:</th>\n                                    <td>{{(model?.penalty || 0) | currency}}</td>\n                                  </tr>\n                            </tbody>\n                        </table>\n                      </div>\n                </div>\n        \n          </div>\n        \n        \n    \n  <h5>{{'quickVisualization.paymentInformation' | translate}}</h5>\n  <div class=\"cust-tabs\">\n    <div class=\"tab-content white-bg\">\n      <div class=\"table-responsive main-table\">\n        <table class=\"table table-bordered table-striped table-align-center quick-table\">\n          <thead>\n            <tr>\n                <th [style.width]=\"'200px'\" [style.z-index]=\"100\">\n                  <b>{{'quickVisualization.concept' | translate}}</b>\n                </th>\n                <th [style.width]=\"'140px'\">\n                  <b>{{'quickVisualization.month' | translate}}</b>\n                </th>\n                <!-- <th [style.width]=\"'140px'\">\n                  <b>{{'quickVisualization.paymentDate' | translate}}</b>\n                </th> -->\n                <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.paid' | translate}}</b>\n                </th>\n                <!-- <th [style.width]=\"'150px'\">\n                  <b>{{'quickVisualization.paymentMethods' | translate}}</b>\n                </th> -->\n                <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.outstandingPayment' | translate}}</b>\n                </th>\n                <!-- <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.paidByUser' | translate}}</b>\n                </th> -->\n                <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.toBePaidByUser' | translate}}</b>\n                </th>\n                <!-- <th>\n                    <b>{{'quickVisualization.paymentAttachment' | translate}}</b>\n                </th> -->\n                <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.penaltyFLP' | translate}}</b>\n                </th>\n                <th>\n                    <b>{{'quickVisualization.penaltyDescription' | translate}}</b>\n                </th>\n            </tr>\n          </thead>\n          <tbody *ngFor=\"let p of paymentConcepts; let i=index\">\n            <tr [ngClass]=\"{'remaining_amt': p.key == 'remaining_amt'}\">\n              <td>\n                <a style=\"color: #fff;\" class=\"color-changed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse{{i}}\">\n                    {{p?.name}}\n                </a>\n              </td>\n              <td>{{p?.date | date:'dd/MMM/yyyy'}}</td>\n              <!-- <td>{{p?.payment_date || ''}}</td> -->\n              <td>\n                <!-- {{p?.paid_amount}}<br> -->\n                {{p?.paid_amount && p?.paid_amount>'0.1' ? (p?.paid_amount | currency) : ''}}<br>\n                <!-- {{p?.new_paid_amt ? (p?.new_paid_amt | currency) : ''}}  -->\n                <!-- {{p?.is_paid_calculated == 1 ? p?.amount : (p?.collection_payment ? (p?.collection_payment?.amount | currency) : '')}} -->\n              </td>\n              <!-- <td>{{p?.collection_payment?.payment_method?.name || ''}}</td> -->\n              <td>\n                <span [ngClass]=\"{'red-color':p?.is_pending}\">\n                  {{p?.outstanding_amount && p?.outstanding_amount > 0 ? (p?.outstanding_amount | currency) : ''}}\n                </span>\n                <!-- <span [ngClass]=\"{'red-color':(p?.amount != p?.collection_payment?.amount) && p?.collection_payment?.amount}\">\n                  {{p?.is_paid_calculated!=1 && p?.amount ? ((p?.amount || 0) | currency) : ''}}\n                </span> -->\n              </td>\n              <!-- <td>\n                {{p?.collection_payment ? (p?.collection_payment?.amount | currency) : ''}}\n              </td> -->\n              <td>\n                  {{p?.amount ? ((p?.amount || 0) | currency) : ''}}\n              </td>\n              <!-- <td>\n                <a class=\"green-color fontW500\" *ngIf=\"p?.collection_payment && p?.key!='total'\" target=\"_blank\" href=\"{{p?.collection_payment?.receipt}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                <button class=\"action-icon\" *ngIf=\"p?.collection_payment?.description\" (click)=\"showDescription(p?.collection_payment?.description, 1)\">\n                    <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                </button>\n              </td> -->\n              <td>\n                {{p?.penalty ? ((p?.penalty?.amount || 0) | currency) : ''}}\n              </td>\n              <td>\n                  <button class=\"action-icon\" *ngIf=\"p?.penalty?.description\" (click)=\"showDescription(p?.penalty?.description, 2)\">\n                      <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                  </button>\n              </td>              \n              </tr>\n            \n            \n              <tr id=\"collapse{{i}}\" class=\"panel-collapse collapse\">\n                  <td colspan=\"5\" style=\"background: #fff;\">\n                  <table>\n                    <thead style=\"background: #00B96F; color: #fff;\">\n                      <th [style.width]=\"'240px'\" [style.color]=\"'#fff'\">{{'quickVisualization.concept' | translate}}</th>\n                      <th [style.width]=\"'300px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentDate' | translate}}</th>\n                      <th [style.width]=\"'300px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paidByUser' | translate}}</th>\n                      <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentMethods' | translate}}</th>\n                      <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentAttachment' | translate}}</th>\n                      <!-- <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentDescription' | translate}}</th> -->\n                    </thead>\n                    <tbody *ngIf=\"p?.collection_paymentss?.length>0\">\n                      <ng-container *ngFor=\"let stats of p?.collection_paymentss\">\n                        <tr *ngIf=\"stats.payment_type==1 || stats.payment_type==3 || stats.payment_type==4 || stats.payment_type==5\">\n                          <td [style.backgroundColor]=\"'#fff'\" [style.color]=\"'#222'\">\n                            {{p?.name || 'NA'}}\n                          </td>\n                          <td>\n                            {{stats.payment_date ? (stats.payment_date | date:'dd/MMM/yyyy') : 'NA'}}\n                          </td>\n                          <td>\n                            <span> {{stats?.amount ? (stats?.amount | currency) : ''}}</span> \n                          </td>\n                          <td>\n                            <span> {{stats?.payment_method?.name || 'NA'}}</span> \n                          </td>\n                          <td>\n                            <a class=\"green-color fontW500\" *ngIf=\"stats?.key!='total'\" target=\"_blank\" href=\"{{stats?.receipt}}\">\n                              {{'quickVisualization.view' | translate}}\n                            </a>\n                          </td>\n                          <!-- <td>\n                            <button class=\"action-icon\" *ngIf=\"stats?.description\" (click)=\"showDescription(stats?.description, 1)\">\n                                <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                            </button>\n                          </td> -->\n                        </tr>\n                    </ng-container>\n                    </tbody>\n                  </table>\n                </td>\n                </tr>\n            \n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#des-modal\" #viewDesModal></a>\n<div class=\"modal animated\" id=\"des-modal\">\n      <div class=\"modal-dialog fadeIndown\">\n            <div class=\"modal-content notary-avail\">\n                  <div class=\"modal-header popup-header\">\n                        <h4 *ngIf=\"title==1\">{{'quickVisualization.paymentDescription' | translate}}</h4>\n                        <h4 *ngIf=\"title==2\">{{'quickVisualization.penaltyDescription' | translate}}</h4>\n                        <h4 *ngIf=\"title==3\">{{'quickVisualization.PCDescription' | translate}}</h4>\n                        <h4 *ngIf=\"title==4\">{{'quickVisualization.CCDescription' | translate}}</h4>\n                        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #viewDesModalClose>&times;</button>\n                        <button type=\"button\" class=\"close\" (click)=\"closeDescModal()\">&times;</button>\n                  </div>\n\n                  <div class=\"modal-body\">\n                        <div class=\"form-group-2\">\n                              <div class=\"form-group\">\n                                    <textarea rows=\"4\" readonly required class=\"form-control note\" name=\"description\" [(ngModel)]=\"description\"></textarea>\n                              </div>\n                        </div>\n                  </div>\n            </div>\n      </div>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/collections/account-statement/account-statement.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/layout/collections/account-statement/account-statement.component.ts ***!
  \*************************************************************************************/
/*! exports provided: AccountStatementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountStatementComponent", function() { return AccountStatementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/collection.model */ "./src/app/models/collection.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_services_excel_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/excel.service */ "./src/app/services/excel.service.ts");
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! exceljs */ "./node_modules/exceljs/dist/exceljs.min.js");
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';






var AccountStatementComponent = /** @class */ (function () {
    function AccountStatementComponent(route, model, admin, spinner, translate, excelService, currencyPipe, datePipe) {
        this.route = route;
        this.model = model;
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.excelService = excelService;
        this.currencyPipe = currencyPipe;
        this.datePipe = datePipe;
        this.parameter = {};
    }
    AccountStatementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.property_collection_id = params['id'];
            _this.getCollectionDetails();
        });
    };
    // getCollectionDetails() {
    //   this.spinner.show();
    //   this.admin.postDataApi('getCollectionById', {id: this.model.id})
    //     .subscribe(
    //       success => {
    //         this.spinner.hide();
    //         this.model = success['data'];
    //         this.paymentConcepts = success['data']['payment_choices'];
    //         this.collectionCommission = success['data']['collection_commissions'];
    //         this.totalPaid = 0.00;
    //         this.totalOutstanding = 0.00;
    //         const reducingP = [];
    //         for (let index = 0; index < this.paymentConcepts.length; index++) {
    //           const m = this.paymentConcepts[index];
    //           m.payment_date = m.collection_payment ? this.getDateWRTTimezone(m.collection_payment.payment_date) : '';
    //           //  calculating total penalty
    //           // if (m.penalty){
    //           //   this.model.totalPenalty = this.model.totalPenalty + parseInt(m.penalty.amount || 0)
    //           // }
    //           m.paid_amount = m.is_paid_calculated == 1 ? m.amount : (m.collection_payment ? (m.collection_payment.amount) : '');
    //           // if type=2 means reducing payment => add one more row
    //           // console.log(m)
    //           if(m.type==2) {
    //             const c = {
    //               key: 'remaining_amt',
    //               name: 'Payment to remaining (amount)',
    //               paid_amount: m.extra_amount,
    //               is_paid_calculated: 0,
    //               outstanding_amount: 0,
    //               index: index,
    //               payment_date: this.getDateWRTTimezone(m.collection_payment.payment_date)
    //             };
    //             // console.log(c)
    //             reducingP.push(c);     
    //           }
    //           if(m.type==3) {
    //             const c = {
    //               key: 'remaining_amt',
    //               name: 'Payment to remaining (schedule)',
    //               paid_amount: m.extra_amount,
    //               is_paid_calculated: 0,
    //               outstanding_amount: 0,
    //               index: index,
    //               payment_date: this.getDateWRTTimezone(m.collection_payment.payment_date)
    //             };
    //             // console.log(c)
    //             reducingP.push(c);     
    //           }
    //           // calculating total paid and total outstanding payment
    //           if (m.is_paid_calculated) {
    //             // m['paid_amount'] = m.calc_payment_amount;
    //             this.totalPaid = this.totalPaid + m.calc_payment_amount;
    //           } 
    //           if ((m.amount - (m.calc_payment_amount||0))>=0) {
    //             const a = (m.amount - (m.calc_payment_amount || 0) );
    //             m['outstanding_amount'] = a > 0.01 ? a : 0;  // in a case difference was 0.02
    //             m['is_pending'] = (a != m.amount && a!=0) ? 1 : 0;
    //             this.totalOutstanding = this.totalOutstanding + a;
    //           }
    //         }
    //         // now insert at reducing remaining payments at type=2 index
    //         for (let i = 0; i < reducingP.length; i++) {
    //           const element = reducingP[i];
    //           this.paymentConcepts.splice(element.index, 0, element);              
    //         }
    //         this.paymentConcepts.push({
    //           key: 'total',
    //           name: 'Total',
    //           paid_amount: this.totalPaid,
    //           is_paid_calculated: 1,
    //           outstanding_amount: this.totalOutstanding
    //         })
    //         // // this.model.totalPenalty = 0;
    //         // this.paymentConcepts.forEach(m => {
    //         //   //  calculating total penalty
    //         //   // if (m.penalty){
    //         //   //   this.model.totalPenalty = this.model.totalPenalty + parseInt(m.penalty.amount || 0)
    //         //   // }
    //         //   // calculating total paid and total outstanding payment
    //         //   if (m.is_paid_calculated) {
    //         //     m['paid_amount'] = m.calc_payment_amount;
    //         //     this.totalPaid = this.totalPaid + m.calc_payment_amount;
    //         //   } 
    //         //   if ((m.amount - (m.calc_payment_amount||0))>=0) {
    //         //     const a = (m.amount - (m.calc_payment_amount || 0) );
    //         //     m['outstanding_amount'] = a > 0.01 ? a : 0;  // in a case difference was 0.02
    //         //     m['is_pending'] = (a != m.amount && a!=0) ? 1 : 0;
    //         //     this.totalOutstanding = this.totalOutstanding + a;
    //         //   }
    //         // })
    //         // this.paymentConcepts.push({
    //         //   key: 'total',
    //         //   name: 'Total',
    //         //   paid_amount: this.totalPaid,
    //         //   is_paid_calculated: 1,
    //         //   outstanding_amount: this.totalOutstanding
    //         // })
    //         this.collectionCommission.push({})
    //       }, error => {
    //         this.spinner.hide();
    //       }
    //     );
    // }
    AccountStatementComponent.prototype.getCollectionDetails = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getCollectionById', { id: this.property_collection_id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success['data'];
            _this.paymentConcepts = success['data']['payment_choices'];
            // for dropdown
            _this.paymentConcepts = _this.paymentConcepts.slice();
            _this.collectionCommission = success['data']['collection_commissions'];
            _this.totalPaid = 0.00;
            _this.totalOutstanding = 0.00;
            _this.remainingAmt = (((_this.model.deal_price || 0) + (_this.model.penalty || 0)) - (_this.model.total_payment_recieved || 0));
            var reducingP = [];
            for (var index = 0; index < _this.paymentConcepts.length; index++) {
                var m = _this.paymentConcepts[index];
                m.payment_date = m.collection_payment > 0 ? _this.getDateWRTTimezone(m.collection_payment.payment_date, 'YYYY-MM-DD') : '';
                m.paid_amount = m.calc_payment_amount ? m.calc_payment_amount : 0;
                var c = {};
                // if type=2 means reducing payment => add one more row
                if (m.collection_paymentss && m.collection_paymentss.length > 0) {
                    for (var i = 0; i < m.collection_paymentss.length; i++) {
                        var paymnts = m.collection_paymentss[i];
                        c = {
                            key: 'remaining_amt',
                            name: '',
                            paid_amount: paymnts.full_amount,
                            is_paid_calculated: 0,
                            outstanding_amount: 0,
                            index: index + i,
                            payment_type: 2,
                            receipt: paymnts.receipt,
                            description: paymnts.description,
                            display_choice_id: paymnts.display_choice_id,
                            created_at: paymnts.created_at
                        };
                        if (paymnts.payment_type == 2) {
                            c['name'] = 'Payment to remaining (Reduce Amount)';
                            c['collection_paymentss'] = [{
                                    id: paymnts.id,
                                    parent_id: paymnts.parent_id,
                                    payment_type: 1,
                                    paid_amount: paymnts.amount,
                                    amount: paymnts.amount,
                                    payment_date: _this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                    receipt: paymnts.receipt,
                                    description: paymnts.description,
                                    payment_method: paymnts.payment_method
                                }];
                            reducingP.push(c);
                        }
                        else if (paymnts.payment_type == 3 && paymnts.display_choice_id) {
                            c['name'] = 'Payment to remaining (Reduce Time)';
                            c['collection_paymentss'] = [{
                                    id: paymnts.id,
                                    parent_id: paymnts.parent_id,
                                    payment_type: 3,
                                    paid_amount: paymnts.full_amount,
                                    amount: paymnts.full_amount,
                                    payment_date: _this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                    receipt: paymnts.receipt,
                                    description: paymnts.description,
                                    payment_method: paymnts.payment_method
                                }];
                            reducingP.push(c);
                        }
                        else if (paymnts.payment_type == 5 && paymnts.display_choice_id) {
                            c['name'] = 'Total Payment';
                            c['collection_paymentss'] = [{
                                    id: paymnts.id,
                                    parent_id: paymnts.parent_id,
                                    payment_type: 5,
                                    paid_amount: paymnts.full_amount,
                                    amount: paymnts.full_amount,
                                    payment_date: _this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                    receipt: paymnts.receipt,
                                    description: paymnts.description,
                                    payment_method: paymnts.payment_method
                                }];
                            reducingP.push(c);
                        }
                    }
                }
                // calculating total paid and total outstanding payment
                _this.totalPaid = _this.totalPaid + m.paid_amount;
                m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
                if ((m.amount - (m.calc_payment_amount || 0)) >= 0) {
                    var a = (m.calc_payment_amount || 0);
                    m['is_pending'] = a ? 1 : 0;
                    _this.totalOutstanding = _this.totalOutstanding + m['outstanding_amount'];
                }
            }
            // now insert at reducing remaining payments at type=2 index
            // sorting reducingP according to date => in case user is paying using type 3 consecutively many times
            reducingP.sort(_this.sortFunction);
            for (var i = 0; i < reducingP.length; i++) {
                var element = reducingP[i];
                // for payment_type 3,5 check display_choice_id
                // loop is for if need to insert 2 type 2 payments on same index
                for (var j = 0; j < _this.paymentConcepts.length; j++) {
                    var e = _this.paymentConcepts[j];
                    if (e.id == element.display_choice_id) {
                        _this.paymentConcepts.splice(j, 0, element);
                        break;
                    }
                }
            }
            // calculating new paid amt, by skipping type 2
            for (var index = 0; index < _this.paymentConcepts.length; index++) {
                var element = _this.paymentConcepts[index];
                var p_amt = 0;
                if (element.collection_paymentss && element.collection_paymentss.length > 0) {
                    for (var i = 0; i < element.collection_paymentss.length; i++) {
                        var ele = element.collection_paymentss[i];
                        // if payment_type 2 then reduce the amount from all MI (only)
                        if (ele.payment_type == 2) {
                            var v = ele.amt_share || 0;
                            var ids = ele.choices_ids.split(',');
                            // deleting the share of type 2 from main header
                            for (var j = 0; j < _this.paymentConcepts.length; j++) {
                                var e = _this.paymentConcepts[j];
                                if (e.id) {
                                    var d = e.id.toString();
                                    var h = ids.indexOf(d);
                                    if (h >= 0) {
                                        var obj = {
                                            amount: v,
                                            name: 'Payment to remaining (Reduce Amount)',
                                            payment_type: 1,
                                            paid_amount: v,
                                            payment_date: _this.getDateWRTTimezone(ele.payment_date, 'YYYY-MM-DD'),
                                            receipt: ele.receipt,
                                            description: ele.description,
                                            payment_method: ele.payment_method
                                        };
                                        _this.paymentConcepts[j].paid_amount = parseFloat(_this.paymentConcepts[j].paid_amount) - parseFloat(v);
                                    }
                                }
                            }
                        }
                    }
                }
                element.new_paid_amt = p_amt;
            }
            _this.paymentConcepts.push({
                key: 'total',
                name: 'Total',
                // paid_amount: this.totalPaid,
                paid_amount: _this.model.total_payment_recieved,
                is_paid_calculated: 1,
                outstanding_amount: _this.totalOutstanding
            });
            _this.collectionCommission.push({});
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AccountStatementComponent.prototype.exportData = function () {
        if (this.paymentConcepts) {
            var finalData = [];
            for (var index = 0; index < this.paymentConcepts.length; index++) {
                var p = this.paymentConcepts[index];
                finalData.push({
                    'Concept': p.name || '',
                    'Month': p.date || '',
                    'Payment Date': p.collection_payment ? p.collection_payment.payment_date : '',
                    'Paid': p.paid_amount ? this.currencyPipe.transform(p.paid_amount) : '',
                    'Outstanding Payment': p.outstanding_amount ? this.currencyPipe.transform(p.outstanding_amount) : '',
                    'Payment Method': p.collection_payment && p.collection_payment.payment_method ? p.collection_payment.payment_method.name : '',
                    'Sozu Payment Receipt': p.collection_payment ? p.collection_payment.receipt : '',
                    'Penalty FLP': p.penalty ? this.currencyPipe.transform(p.penalty.amount) : '',
                    'Penalty Description': p.penalty ? p.penalty.description : '',
                });
            }
            this.exportAsExcelFile(finalData, 'accountStatement-');
        }
    };
    // will be used in case of excel
    AccountStatementComponent.prototype.exportAsExcelFile = function (json, excelFileName) {
        var worksheet = xlsx__WEBPACK_IMPORTED_MODULE_6__["utils"].json_to_sheet(json);
        var workbook = {
            Sheets: { data: worksheet },
            SheetNames: ['data']
        };
        var excelBuffer = xlsx__WEBPACK_IMPORTED_MODULE_6__["write"](workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    };
    AccountStatementComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], { type: EXCEL_TYPE });
        var today = new Date();
        var date = today.getDate() +
            '-' +
            today.getMonth() +
            '-' +
            today.getFullYear() +
            '_' +
            today.getHours() +
            '_' +
            today.getMinutes() +
            '_' +
            today.getSeconds();
        fileName = fileName + date;
        file_saver__WEBPACK_IMPORTED_MODULE_5__["saveAs"](data, fileName + EXCEL_EXTENSION);
    };
    AccountStatementComponent.prototype.showDescription = function (description, title) {
        if (description) {
            this.title = title;
            this.description = description;
            this.viewDesModal.nativeElement.click();
        }
    };
    AccountStatementComponent.prototype.closeDescModal = function () {
        this.viewDesModalClose.nativeElement.click();
    };
    AccountStatementComponent.prototype.generateExcel = function () {
        var title = 'Account Statement';
        var header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"];
        var data = [
            [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
            [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
            [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
            [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
            [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
        ];
        var workbook = new exceljs__WEBPACK_IMPORTED_MODULE_9__["Workbook"]();
        var worksheet = workbook.addWorksheet('Account Statement');
        // Add new row
        var titleRow = worksheet.addRow([title]);
        // Set font, size and style in title row.
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
        // Blank Row
        worksheet.addRow([]);
        //Add row with current date
        // let subTitleRow = worksheet.addRow(['Date : ']);
        // let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
        worksheet.mergeCells('A2:D5');
        worksheet.addRow([]);
        // Add buyer info
        worksheet.mergeCells('A7:A9');
        worksheet.getCell('A5').value = 'Buyer Info';
        worksheet.getCell('B4').value = 'Name';
        worksheet.getCell('B5').value = 'Email';
        worksheet.getCell('B6').value = 'PhoneBuyer Info';
        worksheet.getCell('C4').value = '';
        worksheet.getCell('C5').value = '';
        worksheet.getCell('C6').value = '';
        worksheet.mergeCells('D4:D6');
        worksheet.getCell('D5').value = 'Seller Info';
        worksheet.getCell('E4').value = 'Name Info';
        worksheet.getCell('E5').value = 'Phone Info';
        worksheet.getCell('E6').value = 'Email Info';
        //Add Header Row
        var headerRow = worksheet.addRow(header);
        // Cell Style : Fill and Border
        headerRow.eachCell(function (cell, number) {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF00' },
                bgColor: { argb: 'FF0000FF' }
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        // Add Data and Conditional Formatting
        data.forEach(function (d) {
            var row = worksheet.addRow(d);
            var qty = row.getCell(5);
            var color = 'FF99FF99';
            if (+qty.value < 500) {
                color = 'FF9999';
            }
            qty.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: color }
            };
        });
        workbook.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            file_saver__WEBPACK_IMPORTED_MODULE_5__["saveAs"](blob, 'CarData.xlsx');
        });
    };
    AccountStatementComponent.prototype.getDateWRTTimezone = function (date, format) {
        var offset = new Date(date).getTimezoneOffset();
        if (offset < 0) {
            return moment__WEBPACK_IMPORTED_MODULE_11__(date).subtract(offset, 'minutes').format(format);
        }
        else {
            return moment__WEBPACK_IMPORTED_MODULE_11__(date).add(offset, 'minutes').format(format);
        }
    };
    AccountStatementComponent.prototype.sortFunction = function (a, b) {
        var dateA = new Date(a.created_at).getTime();
        var dateB = new Date(b.created_at).getTime();
        return dateA > dateB ? 1 : -1;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewDesModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AccountStatementComponent.prototype, "viewDesModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewDesModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AccountStatementComponent.prototype, "viewDesModalClose", void 0);
    AccountStatementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-account-statement',
            template: __webpack_require__(/*! ./account-statement.component.html */ "./src/app/layout/collections/account-statement/account-statement.component.html"),
            styles: [__webpack_require__(/*! ./account-statement.component.css */ "./src/app/layout/collections/account-statement/account-statement.component.css")],
            providers: [src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_2__["Collection"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["CurrencyPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["DatePipe"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_2__["Collection"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"],
            src_app_services_excel_service__WEBPACK_IMPORTED_MODULE_8__["ExcelService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_10__["CurrencyPipe"],
            _angular_common__WEBPACK_IMPORTED_MODULE_10__["DatePipe"]])
    ], AccountStatementComponent);
    return AccountStatementComponent;
}());



/***/ }),

/***/ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.css":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/collections/add-edit-collection/add-edit-collection.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".folder-box {\n    /* background: #68abf4;\n    border: 1px solid #4543437d; */\n    background-image: url(/assets/img/ic_folder.svg);\n    background-size: contain;\n    height: auto;\n    /* padding: 15px 6px; */\n    margin: 15px;\n    border-radius: 15px;\n    background-size: cover;\n}\n.folder-box .form-group-3 {\n    margin-bottom: 0px;\n    height: 120px;\n    padding-top: 60px;\n}\n.folder-box .form-group-3 p {\n    text-align: center;\n    font-size: 15px;\n    word-break: break-word;\n}\n.folder-box button{\n    padding: 4px 8px;\n    border-radius: 4px;\n    border-style: outset;\n}\n.folder-action-btn {\n    text-align: right;\n}\n.folder-action-btn .fa{\n    margin: 5px;\n    font-size: 20px;\n}\n.is_commission_sale_enabled{\n    width: 25px;\n    height: 25px;\n}\n.edit{\n    padding-right: 60px !important;\n    color: rgba(0,0,0,0.5);\n    font-size: 11px;\n    position: absolute;\n    right: -20px;\n    top: 0;\n  }\n.model-body10P{\n    padding: 10px !important;\n  }\n.my-modal-header{\n    display: inline;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbGxlY3Rpb25zL2FkZC1lZGl0LWNvbGxlY3Rpb24vYWRkLWVkaXQtY29sbGVjdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0k7bUNBQytCO0lBQy9CLGlEQUFpRDtJQUNqRCx5QkFBeUI7SUFDekIsYUFBYTtJQUNiLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2Isb0JBQW9CO0lBQ3BCLHVCQUF1QjtDQUMxQjtBQUNEO0lBQ0ksbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxrQkFBa0I7Q0FDckI7QUFDRDtJQUNJLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0NBQzFCO0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLHFCQUFxQjtDQUN4QjtBQUNEO0lBQ0ksa0JBQWtCO0NBQ3JCO0FBQ0Q7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0NBQ25CO0FBQ0Q7SUFDSSxZQUFZO0lBQ1osYUFBYTtDQUNoQjtBQUVEO0lBQ0ksK0JBQStCO0lBQy9CLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixPQUFPO0dBQ1I7QUFFRDtJQUNFLHlCQUF5QjtHQUMxQjtBQUNEO0lBQ0UsZ0JBQWdCO0dBQ2pCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2NvbGxlY3Rpb25zL2FkZC1lZGl0LWNvbGxlY3Rpb24vYWRkLWVkaXQtY29sbGVjdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvbGRlci1ib3gge1xuICAgIC8qIGJhY2tncm91bmQ6ICM2OGFiZjQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzQ1NDM0MzdkOyAqL1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2ltZy9pY19mb2xkZXIuc3ZnKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIC8qIHBhZGRpbmc6IDE1cHggNnB4OyAqL1xuICAgIG1hcmdpbjogMTVweDtcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG4uZm9sZGVyLWJveCAuZm9ybS1ncm91cC0zIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XG4gICAgaGVpZ2h0OiAxMjBweDtcbiAgICBwYWRkaW5nLXRvcDogNjBweDtcbn1cbi5mb2xkZXItYm94IC5mb3JtLWdyb3VwLTMgcCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xufVxuLmZvbGRlci1ib3ggYnV0dG9ue1xuICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJvcmRlci1zdHlsZTogb3V0c2V0O1xufVxuLmZvbGRlci1hY3Rpb24tYnRuIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbi5mb2xkZXItYWN0aW9uLWJ0biAuZmF7XG4gICAgbWFyZ2luOiA1cHg7XG4gICAgZm9udC1zaXplOiAyMHB4O1xufVxuLmlzX2NvbW1pc3Npb25fc2FsZV9lbmFibGVke1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIGhlaWdodDogMjVweDtcbn1cblxuLmVkaXR7XG4gICAgcGFkZGluZy1yaWdodDogNjBweCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiByZ2JhKDAsMCwwLDAuNSk7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogLTIwcHg7XG4gICAgdG9wOiAwO1xuICB9XG4gIFxuICAubW9kZWwtYm9keTEwUHtcbiAgICBwYWRkaW5nOiAxMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgLm15LW1vZGFsLWhlYWRlcntcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/collections/add-edit-collection/add-edit-collection.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"white-bg padding15\">\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"title-group\">\n        <h5 *ngIf=\"!editMode\"><a routerLink=\"/dashboard/collections/view-collections\" href=\"javascript://\"><i\n              class=\"fa fa-angle-double-left\"></i> </a> &nbsp;&nbsp;{{'addCollection.addLabel' | translate}}</h5>\n        <h5 *ngIf=\"editMode\"> <a routerLink=\"/dashboard/collections/view-collections\" href=\"javascript://\"><i\n              class=\"fa fa-angle-double-left\"></i> </a> &nbsp;&nbsp;{{'addCollection.editLabel' | translate}}: {{model?.name}}</h5>\n      </div>\n    </div>\n    <div class=\"col-md-6 btn-cont\">\n      <!-- <app-add-lead *ngIf=\"this.parameter?.property_id && editMode\"  [property_id]=\"parameter.property_id\"></app-add-lead> -->\n    </div>\n  </div>\n</div>\n\n<div class=\"spacer10\"></div>\n<div class=\"white-bg add-property padding20\">\n  <div class=\"steps\">\n    <ul class=\"d-flex\">\n      <li [ngClass]=\"{'current': tab == 1}\"><span></span><a (click)=\"setTab(1)\">{{'addCollection.tabs.property' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 2}\"><span></span><a (click)=\"setTab(2)\">{{'addCollection.tabs.seller' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 3}\"><span></span><a (click)=\"setTab(3)\">{{'addCollection.tabs.buyer' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 4}\"><span></span><a (click)=\"setTab(4)\">{{'addCollection.tabs.deal' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 5}\"><span></span><a (click)=\"setTab(5)\">{{'addCollection.tabs.commission' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 6}\"><span></span><a (click)=\"setTab(6)\">{{'addCollection.tabs.uploadDocuments' | translate}}</a></li>\n    </ul>\n    <!-- <ul class=\"d-flex\">\n      <li [ngClass]=\"{'current': tab == 1}\"><span></span><a>{{'addCollection.tabs.property' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 2}\"><span></span><a>{{'addCollection.tabs.seller' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 3}\"><span></span><a>{{'addCollection.tabs.buyer' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 4}\"><span></span><a>{{'addCollection.tabs.deal' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 5}\"><span></span><a>{{'addCollection.tabs.commission' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 6}\"><span></span><a>{{'addCollection.tabs.uploadDocuments' | translate}}</a></li>\n    </ul> -->\n  </div>\n</div>\n\n<div class=\"spacer10\"></div>\n\n\n\n<!-- Tag a building start -->\n<div class=\"white-bg\" *ngIf=\"tab==1\">\n  <div class=\"page-title\">\n    <h3>{{'addCollection.chooseYourProperty' | translate}}</h3>\n  </div>\n\n  <div class=\"padding40\" *ngIf=\"model?.building?.id && showSearch==false\">\n    <div class=\"row\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.taggedBuildingName' | translate}}</p>\n      </div>\n      <div class=\"col-sm-3 col-lg-3 btn-cont text-right\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"showSearchBox()\">{{'addCollection.change' | translate}}</button>\n      </div>\n    </div>\n    <p><b>{{model?.building?.name}}</b></p>\n\n    <div class=\"row\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.taggedTowerName' | translate}}</p>\n      </div>\n    </div>\n    <p><b>{{model?.building_towers?.tower_name ? model?.building_towers?.tower_name : ('table.tr.td.NA' | translate)}}</b></p>\n\n    <div class=\"row\" *ngIf=\"model?.building_towers\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.taggedFloor' | translate}}</p>\n      </div>\n    </div>\n    <p><b>\n      {{model?.building_towers?.tower_name ? (model?.floor_num == 0 ? ('addCollection.groundFloor' | translate) : ('addCollection.floor' | translate) + ' ' + model?.floor_num) : 'NA'}}\n    </b></p>\n    \n    <div class=\"row\" *ngIf=\"model?.name\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.taggedApartmentName' | translate}}</p>\n      </div>\n    </div>\n    <p><b>{{model?.name ? model?.name : ('table.tr.td.NA' | translate)}}</b></p>\n  \n    <div class=\"row\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.selectedDealType' | translate}}</p>\n      </div>\n    </div>\n    <p><b>{{model?.availabilityStatusId == 1 ? availabilityStatus[0].name : availabilityStatus[1].name}}</b></p>\n      \n    <div class=\"row\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.selectedModal' | translate}}</p>\n      </div>\n    </div>\n    <p><b>{{model?.building_configuration?.name}}</b></p>\n      \n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"btn-cont text-right\">\n          <button type=\"button\" (click)=\"tab=2\" class=\"btn btn-primary\">{{'addCollection.next' | translate}}</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"padding40\" *ngIf=\"showSearch\">\n    <h5 class=\"p16-two\">{{'addCollection.SearchYourBuildingInOurDatabase' | translate}}</h5>\n    <div class=\"searh d-flex\">\n      <input autocomplete=\"off\" class=\"border-right-0\" autocomplete=\"off\" type=\"text\" #buildingname\n        (keyup.enter)=\"searchBuilding(buildingname.value)\" name=\"buildingName\" [(ngModel)]=\"buildingName\">\n      <button type=\"button\" class=\"btn\" type=\"button\" (click)=\"searchBuilding(buildingname.value)\">{{'addCollection.search' | translate}}</button>\n    </div>\n    <div class=\"spacer50\"></div>\n    <div *ngIf=\"buildingLoading\">\n      <img src=\"assets/img/loading_content.gif\" />\n    </div>\n    <div *ngIf=\"!buildingLoading && parameter.buildingCount != 0\" class=\"white-bg\">\n\n      <form autocomplete=\"off\" [formGroup]=\"addFormStep1\"  (ngSubmit)=\"createCollection(addFormStep1.value, 1)\">\n        \n        <!-- buildings listing -->\n        <div class=\"row\">\n          <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" \n          *ngFor=\"let item of searchedBuildings| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.buildingCount }; let i = index\">\n            <app-project-block (setBuilding)=\"setBuildingId($event)\" (buildingIndex)=\"getBuildingIndex($event)\" [data]=\"item\" [index]=\"i\"></app-project-block>\n          </div>\n        </div>\n        <div *ngIf=\"showError  &&  (addFormStep1.controls.building_id.invalid)\">\n          <div *ngIf=\"addFormStep1.controls.building_id.errors?.required \" class=\"show-error\">\n              {{'addCollectionValidations.thisIsRequired' | translate}}\n          </div>\n        </div>\n\n        <div class=\"row\" *ngIf=\"searchedBuildings?.length>0\">\n          <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"></div>\n          <div class=\"col-lg-6 col-md-12 col-sm-12 col-12 btn-cont text-right marginT15\">\n            <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n          </div>\n        </div>\n\n        <!-- towers listing wrt building id -->\n        <div class=\"row marginT20\" *ngIf=\"building.id\">\n            <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label class=\"p16-two\">{{'addCollection.selectTowerIn' | translate}} {{selectedBuilding?.name}} <span class=\"color-red\">*</span></label>\n              <select name=\"tower\" *ngIf=\"selectedBuilding\" formControlName=\"building_towers_id\" required class=\"form-control\" (change)=\"setTower($event.target.value)\">\n                <option value=\"\">{{'addCollection.selectTower' | translate}}</option>\n                <option *ngFor=\"let bt of selectedBuilding?.building_towers\" [value]=\"bt.id\">\n                  {{bt.tower_name}}</option>\n              </select>\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep1.controls.building_towers_id.invalid)\">\n              <div *ngIf=\"addFormStep1.controls.building_towers_id.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n            </div>\n          </div>  \n        </div>\n\n        <!-- floor listing wrt tower id -->\n        <div class=\"row marginT20\" *ngIf=\"building.id && model.building_towers\">\n          <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label class=\"p16-two\">{{'addCollection.selectFloorIn' | translate}} {{model.building_towers?.tower_name}} <span class=\"color-red\">*</span></label>\n              <select required class=\"form-control\" name=\"floor_num\" formControlName=\"floor_num\" (change)=\"getProperties($event)\">\n                <option value=\"\">{{'addCollection.selectFloor' | translate}}</option>\n                <option *ngFor=\"let fa of model.building_towers?.unique_floors; let j=index\" [value]=\"fa\">\n                  {{fa == 0 ? ('addCollection.groundFloor' | translate): ('addCollection.floor' | translate) + ' '+fa}}</option>\n              </select>\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep1.controls.floor_num.invalid)\">\n              <div *ngIf=\"addFormStep1.controls.floor_num.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n            </div>\n          </div>  \n        </div>\n\n        <!-- properties listing wrt building id -->\n        <div class=\"row marginT20\" *ngIf=\"building.id && model.building_towers && model.floor_num\">\n            <div class=\"col-lg-6 col-md-6 col-sm-12 col-6\">\n            <div class=\"form-group form-group-3\">\n              <label class=\"p16-two\">{{'addCollection.selectYourApartment' | translate}} <span class=\"color-red\">*</span></label>\n\n              <p-dropdown class=\"search-dropdown\"\n                [options]=\"properties\" [style]=\"{'width':'100%'}\" formControlName=\"property_id\"\n                [filter]=\"true\" optionLabel=\"name\" (onChange)=\"setPropertyId(property_id)\">\n              </p-dropdown>\n             \n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep1.controls.property_id.invalid)\">\n              <div *ngIf=\"addFormStep1.controls.property_id.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n            </div>\n          </div>  \n          <div class=\"col-lg-6 col-md-6 col-sm-12 col-6\">\n            <div class=\"form-group-3\">\n              <label class=\"p16-two\">{{'addCollection.selectDealType' | translate}}<span class=\"color-red\">*</span></label>\n              <div class=\"clearfix\"></div>\n              <label class=\"cust-radio\" *ngFor=\"let astatus of availabilityStatus; let a=index\">\n                <input disabled type=\"radio\" (change)=\"setAvailableStatus(a)\" value=\"{{astatus.id}}\"\n                  [checked]=\"model?.availabilityStatusId == astatus.id ? 'checked' : ''\" name=\"availabilityStatusId\">\n                <span class=\"checkmark\">{{astatus.name}}</span>\n              </label>      \n              <div class=\"clearfix\"></div>\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep1.controls.for_sale.invalid)\">\n              <div *ngIf=\"addFormStep1.controls.for_sale.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n            </div>\n          </div>  \n        </div>\n\n        <div class=\"spacer15\"></div>\n        <div class=\"row\" *ngIf=\"building.id && model.building_towers && model.floor_num\">\n          <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label class=\"p16-two\">{{'addForm.selectModal' | translate}} <span class=\"color-red\">*</span></label>\n              <div class=\"clearfix\"></div>\n              <label class=\"cust-radio\" *ngFor=\"let configuration of configurations\">\n                <input disabled type=\"radio\" required (change)=\"setConfiguration(configuration)\"\n                  value=\"{{configuration.id}}\" [checked]=\"model.building_configuration_id == configuration.id ? 'checked' : ''\"\n                  name=\"configuration_id\">\n                <span class=\"checkmark\">{{configuration.name ? configuration.name : configuration.config.name}}</span>\n              </label>\n              <div class=\"clearfix\"></div>\n            </div>\n          </div>\n        </div>\n        <div *ngIf=\"showError  &&  (addFormStep1.controls.building_configuration_id.invalid)\">\n          <div *ngIf=\"addFormStep1.controls.building_configuration_id.errors?.required \" class=\"show-error\">\n              {{'addCollectionValidations.thisIsRequired' | translate}}\n          </div>\n        </div>\n        <div class=\"spacer15\"></div>\n        \n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <button type=\"submit\"  class=\"btn btn-primary\">{{'addCollection.next' | translate}}</button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n\n    <p *ngIf=\"parameter.buildingCount == 0 && showText\" class=\"p18\">\n      <!-- {{'addCollection.didntFoundyourBuilding' | translate}}  -->\n      <strong>\n        <!-- <span (click)=\"showBuildingDetails(true)\" class=\"green-color cursor-pointer\">\n          {{'addCollection.GenerateARequesttoAddABuildingByOurDataCollectors' | translate}}\n        </span> -->\n        <span class=\"green-color\">\n          {{'addCollection.buildingYouAreSearchingNotFound' | translate}}\n        </span>\n      </strong>\n    </p>\n    <div *ngIf=\"showBuilding\" class=\"spacer50\"></div>\n\n    <form autocomplete=\"off\" ngNativeValidate #buildingRequestForm=\"ngForm\" (ngSubmit)=\"buildingRequest()\">\n      <div *ngIf=\"showBuilding\" class=\"row\">\n        <div class=\"col-lg-7 col-md-12 col-sm-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.nameBuilding' | translate}}</label>\n                <input autocomplete=\"off\" required class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" name=\"name\"\n                  [(ngModel)]=\"building.name\" placeholder=\"{{'addForm.placeholder.nameOfBuilding' | translate}}\">\n              </div>\n            </div>\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.whereItIsLocated' | translate}}</label>\n                <input required placeholder=\"{{'addForm.placeholder.searchForLocation' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\"\n                  spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\"\n                  [formControl]=\"searchControl\" [(ngModel)]=\"building.address\" name=\"address\">\n              </div>\n            </div>\n          </div>\n          <label class=\"label-optional\">{{'addCollection.developerDetails' | translate}}</label>\n          <div class=\"row\">\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.nameOfDeveloper' | translate}}</label>\n                <input autocomplete=\"off\" class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" name=\"dev_name\"\n                  [(ngModel)]=\"building.dev_name\">\n              </div>\n            </div>\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.contactNumber' | translate}}</label>\n                <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"dev_phone\"\n                  [(ngModel)]=\"building.dev_phone\" name=\"dev_phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\"\n                  (countryChange)=\"onCountryChange($event)\" />\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.emailId' | translate}}</label>\n                <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" class=\"form-control\" type=\"email\" name=\"dev_email\"\n                  [(ngModel)]=\"building.dev_email\">\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-5 col-md-12 col-sm-12 col-12\">\n          <div class=\"form-group-3 mark-pin-map\">\n            <label>{{'addCollection.markPinonMap' | translate}}</label>\n          </div>\n          <div>\n            <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\"\n              (mapClick)=\"placeMarker($event)\" [zoom]=\"zoom\">\n              <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\n            </agm-map>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"showBuilding\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <button type=\"submit\" [disabled]=\"buildingRequestForm.invalid\" class=\"btn btn-primary\">{{'addCollection.submitRequest' | translate}}</button>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n<!-- Tag a building end -->\n\n\n<form autocomplete=\"off\" [formGroup]=\"addFormStep2\" (ngSubmit)=\"createCollection(addFormStep2.value, 2)\">\n  <div class=\"white-bg\" *ngIf=\"tab==2\">\n    <div class=\"page-title\">\n      <h3>{{'addCollection.chooseTheSeller' | translate}}</h3>\n    </div>\n\n    <div style=\"padding: 0px 40px;\">\n        \n      <div class=\"form-group-3 row\">\n          <h5 class=\"col-sm-3 p16-two\">{{'addCollection.chooseSellerType' | translate}}:</h5>\n          <div class=\"col-sm-9\">\n              <div class=\"clearfix\"></div>\n              <label class=\"cust-radio\">\n                <input disabled type=\"radio\" formControlName=\"seller_type\" (change)=\"setValue('seller_type', 1)\" value=\"1\" [checked]=\"model.seller_type == 1 ? 'checked' : ''\" name=\"seller_type\">\n                <span class=\"checkmark\">{{'addCollection.person' | translate}}</span>\n              </label>\n              <label class=\"cust-radio\">\n                <input disabled type=\"radio\" formControlName=\"seller_type\" (change)=\"setValue('seller_type', 2)\" value=\"2\" [checked]=\"model.seller_type == 2 ? 'checked' : ''\" name=\"seller_type\">\n                <span class=\"checkmark\">{{'addCollection.legalEntity' | translate}}</span>\n              </label>\n              <label class=\"cust-radio\">\n                <input disabled type=\"radio\" formControlName=\"seller_type\" (change)=\"setValue('seller_type', 3)\" value=\"3\" [checked]=\"model.seller_type == 3 ? 'checked' : ''\" name=\"seller_type\">\n                <span class=\"checkmark\">{{'addCollection.developer' | translate}}</span>\n              </label>\n              <div class=\"clearfix\"></div>\n          </div>\n      </div>\n    </div>\n\n    <div class=\"paddingT0 padding40\">\n\n      <!-- search seller -->\n        <h5 class=\"p16-two\">{{'addCollection.SearchASellerInOurDatabase' | translate}}</h5>\n        <div class=\"searh d-flex\" >\n          <!-- (click)=\"getAllSellers('')\" -->\n          <input readonly class=\"border-right-0\" autocomplete=\"off\" type=\"text\" readonly name=\"ss\">\n          <button disabled class=\"btn\" type=\"button\">{{'addCollection.search' | translate}}</button>\n        </div>\n        <div class=\"spacer50\"></div>\n\n        <!-- complete seller details -->\n        <h5 class=\"p16-two\">{{'addCollection.completeTheSellerInfo' | translate}}</h5>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>{{ model.seller_type == 1 ? ('addCollection.name' | translate) : ('addCollection.commercialName' | translate)}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" type=\"text\" name=\"seller_name\" class=\"form-control\" formControlName=\"seller_name\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_name.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_name.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_name.errors?.minlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMin1Limit' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_name.errors?.maxlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMax50Limit' | translate}}\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.seller_type !=2 \">\n            <div class=\"form-group-3\">\n              <label>{{ model.seller_type == 1 ? ('addCollection.firstSurname' | translate) : ('addCollection.firstSurname' | translate)}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" type=\"text\" name=\"seller_first_surname\" class=\"form-control\" formControlName=\"seller_first_surname\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.seller_type !=2 \">\n            <div class=\"form-group-3\">\n              <label>{{ model.seller_type == 1 ? ('addCollection.secondSurname' | translate) : ('addCollection.secondSurname' | translate)}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" type=\"text\" name=\"seller_second_surname\" class=\"form-control\" formControlName=\"seller_second_surname\">\n            </div>\n          </div>\n          <div *ngIf=\"model.seller_type !=1 \" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>{{ 'addCollection.legalName' | translate }}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" type=\"text\" name=\"seller_legal_name\" class=\"form-control\" formControlName=\"seller_legal_name\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_legal_name.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_legal_name.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_legal_name.errors?.minlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMin1Limit' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_legal_name.errors?.maxlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMax30Limit' | translate}}\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n              <label>{{'addCollection.phonenumber' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly (keydown.space)=\"$event.preventDefault();\"\n                class=\"form-control\" type=\"text\" name=\"seller_phone\" formControlName=\"seller_phone\" autocomplete=\"off\" >\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_phone.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_phone.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_phone.errors?.pattern \" class=\"show-error\">\n                  {{'addCollectionValidations.phonePatternCheck' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_phone.errors?.minlength && !addFormStep2.controls.seller_phone.errors?.pattern\" class=\"show-error\">\n                  {{'addCollectionValidations.phoneMin8Limit' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_phone.errors?.maxlength && !addFormStep2.controls.seller_phone.errors?.pattern\" class=\"show-error\">\n                  {{'addCollectionValidations.phoneMax15Limit' | translate}}\n              </div>\n            </div>\n          </div>\n          <div *ngIf=\"model.seller_type !=1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.address' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_address\" formControlName=\"seller_address\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_address.invalid)\">\n                <div *ngIf=\"addFormStep2.controls.seller_address.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n              <div *ngIf=\"addFormStep2.controls.seller_address.errors?.minlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMin1Limit' | translate}}\n              </div>\n            </div>\n          </div>\n          <div *ngIf=\"model.seller_type==1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n              <label>{{'addCollection.email' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" (keydown.space)=\"$event.preventDefault();\" \n                class=\"form-control\" type=\"email\" name=\"seller_email\" formControlName=\"seller_email\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_email.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_email.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n             <div *ngIf=\"addFormStep2.controls.seller_email.errors?.email \" class=\"show-error\">\n                  {{'addCollectionValidations.emailInvalid' | translate}}\n              </div>\n            </div>\n          </div>\n          <div *ngIf=\"model.seller_type==1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n              <label>{{'addCollection.companyName' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_company_name\" formControlName=\"seller_company_name\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_company_name.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_company_name.errors?.minlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMin1Limit' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_company_name.errors?.maxlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMax30Limit' | translate}}\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n              <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_fed_tax\" formControlName=\"seller_fed_tax\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_fed_tax.invalid)\">\n                <div *ngIf=\"addFormStep2.controls.seller_fed_tax.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMin12Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep2.controls.seller_fed_tax.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMax13Limit' | translate}}\n                </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"spacer50\"></div>\n        <!-- bank account -->\n        <h5 class=\"p16-two\">{{'addCollection.bankAccount' | translate}}\n          <span [style.display]=\"'none'\" class=\"pull-right\"><a class=\"add\" (click)=\"addSellerBank($event)\" href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n        </h5>\n        <div formArrayName=\"collection_seller_banks\">\n        <ng-container *ngFor=\"let seller_banks of addFormStep2.get('collection_seller_banks').controls; let i=index\">\n            <div class=\"row\" [formGroupName]=\"i\">\n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.bankName' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" class=\"form-control\" minlength=\"1\" maxlength=\"30\" type=\"text\" name=\"bank_name\" formControlName=\"bank_name\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_banks.controls[i].controls.bank_name.invalid)\">\n                  <div *ngIf=\"addFormStep2.controls.collection_seller_banks.controls[i].controls.bank_name.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                  </div>  \n                    <div *ngIf=\"addFormStep2.controls.collection_seller_banks.controls[i].controls.bank_name.errors?.minlength \" class=\"show-error\">\n                        {{'addCollectionValidations.nameMin1Limit' | translate}}\n                    </div>\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_banks.controls[i].controls.bank_name.errors?.maxlength \" class=\"show-error\">\n                        {{'addCollectionValidations.nameMax30Limit' | translate}}\n                    </div>\n                </div>\n              </div> \n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.accountNumber' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" class=\"form-control\" type=\"number\" min=\"0\" name=\"account_number\" formControlName=\"account_number\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_banks.controls[i].controls.account_number.invalid)\">\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_banks.controls[i].controls.account_number.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.clabeSwift' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" (keydown.space)=\"$event.preventDefault();\" class=\"form-control\" type=\"text\" name=\"swift\" formControlName=\"swift\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_banks.controls[i].controls.swift.invalid)\">\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_banks.controls[i].controls.swift.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.currency' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <select readonly required name=\"currency_id\" formControlName=\"currency_id\" required class=\"form-control\">\n                    <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                    <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                  </select>\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_banks.controls[i].controls.currency_id.invalid)\">\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_banks.controls[i].controls.currency_id.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div [style.display]=\"'none'\" class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.remove' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <button type=\"button\" (click)=\"removeSellerBank($event, seller_banks, i)\">{{'addCollection.remove' | translate}}</button>\n                </div>\n              </div>\n            </div>\n        </ng-container>\n        </div>\n\n        <div class=\"spacer50\"></div>\n        <!-- legal Representative Info -->\n        <h5 class=\"p16-two\">{{'addCollection.legalRepresentativeInfo' | translate}}</h5>\n        <div class=\"row\" *ngIf=\"model.seller_type\">\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n              <label>{{'addCollection.name' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_leg_rep_name\" formControlName=\"seller_leg_rep_name\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_leg_rep_name.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_name.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_name.errors?.minlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMin1Limit' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_name.errors?.maxlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMax30Limit' | translate}}\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n              <label>{{'addCollection.firstSurname' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_leg_rep_first_surname\" formControlName=\"seller_leg_rep_first_surname\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n            <label>{{'addCollection.secondSurname' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_leg_rep_second_surname\" formControlName=\"seller_leg_rep_second_surname\">\n          </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n              <label>{{'addCollection.phonenumber' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" (keydown.space)=\"$event.preventDefault();\"\n                type=\"text\" name=\"seller_leg_rep_phone\" formControlName=\"seller_leg_rep_phone\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_leg_rep_phone.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_phone.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_phone.errors?.pattern \" class=\"show-error\">\n                {{'addCollectionValidations.phonePatternCheck' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_phone.errors?.minlength && !addFormStep2.controls.seller_leg_rep_phone.errors?.pattern\" class=\"show-error\">\n                {{'addCollectionValidations.phoneMin8Limit' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_phone.errors?.maxlength && !addFormStep2.controls.seller_leg_rep_phone.errors?.pattern\" class=\"show-error\">\n                {{'addCollectionValidations.phoneMax15Limit' | translate}}\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n              <label>{{'addCollection.email' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"email\" (keydown.space)=\"$event.preventDefault();\" name=\"seller_leg_rep_email\" formControlName=\"seller_leg_rep_email\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_leg_rep_email.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_email.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_email.errors?.email \" class=\"show-error\">\n                  {{'addCollectionValidations.emailInvalid' | translate}}\n              </div>\n            </div>\n          </div>\n          <div *ngIf=\"model.seller_type==1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n              <label>{{'addCollection.companyName' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_leg_rep_comp\" formControlName=\"seller_leg_rep_comp\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_leg_rep_comp.invalid)\">\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_comp.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_comp.errors?.minlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMin1Limit' | translate}}\n              </div>\n              <div *ngIf=\"addFormStep2.controls.seller_leg_rep_comp.errors?.maxlength \" class=\"show-error\">\n                  {{'addCollectionValidations.nameMax30Limit' | translate}}\n              </div>\n            </div>\n          </div>\n        <!-- </div> -->\n        <!-- <div class=\"row\"> -->\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n              <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"seller_leg_rep_fed_tax\" formControlName=\"seller_leg_rep_fed_tax\">\n            </div>\n            <div *ngIf=\"showError  &&  (addFormStep2.controls.seller_leg_rep_fed_tax.invalid)\">\n                <div *ngIf=\"addFormStep2.controls.seller_leg_rep_fed_tax.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep2.controls.seller_leg_rep_fed_tax.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMin12Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep2.controls.seller_leg_rep_fed_tax.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMax13Limit' | translate}}\n                </div>\n            </div>\n          </div>\n        </div>\n        \n        \n        <div class=\"spacer50\"></div>\n        <!-- bank account -->\n        <h5 class=\"p16-two\">{{'addCollection.bankAccount' | translate}}\n          <span [style.display]=\"'none'\" class=\"pull-right\"><a class=\"add\" (click)=\"addSellerRepBank($event)\" href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n        </h5>\n        <div formArrayName=\"collection_seller_rep_banks\">\n        <ng-container *ngFor=\"let seller_rep_banks of addFormStep2.get('collection_seller_rep_banks').controls; let i=index\">\n            <div class=\"row\" [formGroupName]=\"i\">\n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.bankName' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\" name=\"bank_name\" formControlName=\"bank_name\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.bank_name.invalid)\">\n                  <div *ngIf=\"addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.bank_name.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>  \n                  <div *ngIf=\"addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.bank_name.errors?.minlength \" class=\"show-error\">\n                        {{'addCollectionValidations.nameMin1Limit' | translate}}\n                    </div>\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.bank_name.errors?.maxlength \" class=\"show-error\">\n                        {{'addCollectionValidations.nameMax30Limit' | translate}}\n                    </div>\n                </div>\n              </div> \n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.accountNumber' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" class=\"form-control\" type=\"number\" min=\"0\" name=\"account_number\" formControlName=\"account_number\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.account_number.invalid)\">\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.account_number.errors?.required \" class=\"show-error\">\n                          {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.clabeSwift' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" class=\"form-control\" (keydown.space)=\"$event.preventDefault();\" type=\"text\" name=\"swift\" formControlName=\"swift\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.swift.invalid)\">\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.swift.errors?.required \" class=\"show-error\">\n                          {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.currency' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <select readonly required name=\"currency_id\" formControlName=\"currency_id\" required class=\"form-control\">\n                    <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                    <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                  </select>\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.currency_id.invalid)\">\n                    <div *ngIf=\"addFormStep2.controls.collection_seller_rep_banks.controls[i].controls.currency_id.errors?.required \" class=\"show-error\">\n                          {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div [style.display]=\"'none'\" class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.remove' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <button  type=\"button\" (click)=\"removeSellerRepBank($event, seller_rep_banks, i)\">{{'addCollection.remove' | translate}}</button>\n                </div>\n              </div>\n            </div>\n        </ng-container>\n        </div>\n\n\n      <div class=\"spacer15\"></div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(1)\">{{'addCollection.previous' | translate}}</button>\n            <button type=\"submit\" class=\"btn btn-primary marginL15\">{{'addCollection.next' | translate}}</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n\n\n\n\n\n\n\n\n<form autocomplete=\"off\" [formGroup]=\"addFormStep3\" (ngSubmit)=\"createCollection(addFormStep3.value, 3)\">\n    <div class=\"white-bg\" *ngIf=\"tab==3\">\n      <div class=\"page-title\">\n        <h3>{{'addCollection.chooseTheBuyer' | translate}}</h3>\n      </div>\n\n      \n      <div style=\"padding: 0px 40px;\">      \n        <div class=\"form-group-3 row\">\n            <h5 class=\"col-sm-3 p16-two\">{{'addCollection.chooseBuyerType' | translate}}:</h5>\n            <div class=\"col-sm-9\">\n                <div class=\"clearfix\"></div>\n                <label class=\"cust-radio\">\n                  <input disabled type=\"radio\" formControlName=\"buyer_type\" (change)=\"setValue('buyer_type', 1)\" value=\"1\" [checked]=\"model.buyer_type == 1 ? 'checked' : ''\" name=\"buyer_type\">\n                  <span class=\"checkmark\">{{'addCollection.person' | translate}}</span>\n                </label>\n                <label class=\"cust-radio\">\n                  <input disabled type=\"radio\" formControlName=\"buyer_type\" (change)=\"setValue('buyer_type', 2)\" value=\"2\" [checked]=\"model.buyer_type == 2 ? 'checked' : ''\" name=\"buyer_type\">\n                  <span class=\"checkmark\">{{'addCollection.legalEntity' | translate}}</span>\n                </label>\n                <label class=\"cust-radio\">\n                  <input disabled type=\"radio\" formControlName=\"buyer_type\" (change)=\"setValue('buyer_type', 3)\" value=\"3\" [checked]=\"model.buyer_type == 3 ? 'checked' : ''\" name=\"buyer_type\">\n                  <span class=\"checkmark\">{{'addCollection.developer' | translate}}</span>\n                </label>\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n      </div>\n  \n\n      <div class=\"paddingT0 padding40\">\n  \n        <!-- search -->\n          <h5 class=\"p16-two\">{{'addCollection.SearchABuyerInOurDatabase' | translate}}</h5>\n          <div class=\"searh d-flex\">\n            <!-- (click)=\"getAllSellers('')\" -->\n            <input readonly class=\"border-right-0\" autocomplete=\"off\" type=\"text\" readonly name=\"bb\">\n            <button disabled class=\"btn\" type=\"button\">{{'addCollection.search' | translate}}</button>\n          </div>\n          <div class=\"spacer50\"></div>\n  \n          <!-- complete details -->\n          <h5 class=\"p16-two\">{{'addCollection.completeTheBuyerInfo' | translate}}</h5>\n          <div class=\"row\">\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{ model.buyer_type == 1 ? ('addCollection.name' | translate) : ('addCollection.commercialName' | translate)}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" type=\"text\" name=\"buyer_name\" class=\"form-control\" formControlName=\"buyer_name\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_name.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_name.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_name.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMin1Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_name.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMax50Limit' | translate}}\n                </div>\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.buyer_type !=2 \">\n              <div class=\"form-group-3\">\n                <label>{{ model.buyer_type == 1 ? ('addCollection.firstSurname' | translate) : ('addCollection.firstSurname' | translate)}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" type=\"text\" name=\"buyer_first_surname\" class=\"form-control\" formControlName=\"buyer_first_surname\">\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.buyer_type !=2 \">\n              <div class=\"form-group-3\">\n                <label>{{ model.buyer_type == 1 ? ('addCollection.secondSurname' | translate) : ('addCollection.secondSurname' | translate)}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" type=\"text\" name=\"buyer_second_surname\" class=\"form-control\" formControlName=\"buyer_second_surname\">\n              </div>\n            </div>\n            <div *ngIf=\"model.buyer_type !=1 \" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{ 'addCollection.legalName' | translate }}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" type=\"text\" name=\"buyer_legal_name\" class=\"form-control\" formControlName=\"buyer_legal_name\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_legal_name.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_legal_name.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_legal_name.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMin1Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_legal_name.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMax30Limit' | translate}}\n                </div>\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.phonenumber' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input  readonly autocomplete=\"off\" class=\"form-control\" type=\"text\"\n                pattern=\"{{constant.phonePattern}}\" (keydown.space)=\"$event.preventDefault();\"\n                name=\"buyer_phone\" formControlName=\"buyer_phone\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_phone.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_phone.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_phone.errors?.pattern \" class=\"show-error\">\n                    {{'addCollectionValidations.phonePatternCheck' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_phone.errors?.minlength && !addFormStep3.controls.buyer_phone.errors?.pattern\" class=\"show-error\">\n                    {{'addCollectionValidations.phoneMin8Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_phone.errors?.maxlength && !addFormStep3.controls.buyer_phone.errors?.pattern\" class=\"show-error\">\n                    {{'addCollectionValidations.phoneMax15Limit' | translate}}\n                </div>\n              </div>\n            </div>\n            <div *ngIf=\"model.buyer_type !=1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.address' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"buyer_address\" formControlName=\"buyer_address\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_address.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_address.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_address.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMin1Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_address.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMax30Limit' | translate}}\n                </div>\n              </div>\n            </div>\n            <div *ngIf=\"model.buyer_type==1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.email' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" (keydown.space)=\"$event.preventDefault();\" class=\"form-control\" type=\"email\" name=\"buyer_email\" formControlName=\"buyer_email\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_email.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_email.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_email.errors?.email \" class=\"show-error\">\n                    {{'addCollectionValidations.emailInvalid' | translate}}\n                </div>\n              </div>\n            </div>\n            <div *ngIf=\"model.buyer_type==1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.companyName' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"buyer_company_name\" formControlName=\"buyer_company_name\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_company_name.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_company_name.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_company_name.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMin1Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_company_name.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMax30Limit' | translate}}\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"buyer_fed_tax\" formControlName=\"buyer_fed_tax\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_fed_tax.invalid)\">\n               <div *ngIf=\"addFormStep3.controls.buyer_fed_tax.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMin12Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_fed_tax.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMax13Limit' | translate}}\n                </div>\n              </div>\n            </div>\n          </div>\n\n\n          <div class=\"spacer50\"></div>\n          <!-- bank account -->\n          <h5 class=\"p16-two\">{{'addCollection.bankAccount' | translate}}\n            <span [style.display]=\"'none'\" class=\"pull-right\"><a class=\"add\" (click)=\"addBuyerBank($event)\" href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n          </h5>\n          <div formArrayName=\"collection_buyer_banks\">\n            <ng-container *ngFor=\"let buyer_banks of addFormStep3.get('collection_buyer_banks').controls; let i=index\">\n              <div class=\"row\" [formGroupName]=\"i\">\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.bankName' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"bank_name\" formControlName=\"bank_name\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_banks.controls[i].controls.bank_name.invalid)\">\n                  <div *ngIf=\"addFormStep3.controls.collection_buyer_banks.controls[i].controls.bank_name.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>  \n                  <div *ngIf=\"addFormStep3.controls.collection_buyer_banks.controls[i].controls.bank_name.errors?.minlength \" class=\"show-error\">\n                        {{'addCollectionValidations.nameMin1Limit' | translate}}\n                    </div>\n                    <div *ngIf=\"addFormStep3.controls.collection_buyer_banks.controls[i].controls.bank_name.errors?.maxlength \" class=\"show-error\">\n                        {{'addCollectionValidations.nameMax30Limit' | translate}}\n                    </div>\n                </div>\n              </div> \n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.accountNumber' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" class=\"form-control\" type=\"number\" min=\"0\" name=\"account_number\" formControlName=\"account_number\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_banks.controls[i].controls.account_number.invalid)\">\n                    <div *ngIf=\"addFormStep3.controls.collection_buyer_banks.controls[i].controls.account_number.errors?.required \" class=\"show-error\">\n                          {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.clabeSwift' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <input readonly required autocomplete=\"off\" class=\"form-control\" (keydown.space)=\"$event.preventDefault();\" type=\"text\" name=\"swift\" formControlName=\"swift\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_banks.controls[i].controls.swift.invalid)\">\n                    <div *ngIf=\"addFormStep3.controls.collection_buyer_banks.controls[i].controls.swift.errors?.required \" class=\"show-error\">\n                          {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.currency' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <select disabled required name=\"currency_id\" formControlName=\"currency_id\" required class=\"form-control\">\n                    <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                    <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                  </select>\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_banks.controls[i].controls.currency_id.invalid)\">\n                    <div *ngIf=\"addFormStep3.controls.collection_buyer_banks.controls[i].controls.currency_id.errors?.required \" class=\"show-error\">\n                          {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n              </div>\n              <div [style.display]=\"'none'\" class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                  <label>{{'addCollection.remove' | translate}}</label>\n                  <div class=\"clearfix\"></div>\n                  <button type=\"button\" (click)=\"removeBuyerBank($event, buyer_banks, i)\">{{'addCollection.remove' | translate}}</button>\n                </div>\n              </div>\n            </div>\n        </ng-container>\n        </div>\n\n        \n          <div class=\"spacer50\"></div>\n          <!-- legal Representative Info -->\n          <h5 class=\"p16-two\">{{'addCollection.legalRepresentativeInfo' | translate}}</h5>\n          <div class=\"row\">\n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                <label>{{'addCollection.name' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"buyer_leg_rep_name\" formControlName=\"buyer_leg_rep_name\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_leg_rep_name.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_name.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_name.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMin1Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_name.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMax30Limit' | translate}}\n                </div>\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.firstSurname' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"buyer_leg_rep_first_surname\" formControlName=\"buyer_leg_rep_first_surname\">\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n              <label>{{'addCollection.secondSurname' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"buyer_leg_rep_second_surname\" formControlName=\"buyer_leg_rep_second_surname\">\n            </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.phonenumber' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" \n                pattern=\"{{constant.phonePattern}}\" (keydown.space)=\"$event.preventDefault();\"  \n                name=\"buyer_leg_rep_phone\" formControlName=\"buyer_leg_rep_phone\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_leg_rep_phone.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_phone.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_phone.errors?.pattern \" class=\"show-error\">\n                    {{'addCollectionValidations.phonePatternCheck' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_phone.errors?.minlength && !addFormStep3.controls.buyer_leg_rep_phone.errors?.pattern\" class=\"show-error\">\n                    {{'addCollectionValidations.phoneMin8Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_phone.errors?.maxlength && !addFormStep3.controls.buyer_leg_rep_phone.errors?.pattern\" class=\"show-error\">\n                    {{'addCollectionValidations.phoneMax15Limit' | translate}}\n                </div>\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.email' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" (keydown.space)=\"$event.preventDefault();\" type=\"email\" name=\"buyer_leg_rep_email\" formControlName=\"buyer_leg_rep_email\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_leg_rep_email.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_email.errors?.required \" class=\"show-error\">\n                      {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_email.errors?.email \" class=\"show-error\">\n                    {{'addCollectionValidations.emailInvalid' | translate}}\n                </div>\n              </div>\n            </div>\n            <div *ngIf=\"model.buyer_type==1\" class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.companyName' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"buyer_leg_rep_comp\" formControlName=\"buyer_leg_rep_comp\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_leg_rep_comp.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_comp.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_comp.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMin1Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_comp.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMax30Limit' | translate}}\n                </div>\n              </div>\n            </div>\n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input readonly autocomplete=\"off\" class=\"form-control\"  type=\"text\" name=\"buyer_leg_rep_fed_tax\" formControlName=\"buyer_leg_rep_fed_tax\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep3.controls.buyer_leg_rep_fed_tax.invalid)\">\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_fed_tax.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_fed_tax.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMin12Limit' | translate}}\n                </div>\n                <div *ngIf=\"addFormStep3.controls.buyer_leg_rep_fed_tax.errors?.maxlength \" class=\"show-error\">\n                    {{'addCollectionValidations.fedTaxMax13Limit' | translate}}\n                </div>\n              </div>\n            </div>\n          </div>\n        \n        \n          <div class=\"spacer50\"></div>\n          <!-- bank account -->\n          <h5 class=\"p16-two\">{{'addCollection.bankAccount' | translate}}\n            <span [style.display]=\"'none'\" class=\"pull-right\"><a class=\"add\" (click)=\"addBuyerRepBank($event)\" href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n          </h5>\n          <div formArrayName=\"collection_buyer_rep_banks\">\n          <ng-container *ngFor=\"let buyer_rep_banks of addFormStep3.get('collection_buyer_rep_banks').controls; let i=index\">\n              <div class=\"row\" [formGroupName]=\"i\">\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                    <label>{{'addCollection.bankName' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input readonly required minlength=\"1\" maxlength=\"30\" autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"bank_name\" formControlName=\"bank_name\">\n                  </div>\n                  <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.bank_name.invalid)\">\n                    <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.bank_name.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                  </div>  \n                    <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.bank_name.errors?.minlength \" class=\"show-error\">\n                          {{'addCollectionValidations.nameMin1Limit' | translate}}\n                      </div>\n                      <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.bank_name.errors?.maxlength \" class=\"show-error\">\n                          {{'addCollectionValidations.nameMax30Limit' | translate}}\n                      </div>\n                  </div>\n                </div> \n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                    <label>{{'addCollection.accountNumber' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input readonly required autocomplete=\"off\" class=\"form-control\" type=\"number\" min=\"0\" name=\"account_number\" formControlName=\"account_number\">\n                  </div>\n                  <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.account_number.invalid)\">\n                      <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.account_number.errors?.required \" class=\"show-error\">\n                            {{'addCollectionValidations.thisIsRequired' | translate}}\n                      </div>\n                      <!-- <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.account_number.errors?.maxlength \" class=\"show-error\">\n                          {{'addCollectionValidations.nameMax30Limit' | translate}}\n                      </div> -->\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                    <label>{{'addCollection.clabeSwift' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input readonly required autocomplete=\"off\" class=\"form-control\" (keydown.space)=\"$event.preventDefault();\" type=\"text\" name=\"swift\" formControlName=\"swift\">\n                  </div>\n                  <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.swift.invalid)\">\n                      <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.swift.errors?.required \" class=\"show-error\">\n                            {{'addCollectionValidations.thisIsRequired' | translate}}\n                      </div>\n                      <!-- <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.account_number.errors?.maxlength \" class=\"show-error\">\n                          {{'addCollectionValidations.nameMax30Limit' | translate}}\n                      </div> -->\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                    <label>{{'addCollection.currency' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <select disabled required name=\"currency_id\" formControlName=\"currency_id\" required class=\"form-control\">\n                      <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                      <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                    </select>\n                  </div>\n                  <div *ngIf=\"showError  &&  (addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.currency_id.invalid)\">\n                      <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.currency_id.errors?.required \" class=\"show-error\">\n                            {{'addCollectionValidations.thisIsRequired' | translate}}\n                      </div>\n                      <!-- <div *ngIf=\"addFormStep3.controls.collection_buyer_rep_banks.controls[i].controls.account_number.errors?.maxlength \" class=\"show-error\">\n                          {{'addCollectionValidations.nameMax30Limit' | translate}}\n                      </div> -->\n                  </div>\n                </div>\n                <div [style.display]=\"'none'\" class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                    <label>{{'addCollection.remove' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <button type=\"button\" (click)=\"removeBuyerRepBank($event, buyer_rep_banks, i)\">{{'addCollection.remove' | translate}}</button>\n                  </div>\n                </div>\n              </div>\n          </ng-container>\n          </div>\n          \n          \n        <div class=\"spacer15\"></div>\n  \n        <div class=\"spacer15\"></div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(2)\">{{'addCollection.previous' | translate}}</button>\n              <button type=\"submit\" class=\"btn btn-primary marginL15\">{{'addCollection.next' | translate}}</button>\n            </div>\n          </div>\n        </div>\n  \n      </div>\n    </div>\n  </form>\n\n\n\n<form autocomplete=\"off\" [formGroup]=\"addFormStep4\" (ngSubmit)=\"createCollection(addFormStep4.value, 4)\">\n  <!-- tab-4 -->\n  <div class=\"white-bg\" *ngIf=\"tab==4\">\n    <div class=\"page-title\">\n      <h3>{{'addCollection.deal' | translate}}</h3>\n    </div>\n    <div class=\"padding40\">\n      <h5>{{'addCollection.completeTheDealInfo' | translate}}</h5>\n      <div class=\"row\">\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.purchaseDate' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <p-calendar dateFormat=\"dd/M/yy\" [style]=\"{'width':'100%'}\" formControlName=\"deal_purchase_date\" class=\"sz-calendar\" \n              [locale]=\"locale\" showIcon=\"true\" (onSelect)=\"onSelect($event)\"\n              showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep4.controls.deal_purchase_date.invalid)\">\n            <div *ngIf=\"addFormStep4.controls.deal_purchase_date.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n            <label>{{'addCollection.currency' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <select required name=\"currency_id\" formControlName=\"currency_id\" required class=\"form-control\">\n              <option value=\"\">{{'addCollection.currency' | translate}}</option>\n              <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n            </select>\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep4.controls.currency_id.invalid)\">\n            <div *ngIf=\"addFormStep4.controls.currency_id.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n          </div>\n        </div>\n        \n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.price' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n              <input autocomplete=\"off\" class=\"form-control\" step=\"0.01\" type=\"number\" placeholder=\"{{'addForm.placeholder.enter' | translate}}\" formControlName=\"deal_price\" min=\"0\"\n                  name=\"deal_price\" appUptoTwoDigitDecimalNumber>\n            </div>\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep4.controls.deal_price.invalid)\">\n            <div *ngIf=\"addFormStep4.controls.deal_price.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n          </div>\n        </div>\n        \n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.sumOfPaymentConcept' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n              <input autocomplete=\"off\" class=\"form-control\" step=\"0.01\" type=\"number\" placeholder=\"{{'addForm.placeholder.enter' | translate}}\" formControlName=\"sum_of_concepts\" min=\"0\"\n                  name=\"sum_of_concepts\" appUptoTwoDigitDecimalNumber>\n            </div>\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep4.controls.deal_price.invalid)\">\n            <div *ngIf=\"addFormStep4.controls.deal_price.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" title=\"{{'addCollection.choosePaymentType' | translate}}\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.paymentChoice' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <select #selectedPaymentChoice name=\"paymentchoice\" formControlName=\"paymentchoice\" (change)=\"addPaymentChoice($event)\" class=\"form-control\">\n              <!-- <option value=\"\">Payment Choice</option> -->\n              <option value=\"{{c.id}}\" *ngFor=\"let c of paymentChoices\">{{ c.name }}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"spacer15\"></div>\n      <div formArrayName=\"payment_choices\">\n        <ng-container *ngFor=\"let payment_choice of addFormStep4.get('payment_choices').controls; let i=index\">\n         \n          <div class=\"row\" [formGroupName]=\"i\">\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <label *ngIf=\"i==0\">{{'addCollection.payments' | translate}}</label>\n              <div class=\"form-group-3\">\n                <div class=\"clearfix\"></div>\n                <input required \n                autocomplete=\"off\" class=\"form-control\" minlength=\"1\" type=\"text\" name=\"name\" formControlName=\"name\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep4.controls.payment_choices.controls[i].controls.name.invalid)\">\n                  <div *ngIf=\"addFormStep4.controls.payment_choices.controls[i].controls.name.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                  </div>\n                  <div *ngIf=\"addFormStep4.controls.payment_choices.controls[i].controls.name.errors?.minlength \" class=\"show-error\">\n                    {{'addCollectionValidations.nameMin1Limit' | translate}}\n                  </div>\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <label *ngIf=\"i==0\">{{'addCollection.category' | translate}}</label>\n              <div class=\"form-group-3\">\n                <div class=\"clearfix\"></div>\n                <!-- value=\"{{addFormStep4.controls.payment_choices.controls[i].controls.calc_payment_amount ? addFormStep4.controls.payment_choices.controls[i].controls.calc_payment_amount.value : ''}}\"  -->\n                <input readonly\n                required autocomplete=\"off\" class=\"form-control\" minlength=\"1\" type=\"text\" name=\"name1\" formControlName=\"category_name\">\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <label *ngIf=\"i==0\">&nbsp;&nbsp;</label>\n              <div class=\"form-group-3\">\n                <div class=\"clearfix\"></div>\n                <p-calendar dateFormat=\"dd/M/yy\" [style]=\"{'width':'100%'}\" formControlName=\"date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\" \n                  (onSelect)=\"onSelect($event)\" \n                  showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep4.controls.payment_choices.controls[i].controls.date.invalid)\">\n                  <div *ngIf=\"addFormStep4.controls.payment_choices.controls[i].controls.date.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                  </div>\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\" title=\"{{'addCollection.enterPercentage' | translate}}\">\n              <label *ngIf=\"i==0\">&nbsp;&nbsp;</label>\n                <div class=\"input-group form-group-3\">\n                <div class=\"clearfix\"></div>\n                <input required \n                readonly=\"{{addFormStep4.controls.payment_choices.controls[i].controls.calc_payment_amount && addFormStep4.controls.payment_choices.controls[i].controls.calc_payment_amount.value ? true : ''}}\" \n                autocomplete=\"off\" class=\"form-control\" (input)=\"getAmount(i)\" type=\"number\" step=\"0.01\" \n                placeholder=\"{{'addForm.placeholder.enter' | translate}}\" formControlName=\"percent\" min=\"0\"\n                  max=\"100\"  name=\"percent\" appUptoTwoDigitDecimalNumber>\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\n                </div>\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep4.controls.payment_choices.controls[i].controls.percent.invalid)\">\n                  <div *ngIf=\"addFormStep4.controls.payment_choices.controls[i].controls.percent.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                  </div>\n                  <div *ngIf=\"addFormStep4.controls.payment_choices.controls[i].controls.percent.errors?.max \" class=\"show-error\">\n                      {{'addCollectionValidations.percentMax100Limit' | translate}}\n                 </div>\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\" title=\"{{'addCollection.enterAmount' | translate}}\">\n             <label *ngIf=\"i==0\">&nbsp;&nbsp;</label>\n              <div class=\"input-group form-group-3\">\n                <div class=\"clearfix\"></div>\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n                  <input required \n                  readonly=\"{{addFormStep4.controls.payment_choices.controls[i].controls.calc_payment_amount && addFormStep4.controls.payment_choices.controls[i].controls.calc_payment_amount.value ? true : ''}}\"\n                    autocomplete=\"off\" class=\"form-control\" (input)=\"getPercentage(i)\" \n                    type=\"number\" step=\"0.01\" formControlName=\"amount\" min=\"0\" name=\"amount\" appUptoTwoDigitDecimalNumber>\n                </div>\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep4.controls.payment_choices.controls[i].controls.amount.invalid)\">\n                  <div *ngIf=\"addFormStep4.controls.payment_choices.controls[i].controls.amount.errors?.required \" class=\"show-error\">\n                        {{'addCollectionValidations.thisIsRequired' | translate}}\n                  </div>\n              </div>\n            </div>\n            <div class=\"col-lg-1 col-md-6 col-sm-6 col-12\">\n              <label *ngIf=\"i==0\">&nbsp;&nbsp;</label>\n              <div class=\"form-group-3\">\n                <div class=\"clearfix\"></div>\n                <button type=\"button\" (click)=\"removePaymentChoicePopup(payment_choice, i)\">\n                  <img src=\"assets/img/ic_delete.png\" alt=\"img\">\n                  <!-- {{'addCollection.remove' | translate}} -->\n                </button>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n      </div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"row\" *ngIf=\"showMonthlyInput\">\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.noOfMonthlyInstallments' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <input autocomplete=\"off\" class=\"form-control\" type=\"number\" placeholder=\"{{'addForm.placeholder.enter' | translate}}\" formControlName=\"num_of_months\" min=\"0\"\n                  name=\"num_of_months\">\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.chooseMonthlyInstallmentDate' | translate}}</label>\n            <div class=\"clearfix\"></div>\n              <p-calendar dateFormat=\"dd/M/yy\" [style]=\"{'width':'100%'}\" formControlName=\"monthly_date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\" \n              (onSelect)=\"onSelect($event)\" \n              showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n           </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"input-group form-group-3\">\n            <label>{{'addCollection.enterMonthlyAmount' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n              <input autocomplete=\"off\" class=\"form-control\" type=\"number\" step=\"0.01\" placeholder=\"{{'addForm.placeholder.enter' | translate}}\" formControlName=\"monthly_amount\" min=\"0\"\n                  name=\"monthly_amount\" appUptoTwoDigitDecimalNumber>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.done' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <button type=\"button\" (click)=\"findMonthlyInstallments()\">{{'addCollection.done' | translate}}</button>\n          </div>\n        </div>\n      </div>\n  \n      <!-- <div class=\"row\">\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.interestRate' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <input autocomplete=\"off\" class=\"form-control\" type=\"number\" formControlName=\"deal_interest_rate\" min=\"0\" max=\"100\" name=\"deal_interest_rate\">\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>{{'addCollection.penalityForLatePayment' | translate}}</label>\n            <div class=\"clearfix\"></div>\n            <input autocomplete=\"off\" class=\"form-control\" type=\"number\" formControlName=\"deal_penality\" min=\"0\" name=\"deal_penality\">\n          </div>\n        </div>\n      </div> -->\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(3)\">{{'addForm.previous' | translate}}</button>\n            <button type=\"submit\" class=\"btn btn-primary marginL15\">{{'addForm.next' | translate}}</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n<form autocomplete=\"off\" [formGroup]=\"addFormStep5\" (ngSubmit)=\"createCollection(addFormStep5.value, 5)\">\n  <!-- tab-5 -->\n  <div class=\"white-bg\" *ngIf=\"tab==5\">\n    <div class=\"page-title\">\n      <h3>{{'addCollection.commissionDetails' | translate}}</h3>\n    </div>\n    <div class=\"padding40\">\n      <h5 class=\"marginB30\">{{'addCollection.completeCommissionInfo' | translate}}</h5>\n\n      <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <label class=\"p16-two\">{{'addCollection.sozuCommission' | translate}}</label>\n          <div class=\"input-group form-group-3\">\n            <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" appUptoThreeDecimal (input)=\"getSozuAmount($event.target.value)\" step=\"0.001\" min=\"0\" max=\"100\" name=\"comm_total_commission\" formControlName=\"comm_total_commission\">\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\n            </div>\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep5.controls.comm_total_commission.invalid)\">\n            <div *ngIf=\"addFormStep5.controls.comm_total_commission.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n            <div *ngIf=\"addFormStep5.controls.comm_total_commission.errors?.max \" class=\"show-error\">\n                {{'addCollectionValidations.percentMax100Limit' | translate}}\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <label class=\"p16-two\">{{'addCollection.sozuCommissionAmount' | translate}}</label>\n          <div class=\"input-group form-group-3\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n              </div>\n              <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" appUptoTwoDigitDecimalNumber step=\"0.01\" min=\"0\" max=\"100\" name=\"comm_total_commission_amount\" formControlName=\"comm_total_commission_amount\">\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep5.controls.comm_total_commission_amount.invalid)\">\n            <div *ngIf=\"addFormStep5.controls.comm_total_commission_amount.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <label class=\"p16-two\">{{'addCollection.sozuIVACommission' | translate}}</label>\n        <div class=\"input-group form-group-3\">\n          <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" appUptoThreeDecimal \n            (input)=\"getIVAAmount($event.target.value, 'comm_total_commission_amount', 'sozu_iva_amt')\" step=\"0.001\" min=\"0\" max=\"100\" name=\"sozu_iva_percent\" formControlName=\"sozu_iva_percent\">\n          <div class=\"input-group-append\">\n            <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\n          </div>\n        </div>\n        <div *ngIf=\"showError  &&  (addFormStep5.controls.sozu_iva_percent.invalid)\">\n          <div *ngIf=\"addFormStep5.controls.sozu_iva_percent.errors?.required \" class=\"show-error\">\n                {{'addCollectionValidations.thisIsRequired' | translate}}\n          </div>\n          <div *ngIf=\"addFormStep5.controls.sozu_iva_percent.errors?.max \" class=\"show-error\">\n              {{'addCollectionValidations.percentMax100Limit' | translate}}\n          </div>\n        </div>\n      </div>\n      <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <label class=\"p16-two\">{{'addCollection.sozuIVACommissionAmount' | translate}}</label>\n        <div class=\"input-group form-group-3\">\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n            </div>\n            <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" appUptoTwoDigitDecimalNumber step=\"0.01\" min=\"0\" max=\"100\" name=\"sozu_iva_amt\" formControlName=\"sozu_iva_amt\">\n        </div>\n        <div *ngIf=\"showError  &&  (addFormStep5.controls.sozu_iva_amt.invalid)\">\n          <div *ngIf=\"addFormStep5.controls.sozu_iva_amt.errors?.required \" class=\"show-error\">\n                {{'addCollectionValidations.thisIsRequired' | translate}}\n          </div>\n        </div>\n      </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <label class=\"p16-two\">{{'addCollection.agentCommission' | translate}}</label>\n          <div class=\"input-group form-group-3\">\n            <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" appUptoThreeDecimal (input)=\"getAgentAmount($event.target.value)\" step=\"0.001\" min=\"0\" max=\"100\" name=\"comm_shared_commission\" formControlName=\"comm_shared_commission\">\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\n            </div>\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep5.controls.comm_shared_commission.invalid)\">\n            <div *ngIf=\"addFormStep5.controls.comm_shared_commission.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n            <div *ngIf=\"addFormStep5.controls.comm_shared_commission.errors?.max \" class=\"show-error\">\n                {{'addCollectionValidations.percentMax100Limit' | translate}}\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <label class=\"p16-two\">{{'addCollection.agentCommissionAmount' | translate}}</label>\n          <div class=\"input-group form-group-3\">\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n            </div>\n            <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" appUptoTwoDigitDecimalNumber step=\"0.01\" min=\"0\" max=\"100\" name=\"comm_shared_commission_amount\" formControlName=\"comm_shared_commission_amount\">\n          </div>\n          <div *ngIf=\"showError  &&  (addFormStep5.controls.comm_shared_commission_amount.invalid)\">\n            <div *ngIf=\"addFormStep5.controls.comm_shared_commission_amount.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <label class=\"p16-two\">{{'addCollection.agentIVACommission' | translate}}</label>\n        <div class=\"input-group form-group-3\">\n          <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" appUptoThreeDecimal \n          (input)=\"getIVAAmount($event.target.value, 'comm_shared_commission_amount', 'agent_iva_amt')\" step=\"0.001\" min=\"0\" max=\"100\" name=\"agent_iva_percent\" formControlName=\"agent_iva_percent\">\n          <div class=\"input-group-append\">\n            <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\n          </div>\n        </div>\n        <div *ngIf=\"showError  &&  (addFormStep5.controls.agent_iva_percent.invalid)\">\n          <div *ngIf=\"addFormStep5.controls.agent_iva_percent.errors?.required \" class=\"show-error\">\n                {{'addCollectionValidations.thisIsRequired' | translate}}\n          </div>\n          <div *ngIf=\"addFormStep5.controls.agent_iva_percent.errors?.max \" class=\"show-error\">\n              {{'addCollectionValidations.percentMax100Limit' | translate}}\n          </div>\n        </div>\n      </div>\n      <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <label class=\"p16-two\">{{'addCollection.agentIVACommissionAmount' | translate}}</label>\n        <div class=\"input-group form-group-3\">\n            <div class=\"input-group-append\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">$</span>\n            </div>\n            <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" \n            appUptoTwoDigitDecimalNumber step=\"0.01\" min=\"0\" max=\"100\" name=\"agent_iva_amt\" formControlName=\"agent_iva_amt\">\n        </div>\n        <div *ngIf=\"showError  &&  (addFormStep5.controls.agent_iva_amt.invalid)\">\n          <div *ngIf=\"addFormStep5.controls.agent_iva_amt.errors?.required \" class=\"show-error\">\n                {{'addCollectionValidations.thisIsRequired' | translate}}\n          </div>\n        </div>\n      </div>\n      </div>\n\n      <div formArrayName=\"deal_commission_agents\">\n        <ng-container *ngFor=\"let deal_commission_agent of addFormStep5.get('deal_commission_agents').controls; let i=index\">\n            <div class=\"row\" [formGroupName]=\"i\">\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                    <label>{{'addCollection.agentName' | translate}}</label>\n                    <div class=\"form-group-3\" >\n                      <!-- (click)=\"getBothBroker('')\" -->\n                      <div class=\"clearfix\"></div>\n                      <input readonly disabled required autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"name\" readonly formControlName=\"name\">\n                    </div>\n                    <div *ngIf=\"showError  &&  (addFormStep5.controls.deal_commission_agents.controls[i].controls.name.invalid)\">\n                        <div *ngIf=\"addFormStep5.controls.deal_commission_agents.controls[i].controls.name.errors?.required \" class=\"show-error\">\n                              {{'addCollectionValidations.thisIsRequired' | translate}}\n                        </div>\n                    </div>\n              </div>\n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <label>{{'addCollection.agentFirstSurName' | translate}}</label>\n                  <div class=\"form-group-3\" >\n                    <div class=\"clearfix\"></div>\n                    <input readonly disabled autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"first_surname\" readonly formControlName=\"first_surname\">\n                  </div>\n                  <div *ngIf=\"showError  &&  (addFormStep5.controls.deal_commission_agents.controls[i].controls.first_surname.invalid)\">\n                      <div *ngIf=\"addFormStep5.controls.deal_commission_agents.controls[i].controls.first_surname.errors?.required \" class=\"show-error\">\n                            {{'addCollectionValidations.thisIsRequired' | translate}}\n                      </div>\n                  </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <label>{{'addCollection.agentSecondSurName' | translate}}</label>\n                <div class=\"form-group-3\" >\n                  <div class=\"clearfix\"></div>\n                  <input readonly disabled autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"second_surname\" readonly formControlName=\"second_surname\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep5.controls.deal_commission_agents.controls[i].controls.second_surname.invalid)\">\n                    <div *ngIf=\"addFormStep5.controls.deal_commission_agents.controls[i].controls.second_surname.errors?.required \" class=\"show-error\">\n                          {{'addCollectionValidations.thisIsRequired' | translate}}\n                    </div>\n                </div>\n          </div>\n              <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}</label>\n                  <div class=\"form-group-3\">\n                  <div class=\"clearfix\"></div>\n                  <input readonly disabled autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"12\" maxlength=\"13\" name=\"fed_tax_payer_reg\" formControlName=\"fed_tax_payer_reg\">\n                </div>\n                <div *ngIf=\"showError  &&  (addFormStep5.controls.deal_commission_agents.controls[i].controls.fed_tax_payer_reg.invalid)\">\n                    <div *ngIf=\"addFormStep5.controls.deal_commission_agents.controls[i].controls.fed_tax_payer_reg.errors?.minlength \" class=\"show-error\">\n                        {{'addCollectionValidations.fedTaxMin12Limit' | translate}}\n                    </div>\n                    <div *ngIf=\"addFormStep5.controls.deal_commission_agents.controls[i].controls.fed_tax_payer_reg.errors?.maxlength \" class=\"show-error\">\n                        {{'addCollectionValidations.fedTaxMax13Limit' | translate}}\n                    </div>\n                </div>\n              </div>\n            </div>\n        </ng-container>\n      </div>\n\n      \n      <div class=\"spacer50\"></div>\n      <h5 class=\"p16-two\">{{'addCollection.bankAccount' | translate}}\n        <span class=\"pull-right\"><a class=\"add\" (click)=\"addAgentBank($event)\" href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n      </h5>\n      <div formArrayName=\"collection_agent_banks\">\n      <ng-container *ngFor=\"let agent_banks of addFormStep5.get('collection_agent_banks').controls; let i=index\">\n          <div class=\"row\" [formGroupName]=\"i\">\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.bankName' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input required autocomplete=\"off\" class=\"form-control\" minlength=\"1\" maxlength=\"30\" type=\"text\" name=\"bank_name\" formControlName=\"bank_name\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep5.controls.collection_agent_banks.controls[i].controls.bank_name.invalid)\">\n                <div *ngIf=\"addFormStep5.controls.collection_agent_banks.controls[i].controls.bank_name.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>  \n                  <div *ngIf=\"addFormStep5.controls.collection_agent_banks.controls[i].controls.bank_name.errors?.minlength \" class=\"show-error\">\n                      {{'addCollectionValidations.nameMin1Limit' | translate}}\n                  </div>\n                  <div *ngIf=\"addFormStep5.controls.collection_agent_banks.controls[i].controls.bank_name.errors?.maxlength \" class=\"show-error\">\n                      {{'addCollectionValidations.nameMax30Limit' | translate}}\n                  </div>\n              </div>\n            </div> \n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.accountNumber' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input required autocomplete=\"off\" class=\"form-control\" type=\"number\" min=\"0\" name=\"account_number\" formControlName=\"account_number\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep5.controls.collection_agent_banks.controls[i].controls.account_number.invalid)\">\n                <div *ngIf=\"addFormStep5.controls.collection_agent_banks.controls[i].controls.account_number.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>  \n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.clabeSwift' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input required autocomplete=\"off\" class=\"form-control\" (keydown.space)=\"$event.preventDefault();\" type=\"text\" name=\"swift\" formControlName=\"swift\">\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep5.controls.collection_agent_banks.controls[i].controls.swift.invalid)\">\n                <div *ngIf=\"addFormStep5.controls.collection_agent_banks.controls[i].controls.swift.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>  \n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.currency' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <select required name=\"currency_id\" formControlName=\"currency_id\" required class=\"form-control\">\n                  <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                  <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                </select>\n              </div>\n              <div *ngIf=\"showError  &&  (addFormStep5.controls.collection_agent_banks.controls[i].controls.currency_id.invalid)\">\n                <div *ngIf=\"addFormStep5.controls.collection_agent_banks.controls[i].controls.currency_id.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>  \n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                <label>{{'addCollection.remove' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <button type=\"button\" (click)=\"removeAgentBank($event, agent_banks, i)\">{{'addCollection.remove' | translate}}</button>\n              </div>\n            </div>\n          </div>\n      </ng-container>\n      </div>\n      \n      \n      <div class=\"spacer15\"></div>\n      <h5 class=\"p16-two\">{{'addCollection.collectionCommission' | translate}}</h5>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"row\">\n        \n        <div class=\"col-lg-6 col-md-12 col-sm-6 col-12\">\n          <label class=\"p16-two\">\n            <input class=\"form-control\" class=\"is_commission_sale_enabled\" type=\"checkbox\" \n            name=\"is_commission_sale_enabled\" formControlName=\"is_commission_sale_enabled\">\n            <span style=\"margin-left: 10px;    vertical-align: super;\">{{'addCollection.salecommissionCheck' | translate}}</span>\n          </label>\n        </div>\n      </div>\n      <div class=\"spacer15\"></div>\n\n      <div class=\"form-group-3 row\">\n        <h5 class=\"col-sm-3 p16-two\">{{'addCollection.whoWillReceivePaymentDirectly' | translate}}</h5>\n        <div class=\"col-sm-9\">\n            <div class=\"clearfix\"></div>\n            <label class=\"cust-radio\">\n              <input class=\"form-control\" type=\"radio\" formControlName=\"payment_received_by\" \n              value=\"1\" \n              name=\"payment_received_by\">\n              <span class=\"checkmark\">{{'addCollection.Sozu' | translate}}</span>\n            </label>\n            <label class=\"cust-radio\">\n              <input class=\"form-control\" type=\"radio\" formControlName=\"payment_received_by\" \n              value=\"0\" \n              name=\"payment_received_by\">\n              <span class=\"checkmark\">{{'addCollection.Seller' | translate}}</span>\n            </label>\n            <div class=\"clearfix\"></div>\n        </div>\n      </div>\n\n      <div class=\"form-group-3 row\">\n          <h5 class=\"col-sm-5 p16-two\">\n            {{'addCollection.defineIVA' | translate}}\n          </h5>\n          <span class=\"col-sm-1\"><input type=\"number\" class=\"form-control\" formControlName=\"iva_percent\"></span>\n          <div class=\"col-sm-12\">\n              <label class=\"p16-two\">\n                <input class=\"form-control\" class=\"is_commission_sale_enabled\" type=\"checkbox\" \n                name=\"add_iva_to_cc\" formControlName=\"add_iva_to_cc\">\n                <span style=\"margin-left: 10px;    vertical-align: super;\">{{'addCollection.adddIVAToColCommission' | translate}}</span>\n              </label>\n          </div>\n          <div class=\"col-sm-12\">\n              <div class=\"clearfix\"></div>\n              <label class=\"p16-two\">\n                <input class=\"form-control\" class=\"is_commission_sale_enabled\" type=\"checkbox\" \n                name=\"add_iva_to_pc\" formControlName=\"add_iva_to_pc\">\n                <span style=\"margin-left: 10px;    vertical-align: super;\">{{'addCollection.adddIVAToPurCommission' | translate}}</span>\n              </label>\n              <div class=\"clearfix\"></div>\n          </div>\n          <div class=\"col-sm-12\">\n              <div class=\"clearfix\"></div>\n              <label class=\"p16-two\">\n                <input class=\"form-control\" class=\"is_commission_sale_enabled\" type=\"checkbox\" \n                name=\"add_iva_to_ac\" formControlName=\"add_iva_to_ac\">\n                <span style=\"margin-left: 10px;    vertical-align: super;\">{{'addCollection.adddIVAToAgentCommission' | translate}}</span>\n              </label>\n              <div class=\"clearfix\"></div>\n          </div>\n      </div>\n\n\n      <div formArrayName=\"collection_commissions\">\n        \n      <table class=\"table table-bordered table-striped\">\n          <thead>\n              <tr>\n                <th rowspan=\"2\"><b>{{'addCollection.concept' | translate}}</b></th>\n                <th rowspan=\"2\"><b>{{'addCollection.establishedDate' | translate}}</b></th>\n                <th rowspan=\"2\"><b>{{'addCollection.amount' | translate}}</b></th>\n                <th rowspan=\"2\"><b>{{'addCollection.addCollectionCommission' | translate}}</b></th>\n                <th colspan=\"2\"><b>{{'addCollection.enterCollectionCommission' | translate}}</b></th>\n                <th rowspan=\"2\"><b>{{'addCollection.addPurchaseCommission' | translate}}</b></th>\n                <th rowspan=\"2\"><b>{{'addCollection.enterPCAmount' | translate}}</b></th>\n                <th rowspan=\"2\"><b>{{'addCollection.addAgentCommission' | translate}}</b></th>\n                <th rowspan=\"2\"><b>{{'addCollection.enterPCAmount' | translate}}</b></th>\n              </tr>\n              <tr>\n                <th colspan=\"1\"><b>{{'addCollection.percent' | translate}}</b></th>\n                <th colspan=\"1\"><b>{{'addCollection.amount' | translate}}</b></th>\n              </tr>\n          </thead>\n          <tbody>\n          \n          <ng-container *ngFor=\"let collection_commission of addFormStep5.get('collection_commissions').controls; let i=index\">\n            <tr [formGroupName]=\"i\">\n              <td>{{model.collection_commissions[i]?.name}}</td>\n              <td>{{model.collection_commissions[i]?.date | date:'dd/MMM/yyyy'}}</td>\n              <td>{{model.collection_commissions[i]?.payment_amount}}</td>\n              <td>\n                <input type=\"checkbox\" class=\"form-control\" formControlName=\"add_collection_commission\" name=\"add_collection_commission\" \n                  (change)=\"setCollectionComm(addFormStep5.controls.collection_commissions.controls[i].controls.add_collection_commission.value, i)\">\n              </td>\n              <td>\n               <input type=\"number\" class=\"form-control\" appUptoThreeDecimal formControlName=\"percent\" step=\"0.001\" name=\"percent{{i}}\" (input)=\"getCollAmount($event.target.value, i, model.collection_commissions[i].payment_amount)\">\n              </td>\n              <td>\n                <input type=\"number\" step=\"0.01\" appUptoTwoDigitDecimalNumber class=\"form-control\" \n                formControlName=\"amount\" name=\"amount{{i}}\" (input)=\"getCollPercentage($event.target.value, i, model.collection_commissions[i].payment_amount)\">\n              </td>\n              <td>\n                <input type=\"checkbox\" class=\"form-control\" formControlName=\"add_purchase_commission\" name=\"add_purchase_commission\">\n              </td>\n              <td>\n                <input type=\"number\" step=\"0.01\" appUptoTwoDigitDecimalNumber class=\"form-control\" \n                (input)=\"getPurcAmount($event.target.value, i)\"\n                formControlName=\"purchase_comm_amount\" name=\"purchase_comm_amount{{i}}\">\n              </td>\n              <td>\n                <input type=\"checkbox\" class=\"form-control\" formControlName=\"add_agent_commission\" name=\"add_agent_commission\">\n              </td>\n              <td>\n                <input type=\"number\" step=\"0.01\" appUptoTwoDigitDecimalNumber class=\"form-control\" \n                (input)=\"getAgentCommAmount($event.target.value, i)\"\n                formControlName=\"agent_comm_amount\" name=\"agent_comm_amount{{i}}\">\n              </td>\n            </tr>\n          </ng-container>\n          </tbody>\n        </table>\n      </div>\n      <div class=\"spacer50\"></div>\n\n      <div class=\"row\">\n        <div class=\"col-lg-3 col-md-3 col-12\"></div>\n        <div class=\"col-lg-6 col-md-6 col-12\">\n          <table class=\"table table-bordered table-striped\">\n            <tbody>\n              <tr>\n                <td><b>{{'addCollection.sumCC' | translate}}</b></td>\n                <td>{{ccsum | currency}}</td>\n                <td><b>{{'addCollection.sumPC' | translate}}</b></td>\n                <td>{{pcsum | currency}}</td>\n              </tr>\n              <tr>\n                <td><b>{{'addCollection.IVACC' | translate}}</b></td>\n                <td *ngIf=\"addFormStep5.controls.add_iva_to_cc.value\">{{(((addFormStep5.controls.iva_percent.value || 0)*ccsum)/100 || 0) | currency}}</td>\n                <td *ngIf=\"!addFormStep5.controls.add_iva_to_cc.value\">$0</td>\n                <td><b>{{'addCollection.IVAPC' | translate}}</b></td>\n                <td *ngIf=\"addFormStep5.controls.add_iva_to_pc.value\">{{(((addFormStep5.controls.iva_percent.value || 0)*pcsum)/100 || 0) | currency}}</td>\n                <td *ngIf=\"!addFormStep5.controls.add_iva_to_pc.value\">$0</td>\n                <!-- <td>{{(((addFormStep5.controls.iva_percent.value || 0)*pcsum)/100 || 0) | currency}}</td> -->\n              </tr>\n              <tr>\n                <td><b>{{'addCollection.TotalCC' | translate}}</b></td>\n                <td *ngIf=\"addFormStep5.controls.add_iva_to_cc.value\">{{((((addFormStep5.controls.iva_percent.value || 0)*ccsum)/100)+ccsum || 0) | currency}}</td>\n                <td *ngIf=\"!addFormStep5.controls.add_iva_to_cc.value\">{{ccsum | currency}}</td>\n                <!-- <td>{{((((addFormStep5.controls.iva_percent.value || 0)*ccsum)/100)+ccsum || 0) | currency}}</td> -->\n                <td><b>{{'addCollection.TotalPC' | translate}}</b></td>\n                <td *ngIf=\"addFormStep5.controls.add_iva_to_pc.value\">{{((((addFormStep5.controls.iva_percent.value || 0)*pcsum)/100)+pcsum || 0) | currency}}</td>\n                <td *ngIf=\"!addFormStep5.controls.add_iva_to_pc.value\">{{pcsum | currency}}</td>\n                <!-- <td>{{((((addFormStep5.controls.iva_percent.value || 0)*pcsum)/100)+pcsum || 0) | currency}}</td> -->\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(4)\">{{'addForm.previous' | translate}}</button>\n            <button type=\"submit\" class=\"btn btn-primary marginL15\">{{'addForm.next' | translate}}</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n<form autocomplete=\"off\" ngNativeValidate #addFormStep6=\"ngForm\" (ngSubmit)=\"saveCollectionFolders()\">\n    <!-- tab-5 -->\n    <div class=\"white-bg\" *ngIf=\"tab==6\">\n      <div class=\"page-title\">\n        <h3>{{'addCollection.tabs.uploadDocuments' | translate}}</h3>\n      </div>\n      <div class=\"padding40\">\n        <h5 class=\"marginB30\">{{'addCollection.folders' | translate}}\n          <span class=\"pull-right\">\n            <a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add-folder\" #folderModalOpen></a>\n          <a class=\"add\" href=\"javascript://\" (click)=\"openAddFolder('add', '', '')\">\n            {{'addCollection.addNewFolder' | translate}}</a>\n          </span>\n        </h5>\n  \n        <div class=\"row\" >\n          <ng-container *ngFor=\"let folder of collectionFolders; let i=index\">\n            <div class=\"col-lg-2 col-md-4 col-sm-6 col-12 folder-box\" style=\"background-image: url('/assets/img/ic_folder.svg')\">\n              \n              <div class=\"form-group-3\" (click)=\"modelOpenFun(folder, i)\">\n                <p>{{folder.name}}</p>\n              </div>\n              <div class=\"folder-action-btn\">\n                <!-- <button class=\"cursor-pointer\" type=\"button\"  (click)=\"modelOpenFun(folder, i)\"> -->\n                <!-- {{'addCollection.view' | translate}} -->\n                <i (click)=\"modelOpenFun(folder, i)\" class=\"fa fa-folder\" aria-hidden=\"true\"></i>\n              <!-- </button>\n              <button class=\"cursor-pointer\" type=\"button\"  (click)=\"openAddFolder('edit', folder, i)\">\n                {{'addCollection.edit' | translate}} -->\n                <i *ngIf=\"folder.id != payment_folder_id\" (click)=\"openAddFolder('edit', folder, i)\" class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n              <!-- </button>\n              <button class=\"cursor-pointer\" type=\"button\"  (click)=\"deleteFolderPopup(folder, i)\">\n                {{'addCollection.delete' | translate}} -->\n                <i *ngIf=\"folder.id != payment_folder_id\" (click)=\"deleteFolderPopup(folder, i)\" class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n              <!-- </button> -->\n              </div>\n            </div>\n          </ng-container>\n        </div>\n\n        <div class=\"spacer50\"></div>\n  \n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(5)\">{{'addForm.previous' | translate}}</button>\n              <button type=\"submit\" class=\"btn btn-primary marginL15\">{{'addForm.submit' | translate}}</button>\n            </div>\n          </div>\n        </div>\n  \n      </div>\n    </div>\n  </form>\n  \n\n\n<!-- Link Seller -->\n<a data-toggle=\"modal\" data-target=\"#link-user-model\" #linkUserModal></a>\n<div class=\"modal\" id=\"link-user-model\">\n   <div class=\"modal-dialog \">\n      <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">{{tab==2 ? ('addCollection.chooseTheSeller' | translate) : ('addCollection.chooseTheBuyer' | translate)}}</h4>\n            <button type=\"button\" class=\"close\" #closeLinkUserModal data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n\n              <div class=\"row\">\n                <div class=\"col-md-8 col-6\">\n                    <input autocomplete=\"off\" style=\"max-width:200px\" (keyup.enter)=\"getAllSellers(keyword)\" [(ngModel)]=\"keyword\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                </div>\n                <div class=\"col-md-4 col-5 btn-cont\">\n                    <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"getAllSellers(keyword)\">{{'table.th.search' | translate}}</a>\n                </div>\n              </div>\n              \n               <div class=\"spacer40\"></div>\n               <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                  <table class=\"table\">\n                     <tr *ngFor=\"let item of allUsers\">\n                        <td>\n                           <div class=\"n-avail-profile\">\n                           <img *ngIf=\"item?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"item?.image| img:'thumb'\" [lazyLoad]=\"item?.image\">\n                           <img *ngIf=\"!item?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                           \n                           <div class=\"n-avail-info\">\n                              <p class=\"p12\">{{item?.name ? item?.name : item?.comm_name}}</p>\n                              <p class=\"p10\">{{'viewProperty.phone' | translate}} : {{item?.dial_code ? item?.dial_code : constant.dial_code}}-{{item?.phone}}</p>\n                           </div>\n                           </div>\n                        </td>\n                        <td>\n                           <button type=\"button\" (click)=\"setSeller(item)\" class=\"action-icon\"> \n                             <img src=\"assets/img/green-icon.png\" alt=\"img\">\n                            </button>\n                           <button type=\"button\" (click)=\"unsetSeller(item)\" class=\"action-icon\">\n                              <img src=\"assets/img/ic_disapprove.png\" alt=\"img\">\n                            </button>\n                        </td>\n                     </tr>\n                     <tr *ngIf=\"allUsers?.length==0\">\n                        <p class=\"show-not-found\">\n                           {{'viewProperty.noSellerHasRequestedForTheProperty' | translate}}\n                        </p>\n                     </tr>\n                  </table>\n               </div>\n            </div>\n      </div>\n   </div>\n</div>\n  \n\n\n<!-- Link External Broker -->\n<a data-toggle=\"modal\" data-target=\"#link-broker-model\" #linkExtBrokerModal></a>\n<div class=\"modal\" id=\"link-broker-model\">\n   <div class=\"modal-dialog \">\n      <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">{{'viewProperty.linkAgent' | translate}}</h4>\n            <button type=\"button\" class=\"close\" #closeExtBrokerModal data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n\n               <!-- <p class=\"modal-title\" *ngIf=\"property?.external_broker?.id\">{{'viewProperty.currentlyLinkedToAgent' | translate}} - <b>{{property?.external_broker?.name}}</b></p> -->\n\n               <div class=\"row\">\n                  <div class=\"col-md-8 col-6\">\n                     <input style=\"max-width:200px\" (keyup.enter)=\"getBothBroker(keyword)\" [(ngModel)]=\"keyword\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                 </div>\n                 <div class=\"col-md-4 col-5 btn-cont\">\n                     <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"getBothBroker(keyword)\">{{'viewProperty.search' | translate}}</a>\n                 </div>\n               </div>\n\n               <div class=\"spacer40\"></div>\n               <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                  <table class=\"table\">\n                     <tr *ngFor=\"let item of allExtBrokers\">\n                        <td>\n                           <div class=\"n-avail-profile\">\n                           <img *ngIf=\"item?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"item?.image| img:'thumb'\" [lazyLoad]=\"item?.image\">\n                           <img *ngIf=\"!item?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                           \n                           <div class=\"n-avail-info\">\n                              <p class=\"p12\">{{item?.name | titlecase}}</p>\n                              <p class=\"p10 marginB0\">{{item?.is_external_agent ? 'OUTSIDE AGENT' : 'IN-HOUSE AGENT'}}</p>\n                              <p class=\"p10\">{{'viewProperty.phone' | translate}} : {{item?.dial_code ? item?.dial_code : constant.dial_code}}-{{item?.phone}}</p>\n                           </div>\n                           </div>\n                        </td>\n                        <td>\n                           <button type=\"button\" (click)=\"setAgent(item)\" class=\"action-icon\" title=\"{{'table.title.linkAgent' | translate}}\">\n                              <img src=\"assets/img/green-icon.png\" alt=\"img\"></button>\n                           \n                           <button type=\"button\" (click)=\"unsetAgent()\" class=\"action-icon\" title=\"{{'table.title.unlinkAgent' | translate}}\">\n                              <img src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n                        </td>\n                     </tr>\n                     <tr *ngIf=\"allExtBrokers?.length==0\">\n                        <p class=\"show-not-found\">{{'viewProperty.noExternalAgentFound' | translate}}</p>\n                     </tr>\n                  </table>\n               </div>\n            </div>\n      </div>\n   </div>\n</div>\n\n\n\n<!-- add note modal -->\n<div class=\"modal animated\" id=\"add-folder\">\n    <div class=\"modal-dialog fadeIndown\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">{{'addCollection.folderName' | translate}}</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #folderModalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeFolderModal()\">&times;</button>\n        </div>\n  \n        <form autocomplete=\"off\" class=\"form-horizontal form-model0P form-model-newP\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addFolder(); addForm.reset();\">\n          <div class=\"modal-body modal-body-new\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <div class=\"form-group\">\n                      <input autocomplete=\"off\" maxlength=\"20\" required class=\"form-control note\" name=\"folderName\" [(ngModel)]=\"folderName\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"btn-cont text-right\">\n                      <button *ngIf=\"!selectedFolder.id else UpdateNote\" type=\"submit\" class=\"btn btn-primary\">{{'commonBlock.addBtn' | translate}}</button>\n                      <ng-template #UpdateNote>\n                          <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'commonBlock.updateBtn' | translate}}</button>\n                      </ng-template>\n                  </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n\n\n  <a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#collection-notes\" #docsModalOpen></a>\n  <div class=\"modal animated\" id=\"collection-notes\">\n        <div class=\"modal-dialog fadeIndown\">\n              <div class=\"modal-content notary-avail\">\n                    <div class=\"modal-header popup-header\">\n                          <h4>{{folderName}}</h4>\n                          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #docsModalClose>&times;</button>\n                          <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n                    </div>\n  \n                    <div class=\"modal-body\">\n                          <div class=\"white-bg\">\n                                <div class=\"row\">\n                                      <div class=\"col-8\">\n                                            <p class=\"p16 marginB0\">{{'addCollection.addDocxNameAndChooseFile' | translate}}</p>\n                                      </div>\n                                      <div class=\"col-4 text-right\">\n                                            <a class=\"add\" href=\"javascript://\" (click)=\"addDocs()\">\n                                              <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                                              {{'commonBlock.add' | translate}}\n                                            </a>\n  \n                                            <ng-template #noAddPermissiom>\n                                                  <a class=\"add\" href=\"javascript://\">{{'commonBlock.add' | translate}}</a>\n                                            </ng-template>\n                                      </div>\n                                </div>\n                          </div>\n                          <div class=\"form-group-2\">\n                                <div class=\"form-group\">\n                                  <input type=\"text\" autocomplete=\"off\" name=\"docsName\" [(ngModel)]=\"docsName\">\n                                </div>\n                          </div>\n                          <div class=\"form-group-2\">\n                                <div class=\"form-group\">\n                                  <input type=\"file\" name=\"docFile\" #docsFile\n                                  accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                                  (change)=\"onSelectFile($event.target.files)\">\n                                </div>\n                          </div>\n                          <div *ngIf=\"docs?.length!=0\" [ngStyle]=\"{'max-height':sent_as === 1 ? '250px' : '' }\" class=\"write-note white-bg\"\n                                malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                                <div class=\"wn-block\" *ngFor=\"let item of docs; let i=index\">\n                                      <div class=\"circle\">\n                                            <span></span>\n                                      </div>\n\n                                      <a class=\"edit\" href=\"javascript://\" (click)=\"editDocsPopup(item, i, s)\">{{'addCollection.edit' | translate}}</a>\n\n                                      <a class=\"delete\" href=\"javascript://\" (click)=\"deleteDocsPopup(item, i)\" *ngIf=\"payment_folder_id != folderId\">{{'commonBlock.delete' | translate}}</a>\n  \n                                      <ng-template #noDeletePermissiom>\n                                            <a class=\"delete\" href=\"javascript://\" *ngIf=\"payment_folder_id != p.id\">{{'commonBlock.delete' | translate}}</a>\n                                      </ng-template>\n                                      <p class=\"time\" title=\"'Click to view'\">\n                                        <a target=\"_blank\" href=\"{{item.display_name}}\">\n                                            {{item?.name}}\n                                        </a></p>\n                                      <!-- <pre class=\"p13\" *ngIf=\"!item.show\">{{item.note.slice(0, 90)}} <span class=\"read-more\" *ngIf=\"item.note.length>100\" (click)=\"item.show=true\">Read more</span></pre>\n                                      <pre class=\"p13\" *ngIf=\"item.show\">{{item.note}}</pre> -->\n                                </div>\n                          </div>\n                          <div *ngIf=\"docs?.length==0\" class=\"write-note white-bg\" [ngStyle]=\"{'height':sent_as === 1 ? '230px' : '245px' }\">\n                                <p class=\"show-not-found\">\n                                      {{'message.error.noDocumentFound' | translate}}\n                                </p>\n                          </div>\n                    </div>\n              </div>\n        </div>\n  </div>\n\n  <!-- Trigger the modal with a button -->\n<button type=\"button\" style=\"display: none;\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\"\n#localityOpen>Open Modal</button>\n\n<!-- Modal -->\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n<div class=\"modal-dialog\">\n\n  <!-- Modal content-->\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <button type=\"button\" class=\"close\" (click)=\"closeEditModal()\">&times;</button>\n      <h4 class=\"modal-title\"> {{'editDocName.title' | translate}}</h4>\n    </div>\n    <form class=\"form-horizontal form-model0P\" role=\"form\" novalidate #addForm=\"ngForm\"\n      (ngSubmit)=\"checkIfLocalitySpanishNameEntered(addForm)\">\n      <div class=\"modal-body model-body10P\">\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"{{'editDocName.name' | translate}}\"\n            id=\"name_en\" required [(ngModel)]=\"modelForDoc.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n        </div>\n\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary-new\">{{'editDocName.submit' | translate}}</button>\n        <button style=\"display:none;\" type=\"button\" class=\"btn btn-default\" #localityClose\n          data-dismiss=\"modal\">{{'addForm.close' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"closeEditModal()\">{{'editDocName.close' | translate}}</button>\n      </div>\n    </form>\n\n  </div>\n\n</div>\n</div>"

/***/ }),

/***/ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/layout/collections/add-edit-collection/add-edit-collection.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: AddEditCollectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditCollectionComponent", function() { return AddEditCollectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_models_addProject_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/addProject.model */ "./src/app/models/addProject.model.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/addProperty.model */ "./src/app/models/addProperty.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_http_interceptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/http-interceptor */ "./src/app/services/http-interceptor.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/models/collection.model */ "./src/app/models/collection.model.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var src_app_models_document_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/models/document.model */ "./src/app/models/document.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AddEditCollectionComponent = /** @class */ (function () {
    function AddEditCollectionComponent(model, us, cs, router, building, constant, route, spinner, translate, fb, toastr, modelForDoc) {
        this.model = model;
        this.us = us;
        this.cs = cs;
        this.router = router;
        this.building = building;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.fb = fb;
        this.toastr = toastr;
        this.modelForDoc = modelForDoc;
        this.parameter = {};
        this.url2 = [];
        this.urlImg360 = [];
        this.showBuilding = false;
        this.amenityList = [];
        this.amen = '';
        this.bankList = [];
        this.bank = '';
        this.imageEvent = [];
        this.showText = false;
        this.showSearch = false;
        this.buildingName = '';
        this.propertyDetails = false;
        this.editMode = false;
        this.newcarpet_area = { area: '', price: '' };
        this.newcustom_attribute = { name: '', value: '' };
        this.buildingLoading = false;
        this.selectedFolder = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.payment_folder_id = 0;
        this.availabilityStatus = [
            { id: '1', name: this.translate.instant('leadDetails.purchase'), checked: false },
            { id: '2', name: this.translate.instant('leadDetails.rent'), checked: false }
        ];
    }
    AddEditCollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectionFolders = [];
        this.model = new src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_12__["Collection"]();
        this.model.building = new src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_5__["Building"]();
        this.model.building_towers = new src_app_models_addProject_model__WEBPACK_IMPORTED_MODULE_2__["Towers"]();
        this.model.seller_type = '1';
        this.model.buyer_type = '1';
        this.setDatePickerLocale();
        this.property_names = [];
        this.parameter.page = 1;
        this.parameter.itemsPerPage = this.constant.limit4;
        this.buildingData = new src_app_models_addProject_model__WEBPACK_IMPORTED_MODULE_2__["AddProjectModel"]();
        this.getAllPaymentChoices();
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.model.id = params['id'];
            if (params['id'] === '0') {
                _this.showSearch = true;
                _this.initFormStep1();
                _this.setValue('seller_type', '1');
                _this.setValue('buyer_type', '1');
                _this.initFormStep4();
                _this.initFormStep5();
            }
            else {
                _this.editCollection();
            }
        });
        this.tab = 1;
        this.getCurrencies();
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
    };
    AddEditCollectionComponent.prototype.editCollection = function () {
        this.showSearch = false;
        this.initFormStep1();
        this.initFormStep2();
        this.initFormStep3();
        this.initFormStep4();
        this.initFormStep5();
        this.getCollectionDetails(this.model.id);
    };
    AddEditCollectionComponent.prototype.getAllPaymentChoices = function () {
        var _this = this;
        this.us.postDataApi('getPaymentChoices', {})
            .subscribe(function (success) {
            _this.paymentChoices = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.setDatePickerLocale = function () {
        if (this.translate.defaultLang === 'en') {
            this.locale = {
                firstDayOfWeek: 0,
                dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                    'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'mm/dd/yy',
                weekHeader: 'Wk',
                dataType: 'string'
            };
        }
        else {
            this.locale = {
                firstDayOfWeek: 0,
                dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
                monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                today: 'Hoy',
                clear: 'Clara',
                dateFormat: 'mm/dd/yy',
                weekHeader: 'Sm',
                dataType: 'string'
            };
        }
    };
    AddEditCollectionComponent.prototype.initFormStep1 = function () {
        this.addFormStep1 = this.fb.group({
            // step 1
            building_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            building_towers_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            floor_num: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            property_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            for_sale: [''],
            for_rent: [''],
            building_configuration_id: [''],
            step: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
    };
    AddEditCollectionComponent.prototype.initFormStep2 = function () {
        this.addFormStep2 = this.fb.group({
            step: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            seller_id: [''],
            seller_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            seller_first_surname: [''],
            seller_second_surname: [''],
            seller_legal_name: [''],
            seller_address: [null],
            seller_email: [''],
            seller_phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.constant.numberPattern),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15)]],
            seller_company_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]],
            seller_fed_tax: [''],
            seller_leg_rep_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]],
            seller_leg_rep_first_surname: [''],
            seller_leg_rep_second_surname: [''],
            seller_leg_rep_phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.constant.numberPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15)]],
            seller_leg_rep_email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            seller_leg_rep_comp: [''],
            seller_leg_rep_fed_tax: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]],
            collection_seller_banks: this.fb.array([]),
            collection_seller_rep_banks: this.fb.array([]),
            seller_type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            seller_legal_entity_id: ['']
        });
    };
    AddEditCollectionComponent.prototype.setValue = function (key, value) {
        this.model[key] = value;
        if (key === 'seller_type') {
            // this.addFormStep2.reset();
            this.initFormStep2();
            this.showError = false;
            if (value != '1') {
                this.addFormStep2.controls['seller_email'].setValidators(null);
                this.addFormStep2.controls['seller_email'].updateValueAndValidity();
                this.addFormStep2.controls['seller_address'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1)]);
                this.addFormStep2.controls['seller_fed_tax'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]);
                this.addFormStep2.controls['seller_legal_name'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]);
                this.addFormStep2.controls['seller_leg_rep_name'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]);
                this.addFormStep2.controls['seller_leg_rep_phone'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.constant.numberPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15)]);
                this.addFormStep2.controls['seller_leg_rep_email'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
                // this.addFormStep2.controls['seller_leg_rep_comp'].setValidators(
                // [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
                this.addFormStep2.controls['seller_leg_rep_fed_tax'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]);
            }
            else {
                this.addFormStep2.controls['seller_email'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
                this.addFormStep2.controls['seller_fed_tax'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]);
                this.addFormStep2.controls['seller_leg_rep_comp'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]);
                this.addFormStep2.controls['seller_leg_rep_name'].setValidators(null);
                this.addFormStep2.controls['seller_leg_rep_name'].updateValueAndValidity();
                this.addFormStep2.controls['seller_leg_rep_phone'].setValidators(null);
                this.addFormStep2.controls['seller_leg_rep_phone'].updateValueAndValidity();
                this.addFormStep2.controls['seller_leg_rep_email'].setValidators(null);
                this.addFormStep2.controls['seller_leg_rep_email'].updateValueAndValidity();
                // this.addFormStep2.controls['seller_leg_rep_comp'].setValidators(null);
                // this.addFormStep2.controls['seller_leg_rep_comp'].updateValueAndValidity();
                this.addFormStep2.controls['seller_leg_rep_fed_tax'].setValidators(null);
                this.addFormStep2.controls['seller_leg_rep_fed_tax'].updateValueAndValidity();
                // this.addFormStep2.controls['seller_fed_tax'].setValidators(null);
                // this.addFormStep2.controls['seller_fed_tax'].updateValueAndValidity();
            }
        }
        else {
            this.initFormStep3();
            this.showError = false;
            if (value != '1') {
                this.addFormStep3.controls['buyer_address'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1)]);
                this.addFormStep3.controls['buyer_fed_tax'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]);
                this.addFormStep3.controls['buyer_legal_name'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]);
                this.addFormStep3.controls['buyer_leg_rep_name'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]);
                this.addFormStep3.controls['buyer_leg_rep_phone'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.constant.numberPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15)]);
                this.addFormStep3.controls['buyer_leg_rep_email'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
                // this.addFormStep3.controls['buyer_leg_rep_comp'].setValidators(
                // [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
                this.addFormStep3.controls['buyer_leg_rep_fed_tax'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]);
                this.addFormStep3.controls['buyer_email'].setValidators(null);
                this.addFormStep3.controls['buyer_email'].updateValueAndValidity();
            }
            else {
                this.addFormStep3.controls['buyer_email'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
                this.addFormStep3.controls['buyer_fed_tax'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]);
                this.addFormStep3.controls['buyer_leg_rep_comp'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]);
                this.addFormStep3.controls['buyer_leg_rep_name'].setValidators(null);
                this.addFormStep3.controls['buyer_leg_rep_name'].updateValueAndValidity();
                this.addFormStep3.controls['buyer_leg_rep_phone'].setValidators(null);
                this.addFormStep3.controls['buyer_leg_rep_phone'].updateValueAndValidity();
                this.addFormStep3.controls['buyer_leg_rep_email'].setValidators(null);
                this.addFormStep3.controls['buyer_leg_rep_email'].updateValueAndValidity();
                // this.addFormStep3.controls['buyer_leg_rep_comp'].setValidators(null);
                // this.addFormStep3.controls['buyer_leg_rep_comp'].updateValueAndValidity();
                this.addFormStep3.controls['buyer_leg_rep_fed_tax'].setValidators(null);
                this.addFormStep3.controls['buyer_leg_rep_fed_tax'].updateValueAndValidity();
            }
        }
    };
    AddEditCollectionComponent.prototype.initFormStep3 = function () {
        this.addFormStep3 = this.fb.group({
            step: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            buyer_id: [''],
            buyer_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            buyer_first_surname: [''],
            buyer_second_surname: [''],
            buyer_legal_name: [''],
            buyer_address: [null],
            buyer_email: [''],
            buyer_phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.constant.numberPattern),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15)]],
            buyer_company_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]],
            buyer_fed_tax: [''],
            buyer_leg_rep_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30)]],
            buyer_leg_rep_first_surname: [''],
            buyer_leg_rep_second_surname: [''],
            buyer_leg_rep_phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.constant.numberPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15)]],
            buyer_leg_rep_email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            buyer_leg_rep_comp: [''],
            buyer_leg_rep_fed_tax: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(13)]],
            collection_buyer_banks: this.fb.array([]),
            collection_buyer_rep_banks: this.fb.array([]),
            buyer_type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            buyer_legal_entity_id: ['']
        });
    };
    AddEditCollectionComponent.prototype.initFormStep4 = function () {
        this.addFormStep4 = this.fb.group({
            step: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            currency_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            paymentchoice: [''],
            payment_choices: this.fb.array([]),
            num_of_months: [''],
            monthly_date: [''],
            monthly_amount: [''],
            deal_purchase_date: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            deal_price: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            sum_of_concepts: [''],
            deal_interest_rate: [0],
            deal_penality: [0]
        });
    };
    AddEditCollectionComponent.prototype.initFormStep5 = function () {
        this.addFormStep5 = this.fb.group({
            // step 5
            step: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            comm_total_commission: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].max(100)]],
            comm_total_commission_amount: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            comm_shared_commission: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].max(100)]],
            comm_shared_commission_amount: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            sozu_iva_percent: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].max(100)]],
            sozu_iva_amt: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            agent_iva_percent: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].max(100)]],
            agent_iva_amt: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            iva_percent: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            add_iva_to_pc: [''],
            add_iva_to_cc: [''],
            add_iva_to_ac: [''],
            // deal_commission_agents: ['', [Validators.required]]
            deal_commission_agents: this.fb.array([]),
            collection_agent_banks: this.fb.array([]),
            collection_commissions: this.fb.array([]),
            is_commission_sale_enabled: [''],
            payment_received_by: ['']
        });
        // if (this.model.id === '0') {
        // this.addAgent('');
        // }
    };
    AddEditCollectionComponent.prototype.initFormStep6 = function () {
        this.addFormStep6 = this.fb.group({
            step: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            folderName: [''],
            collection_folders: this.fb.array([])
        });
    };
    AddEditCollectionComponent.prototype.getCollectionDetails = function (id) {
        var _this = this;
        this.spinner.show();
        this.us.postDataApi('getCollectionById', { id: id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.patchFormData(success['data']);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.getPaymentMethods = function () {
        var _this = this;
        this.us.postDataApi('getPaymentMethods', {})
            .subscribe(function (success) {
            _this.paymentMethods = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.getDealTypes = function () {
        var _this = this;
        this.us.postDataApi('getDealTypes', {})
            .subscribe(function (success) {
            _this.dealTypes = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.getCurrencies = function () {
        var _this = this;
        this.us.postDataApi('getCurrencies', {})
            .subscribe(function (success) {
            _this.currencies = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.setAvailableStatus = function (aindex) {
        // this.availabilityStatus[aindex].checked = !this.availabilityStatus[aindex].checked;
        // handling this way because data already added in db
        if (aindex === 0) {
            this.availabilityStatus[0].checked = true;
            this.availabilityStatus[1].checked = false;
            this.model.availabilityStatusId = this.availabilityStatus[0].id;
        }
        else {
            this.availabilityStatus[0].checked = false;
            this.availabilityStatus[1].checked = true;
            this.model.availabilityStatusId = this.availabilityStatus[1].id;
        }
    };
    AddEditCollectionComponent.prototype.patchFormData = function (data) {
        this.patchFormStep1(data);
        this.patchFormStep2(data, 'edit');
        this.patchFormStep3(data);
        this.patchFormStep4(data);
        this.patchFormStep5(data);
        this.setFolders(data);
    };
    AddEditCollectionComponent.prototype.patchFormStep1 = function (data) {
        this.model.building = data.property.building;
        this.model.building_towers = data.property.building_towers;
        this.model.floor_num = data.property.floor_num;
        this.model.name = data.property.name;
        this.model.availabilityStatusId = data.for_sale ? this.availabilityStatus[0].id : this.availabilityStatus[1].id;
        this.model.building_configuration_id = data.property.building_configuration_id;
        this.model.building_configuration = data.property.building_configuration;
        this.addFormStep1.controls.building_id.patchValue(data.property.building.id);
        this.addFormStep1.controls.building_towers_id.patchValue(data.property.building_towers.id);
        this.addFormStep1.controls.floor_num.patchValue(data.property.floor_num);
        this.addFormStep1.controls.property_id.patchValue(data.property_id);
        this.addFormStep1.controls.for_sale.patchValue(data.for_sale);
        this.addFormStep1.controls.for_rent.patchValue(data.for_rent);
        this.addFormStep1.controls.step.patchValue(1);
    };
    AddEditCollectionComponent.prototype.patchFormStep2 = function (data, mode) {
        var _this = this;
        this.model.seller_type = data.seller_type ? data.seller_type : '1';
        this.addFormStep2.controls.seller_type.patchValue(data.seller_type ? data.seller_type.toString() : '1');
        // as a person
        if (this.model.seller_type == '1') {
            this.addFormStep2.controls.seller_id.patchValue(data.seller ? data.seller.id : '');
            this.addFormStep2.controls.seller_company_name.patchValue(data.seller_company_name ? data.seller_company_name : '');
            this.addFormStep2.controls.seller_email.patchValue(data.seller ? data.seller.email : '');
            this.addFormStep2.controls.seller_name.patchValue(data.seller ? data.seller.name : '');
            this.addFormStep2.controls.seller_first_surname.patchValue(data.seller ? data.seller.first_surname : '');
            this.addFormStep2.controls.seller_second_surname.patchValue(data.seller ? data.seller.second_surname : '');
            this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller ? data.seller.fed_tax_pay : '');
            this.addFormStep2.controls.seller_legal_name.patchValue(data.seller_legal_name ? data.seller_legal_name : '');
            this.addFormStep2.controls.seller_address.patchValue(data.seller_address ? data.seller_address : '');
            this.addFormStep2.controls.seller_phone.patchValue(data.seller ? data.seller.phone : '');
            this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller ? data.seller.fed_tax_pay : '');
            this.addFormStep2.controls.seller_leg_rep_name.patchValue(data.seller.legal_representative ? data.seller.legal_representative.name : '');
            this.addFormStep2.controls.seller_leg_rep_first_surname.patchValue(data.seller.legal_representative ? data.seller.legal_representative.first_surname : '');
            this.addFormStep2.controls.seller_leg_rep_second_surname.patchValue(data.seller.legal_representative ? data.seller.legal_representative.second_surname : '');
            this.addFormStep2.controls.seller_leg_rep_phone.patchValue(data.seller.legal_representative ? data.seller.legal_representative.phone : '');
            this.addFormStep2.controls.seller_leg_rep_email.patchValue(data.seller.legal_representative ? data.seller.legal_representative.email : '');
            this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(data.seller.legal_representative ? data.seller.legal_representative.fed_tax_pay : '');
            this.addFormStep2.controls.seller_leg_rep_comp.patchValue(data.seller_leg_rep_comp || '');
            this.addFormStep2.controls.step.patchValue(2);
            var control_1 = this.addFormStep2.get('collection_seller_rep_banks');
            if (data.seller.legal_representative && data.seller.legal_representative.legal_rep_banks) {
                data.seller.legal_representative.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control_1.push(_this.fb.group(x));
                });
            }
            var control1_1 = this.addFormStep2.get('collection_seller_banks');
            if (data.seller.legal_rep_banks) {
                data.seller.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control1_1.push(_this.fb.group(x));
                });
            }
        }
        // seller as a developer
        if (this.model.seller_type == '3') {
            this.addFormStep2.controls.seller_id.patchValue(data.seller.id);
            this.addFormStep2.controls.seller_company_name.patchValue(data.seller_company_name ? data.seller_company_name : '');
            this.addFormStep2.controls.seller_legal_name.patchValue(data.seller.developer_company || '');
            this.addFormStep2.controls.seller_name.patchValue(data.seller.name || '');
            this.addFormStep2.controls.seller_first_surname.patchValue(data.seller ? data.seller.first_surname : '');
            this.addFormStep2.controls.seller_second_surname.patchValue(data.seller ? data.seller.second_surname : '');
            this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller ? data.seller.fed_tax_pay : '');
            this.addFormStep2.controls.seller_phone.patchValue(data.seller.phone || '');
            this.addFormStep2.controls.seller_address.patchValue(data.seller.developer_address || '');
            this.addFormStep2.controls.seller_leg_rep_name.patchValue(data.seller.legal_representative ? data.seller.legal_representative.name : '');
            this.addFormStep2.controls.seller_leg_rep_first_surname.patchValue(data.seller.legal_representative ? data.seller.legal_representative.first_surname : '');
            this.addFormStep2.controls.seller_leg_rep_second_surname.patchValue(data.seller.legal_representative ? data.seller.legal_representative.second_surname : '');
            this.addFormStep2.controls.seller_leg_rep_phone.patchValue(data.seller.legal_representative ? data.seller.legal_representative.phone : '');
            this.addFormStep2.controls.seller_leg_rep_email.patchValue(data.seller.legal_representative ? data.seller.legal_representative.email : '');
            this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(data.seller.legal_representative ? data.seller.legal_representative.fed_tax_pay : '');
            var control_2 = this.addFormStep2.get('collection_seller_rep_banks');
            if (data.seller.legal_representative && data.seller.legal_representative.legal_rep_banks) {
                data.seller.legal_representative.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control_2.push(_this.fb.group(x));
                });
            }
            var control1_2 = this.addFormStep2.get('collection_seller_banks');
            if (data.seller.legal_rep_banks) {
                data.seller.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control1_2.push(_this.fb.group(x));
                });
            }
        }
        // seller as a legal entity
        if (this.model.seller_type == '2') {
            this.addFormStep2.controls.seller_legal_entity_id.patchValue(data.seller_legal_entity.id);
            this.addFormStep2.controls.seller_name.patchValue(data.seller_legal_entity.comm_name);
            this.addFormStep2.controls.seller_legal_name.patchValue(data.seller_legal_entity.legal_name);
            this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller_legal_entity.fed_tax_pay);
            this.addFormStep2.controls.seller_phone.patchValue(data.seller_legal_entity.phone);
            this.addFormStep2.controls.seller_address.patchValue(data.seller_legal_entity.address);
            this.addFormStep2.controls.seller_leg_rep_name.patchValue(data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.name : '');
            this.addFormStep2.controls.seller_leg_rep_first_surname.patchValue(data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.first_surname : '');
            this.addFormStep2.controls.seller_leg_rep_second_surname.patchValue(data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.second_surname : '');
            this.addFormStep2.controls.seller_leg_rep_phone.patchValue(data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.phone : '');
            this.addFormStep2.controls.seller_leg_rep_email.patchValue(data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.email : '');
            this.addFormStep2.controls.seller_leg_rep_comp.patchValue('');
            this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.fed_tax_pay : '');
            var control_3 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
            control_3 = this.addFormStep2.get('collection_seller_banks');
            if (data.seller_legal_entity.legal_entity_banks) {
                data.seller_legal_entity.legal_entity_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control_3.push(_this.fb.group(x));
                });
            }
            var control1_3 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
            control1_3 = this.addFormStep2.get('collection_seller_rep_banks');
            if (data.seller_legal_entity.legal_reps && data.seller_legal_entity.legal_reps.legal_rep_banks) {
                data.seller_legal_entity.legal_reps.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control1_3.push(_this.fb.group(x));
                });
            }
        }
        if (mode == 'edit') {
            this.setSeller(data);
        }
    };
    AddEditCollectionComponent.prototype.patchFormStep3 = function (data) {
        var _this = this;
        this.model.buyer_type = data.buyer_type ? data.buyer_type : '1';
        this.addFormStep3.controls.buyer_type.patchValue(data.buyer_type ? data.buyer_type.toString() : '1');
        // as a person
        if (this.model.buyer_type == '1') {
            this.addFormStep3.controls.buyer_id.patchValue(data.buyer ? data.buyer.id : '');
            this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name ? data.buyer_company_name : '');
            this.addFormStep3.controls.buyer_email.patchValue(data.buyer ? data.buyer.email : '');
            this.addFormStep3.controls.buyer_name.patchValue(data.buyer ? data.buyer.name : '');
            this.addFormStep3.controls.buyer_first_surname.patchValue(data.buyer ? data.buyer.first_surname : '');
            this.addFormStep3.controls.buyer_second_surname.patchValue(data.buyer ? data.buyer.second_surname : '');
            this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer_legal_name ? data.buyer_legal_name : '');
            this.addFormStep3.controls.buyer_address.patchValue(data.buyer_address ? data.buyer_address : '');
            this.addFormStep3.controls.buyer_phone.patchValue(data.buyer ? data.buyer.phone : '');
            this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer ? data.buyer.fed_tax_pay : '');
            this.addFormStep3.controls.buyer_leg_rep_name.patchValue(data.buyer && data.buyer.legal_representative ?
                data.buyer.legal_representative.name : '');
            this.addFormStep3.controls.buyer_leg_rep_first_surname.patchValue(data.buyer && data.buyer.legal_representative ?
                data.buyer.legal_representative.first_surname : '');
            this.addFormStep3.controls.buyer_leg_rep_second_surname.patchValue(data.buyer && data.buyer.legal_representative ?
                data.buyer.legal_representative.second_surname : '');
            this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(data.buyer && data.buyer.legal_representative ?
                data.buyer.legal_representative.phone : '');
            this.addFormStep3.controls.buyer_leg_rep_email.patchValue(data.buyer && data.buyer.legal_representative ?
                data.buyer.legal_representative.email : '');
            this.addFormStep3.controls.buyer_leg_rep_comp.patchValue(data.buyer_leg_rep_comp || '');
            this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(data.buyer && data.buyer.legal_representative ?
                data.buyer.legal_representative.fed_tax_pay : '');
            this.addFormStep3.controls.step.patchValue(2);
            var control_4 = this.addFormStep3.get('collection_buyer_rep_banks');
            if (data.buyer.legal_representative && data.buyer.legal_representative.legal_rep_banks) {
                data.buyer.legal_representative.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control_4.push(_this.fb.group(x));
                });
            }
            var control1_4 = this.addFormStep3.get('collection_buyer_banks');
            if (data.buyer.legal_rep_banks) {
                data.buyer.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control1_4.push(_this.fb.group(x));
                });
            }
        }
        // buyer as a legal entity
        if (this.model.buyer_type == '2') {
            this.addFormStep3.controls.buyer_legal_entity_id.patchValue(data.buyer_legal_entity.id);
            this.addFormStep3.controls.buyer_name.patchValue(data.buyer_legal_entity.comm_name);
            this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer_legal_entity.legal_name);
            this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer_legal_entity.fed_tax_pay);
            this.addFormStep3.controls.buyer_phone.patchValue(data.buyer_legal_entity.phone);
            this.addFormStep3.controls.buyer_address.patchValue(data.buyer_legal_entity.address);
            this.addFormStep3.controls.buyer_leg_rep_name.patchValue(data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.name : '');
            this.addFormStep3.controls.buyer_leg_rep_first_surname.patchValue(data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.first_surname : '');
            this.addFormStep3.controls.buyer_leg_rep_second_surname.patchValue(data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.second_surname : '');
            this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.phone : '');
            this.addFormStep3.controls.buyer_leg_rep_email.patchValue(data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.email : '');
            this.addFormStep3.controls.buyer_leg_rep_comp.patchValue('');
            this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.fed_tax_pay : '');
            var control_5 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
            control_5 = this.addFormStep3.get('collection_buyer_banks');
            if (data.buyer_legal_entity.legal_entity_banks) {
                data.buyer_legal_entity.legal_entity_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control_5.push(_this.fb.group(x));
                });
            }
            var control1_5 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
            control1_5 = this.addFormStep3.get('collection_buyer_rep_banks');
            if (data.buyer_legal_entity.legal_reps && data.buyer_legal_entity.legal_reps.legal_rep_banks) {
                data.buyer_legal_entity.legal_reps.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control1_5.push(_this.fb.group(x));
                });
            }
        }
        // buyer as a developer
        if (this.model.buyer_type == '3') {
            this.addFormStep3.controls.buyer_id.patchValue(data.buyer.id);
            this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name ? data.buyer_company_name : '');
            this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer.developer_company || '');
            this.addFormStep3.controls.buyer_name.patchValue(data.buyer.name || '');
            this.addFormStep3.controls.buyer_first_surname.patchValue(data.buyer ? data.buyer.first_surname : '');
            this.addFormStep3.controls.buyer_second_surname.patchValue(data.buyer ? data.buyer.second_surname : '');
            this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer ? data.buyer.fed_tax_pay : '');
            this.addFormStep3.controls.buyer_phone.patchValue(data.buyer.phone || '');
            this.addFormStep3.controls.buyer_address.patchValue(data.buyer.developer_address || '');
            this.addFormStep3.controls.buyer_leg_rep_name.patchValue(data.buyer.legal_representative ? data.buyer.legal_representative.name : '');
            this.addFormStep3.controls.buyer_leg_rep_first_surname.patchValue(data.buyer.legal_representative ? data.buyer.legal_representative.first_surname : '');
            this.addFormStep3.controls.buyer_leg_rep_second_surname.patchValue(data.buyer.legal_representative ? data.buyer.legal_representative.second_surname : '');
            this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(data.buyer.legal_representative ? data.buyer.legal_representative.phone : '');
            this.addFormStep3.controls.buyer_leg_rep_email.patchValue(data.buyer.legal_representative ? data.buyer.legal_representative.email : '');
            this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(data.buyer.legal_representative ? data.buyer.legal_representative.fed_tax_pay : '');
            var control_6 = this.addFormStep3.get('collection_buyer_rep_banks');
            if (data.buyer.legal_representative && data.buyer.legal_representative.legal_rep_banks) {
                data.buyer.legal_representative.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control_6.push(_this.fb.group(x));
                });
            }
            var control1_6 = this.addFormStep3.get('collection_buyer_banks');
            if (data.buyer.legal_rep_banks) {
                data.buyer.legal_rep_banks.forEach(function (x) {
                    delete x.id; // no need to send id ( cuz these are saving separtely in table)
                    control1_6.push(_this.fb.group(x));
                });
            }
        }
    };
    AddEditCollectionComponent.prototype.patchFormStep4 = function (data) {
        this.addFormStep4.controls.deal_purchase_date.patchValue(data.deal_purchase_date ? this.getDateWRTTimezone(data.deal_purchase_date) : null);
        this.addFormStep4.controls.deal_price.patchValue(this.numberUptoNDecimal(data.deal_price, 2));
        this.addFormStep4.controls.currency_id.patchValue(data.currency_id ? data.currency_id : 1);
        this.addFormStep4.controls.deal_interest_rate.patchValue(data.deal_interest_rate);
        this.addFormStep4.controls.deal_penality.patchValue(data.deal_penality);
        var control1 = this.addFormStep4.get('payment_choices');
        var sum_of_concepts = 0;
        if (data.payment_choices) {
            for (var index = 0; index < data.payment_choices.length; index++) {
                var x = data.payment_choices[index];
                x.percent = this.numberUptoNDecimal(x.percent, 2);
                x.amount = this.numberUptoNDecimal(x.amount, 2);
                sum_of_concepts = sum_of_concepts + parseFloat(x.amount);
                x.date = x.date ? this.getDateWRTTimezone(x.date) : null;
                control1.push(this.fb.group(x));
            }
        }
        this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(sum_of_concepts, 2));
        this.addFormStep4.controls.step.patchValue(4);
    };
    AddEditCollectionComponent.prototype.patchFormStep5 = function (data) {
        var _this = this;
        this.addFormStep5.controls.comm_total_commission.patchValue(this.numberUptoNDecimal(data.comm_total_commission || 0, 3));
        this.addFormStep5.controls.comm_total_commission_amount.patchValue(this.numberUptoNDecimal(data.comm_total_commission_amount || 0, 2));
        this.addFormStep5.controls.is_commission_sale_enabled.patchValue(data.is_commission_sale_enabled || 0);
        this.addFormStep5.controls.payment_received_by.patchValue(data.payment_received_by.toString() || '0');
        this.addFormStep5.controls.comm_shared_commission.patchValue(this.numberUptoNDecimal(data.comm_shared_commission || 0, 3));
        this.addFormStep5.controls.comm_shared_commission_amount.patchValue(this.numberUptoNDecimal(data.comm_shared_commission_amount || 0, 2));
        this.addFormStep5.controls.sozu_iva_percent.patchValue(this.numberUptoNDecimal(data.sozu_iva_percent || 0, 3));
        this.addFormStep5.controls.sozu_iva_amt.patchValue(this.numberUptoNDecimal(data.sozu_iva_amt || 0, 2));
        this.addFormStep5.controls.agent_iva_percent.patchValue(this.numberUptoNDecimal(data.agent_iva_percent || 0, 3));
        this.addFormStep5.controls.agent_iva_amt.patchValue(this.numberUptoNDecimal(data.agent_iva_amt || 0, 2));
        this.addFormStep5.controls.iva_percent.patchValue(this.numberUptoNDecimal(data.iva_percent || 0, 3));
        this.addFormStep5.controls.add_iva_to_cc.patchValue(data.add_iva_to_cc || 0);
        this.addFormStep5.controls.add_iva_to_pc.patchValue(data.add_iva_to_pc || 0);
        this.addFormStep5.controls.add_iva_to_ac.patchValue(data.add_iva_to_ac || 0);
        // this.addFormStep5.controls.deal_commission_agents.patchValue(data.deal_commission_agents);
        var control1 = this.addFormStep5.get('deal_commission_agents');
        console.log(control1);
        if (data.deal_commission_agents && data.deal_commission_agents.length > 0) {
            for (var index = 0; index < data.deal_commission_agents.length; index++) {
                var x = data.deal_commission_agents[index].broker;
                console.log(control1);
                if (index === 0 && x) {
                    control1.push(this.fb.group(x));
                }
                else {
                    this.addAgent('');
                }
            }
        }
        else {
            this.addAgent('');
        }
        var control = this.addFormStep5.get('collection_agent_banks');
        if (data.collection_agent_banks) {
            data.collection_agent_banks.forEach(function (x) {
                control.push(_this.fb.group(x));
            });
        }
        this.setCommission(data);
        this.addFormStep5.controls.step.patchValue(5);
    };
    AddEditCollectionComponent.prototype.setCommission = function (data) {
        this.model.collection_commissions = [];
        var payment_choices = this.addFormStep4.get('payment_choices').value;
        var control1 = this.addFormStep5.get('collection_commissions');
        this.ccsum = 0;
        this.pcsum = 0;
        if (payment_choices) {
            for (var index = 0; index < payment_choices.length; index++) {
                var element = payment_choices[index];
                var element1 = data.collection_commissions[index];
                var obj = {};
                obj['id'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].id : '';
                obj['pc_id'] = element['payment_choice_id']; // payment choice dropdown id
                obj['name'] = element['name'];
                obj['category_name'] = element['category_name'];
                obj['date'] = element['date'];
                obj['payment_amount'] = element['amount'];
                obj['payment_choice_id'] = element['id'];
                obj['add_collection_commission'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].add_collection_commission : 0;
                obj['percent'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].percent : 0;
                obj['amount'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].amount : 0.00;
                obj['add_purchase_commission'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].add_purchase_commission : 0;
                obj['purchase_comm_amount'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].purchase_comm_amount : 0;
                obj['add_agent_commission'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].add_agent_commission : 0;
                obj['agent_comm_amount'] = data.collection_commissions.length > 0 &&
                    data.collection_commissions[index] ? data.collection_commissions[index].agent_comm_amount : 0;
                if (control1.length != payment_choices.length) {
                    control1.push(this.fb.group(obj));
                }
                this.model.collection_commissions.push(obj);
                console.log('obj', obj['id']);
                this.ccsum = parseFloat(this.ccsum) + (obj['amount'] && obj['add_collection_commission'] ? parseFloat(obj['amount']) : 0.00);
                this.pcsum = parseFloat(this.pcsum) + (obj['purchase_comm_amount'] && obj['add_purchase_commission'] ? parseFloat(obj['purchase_comm_amount']) : 0.00);
                this.acsum = parseFloat(this.acsum) + (obj['agent_comm_amount'] && obj['add_agent_commission'] ? parseFloat(obj['agent_comm_amount']) : 0.00);
            }
        }
    };
    AddEditCollectionComponent.prototype.setFolders = function (data) {
        this.payment_folder_id = data.payment_folder_id;
        this.collectionFolders = data['collection_folders'];
    };
    AddEditCollectionComponent.prototype.setTab = function (tab) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.movingBackCanResetInformationEnteredOnCurrentTab'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.tab = tab;
            }
        });
    };
    AddEditCollectionComponent.prototype.showSearchBox = function () {
        this.showSearch = true;
    };
    AddEditCollectionComponent.prototype.onCountryChange = function (e) {
        this.building.dev_countrycode = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddEditCollectionComponent.prototype.searchBuilding = function (keyword) {
        var _this = this;
        if (!keyword) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterSomeText'), this.translate.instant('swal.error'));
            return false;
        }
        this.showBuilding = false;
        this.buildingLoading = true;
        var input = new FormData();
        input.append('keyword', keyword);
        input.append('status', '1'); // means only approved projects
        this.us.postDataApi('searchBuilding', input)
            .subscribe(function (success) {
            _this.searchedBuildings = success['data'];
            _this.parameter.buildingCount = success['data'].length;
            if (_this.parameter.buildingCount === 0) {
                _this.showText = true;
            }
            _this.buildingLoading = false;
        }, function (error) {
            _this.buildingLoading = true;
        });
    };
    AddEditCollectionComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
    };
    AddEditCollectionComponent.prototype.showBuildingDetails = function (showBuilding) {
        this.showBuilding = showBuilding;
        this.buildingName = '';
    };
    AddEditCollectionComponent.prototype.getBuildingIndex = function (i) {
        this.searchedBuildings.forEach(function (e) {
            e.selected = false;
        });
        var searchindex = (this.parameter.page - 1) * 4 + i;
        this.searchedBuildings[searchindex].selected = true;
    };
    AddEditCollectionComponent.prototype.setBuildingId = function (building) {
        this.selectedBuilding = building;
        this.building.id = building.id;
        this.model.building_id = building.id;
    };
    AddEditCollectionComponent.prototype.setTower = function (building_towers_id) {
        for (var index = 0; index < this.searchedBuildings.length; index++) {
            if (this.searchedBuildings[index].id == this.model.building_id) {
                var bt = this.searchedBuildings[index].building_towers;
                for (var i = 0; i < bt.length; i++) {
                    if (bt[i].id == building_towers_id) {
                        this.model.building_towers = bt[i];
                    }
                }
            }
        }
    };
    AddEditCollectionComponent.prototype.buildingRequest = function () {
        var _this = this;
        if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseFillCompleteDevloperInformation'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.latitude && !this.longitude) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectLocationFromTheDropdownList'), this.translate.instant('swal.error'));
            return false;
        }
        this.building.lat = this.latitude;
        this.building.lng = this.longitude;
        if (!this.building.lat || !this.building.lng) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectLocation'), this.translate.instant('swal.error'));
            return false;
        }
        this.spinner.show();
        this.us.postDataApi('buildingRequest', this.building)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.dataCollectorWillLinkPropertyToBuilding'), _this.translate.instant('swal.success'));
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.getProperties = function ($event) {
        var _this = this;
        this.properties = [];
        $event.stopPropagation();
        this.model.floor_num = $event.target.value;
        if (!this.model.building_id) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectBuilding'), this.translate.instant('swal.error'));
            return;
        }
        else if (!this.model.building_towers.id) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectFloor'), this.translate.instant('swal.error'));
            return;
        }
        else if (!this.model.floor_num) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChooseFloor'), this.translate.instant('swal.error'));
            return;
        }
        var input = {
            building_id: this.model.building_id,
            tower_id: this.model.building_towers_id,
            floor_num: this.model.floor_num
        };
        this.us.postDataApi('getProperties', input)
            .subscribe(function (success) {
            success.data.unshift({ 'name': _this.translate.instant('message.error.pleaseChooseApartment') });
            _this.properties = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.setDealType = function (id) {
        this.model.deal_type_id = id;
    };
    AddEditCollectionComponent.prototype.setPropertyId = function (property_id) {
        var _this = this;
        this.model.property_id = property_id;
        this.model.property_id = this.addFormStep1.get('property_id').value.id;
        this.properties.map(function (p) {
            if (p.id == _this.model.property_id) {
                _this.configurations = p.building.configurations;
                _this.model.deal_price = p.min_price;
                _this.model.building_configuration_id = p.building_configuration.id;
                _this.addFormStep4.controls.deal_price.patchValue(p.min_price);
                if (p.for_sale == 1) {
                    _this.setAvailableStatus(0);
                }
                if (p.for_rent == 1) {
                    _this.setAvailableStatus(1);
                }
                _this.addFormStep5.controls.comm_total_commission.patchValue(p.total_commision ? p.total_commision : 0);
                _this.addFormStep5.controls.comm_total_commission_amount.patchValue(p.total_commision ? (p.total_commision * p.min_price) / 100 : 0);
                _this.addFormStep5.controls.is_commission_sale_enabled.patchValue(p.is_commission_sale_enabled ? 1 : 0);
                _this.addFormStep5.controls.payment_received_by.patchValue(p.payment_received_by ? '1' : '0');
                _this.addFormStep5.controls.comm_shared_commission.patchValue(p.broker_commision ? p.broker_commision : 0);
                _this.addFormStep5.controls.comm_shared_commission_amount.patchValue(p.broker_commision ? (p.broker_commision * p.min_price) / 100 : 0);
            }
        });
    };
    AddEditCollectionComponent.prototype.setConfiguration = function (con) {
        this.model.building_configuration_id = con.id;
    };
    AddEditCollectionComponent.prototype.addAgentBank = function ($event) {
        $event.stopPropagation();
        this.collectionAgentBanks.push(this.newBank());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "collectionAgentBanks", {
        get: function () {
            return this.addFormStep5.get('collection_agent_banks');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.removeAgentBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.collectionAgentBanks.removeAt(i);
        if (item.value.id) {
            this.us.postDataApi('deleteAgentBank', { id: item.value.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.addSellerBank = function ($event) {
        $event.stopPropagation();
        this.collectionSellerBanks.push(this.newBank());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "collectionSellerBanks", {
        get: function () {
            return this.addFormStep2.get('collection_seller_banks');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.removeSellerBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.collectionSellerBanks.removeAt(i);
        if (item.value.id) {
            this.us.postDataApi('deleteSellerBank', { id: item.value.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.addSellerRepBank = function ($event) {
        $event.stopPropagation();
        this.collectionSellerRepBanks.push(this.newBank());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "collectionSellerRepBanks", {
        get: function () {
            return this.addFormStep2.get('collection_seller_rep_banks');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.removeSellerRepBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.collectionSellerRepBanks.removeAt(i);
        if (item.value.id) {
            this.us.postDataApi('deleteSellerRefBank', { id: item.value.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.addBuyerRepBank = function ($event) {
        $event.stopPropagation();
        this.collectionBuyerRepBanks.push(this.newBank());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "collectionBuyerRepBanks", {
        get: function () {
            return this.addFormStep3.get('collection_buyer_rep_banks');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.removeBuyerRepBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.collectionBuyerRepBanks.removeAt(i);
        if (item.value.id) {
            this.us.postDataApi('deleteBuyerRefBank', { id: item.value.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    // buyer bank
    AddEditCollectionComponent.prototype.addBuyerBank = function ($event) {
        $event.stopPropagation();
        this.collectionBuyerBanks.push(this.newBank());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "collectionBuyerBanks", {
        get: function () {
            return this.addFormStep3.get('collection_buyer_banks');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.newBank = function () {
        return this.fb.group({
            // bank_name: ['', [Validators.required]],
            // account_number: ['', [Validators.required]],
            // swift: ['', [Validators.required]],
            // currency_id: ['', [Validators.required]]
            bank_name: [''],
            account_number: [''],
            swift: [''],
            currency_id: ['']
        });
    };
    AddEditCollectionComponent.prototype.removeBuyerBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.collectionBuyerBanks.removeAt(i);
        if (item.value.id) {
            this.us.postDataApi('deleteBuyerBank', { id: item.value.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    // end buyer bank
    AddEditCollectionComponent.prototype.addPaymentChoice = function ($event) {
        this.currentPaymentChoiceId = $event.target.value;
        $event.stopPropagation();
        this.newPaymentChoice();
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "getPaymentChoices", {
        get: function () {
            return this.addFormStep4.get('payment_choices');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.newPaymentChoice = function () {
        var _this = this;
        if (this.currentPaymentChoiceId != 5) {
            var name_1 = '';
            var payment_choice_1 = {};
            this.paymentChoices.map(function (r) {
                if (r.id == _this.currentPaymentChoiceId) {
                    name_1 = r.name;
                    payment_choice_1 = {
                        name: r.name
                    };
                }
            });
            var fb = this.fb.group({
                payment_choice_id: [this.currentPaymentChoiceId, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
                payment_choice: [payment_choice_1],
                name: [name_1, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
                category_name: [name_1, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
                date: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
                percent: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
                amount: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
                calc_payment_amount: ['']
            });
            var c = this.getPaymentChoices.push(fb);
        }
        else {
            this.showMonthlyInput = true;
        }
        this.selectedPaymentChoice.nativeElement.value = '';
    };
    AddEditCollectionComponent.prototype.findMonthlyInstallments = function () {
        this.num_of_months = this.addFormStep4.get('num_of_months').value;
        var monthly_amount = this.addFormStep4.get('monthly_amount').value;
        var monthly_date = this.addFormStep4.get('monthly_date').value;
        // calculating sum of all payment concepts
        var sum = this.addFormStep4.get('sum_of_concepts').value;
        var v = parseFloat(sum) + parseFloat((this.num_of_months * monthly_amount).toFixed(2));
        if (!this.num_of_months || !monthly_amount || !monthly_date) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterMonthlyData'), this.translate.instant('swal.error'));
            return false;
        }
        for (var index = 0; index < this.num_of_months; index++) {
            this.getPaymentChoices.push(this.newMonthlyPaymentsChoice(index));
        }
        this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(v, 2));
        this.addFormStep4.get('num_of_months').patchValue(null);
        this.addFormStep4.get('monthly_amount').patchValue(null);
        this.addFormStep4.get('monthly_date').patchValue(null);
    };
    AddEditCollectionComponent.prototype.newMonthlyPaymentsChoice = function (index) {
        var num_of_months = this.addFormStep4.get('num_of_months').value;
        var monthly_amount = this.addFormStep4.get('monthly_amount').value;
        var monthly_date = this.addFormStep4.get('monthly_date').value;
        var price = this.addFormStep4.get('deal_price').value;
        var percent = this.numberUptoNDecimal((monthly_amount * 100) / price, 2);
        monthly_amount = this.numberUptoNDecimal(monthly_amount, 2);
        var name = '';
        var payment_choice = {};
        monthly_date = moment__WEBPACK_IMPORTED_MODULE_3__(monthly_date).add(index, 'months').toDate();
        this.paymentChoices.map(function (r) {
            if (r.id == 5) {
                name = r.name + ' ' + (index + 1);
                payment_choice = {
                    name: r.name
                };
            }
        });
        return this.fb.group({
            payment_choice_id: [this.currentPaymentChoiceId, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            payment_choice: [payment_choice],
            name: [name, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            category_name: [name, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            date: [monthly_date, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            percent: [percent, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            amount: [monthly_amount, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
    };
    AddEditCollectionComponent.prototype.removePaymentChoicePopup = function (item, i) {
        var _this = this;
        if (item.value.calc_payment_amount) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.cannotRemoveAsPaymentApplied'), this.translate.instant('swal.error'));
            return;
        }
        else {
            swal({
                html: this.translate.instant('message.error.areYouSure') + '<br>' +
                    this.translate.instant('message.error.wantToRemovePaymentConcept'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.removePaymentChoice(item, i);
                }
            });
        }
    };
    AddEditCollectionComponent.prototype.removePaymentChoice = function (item, i) {
        var _this = this;
        this.getPaymentChoices.removeAt(i);
        if (item.value.id) {
            this.us.postDataApi('deletePaymentChoice', { id: item.value.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    // folder
    AddEditCollectionComponent.prototype.addFolder = function () {
        var input = {
            step: 6,
        };
        var folder_docs = {
            display_name: '',
            name: ''
        };
        if (this.mode === 'add') {
            this.collectionFolders.push({ name: this.folderName, folder_docs: [] });
        }
        else if (this.mode === 'edit') {
            if (this.selectedFolder && this.selectedFolder.id) {
                this.editFolderName(this.selectedFolder);
            }
            else {
                this.collectionFolders[this.folderIndex].name = this.folderName;
            }
        }
        this.closeFolderModal();
    };
    AddEditCollectionComponent.prototype.closeFolderModal = function () {
        this.folderName = '';
        this.folderModalClose.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.showFiles = function () {
    };
    AddEditCollectionComponent.prototype.openAddFolder = function (mode, folder, index) {
        this.mode = mode;
        if (folder) {
            this.folderIndex = index;
            this.selectedFolder = folder;
            this.folderName = folder.name;
        }
        this.folderModalOpen.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.editFolderName = function (folder) {
        var _this = this;
        this.collectionFolders[this.folderIndex]['name'] = this.folderName;
        this.us.postDataApi('updateCollectionFolder', { id: this.selectedFolder.id, name: this.folderName })
            .subscribe(function (success) {
            // this.collectionFolders[this.folderIndex]['name'] = this.folderName;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.modelOpenFun = function (folder, index) {
        this.folderIndex = index;
        this.folderName = folder.name;
        this.docs = folder.folder_docs;
        this.folderId = folder.id;
        this.docsModalOpen.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.closeModal = function () {
        this.docsModalClose.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.onSelectFile = function (files) {
        var _this = this;
        this.parameter.loading = true;
        this.cs.saveAttachment(files[0]).subscribe(function (success) {
            _this.parameter.loading = false;
            _this.docFile = success['data'].name;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddEditCollectionComponent.prototype.saveCollectionFolders = function () {
        var _this = this;
        this.spinner.show();
        this.us.postDataApi('addCollection', { id: this.model.id, step: 6, 'collection_folders': this.collectionFolders })
            .subscribe(function (success) {
            _this.spinner.hide();
            // swal({
            //   html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
            // });
            _this.router.navigate(['/dashboard/collections/view-collections']);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.addDocs = function () {
        if (!this.docsName) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuName'), this.translate.instant('swal.error'));
            return;
        }
        if (!this.docFile) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
            return;
        }
        this.docs.push({ name: this.docsName, display_name: this.docFile });
        this.docFile = '';
        this.docsName = '';
        this.docsFile.nativeElement.value = '';
    };
    AddEditCollectionComponent.prototype.deleteDocsPopup = function (item, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeleteDocs'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteDocs(item, index);
            }
        });
    };
    AddEditCollectionComponent.prototype.deleteDocs = function (item, i) {
        var _this = this;
        this.collectionFolders[this.folderIndex].folder_docs.splice(i, 1);
        if (item.id) {
            this.us.postDataApi('deleteFolderDoc', { id: item.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.deleteFolderPopup = function (item, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeleteFolder'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteFolder(item, index);
            }
        });
    };
    AddEditCollectionComponent.prototype.deleteFolder = function (item, index) {
        var _this = this;
        this.collectionFolders.splice(index, 1);
        if (item.id) {
            this.us.postDataApi('deleteCollectionFolder', { id: item.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.saveFolder = function ($event) {
        $event.stopPropagation();
        this.folders.push(this.newFolder());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "folders", {
        get: function () {
            return this.addFormStep6.get('collection_folders');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.newFolder = function () {
        return this.fb.group({
            name: [this.folderName, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            folder_docs: this.fb.array([])
        });
    };
    AddEditCollectionComponent.prototype.removeFolder = function ($event, i) {
        $event.stopPropagation();
        this.collectionBuyerBanks.removeAt(i);
    };
    // end folder
    AddEditCollectionComponent.prototype.addDocument = function ($event) {
        $event.stopPropagation();
        this.folderDocs.push(this.newDocx());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "folderDocs", {
        get: function () {
            var collFolders = this.addFormStep6.get('collection_folders');
            return collFolders.get('folder_docs');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.newDocx = function () {
        return this.fb.group({
            display_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
    };
    AddEditCollectionComponent.prototype.removeDocs = function ($event, i) {
        $event.stopPropagation();
        this.collectionBuyerBanks.removeAt(i);
    };
    // end docx
    AddEditCollectionComponent.prototype.addAgent = function ($event) {
        this.agents.push(this.newAgent());
    };
    Object.defineProperty(AddEditCollectionComponent.prototype, "agents", {
        get: function () {
            return this.addFormStep5.get('deal_commission_agents');
        },
        enumerable: true,
        configurable: true
    });
    AddEditCollectionComponent.prototype.newAgent = function () {
        return this.fb.group({
            broker_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            first_surname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            second_surname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            fed_tax_payer_reg: ['']
        });
    };
    AddEditCollectionComponent.prototype.onSelect = function (event) {
        console.log(event);
    };
    AddEditCollectionComponent.prototype.getBothBroker = function (keyword) {
        var _this = this;
        this.spinner.show();
        var input = { keyword: '' };
        input.keyword = keyword;
        this.us.postDataApi('getBothBroker', input).subscribe(function (r) {
            _this.spinner.hide();
            if (keyword === '') {
                _this.linkExtBrokerModal.nativeElement.click();
            }
            _this.allExtBrokers = r['data'];
        }, function (error) {
            _this.spinner.hide();
            _this.toastr.clear();
            _this.toastr.error(error.error.message, _this.translate.instant('swal.error'));
            // swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    AddEditCollectionComponent.prototype.setAgent = function (item) {
        var ftpr = this.addFormStep5.get('deal_commission_agents').value;
        var dca = [{
                broker_id: item.id,
                name: item.name,
                fed_tax_payer_reg: ftpr.length > 0 ? ftpr[0].fed_tax_payer_reg : ''
            }];
        this.addFormStep5.controls.deal_commission_agents.patchValue(dca);
        this.closeExtBrokerModal.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.unsetAgent = function () {
        delete this.addFormStep5.value['deal_commission_agents'];
        delete this.addFormStep5.value['collection_agent_banks'];
        delete this.addFormStep5.value.deal_commission_agents;
        var s = this.addFormStep5.get('deal_commission_agents').value;
        this.closeExtBrokerModal.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.getAllSellers = function (keyword) {
        var _this = this;
        this.spinner.show();
        var input = { name: '', user_type: 0 };
        input.name = keyword ? keyword : '';
        if (this.tab == 2 && this.model.seller_type) {
            input.user_type = this.model.seller_type;
        }
        if (this.tab == 3 && this.model.buyer_type) {
            input.user_type = this.model.buyer_type;
        }
        this.us.postDataApi('getAllBuyers', input).subscribe(function (r) {
            _this.spinner.hide();
            if (keyword === '') {
                _this.linkUserModal.nativeElement.click();
            }
            _this.allUsers = r['data'];
        }, function (error) {
            _this.spinner.hide();
            _this.toastr.clear();
            _this.toastr.error(error.error.message, _this.translate.instant('swal.error'));
        });
    };
    AddEditCollectionComponent.prototype.setSeller = function (item) {
        var _this = this;
        if (this.tab == 2) {
            // this.addFormStep2.reset();
            // this.initFormStep2();
            this.setValue('seller_type', this.model.seller_type);
            this.addFormStep2.controls.seller_type.patchValue(this.model.seller_type);
            this.model.seller_id = item.id;
            this.model.seller = item;
            // seller as a person
            if (this.model.seller_type == '1') {
                this.addFormStep2.controls.seller_id.patchValue(item.id);
                this.addFormStep2.controls.seller_name.patchValue(item.name || '');
                this.addFormStep2.controls.seller_email.patchValue(item.email || '');
                this.addFormStep2.controls.seller_phone.patchValue(item.phone || '');
            }
            // seller as a legal entity
            if (this.model.seller_type == '2') {
                this.addFormStep2.controls.seller_legal_entity_id.patchValue(item.id);
                this.addFormStep2.controls.seller_name.patchValue(item.comm_name);
                this.addFormStep2.controls.seller_legal_name.patchValue(item.legal_name);
                this.addFormStep2.controls.seller_fed_tax.patchValue(item.fed_tax_pay);
                this.addFormStep2.controls.seller_phone.patchValue(item.phone);
                this.addFormStep2.controls.seller_address.patchValue(item.address);
                this.addFormStep2.controls.seller_leg_rep_name.patchValue(item.legal_reps ? item.legal_reps.name : '');
                this.addFormStep2.controls.seller_leg_rep_phone.patchValue(item.legal_reps ? item.legal_reps.phone : '');
                this.addFormStep2.controls.seller_leg_rep_email.patchValue(item.legal_reps ? item.legal_reps.email : '');
                this.addFormStep2.controls.seller_leg_rep_comp.patchValue('');
                this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(item.legal_reps ? item.legal_reps.fed_tax_pay : '');
                var control_7 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
                control_7 = this.addFormStep2.get('collection_seller_banks');
                if (item.legal_entity_banks) {
                    item.legal_entity_banks.forEach(function (x) {
                        delete x.id; // no need to send id ( cuz these are saving separtely in table)
                        control_7.push(_this.fb.group(x));
                    });
                }
                var control1_7 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
                control1_7 = this.addFormStep2.get('collection_seller_rep_banks');
                if (item.legal_reps && item.legal_reps.legal_rep_banks) {
                    item.legal_reps.legal_rep_banks.forEach(function (x) {
                        delete x.id; // no need to send id ( cuz these are saving separtely in table)
                        control1_7.push(_this.fb.group(x));
                    });
                }
            }
            // seller as a developer
            if (this.model.seller_type == '3') {
                this.addFormStep2.controls.seller_id.patchValue(item.id);
                this.addFormStep2.controls.seller_legal_name.patchValue(item.developer_company || '');
                this.addFormStep2.controls.seller_name.patchValue(item.name || '');
                this.addFormStep2.controls.seller_fed_tax.patchValue(item.fed_tax_pay ? item.fed_tax_pay : '');
                this.addFormStep2.controls.seller_phone.patchValue(item.phone ? item.phone : '');
                this.addFormStep2.controls.seller_address.patchValue(item.developer_address ? item.developer_address : '');
                this.addFormStep2.controls.seller_leg_rep_name.patchValue(item.legal_representative ? item.legal_representative.name : '');
                this.addFormStep2.controls.seller_leg_rep_phone.patchValue(item.legal_representative ? item.legal_representative.phone : '');
                this.addFormStep2.controls.seller_leg_rep_email.patchValue(item.legal_representative ? item.legal_representative.email : '');
                this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(item.legal_representative ? item.legal_representative.fed_tax_pay : '');
                var control_8 = this.addFormStep2.get('collection_seller_rep_banks');
                if (item.legal_representative && item.legal_representative.legal_rep_banks) {
                    item.legal_representative.legal_rep_banks.forEach(function (x) {
                        delete x.id; // no need to send id ( cuz these are saving separtely in table)
                        control_8.push(_this.fb.group(x));
                    });
                }
                var control1_8 = this.addFormStep2.get('collection_seller_banks');
                if (item.legal_rep_banks) {
                    item.legal_rep_banks.forEach(function (x) {
                        delete x.id; // no need to send id ( cuz these are saving separtely in table)
                        control1_8.push(_this.fb.group(x));
                    });
                }
            }
        }
        else {
            // this.addFormStep3.reset();
            // this.initFormStep3();
            this.setValue('buyer_type', this.model.buyer_type);
            this.addFormStep3.controls.buyer_type.patchValue(this.model.buyer_type);
            this.model.buyer_id = item.id;
            this.model.buyer = item;
            // buyer as a person
            if (this.model.buyer_type == '1') {
                this.addFormStep3.controls.buyer_id.patchValue(item.id);
                this.addFormStep3.controls.buyer_name.patchValue(item.name || '');
                this.addFormStep3.controls.buyer_email.patchValue(item.email || '');
                this.addFormStep3.controls.buyer_phone.patchValue(item.phone || '');
            }
            // buyer as a legal entity
            if (this.model.buyer_type == '2') {
                this.addFormStep3.controls.buyer_legal_entity_id.patchValue(item.id);
                this.addFormStep3.controls.buyer_name.patchValue(item.comm_name);
                this.addFormStep3.controls.buyer_legal_name.patchValue(item.legal_name);
                this.addFormStep3.controls.buyer_fed_tax.patchValue(item.fed_tax_pay);
                this.addFormStep3.controls.buyer_phone.patchValue(item.phone);
                this.addFormStep3.controls.buyer_address.patchValue(item.address);
                this.addFormStep3.controls.buyer_leg_rep_name.patchValue(item.legal_reps ? item.legal_reps.name : '');
                this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(item.legal_reps ? item.legal_reps.phone : '');
                this.addFormStep3.controls.buyer_leg_rep_email.patchValue(item.legal_reps ? item.legal_reps.email : '');
                this.addFormStep3.controls.buyer_leg_rep_comp.patchValue('');
                this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(item.legal_reps ? item.legal_reps.fed_tax_pay : '');
                var control_9 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
                control_9 = this.addFormStep3.get('collection_buyer_banks');
                if (item.legal_entity_banks) {
                    item.legal_entity_banks.forEach(function (x) {
                        control_9.push(_this.fb.group(x));
                    });
                }
                var control1_9 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
                control1_9 = this.addFormStep3.get('collection_buyer_rep_banks');
                if (item.legal_reps && item.legal_reps.legal_rep_banks) {
                    item.legal_reps.legal_rep_banks.forEach(function (x) {
                        control1_9.push(_this.fb.group(x));
                    });
                }
            }
            // buyer as a developer
            if (this.model.buyer_type == '3') {
                this.addFormStep3.controls.buyer_id.patchValue(item.id);
                this.addFormStep3.controls.buyer_name.patchValue(item.name || '');
                this.addFormStep3.controls.buyer_legal_name.patchValue(item.developer_company || '');
                this.addFormStep3.controls.buyer_fed_tax.patchValue(item.fed_tax_pay || '');
                this.addFormStep3.controls.buyer_phone.patchValue(item.phone || '');
                this.addFormStep3.controls.buyer_address.patchValue(item.developer_address || '');
                this.addFormStep3.controls.buyer_leg_rep_name.patchValue(item.legal_representative ? item.legal_representative.name : '');
                this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(item.legal_representative ? item.legal_representative.phone : '');
                this.addFormStep3.controls.buyer_leg_rep_email.patchValue(item.legal_representative ? item.legal_representative.email : '');
                this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(item.legal_representative ? item.legal_representative.fed_tax_pay : '');
                var control_10 = this.addFormStep3.get('collection_buyer_rep_banks');
                if (item.legal_representative && item.legal_representative.legal_rep_banks) {
                    item.legal_representative.legal_rep_banks.forEach(function (x) {
                        delete x.id; // no need to send id ( cuz these are saving separtely in table)
                        control_10.push(_this.fb.group(x));
                    });
                }
                var control1_10 = this.addFormStep3.get('collection_buyer_banks');
                if (item.legal_rep_banks) {
                    item.legal_rep_banks.forEach(function (x) {
                        delete x.id; // no need to send id ( cuz these are saving separtely in table)
                        control1_10.push(_this.fb.group(x));
                    });
                }
            }
        }
        this.closeLinkUserModal.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.unsetSeller = function (item) {
        if (this.tab == 2) {
            this.addFormStep2.reset();
            this.model.seller_id = '';
            this.model.seller = new src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_12__["Seller"]();
        }
        else {
            this.addFormStep3.reset();
            this.model.buyer_id = '';
            this.model.buyer = new src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_12__["Seller"]();
        }
        this.closeLinkUserModal.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.getSozuAmount = function (percent) {
        var price = this.addFormStep4.get('deal_price').value;
        if (!price || price == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
            return;
        }
        var amount = this.numberUptoNDecimal((percent * price) / 100, 2);
        this.addFormStep5.controls['comm_total_commission_amount'].patchValue(amount);
    };
    AddEditCollectionComponent.prototype.getAgentAmount = function (percent) {
        var price = this.addFormStep4.get('deal_price').value;
        if (!price || price == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
            return;
        }
        var amount = this.numberUptoNDecimal((percent * price) / 100, 2);
        this.addFormStep5.controls['comm_shared_commission_amount'].patchValue(amount);
    };
    AddEditCollectionComponent.prototype.getIVAAmount = function (percent, key, key2) {
        var price = this.addFormStep5.get(key).value;
        if (!price || price == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
            return;
        }
        var amount = this.numberUptoNDecimal((percent * price) / 100, 2);
        this.addFormStep5.controls[key2].patchValue(amount);
    };
    AddEditCollectionComponent.prototype.getSozuIVAAmount = function (percent) {
        var price = this.addFormStep4.get('comm_total_commission_amount').value;
        if (!price || price == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
            return;
        }
        var amount = this.numberUptoNDecimal((percent * price) / 100, 2);
        this.addFormStep5.controls['sozu_iva_amt'].patchValue(amount);
    };
    AddEditCollectionComponent.prototype.getAgentIVAAmount = function (percent) {
        var price = this.addFormStep4.get('comm_shared_commission_amount').value;
        if (!price || price == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
            return;
        }
        var amount = this.numberUptoNDecimal((percent * price) / 100, 2);
        this.addFormStep5.controls['agent_iva_amt'].patchValue(amount);
    };
    AddEditCollectionComponent.prototype.getAmount = function (index) {
        var price = this.addFormStep4.get('deal_price').value;
        if (!price || price == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
            return;
        }
        var pcArray = this.addFormStep4.get('payment_choices').value;
        var percent = pcArray[index].percent;
        var amount = this.numberUptoNDecimal((percent * price) / 100, 2);
        pcArray[index].amount = amount;
        // this.addFormStep4.controls['payment_choices'].patchValue(pcArray);
        this.addFormStep4.controls.payment_choices['controls'][index]['controls'].amount.patchValue(amount);
        // calculating sum of all payment concepts
        var sum_of_concepts = pcArray.reduce(function (a, v) {
            return a + parseFloat(v['amount']);
        }, 0);
        this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(sum_of_concepts, 2));
    };
    AddEditCollectionComponent.prototype.getPercentage = function (index) {
        var price = this.addFormStep4.get('deal_price').value;
        if (!price || price == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
            return;
        }
        var pcArray = this.addFormStep4.get('payment_choices').value;
        var amount = this.numberUptoNDecimal(pcArray[index].amount, 2);
        var percent = this.numberUptoNDecimal((amount * 100) / price, 2);
        pcArray[index].amount = amount;
        this.addFormStep4.controls.payment_choices['controls'][index]['controls'].percent.patchValue(percent);
        // calculating sum of all payment concepts
        var sum_of_concepts = pcArray.reduce(function (a, v) {
            return a + parseFloat(v['amount']);
        }, 0);
        this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(sum_of_concepts, 2));
    };
    AddEditCollectionComponent.prototype.setCollectionComm = function (add_collection_commission, index) {
        var pcArray = this.addFormStep5.get('collection_commissions').value;
        var installOne = pcArray.find(function (r) { return r.name.includes('Monthly Installment'); });
        // if first monthly installment percent added, => update amount in all monthly installments
        if (installOne && (installOne.name == pcArray[index].name)) {
            var sta = add_collection_commission;
            for (var i = 0; i < pcArray.length; i++) {
                var e = pcArray[i];
                if (e.name.includes('Monthly Installment')) {
                    e.add_collection_commission = sta;
                    installOne.add_collection_commission = sta;
                }
            }
        }
        this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
    };
    AddEditCollectionComponent.prototype.getCollAmount = function (percent, index, payment_amount) {
        var _this = this;
        var amount = this.numberUptoNDecimal((percent * payment_amount) / 100, 2);
        var pcArray = this.addFormStep5.get('collection_commissions').value;
        pcArray[index].amount = amount;
        // const installOne = pcArray.find(r => r.pc_id == 5);
        var installOne = pcArray.find(function (r) { return r.name.includes('Monthly Installment'); });
        // if first monthly installment percent added, => update amount in all monthly installments
        this.ccsum = 0;
        this.pcsum = 0;
        if (installOne && (installOne.name === pcArray[index].name)) {
            pcArray.map(function (e) {
                // if (e.pc_id == 5) {
                if (e.name.includes('Monthly Installment')) {
                    e.amount = amount;
                    e.percent = percent;
                }
            });
        }
        pcArray.map(function (e) {
            _this.ccsum = parseFloat(_this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
            _this.pcsum = parseFloat(_this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
            _this.acsum = parseFloat(_this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
        });
        this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
    };
    AddEditCollectionComponent.prototype.getCollPercentage = function (amount, index, payment_amount) {
        var _this = this;
        var pcArray = this.addFormStep5.get('collection_commissions').value;
        var percent = this.numberUptoNDecimal((amount * 100) / payment_amount, 2);
        pcArray[index].percent = percent;
        // const installOne = pcArray.find(r => r.pc_id == 5);
        var installOne = pcArray.find(function (r) { return r.name.includes('Monthly Installment'); });
        // if first monthly installment percent added, => update amount in all monthly installments
        this.ccsum = 0;
        this.pcsum = 0;
        if (installOne && (installOne.name === pcArray[index].name)) {
            pcArray.map(function (e) {
                // if (e.pc_id == 5) {
                if (e.name.includes('Monthly Installment')) {
                    e.amount = amount;
                    e.percent = percent;
                }
            });
        }
        pcArray.map(function (e) {
            _this.ccsum = parseFloat(_this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
            _this.pcsum = parseFloat(_this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
            _this.acsum = parseFloat(_this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
        });
        this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
    };
    AddEditCollectionComponent.prototype.setPurchaseComm = function (add_purchase_commission, index) {
        var _this = this;
        var pcArray = this.addFormStep5.get('collection_commissions').value;
        var installOne = pcArray.find(function (r) { return r.name.includes('Monthly Installment'); });
        this.ccsum = 0;
        this.pcsum = 0;
        // if first monthly installment percent added, => update amount in all monthly installments
        if (installOne && (installOne.name === pcArray[index].name)) {
            var sta = add_purchase_commission;
            for (var index1 = 0; index1 < pcArray.length; index1++) {
                var e = pcArray[index1];
                if (e.name.includes('Monthly Installment')) {
                    e.add_purchase_commission = sta;
                    installOne.add_purchase_commission = sta;
                }
            }
        }
        pcArray.map(function (e) {
            _this.ccsum = parseFloat(_this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
            _this.pcsum = parseFloat(_this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
            _this.acsum = parseFloat(_this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
        });
        this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
    };
    AddEditCollectionComponent.prototype.getPurcAmount = function (amount, index) {
        var _this = this;
        var pcArray = this.addFormStep5.get('collection_commissions').value;
        pcArray[index].purchase_comm_amount = amount;
        this.ccsum = 0;
        this.pcsum = 0;
        pcArray.map(function (e) {
            _this.ccsum = parseFloat(_this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
            _this.pcsum = parseFloat(_this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
            _this.acsum = parseFloat(_this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
        });
        this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
    };
    AddEditCollectionComponent.prototype.getAgentCommAmount = function (amount, index) {
        var _this = this;
        var pcArray = this.addFormStep5.get('collection_commissions').value;
        pcArray[index].agent_comm_amount = amount;
        this.ccsum = 0;
        this.pcsum = 0;
        pcArray.map(function (e) {
            _this.ccsum = parseFloat(_this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
            _this.pcsum = parseFloat(_this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
            _this.acsum = parseFloat(_this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
        });
        this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
    };
    AddEditCollectionComponent.prototype.getMonthlyPerAndAmount = function () {
        var price = this.addFormStep4.get('deal_price').value;
        var numOfInstallments = this.addFormStep4.get('deal_monthly_payment').value;
        var monthlyAmount = Math.round(price / numOfInstallments);
        // const monthlyAmount: any = this.currencyPipe.transform(price / numOfInstallments);
        var percent = this.numberUptoNDecimal((monthlyAmount * 100) / price, 2);
        this.addFormStep4.controls['deal_monthly_amount'].patchValue(monthlyAmount);
        this.addFormStep4.controls['deal_monthly_percentage'].patchValue(percent);
    };
    AddEditCollectionComponent.prototype.createCollection = function (formdata, tab) {
        var _this = this;
        var callApi = true;
        this.model.step = tab;
        formdata['step'] = tab;
        if (this.model.id) {
            formdata['id'] = this.model.id;
        }
        if (this.model.step == 1) {
            if (formdata['property_id']) {
                var pid = formdata['property_id'].id;
                formdata['property_id'] = pid;
            }
            if (this.model.building_id) {
                formdata['building_id'] = this.model.building_id;
            }
            formdata['for_sale'] = this.availabilityStatus[0].checked ? 1 : 0;
            formdata['for_rent'] = this.availabilityStatus[1].checked ? 1 : 0;
            formdata['building_configuration_id'] = this.model.building_configuration_id;
            this.addFormStep1.controls.step.patchValue(this.model.step);
            this.addFormStep1.controls.building_id.patchValue(formdata['building_id']);
            this.addFormStep1.controls.property_id.patchValue(formdata['property_id']);
            this.addFormStep1.controls.building_configuration_id.patchValue(formdata['building_configuration_id']);
            this.addFormStep1.controls.for_rent.patchValue(formdata['for_rent']);
            this.addFormStep1.controls.for_rent.patchValue(formdata['for_rent']);
            if (this.addFormStep1.valid) {
                if (!formdata['building_id']) {
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.pleaseSelectBuilding'), this.translate.instant('swal.error'));
                    return;
                }
                else if (!formdata['building_towers_id']) {
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.pleaseSelectFloor'), this.translate.instant('swal.error'));
                    return;
                }
                else if (!formdata['floor_num']) {
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.pleaseChooseFloor'), this.translate.instant('swal.error'));
                    return;
                }
                else if (!formdata['property_id']) {
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.pleaseChooseApartment'), this.translate.instant('swal.error'));
                    return;
                }
                else if (!formdata['building_configuration_id']) {
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.pleaseChooseApartment'), this.translate.instant('swal.error'));
                    return;
                }
            }
            else {
                this.showError = true;
                return false;
            }
        }
        if (this.model.step == 2) {
            formdata['seller_type'] = this.model.seller_type;
            this.addFormStep2.controls.seller_type.patchValue(this.model.seller_type);
            this.addFormStep2.controls.step.patchValue(this.model.step);
            if (this.addFormStep2.valid) {
                if (this.model.seller_type == '1' || this.model.seller_type == '3') {
                    if (!formdata['seller_id']) {
                        this.toastr.error(this.translate.instant('message.error.pleaseChooseSeller'), this.translate.instant('swal.error'));
                        return;
                    }
                }
                if (this.model.seller_type != '1') {
                    if (!formdata['seller_leg_rep_name'] || !formdata['seller_leg_rep_phone'] ||
                        !formdata['seller_leg_rep_email'] || !formdata['seller_leg_rep_fed_tax']) {
                        this.toastr.error(this.translate.instant('message.error.pleaseFillLegalRepInfo'), this.translate.instant('swal.error'));
                        return;
                    }
                }
            }
            else {
                this.showError = true;
                return;
            }
        }
        if (this.model.step == 3) {
            formdata['buyer_type'] = this.model.buyer_type;
            this.addFormStep3.controls.buyer_type.patchValue(this.model.buyer_type);
            this.addFormStep3.controls.step.patchValue(this.model.step);
            // formdata['buyer_type'] = this.model.buyer_type;
            if (this.addFormStep3.valid) {
                if (this.model.buyer_type == '1' || this.model.buyer_type == '3') {
                    if (!formdata['buyer_id']) {
                        this.toastr.error(this.translate.instant('message.error.pleaseChooseBuyer'), this.translate.instant('swal.error'));
                        return;
                    }
                }
                if (this.model.buyer_type != '1') {
                    if (!formdata['buyer_leg_rep_name'] || !formdata['buyer_leg_rep_phone'] ||
                        !formdata['buyer_leg_rep_email'] || !formdata['buyer_leg_rep_fed_tax']) {
                        this.toastr.error(this.translate.instant('message.error.pleaseFillLegalRepInfo'), this.translate.instant('swal.error'));
                        return;
                    }
                }
            }
            else {
                this.showError = true;
                return;
            }
        }
        if (this.model.step == 4) {
            this.addFormStep4.controls.step.patchValue(this.model.step);
            delete this.addFormStep4.value.paymentchoice;
            if (this.addFormStep4.valid) {
                if (this.addFormStep4.controls.payment_choices.value && this.addFormStep4.controls.payment_choices.value.length < 1) {
                    this.toastr.error(this.translate.instant('message.error.pleaseChoosePayments'), this.translate.instant('swal.error'));
                    return;
                }
                // converting to local
                var d = formdata['deal_purchase_date'];
                // const nd = moment(d).add(330, 'minutes').toDate();
                formdata['deal_purchase_date'] = moment__WEBPACK_IMPORTED_MODULE_3__(d).format('YYYY-MM-DD');
                var paymentSum = 0;
                var i = 0;
                for (var index = 0; index < formdata['payment_choices'].length; index++) {
                    var element = formdata['payment_choices'][index];
                    if (!element.name || !element.amount || !element.date || !element.percent) {
                        i = i + 1;
                        var text = element.name ?
                            this.translate.instant('message.error.pleaseFillAllDetailsFor') + element.name :
                            this.translate.instant('message.error.pleaseFillAllDetailsFor');
                        this.toastr.clear();
                        this.toastr.error(text, this.translate.instant('swal.error'));
                        return;
                    }
                    // element.date = moment(moment.utc(element.date).toDate()).local().toDate();
                    element.date = moment__WEBPACK_IMPORTED_MODULE_3__(element.date).format('YYYY-MM-DD');
                    // element.date = moment(element.date).add(330, 'minutes').toDate();
                    paymentSum = parseFloat(paymentSum) + parseFloat(element.amount || 0);
                }
                // check if total sum of monthly installments is equal or greater than property price
                paymentSum = paymentSum.toFixed(2);
                var diff = formdata['deal_price'] - paymentSum;
                var currency_id = this.addFormStep4.get('currency_id').value;
                if ((diff >= 5 && currency_id == 78) || (diff >= 0.5 && currency_id == 124)) {
                    callApi = false;
                    var text = this.translate.instant('message.error.priceIsNotEqualToPaymentConceptPrice') + '<br>';
                    // this.translate.instant('message.error.priceIs') + formdata['deal_price'] + '<br>' +
                    // this.translate.instant('message.error.sumOfPaymentConceptIs') + paymentSum;
                    swal({
                        html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: this.constant.confirmButtonColor,
                        cancelButtonColor: this.constant.cancelButtonColor,
                        confirmButtonText: 'Yes'
                    }).then(function (result) {
                        if (result.value) {
                            // continue;
                            _this.callCollectionView(formdata, tab);
                        }
                        else {
                            return;
                        }
                    });
                    // return;
                }
            }
            else {
                this.showError = true;
                return false;
            }
        }
        if (this.model.step == 5) {
            this.addFormStep5.controls.step.patchValue(this.model.step);
            if (this.addFormStep5.valid) {
                if (!formdata['deal_commission_agents']) {
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.pleaseEnterAgent'), this.translate.instant('swal.error'));
                    return;
                }
                else if (formdata['deal_commission_agents'] || formdata['deal_commission_agents'].length > 0) {
                    var i = 0;
                    // formdata['deal_commission_agents'] = formdata['deal_commission_agents'].reverse();
                    for (var index = 0; index < formdata['deal_commission_agents'].length; index++) {
                        var element = formdata['deal_commission_agents'][index];
                        if (!element.name || !element.fed_tax_payer_reg) {
                            i = i + 1;
                            if (!element.name) {
                                this.toastr.clear();
                                this.toastr.error(this.translate.instant('message.error.pleaseEnterAgent'), this.translate.instant('swal.error'));
                                return;
                            }
                        }
                    }
                    // formdata['deal_commission_agents'] = formdata['deal_commission_agents'].splice(0, 1);
                }
                // if (this.pcsum != formdata['comm_total_commission_amount']) {
                //   this.toastr.clear();
                //   this.toastr.error(this.translate.instant('message.error.pcAmountIsNotEualToSozuCommission'), this.translate.instant('swal.error'));
                //   return;
                // }
                console.log(formdata['deal_commission_agents']);
                var collection_commissions = formdata['collection_commissions'];
                delete formdata['collection_commissions'];
                collection_commissions.forEach(function (element) {
                    element.add_collection_commission = element.add_collection_commission ? 1 : 0;
                    element.add_purchase_commission = element.add_purchase_commission ? 1 : 0;
                    element.add_agent_commission = element.add_agent_commission ? 1 : 0;
                    element.percent = element.percent || 0;
                    element.amount = element.amount || 0;
                    element.purchase_comm_amount = element.purchase_comm_amount || 0;
                    element.agent_comm_amount = element.agent_comm_amount || 0;
                });
                formdata['collection_commissions'] = collection_commissions;
                formdata['is_commission_sale_enabled'] = formdata['is_commission_sale_enabled'] ? 1 : 0;
                formdata['add_iva_to_cc'] = formdata['add_iva_to_cc'] ? 1 : 0;
                formdata['add_iva_to_pc'] = formdata['add_iva_to_pc'] ? 1 : 0;
                formdata['add_iva_to_ac'] = formdata['add_iva_to_ac'] ? 1 : 0;
                formdata['payment_received_by'] = formdata['payment_received_by'];
            }
            else {
                this.showError = true;
                return false;
            }
        }
        if (callApi) {
            this.spinner.show();
            this.us.postDataApi('addCollection', formdata)
                .subscribe(function (success) {
                _this.tab = tab + 1;
                _this.spinner.hide();
                _this.showError = false;
                _this.model.id = success['data'].id;
                // if (tab != 6) { 
                //   if (tab == 4) {
                //     this.selectedPaymentChoice.nativeElement.value = '';
                //   }
                //   this.editCollection();
                // }
                if (tab == 1 || tab == 2) {
                    _this.initFormStep2();
                    _this.patchFormStep2(success['data'], 'add');
                    // }
                    // if (tab == 2) {
                    _this.initFormStep3();
                    _this.patchFormStep3(success['data']);
                }
                if (tab == 4) {
                    _this.initFormStep4();
                    _this.patchFormStep4(success['data']);
                    _this.initFormStep5();
                    if (_this.selectedPaymentChoice) {
                        _this.selectedPaymentChoice.nativeElement.value = '';
                    }
                    _this.patchFormStep5(success['data']);
                }
                if (tab == 6) {
                    _this.router.navigate(['/dashboard/collections/view-collections']);
                    // swal({
                    //   html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
                    // });
                }
                // this.parameter.property_id = success['data'].id;
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.callCollectionView = function (formdata, tab) {
        var _this = this;
        this.spinner.show();
        this.us.postDataApi('addCollection', formdata)
            .subscribe(function (success) {
            _this.tab = tab + 1;
            _this.spinner.hide();
            _this.showError = false;
            _this.model.id = success['data'].id;
            if (tab == 4) {
                _this.initFormStep4();
                _this.patchFormStep4(success['data']);
                _this.initFormStep5();
                _this.selectedPaymentChoice.nativeElement.value = '';
                _this.patchFormStep5(success['data']);
            }
            // this.parameter.property_id = success['data'].id;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.numberUptoTwoDecimal = function (num) {
        return num ? num.toFixed(2) : 0;
    };
    AddEditCollectionComponent.prototype.numberUptoNDecimal = function (num, n) {
        return num ? num.toFixed(n) : 0;
    };
    AddEditCollectionComponent.prototype.getDateWRTTimezone = function (date) {
        var offset = new Date(date).getTimezoneOffset();
        if (offset < 0) {
            return moment__WEBPACK_IMPORTED_MODULE_3__(date).subtract(offset, 'minutes').toDate();
        }
        else {
            return moment__WEBPACK_IMPORTED_MODULE_3__(date).add(offset, 'minutes').toDate();
        }
    };
    AddEditCollectionComponent.prototype.editDocsPopup = function (item, folderIndex, docIndex) {
        this.modelForDoc.name_en = item.name;
        this.modelForDoc.id = item.id;
        this.folderId = item.collection_folder_id;
        this.oldDocName = item.name;
        this.localityOpen.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.checkIfLocalitySpanishNameEntered = function (document) {
        var _this = this;
        var self = this;
        if (document.name === '') {
            swal({
                text: this.translate.instant('message.error.saveName'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.editDocument(document);
                }
            });
        }
        else {
            self.editDocument(document);
        }
    };
    AddEditCollectionComponent.prototype.closeEditModal = function () {
        this.localityClose.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.editDocument = function (document) {
        var _this = this;
        var self = this;
        this.spinner.show();
        var param = {
            id: this.modelForDoc.id,
            name: this.modelForDoc.name_en
        };
        if (!this.modelForDoc.id) {
            this.docs.filter(function (doc) {
                if (doc.name == _this.oldDocName) {
                    doc.name = self.modelForDoc.name_en;
                }
            });
            self.spinner.hide();
            self.closeEditModal();
        }
        else {
            this.us.postDataApi('updateDocFolderName', param).subscribe(function (r) {
                self.spinner.hide();
                self.collectionFolders.filter(function (folder) {
                    if (folder.id == self.folderId) {
                        folder.folder_docs.filter(function (doc) {
                            if (doc.id == self.modelForDoc.id) {
                                doc.name = self.modelForDoc.name_en;
                            }
                        });
                    }
                });
                self.closeEditModal();
            }, function (error) {
                self.spinner.hide();
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docsModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "docsModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docsModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "docsModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('linkUserModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "linkUserModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeLinkUserModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "closeLinkUserModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('linkExtBrokerModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "linkExtBrokerModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeExtBrokerModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "closeExtBrokerModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('folderModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "folderModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('folderModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "folderModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docsFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "docsFile", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('selectedPaymentChoice'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "selectedPaymentChoice", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('localityOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "localityOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('localityClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "localityClose", void 0);
    AddEditCollectionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-edit-collection',
            template: __webpack_require__(/*! ./add-edit-collection.component.html */ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.html"),
            styles: [__webpack_require__(/*! ./add-edit-collection.component.css */ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.css")],
            providers: [src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_5__["AddPropertyModel"], src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_5__["Building"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"], src_app_services_http_interceptor__WEBPACK_IMPORTED_MODULE_10__["HttpInterceptor"], src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_12__["Collection"], src_app_models_document_model__WEBPACK_IMPORTED_MODULE_14__["Document"]]
        }),
        __metadata("design:paramtypes", [src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_12__["Collection"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__["AdminService"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"],
            src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_5__["Building"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_13__["ToastrService"],
            src_app_models_document_model__WEBPACK_IMPORTED_MODULE_14__["Document"]])
    ], AddEditCollectionComponent);
    return AddEditCollectionComponent;
}());



/***/ }),

/***/ "./src/app/layout/collections/analytics/analytics.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/layout/collections/analytics/analytics.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9jb2xsZWN0aW9ucy9hbmFseXRpY3MvYW5hbHl0aWNzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/collections/analytics/analytics.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/layout/collections/analytics/analytics.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  analytics works!\n</p>\n"

/***/ }),

/***/ "./src/app/layout/collections/analytics/analytics.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/layout/collections/analytics/analytics.component.ts ***!
  \*********************************************************************/
/*! exports provided: AnalyticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsComponent", function() { return AnalyticsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AnalyticsComponent = /** @class */ (function () {
    function AnalyticsComponent() {
    }
    AnalyticsComponent.prototype.ngOnInit = function () {
    };
    AnalyticsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-analytics',
            template: __webpack_require__(/*! ./analytics.component.html */ "./src/app/layout/collections/analytics/analytics.component.html"),
            styles: [__webpack_require__(/*! ./analytics.component.css */ "./src/app/layout/collections/analytics/analytics.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());



/***/ }),

/***/ "./src/app/layout/collections/collections.component.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/collections/collections.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "textarea{\n    resize: none;\n}\n.addCollComm{\n    cursor: pointer;\n}\n/* freeze first col and row */\n.main-table{\n  height: 700px;\n}\ntable.table-striped.quick-table th, table.table-striped.quick-table td {\n    width: 190px;\n  }\ntable.table-striped.quick-table {\n    table-layout: fixed;\n    width:100%;\n  }\ntable.table-striped.quick-table td:nth-child(1), table.table-striped.quick-table th:nth-child(1),\n  table.table-striped.quick-table thead tr th \n  {\n    position:-webkit-sticky;\n    position:sticky;\n    left:0;\n    top: 0;\n    z-index:1;\n    background-color: #00B96F;\n    color: #fff;\n  }\ntable.table-striped.quick-table th:first-child {\n    z-index:2;\n  }\n/* freeze first col and row */\ntable.table-striped.edit-table td:first-child, table.table-striped.edit-table th:first-child{\n    background-color: #00B96F;\n    color: #fff;\n  }\n.red-color{\n    color: red;\n  }\n.top-container {\n  background-color: #f1f1f1;\n  padding: 30px;\n  text-align: center;\n}\n.header {\n  padding: 10px 16px;\n  background: #555;\n  color: #f1f1f1;\n}\n.content {\n  padding: 16px;\n}\n.sticky {\n  position: fixed;\n  top: 0;\n  width: 100%;\n}\n.sticky + .content {\n  padding-top: 102px;\n}\n.status {\n  height: 20px;\n  width: 40px;\n}\n.green {\n  background-color: green;\n}\n.yellow {\n  background-color: yellow;\n}\n.red {\n  background-color: red;\n}\n.grey {\n  background-color: grey;\n}\n.blue {\n  background-color: blue;\n}\n.purple {\n  background-color: purple;\n}\n.orange {\n  background-color: pink;\n}\n.highlight{\n  background: #dad5d5;\n}\n.table-search:focus-within label {\n  color: #434B52;\n}\n.table.table-striped.folder-table tr td, .table.table-striped.folder-table tr th {\n  text-align: left;\n  padding-left: 10px;\n}\n.color-changed{\n  color: #222;\n}\n.table.table-striped.folder-table tr td a img{\n  padding-right: 10px;\n}\n.write-note {\n  max-height: none;\n}\n.checkbox_size{\n  width: 25px;\n  height: 25px;\n}\n.edit{\n  padding-right: 60px !important;\n  color: rgba(0,0,0,0.5);\n  font-size: 11px;\n  position: absolute;\n  right: -20px;\n  top: 0;\n}\n.model-body10P{\n  padding: 10px !important;\n}\n.my-modal-header{\n  display: inline;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbGxlY3Rpb25zL2NvbGxlY3Rpb25zLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0NBQ2hCO0FBQ0Q7SUFDSSxnQkFBZ0I7Q0FDbkI7QUFHRCw4QkFBOEI7QUFDOUI7RUFDRSxjQUFjO0NBQ2Y7QUFDQztJQUNFLGFBQWE7R0FDZDtBQUNEO0lBQ0Usb0JBQW9CO0lBQ3BCLFdBQVc7R0FDWjtBQUNEOzs7SUFHRSx3QkFBZ0I7SUFBaEIsZ0JBQWdCO0lBQ2hCLE9BQU87SUFDUCxPQUFPO0lBQ1AsVUFBVTtJQUNWLDBCQUEwQjtJQUMxQixZQUFZO0dBQ2I7QUFDRDtJQUNFLFVBQVU7R0FDWDtBQUNELDhCQUE4QjtBQUM5QjtJQUNFLDBCQUEwQjtJQUMxQixZQUFZO0dBQ2I7QUFPRDtJQUNFLFdBQVc7R0FDWjtBQUNIO0VBQ0UsMEJBQTBCO0VBQzFCLGNBQWM7RUFDZCxtQkFBbUI7Q0FDcEI7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsZUFBZTtDQUNoQjtBQUVEO0VBQ0UsY0FBYztDQUNmO0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsT0FBTztFQUNQLFlBQVk7Q0FDYjtBQUVEO0VBQ0UsbUJBQW1CO0NBQ3BCO0FBRUQ7RUFDRSxhQUFhO0VBQ2IsWUFBWTtDQUNiO0FBRUQ7RUFDRSx3QkFBd0I7Q0FDekI7QUFDRDtFQUNFLHlCQUF5QjtDQUMxQjtBQUNEO0VBQ0Usc0JBQXNCO0NBQ3ZCO0FBQ0Q7RUFDRSx1QkFBdUI7Q0FDeEI7QUFDRDtFQUNFLHVCQUF1QjtDQUN4QjtBQUNEO0VBQ0UseUJBQXlCO0NBQzFCO0FBQ0Q7RUFDRSx1QkFBdUI7Q0FDeEI7QUFDRDtFQUNFLG9CQUFvQjtDQUNyQjtBQUNEO0VBQ0UsZUFBZTtDQUNoQjtBQUNEO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtDQUNwQjtBQUNEO0VBQ0UsWUFBWTtDQUNiO0FBQ0Q7RUFDRSxvQkFBb0I7Q0FDckI7QUFDRDtFQUNFLGlCQUFpQjtDQUNsQjtBQUVEO0VBQ0UsWUFBWTtFQUNaLGFBQWE7Q0FDZDtBQUVEO0VBQ0UsK0JBQStCO0VBQy9CLHVCQUF1QjtFQUN2QixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixPQUFPO0NBQ1I7QUFFRDtFQUNFLHlCQUF5QjtDQUMxQjtBQUNEO0VBQ0UsZ0JBQWdCO0NBQ2pCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2NvbGxlY3Rpb25zL2NvbGxlY3Rpb25zLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0ZXh0YXJlYXtcbiAgICByZXNpemU6IG5vbmU7XG59XG4uYWRkQ29sbENvbW17XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5cbi8qIGZyZWV6ZSBmaXJzdCBjb2wgYW5kIHJvdyAqL1xuLm1haW4tdGFibGV7XG4gIGhlaWdodDogNzAwcHg7XG59XG4gIHRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGgsIHRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGQge1xuICAgIHdpZHRoOiAxOTBweDtcbiAgfVxuICB0YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHtcbiAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xuICAgIHdpZHRoOjEwMCU7XG4gIH1cbiAgdGFibGUudGFibGUtc3RyaXBlZC5xdWljay10YWJsZSB0ZDpudGgtY2hpbGQoMSksIHRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGg6bnRoLWNoaWxkKDEpLFxuICB0YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHRoZWFkIHRyIHRoIFxuICB7XG4gICAgcG9zaXRpb246c3RpY2t5O1xuICAgIGxlZnQ6MDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDoxO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMEI5NkY7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cbiAgdGFibGUudGFibGUtc3RyaXBlZC5xdWljay10YWJsZSB0aDpmaXJzdC1jaGlsZCB7XG4gICAgei1pbmRleDoyO1xuICB9XG4gIC8qIGZyZWV6ZSBmaXJzdCBjb2wgYW5kIHJvdyAqL1xuICB0YWJsZS50YWJsZS1zdHJpcGVkLmVkaXQtdGFibGUgdGQ6Zmlyc3QtY2hpbGQsIHRhYmxlLnRhYmxlLXN0cmlwZWQuZWRpdC10YWJsZSB0aDpmaXJzdC1jaGlsZHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBCOTZGO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG5cblxuXG5cblxuICBcbiAgLnJlZC1jb2xvcntcbiAgICBjb2xvcjogcmVkO1xuICB9XG4udG9wLWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmhlYWRlciB7XG4gIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgYmFja2dyb3VuZDogIzU1NTtcbiAgY29sb3I6ICNmMWYxZjE7XG59XG5cbi5jb250ZW50IHtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLnN0aWNreSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnN0aWNreSArIC5jb250ZW50IHtcbiAgcGFkZGluZy10b3A6IDEwMnB4O1xufVxuXG4uc3RhdHVzIHtcbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogNDBweDtcbn1cblxuLmdyZWVuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG59XG4ueWVsbG93IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xufVxuLnJlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cbi5ncmV5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cbi5ibHVlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbn1cbi5wdXJwbGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBwdXJwbGU7XG59XG4ub3JhbmdlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcbn1cbi5oaWdobGlnaHR7XG4gIGJhY2tncm91bmQ6ICNkYWQ1ZDU7XG59XG4udGFibGUtc2VhcmNoOmZvY3VzLXdpdGhpbiBsYWJlbCB7XG4gIGNvbG9yOiAjNDM0QjUyO1xufVxuLnRhYmxlLnRhYmxlLXN0cmlwZWQuZm9sZGVyLXRhYmxlIHRyIHRkLCAudGFibGUudGFibGUtc3RyaXBlZC5mb2xkZXItdGFibGUgdHIgdGgge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG4uY29sb3ItY2hhbmdlZHtcbiAgY29sb3I6ICMyMjI7XG59XG4udGFibGUudGFibGUtc3RyaXBlZC5mb2xkZXItdGFibGUgdHIgdGQgYSBpbWd7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG59XG4ud3JpdGUtbm90ZSB7XG4gIG1heC1oZWlnaHQ6IG5vbmU7XG59XG5cbi5jaGVja2JveF9zaXple1xuICB3aWR0aDogMjVweDtcbiAgaGVpZ2h0OiAyNXB4O1xufVxuXG4uZWRpdHtcbiAgcGFkZGluZy1yaWdodDogNjBweCAhaW1wb3J0YW50O1xuICBjb2xvcjogcmdiYSgwLDAsMCwwLjUpO1xuICBmb250LXNpemU6IDExcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IC0yMHB4O1xuICB0b3A6IDA7XG59XG5cbi5tb2RlbC1ib2R5MTBQe1xuICBwYWRkaW5nOiAxMHB4ICFpbXBvcnRhbnQ7XG59XG4ubXktbW9kYWwtaGVhZGVye1xuICBkaXNwbGF5OiBpbmxpbmU7XG59Il19 */"

/***/ }),

/***/ "./src/app/layout/collections/collections.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/collections/collections.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid \">\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n        <p class=\"p16\">{{'viewCollections.label' | translate}}</p>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"offset-md-4\"></div>\n    <div class=\"col-md-8 col-12\">\n      <div class=\"cust-tabs-2\">\n        <ul class=\"nav nav-tabs float-right\">\n          <li class=\"nav-item\">\n            <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"changeFlag(1)\" class=\"nav-link\"\n              data-toggle=\"tab\" href=\"#tw\">{{'filters.time.thisWeek' | translate}}</a>\n          </li>\n          <li class=\"nav-item\">\n            <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"changeFlag(2)\" class=\"nav-link\"\n              data-toggle=\"tab\" href=\"#tm\">{{'filters.time.thisMonth' | translate}}</a>\n          </li>\n          <li class=\"nav-item\">\n            <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"changeFlag(3)\" class=\"nav-link\"\n              data-toggle=\"tab\" href=\"#lm\">{{'filters.time.lastMonth' | translate}}</a>\n          </li>\n          <li class=\"nav-item\">\n            <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"changeFlag(4)\" class=\"nav-link\"\n              data-toggle=\"tab\" href=\"#lt\">{{'filters.time.lifetime' | translate}}</a>\n          </li>\n          <li class=\"nav-item\">\n            <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"changeFlag(5)\" class=\"nav-link\"\n              data-toggle=\"tab\" href=\"#cust\">{{'filters.time.custom.label' | translate}}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div *ngIf=\"parameter.dash_flag == 5\" class=\"row\">\n        <div class=\"offset-lg-7\"></div>\n        <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n          <div class=\"form-group marginB0\">\n            <label>{{'filters.time.custom.from' | translate}}</label>\n            <p-calendar dateFormat=\"dd/M/yy\" [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\"\n              [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"\n              yearRange=\"2000:2040\"></p-calendar>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n          <div class=\"form-group marginB0\">\n            <label>{{'filters.time.custom.to' | translate}}</label>\n            <p-calendar dateFormat=\"dd/M/yy\" [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\"\n              [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\"\n              [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n          </div>\n        </div>\n        <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n          <div class=\"form-group btn-cont\">\n            <label class=\"addMT3\">&nbsp;</label>\n            <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n              [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-lg-2 col-md-2\">\n      <div class=\"form-group\">\n        <label>{{'filters.location.country' | translate}}</label>\n        <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n          <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n          <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"col-lg-2 col-md-2\">\n      <div class=\"form-group\">\n        <label>{{'filters.location.state' | translate}}</label>\n        <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n          <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n          <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"col-lg-2 col-md-2\">\n      <div class=\"form-group\">\n        <label>{{'filters.location.city' | translate}}</label>\n        <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n          <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n          <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n      </div>\n    </div>\n\n    <div class=\"col-lg-2 col-md-2\">\n      <div class=\"form-group\">\n        <label>{{'filters.location.locality' | translate}}</label>\n        <select class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value)\">\n          <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n          <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n      </div>\n    </div>\n\n    <div class=\"col-lg-2 col-md-2\">\n      <div class=\"form-group marginB0\">\n        <label>{{'filters.location.building' | translate}}</label>\n        <select class=\"form-control\" (change)=\"setBuilding($event.target.value)\">\n          <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n          <option *ngFor=\"let building of parameter.buildings\" value=\"{{building.id}}\">{{building.name}}</option>\n        </select>\n      </div>\n    </div>\n\n    <div class=\"col-lg-1 col-md-2\">\n      <div class=\"form-group btn-cont\">\n        <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n        <button type=\"button\" (click)=\"getListing()\"\n          class=\"btn btn-primary-new width100P P86\">{{'filters.location.applyBtn' | translate}}</button>\n      </div>\n    </div>\n\n    <div class=\"col-lg-1 col-md-2\">\n      <div class=\"form-group btn-cont\">\n        <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n        <button type=\"button\" (click)=\"resetFilters()\"\n          class=\"btn btn-primary-new width100P P86\">{{'filters.location.resetBtn' | translate}}</button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"cust-tabs\">\n    <div class=\"row flex-wrap-reverse\">\n\n      <div class=\"col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n          <li class=\"nav-item\">\n            <a [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeAppUnappFlag(1)\"\n              class=\"nav-link cursor-pointer\">{{'filters.flag.approved' | translate}}</a>\n          </li>\n          <li class=\"nav-item\">\n            <a [ngClass]=\"{'active':parameter.flag==0}\" (click)=\"changeAppUnappFlag(0)\"\n              class=\"nav-link cursor-pointer\">{{'filters.flag.unapproved' | translate}}</a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <div class=\"add-new pull-right text-left\">\n           <a class=\"btn\" (click)=\"this.getExportlisting()\" href=\"javascript://\">\n              {{'table.exportDataBtn' | translate}}</a>\n        </div>\n     </div>\n      <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <div class=\"add-new pull-right\">\n          <a *ngIf=\"admin?.admin_acl['Manage Collections']?.can_create==1\" class=\"btn\" href=\"javascript://\"\n            routerLink=\"/dashboard/collections/add-collection/0\">{{'viewCollections.addNew' | translate}}</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"tab-content white-bg\">\n      <div class=\"tab-pane active\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive main-table\">\n            <table class=\"table table-striped table-align-left quick-table\">\n              <thead id=\"myHeader\">\n                <tr>\n                  <th style=\"text-align:left; width: 80px;\" [style.z-index]=\"100\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.iDAccount' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.collection_id\"\n                          (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.collection_id\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 150px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.buyerName' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input autocomplete=\"off\" class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.buyer_name\"\n                          (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.buyer_name\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 150px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.buyerLegalRepresentative' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 150px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.sellerName' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input autocomplete=\"off\" class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.seller_name\"\n                          (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.seller_name\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 150px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.sellerLegalRepresentative' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 140px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.nameOfBuilding' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input autocomplete=\"off\" class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.building_name\"\n                          (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.building_name\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 120px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.nameOfTower' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input autocomplete=\"off\" class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.tower_name\"\n                          (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.tower_name\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 140px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.nameOfApartment' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input autocomplete=\"off\" class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.apartment_name\"\n                          (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.apartment_name\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 120px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.configuration' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input autocomplete=\"off\" class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.config_name\"\n                          (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.config_name\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 110px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.locality' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 140px;z-index: 2;\">\n                    <div class=\"table-search\">\n                      <div (click)=\"sort_by(1)\" class=\"d-flex table-search\">\n                        <label>{{'table.th.purchaseDate' | translate}}</label>\n                      </div>\n                      <div>\n                        <p-calendar dateFormat=\"dd/M/yy\" [locale]=\"locale\" showIcon=\"true\"\n                          [(ngModel)]=\"parameter.deal_from_date\" [maxDate]=\"today\" showButtonBar=\"true\"\n                          [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                        <p-calendar dateFormat=\"dd/M/yy\" [locale]=\"locale\" showIcon=\"true\"\n                          [(ngModel)]=\"parameter.deal_to_date\" [minDate]=\"parameter.deal_from_date\" [maxDate]=\"today\"\n                          showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\">\n                        </p-calendar>\n\n                        <!-- <input autocomplete=\"off\" class=\"width100\" type=\"date\"\n                          [(ngModel)]=\"parameter.deal_from_date\">\n                        <input autocomplete=\"off\" class=\"width100\" type=\"date\" [(ngModel)]=\"parameter.deal_to_date\"> -->\n                        <button *ngIf=\"parameter.deal_from_date && parameter.deal_to_date\" (click)=\"getListing()\"><i\n                            class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                  </th>\n\n                  <th style=\"vertical-align:top; width: 110px;\">\n                    <div class=\"d-flex table-search\">\n                      <label>{{'table.th.lastConcept' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 110px;\">\n                    <div class=\"d-flex table-search\">\n                      <label>{{'table.th.lastDateOfPayment' | translate}}</label></div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 110px;\">\n                    <div class=\"d-flex table-search\">\n                      <label class=\"width100px\">{{'table.th.lastAmount' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 110px;\">\n                    <div class=\"d-flex table-search\">\n                      <label>{{'table.th.nextConcept' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 110px;\">\n                    <div class=\"d-flex table-search\">\n                      <label>{{'table.th.nextDateOfPayment' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 110px;\">\n                    <div class=\"table-search\">\n                      <label class=\"width100px\">{{'table.th.nextAmount' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.currency' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.sozuPC' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.ivaAdded' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.tobeRePC' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.PCReceipt' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.PCInvoice' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.sozuCC' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.ivaAdded' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.tobeReCC' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.CCReceipt' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.CCInvoice' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.agentCommission' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.ivaAdded' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.ACReceipt' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.ACInvoice' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"vertical-align:top; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.commissionAgent' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 120px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.price' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.penalty' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 120px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.amountPaid' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 120px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.remaniningAmount' | translate}}</label>\n                    </div>\n                  </th>\n                  <th style=\"text-align:left; width: 100px;\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.statusAccount' | translate}}</label>\n                      <select [(ngModel)]=\"parameter.collection_status\" (change)=\"parameter.page=1;getListing()\">\n                        <option value=\"\">{{'table.th.all' | translate}}</option>\n                        <option *ngFor=\"let c of collectionStatusFilter\" value=\"{{c.value}}\">{{c.name}}</option>\n                      </select>\n                    </div>\n                  </th>\n                  <th style=\"width: 400px;\" *ngIf=\"parameter.flag!=5\">\n                    <div class=\"table-search\">\n                      <label>{{'table.th.actions.label' | translate}}</label>\n                    </div>\n                  </th>\n                </tr>\n              </thead>\n              <tbody class=\"content\">\n                <tr\n                  *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }; let i=index\">\n                  <td><span>{{p?.id ? p?.id : ('table.tr.td.NA' | translate)}}</span></td>\n                  <td>\n                    <span *ngIf=\"p?.buyer_type == 1\">\n                      {{p?.buyer?.name ? (p?.buyer?.name + ' ' + p?.buyer?.first_surname + ' ' + p?.buyer?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                    <span *ngIf=\"p?.buyer_type == 2\">\n                      {{p?.buyer_legal_entity?.comm_name ? (p?.buyer_legal_entity?.comm_name) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                    <span *ngIf=\"p?.buyer_type == 3\">\n                      {{p?.buyer?.name ? (p?.buyer?.name + ' ' + p?.buyer?.first_surname + ' ' + p?.buyer?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                  </td>\n                  <td>\n                    <span *ngIf=\"p?.buyer_type == 1\">\n                      {{p?.buyer?.legal_representative?.name ? (p?.buyer?.legal_representative?.name + ' ' + p?.buyer?.legal_representative?.first_surname + ' ' + p?.buyer?.legal_representative?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                    <span *ngIf=\"p?.buyer_type == 2\">\n                      {{p?.buyer_legal_entity?.legal_reps?.name ? (p?.buyer_legal_entity?.legal_reps?.name + ' ' +p?.buyer_legal_entity?.legal_reps?.first_surname + ' ' + p?.buyer_legal_entity?.legal_reps?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                    <span *ngIf=\"p?.buyer_type == 3\">\n                      {{p?.buyer?.legal_representative?.name ? (p?.buyer?.legal_representative?.name + ' ' + p?.buyer?.legal_representative?.first_surname + ' ' + p?.buyer?.legal_representative?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                  </td>\n                  <td>\n                    <span *ngIf=\"p?.seller_type == 1\">\n                      {{p?.seller?.name ? (p?.seller?.name + ' ' + p?.seller?.first_surname + ' ' + p?.seller?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                    <span *ngIf=\"p?.seller_type == 2\">\n                      {{p?.seller_legal_entity?.comm_name ? (p?.seller_legal_entity?.comm_name) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                    <span *ngIf=\"p?.seller_type == 3\">\n                      {{p?.seller?.name ? (p?.seller?.name + ' ' + p?.seller?.first_surname + ' ' + p?.seller?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                  </td>\n                  <td>\n                    <span *ngIf=\"p?.seller_type == 1\">\n\n                    </span>\n                    <span *ngIf=\"p?.seller_type == 2\">\n                      {{p?.seller_legal_entity?.legal_reps?.name ? (p?.seller_legal_entity?.legal_reps?.name + ' ' +p?.seller_legal_entity?.legal_reps?.first_surname + ' ' + p?.seller_legal_entity?.legal_reps?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                    <span *ngIf=\"p?.seller_type == 3\">\n                      {{p?.seller?.legal_representative?.name ? (p?.seller?.legal_representative?.name + ' ' + p?.seller?.legal_representative?.first_surname + ' ' + p?.seller?.legal_representative?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                  </td>\n                  <td class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\">\n                    <strong>{{p?.property?.building?.name ? p?.property?.building?.name: ('table.tr.td.NA' | translate)}}</strong>\n                  </td>\n                  <td>\n                    <span>{{p?.property?.building_towers ? p?.property?.building_towers?.tower_name : ('table.tr.td.NA' | translate)}}</span>\n                  </td>\n                  <td><span>{{p?.property?.name ? p?.property?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                  <td>\n                    <span>{{p?.property?.building_configuration?.name}}</span>\n                  </td>\n                  <td>\n                    <span>{{p?.property?.locality?.name ? p?.property?.locality?.name : ('table.tr.td.NA' | translate)}}</span>\n                  </td>\n                  <td>\n                    <span>{{p.deal_purchase_date ? getDateWRTTimezone(p.deal_purchase_date, 'DD/MMM/YYYY') : ('table.tr.td.NA' | translate)}}</span>\n                  </td>\n\n                  <td><span>{{ p?.last_payment ? getLastPaymentConcept(p) : ('table.tr.td.NA' | translate)}}</span></td>\n                  <td>\n                    <span>{{(p?.last_payment?.payment_date ? (p?.last_payment?.payment_date | date:'dd/MMM/yyyy') : ('table.tr.td.NA' | translate) )}}</span>\n                  </td>\n                  <td><span\n                      [ngClass]=\"{'red-color':((p?.last_payment?.calc_payment_amount || 0) < (p?.last_payment?.amount || 0))}\">\n                      {{ (p?.last_payment?.collection_amount || 0) | currency}}\n                    </span></td>\n                  <td><span>{{p?.next_payment?.name || ('table.tr.td.NA' | translate)}}</span></td>\n                  <td>\n                    <span>{{(p?.next_payment?.date ? (p?.next_payment?.date | date:'dd/MMM/yyyy') : ('table.tr.td.NA' | translate) )}}</span>\n                  </td>\n                  <td>\n                    <span>{{ ((p?.next_payment?.amount || 0)-(p?.next_payment?.calc_payment_amount || 0)) | currency}}</span>\n                  </td>\n\n                  <td><span>{{p?.currency?.code || ('table.tr.td.NA' | translate)}}</span></td>\n                  <td>\n                    <span>{{p?.comm_total_commission ? (p?.comm_total_commission | number : '1.2-3') : ('table.tr.td.NA' | translate)}}</span>\n                  </td>\n                  <td>\n                    <input name=\"add_iva_to_pc{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.add_iva_to_pc ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>\n                    <span [ngClass]=\"{'red-color':((p?.sum_pc || 0) != (p?.comm_total_commission_amount || 0))}\">\n                      {{(p?.pc_received || 0) | currency}}\n                    </span>\n                  </td>\n                  <td>\n                    <input name=\"pc_receipt{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.pc_receipt ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>\n                    <input name=\"pc_invoice{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.pc_invoice ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>{{p?.cc_percent}}</td>\n                  <td>\n                    <input name=\"add_iva_to_cc{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.add_iva_to_cc ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>{{(p?.cc_received || 0) | currency}}</td>\n                  <td>\n                    <input name=\"cc_receipt{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.cc_receipt ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>\n                    <input name=\"cc_invoice{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.cc_invoice ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>\n                    <span>{{p?.comm_shared_commission ? (p?.comm_shared_commission | number : '1.2-3') : ('table.tr.td.NA' | translate)}}</span>\n                  </td>\n\n                  <td>\n                    <input name=\"add_iva_to_ac{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.add_iva_to_ac ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>\n                    <input name=\"ac_receipt{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.ac_receipt ? 'checked' : ''\" readonly>\n                  </td>\n                  <td>\n                    <input name=\"ac_invoice{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\"\n                      [checked]=\"p?.ac_invoice ? 'checked' : ''\" readonly>\n                  </td>\n\n                  <td *ngIf=\"p?.deal_commission_agents?.length\">\n                    <span>\n                      {{p?.deal_commission_agents[0]?.broker?.name ? (p?.deal_commission_agents[0]?.broker?.name + ' ' +p?.deal_commission_agents[0]?.broker?.first_surname + ' ' + p?.deal_commission_agents[0]?.broker?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </span>\n                  </td>\n                  <td *ngIf=\"!p?.deal_commission_agents?.length\">\n                    <span>{{('table.tr.td.NA' | translate)}}</span>\n                  </td>\n                  <td><span>{{(p?.deal_price || 0) | currency}}</span></td>\n                  <td><span>{{(p?.penalty || 0) | currency}}</span></td>\n                  <td><span>{{(p?.total_payment_recieved || 0) | currency}}</span></td>\n                  <td><span>{{getRemainingAmt(p) | currency}}</span></td>\n\n                  <td>\n                    <div *ngIf=\"p?.is_cancelled==1\" class=\"status grey\" title=\"Cancelled\"></div>\n                    <div *ngIf=\"p?.is_cancelled==0 && p?.is_commission_sale_enabled==1\" class=\"status purple\"\n                      title=\"Only Commission for sale\"></div>\n                    <div *ngIf=\"p?.is_cancelled==0 && p?.is_commission_sale_enabled==0 && p?.payment_status==1\"\n                      class=\"status green\" title=\"Up to Date\"></div>\n                    <div *ngIf=\"p?.is_cancelled==0 && p?.is_commission_sale_enabled==0 && p?.payment_status==2\"\n                      class=\"status yellow\" title=\"Payment Period\"></div>\n                    <div *ngIf=\"p?.is_cancelled==0 && p?.is_commission_sale_enabled==0 && p?.payment_status==3\"\n                      class=\"status red\" title=\"Overdue Payment\"></div>\n                    <div *ngIf=\"p?.is_cancelled==0 && p?.is_commission_sale_enabled==0 && p?.payment_status==5\"\n                      class=\"status blue\" title=\"Settled\"></div>\n                    <div *ngIf=\"p?.is_cancelled==0 && p?.is_commission_sale_enabled==0 && p?.payment_status==6\"\n                      class=\"status orange\" title=\"Inconsistency between price and deal scheme\"></div>\n                  </td>\n                  <td>\n                    <div class=\"table-actions\">\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        routerLink=\"/dashboard/collections/edit-collection/{{p.id}}\"\n                        title=\"{{'table.title.editDetails' | translate}}\" class=\"action-icon\"><img\n                          src=\"assets/img/edit.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"quickCollectionView(p)\" title=\"{{'table.title.quickVisuaization' | translate}}\"\n                        class=\"action-icon\"><img src=\"assets/img/eye-icon.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"viewAccountStatement(p)\" title=\"{{'table.title.accountStatement' | translate}}\"\n                        class=\"action-icon\"><img src=\"assets/img/ic_account.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"showPenaltyPaymentPopup(p, i, 'penalty-popup', 0)\"\n                        title=\"{{'table.title.penaltyPayment' | translate}}\" class=\"action-icon\"><img\n                          src=\"assets/img/stamp.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"showApplyPaymentPopup(p, i, 'apply-popup')\"\n                        title=\"{{'table.title.applyPayment' | translate}}\" class=\"action-icon\"><img\n                          src=\"assets/img/ic_payment.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"showEditPaymentPopup(p, i)\" title=\"{{'table.title.editPayment' | translate}}\"\n                        class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"showCollectionCommReceipt(p, i, 'commission-popup')\"\n                        title=\"{{'table.title.collectionCommission' | translate}}\" class=\"action-icon\"><img\n                          src=\"assets/img/ic_commission.png\" alt=\"img\"></button>\n\n                      <button *ngIf=\"p.is_approved == 1\"\n                        [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\" (click)=\"changeStatus(p, 0);\"\n                        class=\"action-icon\" title=\"{{'table.title.unapprove' | translate}}\"><img\n                          src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n\n                      <button *ngIf=\"p.is_approved == 0\"\n                        [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\" (click)=\"changeStatus(p, 1);\"\n                        class=\"action-icon\" title=\"{{'table.title.approve' | translate}}\"><img src=\"assets/img/tick.png\"\n                          alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"openFoldersModal(p.collection_folders, p.payment_folder_id)\"\n                        title=\"{{'table.title.viewFolders' | translate}}\" class=\"action-icon\"><img\n                          src=\"assets/img/ic_folder_1.svg\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\" (click)=\"getNotes(p)\"\n                        title=\"{{'table.title.collectionNotes' | translate}}\" class=\"action-icon\"><img\n                          src=\"assets/img/chat-icon.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"cancelPopup(p, i, p?.is_cancelled == 0 ? 1 : 0)\"\n                        title=\"{{p?.is_cancelled == 0 ? ('table.title.cancelCollection' | translate) : ('table.title.activeCollection' | translate)}}\"\n                        class=\"action-icon\" [ngClass]=\"{'unblock-bg':p?.is_cancelled==1}\"><img\n                          src=\"assets/img/block.png\" alt=\"img\"></button>\n\n                      <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                        (click)=\"deletePopup(p, i)\" title=\"{{'table.title.delete' | translate}}\"\n                        class=\"action-icon\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n\n                    </div>\n\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"padding20 center\" *ngIf=\"total == 0\">\n              <!-- <img src=\"assets/img/404-error.png\"> -->\n              <p class=\"show-not-found\">\n                {{parameter.flag==1 ? ('message.error.noApprovedCollectionFound' | translate) : ('message.error.noUnApprovedCollectionFound' | translate)}}\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"tab-pane container fade\" id=\"seller\">{{'table.th.sellerTabOn' | translate}}</div>\n    </div>\n  </div>\n\n  <div class=\"btn-cont marginT15\" *ngIf=\"total\">\n    <div class=\"row\">\n      <div class=\"col-6\">\n        <div class=\"title-group\">\n          <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}}\n            {{total}}</p>\n        </div>\n      </div>\n      <div class=\"col-6 text-right\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n      </div>\n    </div>\n  </div>\n</div>\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#collection-notes\" #notesModalOpen></a>\n<div class=\"modal animated\" id=\"collection-notes\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'table.title.collectionNotes' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #notesModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeNotesModal()\">&times;</button>\n      </div>\n\n      <div class=\"modal-body\">\n        <div class=\"white-bg\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n              <p class=\"p16 marginB0\">{{'commonBlock.writeANote' | translate}}</p>\n            </div>\n            <div class=\"col-6 text-right\">\n              <a class=\"add\" href=\"javascript://\" (click)=\"addNote()\">{{'commonBlock.add' | translate}}</a>\n\n              <ng-template #noAddPermissiom>\n                <a class=\"add\" href=\"javascript://\">{{'commonBlock.add' | translate}}</a>\n              </ng-template>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group-2\">\n          <div class=\"form-group\">\n            <textarea rows=\"3\" required class=\"form-control note\" name=\"note\" [(ngModel)]=\"model.note\"></textarea>\n          </div>\n        </div>\n        <div *ngIf=\"parameter.items?.length!=0\" [ngStyle]=\"{'max-height':sent_as === 1 ? '250px' : '' }\"\n          class=\"write-note white-bg\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n          <div class=\"wn-block\" *ngFor=\"let item of parameter.items; let i=index\">\n            <div class=\"circle\">\n              <span></span>\n            </div>\n            <a class=\"delete\" href=\"javascript://\"\n              (click)=\"deleteLeadPopup(item.id, i)\">{{'commonBlock.delete' | translate}}</a>\n\n            <ng-template #noDeletePermissiom>\n              <a class=\"delete\" href=\"javascript://\">{{'commonBlock.delete' | translate}}</a>\n            </ng-template>\n            <!-- <p class=\"time\">{{item.updated_at | chatTime: 'YYYY-MM-DD H:m:s': 2}}</p> -->\n            <pre class=\"p13\"\n              *ngIf=\"!item.show\">{{item.note.slice(0, 90)}} <span class=\"read-more\" *ngIf=\"item.note.length>100\" (click)=\"item.show=true\">Read more</span></pre>\n            <pre class=\"p13\" *ngIf=\"item.show\">{{item.note}}</pre>\n          </div>\n        </div>\n        <div *ngIf=\"parameter.items?.length==0\" class=\"write-note white-bg\"\n          [ngStyle]=\"{'height':sent_as === 1 ? '230px' : '245px' }\">\n          <p class=\"show-not-found\">\n            {{'message.error.noNoteFound' | translate}}\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#penaltyModal\" #penaltyModalOpen></a>\n<div class=\"modal animated\" id=\"penaltyModal\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>\n          {{penaltyForm.controls.id.value ? ('viewCollections.editPenalty' | translate) : ('viewCollections.addPenalty' | translate)}}\n        </h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #penaltyModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closePenaltyPaymentPopup();\">&times;</button>\n      </div>\n\n      <form autocomplete=\"off\" [formGroup]=\"penaltyForm\" (ngSubmit)=\"applyCollectionPenalty(penaltyForm.value)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\" *ngIf=\"!penaltyForm.controls.id.value\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentConcept' | translate}}<span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select class=\"form-control\" formControlName=\"collection_payment_choice_id\"\n                    (change)=\"setPaymentConceptAmount($event.target.value)\">\n                    <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentConcepts\" [value]=\"bt.id\"\n                      [disabled]=\"bt?.penalty || bt?.is_paid_calculated\"> {{bt?.name}}</option>\n                  </select>\n                </div>\n                <div *ngIf=\"showError  &&  (penaltyForm.controls.collection_payment_choice_id.invalid)\">\n                  <div *ngIf=\"penaltyForm.controls.collection_payment_choice_id.errors?.required \" class=\"show-error\">\n                    {{'addCollectionValidations.thisIsRequired' | translate}}\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.paymentConceptAmt' | translate}}<span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input readonly autocomplete=\"off\" type=\"number\" class=\"form-control\"\n                    formControlName=\"payment_concept_amt\">\n                </div>\n              </div>\n              <div *ngIf=\"showError  &&  (penaltyForm.controls.payment_concept_amt.invalid)\">\n                <div *ngIf=\"penaltyForm.controls.payment_concept_amt.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.enterPnaltyPercentage' | translate}}<span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input autocomplete=\"off\" type=\"number\" step=\"0.01\" (input)=\"getPenaltyAmount($event.target.value)\"\n                    min=\"0\" class=\"form-control\" formControlName=\"percent\">\n                </div>\n              </div>\n              <div *ngIf=\"showError  &&  (penaltyForm.controls.percent.invalid)\">\n                <div *ngIf=\"penaltyForm.controls.percent.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.enterPnaltyAmount' | translate}}<span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"number\" step=\"0.01\"\n                    (input)=\"getPenaltyPercentage($event.target.value)\" min=\"0\" class=\"form-control\"\n                    formControlName=\"amount\">\n                </div>\n              </div>\n              <div *ngIf=\"showError  &&  (penaltyForm.controls.amount.invalid)\">\n                <div *ngIf=\"penaltyForm.controls.amount.errors?.required \" class=\"show-error\">\n                  {{'addCollectionValidations.thisIsRequired' | translate}}\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.description' | translate}}</label>\n                <div class=\"form-group\">\n                  <textarea rows=\"3\" formControlName=\"description\" class=\"form-control\"></textarea>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"btn-cont text-right\">\n                <button type=\"submit\" [disabled]=\"isPenaltyFormSub\" class=\"btn btn-primary-new\">\n                  {{penaltyForm.controls.id.value ? ('addForm.updateBtn' | translate) : ('addForm.addBtn' | translate)}}</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#entityModal\" #paymentModalOpen></a>\n<div class=\"modal animated\" id=\"entityModal\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'viewCollections.applyPayment' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #paymentModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closePaymentModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addForm=\"ngForm\"\n        (ngSubmit)=\"applyCollectionPayment()\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentType' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_type\" required class=\"form-control\" [(ngModel)]=\"payment_type\"\n                    (change)=\"setPayMentType($event.target.value)\">\n                    <option value=\"\">{{'viewCollections.choose' | translate}}</option>\n                    <option value=\"1\">{{'viewCollections.payToFollowing' | translate}}</option>\n                    <option value=\"2\" [disabled]=\"disablePayToRemaining\">\n                      {{'viewCollections.payToRemainingReducePayment' | translate}}</option>\n                    <option value=\"3\" [disabled]=\"disablePayToRemaining\">\n                      {{'viewCollections.payToRemainingPayment' | translate}}</option>\n                    <option value=\"4\">{{'viewCollections.payToSpecific' | translate}}</option>\n                    <option value=\"5\">{{'viewCollections.totalPayment' | translate}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\" *ngIf=\"payment_type!=2 && payment_type !=3 && payment_type != 5\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentConcept' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_choice\" #applyPaymentChoiceId required class=\"form-control\"\n                    [(ngModel)]=\"payment_choice_id\" (ngModelChange)=\"setPaymentAmount($event)\">\n                    <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentConcepts\"\n                      [disabled]=\"bt?.is_paid_calculated || (bt?.is_disabled && payment_type==1)\" [ngValue]=\"bt\">\n                      {{bt?.name}}\n                      <span *ngIf=\"bt?.is_paid_calculated\"> | Paid</span>\n                    </option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentMethod' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_method\" #applyPaymentMethodId required class=\"form-control\"\n                    [(ngModel)]=\"payment_method_id\">\n                    <option value=\"\">{{'viewCollections.choosePaymentMethod' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentMethods\" [value]=\"bt.id\"> {{bt?.name}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.chooseBank' | translate}}</label>\n                <div class=\"form-group\">\n                  <select name=\"payment_bank\" class=\"form-control\" [(ngModel)]=\"payment_bank\">\n                    <option value=\"\">{{'viewCollections.chooseBank' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentBanks\" [ngValue]=\"bt\"> {{bt?.name}} | {{bt?.account_number}} |\n                      {{bt?.currency?.code}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <ng-container *ngIf=\"payment_type!=2 && payment_type !=3 && payment_type != 5\">\n              <div class=\"col-6\" *ngIf=\"typeOfPayment=='apply-popup' && selectedPaymentConcept\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.programmedDate' | translate}}<span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                    <input readonly class=\"form-control\" value=\"{{selectedPaymentConcept?.date | date:'dd/MMM/yyyy'}}\"\n                      name=\"pendingPayment\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\" *ngIf=\"typeOfPayment=='apply-popup'\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.pendingExtraAmt' | translate}}<span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                    <input readonly class=\"form-control\" value=\"{{pendingPayment}}\" name=\"pendingPayment\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\" *ngIf=\"typeOfPayment=='apply-popup'\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.penaltyAmount' | translate}}<span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                    <input readonly class=\"form-control\" value=\"{{penaltyAmount}}\" name=\"penaltyAmount\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\" *ngIf=\"typeOfPayment=='apply-popup'\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.currentAmtTobePaid' | translate}}<span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                    <input autocomplete=\"off\" readonly required type=\"number\" step=\"0.01\" min=\"0\" class=\"form-control\"\n                      [(ngModel)]=\"currentAmount\" name=\"currentAmount\">\n                  </div>\n                </div>\n              </div>\n            </ng-container>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.totalAmtToBePaid' | translate}}<span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"number\" step=\"0.01\" min=\"0\" class=\"form-control\"\n                    [(ngModel)]=\"paymentAmount\" name=\"paymentAmount\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentReceipt' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input type=\"file\" name=\"docFile\" #docsFile1\n                    accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                    (change)=\"onSelectFile($event.target.files, 'docFile')\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.paymentDate' | translate}}</label><span class=\"color-red\">*</span>\n                <div class=\"form-group\">\n                  <div class=\"clearfix\"></div>\n                  <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" [(ngModel)]=\"paymentDate\" autocomplete=\"off\"\n                    [style]=\"{'width':'100%'}\" name=\"date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\"\n                    (onSelect)=\"onSelect($event)\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\"\n                    [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.description' | translate}}</label>\n                <div class=\"form-group\">\n                  <textarea rows=\"3\" [(ngModel)]=\"description\" name=\"description\" class=\"form-control\"></textarea>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"btn-cont text-right\">\n                <button [disabled]=\"isApplyBtnClicked\" type=\"submit\" class=\"btn btn-primary-new\">\n                  <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                  {{'addForm.addBtn' | translate}}\n                </button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#surplusMoneyModal\" #surplusMoneyModalOpen></a>\n<div class=\"modal animated\" id=\"surplusMoneyModal\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'viewCollections.surplusMoney' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #surplusMoneyModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeSurplusMoney()\">&times;</button>\n      </div>\n\n      <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addSurplusForm=\"ngForm\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{('viewCollections.chooseWhichPaymentTypeYouwantToApplyForSurplusMoney' | translate) +' '+ (paymentAmount-calculatedPayAmount | currency) }}\n                  <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"surplus_payment_type\" required class=\"form-control\" [(ngModel)]=\"surplus_payment_type\"\n                    (change)=\"setPayMentTypeSurplus($event.target.value)\">\n                    <option value=\"\">{{'viewCollections.choose' | translate}}</option>\n                    <option value=\"1\">{{'viewCollections.payToFollowing' | translate}}</option>\n                    <option value=\"2\">{{'viewCollections.payToRemainingReducePayment' | translate}}</option>\n                    <option value=\"3\">{{'viewCollections.payToRemainingPayment' | translate}}</option>\n                    <option value=\"4\">{{'viewCollections.payToSpecific' | translate}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\" *ngIf=\"surplus_payment_type=='4'\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentConcept' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_choice13\" required [(ngModel)]=\"surplus_payment_choice_id\" class=\"form-control\"\n                    (ngModelChange)=\"setPaymentSurplusAmount($event)\">\n                    <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentConcepts\" [disabled]=\"bt?.is_paid_calculated || bt?.is_disabled\"\n                      [ngValue]=\"bt\">\n                      {{bt?.name}}\n                      <span *ngIf=\"bt?.is_paid_calculated\"> | Paid</span>\n                    </option>\n                  </select>\n                </div>\n                <p>{{'viewCollections.amountToBePaid' | translate}} : {{surplus_amt}}</p>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"btn-cont text-right\">\n                <button type=\"button\" (click)=\"closeSurplusMoney(); applyCollectionPayment()\"\n                  class=\"btn btn-primary-new\">\n                  <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                  {{'addForm.saveBtn' | translate}}</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#editPayment\" #editPaymentModalOpen></a>\n<div class=\"modal animated\" id=\"editPayment\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'quickVisualization.editPaymentMade' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #editPaymentModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeEditPaymentModal()\">&times;</button>\n      </div>\n\n\n      <div class=\"cust-tabs\" style=\"padding: 20px;    height: 500px;\n          overflow-y: scroll;\">\n        <div class=\"tab-content white-bg\">\n          <div id=\"accordion\" class=\"table-responsive main-table\">\n            <table class=\"table table-bordered table-striped table-align-center edit-table\">\n              <thead>\n                <tr>\n                  <th [style.width]=\"'210px'\" [style.z-index]=\"100\">\n                    <b>{{'quickVisualization.concept' | translate}}</b>\n                  </th>\n                  <th [style.width]=\"'130px'\">\n                    <b>{{'quickVisualization.month' | translate}}</b>\n                  </th>\n                  <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.paid' | translate}}</b>\n                  </th>\n                  <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.outstandingPayment' | translate}}</b>\n                  </th>\n                  <th [style.width]=\"'120px'\">\n                    <b>{{'quickVisualization.toBePaidByUser' | translate}}</b>\n                  </th>\n                  <th [style.width]=\"'100px'\">\n                    <b>{{'quickVisualization.action' | translate}}</b>\n                  </th>\n                  <th [style.width]=\"'100px'\">\n                    <b>{{'quickVisualization.collectionCommission' | translate}}</b>\n                  </th>\n                </tr>\n              </thead>\n              <tbody *ngFor=\"let p of paymentConcepts; let i=index\">\n                <tr [ngClass]=\"{'remaining_amt': p.key == 'remaining_amt'}\">\n                  <td>\n                    <a style=\"color: #fff;\" class=\"color-changed\" data-toggle=\"collapse\" data-parent=\"#accordion\"\n                      href=\"#collapse{{i}}\">\n                      {{p?.name}}\n                    </a>\n                  </td>\n                  <td>{{p?.date | date:'dd/MMM/yyyy'}}</td>\n                  <td>\n                    {{p?.paid_amount && p?.paid_amount>'0.1' ? (p?.paid_amount | currency) : ''}}<br>\n                  </td>\n                  <td>\n                    <span [ngClass]=\"{'red-color':p?.is_pending}\">\n                      {{p?.outstanding_amount && p?.outstanding_amount > 0 ? (p?.outstanding_amount | currency) : ''}}\n                    </span>\n                  </td>\n                  <td>\n                    {{p?.amount ? ((p?.amount || 0) | currency) : ''}}\n                  </td>\n                  <td>\n                    <button *ngIf=\"!p.calc_payment_amount && p.penalty\"\n                      (click)=\"showPenaltyPaymentPopup(p, i, 'penalty-popup', p.id)\"\n                      title=\"{{'table.title.editPenalty' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/stamp.png\" alt=\"img\"></button>\n\n                    <button *ngIf=\"!p.calc_payment_amount && p.penalty\" (click)=\"deletePenaltyPaymentPopup(p.penalty)\"\n                      title=\"{{'table.title.deletePenalty' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                  </td>\n                  <td>\n                    <button *ngIf=\"p.commission && p.commission.payment\"\n                      (click)=\"editCollectionCommReceipt(p.commission.payment)\"\n                      title=\"{{'table.title.editCCPayment' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/ic_commission.png\" alt=\"img\"></button>\n\n                    <button *ngIf=\"p.commission && p.commission.payment\"\n                      (click)=\"deleteCollectionCommReceipt(p.commission.payment)\"\n                      title=\"{{'table.title.deleteCCPayment' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                    <br>\n                    <button *ngIf=\"p.commission && p.commission.purchase_payment\"\n                      (click)=\"editCollectionCommReceipt(p.commission.purchase_payment)\"\n                      title=\"{{'table.title.editPCPayment' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/ic_commission.png\" alt=\"img\"></button>\n\n                    <button *ngIf=\"p.commission && p.commission.purchase_payment\"\n                      (click)=\"deleteCollectionCommReceipt(p.commission.purchase_payment)\"\n                      title=\"{{'table.title.deletePCPayment' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                    <br>\n                    <button *ngIf=\"p.commission && p.commission.agent_payment\"\n                      (click)=\"editCollectionCommReceipt(p.commission.agent_payment)\"\n                      title=\"{{'table.title.editACPayment' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/ic_commission.png\" alt=\"img\"></button>\n\n                    <button *ngIf=\"p.commission && p.commission.agent_payment\"\n                      (click)=\"deleteCollectionCommReceipt(p.commission.agent_payment)\"\n                      title=\"{{'table.title.deleteACPayment' | translate}}\" class=\"action-icon\"><img\n                        src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n\n                  </td>\n                </tr>\n\n\n                <tr id=\"collapse{{i}}\" class=\"panel-collapse collapse\">\n                  <td colspan=\"8\" style=\"background: #fff;\">\n                    <table>\n                      <thead style=\"background: #00B96F; color: #fff;\">\n                        <th [style.width]=\"'240px'\" [style.color]=\"'#fff'\">{{'quickVisualization.concept' | translate}}\n                        </th>\n                        <th [style.width]=\"'300px'\" [style.color]=\"'#fff'\">\n                          {{'quickVisualization.paymentDate' | translate}}</th>\n                        <th [style.width]=\"'300px'\" [style.color]=\"'#fff'\">\n                          {{'quickVisualization.paidByUser' | translate}}</th>\n                        <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">\n                          {{'quickVisualization.paymentMethods' | translate}}</th>\n                        <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">\n                          {{'quickVisualization.paymentAttachment' | translate}}</th>\n                        <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">\n                          {{'quickVisualization.paymentDescription' | translate}}</th>\n                        <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.action' | translate}}\n                        </th>\n                      </thead>\n                      <tbody *ngIf=\"p?.collection_paymentss?.length>0\">\n                        <ng-container *ngFor=\"let stats of p?.collection_paymentss; let s=index\">\n                          <tr\n                            *ngIf=\"stats.payment_type==1 || stats.payment_type==3 || stats.payment_type==4 || stats.payment_type==5\">\n                            <td [style.backgroundColor]=\"'#fff'\" [style.color]=\"'#222'\">\n                              {{p?.name || 'NA'}}\n                            </td>\n                            <td>\n                              {{stats.payment_date ? (stats.payment_date | date:'dd/MMM/yyyy') : 'NA'}}\n                            </td>\n                            <td>\n                              <span> {{stats?.amount && stats?.amount>'0.1'? (stats?.amount | currency) : ''}}</span>\n                            </td>\n                            <td>\n                              <span> {{stats?.payment_method?.name || 'NA'}}</span>\n                            </td>\n                            <td>\n                              <a class=\"green-color fontW500\" *ngIf=\"stats?.key!='total'\" target=\"_blank\"\n                                href=\"{{stats?.receipt}}\">\n                                {{'quickVisualization.view' | translate}}\n                              </a>\n                            </td>\n                            <td>\n                              <button class=\"action-icon\" *ngIf=\"stats?.description\"\n                                (click)=\"showDescription(stats?.description, 1)\">\n                                <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                              </button>\n                            </td>\n                            <td>\n                              <button class=\"action-icon\" (click)=\"showUpdatePaymentPopup(stats, i, s)\">\n                                <img src=\"assets/img/edit.png\" alt=\"img\">\n                              </button>\n                              <button [ngClass]=\"{'highlight': stats?.id==last_payment_id}\"\n                                [disabled]=\"stats?.id!=last_payment_id\" class=\"action-icon\"\n                                (click)=\"deletePayment(stats?.parent_id, i, s)\">\n                                <img src=\"assets/img/ic_delete.png\" alt=\"img\">\n                              </button>\n                            </td>\n                          </tr>\n                        </ng-container>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#updatePyamentModal\" #updatePaymentModalOpen></a>\n<div class=\"modal animated\" id=\"updatePyamentModal\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'quickVisualization.editPaymentDetails' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #updatePaymentModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeUpdatePaymentModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addForm=\"ngForm\"\n        (ngSubmit)=\"updateCollectionPayment(addForm.value)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentMethod' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_method\" #applyPaymentMethodId required class=\"form-control\"\n                    [(ngModel)]=\"payment_method_id\">\n                    <option value=\"\">{{'viewCollections.choosePaymentMethod' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentMethods\" [value]=\"bt.id\"> {{bt?.name}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <!-- <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.chooseBank' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <select name=\"payment_bank\" class=\"form-control\" [(ngModel)]=\"bank_id\" (ngModelChange)=\"get()\">\n                              <option value=\"\">{{'viewCollections.chooseBank' | translate}}</option>\n                              <option *ngFor=\"let bt of paymentBanks\" [ngValue]=\"bt\"\n                              [selected]=\"bt.bank_id == true\"> {{bt?.name}} | {{bt?.account_number}}</option>\n                        </select>\n                  </div>\n                </div>\n              </div> -->\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentReceipt' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <p *ngIf=\"docFile\">\n                    <span>\n                      <a target=\"_blank\" href=\"{{docFile}}\">{{'quickVisualization.clickToViewReceipt' | translate}}</a>\n                    </span>\n                    <span>\n                      <a class=\"remove\" (click)=\"docFile=''\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n                    </span>\n                  </p>\n                  <input *ngIf=\"!docFile\" type=\"file\" name=\"docFile\" #docsFile1\n                    accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                    (change)=\"onSelectFile($event.target.files, 'docFile')\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.paymentDate' | translate}}</label><span class=\"color-red\">*</span>\n                <div class=\"form-group\">\n                  <div class=\"clearfix\"></div>\n                  <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" autocomplete=\"off\" [(ngModel)]=\"payment_date\"\n                    [style]=\"{'width':'100%'}\" name=\"date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\"\n                    (onSelect)=\"onSelect($event)\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\"\n                    [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.description' | translate}}</label>\n                <div class=\"form-group\">\n                  <textarea rows=\"3\" [(ngModel)]=\"description\" name=\"description\" class=\"form-control\"></textarea>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"btn-cont text-right\">\n                <button type=\"submit\" class=\"btn btn-primary-new\">\n                  <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                  {{'addForm.updateBtn' | translate}}</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#coll-receipt-Modal\" #collectionReceiptOpen></a>\n<div class=\"modal animated\" id=\"coll-receipt-Modal\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'viewCollections.commissionPayment' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #collectionReceiptClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeCollReceiptModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addForm=\"ngForm\"\n        (ngSubmit)=\"applyCollectionPayment()\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.chooseCommissionType' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"commission_type\" #collectionTypeSelect required class=\"form-control\"\n                    (change)=\"setCommissionType($event.target.value)\" [(ngModel)]=\"commission_type\">\n                    <option value=\"\">{{'viewCollections.chooseCommissionType' | translate}}</option>\n                    <option value=\"1\">{{'viewCollections.purchaseCommission' | translate}}</option>\n                    <option value=\"2\">{{'viewCollections.collectionCommission' | translate}}</option>\n                    <option value=\"3\">{{'viewCollections.agentCommission' | translate}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\" *ngIf=\"commission_type==1\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentConcept' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_choice\" #applyPaymentChoiceId1 required class=\"form-control\"\n                    [(ngModel)]=\"payment_choice_id\" (ngModelChange)=\"setPaymentAmount($event)\">\n                    <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentConcepts\" [ngValue]=\"bt\"\n                      [disabled]=\"bt?.payment_made==0 || bt?.purchase_payment\"> {{bt?.payment_choice?.name}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\" *ngIf=\"commission_type==3\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentConcept' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_choice\" #applyPaymentChoiceId1 required class=\"form-control\"\n                    [(ngModel)]=\"payment_choice_id\" (ngModelChange)=\"setPaymentAmount($event)\">\n                    <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentConcepts\" [ngValue]=\"bt\"\n                      [disabled]=\"bt?.payment_made==0 || bt?.agent_payment\"> {{bt?.payment_choice?.name}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\" *ngIf=\"commission_type==2\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentConcept' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_choice\" #applyPaymentChoiceId2 required class=\"form-control\"\n                    [(ngModel)]=\"payment_choice_id\" (ngModelChange)=\"setPaymentAmount($event)\">\n                    <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentConcepts\" [ngValue]=\"bt\"\n                      [disabled]=\"bt?.payment_made==0 || bt?.payment\"> {{bt?.payment_choice?.name}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentMethod' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_method\" required #applyPaymentMethodId1 class=\"form-control\"\n                    [(ngModel)]=\"payment_method_id\">\n                    <option value=\"\">{{'viewCollections.choosePaymentMethod' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentMethods\" [value]=\"bt.id\"> {{bt?.name}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.enterPaymentAmt' | translate}}<span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input autocomplete=\"off\" readonly required type=\"number\" step=\"0.01\" min=\"0\" class=\"form-control\"\n                    [(ngModel)]=\"paymentAmount\" name=\"paymentAmount\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentReceipt' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input type=\"file\" name=\"docFile\" #docsFile2\n                    accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                    (change)=\"onSelectFile($event.target.files, 'docFile')\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.paymentDate' | translate}} <span class=\"color-red\">*</span> </label>\n                <div class=\"form-group\">\n                  <div class=\"clearfix\"></div>\n                  <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" autocomplete=\"off\" [style]=\"{'width':'100%'}\"\n                    name=\"date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\" (onSelect)=\"onSelect($event)\"\n                    [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"\n                    yearRange=\"2000:2040\"></p-calendar>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.description' | translate}}</label>\n                <div class=\"form-group\">\n                  <textarea rows=\"3\" [(ngModel)]=\"description\" name=\"description\"\n                    class=\"form-control\">{{description || ''}}</textarea>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\" *ngIf=\"commission_type!=3 || (commission_type==3 && is_external_agent==1)\">\n              <div class=\"btn-cont text-right\">\n                <button type=\"button\" class=\"btn btn-primary-new\" (click)=\"invoiceKeys = invoiceKeys ? false : true\">\n                  {{'viewCollections.addInvice' | translate}}</button>\n              </div>\n            </div>\n\n            <div *ngIf=\"invoiceKeys && !(is_external_agent==0 && commission_type==3)\" class=\"row\">\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.invoiceDate' | translate}} </label>\n                  <div class=\"form-group\">\n                    <div class=\"clearfix\"></div>\n                    <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" autocomplete=\"off\" [style]=\"{'width':'100%'}\"\n                      name=\"invoice_date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\"\n                      (onSelect)=\"onSelectInvoiceDate($event)\" [maxDate]=\"today\" showButtonBar=\"true\"\n                      [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.invoiceID' | translate}} </label>\n                  <div class=\"form-group\">\n                    <div class=\"clearfix\"></div>\n                    <input type=\"text\" [(ngModel)]=\"invoice_id\" name=\"invoice_id\" class=\"form-control\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.uploadPDF' | translate}}</label>\n                  <div class=\"form-group\">\n                    <input type=\"file\" name=\"pdf_url\" #docsFile3\n                      accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                      (change)=\"onSelectFile($event.target.files, 'pdf_url')\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.uploadXML' | translate}}</label>\n                  <div class=\"form-group\">\n                    <input type=\"file\" name=\"xml_url\" #docsFile4\n                      accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                      (change)=\"onSelectFile($event.target.files, 'xml_url')\">\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"row\" *ngIf=\"invoiceKeys || (is_external_agent==0 && commission_type==3)\">\n            <div class=\"col-12\">\n              <div class=\"btn-cont text-right\">\n                <button type=\"submit\" class=\"btn btn-primary-new\">\n                  <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                  {{'addForm.addBtn' | translate}}</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#edit-coll-receipt-Modal\" #editCollectionReceiptOpen></a>\n<div class=\"modal animated\" id=\"edit-coll-receipt-Modal\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'viewCollections.commissionPayment' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #editCollectionReceiptClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeEditCollReceiptModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addForm=\"ngForm\"\n        (ngSubmit)=\"updateCollectionCommPayment()\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentMethod' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <select name=\"payment_method\" required #applyPaymentMethodId1 class=\"form-control\"\n                    [(ngModel)]=\"payment_method_id\">\n                    <option value=\"\">{{'viewCollections.choosePaymentMethod' | translate}}</option>\n                    <option *ngFor=\"let bt of paymentMethods\" [value]=\"bt.id\"> {{bt?.name}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <!-- <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.enterPaymentAmt' | translate}}<span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" required type=\"number\" step=\"0.01\" min=\"0\" class=\"form-control\" [(ngModel)]=\"paymentAmount\" \n                        name=\"paymentAmount\">\n                  </div>\n                </div>\n              </div> -->\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.choosePaymentReceipt' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <p *ngIf=\"docFile\">\n                    <span>\n                      <a target=\"_blank\" href=\"{{docFile}}\">{{'quickVisualization.clickToViewReceipt' | translate}}</a>\n                    </span>\n                    <span>\n                      <a class=\"remove\" (click)=\"docFile=''\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n                    </span>\n                  </p>\n                  <input *ngIf=\"!docFile\" type=\"file\" name=\"docFile\" #docsFile1\n                    accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                    (change)=\"onSelectFile($event.target.files, 'docFile')\">\n                </div>\n              </div>\n              <!-- <div class=\"form-group-2\">\n                    <label>{{'viewCollections.choosePaymentReceipt' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <input type=\"file\" name=\"docFile\" #docsFile2\n                        accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                        (change)=\"onSelectFile($event.target.files)\">\n                    </div>\n                </div> -->\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.paymentDate' | translate}} <span class=\"color-red\">*</span> </label>\n                <div class=\"form-group\">\n                  <div class=\"clearfix\"></div>\n                  <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" autocomplete=\"off\" [(ngModel)]=\"payment_date\"\n                    [style]=\"{'width':'100%'}\" name=\"date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\"\n                    (onSelect)=\"onSelect($event)\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\"\n                    [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <label>{{'viewCollections.description' | translate}}</label>\n                <div class=\"form-group\">\n                  <textarea rows=\"3\" [(ngModel)]=\"description\" name=\"description2\" class=\"form-control\"></textarea>\n                </div>\n              </div>\n            </div>\n            <!-- <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                    <button type=\"submit\" class=\"btn btn-primary-new\">\n                        <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                        {{'addForm.addBtn' | translate}}</button>\n                </div>\n              </div> -->\n\n            <div class=\"row\">\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.invoiceDate' | translate}} </label>\n                  <div class=\"form-group\">\n                    <div class=\"clearfix\"></div>\n                    <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" autocomplete=\"off\" [(ngModel)]=\"invoice_date\"\n                      [style]=\"{'width':'100%'}\" name=\"invoice_date\" class=\"sz-calendar\" [locale]=\"locale\"\n                      showIcon=\"true\" (onSelect)=\"onSelectInvoiceDate($event)\" [maxDate]=\"today\" showButtonBar=\"true\"\n                      [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.invoiceID' | translate}} </label>\n                  <div class=\"form-group\">\n                    <div class=\"clearfix\"></div>\n                    <input type=\"text\" [(ngModel)]=\"invoice_id\" name=\"invoice_id\" class=\"form-control\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.uploadPDF' | translate}} </label>\n                  <div class=\"form-group\">\n                    <p *ngIf=\"pdf_url\">\n                      <span>\n                        <a target=\"_blank\"\n                          href=\"{{pdf_url}}\">{{'quickVisualization.clickToViewReceipt' | translate}}</a>\n                      </span>\n                      <span>\n                        <a class=\"remove\" (click)=\"pdf_url=''\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n                      </span>\n                    </p>\n                    <input *ngIf=\"!pdf_url\" type=\"file\" name=\"pdf_url\" #docsFile3\n                      accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                      (change)=\"onSelectFile($event.target.files, 'pdf_url')\">\n                  </div>\n                </div>\n\n                <!-- <div class=\"form-group-2\">\n                      <label>{{'viewCollections.uploadPDF' | translate}}</label>\n                      <div class=\"form-group\">\n                          <input type=\"file\" name=\"pdf_url\" #docsFile3\n                          accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                          (change)=\"onSelectFile($event.target.files, 'pdf_url')\">\n                      </div>\n                  </div> -->\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                  <label>{{'viewCollections.uploadXML' | translate}} </label>\n                  <div class=\"form-group\">\n                    <p *ngIf=\"xml_url\">\n                      <span>\n                        <a target=\"_blank\"\n                          href=\"{{xml_url}}\">{{'quickVisualization.clickToViewReceipt' | translate}}</a>\n                      </span>\n                      <span>\n                        <a class=\"remove\" (click)=\"xml_url=''\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n                      </span>\n                    </p>\n                    <input *ngIf=\"!xml_url\" type=\"file\" name=\"xml_url\" #docsFile4\n                      accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                      (change)=\"onSelectFile($event.target.files, 'xml_url')\">\n                  </div>\n                </div>\n\n                <!-- <div class=\"form-group-2\">\n                      <label>{{'viewCollections.uploadXML' | translate}}</label>\n                      <div class=\"form-group\">\n                          <input type=\"file\" name=\"xml_url\" #docsFile4\n                          accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                          (change)=\"onSelectFile($event.target.files, 'xml_url')\">\n                      </div>\n                  </div> -->\n              </div>\n              <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                  <button type=\"submit\" class=\"btn btn-primary-new\">\n                    <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                    {{'addForm.addBtn' | translate}}</button>\n                </div>\n              </div>\n            </div>\n\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#des-modal\" #viewDesModal></a>\n<div class=\"modal animated\" id=\"des-modal\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4 *ngIf=\"title==1\">{{'quickVisualization.paymentDescription' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #viewDesModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeDescModal()\">&times;</button>\n      </div>\n\n      <div class=\"modal-body\">\n        <div class=\"form-group-2\">\n          <div class=\"form-group\">\n            <textarea rows=\"4\" readonly required class=\"form-control note\" name=\"description\"\n              [(ngModel)]=\"description\"></textarea>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#collection-folders\" #foldersModalOpen></a>\n<div class=\"modal animated\" id=\"collection-folders\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4>{{'table.title.collectionFolders' | translate}}</h4>\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n          #foldersModalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeFoldersModal()\">&times;</button>\n      </div>\n\n      <div class=\"cust-tabs\" style=\"padding: 20px;    height: 500px;\n                  overflow-y: scroll;\">\n        <!-- <div id=\"accordion\" class=\"table-responsive main-table\"> -->\n        <table class=\"table table-bordered table-striped folder-table\">\n          <thead>\n            <tr>\n              <th [style.width]=\"'310px'\" [style.z-index]=\"100\">\n                <b>{{'quickVisualization.name' | translate}}</b>\n              </th>\n              <th [style.width]=\"'130px'\">\n                <b>{{'quickVisualization.docsCount' | translate}}</b>\n              </th>\n              <!-- <th [style.width]=\"'120px'\">\n                                  <b>{{'quickVisualization.lastCommit' | translate}}</b>\n                              </th> -->\n            </tr>\n          </thead>\n          <tbody *ngFor=\"let p of collectionFolders; let i=index\">\n            <tr>\n              <td>\n                <a class=\"color-changed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse{{i}}\">\n                  <img src=\"assets/img/ic_folder_1.svg\">{{p?.name}}\n                </a>\n              </td>\n              <td>{{p?.folder_docs?.length || 0}}</td>\n              <!-- <td>{{p?.updated_at | date:'dd/MMM/yyyy'}}</td> -->\n            </tr>\n\n            <tr id=\"collapse{{i}}\" class=\"panel-collapse collapse\">\n              <td colspan=\"3\">\n                <!-- add document -->\n                <div class=\"white-bg\">\n                  <div class=\"row\">\n                    <div class=\"col-8\">\n                      <p class=\"p16 marginB0\">{{'addCollection.addDocxNameAndChooseFile' | translate}}</p>\n                    </div>\n                    <div class=\"col-3 text-right\">\n                      <a class=\"add\" href=\"javascript://\" (click)=\"addDocs(i, p.id)\">\n                        <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                        {{'commonBlock.add' | translate}}\n                      </a>\n\n                      <ng-template #noAddPermissiom>\n                        <a class=\"add\" href=\"javascript://\">{{'commonBlock.add' | translate}}</a>\n                      </ng-template>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group-2\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" autocomplete=\"off\" name=\"docsName\" [(ngModel)]=\"docsName\">\n                  </div>\n                </div>\n                <div class=\"form-group-2\">\n                  <div class=\"form-group\">\n                    <input type=\"file\" name=\"docFile\" #docsFile\n                      accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                      (change)=\"onSelectFile($event.target.files, 'docFile')\">\n                  </div>\n                </div>\n\n                <!-- list all documents -->\n                <div class=\"write-note white-bg\">\n                  <div class=\"wn-block\" *ngFor=\"let item of p?.folder_docs; let s=index\">\n                    <div class=\"circle\">\n                      <span></span>\n                    </div>\n                    <a class=\"edit\" href=\"javascript://\"\n                      (click)=\"editDocsPopup(item, i, s)\">{{'addCollection.edit' | translate}}</a>\n\n                    <a class=\"delete\" href=\"javascript://\"\n                      (click)=\"deleteDocsPopup(item, i, s)\" *ngIf=\"payment_folder_id != p.id\">{{'commonBlock.delete' | translate}}</a>\n\n                    <ng-template #noDeletePermissiom>\n                      <a class=\"delete\" href=\"javascript://\" *ngIf=\"payment_folder_id != p.id\">{{'commonBlock.delete' | translate}}</a>\n                    </ng-template>\n                    <p class=\"time\" title=\"'Click to view'\">\n                      <a target=\"_blank\" href=\"{{item.display_name}}\">\n                        {{item?.name}}\n                      </a></p>\n                  </div>\n                </div>\n                <div class=\"padding20 center\" *ngIf=\"p?.folder_docs?.length == 0\">\n                  <p class=\"show-not-found\">\n                    {{'message.error.noDocumentUploadedYet' | translate}}\n                  </p>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n          <div class=\"padding20 center\" *ngIf=\"collectionFolders?.length == 0\">\n            <p class=\"show-not-found\">\n              {{'message.error.nnFolderCreated' | translate}}\n            </p>\n          </div>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Trigger the modal with a button -->\n<button type=\"button\" style=\"display: none;\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\"\n  #localityOpen>Open Modal</button>\n\n<!-- Modal -->\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <button type=\"button\" class=\"close\" (click)=\"closeEditModal()\">&times;</button>\n        <h4 class=\"modal-title\"> {{'editDocName.title' | translate}}</h4>\n      </div>\n      <form class=\"form-horizontal form-model0P\" role=\"form\" novalidate #addForm=\"ngForm\"\n        (ngSubmit)=\"checkIfLocalitySpanishNameEntered(addForm)\">\n        <div class=\"modal-body model-body10P\">\n          <div class=\"form-group\">\n            <input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"{{'editDocName.name' | translate}}\"\n              id=\"name_en\" required [(ngModel)]=\"modelForDoc.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          </div>\n\n        </div>\n        <div class=\"modal-footer btn-cont\">\n          <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary-new\">{{'editDocName.submit' | translate}}</button>\n          <button style=\"display:none;\" type=\"button\" class=\"btn btn-default\" #localityClose\n            data-dismiss=\"modal\">{{'addForm.close' | translate}}</button>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"closeEditModal()\">{{'editDocName.close' | translate}}</button>\n        </div>\n      </form>\n\n    </div>\n\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/collections/collections.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/collections/collections.component.ts ***!
  \*************************************************************/
/*! exports provided: CollectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionsComponent", function() { return CollectionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_common_api_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/api-constants */ "./src/app/common/api-constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_property_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/property.service */ "./src/app/services/property.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _models_leads_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var src_app_common_excelDownload__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/common/excelDownload */ "./src/app/common/excelDownload.ts");
/* harmony import */ var src_app_models_document_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/models/document.model */ "./src/app/models/document.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var CollectionsComponent = /** @class */ (function () {
    function CollectionsComponent(constant, apiConstants, admin, propertyService, spinner, route, router, translate, model, cs, fb, toastr, modelForDoc) {
        var _this = this;
        this.constant = constant;
        this.apiConstants = apiConstants;
        this.admin = admin;
        this.propertyService = propertyService;
        this.spinner = spinner;
        this.route = route;
        this.router = router;
        this.translate = translate;
        this.model = model;
        this.cs = cs;
        this.fb = fb;
        this.toastr = toastr;
        this.modelForDoc = modelForDoc;
        this.parameter = {};
        this.location = {};
        this.items = [];
        this.total = 0;
        this.configurations = [];
        this.price_sort = 1;
        this.availability_sort = 1;
        this.lead_sort = 1;
        this.payment_date = new Date();
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.disablePayToRemaining = true;
        this.isApplyBtnClicked = false;
        this.collectionStatusFilter = [
            { name: 'Up to Date', value: 1 },
            { name: 'Payment Period', value: 2 },
            { name: 'Overdue Payment', value: 3 },
            { name: 'Cancelled', value: 4 },
            { name: 'Settled', value: 5 },
            { name: 'Inconsistency', value: 6 },
            { name: 'Only Commission for sale', value: 7 }
        ];
        this.getExportlisting = function () {
            _this.spinner.show();
            _this.exportfinalData = [];
            var input = JSON.parse(JSON.stringify(_this.parameter));
            if (_this.parameter.deal_to_date && _this.parameter.deal_from_date) {
                input.deal_to_date = _this.parameter.deal_to_date;
                input.deal_from_date = _this.parameter.deal_from_date;
                // console.log('this.parameter.deal_from_date', this.parameter.deal_from_date);
            }
            if (_this.parameter.min) {
                input.min = moment__WEBPACK_IMPORTED_MODULE_1__(_this.parameter.min).format('YYYY-MM-DD');
            }
            else {
                delete input.min;
            }
            if (_this.parameter.max) {
                input.max = moment__WEBPACK_IMPORTED_MODULE_1__(_this.parameter.max).format('YYYY-MM-DD');
            }
            else {
                delete input.max;
            }
            if (_this.parameter.deal_purchase_date) {
                input.deal_purchase_date = moment__WEBPACK_IMPORTED_MODULE_1__(_this.parameter.deal_purchase_date).format('YYYY-MM-DD');
            }
            else {
                delete input.deal_purchase_date;
            }
            input.is_approved = _this.parameter.flag;
            input.page = 0;
            _this.admin.postDataApi('getCollection', input).subscribe(function (success) {
                _this.exportfinalData = success.data || [];
                // fetching payment status
                for (var index = 0; index < _this.items.length; index++) {
                    var element = _this.items[index];
                    var dif = (element.deal_price || 0).toFixed(2) - (element.total_deals_sum || 0).toFixed(2);
                    var currency_id = element.currency_id;
                    if (!element.total_deals_sum) {
                        element.payment_status = 6;
                    }
                    else if ((dif >= 5 && currency_id == 78) || (dif >= 0.5 && currency_id == 124)) {
                        element.payment_status = 6;
                    }
                    else if (element.next_payment && element.next_payment.date) {
                        // const diff: any = moment().diff(moment(element.next_payment.date, 'YYYY-MM-DD'), 'days', true);
                        // if (diff > 0 && diff <= 5) {
                        //   element.payment_status = 2;
                        // } else if (diff > 5) {
                        //   element.payment_status = 3;
                        // } else if (diff <= 0) {
                        //   element.payment_status = 1;
                        // }
                        element.payment_status = element.collection_status;
                    }
                    else {
                        element.payment_status = 5;
                    }
                    // fetching commissions %
                    var cc_percent = 0, cc_received = 0, cc_receipt = 0, cc_invoice = 0, cc_active = 0;
                    var pc_received = 0, pc_receipt = 0, pc_invoice = 0, pc_active = 0;
                    var ac_receipt = 0, ac_invoice = 0, ac_active = 0;
                    for (var i = 0; i < element.collection_commissions.length; i++) {
                        var ele = element.collection_commissions[i];
                        cc_percent = cc_percent + (ele.add_collection_commission ? ele.percent : 0);
                        cc_received = cc_received + (ele.add_collection_commission ? ele.amount : 0);
                        pc_received = pc_received + (ele.add_purchase_commission ? ele.purchase_comm_amount : 0);
                        // console.log('aaaaa', pc_received, ele.purchase_comm_amount)
                        if (ele.add_collection_commission) {
                            cc_active++;
                        }
                        if (ele.payment) {
                            cc_receipt++;
                            if (ele.payment.invoice_id) {
                                cc_invoice++;
                            }
                        }
                        if (ele.add_purchase_commission) {
                            pc_active++;
                        }
                        if (ele.purchase_payment) {
                            pc_receipt++;
                            if (ele.purchase_payment.invoice_id) {
                                pc_invoice++;
                            }
                        }
                        if (ele.add_agent_commission) {
                            ac_active++;
                        }
                        if (ele.agent_payment) {
                            ac_receipt++;
                            if (ele.agent_payment.invoice_id) {
                                ac_invoice++;
                            }
                        }
                    }
                    // console.log('pc_received', pc_received)
                    element['sum_pc'] = pc_received;
                    element['cc_percent'] = _this.numberUptoNDecimal((cc_percent / cc_active), 3);
                    element['cc_received'] = element.iva_percent && element.add_iva_to_cc ?
                        (cc_received + (cc_received * element.iva_percent) / 100) : cc_received;
                    element['cc_receipt'] = cc_receipt == cc_active && cc_receipt != 0 ? 1 : 0;
                    element['cc_invoice'] = cc_invoice == cc_active && cc_invoice != 0 ? 1 : 0;
                    element['pc_received'] = element.iva_percent && element.add_iva_to_pc ?
                        (pc_received + (pc_received * element.iva_percent) / 100) : pc_received;
                    element['pc_receipt'] = pc_receipt == pc_active && pc_receipt != 0 ? 1 : 0;
                    element['pc_invoice'] = pc_invoice == pc_active && pc_invoice != 0 ? 1 : 0;
                    element['ac_receipt'] = ac_receipt == ac_active && ac_receipt != 0 ? 1 : 0;
                    element['ac_invoice'] = ac_invoice == ac_active && ac_invoice != 0 ? 1 : 0;
                }
                _this.makeExportData();
                _this.spinner.hide();
            }, function (error) {
                //  console.log(error);
                _this.spinner.hide();
            });
        };
        this.makeExportData = function () {
            if (_this.exportfinalData.length > 0) {
                var tempExportData = [];
                for (var index = 0; index < _this.exportfinalData.length; index++) {
                    var p = _this.exportfinalData[index];
                    tempExportData.push({
                        'ID Account': p.id || '',
                        'Buyer Name': (p.buyer_type == 2) ? (p.buyer_legal_entity || {}).comm_name || '' : (p.buyer || {}).name + ' ' + (p.buyer || {}).first_surname + ' ' + (p.buyer || {}).second_surname || '',
                        'Buyer Legal Representative': (p.buyer_type == 2) ? (((p.buyer_legal_entity || {}).legal_reps || {}).name) ? (((p.buyer_legal_entity || {}).legal_reps || {}).name + ' ' + ((p.buyer_legal_entity || {}).legal_reps || {}).first_surname + ' ' + ((p.buyer_legal_entity || {}).legal_reps || {}).second_surname) : ''
                            : (((p.buyer || {}).legal_representative || {}).name) ? (((p.buyer || {}).legal_representative || {}).name + ' ' + ((p.buyer || {}).legal_representative || {}).first_surname + ' ' + ((p.buyer || {}).legal_representative || {}).second_surname) : '',
                        'Seller Name': (p.seller_type == 2) ? (p.seller_legal_entity || {}).comm_name || '' : (p.seller || {}).name + ' ' + (p.seller || {}).first_surname + ' ' + (p.seller || {}).second_surname,
                        'Seller Legal Representative': (p.seller_type == 2) ? ((p.seller_legal_entity || {}).legal_reps || {}).name + ' ' + ((p.seller_legal_entity || {}).legal_reps || {}).first_surname + ' ' + ((p.seller_legal_entity || {}).legal_reps || {}).second_surname :
                            ((p.seller || {}).legal_representative || {}).name + ' ' + ((p.seller || {}).legal_representative || {}).first_surname + ' ' + ((p.seller || {}).legal_representative || {}).second_surname,
                        'Name of Building': ((p.property || {}).building || {}).name || '',
                        'Name of Tower': ((p.property || {}).building_towers || {}).tower_name || '',
                        'Name of Apartment': (p.property || {}).name || '',
                        'Configuration': ((p.property || {}).building_configuration || {}).name || '',
                        'Locality': ((p.property || {}).locality || {}).name || '',
                        'Purchase Date': p.deal_purchase_date ? _this.getDateWRTTimezone(p.deal_purchase_date, 'DD/MMM/YYYY') : '',
                        'Last Concept': p.last_payment ? _this.getLastPaymentConcept(p) : '',
                        'Last Date Of Payment': (p.last_payment || {}).payment_date ? (p.last_payment || {}).payment_date : '',
                        'Last Amount': '$ ' + ((p.last_payment || {}).collection_amount || 0),
                        'Next Concept': (p.next_payment || {}).name || '',
                        'Next Date Of Payment': (p.next_payment || {}).date ? (p.next_payment || {}).date : '',
                        'Next Amount': '$ ' + (((p.next_payment || {}).amount || 0) - ((p.next_payment || {}).calc_payment_amount || 0)),
                        'Currency': (p.currency || {}).code || '',
                        'Sozu Commission (in %)': p.comm_total_commission ? p.comm_total_commission : 0,
                        'IVA Added in Amount': p.add_iva_to_pc ? 'Yes' : 'No',
                        'PC Amount': '$ ' + (p.pc_received || 0),
                        'PC Receipt': p.pc_receipt ? 'Yes' : 'No',
                        'PC Invoice': p.pc_invoice ? 'Yes' : 'No',
                        'Collection Commission (in %)': p.cc_percent || 0,
                        'IVA Added in Amount 2': p.add_iva_to_cc ? 'Yes' : 'No',
                        'CC Amount': '$ ' + (p.cc_received || 0),
                        'CC Receipt': p.cc_receipt ? 'Yes' : 'No',
                        'CC Invoice': p.cc_invoice ? 'Yes' : 'No',
                        'Agent Commission (in %)': p.comm_shared_commission ? p.comm_shared_commission : 0,
                        'IVA Added in Amount 3': p.add_iva_to_ac ? 'Yes' : 'No',
                        'AC Receipt': p.ac_receipt ? 'Yes' : 'No',
                        'AC Invoice': p.ac_invoice ? 'Yes' : 'No',
                        'Commission Agent': (((p.deal_commission_agents || [])[0] || []).broker || {}).name ? ((((p.deal_commission_agents || [])[0] || []).broker || {}).name + ' ' + (((p.deal_commission_agents || [])[0] || []).broker || {}).first_surname + ' ' + (((p.deal_commission_agents || [])[0] || []).broker || {}).second_surname) : '',
                        'Price': '$ ' + (p.deal_price || 0),
                        'Penalty': '$ ' + (p.penalty || 0),
                        'Amount Paid': '$ ' + (p.total_payment_recieved || 0),
                        'Remanining Amount': '$ ' + (_this.getRemainingAmt(p) || 0),
                    });
                }
                new src_app_common_excelDownload__WEBPACK_IMPORTED_MODULE_13__["ExcelDownload"]().exportAsExcelFile(tempExportData, 'collections');
            }
        };
    }
    CollectionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.admin.globalSettings$.subscribe(function (success) {
            _this.cashLimit = success['cash_limit'];
        });
        this.isPenaltyFormSub = false;
        this.invoiceKeys = false;
        this.showError = false;
        this.today = new Date();
        this.commission_type = '';
        this.parameter.flag = 1;
        this.model = new _models_leads_model__WEBPACK_IMPORTED_MODULE_9__["Notes"]();
        this.initPenaltyForm();
        this.parameter.itemsPerPage = 25; // this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.dash_flag = this.propertyService.dash_flag ? this.propertyService.dash_flag : this.constant.dash_flag;
        this.getPaymentMethods();
        this.getCountries();
        this.initCalendarLocale();
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.parameter.collection_id = params['id'];
                _this.parameter.dash_flag = 4;
            }
        });
        this.getListing();
    };
    CollectionsComponent.prototype.initCalendarLocale = function () {
        if (this.translate.defaultLang === 'en') {
            this.locale = {
                firstDayOfWeek: 0,
                dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                    'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'mm/dd/yy',
                weekHeader: 'Wk',
                dataType: 'string'
            };
        }
        else {
            this.locale = {
                firstDayOfWeek: 0,
                dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
                monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                today: 'Hoy',
                clear: 'Clara',
                dateFormat: 'mm/dd/yy',
                weekHeader: 'Sm',
                dataType: 'string'
            };
        }
    };
    CollectionsComponent.prototype.initPenaltyForm = function () {
        this.penaltyForm = this.fb.group({
            id: [''],
            collection_payment_choice_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required]],
            amount: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required]],
            description: [''],
            percent: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required],
            payment_concept_amt: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required]
        });
    };
    Object.defineProperty(CollectionsComponent.prototype, "getPenaltyControls", {
        get: function () {
            return this.penaltyForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    CollectionsComponent.prototype.getListing = function () {
        var _this = this;
        this.spinner.show();
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.deal_to_date && this.parameter.deal_from_date) {
            input.deal_to_date = this.parameter.deal_to_date;
            input.deal_from_date = this.parameter.deal_from_date;
            // console.log('this.parameter.deal_from_date', this.parameter.deal_from_date);
        }
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.parameter.deal_purchase_date) {
            input.deal_purchase_date = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.deal_purchase_date).format('YYYY-MM-DD');
        }
        else {
            delete input.deal_purchase_date;
        }
        input.is_approved = this.parameter.flag;
        this.admin.postDataApi('getCollection', input).subscribe(function (success) {
            //  console.log('getcollection ', success);
            _this.items = success.data;
            _this.total = success.total_count;
            // fetching payment status
            for (var index = 0; index < _this.items.length; index++) {
                var element = _this.items[index];
                var dif = (element.deal_price || 0).toFixed(2) - (element.total_deals_sum || 0).toFixed(2);
                var currency_id = element.currency_id;
                if (!element.total_deals_sum) {
                    element.payment_status = 6;
                }
                else if ((dif >= 5 && currency_id == 78) || (dif >= 0.5 && currency_id == 124)) {
                    element.payment_status = 6;
                }
                else if (element.next_payment && element.next_payment.date) {
                    // const diff: any = moment().diff(moment(element.next_payment.date, 'YYYY-MM-DD'), 'days', true);
                    // if (diff > 0 && diff <= 5) {
                    //   element.payment_status = 2;
                    // } else if (diff > 5) {
                    //   element.payment_status = 3;
                    // } else if (diff <= 0) {
                    //   element.payment_status = 1;
                    // }
                    element.payment_status = element.collection_status;
                }
                else {
                    element.payment_status = 5;
                }
                // fetching commissions %
                var cc_percent = 0, cc_received = 0, cc_receipt = 0, cc_invoice = 0, cc_active = 0;
                var pc_received = 0, pc_receipt = 0, pc_invoice = 0, pc_active = 0;
                var ac_receipt = 0, ac_invoice = 0, ac_active = 0;
                for (var i = 0; i < element.collection_commissions.length; i++) {
                    var ele = element.collection_commissions[i];
                    cc_percent = cc_percent + (ele.add_collection_commission ? ele.percent : 0);
                    cc_received = cc_received + (ele.add_collection_commission ? ele.amount : 0);
                    pc_received = pc_received + (ele.add_purchase_commission ? ele.purchase_comm_amount : 0);
                    // console.log('aaaaa', pc_received, ele.purchase_comm_amount)
                    if (ele.add_collection_commission) {
                        cc_active++;
                    }
                    if (ele.payment) {
                        cc_receipt++;
                        if (ele.payment.invoice_id) {
                            cc_invoice++;
                        }
                    }
                    if (ele.add_purchase_commission) {
                        pc_active++;
                    }
                    if (ele.purchase_payment) {
                        pc_receipt++;
                        if (ele.purchase_payment.invoice_id) {
                            pc_invoice++;
                        }
                    }
                    if (ele.add_agent_commission) {
                        ac_active++;
                    }
                    if (ele.agent_payment) {
                        ac_receipt++;
                        if (ele.agent_payment.invoice_id) {
                            ac_invoice++;
                        }
                    }
                }
                // console.log('pc_received', pc_received)
                element['sum_pc'] = pc_received;
                element['cc_percent'] = _this.numberUptoNDecimal((cc_percent / cc_active), 3);
                element['cc_received'] = element.iva_percent && element.add_iva_to_cc ?
                    (cc_received + (cc_received * element.iva_percent) / 100) : cc_received;
                element['cc_receipt'] = cc_receipt == cc_active && cc_receipt != 0 ? 1 : 0;
                element['cc_invoice'] = cc_invoice == cc_active && cc_invoice != 0 ? 1 : 0;
                element['pc_received'] = element.iva_percent && element.add_iva_to_pc ?
                    (pc_received + (pc_received * element.iva_percent) / 100) : pc_received;
                element['pc_receipt'] = pc_receipt == pc_active && pc_receipt != 0 ? 1 : 0;
                element['pc_invoice'] = pc_invoice == pc_active && pc_invoice != 0 ? 1 : 0;
                element['ac_receipt'] = ac_receipt == ac_active && ac_receipt != 0 ? 1 : 0;
                element['ac_invoice'] = ac_invoice == ac_active && ac_invoice != 0 ? 1 : 0;
            }
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CollectionsComponent.prototype.getPaymentMethods = function () {
        var _this = this;
        this.admin.postDataApi('getPaymentMethods', {})
            .subscribe(function (success) {
            _this.paymentMethods = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CollectionsComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CollectionsComponent.prototype.getPropertyConfigurations = function () {
        var _this = this;
        this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(function (r) {
            _this.configurations = r['data'];
        });
    };
    CollectionsComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CollectionsComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CollectionsComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CollectionsComponent.prototype.onLocalityChange = function (id) {
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
    };
    CollectionsComponent.prototype.getLocalityBuildings = function (id) {
        var _this = this;
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.spinner.show();
        this.admin.postDataApi('getLocalityBuildings', this.parameter)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.buildings = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CollectionsComponent.prototype.setBuilding = function (building_id) {
        this.parameter.building_id = building_id;
    };
    CollectionsComponent.prototype.changeFlag = function (flag) {
        this.parameter.dash_flag = flag;
        this.propertyService.dash_flag = flag;
        if (flag === 5) {
            return false;
        }
        this.resetDates();
        this.getListing();
    };
    CollectionsComponent.prototype.changeAppUnappFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.page = this.constant.p;
        this.getListing();
    };
    CollectionsComponent.prototype.sort_by = function (sort_by) {
        if (this.parameter.sort_by !== sort_by) {
            this.parameter.sort_by = sort_by;
            this.parameter.sort_by_order = 1;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CollectionsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CollectionsComponent.prototype.openCancellationModal = function (item, status) {
        this.item = item;
        this.parameter.status = status;
        this.modalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.changeStatus = function (item, status) {
        var _this = this;
        item.is_approved = status;
        var input = { id: item.id, is_approved: status };
        this.admin.postDataApi('approveCollection', input).subscribe(function (r) {
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.collectionStatusChanged'), _this.translate.instant('swal.success'));
        }, function (error) {
            _this.toastr.clear();
            _this.toastr.error(error.error.message, _this.translate.instant('swal.error'));
        });
    };
    CollectionsComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.dash_flag = this.constant.dash_flag;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
    };
    CollectionsComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CollectionsComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeleteCollection'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteCollection(item, index);
            }
        });
    };
    CollectionsComponent.prototype.deleteCollection = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteCollection', { id: item.id }).subscribe(function (r) {
            _this.toastr.success(_this.translate.instant('message.success.deletedSuccessfully'), _this.translate.instant('swal.success'));
            _this.items.splice(index, 1);
        }, function (error) {
            _this.toastr.error(error.error.message, _this.translate.instant('swal.error'));
        });
    };
    CollectionsComponent.prototype.cancelPopup = function (item, index, status) {
        var _this = this;
        var t = status == 1 ?
            this.translate.instant('message.error.wantToCancelCollection') :
            this.translate.instant('message.error.wantToActiveCollection');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + t,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.cancelPropertyCollections(item, index, status);
            }
        });
    };
    CollectionsComponent.prototype.cancelPropertyCollections = function (item, index, status) {
        var _this = this;
        this.admin.postDataApi('cancelPropertyCollections', { property_collection_id: item.id, status: status }).subscribe(function (r) {
            var t = status == 1 ?
                _this.translate.instant('message.success.cancelledSuccessfully') :
                _this.translate.instant('message.success.activedSuccessfully');
            _this.toastr.success(t, _this.translate.instant('swal.success'));
            _this.items[index].is_cancelled = status;
        }, function (error) {
            _this.toastr.error(error.error.message, _this.translate.instant('swal.error'));
        });
    };
    CollectionsComponent.prototype.getNotes = function (item) {
        var _this = this;
        this.property_collection_id = item.id;
        var input = { property_collection_id: item.id };
        this.admin.postDataApi('getCollectionNote', input).subscribe(function (r) {
            _this.parameter.items = r.data;
            _this.notesModalOpen.nativeElement.click();
        });
    };
    CollectionsComponent.prototype.closeNotesModal = function () {
        this.notesModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.addNote = function () {
        var _this = this;
        if (!this.model.note) {
            return;
        }
        this.spinner.show();
        this.admin.postDataApi('collectionNote', { property_collection_id: this.property_collection_id, note: this.model.note }).subscribe(function (r) {
            _this.spinner.hide();
            _this.model = new _models_leads_model__WEBPACK_IMPORTED_MODULE_9__["Notes"]();
            _this.parameter.items.push(r.data);
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.addedSuccessfully'), _this.translate.instant('swal.success'));
            _this.closeNotesModal();
        });
    };
    CollectionsComponent.prototype.deleteLeadPopup = function (note_id, index) {
        var _this = this;
        this.parameter.text = this.translate.instant('message.error.wantToDeleteNote');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Delete!'
        }).then(function (result) {
            if (result.value) {
                _this.deleteLeadNote(note_id, index);
            }
        });
    };
    CollectionsComponent.prototype.deleteLeadNote = function (note_id, index) {
        var _this = this;
        this.admin.postDataApi('deleteCollectionNote', { id: note_id }).subscribe(function (r) {
            _this.parameter.items.splice(index, 1);
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.deletedSuccessfully'), _this.translate.instant('swal.success'));
        });
    };
    CollectionsComponent.prototype.showEditPaymentPopup = function (item, i) {
        this.paymentConcepts = [];
        this.property_collection_id = item.id;
        this.collectionIndex = i;
        // adding purchase and collection commission in payment concept
        if (item.collection_commissions && item.collection_commissions.length > 0) {
            for (var index = 0; index < item.collection_commissions.length; index++) {
                var element = item.collection_commissions[index];
                if (item.payment_choices[index]) {
                    item.payment_choices[index]['commission'] = element;
                }
            }
        }
        this.paymentConcepts = item.payment_choices.slice();
        // this.last_payment_id = item.last_payment ? item.last_payment.collection_payment_id : '';
        this.last_payment_id = item.last_payment ? item.last_payment.parent_id : '';
        this.seller_type = item.seller_type;
        this.showPaymentBanks(item);
        this.getCollectionDetails();
        this.editPaymentModalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.showUpdatePaymentPopup = function (item, i) {
        this.payment_id = item.id;
        this.payment_type = item.payment_type;
        this.payment_method_id = item.payment_method.id;
        this.payment_bank = item.payment_bank ? item.payment_bank.id : 0;
        this.description = item.description;
        this.docFile = item.receipt;
        this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
        this.closeEditPaymentModal();
        this.updatePaymentModalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.closeUpdatePaymentModal = function () {
        this.updatePaymentModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.updateCollectionPayment = function (formdata) {
        var _this = this;
        // checking if date selected and receipt selected
        if (!this.payment_date) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.docFile) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
            return false;
        }
        var offset = new Date(this.payment_date).getTimezoneOffset();
        if (offset < 0) {
            this.payment_date = moment__WEBPACK_IMPORTED_MODULE_1__(this.payment_date).subtract(offset, 'minutes').toDate();
        }
        else {
            this.payment_date = moment__WEBPACK_IMPORTED_MODULE_1__(this.payment_date).add(offset, 'minutes').toDate();
        }
        // inpur params
        var input = {
            payment_id: this.payment_id,
            payment_method_id: this.payment_method_id,
            // is_agency: this.payment_bank ? this.payment_bank.is_agency : null,
            // bank_id: this.payment_bank ? this.payment_bank.bank_id : null,
            // legal_rep_bank_id: this.payment_bank ? this.payment_bank.legal_rep_bank_id : null,
            receipt: this.docFile,
            description: this.description,
            payment_date: this.payment_date
        };
        this.admin.postDataApi('updateCollectionPayment', input).subscribe(function (r) {
            _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
            _this.closeUpdatePaymentModal();
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully'), _this.translate.instant('swal.success'));
        }, function (error) {
            _this.toastr.error(error.message, _this.translate.instant('swal.error'));
            return false;
        });
    };
    CollectionsComponent.prototype.getCollectionDetails = function () {
        var reducingP = [];
        for (var index = 0; index < this.paymentConcepts.length; index++) {
            var m = this.paymentConcepts[index];
            m.payment_date = m.collection_payment > 0 ? this.getDateWRTTimezone(m.collection_payment.payment_date, 'YYYY-MM-DD') : '';
            m.paid_amount = m.calc_payment_amount ? m.calc_payment_amount : 0;
            var c = {};
            // if type=2 means reducing payment => add one more row
            if (m.collection_paymentss && m.collection_paymentss.length > 0) {
                for (var i = 0; i < m.collection_paymentss.length; i++) {
                    var paymnts = m.collection_paymentss[i];
                    paymnts.payment_bank = null;
                    // payment bank
                    if (paymnts.is_agency == 1) {
                        // payment directly received by agency
                        if (paymnts.bank_id) {
                            // agency bank
                            paymnts['payment_bank'] = paymnts.agency_banks;
                        }
                        else if (paymnts.legal_rep_bank_id) {
                            // agency legal rep bank
                            paymnts['payment_bank'] = paymnts.legal_rep_bank;
                        }
                    }
                    else {
                        // payment directly received by seller
                        if (this.seller_type != 2) {
                            if (paymnts.bank_id) {
                                // seller bank
                                paymnts['payment_bank'] = paymnts.legal_representative_banks;
                            }
                            else if (paymnts.legal_rep_bank_id) {
                                // seller legal rep bank
                                paymnts['payment_bank'] = paymnts.legal_rep_bank;
                            }
                        }
                        else {
                            if (paymnts.bank_id) {
                                // seller bank
                                paymnts['payment_bank'] = paymnts.legal_entitiy_bank;
                            }
                            else if (paymnts.legal_rep_bank_id) {
                                // seller legal rep bank
                                paymnts['payment_bank'] = paymnts.legal_rep_bank;
                            }
                        }
                    }
                    c = {
                        key: 'remaining_amt',
                        name: '',
                        paid_amount: paymnts.full_amount,
                        is_paid_calculated: 0,
                        outstanding_amount: 0,
                        index: index + i,
                        payment_type: 2,
                        receipt: paymnts.receipt,
                        description: paymnts.description,
                        display_choice_id: paymnts.display_choice_id,
                        created_at: paymnts.created_at
                    };
                    if (paymnts.payment_type == 2) {
                        c['name'] = 'Payment to remaining (Reduce Amount)';
                        c['collection_paymentss'] = [{
                                id: paymnts.id,
                                parent_id: paymnts.parent_id,
                                payment_type: 1,
                                paid_amount: paymnts.amount,
                                amount: paymnts.amount,
                                payment_date: this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                receipt: paymnts.receipt,
                                description: paymnts.description,
                                payment_method: paymnts.payment_method,
                                payment_bank: paymnts.payment_bank
                            }];
                        reducingP.push(c);
                    }
                    else if (paymnts.payment_type == 3 && paymnts.display_choice_id) {
                        c['name'] = 'Payment to remaining (Reduce Time)';
                        c['collection_paymentss'] = [{
                                id: paymnts.id,
                                parent_id: paymnts.parent_id,
                                payment_type: 3,
                                paid_amount: paymnts.full_amount,
                                amount: paymnts.full_amount,
                                payment_date: this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                receipt: paymnts.receipt,
                                description: paymnts.description,
                                payment_method: paymnts.payment_method,
                                payment_bank: paymnts.payment_bank
                            }];
                        reducingP.push(c);
                    }
                    else if (paymnts.payment_type == 5 && paymnts.display_choice_id) {
                        c['name'] = 'Total Payment';
                        c['collection_paymentss'] = [{
                                id: paymnts.id,
                                parent_id: paymnts.parent_id,
                                payment_type: 5,
                                paid_amount: paymnts.full_amount,
                                amount: paymnts.full_amount,
                                payment_date: this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                receipt: paymnts.receipt,
                                description: paymnts.description,
                                payment_method: paymnts.payment_method,
                                payment_bank: paymnts.payment_bank
                            }];
                        reducingP.push(c);
                    }
                }
            }
            m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
            if ((m.amount - (m.calc_payment_amount || 0)) >= 0) {
                var a = (m.calc_payment_amount || 0);
                m['is_pending'] = a ? 1 : 0;
            }
        }
        // now insert at reducing remaining payments at type=2 index
        // sorting reducingP according to date => in case user is paying using type 3 consecutively many times
        reducingP.sort(this.sortFunction);
        for (var i = 0; i < reducingP.length; i++) {
            var element = reducingP[i];
            // for payment_type 3,5 check display_choice_id
            // loop is for if need to insert 2 type 2 payments on same index
            for (var j = 0; j < this.paymentConcepts.length; j++) {
                var e = this.paymentConcepts[j];
                if (e.id == element.display_choice_id) {
                    this.paymentConcepts.splice(j, 0, element);
                    break;
                }
            }
        }
        // calculating new paid amt, by skipping type 2
        for (var index = 0; index < this.paymentConcepts.length; index++) {
            var element = this.paymentConcepts[index];
            if (element.collection_paymentss && element.collection_paymentss.length > 0) {
                for (var i = 0; i < element.collection_paymentss.length; i++) {
                    var ele = element.collection_paymentss[i];
                    if (ele.payment_type == 2) {
                        var v = ele.amt_share || 0;
                        var ids = ele.choices_ids.split(',');
                        for (var j = 0; j < this.paymentConcepts.length; j++) {
                            var e = this.paymentConcepts[j];
                            if (e.id) {
                                var d = e.id.toString();
                                var h = ids.indexOf(d);
                                if (h >= 0) {
                                    var obj = {
                                        id: ele.id,
                                        amount: v,
                                        name: 'Payment to remaining (Reduce Amount)',
                                        payment_type: 1,
                                        paid_amount: v,
                                        payment_date: this.getDateWRTTimezone(ele.payment_date, 'YYYY-MM-DD'),
                                        receipt: ele.receipt,
                                        description: ele.description,
                                        payment_method: ele.payment_method,
                                        payment_bank: ele.payment_bank
                                    };
                                    this.paymentConcepts[j].paid_amount = parseFloat(this.paymentConcepts[j].paid_amount) - parseFloat(v);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    CollectionsComponent.prototype.deletePayment = function (payment_id, mainIndex, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeletePayment'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                // this.admin.postDataApi('deleteCollectionPayment', {payment_id: payment_id})
                _this.admin.postDataApi('deletePayment', { parent_id: payment_id })
                    .subscribe(function (success) {
                    // this.paymentConcepts[mainIndex].collection_paymentss.splice(index, 1);
                    _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
                    _this.closeEditPaymentModal();
                    _this.toastr.clear();
                    _this.toastr.success(_this.translate.instant('message.success.deletedSuccessfully'), _this.translate.instant('swal.success'));
                }, function (error) {
                    _this.toastr.error(error.message, _this.translate.instant('swal.error'));
                });
            }
        });
    };
    CollectionsComponent.prototype.showApplyPaymentPopup = function (item, i, type) {
        this.paymentConcepts = [];
        this.surplus_payment_type = null;
        this.payment_type = null;
        this.paymentDate = null;
        this.payment_choice_id = null;
        this.property_collection_id = item.id;
        this.typeOfPayment = type;
        this.collectionIndex = i;
        this.paymentConcepts = item.payment_choices.slice();
        var check = this.paymentConcepts.find(function (r) { return r.name.includes('Monthly Installment'); });
        this.disablePayToRemaining = true;
        if (check) {
            this.disablePayToRemaining = false;
        }
        this.calculateCash();
        this.showPaymentBanks(item);
        this.paymentModalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.calculateCash = function () {
        this.cashSum = 0;
        for (var index = 0; index < this.paymentConcepts.length; index++) {
            var m = this.paymentConcepts[index];
            if (m.collection_paymentss && m.collection_paymentss.length > 0) {
                for (var i = 0; i < m.collection_paymentss.length; i++) {
                    var paymnts = m.collection_paymentss[i];
                    // console.log(paymnts);
                    if (paymnts.payment_method_id == this.apiConstants.payment_method_id) {
                        this.cashSum = parseFloat(this.cashSum) + parseFloat(paymnts.amount);
                    }
                }
            }
        }
    };
    CollectionsComponent.prototype.showPaymentBanks = function (item) {
        // payment banks
        this.paymentBanks = [];
        if (item.payment_received_by) {
            // payment directly received by agency
            if (item.property.building && item.property.building.agency_id) {
                // agency banks
                for (var index = 0; index < item.property.building.agency.agency_banks.length; index++) {
                    var element = item.property.building.agency.agency_banks[index];
                    element.name = 'Agency Bank | ' + element.bank_name;
                    element.is_agency = 1;
                    element.bank_id = element.id;
                    element.legal_rep_bank_id = null;
                    this.paymentBanks.push(element);
                }
                // agency legal representative banks
                if (item.property.building.agency.legal_representative) {
                    for (var index = 0; index < item.property.building.agency.legal_representative.legal_rep_banks.length; index++) {
                        var element = item.property.building.agency.legal_representative.legal_rep_banks[index];
                        element.name = 'Agency Legal Rep Bank | ' + element.bank_name;
                        element.is_agency = 1;
                        element.bank_id = null;
                        element.legal_rep_bank_id = element.id;
                        this.paymentBanks.push(element);
                    }
                }
            }
        }
        else {
            // payment directly received by seller
            if (item.seller_type != 2) {
                // seller (as a person or developer) banks
                for (var index = 0; index < item.seller.legal_rep_banks.length; index++) {
                    var element = item.seller.legal_rep_banks[index];
                    element.name = 'Seller Bank | ' + element.bank_name;
                    element.is_agency = 2;
                    element.bank_id = element.id;
                    element.legal_rep_bank_id = null;
                    this.paymentBanks.push(element);
                }
                // agency legal representative banks
                if (item.seller.legal_representative) {
                    for (var index = 0; index < item.seller.legal_representative.legal_rep_banks.length; index++) {
                        var element = item.seller.legal_representative.legal_rep_banks[index];
                        element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
                        element.is_agency = 2;
                        element.bank_id = null;
                        element.legal_rep_bank_id = element.id;
                        this.paymentBanks.push(element);
                    }
                }
            }
            else {
                // seller (as a legal entity) banks
                if (item.seller_legal_entity && item.seller_legal_entity.legal_entity_banks) {
                    for (var index = 0; index < item.seller_legal_entity.legal_entity_banks.length; index++) {
                        var element = item.seller_legal_entity.legal_entity_banks[index];
                        element.name = 'Seller Bank | ' + element.bank_name;
                        element.is_agency = 2;
                        element.bank_id = element.id;
                        element.legal_rep_bank_id = null;
                        this.paymentBanks.push(element);
                    }
                    // agency legal representative banks
                    if (item.seller_legal_entity.legal_reps && item.seller_legal_entity.legal_reps.legal_rep_banks) {
                        for (var index = 0; index < item.seller_legal_entity.legal_reps.legal_rep_banks.length; index++) {
                            var element = item.seller_legal_entity.legal_reps.legal_rep_banks[index];
                            element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
                            element.is_agency = 2;
                            element.bank_id = null;
                            element.legal_rep_bank_id = element.id;
                            this.paymentBanks.push(element);
                        }
                    }
                }
            }
        }
    };
    CollectionsComponent.prototype.setPaymentConceptAmount = function (id) {
        var _this = this;
        this.paymentConcepts.map(function (r) {
            if (r.id == id) {
                _this.penaltyForm.controls.payment_concept_amt.patchValue(r.amount || 0);
            }
        });
    };
    CollectionsComponent.prototype.setPaymentAmount = function (item) {
        if (this.typeOfPayment === 'commission-popup') {
            if (this.commission_type == 1 && item.add_purchase_commission == 0) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.pleaseEnablePurchaseCommission'), this.translate.instant('swal.error'));
                this.closeCollReceiptModal();
                return false;
            }
            if (this.commission_type == 2 && item.add_collection_commission == 0) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.pleaseEnableCollectionCommission'), this.translate.instant('swal.error'));
                this.closeCollReceiptModal();
                return false;
            }
            if (this.commission_type == 3 && item.add_agent_commission == 0) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.pleaseEnableAgentCommission'), this.translate.instant('swal.error'));
                this.closeCollReceiptModal();
                return false;
            }
            this.ivaAmount = 0;
            if (this.commission_type == 1) {
                this.paymentAmount = item.purchase_comm_amount || 0;
                if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_pc)) {
                    this.ivaAmount = (this.paymentAmount * this.selectedItem.iva_percent) / 100;
                    this.paymentAmount = this.paymentAmount + this.ivaAmount;
                }
            }
            else if (this.commission_type == 3) {
                this.paymentAmount = item.agent_comm_amount || 0;
                if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_ac)) {
                    this.ivaAmount = (this.paymentAmount * this.selectedItem.iva_percent) / 100;
                    this.paymentAmount = this.paymentAmount + this.ivaAmount;
                }
            }
            else {
                this.paymentAmount = item.amount || 0;
                if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_cc)) {
                    this.ivaAmount = (this.paymentAmount * this.selectedItem.iva_percent) / 100;
                    this.paymentAmount = this.paymentAmount + this.ivaAmount;
                }
            }
            // this.paymentAmount = this.commission_type == 1 ? (item.purchase_comm_amount || 0) : (item.amount || 0);
            this.selectedCollectionCommission = item;
        }
        else {
            this.selectedPaymentConcept = item;
            var amt = 0;
            var penaltyamt = 0;
            var amtPaid = 0;
            var currentAmt = 0;
            var currentAmtPaid = 0;
            // checking if method is pay to specific (4), then user will pay only for that specific installment
            // + user cannot pay more than the amount+penalty
            if (this.payment_type == 4) {
                currentAmt = item['amount'];
                currentAmtPaid = item['calc_payment_amount'] || 0;
                this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
                this.pendingPayment = 0.00; // amt already paid
                this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
                this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) +
                    parseFloat(this.penaltyAmount)).toFixed(2);
                this.calculatedPayAmount = this.paymentAmount.slice();
            }
            else if (this.payment_type == 1) {
                for (var index = 0; index < this.paymentConcepts.length; index++) {
                    var r = this.paymentConcepts[index];
                    currentAmt = r['amount'];
                    currentAmtPaid = r['calc_payment_amount'] || 0;
                    if (r['id'] != item['id']) {
                        penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
                        amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
                        amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
                    }
                    else {
                        break;
                    }
                }
                this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
                this.pendingPayment = (amt - amtPaid).toFixed(2);
                this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
                this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) + parseFloat(this.penaltyAmount)).toFixed(2);
                this.calculatedPayAmount = this.paymentAmount.slice();
            }
        }
    };
    CollectionsComponent.prototype.closePaymentModal = function () {
        this.paymentModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.closeEditPaymentModal = function () {
        this.paymentConcepts = [];
        this.editPaymentModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.onSelect = function (e) {
        this.paymentDate = moment__WEBPACK_IMPORTED_MODULE_1__["utc"](e).toDate();
    };
    CollectionsComponent.prototype.onSelectInvoiceDate = function (e) {
        this.invoice_date = moment__WEBPACK_IMPORTED_MODULE_1__["utc"](e).toDate();
    };
    CollectionsComponent.prototype.applyCollectionPayment = function () {
        var _this = this;
        // checking if date selected and receipt selected
        var callApi = true;
        if (!this.paymentDate) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.docFile) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.paymentAmount || this.paymentAmount == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterValidAmt'), this.translate.instant('swal.error'));
            return false;
        }
        if (this.surplus_payment_type == '4' && !this.surplus_payment_choice_id) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChoosePayments'), this.translate.instant('swal.error'));
            return false;
        }
        var amt = this.paymentAmount;
        // in case of pay to following, if user is paying surplus money ask the user, what he wants to do with durplus money
        if (this.payment_type == 1 && this.calculatedPayAmount < this.paymentAmount) {
            if (!this.surplus_payment_type) {
                this.askUserForSurplusMomey();
                return;
            }
            else {
                amt = this.calculatedPayAmount;
            }
        }
        // check for type 1, user can not pay more than the sum of all installments
        if (this.payment_type == '1') {
            var a_1 = 0;
            this.paymentConcepts.map(function (v) {
                if (!v['is_paid_calculated']) {
                    var remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
                    a_1 = a_1 + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
                }
            }, 0);
            if (this.paymentAmount > a_1) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.payToFollowingCheck'), this.translate.instant('swal.error'));
                return false;
            }
        }
        // check for type 2 abd 2, user cannot pay more than sum of remaining MI
        if (this.payment_type == '2' || this.payment_type == '3') {
            var a_2 = 0;
            this.paymentConcepts.map(function (v) {
                if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
                    var remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
                    a_2 = parseFloat(a_2) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
                    a_2 = a_2.toFixed(2);
                }
            }, 0);
            if (this.paymentAmount > a_2) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.payToRemainingcheck'), this.translate.instant('swal.error'));
                return false;
            }
        }
        // check for type 3, user can only pay exact amount of M1, or sum of M1 & M2, or sum of M1,M2,M3 and soon
        var a1 = this.surplus_payment_type == '3' ? this.paymentAmount - this.calculatedPayAmount : this.paymentAmount;
        if (this.payment_type == '3' || this.surplus_payment_type == '3') {
            var a = 0;
            var index = this.paymentConcepts.length - 1;
            for (index; index >= 0; index--) {
                var v = this.paymentConcepts[index];
                if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
                    var remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
                    a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
                    a = a.toFixed(2);
                }
                // using a1 and not this.paymentAmount because, need to check for both direct type 3 and type 3 in surplus popup
                if (a1 > a) {
                    continue;
                }
                else if (a1 == a) {
                    break;
                }
                else if (this.paymentAmount < a) {
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.payToRemainingReduceTimecheck'), this.translate.instant('swal.error'));
                    this.surplus_payment_type == '3' ?
                        this.surplusMoneyModalClose.nativeElement.click() :
                        this.paymentModalClose.nativeElement.click();
                    return false;
                }
            }
        }
        // in pay to specific, user is allowed to pay either exact amount or partial amt
        if (this.payment_type == 4 && this.calculatedPayAmount < this.paymentAmount) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
            return false;
        }
        // in total payment, user is allowed to pay sum of exact remaining amount (sum of installments and penalty)
        if (this.payment_type == 5 && this.calculatedPayAmount != this.paymentAmount) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.totalPayemntCheck'), this.translate.instant('swal.error'));
            return false;
        }
        var offset = new Date(this.paymentDate).getTimezoneOffset();
        if (offset < 0) {
            this.paymentDate = moment__WEBPACK_IMPORTED_MODULE_1__(this.paymentDate).subtract(offset, 'minutes').toDate();
        }
        else {
            this.paymentDate = moment__WEBPACK_IMPORTED_MODULE_1__(this.paymentDate).add(offset, 'minutes').toDate();
        }
        var input = {
            property_collection_id: this.property_collection_id,
            payment_method_id: this.payment_method_id,
            is_agency: this.payment_bank ? this.payment_bank.is_agency : null,
            bank_id: this.payment_bank ? this.payment_bank.bank_id : null,
            legal_rep_bank_id: this.payment_bank ? this.payment_bank.legal_rep_bank_id : null,
            amount: amt,
            receipt: this.docFile,
            description: this.description,
            payment_date: this.paymentDate,
            full_amount: this.paymentAmount // sending real amount entered by user
        };
        // send commission_type, collection_commission_id, percent incase of applying commission
        if (this.typeOfPayment === 'commission-popup') {
            delete input.amount;
            input['commission_type'] = this.commission_type;
            input['collection_commission_id'] = this.selectedCollectionCommission.id;
            input['percent'] = this.selectedCollectionCommission.percent;
            input['invoice_id'] = this.invoice_id;
            input['pdf_url'] = this.pdf_url;
            input['xml_url'] = this.xml_url;
            input['amount'] = amt - this.ivaAmount;
            input['iva_amount'] = this.ivaAmount;
            if (this.invoice_date) {
                var offset1 = new Date(this.invoice_date).getTimezoneOffset();
                if (offset < 0) {
                    input['invoice_date'] = moment__WEBPACK_IMPORTED_MODULE_1__(this.invoice_date).subtract(offset1, 'minutes').toDate();
                }
                else {
                    input['invoice_date'] = moment__WEBPACK_IMPORTED_MODULE_1__(this.invoice_date).add(offset1, 'minutes').toDate();
                }
            }
        }
        else {
            // applying payment
            // for edit the wrong amount uploaded
            // if (this.selectedPaymentConcept && this.selectedPaymentConcept['collection_payment']) {
            //   input['id'] = this.selectedPaymentConcept['collection_payment']['id']
            // }
            // for type==2&3, no need to pass collection_payment_choice_id
            if (this.payment_type == 1 || this.payment_type == 4) {
                input['collection_payment_choice_id'] = this.payment_choice_id['id'];
            }
            input['type'] = this.payment_type;
        }
        if (this.typeOfPayment == 'apply-popup' && (this.cashSum + this.paymentAmount > this.cashLimit)) {
            callApi = false;
            swal({
                html: this.translate.instant('message.error.cashLimitReached'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) {
                    // continue;
                    _this.callToPaymentApi(input);
                }
                else {
                    return;
                }
            });
            // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.cashLimitReached'), 'error');
            // this.toastr.clear();
            // this.toastr.error(this.translate.instant('message.error.cashLimitReached'), this.translate.instant('swal.error'));
            // return false;
        }
        var url = this.typeOfPayment === 'apply-popup' ? 'applyCollectionPayment' : 'applyCommissionPayment';
        if (callApi) {
            this.isApplyBtnClicked = true;
            this.admin.postDataApi(url, input).subscribe(function (r) {
                _this.isApplyBtnClicked = false;
                if (_this.surplus_payment_type) {
                    input['amount'] = _this.paymentAmount - _this.calculatedPayAmount;
                    input['type'] = _this.surplus_payment_type;
                    input['parent_id'] = r.data['id']; // send parent_id in case of type 1 and surplus (to make parent delete)
                    if (_this.surplus_payment_type == '4') {
                        input['collection_payment_choice_id'] = _this.surplus_payment_choice_id;
                    }
                    _this.admin.postDataApi(url, input).subscribe(function (r) {
                        // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
                        //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
                        // }
                    });
                }
                _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
                _this.paymentModalClose.nativeElement.click();
                _this.closeCollReceiptModal();
                _this.toastr.clear();
                _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully'), _this.translate.instant('swal.success'));
            }, function (error) {
                _this.paymentConcepts = [];
                _this.isApplyBtnClicked = false;
                _this.docsFile1.nativeElement.value = '';
                _this.paymentModalClose.nativeElement.click();
                _this.closeCollReceiptModal();
                // this.toastr.error(error.message, this.translate.instant('swal.error'));
                return false;
            });
        }
    };
    CollectionsComponent.prototype.callToPaymentApi = function (input) {
        var _this = this;
        var url = this.typeOfPayment === 'apply-popup' ? 'applyCollectionPayment' : 'applyCommissionPayment';
        this.isApplyBtnClicked = true;
        this.admin.postDataApi(url, input).subscribe(function (r) {
            _this.isApplyBtnClicked = false;
            if (_this.surplus_payment_type) {
                input['amount'] = _this.paymentAmount - _this.calculatedPayAmount;
                input['type'] = _this.surplus_payment_type;
                input['parent_id'] = r.data['id']; // send parent_id in case of type 1 and surplus (to make parent delete)
                if (_this.surplus_payment_type == '4') {
                    input['collection_payment_choice_id'] = _this.surplus_payment_choice_id;
                }
                _this.admin.postDataApi(url, input).subscribe(function (r) {
                    // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
                    //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
                    // }
                });
            }
            _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
            _this.paymentModalClose.nativeElement.click();
            _this.closeCollReceiptModal();
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully'), _this.translate.instant('swal.success'));
        }, function (error) {
            _this.paymentConcepts = [];
            _this.isApplyBtnClicked = false;
            _this.docsFile1.nativeElement.value = '';
            _this.paymentModalClose.nativeElement.click();
            _this.closeCollReceiptModal();
            // this.toastr.error(error.message, this.translate.instant('swal.error'));
            return false;
        });
    };
    CollectionsComponent.prototype.askUserForSurplusMomey = function () {
        this.closePaymentModal();
        this.surplusMoneyModalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.closeSurplusMoney = function () {
        this.surplusMoneyModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.onSelectFile = function (files, key) {
        var _this = this;
        this.parameter.loading = true;
        this.cs.saveAttachment(files[0]).subscribe(function (success) {
            _this.parameter.loading = false;
            _this[key] = success['data'].name;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    CollectionsComponent.prototype.setCommissionType = function (type) {
        this.paymentConcepts = [];
        for (var index = 0; index < this.selectedItem.collection_commissions.length; index++) {
            var element = this.selectedItem.collection_commissions[index];
            element['payment_made'] = 0;
            if (this.selectedItem.payment_choices[index] && this.selectedItem.payment_choices[index].is_paid_calculated) {
                element['payment_made'] = 1;
            }
            if (type == 1) {
                if (element.add_purchase_commission == 1) {
                    this.paymentConcepts.push(element);
                }
            }
            else if (type == 3) {
                if (element.add_agent_commission == 1) {
                    this.paymentConcepts.push(element);
                }
            }
            else {
                if (element.add_collection_commission == 1) {
                    this.paymentConcepts.push(element);
                }
            }
        }
    };
    CollectionsComponent.prototype.showCollectionCommReceipt = function (item, i, type) {
        this.property_collection_id = item.id;
        this.selectedItem = item;
        this.collectionIndex = i;
        this.paymentConcepts = item.collection_commissions;
        this.typeOfPayment = type;
        this.is_external_agent = item.deal_commission_agents && item.deal_commission_agents.length > 0 && item.deal_commission_agents[0].broker ?
            item.deal_commission_agents[0].broker.is_external_agent : 0;
        this.collectionReceiptOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.editCollectionCommReceipt = function (item) {
        this.payment_id = item.id;
        this.payment_method_id = item.payment_method.id;
        this.description = item.description;
        this.docFile = item.receipt;
        this.amount = item.amount;
        this.commission_type = item.commission_type;
        this.collection_commission_id = item.collection_commission_id;
        this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
        this.invoice_date = item.invoice_date ? this.getDateWRTTimezone(item.invoice_date, 'DD/MMM/YYYY') : '';
        this.pdf_url = item.pdf_url;
        this.xml_url = item.xml_url;
        this.invoice_id = item.invoice_id;
        this.closeEditPaymentModal();
        this.editCollectionReceiptOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.deleteCollectionCommReceipt = function (item) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeleteCommission'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('deleteCommissionPayment', { id: item.id, commission_type: item.commission_type })
                    .subscribe(function (success) {
                    _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
                    _this.closeEditPaymentModal();
                    _this.toastr.clear();
                    _this.toastr.success(_this.translate.instant('message.success.deletedSuccessfully'), _this.translate.instant('swal.success'));
                }, function (error) {
                    _this.toastr.error(error.error.message, _this.translate.instant('swal.error'));
                });
            }
        });
    };
    CollectionsComponent.prototype.closeEditCollReceiptModal = function () {
        this.editCollectionReceiptClose.nativeElement.click();
    };
    CollectionsComponent.prototype.updateCollectionCommPayment = function () {
        var _this = this;
        // checking if date selected and receipt selected
        if (!this.payment_date) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.docFile) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
            return false;
        }
        var offset = new Date(this.payment_date).getTimezoneOffset();
        if (offset < 0) {
            this.payment_date = moment__WEBPACK_IMPORTED_MODULE_1__(this.payment_date).subtract(offset, 'minutes').toDate();
        }
        else {
            this.payment_date = moment__WEBPACK_IMPORTED_MODULE_1__(this.payment_date).add(offset, 'minutes').toDate();
        }
        // inpur params
        var input = {
            id: this.payment_id,
            payment_method_id: this.payment_method_id,
            receipt: this.docFile,
            description: this.description,
            payment_date: this.payment_date,
            collection_commission_id: this.collection_commission_id,
            commission_type: this.commission_type,
            amount: this.amount
        };
        input['invoice_id'] = this.invoice_id;
        input['pdf_url'] = this.pdf_url;
        input['xml_url'] = this.xml_url;
        // input['amount'] = amt - this.ivaAmount;
        // input['iva_amount'] = this.ivaAmount;
        if (this.invoice_date) {
            var offset1 = new Date(this.invoice_date).getTimezoneOffset();
            if (offset < 0) {
                input['invoice_date'] = moment__WEBPACK_IMPORTED_MODULE_1__(this.invoice_date).subtract(offset1, 'minutes').toDate();
            }
            else {
                input['invoice_date'] = moment__WEBPACK_IMPORTED_MODULE_1__(this.invoice_date).add(offset1, 'minutes').toDate();
            }
        }
        this.admin.postDataApi('applyCommissionPayment', input).subscribe(function (r) {
            _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
            _this.closeEditCollReceiptModal();
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully'), _this.translate.instant('swal.success'));
        }, function (error) {
            _this.toastr.error(error.message, _this.translate.instant('swal.error'));
            return false;
        });
    };
    CollectionsComponent.prototype.getPenaltyAmount = function (percent) {
        var paymentConceptAmount = this.penaltyForm.controls.payment_concept_amt.value;
        if (!paymentConceptAmount || paymentConceptAmount == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChoosePaymentConcept'), this.translate.instant('swal.error'));
            this.penaltyForm.controls.percent.patchValue(0);
            return;
        }
        var paymentAmount = ((percent * paymentConceptAmount) / 100).toFixed(2);
        this.penaltyForm.controls.amount.patchValue(paymentAmount);
    };
    CollectionsComponent.prototype.getPenaltyPercentage = function (amount) {
        var paymentConceptAmount = this.penaltyForm.controls.payment_concept_amt.value;
        if (!paymentConceptAmount || paymentConceptAmount == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChoosePaymentConcept'), this.translate.instant('swal.error'));
            this.penaltyForm.controls.amount.patchValue(0);
            return;
        }
        var penaltyPercent = ((amount * 100) / paymentConceptAmount).toFixed(3);
        this.penaltyForm.controls.percent.patchValue(penaltyPercent);
    };
    CollectionsComponent.prototype.closeCollReceiptModal = function () {
        this.paymentAmount = 0;
        this.docFile = '';
        this.description = '';
        this.penaltyAmount = 0;
        this.pendingPayment = 0;
        this.currentAmount = 0;
        // this.docsFile.nativeElement.value = '';
        if (this.commission_type == 1) {
            this.collectionTypeSelect.nativeElement.value = '';
            this.applyPaymentMethodId1.nativeElement.value = '';
            this.applyPaymentChoiceId1.nativeElement.value = '';
        }
        else if (this.commission_type == 2) {
            this.collectionTypeSelect.nativeElement.value = '';
            this.applyPaymentMethodId1.nativeElement.value = '';
            this.applyPaymentChoiceId2.nativeElement.value = '';
        }
        this.commission_type = '';
        this.collectionReceiptClose.nativeElement.click();
    };
    CollectionsComponent.prototype.closeCollCommissionModal = function () {
        this.viewCollectionClose.nativeElement.click();
    };
    CollectionsComponent.prototype.showPenaltyPaymentPopup = function (item, i, type, collection_payment_choice_id) {
        if (collection_payment_choice_id) {
            this.editPaymentModalOpen.nativeElement.click();
            this.penaltyForm.controls.payment_concept_amt.patchValue(item.amount);
            this.penaltyForm.controls.amount.patchValue(item.penalty.amount);
            this.penaltyForm.controls.description.patchValue(item.penalty.description);
            this.penaltyForm.controls.percent.patchValue(((item.penalty.amount * 100) / item.amount).toFixed(2));
            this.penaltyForm.controls.id.patchValue(item.penalty.id);
            this.penaltyForm.controls.collection_payment_choice_id.patchValue(item.penalty.collection_payment_choice_id);
        }
        else {
            this.property_collection_id = item.id;
            this.typeOfPayment = type;
            this.collectionIndex = i;
            this.paymentConcepts = item.payment_choices;
        }
        this.penaltyModalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.deletePenaltyPaymentPopup = function (i) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeletePenalty'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('deleteCollectionPenalty', { id: i.id, collection_payment_choice_id: i.collection_payment_choice_id })
                    .subscribe(function (success) {
                    _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
                    _this.closeEditPaymentModal();
                    _this.toastr.clear();
                    _this.toastr.success(_this.translate.instant('message.success.deletedSuccessfully'), _this.translate.instant('swal.success'));
                }, function (error) {
                    _this.toastr.error(error.error.message, _this.translate.instant('swal.error'));
                });
            }
        });
    };
    CollectionsComponent.prototype.closePenaltyPaymentPopup = function () {
        this.penaltyForm.reset();
        this.penaltyModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.applyCollectionPenalty = function (formdata) {
        var _this = this;
        if (this.penaltyForm.invalid) {
            this.showError = true;
            this.isPenaltyFormSub = false;
            return;
        }
        this.isPenaltyFormSub = true;
        this.admin.postDataApi('applyCollectionPenalty', this.penaltyForm.value).subscribe(function (r) {
            // let paymentChoiceIndex = 0;
            // for (let index = 0; index < this.items[this.collectionIndex].payment_choices.length; index++) {
            //   const element = this.items[this.collectionIndex].payment_choices[index];
            //   if (element.id == this.payment_choice_id) {
            //     paymentChoiceIndex = index;
            //   }
            // }
            // this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['penalty'] = r.data;
            _this.router.navigate(['/dashboard/collections/quick-visualization', _this.property_collection_id]);
            _this.closePenaltyPaymentPopup();
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully', _this.translate.instant('swal.success')));
        });
    };
    CollectionsComponent.prototype.quickCollectionView = function (item) {
        this.router.navigate(['/dashboard/collections/quick-visualization', item.id]);
    };
    CollectionsComponent.prototype.viewAccountStatement = function (item) {
        this.router.navigate(['/dashboard/collections/account-statement', item.id]);
    };
    CollectionsComponent.prototype.setPayMentType = function (payment_type) {
        this.payment_type = payment_type;
        if (payment_type == '1') {
            this.paymentConcepts.map(function (r) { return r.is_disabled = true; });
            for (var index = 0; index < this.paymentConcepts.length; index++) {
                if (!this.paymentConcepts[index].is_paid_calculated) {
                    this.paymentConcepts[index].is_disabled = false;
                    break;
                }
            }
        }
        if (this.typeOfPayment == 'apply-popup') {
            this.docsFile1.nativeElement.value = '';
        }
        else {
            this.docsFile2.nativeElement.value = '';
        }
        if (this.payment_type && this.payment_type != '2' && this.payment_type != '3' && this.payment_type != '5') {
            this.applyPaymentChoiceId.nativeElement.value = '';
        }
        this.closeCollReceiptModal();
        if (this.payment_type == 5) {
            var amt = 0;
            var penaltyamt = 0;
            var amtPaid = 0;
            var currentAmt = 0;
            var currentAmtPaid = 0;
            this.penaltyAmount = 0;
            for (var index = 0; index < this.paymentConcepts.length; index++) {
                var r = this.paymentConcepts[index];
                currentAmt = r['amount'];
                currentAmtPaid = r['calc_payment_amount'] || 0;
                penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
                amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
                amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
            }
            this.paymentAmount = (amt - amtPaid).toFixed(2);
            this.calculatedPayAmount = this.paymentAmount.slice();
        }
        this.applyPaymentMethodId.nativeElement.value = '';
    };
    CollectionsComponent.prototype.setPayMentTypeSurplus = function (payment_type) {
        this.surplus_payment_type = payment_type;
        // incase user select type 4 in surplus popup => therefore, needs to disable selected concept in payment modal
        this.paymentConcepts.map(function (r) { return r.is_disabled = false; });
        for (var index = 0; index < this.paymentConcepts.length; index++) {
            // paid and if selected concept => only then disable
            if (this.payment_choice_id['id'] == this.paymentConcepts[index].id) {
                this.paymentConcepts[index].is_disabled = true;
                break;
            }
        }
    };
    CollectionsComponent.prototype.setPaymentSurplusAmount = function (item) {
        this.selectedPaymentConcept = item;
        this.surplus_payment_choice_id = item.id;
        var currentAmt = 0;
        var currentAmtPaid = 0;
        // checking if method is pay to specific (4),
        // then user will pay only for that specific installment + user cannot pay more than the amount+penalty
        if (this.surplus_payment_type == '4') {
            currentAmt = item['amount'];
            currentAmtPaid = item['calc_payment_amount'] || 0;
            var penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
            var currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
            this.surplus_amt = (parseFloat(currentAmount) + parseFloat(penaltyAmount)).toFixed(2);
        }
        if ((this.paymentAmount - this.calculatedPayAmount) > this.surplus_amt) {
            this.surplus_payment_choice_id = '';
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
            return false;
        }
    };
    CollectionsComponent.prototype.getDateWRTTimezone = function (date, format) {
        var offset = new Date(date).getTimezoneOffset();
        if (offset < 0) {
            return moment__WEBPACK_IMPORTED_MODULE_1__(date).subtract(offset, 'minutes').format(format);
        }
        else {
            return moment__WEBPACK_IMPORTED_MODULE_1__(date).add(offset, 'minutes').format(format);
        }
    };
    CollectionsComponent.prototype.getLastPaymentConcept = function (item) {
        // payment_type == 1 means => pay to following => means show concept name
        // payment_type == 2 means => pay to remaining (reduce amt) => show same
        // payment_type == 3 means => pay to remaining (reduce time) => show same
        if (item.last_payment.payment_type == 1 || item.last_payment.payment_type == 4) {
            return item.last_payment.name;
        }
        else if (item.last_payment.payment_type == 2) {
            return 'Payment to remaining (Reduce Amount)';
        }
        else if (item.last_payment.payment_type == 3) {
            return 'Payment to remaining (Reduce Amount)';
        }
        else {
            return 'Total Payment';
        }
    };
    CollectionsComponent.prototype.getRemainingAmt = function (p) {
        var v = (((p.deal_price || 0) + (p.penalty || 0)) - (p.total_payment_recieved || 0));
        return v > 0 ? v : 0;
    };
    CollectionsComponent.prototype.showDescription = function (description, title) {
        if (description) {
            this.title = title;
            this.description = description;
            this.viewDesModal.nativeElement.click();
        }
    };
    CollectionsComponent.prototype.closeDescModal = function () {
        this.viewDesModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.sortFunction = function (a, b) {
        var dateA = new Date(a.created_at).getTime();
        var dateB = new Date(b.created_at).getTime();
        return dateA > dateB ? 1 : -1;
    };
    CollectionsComponent.prototype.openFoldersModal = function (collectionFolders, payment_folder_id) {
        this.collectionFolders = [];
        this.collectionFolders = collectionFolders;
        this.payment_folder_id = payment_folder_id;
        this.foldersModalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.closeFoldersModal = function () {
        this.foldersModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.addDocs = function (folderIndex, collection_folder_id) {
        var _this = this;
        if (!this.docsName) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuName'), this.translate.instant('swal.error'));
            return;
        }
        if (!this.docFile) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
            return;
        }
        var input = { name: this.docsName, display_name: this.docFile, collection_folder_id: collection_folder_id };
        var allDocx = this.collectionFolders[folderIndex].folder_docs;
        this.admin.postDataApi('addFolderDoc', input).subscribe(function (success) {
            input['id'] = success['data'];
            allDocx.push(input);
            _this.collectionFolders[folderIndex].folder_docs = allDocx;
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.addedSuccessfully'), _this.translate.instant('swal.success'));
            _this.docFile = '';
            _this.docsName = '';
            _this.docsFile.nativeElement.value = '';
        });
    };
    CollectionsComponent.prototype.deleteDocsPopup = function (item, folderIndex, docIndex) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeleteDocs'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteDocs(item, folderIndex, docIndex);
            }
        });
    };
    CollectionsComponent.prototype.deleteDocs = function (item, folderIndex, docIndex) {
        var _this = this;
        this.collectionFolders[folderIndex].folder_docs.splice(docIndex, 1);
        if (item.id) {
            this.admin.postDataApi('deleteFolderDoc', { id: item.id }).subscribe(function (success) {
                _this.toastr.clear();
                _this.toastr.success(_this.translate.instant('message.success.deletedSuccessfully'), _this.translate.instant('swal.success'));
            });
        }
    };
    CollectionsComponent.prototype.showInvoicekeys = function () {
        this.invoiceKeys = this.invoiceKeys ? false : true;
    };
    CollectionsComponent.prototype.numberUptoNDecimal = function (num, n) {
        return num ? num.toFixed(n) : 0;
    };
    CollectionsComponent.prototype.editDocsPopup = function (item, folderIndex, docIndex) {
        this.modelForDoc.name_en = item.name;
        this.modelForDoc.id = item.id;
        this.folderId = this.collectionFolders[folderIndex].id;
        this.localityOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.checkIfLocalitySpanishNameEntered = function (document) {
        var _this = this;
        var self = this;
        if (document.name === '') {
            swal({
                text: this.translate.instant('message.error.saveName'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.editDocument(document);
                }
            });
        }
        else {
            self.editDocument(document);
        }
    };
    CollectionsComponent.prototype.closeEditModal = function () {
        this.localityClose.nativeElement.click();
    };
    CollectionsComponent.prototype.editDocument = function (document) {
        var self = this;
        this.spinner.show();
        var param = {
            id: this.modelForDoc.id,
            name: this.modelForDoc.name_en
        };
        this.admin.postDataApi('updateDocFolderName', param).subscribe(function (r) {
            self.spinner.hide();
            self.collectionFolders.filter(function (folder) {
                if (folder.id == self.folderId) {
                    folder.folder_docs.filter(function (doc) {
                        if (doc.id == self.modelForDoc.id) {
                            doc.name = self.modelForDoc.name_en;
                        }
                    });
                }
            });
            self.closeEditModal();
        }, function (error) {
            self.spinner.hide();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewDesModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "viewDesModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewDesModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "viewDesModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('applyPaymentChoiceId'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "applyPaymentChoiceId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('applyPaymentMethodId'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "applyPaymentMethodId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('applyPaymentChoiceId1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "applyPaymentChoiceId1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('applyPaymentChoiceId2'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "applyPaymentChoiceId2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('applyPaymentMethodId1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "applyPaymentMethodId1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notesModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "notesModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notesModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "notesModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paymentModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "paymentModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paymentModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "paymentModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('editPaymentModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "editPaymentModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('editPaymentModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "editPaymentModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('updatePaymentModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "updatePaymentModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('updatePaymentModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "updatePaymentModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewCollectionClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "viewCollectionClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('collectionReceiptOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "collectionReceiptOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('collectionReceiptClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "collectionReceiptClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('editCollectionReceiptOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "editCollectionReceiptOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('editCollectionReceiptClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "editCollectionReceiptClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('penaltyModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "penaltyModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('penaltyModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "penaltyModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('collectionTypeSelect'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "collectionTypeSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('surplusMoneyModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "surplusMoneyModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('surplusMoneyModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "surplusMoneyModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docsFile1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "docsFile1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docsFile2'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "docsFile2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docsFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "docsFile", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('foldersModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "foldersModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('foldersModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "foldersModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('localityOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "localityOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('localityClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "localityClose", void 0);
    CollectionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collections',
            template: __webpack_require__(/*! ./collections.component.html */ "./src/app/layout/collections/collections.component.html"),
            styles: [__webpack_require__(/*! ./collections.component.css */ "./src/app/layout/collections/collections.component.css")],
            providers: [_models_leads_model__WEBPACK_IMPORTED_MODULE_9__["Notes"], src_app_models_document_model__WEBPACK_IMPORTED_MODULE_14__["Document"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            src_app_common_api_constants__WEBPACK_IMPORTED_MODULE_4__["ApiConstants"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_services_property_service__WEBPACK_IMPORTED_MODULE_7__["PropertyService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"],
            _models_leads_model__WEBPACK_IMPORTED_MODULE_9__["Notes"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_12__["ToastrService"],
            src_app_models_document_model__WEBPACK_IMPORTED_MODULE_14__["Document"]])
    ], CollectionsComponent);
    return CollectionsComponent;
}());



/***/ }),

/***/ "./src/app/layout/collections/collections.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/layout/collections/collections.module.ts ***!
  \**********************************************************/
/*! exports provided: CollectionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionsModule", function() { return CollectionsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-malihu-scrollbar */ "./node_modules/ngx-malihu-scrollbar/fesm5/ngx-malihu-scrollbar.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _add_edit_collection_add_edit_collection_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./add-edit-collection/add-edit-collection.component */ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.ts");
/* harmony import */ var _collections_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./collections.component */ "./src/app/layout/collections/collections.component.ts");
/* harmony import */ var _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./analytics/analytics.component */ "./src/app/layout/collections/analytics/analytics.component.ts");
/* harmony import */ var _quick_visualization_quick_visualization_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./quick-visualization/quick-visualization.component */ "./src/app/layout/collections/quick-visualization/quick-visualization.component.ts");
/* harmony import */ var _account_statement_account_statement_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./account-statement/account-statement.component */ "./src/app/layout/collections/account-statement/account-statement.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries












// general components



// import { DropdownModule } from 'primeng/dropdown';





var routes = [
    // {
    //   path: 'view-collections', component: CollectionsComponent,
    //   canActivate: [AclUserGuard], data: { roles: ['Property Management', 'can_read', ''] }
    // }
    {
        path: 'view-collections', component: _collections_component__WEBPACK_IMPORTED_MODULE_16__["CollectionsComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Collections', 'can_read', ''] }
    },
    {
        path: 'view-collections/:id', component: _collections_component__WEBPACK_IMPORTED_MODULE_16__["CollectionsComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Collections', 'can_read', ''] }
    },
    {
        path: 'add-collection/:id', component: _add_edit_collection_add_edit_collection_component__WEBPACK_IMPORTED_MODULE_15__["AddEditCollectionComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Collections', 'can_create', ''] }
    },
    {
        path: 'edit-collection/:id', component: _add_edit_collection_add_edit_collection_component__WEBPACK_IMPORTED_MODULE_15__["AddEditCollectionComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Collections', 'can_update', ''] }
    },
    {
        path: 'quick-visualization/:id', component: _quick_visualization_quick_visualization_component__WEBPACK_IMPORTED_MODULE_18__["QuickVisualizationComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Collections', 'can_read', ''] }
    },
    {
        path: 'account-statement/:id', component: _account_statement_account_statement_component__WEBPACK_IMPORTED_MODULE_19__["AccountStatementComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Collections', 'can_read', ''] }
    }
];
var CollectionsModule = /** @class */ (function () {
    function CollectionsModule() {
    }
    CollectionsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_7__["NgxPaginationModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_14__["CalendarModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_13__["SharedModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"],
                ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_9__["MalihuScrollbarModule"].forRoot(),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_14__["DropdownModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_11__["ToastrModule"].forRoot({
                    maxOpened: 1,
                    preventDuplicates: true,
                    autoDismiss: true
                })
            ],
            declarations: [
                _collections_component__WEBPACK_IMPORTED_MODULE_16__["CollectionsComponent"],
                _add_edit_collection_add_edit_collection_component__WEBPACK_IMPORTED_MODULE_15__["AddEditCollectionComponent"],
                _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_17__["AnalyticsComponent"],
                _quick_visualization_quick_visualization_component__WEBPACK_IMPORTED_MODULE_18__["QuickVisualizationComponent"],
                _account_statement_account_statement_component__WEBPACK_IMPORTED_MODULE_19__["AccountStatementComponent"]
            ]
        })
    ], CollectionsModule);
    return CollectionsModule;
}());



/***/ }),

/***/ "./src/app/layout/collections/quick-visualization/quick-visualization.component.css":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/collections/quick-visualization/quick-visualization.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  th, td {\n    padding: 5px;\n    text-align: center;\n  }\n  h5{\n    margin-top: 15px;\n  }\n  textarea {\n    background: #fff !important;\n  }\n  .red-color{\n    color: red;\n  }\n  table.table-striped.quick-table{\n    table-layout: fixed;\n  }\n  table.table-striped.quick-table th, table.table-striped.quick-table td {\n  width: 70px;\n  word-break: break-word;\n}\n  .remaining_amt{\n  background: #faebd7b0 !important;\n  font-weight: 600;\n}\n  /* freeze first col and row */\n  .main-table{\n  height: 700px;\n}\n  table.table-striped.quick-table th, table.table-striped.quick-table td {\n  width: 190px;\n}\n  table.table-striped.quick-table {\n  table-layout: fixed;\n  width:100%;\n}\n  table.table-striped.quick-table td:nth-child(1), table.table-striped.quick-table th:nth-child(1),\ntable.table-striped.quick-table thead tr th \n{\n  position:-webkit-sticky;\n  position:sticky;\n  left:0;\n  top: 0;\n  z-index:1;\n  background-color: #00B96F;\n  color: #fff;\n}\n  table.table-striped.quick-table th:first-child {\n  z-index:20;\n}\n  /* freeze first col and row */\n  .sticky{\n  position: sticky;  \n  position: -webkit-sticky;  \n  top: 46px;\n  overflow: hidden;\n  z-index: 100000;\n}\n  .content{\n  height: 200vh;\n}\n  .black{\n  color: #222;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbGxlY3Rpb25zL3F1aWNrLXZpc3VhbGl6YXRpb24vcXVpY2stdmlzdWFsaXphdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7RUFDRTtJQUNFLGFBQWE7SUFDYixtQkFBbUI7R0FDcEI7RUFDRDtJQUNFLGlCQUFpQjtHQUNsQjtFQUVEO0lBQ0UsNEJBQTRCO0dBQzdCO0VBQ0Q7SUFDRSxXQUFXO0dBQ1o7RUFDRDtJQUNFLG9CQUFvQjtHQUNyQjtFQUVIO0VBQ0UsWUFBWTtFQUNaLHVCQUF1QjtDQUN4QjtFQUNEO0VBQ0UsaUNBQWlDO0VBQ2pDLGlCQUFpQjtDQUNsQjtFQUdELDhCQUE4QjtFQUM5QjtFQUNFLGNBQWM7Q0FDZjtFQUNEO0VBQ0UsYUFBYTtDQUNkO0VBQ0Q7RUFDRSxvQkFBb0I7RUFDcEIsV0FBVztDQUNaO0VBQ0Q7OztFQUdFLHdCQUFnQjtFQUFoQixnQkFBZ0I7RUFDaEIsT0FBTztFQUNQLE9BQU87RUFDUCxVQUFVO0VBQ1YsMEJBQTBCO0VBQzFCLFlBQVk7Q0FDYjtFQUNEO0VBQ0UsV0FBVztDQUNaO0VBQ0QsOEJBQThCO0VBRTlCO0VBQ0UsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QixVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLGdCQUFnQjtDQUNqQjtFQUdEO0VBQ0UsY0FBYztDQUNmO0VBQ0Q7RUFDRSxZQUFZO0NBQ2IiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvY29sbGVjdGlvbnMvcXVpY2stdmlzdWFsaXphdGlvbi9xdWljay12aXN1YWxpemF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgdGgsIHRkIHtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIGg1e1xuICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gIH1cblxuICB0ZXh0YXJlYSB7XG4gICAgYmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50O1xuICB9XG4gIC5yZWQtY29sb3J7XG4gICAgY29sb3I6IHJlZDtcbiAgfVxuICB0YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxle1xuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIH1cbiAgXG50YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHRoLCB0YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHRkIHtcbiAgd2lkdGg6IDcwcHg7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG59XG4ucmVtYWluaW5nX2FtdHtcbiAgYmFja2dyb3VuZDogI2ZhZWJkN2IwICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cblxuLyogZnJlZXplIGZpcnN0IGNvbCBhbmQgcm93ICovXG4ubWFpbi10YWJsZXtcbiAgaGVpZ2h0OiA3MDBweDtcbn1cbnRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGgsIHRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGQge1xuICB3aWR0aDogMTkwcHg7XG59XG50YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHtcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgd2lkdGg6MTAwJTtcbn1cbnRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGQ6bnRoLWNoaWxkKDEpLCB0YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHRoOm50aC1jaGlsZCgxKSxcbnRhYmxlLnRhYmxlLXN0cmlwZWQucXVpY2stdGFibGUgdGhlYWQgdHIgdGggXG57XG4gIHBvc2l0aW9uOnN0aWNreTtcbiAgbGVmdDowO1xuICB0b3A6IDA7XG4gIHotaW5kZXg6MTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwQjk2RjtcbiAgY29sb3I6ICNmZmY7XG59XG50YWJsZS50YWJsZS1zdHJpcGVkLnF1aWNrLXRhYmxlIHRoOmZpcnN0LWNoaWxkIHtcbiAgei1pbmRleDoyMDtcbn1cbi8qIGZyZWV6ZSBmaXJzdCBjb2wgYW5kIHJvdyAqL1xuXG4uc3RpY2t5e1xuICBwb3NpdGlvbjogc3RpY2t5OyAgXG4gIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTsgIFxuICB0b3A6IDQ2cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHotaW5kZXg6IDEwMDAwMDtcbn1cblxuXG4uY29udGVudHtcbiAgaGVpZ2h0OiAyMDB2aDtcbn1cbi5ibGFja3tcbiAgY29sb3I6ICMyMjI7XG59Il19 */"

/***/ }),

/***/ "./src/app/layout/collections/quick-visualization/quick-visualization.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/collections/quick-visualization/quick-visualization.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-lg-9 col-md-9 col-6\">\n      <div class=\"title-group\">\n        <h5><a routerLink=\"/dashboard/collections/view-collections/{{property_collection_id}}\" href=\"javascript://\"><i\n              class=\"fa fa-angle-double-left\" style=\"font-size: 1.5em;\"></i> </a> &nbsp;&nbsp;{{'quickVisualization.label' | translate}}</h5>\n      </div>\n    </div>\n     \n    <div class=\"col-lg-2 col-md-2 col-6\">\n      <div class=\"btn-cont text-right\">\n          <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#addInhouseUser\" #inhouseUserModalOpen>{{'table.addNewBtn' | translate}}</a>\n          <a class=\"btn btn-primary-new\" href=\"javascript://\" (click)=\"showApplyPaymentPopup()\">\n            {{'table.title.applyPayment' | translate}}\n          </a>\n        </div>\n    </div>\n\n    <div class=\"col-lg-1 col-md-1 col-6\">\n      <div class=\"btn-cont text-right\">\n          <a routerLink=\"/dashboard/collections/view-collections\" \n          class=\"btn btn-primary-new\" href=\"javascript://\">{{'quickVisualization.back' | translate}}</a>\n        </div>\n    </div>\n  </div>\n\n  <hr>\n\n  <h5>{{'quickVisualization.stackholdersInformation' | translate}}</h5>\n  <div class=\"row cust-tabs\">\n    <div class=\"col-md-4\">\n\n        <div class=\"table-responsive\">\n          <table class=\"table table-bordered white-bg\">\n            <tbody id=\"accordion\">\n              <tr>\n                <th rowspan=\"3\">{{'quickVisualization.buyer' | translate}}:</th>\n                <td *ngIf=\"model?.buyer_type==2\">\n                  {{model?.buyer_legal_entity?.comm_name || ('table.tr.td.NA' | translate)}}\n                </td>\n                <td *ngIf=\"model?.buyer_type!=2\">\n                  {{model?.buyer?.name ? (model?.buyer?.name + ' ' + model?.buyer?.first_surname + ' ' + model?.buyer?.second_surname) : ('table.tr.td.NA' | translate)}}\n                </td>\n              </tr>\n              <tr>\n                <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.email || ('table.tr.td.NA' | translate)}}</td>\n                <td *ngIf=\"model?.buyer_type!=2\">{{model?.buyer?.email || ('table.tr.td.NA' | translate)}}</td>\n              </tr>\n              <tr>\n                <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.phone ? model?.buyer_legal_entity?.dial_code + ' ' + model?.buyer_legal_entity?.phone : ('table.tr.td.NA' | translate)}}</td>\n                <td *ngIf=\"model?.buyer_type!=2\">{{model?.buyer?.phone ? model?.buyer?.dial_code + ' ' + model?.buyer?.phone : ('table.tr.td.NA' | translate)}}</td>\n              </tr>\n              <ng-container *ngFor=\"let buyer_bank of buyerBanks; let sb=index\">\n                <tr>\n                  <td></td>\n                  <td>\n                   <a class=\"black\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseBB{{sb}}\">\n                     <b>Bank {{sb+1}}</b>\n                    </a>\n                  </td>\n                </tr>\n                <tr id=\"collapseBB{{sb}}\" class=\"panel-collapse collapse\">\n                  <td></td>\n                  <table [style.width]=\"'100%'\">\n                    <tbody>\n                      <tr><th>{{'quickVisualization.bankName' | translate}}</th></tr>\n                      <tr><td>{{buyer_bank?.bank_name || 'NA'}}</td></tr>\n                      <tr><th>{{'quickVisualization.accountNumber' | translate}}</th></tr>\n                      <tr><td>{{buyer_bank?.account_number || 'NA'}}</td></tr>\n                      <tr><th>{{'quickVisualization.clabeSwift' | translate}}</th></tr>\n                      <tr><td>{{buyer_bank?.swift || 'NA'}}</td></tr>\n                      <tr><th>{{'quickVisualization.currency' | translate}}</th></tr>\n                      <tr><td>{{buyer_bank?.currency?.code || 'NA'}}</td></tr>\n                    </tbody>\n                    </table>\n                </tr>\n              </ng-container>\n            </tbody>\n          </table>\n        </div>\n          <div class=\"table-responsive\">\n            <table class=\"table table-bordered white-bg\">\n              <tbody>\n                <tr>\n                  <th rowspan=\"3\">{{'quickVisualization.seller' | translate}}:</th>\n                  <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.comm_name || ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.seller_type!=2\">\n                    {{model?.seller?.name ? (model?.seller?.name + ' ' + model?.seller?.first_surname + ' ' + model?.seller?.second_surname) : ('table.tr.td.NA' | translate)}}\n                  </td>\n                </tr>\n                <tr>\n                  <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.email || ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.seller_type!=2\">{{model?.seller?.email || ('table.tr.td.NA' | translate)}}</td>\n                </tr>\n                <tr>\n                  <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.phone ? model?.seller_legal_entity?.dial_code + ' ' + model?.seller_legal_entity?.phone : ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.seller_type!=2\">{{model?.seller?.phone ? model?.seller?.dial_code + ' ' + model?.seller?.phone : ('table.tr.td.NA' | translate)}}</td>\n                </tr>\n                <ng-container *ngFor=\"let seller_bank of sellerBanks; let sb=index\">\n                  <tr>\n                    <td></td>\n                    <td>\n                     <a class=\"black\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseSB{{sb}}\">\n                       <b>Bank {{sb+1}}</b>\n                      </a>\n                    </td>\n                  </tr>\n                  <tr id=\"collapseSB{{sb}}\" class=\"panel-collapse collapse\">\n                    <td></td>\n                    <table [style.width]=\"'100%'\">\n                      <tbody>\n                        <tr><th>{{'quickVisualization.bankName' | translate}}</th></tr>\n                        <tr><td>{{seller_bank?.bank_name || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.accountNumber' | translate}}</th></tr>\n                        <tr><td>{{seller_bank?.account_number || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.clabeSwift' | translate}}</th></tr>\n                        <tr><td>{{seller_bank?.swift || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.currency' | translate}}</th></tr>\n                        <tr><td>{{seller_bank?.currency?.code || 'NA'}}</td></tr>\n                      </tbody>\n                      </table>\n                  </tr>\n                </ng-container>\n              </tbody>\n            </table>\n          </div>\n          <div class=\"table-responsive\">\n            <table class=\"table table-bordered white-bg\">\n              <tbody>\n                <tr>\n                  <th rowspan=\"3\">\n                    {{model?.deal_commission_agents?.length>0 && model?.deal_commission_agents[0]?.broker?.is_external_agent==1 ? ('quickVisualization.outsideAgent' | translate) : ('quickVisualization.inhouseAgent' | translate)}}:\n                  </th>\n                  <td>\n                    {{model?.deal_commission_agents?.length>0 ? \n                      (model?.deal_commission_agents[0]?.broker?.name + ' ' + model?.deal_commission_agents[0]?.broker?.first_surname + ' ' +model?.deal_commission_agents[0]?.broker?.second_surname) : \n                      ('table.tr.td.NA' | translate)}}</td>\n                </tr>\n                <tr>\n                  <td>{{model?.deal_commission_agents?.length>0 ? model?.deal_commission_agents[0]?.broker?.email : ('table.tr.td.NA' | translate)}}</td>\n                </tr>\n                <tr>\n                  <td>{{model?.deal_commission_agents?.length>0 ? model?.deal_commission_agents[0]?.broker?.dial_code + ' ' +model?.deal_commission_agents[0]?.broker?.phone : ('table.tr.td.NA' | translate)}}</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n    </div>\n\n    <div class=\"col-md-1\"></div>\n\n    <div class=\"col-md-4\">\n\n          <div class=\"table-responsive\">\n            <table class=\"table table-bordered white-bg\">\n              <tbody>\n                <tr>\n                  <th rowspan=\"3\">{{'quickVisualization.buyerLegal' | translate}} <br> {{'quickVisualization.representativeContact' | translate}}:</th>\n                    <td *ngIf=\"model?.buyer_type==1\">\n                      {{model?.buyer?.legal_representative?.name ? (model?.buyer?.legal_representative?.name + ' ' + model?.buyer?.legal_representative?.first_surname + ' ' + model?.buyer?.legal_representative?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </td>\n                    <td *ngIf=\"model?.buyer_type==2\">\n                      {{model?.buyer_legal_entity?.legal_reps?.name ? (model?.buyer_legal_entity?.legal_reps?.name + ' ' +model?.buyer_legal_entity?.legal_reps?.first_surname + ' ' + model?.buyer_legal_entity?.legal_reps?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </td>\n                    <td *ngIf=\"model?.buyer_type==3\">\n                      {{model?.buyer?.legal_representative?.name ? (model?.buyer?.legal_representative?.name + ' ' + model?.buyer?.legal_representative?.first_surname + ' ' + model?.buyer?.legal_representative?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </td>\n                 </tr>\n                <tr>\n                  <td *ngIf=\"model?.buyer_type==1\">{{model?.buyer_leg_rep_email || ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.legal_reps?.email || ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.buyer_type==3\">{{model?.buyer?.legal_representative?.email || ('table.tr.td.NA' | translate)}}</td>\n                 </tr>\n                <tr>\n                  <td *ngIf=\"model?.buyer_type==1\">{{model?.buyer_leg_rep_phone ? model?.buyer?.dial_code + ' '+ model?.buyer_leg_rep_phone : ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.buyer_type==2\">{{model?.buyer_legal_entity?.legal_reps?.phone ? model?.buyer_legal_entity?.legal_reps?.dial_code + ' '+ model?.buyer_legal_entity?.legal_reps?.phone : ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.buyer_type==3\">{{model?.buyer?.legal_representative?.phone ? model?.buyer?.dial_code + ' ' + model?.buyer?.legal_representative?.phone : ('table.tr.td.NA' | translate)}}</td>\n                </tr>\n                <ng-container *ngFor=\"let buyer_rep_banks of buyerRepBanks; let sb=index\">\n                  <tr>\n                    <td></td>\n                    <td>\n                     <a class=\"black\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseBRB{{sb}}\">\n                       <b>Bank {{sb+1}}</b>\n                      </a>\n                    </td>\n                  </tr>\n                  <tr id=\"collapseBRB{{sb}}\" class=\"panel-collapse collapse\">\n                    <td></td>\n                    <table [style.width]=\"'100%'\">\n                      <tbody>\n                        <tr><th>{{'quickVisualization.bankName' | translate}}</th></tr>\n                        <tr><td>{{buyer_rep_banks?.bank_name || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.accountNumber' | translate}}</th></tr>\n                        <tr><td>{{buyer_rep_banks?.account_number || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.clabeSwift' | translate}}</th></tr>\n                        <tr><td>{{buyer_rep_banks?.swift || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.currency' | translate}}</th></tr>\n                        <tr><td>{{buyer_rep_banks?.currency?.code || 'NA'}}</td></tr>\n                      </tbody>\n                      </table>\n                  </tr>\n                </ng-container>\n              </tbody>\n            </table>\n          </div>\n            <div class=\"table-responsive\">\n              <table class=\"table table-bordered white-bg\">\n                <tbody>\n                  <tr>\n                    <th rowspan=\"3\">{{'quickVisualization.sellerLegal' | translate}} <br> {{'quickVisualization.representativeContact' | translate}}:</th>\n                    <td *ngIf=\"model?.seller_type==1\">\n                      {{model?.seller?.legal_representative?.name ? (model?.seller?.legal_representative?.name + ' ' + model?.seller?.legal_representative?.first_surname + ' ' + model?.seller?.legal_representative?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </td>\n                    <td *ngIf=\"model?.seller_type==2\">\n                      {{model?.seller_legal_entity?.legal_reps?.name ? (model?.seller_legal_entity?.legal_reps?.name + ' ' +model?.seller_legal_entity?.legal_reps?.first_surname + ' ' + model?.seller_legal_entity?.legal_reps?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </td>\n                    <td *ngIf=\"model?.seller_type==3\">\n                      {{model?.seller?.legal_representative?.name ? (model?.seller?.legal_representative?.name + ' ' + model?.seller?.legal_representative?.first_surname + ' ' + model?.seller?.legal_representative?.second_surname) : ('table.tr.td.NA' | translate)}}\n                    </td>\n                 </tr>\n                <tr>\n                  <td *ngIf=\"model?.seller_type==1\">{{model?.seller_leg_rep_email || ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.legal_reps?.email || ('table.tr.td.NA' | translate)}}</td>\n                  <td *ngIf=\"model?.seller_type==3\">{{model?.seller?.legal_representative?.email || ('table.tr.td.NA' | translate)}}</td>\n                 </tr>\n                 <tr>\n                   <td *ngIf=\"model?.seller_type==1\">{{model?.seller_leg_rep_phone ? model?.seller?.dial_code + ' '+ model?.seller_leg_rep_phone : ('table.tr.td.NA' | translate)}}</td>\n                   <td *ngIf=\"model?.seller_type==2\">{{model?.seller_legal_entity?.legal_reps?.phone ? model?.seller_legal_entity?.legal_reps?.dial_code + ' '+ model?.seller_legal_entity?.legal_reps?.phone : ('table.tr.td.NA' | translate)}}</td>\n                   <td *ngIf=\"model?.seller_type==3\">{{model?.seller?.legal_representative?.phone ? model?.seller?.dial_code + ' ' + model?.seller?.legal_representative?.phone : ('table.tr.td.NA' | translate)}}</td>\n                 </tr>\n                 <ng-container *ngFor=\"let seller_rep_banks of sellerRepBanks; let sb=index\">\n                   <tr>\n                     <td></td>\n                     <td>\n                      <a class=\"black\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseSRB{{sb}}\">\n                        <b>Bank {{sb+1}}</b>\n                       </a>\n                     </td>\n                   </tr>\n                   <tr id=\"collapseSRB{{sb}}\" class=\"panel-collapse collapse\">\n                     <td></td>\n                     <table [style.width]=\"'100%'\">\n                       <tbody>\n                         <tr><th>{{'quickVisualization.bankName' | translate}}</th></tr>\n                         <tr><td>{{seller_rep_banks?.bank_name || 'NA'}}</td></tr>\n                         <tr><th>{{'quickVisualization.accountNumber' | translate}}</th></tr>\n                         <tr><td>{{seller_rep_banks?.account_number || 'NA'}}</td></tr>\n                         <tr><th>{{'quickVisualization.clabeSwift' | translate}}</th></tr>\n                         <tr><td>{{seller_rep_banks?.swift || 'NA'}}</td></tr>\n                         <tr><th>{{'quickVisualization.currency' | translate}}</th></tr>\n                         <tr><td>{{seller_rep_banks?.currency?.code || 'NA'}}</td></tr>\n                       </tbody>\n                       </table>\n                   </tr>\n                 </ng-container>\n                </tbody>\n              </table>\n            </div>\n      </div>\n  </div>\n\n\n    <h5>{{'quickVisualization.generalPropertyInformation' | translate}}</h5>\n    <div class=\"row\">\n    <div class=\"col-md-4\">\n\n          <div class=\"table-responsive\">\n            <table class=\"table table-bordered white-bg\">\n              <tbody>\n                  <tr>\n                      <th>{{'quickVisualization.project' | translate}}:</th>\n                      <td>{{model?.property?.building?.name || ('table.tr.td.NA' | translate)}}</td>\n                    </tr>\n                    <tr>\n                      <th>{{'quickVisualization.tower' | translate}}:</th>\n                      <td>{{model?.property?.building_towers?.tower_name || ('table.tr.td.NA' | translate)}}</td>\n                    </tr>\n                    <tr>\n                      <th>{{'quickVisualization.floor' | translate}}:</th>\n                      <td>\n                          {{model?.property?.floor_num ? (model?.property?.floor_num == 0 ? ('addCollection.groundFloor' | translate) : ('addCollection.floor' | translate) + ' ' + model?.property?.floor_num) : ('table.tr.td.NA' | translate)}}\n                      </td>\n                    </tr>\n                    <tr>\n                      <th>{{'quickVisualization.model' | translate}}:</th>\n                      <td>{{model?.property?.building_configuration?.name || ('table.tr.td.NA' | translate)}}</td>\n                    </tr>\n                    <tr>\n                      <th>{{'quickVisualization.propertyName' | translate}}:</th>\n                      <td>{{model?.property?.name || ('table.tr.td.NA' | translate)}}</td>\n                    </tr>\n                    <tr>\n                      <th>{{'quickVisualization.price' | translate}}:</th>\n                      <td>{{(model?.deal_price || 0) | currency}}</td>\n                    </tr>\n              </tbody>\n            </table>\n          </div>\n      </div>\n  \n      <div class=\"col-md-1\"></div>\n  \n      <div class=\"col-md-4\">  \n            <div class=\"table-responsive\">\n              <table class=\"table table-bordered white-bg\">\n                  <tbody>\n                      <tr>\n                          <th>{{'quickVisualization.purchaseDate' | translate}}:</th>\n                          <td>{{model?.deal_purchase_date ? (model?.deal_purchase_date | date:'dd/MMM/yyyy') : ('table.tr.td.NA' | translate)}}</td>\n                        </tr>\n                        <tr>\n                          <th>{{'quickVisualization.currency' | translate}}:</th>\n                          <td>{{model?.currency?.code || ('table.tr.td.NA' | translate)}}</td>\n                        </tr>\n                  </tbody>\n              </table>\n            </div>\n              <div class=\"table-responsive\">\n                <table class=\"table table-bordered white-bg\">\n                    <tbody>\n                          <tr>\n                              <th>\n                                <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#coll\">\n                                  {{'quickVisualization.paid' | translate}}:\n                                </a>\n                              </th>\n                              <td>{{(model?.total_payment_recieved || 0) | currency}}</td>\n                          </tr>\n                          <tr id=\"coll\" class=\"panel-collapse collapse\">\n                            <td colspan=\"2\">\n                              <table>\n                                <tbody>\n                                  <tr *ngFor=\"let d of data2\">\n                                    <th>{{d?.name_en}}</th>\n                                    <td>{{(d?.total_amount || 0) | currency}}</td>\n                                  </tr>\n                                </tbody>\n                              </table>\n                            </td>\n                          </tr>\n                          <tr>\n                            <th>{{'quickVisualization.remaining' | translate}}:</th>\n                            <!-- <td>{{((model?.total || 0) - (model?.paid || 0)) | currency}}</td> -->\n                            <td>{{remainingAmt > 0 ? (remainingAmt | currency) : ( 0 | currency)}}</td>\n                           <!-- <td>{{(totalOutstanding || 0) | currency}}</td> -->\n                          </tr>\n                          <tr>\n                            <th>{{'quickVisualization.totalPenalty' | translate}}:</th>\n                            <td>{{(model?.penalty || 0) | currency}}</td>\n                          </tr>\n                    </tbody>\n                </table>\n              </div>\n        </div>\n\n  </div>\n\n<h5>{{'quickVisualization.paymentInformation' | translate}}</h5>\n      <div id=\"accordion\" class=\"table-responsive main-table\">\n        <table class=\"table table-bordered table-striped table-align-center quick-table\" >\n          <thead class=\"header\" id=\"myHeader\" >  \n            <tr>\n              <th [style.width]=\"'200px'\" [style.z-index]=\"100\">\n                <b>{{'quickVisualization.concept' | translate}}</b>\n              </th>\n              <th [style.width]=\"'140px'\">\n                <b>{{'quickVisualization.month' | translate}}</b>\n              </th>\n              <!-- <th [style.width]=\"'140px'\">\n                <b>{{'quickVisualization.paymentDate' | translate}}</b>\n              </th> -->\n              <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.paid' | translate}}</b>\n              </th>\n              <!-- <th [style.width]=\"'150px'\">\n                <b>{{'quickVisualization.paymentMethods' | translate}}</b>\n              </th> -->\n              <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.outstandingPayment' | translate}}</b>\n              </th>\n              <!-- <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.paidByUser' | translate}}</b>\n              </th> -->\n              <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.toBePaidByUser' | translate}}</b>\n              </th>\n              <!-- <th>\n                  <b>{{'quickVisualization.paymentAttachment' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.paymentDescription' | translate}}</b>\n              </th> -->\n              <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.penaltyFLP' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.penaltyDescription' | translate}}</b>\n              </th>\n              <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.purchasedCommission' | translate}}</b>\n              </th>\n              <th [style.width]=\"'150px'\">\n                  <b>{{'quickVisualization.dateOfPC' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.PCAttachment' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.PCDescription' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.invoiceDate' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.invoiceID' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.pdfDoc' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.xmlDoc' | translate}}</b>\n              </th>\n              <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.collectionCommission' | translate}}</b>\n              </th>\n              <th [style.width]=\"'150px'\">\n                  <b>{{'quickVisualization.dateOfCC' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.CCAttachment' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.CCDescription' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.invoiceDate' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.invoiceID' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.pdfDoc' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.xmlDoc' | translate}}</b>\n              </th>\n              <th [style.width]=\"'120px'\">\n                  <b>{{'quickVisualization.agentCommission' | translate}}</b>\n              </th>\n              <th [style.width]=\"'150px'\">\n                  <b>{{'quickVisualization.dateOfAC' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.ACAttachment' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.ACDescription' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.invoiceDate' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.invoiceID' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.pdfDoc' | translate}}</b>\n              </th>\n              <th>\n                  <b>{{'quickVisualization.xmlDoc' | translate}}</b>\n              </th>\n            </tr>\n          </thead>\n          <tbody *ngFor=\"let p of allPaymentConcepts; let i=index\">\n            <tr [ngClass]=\"{'remaining_amt': p.key == 'remaining_amt'}\">\n              <td>\n                <a style=\"color: #fff;\" class=\"color-changed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse{{i}}\">\n                    {{p?.name}}\n                </a>\n              </td>\n              <td>{{p?.date | date:'dd/MMM/yyyy'}}</td>\n              <!-- <td>{{p?.payment_date || ''}}</td> -->\n              <td>\n                <!-- {{p?.paid_amount}}<br> -->\n                {{p?.paid_amount && p?.paid_amount>'0.1' ? (p?.paid_amount | currency) : ''}}<br>\n                <!-- {{p?.new_paid_amt ? (p?.new_paid_amt | currency) : ''}}  -->\n                <!-- {{p?.is_paid_calculated == 1 ? p?.amount : (p?.collection_payment ? (p?.collection_payment?.amount | currency) : '')}} -->\n              </td>\n              <!-- <td>{{p?.collection_payment?.payment_method?.name || ''}}</td> -->\n              <td>\n                <span [ngClass]=\"{'red-color':p?.is_pending}\">\n                  {{p?.outstanding_amount && p?.outstanding_amount > 0 ? (p?.outstanding_amount | currency) : ''}}\n                </span>\n                <!-- <span [ngClass]=\"{'red-color':(p?.amount != p?.collection_payment?.amount) && p?.collection_payment?.amount}\">\n                  {{p?.is_paid_calculated!=1 && p?.amount ? ((p?.amount || 0) | currency) : ''}}\n                </span> -->\n              </td>\n              <!-- <td>\n                {{p?.collection_payment ? (p?.collection_payment?.amount | currency) : ''}}\n              </td> -->\n              <td>\n                  {{p?.amount ? ((p?.amount || 0) | currency) : ''}}\n              </td>\n              <!-- <td>\n                <a class=\"green-color fontW500\" *ngIf=\"p?.collection_payment && p?.key!='total'\" target=\"_blank\" href=\"{{p?.collection_payment?.receipt}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                <button class=\"action-icon\" *ngIf=\"p?.collection_payment?.description\" (click)=\"showDescription(p?.collection_payment?.description, 1)\">\n                    <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                </button>\n              </td> -->\n              <td>\n                {{p?.penalty ? ((p?.penalty?.amount || 0) | currency) : ''}}\n              </td>\n              <td>\n                  <button class=\"action-icon\" *ngIf=\"p?.penalty?.description\" (click)=\"showDescription(p?.penalty?.description, 2)\">\n                      <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                  </button>\n              </td>\n              <td>\n                {{collectionCommission[i]?.purchase_payment ? \n                  ((collectionCommission[i]['purchase_payment']?.amount + (collectionCommission[i]['purchase_payment']?.iva_amount || 0)) | currency) : ''}}</td>\n              <td>\n                {{collectionCommission[i]?.purchase_payment ? (collectionCommission[i]['purchase_payment']?.payment_date | date:'dd/MMM/yyyy') : ''}}</td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.purchase_payment\" target=\"_blank\" href=\"{{collectionCommission[i]?.purchase_payment?.receipt}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                  <button class=\"action-icon\" *ngIf=\"collectionCommission[i]?.purchase_payment?.description\" (click)=\"showDescription(collectionCommission[i]?.purchase_payment?.description, 3)\">\n                      <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                  </button>\n              </td>\n              <td>{{collectionCommission[i]?.purchase_payment ?\n                (collectionCommission[i]['purchase_payment']?.invoice_date | date:'dd/MMM/yyyy') : ''}}</td>\n              <td>{{collectionCommission[i]?.purchase_payment ?\n                (collectionCommission[i]['purchase_payment']?.invoice_id) : ''}}</td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.purchase_payment && collectionCommission[i]?.purchase_payment?.pdf_url\" target=\"_blank\" href=\"{{collectionCommission[i]?.purchase_payment?.pdf_url}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.purchase_payment && collectionCommission[i]?.purchase_payment?.xml_url\" target=\"_blank\" href=\"{{collectionCommission[i]?.purchase_payment?.xml_url}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td> {{collectionCommission[i]?.payment ? \n                ((collectionCommission[i]['payment']?.amount + (collectionCommission[i]['payment']?.iva_amount || 0)) | currency) : ''}}</td>\n              <td>\n                {{collectionCommission[i]?.payment ? (collectionCommission[i]['payment']?.payment_date | date:'dd/MMM/yyyy') : ''}}</td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.payment\" target=\"_blank\" href=\"{{collectionCommission[i]?.payment?.receipt}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                  <button class=\"action-icon\" *ngIf=\"collectionCommission[i]?.payment?.description\" (click)=\"showDescription(collectionCommission[i]?.payment?.description, 4)\">\n                      <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                  </button>\n              </td>   \n              <td>{{collectionCommission[i]?.payment ? (collectionCommission[i]['payment']?.invoice_date | date:'dd/MMM/yyyy') : ''}}</td>\n              <td>{{collectionCommission[i]?.payment ? (collectionCommission[i]['payment']?.invoice_id) : ''}}</td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.payment && collectionCommission[i]?.payment?.pdf_url\" target=\"_blank\" href=\"{{collectionCommission[i]?.payment?.pdf_url}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.payment && collectionCommission[i]?.payment?.xml_url\" target=\"_blank\" href=\"{{collectionCommission[i]?.payment?.xml_url}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>   \n\n              <td>\n                {{collectionCommission[i]?.agent_payment ? \n                  ((collectionCommission[i]['agent_payment']?.amount + (collectionCommission[i]['agent_payment']?.iva_amount || 0)) | currency) : ''}}</td>\n              <td>\n                {{collectionCommission[i]?.agent_payment ? (collectionCommission[i]['agent_payment']?.payment_date | date:'dd/MMM/yyyy') : ''}}</td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.agent_payment\" target=\"_blank\" href=\"{{collectionCommission[i]?.agent_payment?.receipt}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                  <button class=\"action-icon\" *ngIf=\"collectionCommission[i]?.agent_payment?.description\" (click)=\"showDescription(collectionCommission[i]?.agent_payment?.description, 5)\">\n                      <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                  </button>\n              </td>\n              <td>{{collectionCommission[i]?.agent_payment ?\n                (collectionCommission[i]['agent_payment']?.invoice_date | date:'dd/MMM/yyyy') : ''}}</td>\n              <td>{{collectionCommission[i]?.agent_payment ?\n                (collectionCommission[i]['agent_payment']?.invoice_id) : ''}}</td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.agent_payment && collectionCommission[i]?.agent_payment?.pdf_url\" target=\"_blank\" href=\"{{collectionCommission[i]?.agent_payment?.pdf_url}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>\n              <td>\n                <a class=\"green-color fontW500\" *ngIf=\"collectionCommission[i]?.agent_payment && collectionCommission[i]?.agent_payment?.xml_url\" target=\"_blank\" href=\"{{collectionCommission[i]?.agent_payment?.xml_url}}\">\n                  {{'quickVisualization.view' | translate}}\n                </a>\n              </td>        \n              </tr>\n            \n            \n              <tr id=\"collapse{{i}}\" class=\"panel-collapse collapse\">\n                  <td colspan=\"8\" style=\"background: #fff;\">\n                  <table>\n                    <thead style=\"background: #00B96F; color: #fff;\">\n                      <th [style.width]=\"'240px'\" [style.color]=\"'#fff'\">{{'quickVisualization.concept' | translate}}</th>\n                      <th [style.width]=\"'300px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentDate' | translate}}</th>\n                      <th [style.width]=\"'300px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paidByUser' | translate}}</th>\n                      <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentMethods' | translate}}</th>\n                      <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.bankDetails' | translate}}</th>\n                      <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentAttachment' | translate}}</th>\n                      <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.paymentDescription' | translate}}</th>\n                      <th [style.width]=\"'200px'\" [style.color]=\"'#fff'\">{{'quickVisualization.action' | translate}}</th>\n                    </thead>\n                    <tbody *ngIf=\"p?.collection_paymentss?.length>0\">\n                      <ng-container *ngFor=\"let stats of p?.collection_paymentss; let s=index\">\n                      <tr *ngIf=\"stats.payment_type==1 || stats.payment_type==3 || stats.payment_type==4 || stats.payment_type==5\">\n                        <td [style.backgroundColor]=\"'#fff'\" [style.color]=\"'#222'\">\n                          {{p?.name || 'NA'}}\n                        </td>\n                        <td>\n                          {{stats.payment_date ? (stats.payment_date | date:'dd/MMM/yyyy') : 'NA'}}\n                        </td>\n                        <td>\n                          <span> {{stats?.amount ? (stats?.amount | currency) : ''}}</span> \n                        </td>\n                        <td>\n                          <span> {{stats?.payment_method?.name || 'NA'}}</span> \n                        </td>\n                        <td>\n                          <a class=\"green-color cursor-pointer fontW500\" *ngIf=\"stats?.payment_bank\" (click)=\"showBank(stats?.payment_bank)\">\n                            {{'quickVisualization.view' | translate}}\n                          </a>\n                        </td>\n                        <td>\n                          <a class=\"green-color fontW500\" *ngIf=\"stats?.key!='total'\" target=\"_blank\" href=\"{{stats?.receipt}}\">\n                            {{'quickVisualization.view' | translate}}\n                          </a>\n                        </td>\n                        <td>\n                          <button class=\"action-icon\" *ngIf=\"stats?.description\" (click)=\"showDescription(stats?.description, 1)\">\n                              <img src=\"assets/img/eye-icon.png\" alt=\"img\">\n                          </button>\n                        </td>\n                        <td>\n                          <button class=\"action-icon\" (click)=\"showUpdatePaymentPopup(stats, i, s)\">\n                            <img src=\"assets/img/edit.png\" alt=\"img\">\n                          </button>\n                        </td>\n                      </tr>\n                    </ng-container>\n                    </tbody>\n                  </table>\n                </td>\n                </tr>\n            \n          </tbody>\n        </table>\n      </div>\n</div>\n\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#bank-modal\" #viewBankDetailsModal></a>\n<div class=\"modal animated\" id=\"bank-modal\">\n      <div class=\"modal-dialog fadeIndown\">\n            <div class=\"modal-content notary-avail\">\n                  <div class=\"modal-header popup-header\">\n                        <h4>{{'quickVisualization.bankDetails' | translate}}</h4>\n                        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeBankDetailsModal>&times;</button>\n                        <button type=\"button\" class=\"close\" (click)=\"closeBankModal()\">&times;</button>\n                  </div>\n\n                  <div class=\"modal-body\">\n                    <table [style.width]=\"'100%'\">\n                      <tbody>\n                        <tr><th>{{'quickVisualization.bankName' | translate}}</th></tr>\n                        <tr><td>{{paymentBank?.bank_name || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.accountNumber' | translate}}</th></tr>\n                        <tr><td>{{paymentBank?.account_number || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.clabeSwift' | translate}}</th></tr>\n                        <tr><td>{{paymentBank?.swift || 'NA'}}</td></tr>\n                        <tr><th>{{'quickVisualization.currency' | translate}}</th></tr>\n                        <tr><td>{{paymentBank?.currency?.code || 'NA'}}</td></tr>\n                      </tbody>\n                    </table>\n                  </div>\n            </div>\n      </div>\n</div>\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#des-modal\" #viewDesModal></a>\n<div class=\"modal animated\" id=\"des-modal\">\n      <div class=\"modal-dialog fadeIndown\">\n            <div class=\"modal-content notary-avail\">\n                  <div class=\"modal-header popup-header\">\n                        <h4 *ngIf=\"title==1\">{{'quickVisualization.paymentDescription' | translate}}</h4>\n                        <h4 *ngIf=\"title==2\">{{'quickVisualization.penaltyDescription' | translate}}</h4>\n                        <h4 *ngIf=\"title==3\">{{'quickVisualization.PCDescription' | translate}}</h4>\n                        <h4 *ngIf=\"title==4\">{{'quickVisualization.CCDescription' | translate}}</h4>\n                        <h4 *ngIf=\"title==5\">{{'quickVisualization.ACDescription' | translate}}</h4>\n                        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #viewDesModalClose>&times;</button>\n                        <button type=\"button\" class=\"close\" (click)=\"closeDescModal()\">&times;</button>\n                  </div>\n\n                  <div class=\"modal-body\">\n                        <div class=\"form-group-2\">\n                              <div class=\"form-group\">\n                                    <textarea rows=\"4\" readonly required class=\"form-control note\" name=\"description\" [(ngModel)]=\"description\"></textarea>\n                              </div>\n                        </div>\n                  </div>\n            </div>\n      </div>\n</div>\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#updatePyamentModal\" #updatePaymentModalOpen></a>\n<div class=\"modal animated\" id=\"updatePyamentModal\">\n    <div class=\"modal-dialog fadeIndown modal-lg\">\n        <div class=\"modal-content notary-avail\">\n              <div class=\"modal-header popup-header\">\n          <h4>{{'quickVisualization.editPaymentDetails' | translate}}</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #updatePaymentModalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeUpdatePaymentModal(); addForm.reset()\">&times;</button>\n        </div>\n  \n        <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"updateCollectionPayment()\">\n          <div class=\"modal-body\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.choosePaymentMethod' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <select name=\"payment_method\" required class=\"form-control\" [(ngModel)]=\"payment_method_id\">\n                              <option value=\"\">{{'viewCollections.choosePaymentMethod' | translate}}</option>\n                              <option *ngFor=\"let bt of paymentMethods\" [value]=\"bt.id\"> {{bt?.name}}</option>\n                        </select>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.choosePaymentReceipt' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                      <p *ngIf=\"docFile\">\n                        <span>\n                          <a target=\"_blank\" href=\"{{docFile}}\">{{'quickVisualization.clickToViewReceipt' | translate}}</a>\n                        </span>\n                        <span>\n                          <a class=\"remove\" (click)=\"docFile=''\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n                        </span>\n                      </p>\n                        <input *ngIf=\"!docFile\" type=\"file\" name=\"docFile\" #docsFile1\n                        accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                        (change)=\"onSelectFile($event.target.files)\">\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.paymentDate' | translate}}</label><span class=\"color-red\">*</span>\n                    <div class=\"form-group\">\n                      <div class=\"clearfix\"></div>\n                      <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" autocomplete=\"off\" [(ngModel)]=\"payment_date\" \n                        [style]=\"{'width':'100%'}\" name=\"payment_date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\" \n                        (onSelect)=\"onSelect($event)\" [maxDate]=\"today1\"\n                        showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.description' | translate}}</label>\n                    <div class=\"form-group\">\n                          <textarea rows=\"3\" [(ngModel)]=\"description\" name=\"description\" class=\"form-control\"></textarea>\n                 </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                    <button type=\"submit\" class=\"btn btn-primary-new\">\n                        <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                        {{'addForm.updateBtn' | translate}}</button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n  \n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#entityModal\" #paymentModalOpen></a>\n<div class=\"modal animated\" id=\"entityModal\">\n    <div class=\"modal-dialog fadeIndown modal-lg\">\n        <div class=\"modal-content notary-avail\">\n              <div class=\"modal-header popup-header\">\n          <h4>{{'viewCollections.applyPayment' | translate}}</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #paymentModalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closePaymentModal(); addForm.reset()\">&times;</button>\n        </div>\n  \n        <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"applyCollectionPayment()\">\n          <div class=\"modal-body\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.choosePaymentType' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <select name=\"payment_type\" required class=\"form-control\" [(ngModel)]=\"payment_type\" (change)=\"setPayMentType($event.target.value)\">\n                          <option value=\"\">{{'viewCollections.choose' | translate}}</option>      \n                          <option value=\"1\">{{'viewCollections.payToFollowing' | translate}}</option>\n                          <option value=\"2\" [disabled]=\"disablePayToRemaining\">{{'viewCollections.payToRemainingReducePayment' | translate}}</option>\n                          <option value=\"3\" [disabled]=\"disablePayToRemaining\">{{'viewCollections.payToRemainingPayment' | translate}}</option>\n                          <option value=\"4\">{{'viewCollections.payToSpecific' | translate}}</option>\n                          <option value=\"5\">{{'viewCollections.totalPayment' | translate}}</option>\n                        </select>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\" *ngIf=\"payment_type!=2 && payment_type !=3 && payment_type != 5\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.choosePaymentConcept' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <select name=\"payment_choice\" #applyPaymentChoiceId required class=\"form-control\" [(ngModel)]=\"payment_choice_id\" (ngModelChange)=\"setPaymentAmount($event)\">\n                              <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                               <option *ngFor=\"let bt of paymentConcepts\" [disabled]=\"bt?.is_paid_calculated || (bt?.is_disabled && payment_type==1)\" [ngValue]=\"bt\"> \n                                 {{bt?.name}}\n                                 <span *ngIf=\"bt?.is_paid_calculated\"> | Paid</span>\n                                </option>\n                        </select>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.choosePaymentMethod' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <select name=\"payment_method\" #applyPaymentMethodId required class=\"form-control\" [(ngModel)]=\"payment_method_id\">\n                              <option value=\"\">{{'viewCollections.choosePaymentMethod' | translate}}</option>\n                              <option *ngFor=\"let bt of paymentMethods\" [value]=\"bt.id\"> {{bt?.name}}</option>\n                        </select>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.chooseBank' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <select name=\"payment_bank\" class=\"form-control\" [(ngModel)]=\"payment_bank\">\n                              <option value=\"\">{{'viewCollections.chooseBank' | translate}}</option>\n                              <option *ngFor=\"let bt of paymentBanks\" [ngValue]=\"bt\"> {{bt?.name}} | {{bt?.account_number}} | {{bt?.currency?.code}}</option>\n                        </select>\n                  </div>\n                </div>\n              </div>\n              <ng-container  *ngIf=\"payment_type!=2 && payment_type !=3 && payment_type != 5\">\n              <div class=\"col-6\" *ngIf=\"selectedPaymentConcept\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.programmedDate' | translate}}<span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input readonly class=\"form-control\" value=\"{{selectedPaymentConcept?.date | date:'dd/MMM/yyyy'}}\" name=\"pendingPayment\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.pendingExtraAmt' | translate}}<span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input readonly class=\"form-control\" value=\"{{pendingPayment}}\" name=\"pendingPayment\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.penaltyAmount' | translate}}<span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input readonly class=\"form-control\" value=\"{{penaltyAmount}}\" name=\"penaltyAmount\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.currentAmtTobePaid' | translate}}<span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" readonly required type=\"number\" step=\"0.01\" min=\"0\" class=\"form-control\" [(ngModel)]=\"currentAmount\" \n                        name=\"currentAmount\">\n                  </div>\n                </div>\n              </div>\n            </ng-container>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.totalAmtToBePaid' | translate}}<span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" required type=\"number\" step=\"0.01\" min=\"0\" class=\"form-control\" [(ngModel)]=\"paymentAmount\" \n                        name=\"paymentAmount\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.choosePaymentReceipt' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                        <input type=\"file\" name=\"docFile\" #docsFile1\n                        accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/x-png,image/jpg,image/jpeg\"\n                        (change)=\"onSelectFile($event.target.files)\">\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.paymentDate' | translate}}</label><span class=\"color-red\">*</span>\n                    <div class=\"form-group\">\n                      <div class=\"clearfix\"></div>\n                      <p-calendar dateFormat=\"dd/M/yy\" class=\"form-control\" [(ngModel)]=\"paymentDate\" autocomplete=\"off\" [style]=\"{'width':'100%'}\" name=\"date\" class=\"sz-calendar\" [locale]=\"locale\" showIcon=\"true\" \n                        (onSelect)=\"onSelect($event)\" [maxDate]=\"today1\"\n                        showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                    </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>{{'viewCollections.description' | translate}}</label>\n                    <div class=\"form-group\">\n                          <textarea rows=\"3\" [(ngModel)]=\"description\" name=\"description\" class=\"form-control\"></textarea>\n                 </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                    <button [disabled]=\"isApplyBtnClicked\"\n                      type=\"submit\" class=\"btn btn-primary-new\">\n                        <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                        {{'addForm.addBtn' | translate}}\n                      </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n\n\n  <a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#surplusMoneyModal\" #surplusMoneyModalOpen></a>\n  <div class=\"modal animated\" id=\"surplusMoneyModal\">\n      <div class=\"modal-dialog fadeIndown\">\n          <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n            <h4>{{'viewCollections.surplusMoney' | translate}}</h4>\n              <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #surplusMoneyModalClose>&times;</button>\n              <button type=\"button\" class=\"close\" (click)=\"closeSurplusMoney()\">&times;</button>\n          </div>\n    \n          <form autocomplete=\"off\" class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addSurplusForm=\"ngForm\" >\n            <div class=\"modal-body\">\n              <div class=\"row\">\n                <div class=\"col-12\">\n                  <div class=\"spacer40\"></div>\n                </div>\n                <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                      <label>{{('viewCollections.chooseWhichPaymentTypeYouwantToApplyForSurplusMoney' | translate) +' '+ (paymentAmount-calculatedPayAmount | currency) }} <span class=\"color-red\">*</span></label>\n                      <div class=\"form-group\">\n                          <select name=\"surplus_payment_type\" required class=\"form-control\" [(ngModel)]=\"surplus_payment_type\" (change)=\"setPayMentTypeSurplus($event.target.value)\">\n                            <option value=\"\">{{'viewCollections.choose' | translate}}</option>    \n                            <option value=\"1\">{{'viewCollections.payToFollowing' | translate}}</option>\n                            <option value=\"2\">{{'viewCollections.payToRemainingReducePayment' | translate}}</option>\n                            <option value=\"3\">{{'viewCollections.payToRemainingPayment' | translate}}</option>\n                            <option value=\"4\">{{'viewCollections.payToSpecific' | translate}}</option>\n                          </select>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-12\" *ngIf=\"surplus_payment_type=='4'\">\n                  <div class=\"form-group-2\">\n                      <label>{{'viewCollections.choosePaymentConcept' | translate}} <span class=\"color-red\">*</span></label>\n                      <div class=\"form-group\">\n                          <select name=\"payment_choice13\" required [(ngModel)]=\"surplus_payment_choice_id\" class=\"form-control\" (ngModelChange)=\"setPaymentSurplusAmount($event)\">\n                                <option value=\"\">{{'viewCollections.choosePaymentConcept' | translate}}</option>\n                                 <option *ngFor=\"let bt of paymentConcepts\" [disabled]=\"bt?.is_paid_calculated || bt?.is_disabled\" [ngValue]=\"bt\"> \n                                   {{bt?.name}}\n                                   <span *ngIf=\"bt?.is_paid_calculated\"> | Paid</span>\n                                  </option>\n                          </select>\n                      </div>\n                      <p>{{'viewCollections.amountToBePaid' | translate}} : {{surplus_amt}}</p>\n                  </div>\n                </div>\n                <div class=\"col-12\">\n                  <div class=\"btn-cont text-right\">\n                      <button type=\"button\" (click)=\"closeSurplusMoney(); applyCollectionPayment()\" class=\"btn btn-primary-new\">\n                          <img *ngIf=\"parameter.loading\" src=\"assets/img/loader_gif.gif\" height=\"20\">\n                          {{'addForm.saveBtn' | translate}}</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>"

/***/ }),

/***/ "./src/app/layout/collections/quick-visualization/quick-visualization.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/layout/collections/quick-visualization/quick-visualization.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: QuickVisualizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickVisualizationComponent", function() { return QuickVisualizationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/collection.model */ "./src/app/models/collection.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_common_api_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/common/api-constants */ "./src/app/common/api-constants.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';






var QuickVisualizationComponent = /** @class */ (function () {
    function QuickVisualizationComponent(route, constant, model, apiConstants, admin, spinner, currencyPipe, translate, toastr, cs) {
        this.route = route;
        this.constant = constant;
        this.model = model;
        this.apiConstants = apiConstants;
        this.admin = admin;
        this.spinner = spinner;
        this.currencyPipe = currencyPipe;
        this.translate = translate;
        this.toastr = toastr;
        this.cs = cs;
        this.parameter = {};
        this.payment_date = new Date();
        this.disablePayToRemaining = true;
        this.isApplyBtnClicked = false;
    }
    QuickVisualizationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.admin.globalSettings$.subscribe(function (success) {
            _this.cashLimit = success['cash_limit'];
        });
        this.today1 = new Date();
        this.setDatePickerLocale();
        this.getPaymentMethods();
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.property_collection_id = params['id'];
            _this.getCollectionDetails();
        });
    };
    QuickVisualizationComponent.prototype.setDatePickerLocale = function () {
        if (this.translate.defaultLang === 'en') {
            this.locale = {
                firstDayOfWeek: 0,
                dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                    'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'mm/dd/yy',
                weekHeader: 'Wk',
                dataType: 'string'
            };
        }
        else {
            this.locale = {
                firstDayOfWeek: 0,
                dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
                monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                today: 'Hoy',
                clear: 'Clara',
                dateFormat: 'mm/dd/yy',
                weekHeader: 'Sm',
                dataType: 'string'
            };
        }
    };
    QuickVisualizationComponent.prototype.getCollectionDetails = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getCollectionById', { id: this.property_collection_id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success['data'];
            _this.data2 = success['data2'];
            if (_this.model.seller_type === 1) {
                // this.sellerBanks = this.model.collection_seller_banks;
                // this.sellerRepBanks = this.model.collection_seller_rep_banks;
                _this.sellerBanks = _this.model.seller.legal_rep_banks;
                _this.sellerRepBanks = _this.model.seller.legal_representative && _this.model.seller.legal_representative.legal_rep_banks ?
                    _this.model.seller.legal_representative.legal_rep_banks : null;
            }
            else if (_this.model.seller_type === 2) {
                _this.sellerBanks = _this.model.seller_legal_entity.legal_entity_banks;
                _this.sellerRepBanks = _this.model.seller_legal_entity.legal_reps && _this.model.seller_legal_entity.legal_reps.legal_rep_banks ?
                    _this.model.seller_legal_entity.legal_reps.legal_rep_banks : null;
            }
            else {
                _this.sellerBanks = _this.model.seller.legal_rep_banks;
                _this.sellerRepBanks = _this.model.seller.legal_representative && _this.model.seller.legal_representative.legal_rep_banks ?
                    _this.model.seller.legal_representative.legal_rep_banks : null;
            }
            if (_this.model.buyer_type === 1) {
                // this.buyerBanks = this.model.collection_buyer_banks;
                // this.buyerRepBanks = this.model.collection_buyer_rep_banks;
                _this.buyerBanks = _this.model.buyer.legal_rep_banks;
                _this.buyerRepBanks = _this.model.buyer.legal_representative && _this.model.buyer.legal_representative.legal_rep_banks ?
                    _this.model.buyer.legal_representative.legal_rep_banks : null;
            }
            else if (_this.model.buyer_type === 2) {
                _this.buyerBanks = _this.model.buyer_legal_entity.legal_entity_banks;
                _this.buyerRepBanks = _this.model.buyer_legal_entity.legal_reps && _this.model.buyer_legal_entity.legal_reps.legal_rep_banks ?
                    _this.model.buyer_legal_entity.legal_reps.legal_rep_banks : null;
            }
            else {
                _this.buyerBanks = _this.model.buyer.legal_rep_banks;
                _this.buyerRepBanks = _this.model.buyer.legal_representative && _this.model.buyer.legal_representative.legal_rep_banks ?
                    _this.model.buyer.legal_representative.legal_rep_banks : null;
            }
            _this.allPaymentConcepts = success['data']['payment_choices'];
            // for dropdown
            _this.paymentConcepts = _this.allPaymentConcepts.slice();
            _this.collectionCommission = success['data']['collection_commissions'];
            _this.totalPaid = 0.00;
            _this.totalOutstanding = 0.00;
            _this.remainingAmt = (((_this.model.deal_price || 0) + (_this.model.penalty || 0)) - (_this.model.total_payment_recieved || 0));
            var reducingP = [];
            for (var index = 0; index < _this.allPaymentConcepts.length; index++) {
                var m = _this.allPaymentConcepts[index];
                m.payment_date = m.collection_payment > 0 ? _this.getDateWRTTimezone(m.collection_payment.payment_date, 'YYYY-MM-DD') : '';
                m.paid_amount = m.calc_payment_amount ? m.calc_payment_amount : 0;
                var c = {};
                // if type=2 means reducing payment => add one more row
                if (m.collection_paymentss && m.collection_paymentss.length > 0) {
                    for (var i = 0; i < m.collection_paymentss.length; i++) {
                        var paymnts = m.collection_paymentss[i];
                        paymnts.payment_bank = null;
                        // payment bank
                        if (paymnts.is_agency == 1) {
                            // payment directly received by agency
                            if (paymnts.bank_id) {
                                // agency bank
                                paymnts['payment_bank'] = paymnts.agency_banks;
                            }
                            else if (paymnts.legal_rep_bank_id) {
                                // agency legal rep bank
                                paymnts['payment_bank'] = paymnts.legal_rep_bank;
                            }
                        }
                        else {
                            // payment directly received by seller
                            if (_this.model.seller_type != 2) {
                                if (paymnts.bank_id) {
                                    // seller bank
                                    paymnts['payment_bank'] = paymnts.legal_representative_banks;
                                }
                                else if (paymnts.legal_rep_bank_id) {
                                    // seller legal rep bank
                                    paymnts['payment_bank'] = paymnts.legal_rep_bank;
                                }
                            }
                            else {
                                if (paymnts.bank_id) {
                                    // seller bank
                                    paymnts['payment_bank'] = paymnts.legal_entitiy_bank;
                                }
                                else if (paymnts.legal_rep_bank_id) {
                                    // seller legal rep bank
                                    paymnts['payment_bank'] = paymnts.legal_rep_bank;
                                }
                            }
                        }
                        c = {
                            key: 'remaining_amt',
                            name: '',
                            paid_amount: paymnts.full_amount,
                            is_paid_calculated: 0,
                            outstanding_amount: 0,
                            index: index + i,
                            payment_type: 2,
                            receipt: paymnts.receipt,
                            description: paymnts.description,
                            display_choice_id: paymnts.display_choice_id,
                            created_at: paymnts.created_at
                        };
                        if (paymnts.payment_type == 2) {
                            c['name'] = 'Payment to remaining (Reduce Amount)';
                            c['collection_paymentss'] = [{
                                    id: paymnts.id,
                                    parent_id: paymnts.parent_id,
                                    payment_type: 1,
                                    paid_amount: paymnts.amount,
                                    amount: paymnts.amount,
                                    payment_date: _this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                    receipt: paymnts.receipt,
                                    description: paymnts.description,
                                    payment_method: paymnts.payment_method,
                                    payment_bank: paymnts.payment_bank
                                }];
                            reducingP.push(c);
                        }
                        else if (paymnts.payment_type == 3 && paymnts.display_choice_id) {
                            c['name'] = 'Payment to remaining (Reduce Time)';
                            c['collection_paymentss'] = [{
                                    id: paymnts.id,
                                    parent_id: paymnts.parent_id,
                                    payment_type: 3,
                                    paid_amount: paymnts.full_amount,
                                    amount: paymnts.full_amount,
                                    payment_date: _this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                    receipt: paymnts.receipt,
                                    description: paymnts.description,
                                    payment_method: paymnts.payment_method,
                                    payment_bank: paymnts.payment_bank
                                }];
                            reducingP.push(c);
                        }
                        else if (paymnts.payment_type == 5 && paymnts.display_choice_id) {
                            c['name'] = 'Total Payment';
                            c['collection_paymentss'] = [{
                                    id: paymnts.id,
                                    parent_id: paymnts.parent_id,
                                    payment_type: 5,
                                    paid_amount: paymnts.full_amount,
                                    amount: paymnts.full_amount,
                                    payment_date: _this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                                    receipt: paymnts.receipt,
                                    description: paymnts.description,
                                    payment_method: paymnts.payment_method,
                                    payment_bank: paymnts.payment_bank
                                }];
                            reducingP.push(c);
                        }
                    }
                }
                // calculating total paid and total outstanding payment
                _this.totalPaid = _this.totalPaid + m.paid_amount;
                m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
                if ((m.amount - (m.calc_payment_amount || 0)) >= 0) {
                    var a = (m.calc_payment_amount || 0);
                    m['is_pending'] = a ? 1 : 0;
                    _this.totalOutstanding = _this.totalOutstanding + m['outstanding_amount'];
                }
            }
            // now insert at reducing remaining payments at type=2 index
            // sorting reducingP according to date => in case user is paying using type 3 consecutively many times
            reducingP.sort(_this.sortFunction);
            for (var i = 0; i < reducingP.length; i++) {
                var element = reducingP[i];
                // for payment_type 3,5 check display_choice_id
                // loop is for if need to insert 2 type 2 payments on same index
                for (var j = 0; j < _this.allPaymentConcepts.length; j++) {
                    var e = _this.allPaymentConcepts[j];
                    if (e.id == element.display_choice_id) {
                        _this.allPaymentConcepts.splice(j, 0, element);
                        break;
                    }
                }
            }
            // calculating new paid amt, by skipping type 2
            for (var index = 0; index < _this.allPaymentConcepts.length; index++) {
                var element = _this.allPaymentConcepts[index];
                var p_amt = 0;
                if (element.collection_paymentss && element.collection_paymentss.length > 0) {
                    for (var i = 0; i < element.collection_paymentss.length; i++) {
                        var ele = element.collection_paymentss[i];
                        // if payment_type 2 then reduce the amount from all MI (only)
                        if (ele.payment_type == 2) {
                            var v = ele.amt_share || 0;
                            var ids = ele.choices_ids.split(',');
                            // deleting the share of type 2 from main header
                            for (var j = 0; j < _this.allPaymentConcepts.length; j++) {
                                var e = _this.allPaymentConcepts[j];
                                if (e.id) {
                                    var d = e.id.toString();
                                    var h = ids.indexOf(d);
                                    if (h >= 0) {
                                        var obj = {
                                            amount: v,
                                            name: 'Payment to remaining (Reduce Amount)',
                                            payment_type: 1,
                                            paid_amount: v,
                                            payment_date: _this.getDateWRTTimezone(ele.payment_date, 'YYYY-MM-DD'),
                                            receipt: ele.receipt,
                                            description: ele.description,
                                            payment_method: ele.payment_method,
                                            payment_bank: ele.payment_bank
                                        };
                                        _this.allPaymentConcepts[j].paid_amount = parseFloat(_this.allPaymentConcepts[j].paid_amount) - parseFloat(v);
                                    }
                                }
                            }
                        }
                    }
                }
                element.new_paid_amt = p_amt;
            }
            _this.allPaymentConcepts.push({
                key: 'total',
                name: 'Total',
                // paid_amount: this.totalPaid,
                paid_amount: _this.model.total_payment_recieved,
                is_paid_calculated: 1,
                outstanding_amount: _this.totalOutstanding
            });
            _this.collectionCommission.push({});
        }, function (error) {
            _this.spinner.hide();
        });
    };
    QuickVisualizationComponent.prototype.exportData = function () {
        if (this.allPaymentConcepts) {
            var finalData = [];
            for (var index = 0; index < this.allPaymentConcepts.length; index++) {
                var p = this.allPaymentConcepts[index];
                var pcAmount = this.collectionCommission[index]['purchase_payment'] ?
                    this.currencyPipe.transform(this.collectionCommission[index]['purchase_payment']['amount']) : '';
                var pcDate = this.collectionCommission[index]['purchase_payment'] ?
                    this.collectionCommission[index]['purchase_payment']['payment_date'] : '';
                var ccAmount = this.collectionCommission[index]['payment'] ?
                    this.currencyPipe.transform(this.collectionCommission[index]['payment']['amount']) : '';
                var ccDate = this.collectionCommission[index]['payment'] ? this.collectionCommission[index]['payment']['payment_date'] : '';
                finalData.push({
                    'Concept': p.name || '',
                    'Month': p.date || '',
                    'Payment Date': p.collection_payment ? p.collection_payment.payment_date : '',
                    'Paid': p.paid_amount ? this.currencyPipe.transform(p.paid_amount) : '',
                    'Outstanding Payment': p.outstanding_amount ? this.currencyPipe.transform(p.outstanding_amount) : '',
                    'Payment Method': p.collection_payment && p.collection_payment.payment_method ? p.collection_payment.payment_method.name : '',
                    'Sozu Payment Receipt': p.collection_payment ? p.collection_payment.receipt : '',
                    'Payment Description': p.collection_payment ? p.collection_payment.description : '',
                    'Penalty FLP': p.penalty ? this.currencyPipe.transform(p.penalty.amount) : '',
                    'Penalty Description': p.penalty ? p.penalty.description : '',
                    'Purchased Commission': pcAmount,
                    'Date Of PC': pcDate,
                    'Sozu PC Receipt': this.collectionCommission[index] && this.collectionCommission[index].purchase_payment
                        ? this.collectionCommission[index].purchase_payment.receipt : '',
                    'PC Description': this.collectionCommission[index] && this.collectionCommission[index].purchase_payment
                        ? this.collectionCommission[index].purchase_payment.description : '',
                    'Collection Commission': ccAmount,
                    'Date Of CC': ccDate,
                    'Sozu CC Receipt': this.collectionCommission[index] && this.collectionCommission[index].payment
                        ? this.collectionCommission[index].payment.receipt : '',
                    'CC Description': this.collectionCommission[index] && this.collectionCommission[index].payment
                        ? this.collectionCommission[index].payment.description : '',
                });
            }
            this.exportAsExcelFile(finalData, 'collection-');
        }
    };
    // will be used in case of excel
    QuickVisualizationComponent.prototype.exportAsExcelFile = function (json, excelFileName) {
        var worksheet = xlsx__WEBPACK_IMPORTED_MODULE_7__["utils"].json_to_sheet(json);
        var workbook = {
            Sheets: { data: worksheet },
            SheetNames: ['data']
        };
        var excelBuffer = xlsx__WEBPACK_IMPORTED_MODULE_7__["write"](workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    };
    QuickVisualizationComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], { type: EXCEL_TYPE });
        var today = new Date();
        var date = today.getDate() +
            '-' +
            today.getMonth() +
            '-' +
            today.getFullYear() +
            '_' +
            today.getHours() +
            '_' +
            today.getMinutes() +
            '_' +
            today.getSeconds();
        fileName = fileName + date;
        file_saver__WEBPACK_IMPORTED_MODULE_6__["saveAs"](data, fileName + EXCEL_EXTENSION);
    };
    QuickVisualizationComponent.prototype.showDescription = function (description, title) {
        console.log('aaaa');
        if (description) {
            this.title = title;
            this.description = description;
            this.viewDesModal.nativeElement.click();
        }
    };
    QuickVisualizationComponent.prototype.closeDescModal = function () {
        this.viewDesModalClose.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.showBank = function (payment_bank) {
        this.paymentBank = payment_bank;
        this.viewBankDetailsModal.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.closeBankModal = function () {
        this.closeBankDetailsModal.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.getDateWRTTimezone = function (date, format) {
        var offset = new Date(date).getTimezoneOffset();
        if (offset < 0) {
            return moment__WEBPACK_IMPORTED_MODULE_9__(date).subtract(offset, 'minutes').format(format);
        }
        else {
            return moment__WEBPACK_IMPORTED_MODULE_9__(date).add(offset, 'minutes').format(format);
        }
    };
    QuickVisualizationComponent.prototype.getPaymentMethods = function () {
        var _this = this;
        this.admin.postDataApi('getPaymentMethods', {})
            .subscribe(function (success) {
            _this.paymentMethods = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    QuickVisualizationComponent.prototype.onSelectFile = function (files) {
        var _this = this;
        this.parameter.loading = true;
        this.cs.saveAttachment(files[0]).subscribe(function (success) {
            _this.parameter.loading = false;
            _this.docFile = success['data'].name;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    QuickVisualizationComponent.prototype.onSelect = function (e) {
        this.payment_date = moment__WEBPACK_IMPORTED_MODULE_9__["utc"](e).toDate();
    };
    QuickVisualizationComponent.prototype.showUpdatePaymentPopup = function (item, i, s) {
        this.item = item;
        this.mainIndex = i;
        this.index = s;
        this.payment_id = item.id;
        this.payment_type = item.payment_type;
        this.payment_method_id = item.payment_method.id;
        this.description = item.description;
        this.docFile = item.receipt;
        this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
        this.updatePaymentModalOpen.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.closeUpdatePaymentModal = function () {
        this.updatePaymentModalClose.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.updateCollectionPayment = function () {
        var _this = this;
        // checking if date selected and receipt selected
        if (!this.payment_date) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.docFile) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
            return false;
        }
        var offset = new Date(this.payment_date).getTimezoneOffset();
        if (offset < 0) {
            this.payment_date = moment__WEBPACK_IMPORTED_MODULE_9__(this.payment_date).subtract(offset, 'minutes').toDate();
        }
        else {
            this.payment_date = moment__WEBPACK_IMPORTED_MODULE_9__(this.payment_date).add(offset, 'minutes').toDate();
        }
        this.item.payment_method_id = this.payment_method_id;
        this.item.payment_id = this.payment_id;
        this.item.receipt = this.docFile;
        this.item.description = this.description;
        this.item.payment_date = this.payment_date;
        this.admin.postDataApi('updateCollectionPayment', this.item).subscribe(function (r) {
            _this.closeUpdatePaymentModal();
            _this.allPaymentConcepts[_this.mainIndex].collection_paymentss[_this.index] = _this.item;
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully'), _this.translate.instant('swal.success'));
        }, function (error) {
            _this.toastr.error(error.message, _this.translate.instant('swal.error'));
            return false;
        });
    };
    QuickVisualizationComponent.prototype.showApplyPaymentPopup = function () {
        this.surplus_payment_type = null;
        this.payment_type = null;
        this.payment_date = null;
        this.payment_choice_id = null;
        var check = this.paymentConcepts.find(function (r) { return r.name.includes('Monthly Installment'); });
        this.disablePayToRemaining = true;
        if (check) {
            this.disablePayToRemaining = false;
        }
        this.calculateCash();
        // payment banks
        this.paymentBanks = [];
        if (this.model.payment_received_by) {
            // payment directly received by agency
            if (this.model.property.building && this.model.property.building.agency_id) {
                // agency banks
                for (var index = 0; index < this.model.property.building.agency.agency_banks.length; index++) {
                    var element = this.model.property.building.agency.agency_banks[index];
                    element.name = 'Agency Bank | ' + element.bank_name;
                    element.is_agency = 1;
                    element.bank_id = element.id;
                    element.legal_rep_bank_id = null;
                    this.paymentBanks.push(element);
                }
                // agency legal representative banks
                if (this.model.property.building.agency.legal_representative) {
                    for (var index = 0; index < this.model.property.building.agency.legal_representative.legal_rep_banks.length; index++) {
                        var element = this.model.property.building.agency.legal_representative.legal_rep_banks[index];
                        element.name = 'Agency Legal Rep Bank | ' + element.bank_name;
                        element.is_agency = 1;
                        element.bank_id = null;
                        element.legal_rep_bank_id = element.id;
                        this.paymentBanks.push(element);
                    }
                }
            }
        }
        else {
            // payment directly received by seller
            if (this.model.seller_type != 2) {
                // seller (as a person or developer) banks
                for (var index = 0; index < this.model.seller.legal_rep_banks.length; index++) {
                    var element = this.model.seller.legal_rep_banks[index];
                    element.name = 'Seller Bank | ' + element.bank_name;
                    element.is_agency = 2;
                    element.bank_id = element.id;
                    element.legal_rep_bank_id = null;
                    this.paymentBanks.push(element);
                }
                // agency legal representative banks
                if (this.model.seller.legal_representative) {
                    for (var index = 0; index < this.model.seller.legal_representative.legal_rep_banks.length; index++) {
                        var element = this.model.seller.legal_representative.legal_rep_banks[index];
                        element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
                        element.is_agency = 2;
                        element.bank_id = null;
                        element.legal_rep_bank_id = element.id;
                        this.paymentBanks.push(element);
                    }
                }
            }
            else {
                // seller (as a legal entity) banks
                if (this.model.seller_legal_entity && this.model.seller_legal_entity.legal_entity_banks) {
                    for (var index = 0; index < this.model.seller_legal_entity.legal_entity_banks.length; index++) {
                        var element = this.model.seller_legal_entity.legal_entity_banks[index];
                        element.name = 'Seller Bank | ' + element.bank_name;
                        element.is_agency = 2;
                        element.bank_id = element.id;
                        element.legal_rep_bank_id = null;
                        this.paymentBanks.push(element);
                    }
                    // agency legal representative banks
                    if (this.model.seller_legal_entity.legal_reps && this.model.seller_legal_entity.legal_reps.legal_rep_banks) {
                        for (var index = 0; index < this.model.seller_legal_entity.legal_reps.legal_rep_banks.length; index++) {
                            var element = this.model.seller_legal_entity.legal_reps.legal_rep_banks[index];
                            element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
                            element.is_agency = 2;
                            element.bank_id = null;
                            element.legal_rep_bank_id = element.id;
                            this.paymentBanks.push(element);
                        }
                    }
                }
            }
        }
        this.paymentModalOpen.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.calculateCash = function () {
        this.cashSum = 0;
        for (var index = 0; index < this.paymentConcepts.length; index++) {
            var m = this.paymentConcepts[index];
            if (m.collection_paymentss && m.collection_paymentss.length > 0) {
                for (var i = 0; i < m.collection_paymentss.length; i++) {
                    var paymnts = m.collection_paymentss[i];
                    console.log(paymnts);
                    if (paymnts.payment_method_id == this.apiConstants.payment_method_id) {
                        this.cashSum = parseFloat(this.cashSum) + parseFloat(paymnts.amount);
                    }
                }
            }
        }
    };
    QuickVisualizationComponent.prototype.applyCollectionPayment = function () {
        var _this = this;
        var callApi = true;
        // checking if date selected and receipt selected
        if (!this.paymentDate) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.docFile) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
            return false;
        }
        if (!this.paymentAmount || this.paymentAmount == 0) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseEnterValidAmt'), this.translate.instant('swal.error'));
            return false;
        }
        if (this.surplus_payment_type == '4' && !this.surplus_payment_choice_id) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.pleaseChoosePayments'), this.translate.instant('swal.error'));
            return false;
        }
        // if (this.cashSum + this.paymentAmount > this.cashLimit) {
        //   this.toastr.clear();
        //   this.toastr.error(this.translate.instant('message.error.cashLimitReached'), this.translate.instant('swal.error'));
        //   // return false;
        // }
        var amt = this.paymentAmount;
        // in case of pay to following, if user is paying surplus money ask the user, what he wants to do with durplus money
        if (this.payment_type == 1 && this.calculatedPayAmount < this.paymentAmount) {
            if (!this.surplus_payment_type) {
                this.askUserForSurplusMomey();
                return;
            }
            else {
                amt = this.calculatedPayAmount;
            }
        }
        // check for type 1, user can not pay more than the sum of all installments
        if (this.payment_type == '1') {
            var a_1 = 0;
            this.paymentConcepts.map(function (v) {
                if (!v['is_paid_calculated']) {
                    var remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
                    a_1 = a_1 + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
                }
            }, 0);
            if (this.paymentAmount > a_1) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.payToFollowingCheck'), this.translate.instant('swal.error'));
                return false;
            }
        }
        // check for type 2 abd 2, user cannot pay more than sum of remaining MI
        if (this.payment_type == '2' || this.payment_type == '3') {
            console.log('---');
            var a = 0;
            // this.paymentConcepts.map(v => {
            for (var index = 0; index < this.paymentConcepts.length; index++) {
                var v = this.paymentConcepts[index];
                if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
                    // calculating total amt to be paid
                    var remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
                    a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
                    console.log(a);
                    a = a.toFixed(2);
                    // checking if any pending monthly installment exist
                    var paymnets = v['collection_paymentss'];
                    var l = paymnets.length;
                    if (l > 0) {
                        var last_payment = paymnets[l - 1];
                        if (last_payment['payment_type'] != 2) {
                            console.log('complete first');
                            this.toastr.clear();
                            this.toastr.error(this.translate.instant('message.error.paytoRemainingPendingCheck'), this.translate.instant('swal.error'));
                            return false;
                        }
                    }
                }
            }
            if (this.paymentAmount > a) {
                console.log('complete first');
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.payToRemainingcheck'), this.translate.instant('swal.error'));
                return false;
            }
        }
        // check for type 3, user can only pay exact amount of M1, or sum of M1 & M2, or sum of M1,M2,M3 and soon
        var a1 = this.surplus_payment_type == '3' ? this.paymentAmount - this.calculatedPayAmount : this.paymentAmount;
        if (this.payment_type == '3' || this.surplus_payment_type == '3') {
            var a = 0;
            var index = this.paymentConcepts.length - 1;
            for (index; index >= 0; index--) {
                var v = this.paymentConcepts[index];
                if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
                    var remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
                    a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
                    a = a.toFixed(2);
                }
                // using a1 and not this.paymentAmount because, need to check for both direct type 3 and type 3 in surplus popup
                console.log(a1, a);
                if (a1 > a) {
                    continue;
                }
                else if (a1 == a) {
                    break;
                }
                else if (this.paymentAmount < a) {
                    console.log(a1, a);
                    this.toastr.clear();
                    this.toastr.error(this.translate.instant('message.error.payToRemainingReduceTimecheck'), this.translate.instant('swal.error'));
                    this.surplus_payment_type == '3'
                        ? this.surplusMoneyModalClose.nativeElement.click()
                        : this.paymentModalClose.nativeElement.click();
                    return false;
                }
            }
        }
        // in pay to specific, user is allowed to pay either exact amount or partial amt
        if (this.payment_type == 4 && this.calculatedPayAmount < this.paymentAmount) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
            return false;
        }
        // in total payment, user is allowed to pay sum of exact remaining amount (sum of installments and penalty)
        if (this.payment_type == 5 && this.calculatedPayAmount != this.paymentAmount) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.totalPayemntCheck'), this.translate.instant('swal.error'));
            return false;
        }
        var offset = new Date(this.paymentDate).getTimezoneOffset();
        if (offset < 0) {
            this.paymentDate = moment__WEBPACK_IMPORTED_MODULE_9__(this.paymentDate).subtract(offset, 'minutes').toDate();
        }
        else {
            this.paymentDate = moment__WEBPACK_IMPORTED_MODULE_9__(this.paymentDate).add(offset, 'minutes').toDate();
        }
        // inpur params
        var input = {
            property_collection_id: this.property_collection_id,
            payment_method_id: this.payment_method_id,
            is_agency: this.payment_bank ? this.payment_bank.is_agency : null,
            bank_id: this.payment_bank ? this.payment_bank.bank_id : null,
            legal_rep_bank_id: this.payment_bank ? this.payment_bank.legal_rep_bank_id : null,
            amount: amt,
            receipt: this.docFile,
            description: this.description,
            payment_date: this.paymentDate,
            full_amount: this.paymentAmount // sending real amount entered by user
        };
        if (this.payment_type == 1 || this.payment_type == 4) {
            input['collection_payment_choice_id'] = this.payment_choice_id['id'];
        }
        input['type'] = this.payment_type;
        if ((this.cashSum + this.paymentAmount > this.cashLimit)) {
            callApi = false;
            swal({
                html: this.translate.instant('message.error.cashLimitReached'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) {
                    // continue;
                    _this.callToPaymentApi(input);
                }
                else {
                    return;
                }
            });
            // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.cashLimitReached'), 'error');
            // this.toastr.clear();
            // this.toastr.error(this.translate.instant('message.error.cashLimitReached'), this.translate.instant('swal.error'));
            // return false;
        }
        if (callApi) {
            this.isApplyBtnClicked = true;
            this.admin.postDataApi('applyCollectionPayment', input).subscribe(function (r) {
                _this.isApplyBtnClicked = false;
                if (_this.surplus_payment_type) {
                    input['amount'] = _this.paymentAmount - _this.calculatedPayAmount;
                    input['type'] = _this.surplus_payment_type;
                    input['parent_id'] = r.data['id']; // send parent_id in case of type 1 and surplus (to make parent delete)
                    if (_this.surplus_payment_type == '4') {
                        input['collection_payment_choice_id'] = _this.surplus_payment_choice_id;
                    }
                    _this.admin.postDataApi('applyCollectionPayment', input).subscribe(function (r) {
                        // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
                        //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
                        // }
                    });
                }
                _this.paymentModalClose.nativeElement.click();
                _this.closeCollReceiptModal();
                _this.getCollectionDetails();
                _this.toastr.clear();
                _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully'), _this.translate.instant('swal.success'));
            }, function (error) {
                _this.paymentConcepts = [];
                _this.isApplyBtnClicked = false;
                _this.paymentModalClose.nativeElement.click();
                _this.closeCollReceiptModal();
                _this.getCollectionDetails();
                return false;
            });
        }
    };
    QuickVisualizationComponent.prototype.callToPaymentApi = function (input) {
        var _this = this;
        this.isApplyBtnClicked = true;
        this.admin.postDataApi('applyCollectionPayment', input).subscribe(function (r) {
            _this.isApplyBtnClicked = false;
            if (_this.surplus_payment_type) {
                input['amount'] = _this.paymentAmount - _this.calculatedPayAmount;
                input['type'] = _this.surplus_payment_type;
                input['parent_id'] = r.data['id']; // send parent_id in case of type 1 and surplus (to make parent delete)
                if (_this.surplus_payment_type == '4') {
                    input['collection_payment_choice_id'] = _this.surplus_payment_choice_id;
                }
                _this.admin.postDataApi('applyCollectionPayment', input).subscribe(function (r) {
                    // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
                    //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
                    // }
                });
            }
            _this.paymentModalClose.nativeElement.click();
            _this.closeCollReceiptModal();
            _this.getCollectionDetails();
            _this.toastr.clear();
            _this.toastr.success(_this.translate.instant('message.success.savedSuccessfully'), _this.translate.instant('swal.success'));
        }, function (error) {
            _this.paymentConcepts = [];
            _this.isApplyBtnClicked = false;
            _this.paymentModalClose.nativeElement.click();
            _this.closeCollReceiptModal();
            _this.getCollectionDetails();
            return false;
        });
    };
    QuickVisualizationComponent.prototype.askUserForSurplusMomey = function () {
        this.closePaymentModal();
        this.surplusMoneyModalOpen.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.setPayMentType = function (payment_type) {
        this.payment_type = payment_type;
        if (payment_type == '1') {
            this.paymentConcepts.map(function (r) { return r.is_disabled = true; });
            for (var index = 0; index < this.paymentConcepts.length; index++) {
                if (!this.paymentConcepts[index].is_paid_calculated) {
                    this.paymentConcepts[index].is_disabled = false;
                    break;
                }
            }
        }
        this.docsFile1.nativeElement.value = '';
        if (this.payment_type && this.payment_type != '2' && this.payment_type != '3' && this.payment_type != '5') {
            this.applyPaymentChoiceId.nativeElement.value = '';
        }
        this.closeCollReceiptModal();
        if (this.payment_type == 5) {
            var amt = 0;
            var penaltyamt = 0;
            var amtPaid = 0;
            var currentAmt = 0;
            var currentAmtPaid = 0;
            this.penaltyAmount = 0;
            for (var index = 0; index < this.paymentConcepts.length; index++) {
                var r = this.paymentConcepts[index];
                currentAmt = r['amount'];
                currentAmtPaid = r['calc_payment_amount'] || 0;
                penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
                amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
                amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
            }
            this.paymentAmount = (amt - amtPaid).toFixed(2);
            this.calculatedPayAmount = this.paymentAmount.slice();
        }
        this.applyPaymentMethodId.nativeElement.value = '';
    };
    QuickVisualizationComponent.prototype.setPayMentTypeSurplus = function (payment_type) {
        this.surplus_payment_type = payment_type;
        // incase user select type 4 in surplus popup => therefore, needs to disable selected concept in payment modal
        this.paymentConcepts.map(function (r) { return r.is_disabled = false; });
        for (var index = 0; index < this.paymentConcepts.length; index++) {
            // paid and if selected concept => only then disable
            if (this.payment_choice_id['id'] == this.paymentConcepts[index].id) {
                this.paymentConcepts[index].is_disabled = true;
                break;
            }
        }
    };
    QuickVisualizationComponent.prototype.setPaymentAmount = function (item) {
        this.selectedPaymentConcept = item;
        var amt = 0;
        var penaltyamt = 0;
        var amtPaid = 0;
        var currentAmt = 0;
        var currentAmtPaid = 0;
        // checking if method is pay to specific (4),
        // then user will pay only for that specific installment +
        // user cannot pay more than the amount+penalty
        if (this.payment_type == 4) {
            currentAmt = item['amount'];
            currentAmtPaid = item['calc_payment_amount'] || 0;
            this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
            this.pendingPayment = 0.00; // amt already paid
            this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
            this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment)
                + parseFloat(this.penaltyAmount)).toFixed(2);
            this.calculatedPayAmount = this.paymentAmount.slice();
        }
        else if (this.payment_type == 1) {
            for (var index = 0; index < this.paymentConcepts.length; index++) {
                var r = this.paymentConcepts[index];
                currentAmt = r['amount'];
                currentAmtPaid = r['calc_payment_amount'] || 0;
                if (r['id'] != item['id']) {
                    penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
                    amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
                    amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
                }
                else {
                    break;
                }
            }
            this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
            this.pendingPayment = (amt - amtPaid).toFixed(2);
            this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
            this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) + parseFloat(this.penaltyAmount)).toFixed(2);
            this.calculatedPayAmount = this.paymentAmount.slice();
        }
    };
    QuickVisualizationComponent.prototype.setPaymentSurplusAmount = function (item) {
        this.selectedPaymentConcept = item;
        this.surplus_payment_choice_id = item.id;
        var currentAmt = 0;
        var currentAmtPaid = 0;
        // checking if method is pay to specific (4),
        // then user will pay only for that specific installment +
        // user cannot pay more than the amount+penalty
        if (this.surplus_payment_type == '4') {
            currentAmt = item['amount'];
            currentAmtPaid = item['calc_payment_amount'] || 0;
            var penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
            var currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
            this.surplus_amt = (parseFloat(currentAmount) + parseFloat(penaltyAmount)).toFixed(2);
        }
        if ((this.paymentAmount - this.calculatedPayAmount) > this.surplus_amt) {
            this.surplus_payment_choice_id = '';
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
            return false;
        }
    };
    QuickVisualizationComponent.prototype.closeSurplusMoney = function () {
        this.surplusMoneyModalClose.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.closePaymentModal = function () {
        this.paymentModalClose.nativeElement.click();
    };
    QuickVisualizationComponent.prototype.closeCollReceiptModal = function () {
        this.paymentAmount = 0;
        this.docFile = '';
        this.description = '';
        this.penaltyAmount = 0;
        this.pendingPayment = 0;
        this.currentAmount = 0;
        this.paymentDate = null;
        this.docsFile1.nativeElement.value = '';
    };
    QuickVisualizationComponent.prototype.sortFunction = function (a, b) {
        var dateA = new Date(a.created_at).getTime();
        var dateB = new Date(b.created_at).getTime();
        return dateA > dateB ? 1 : -1;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewDesModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "viewDesModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewDesModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "viewDesModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewBankDetailsModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "viewBankDetailsModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeBankDetailsModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "closeBankDetailsModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('updatePaymentModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "updatePaymentModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('updatePaymentModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "updatePaymentModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paymentModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "paymentModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paymentModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "paymentModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('surplusMoneyModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "surplusMoneyModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('surplusMoneyModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "surplusMoneyModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('applyPaymentChoiceId'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "applyPaymentChoiceId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('applyPaymentMethodId'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "applyPaymentMethodId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docsFile1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "docsFile1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('stickyMenu'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QuickVisualizationComponent.prototype, "menuElement", void 0);
    QuickVisualizationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-quick-visualization',
            template: __webpack_require__(/*! ./quick-visualization.component.html */ "./src/app/layout/collections/quick-visualization/quick-visualization.component.html"),
            styles: [__webpack_require__(/*! ./quick-visualization.component.css */ "./src/app/layout/collections/quick-visualization/quick-visualization.component.css")],
            providers: [src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_2__["Collection"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["CurrencyPipe"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_13__["Constant"],
            src_app_models_collection_model__WEBPACK_IMPORTED_MODULE_2__["Collection"],
            src_app_common_api_constants__WEBPACK_IMPORTED_MODULE_12__["ApiConstants"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_8__["CurrencyPipe"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_10__["ToastrService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], QuickVisualizationComponent);
    return QuickVisualizationComponent;
}());



/***/ }),

/***/ "./src/app/models/collection.model.ts":
/*!********************************************!*\
  !*** ./src/app/models/collection.model.ts ***!
  \********************************************/
/*! exports provided: Collection, DealType, Seller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return Collection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DealType", function() { return DealType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Seller", function() { return Seller; });
var Collection = /** @class */ (function () {
    function Collection() {
    }
    return Collection;
}());

var DealType = /** @class */ (function () {
    function DealType() {
    }
    return DealType;
}());

var Seller = /** @class */ (function () {
    function Seller() {
    }
    return Seller;
}());



/***/ })

}]);
//# sourceMappingURL=collections-collections-module.js.map