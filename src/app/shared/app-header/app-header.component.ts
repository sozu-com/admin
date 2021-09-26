import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../common/constants';
import { IProperty } from '../../common/property';
import { MessagingService } from 'src/app/fire-base/messaging.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
// import { MessagingService } from '../../fire-base/messaging.service';
import { NestedTreeControl } from '@angular/cdk/tree'
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { Observable, of } from 'rxjs'
import { AnimationQueryMetadata } from '@angular/animations';

interface MyTreeNode {
  title: string, url: any, icon: any
  children?: MyTreeNode[]
}

declare let swal: any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  treeControl: NestedTreeControl<MyTreeNode>
  treeDataSource: MatTreeNestedDataSource<MyTreeNode>
  message: any;
  public parameter: IProperty = {};
  fullName: string;
  image: string;
  admin_acl: any;
  msg_count = 0;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
  notificationCount: any;
  constructor(public admin: AdminService,
    private route: ActivatedRoute, private router: Router,
    public constant: Constant,
    private messagingService: MessagingService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private commonService: CommonService
  ) {
    const demoNodes: MyTreeNode[] = [
      {
        title: this.translate.instant('sidebar.dashboards'),
        url: '',
        icon: './assets/img/chart.png',
        children: [
          {
            title: this.translate.instant('sidebar.metatags'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.home'),
                url: '/dashboard/metatags/metatag-home',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.for-sale'),
                url: '/dashboard/metatags/metatag-sale',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.rent'),
                url: 'metatags/metatag-rent',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.sell'),
                url: 'metatags/metatag-sell',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.mortage'),
                url: 'metatags/metatag-mortage-loans',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.new_pro'),
                url: 'metatags/metatag-new-project',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.developer'),
                url: 'metatags/metatag-devloper',
                icon: 'assets/img/web_logo.png'
              }
            ]
          },
          {
            title: this.translate.instant('sidebar.dashboard'),
            url: '/dashboard',
            icon: 'assets/img/web_logo.png'
          },
          {
            title: this.translate.instant('sidebar.marketAnalysis'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.projectAnalysis'),
                url: '/dashboard/market-analysis/project-analysis',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.locationAnalysis'),
                url: '/dashboard/market-analysis/location-analysis',
                icon: 'assets/img/web_logo.png',
              }
            ]
          },
          {
            title: this.translate.instant('sidebar.reports'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.seller'),
                url: '/dashboard/reports/seller',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.buyer'),
                url: '/dashboard/reports/buyer',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.notary'),
                url: '/dashboard/reports/notary',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.bank'),
                url: '/dashboard/reports/bank',
                icon: 'assets/img/web_logo.png',
              }]
          },
        ]
      },
      //Entities
      {
        title: this.translate.instant('sidebar.entities'),
        url: '',
        icon: 'assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.manageAgencies'),
            url: '/dashboard/agencies/view-all',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageNotaries'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.notary'),
                url: '/dashboard/notary/view-notary',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.leads'),
                url: '/dashboard/notary/notary-leads',
                icon: 'assets/img/web_logo.png',
              }
            ]
          },
          {
            title: this.translate.instant('sidebar.manageBanks'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.banks'),
                url: '/dashboard/banks/view-banks',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.leads'),
                url: '/dashboard/banks/bank-leads',
                icon: 'assets/img/web_logo.png',
              }
            ]
          },
          {
            title: this.translate.instant('sidebar.manageDevelopers'),
            url: '/dashboard/developers/view-all',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageAgents'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.inhouseAgent'),
                url: '/dashboard/view-inhouse-users/inhouse-broker',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.outsideAgent'),
                url: '/dashboard/view-inhouse-users/outside-broker',
                icon: 'assets/img/web_logo.png',
              }]
          },
          {
            title: this.translate.instant('sidebar.manageCompanies'),
            url: '/dashboard/companies/view-all',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageManagers'),
            url: '/dashboard/managers/view-all',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageLegalEntity'),
            url: '/dashboard/legal-entities/view-all',
            icon: 'assets/img/web_logo.png',
          },
        ]
      },
      //Users
      {
        title: this.translate.instant('sidebar.users'),
        url: '',
        icon: 'assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.manageUsers'),
            url: '/dashboard/users/view-users',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageInhouseUsers'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.dataCollector'),
                url: '/dashboard/view-inhouse-users/data-collectors',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRSeller'),
                url: '/dashboard/view-inhouse-users/csr-sellers',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRBuyer'),
                url: '/dashboard/view-inhouse-users/csr-buyers',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRClosure'),
                url: '/dashboard/view-inhouse-users/csr-closers',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.creditAgent'),
                url: '/dashboard/view-inhouse-users/credit-agents',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRRenter'),
                url: '/dashboard/view-inhouse-users/csr-renters',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.collectionAgent'),
                url: '/dashboard/view-inhouse-users/collection-agents',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.allianceAgent'),
                url: '/dashboard/view-inhouse-users/alliance-agents',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.cordinatorAgent'),
                url: '/dashboard/view-inhouse-users/cordinator-agents',
                icon: 'assets/img/web_logo.png',
              },
            ]
          },

          {
            title: this.translate.instant('sidebar.ACL'),
            url: '/dashboard/access-control-mgt',
            icon: 'assets/img/web_logo.png',
          }
        ]
      },
      //credits
      {
        title: this.translate.instant('sidebar.manageCredits'),
        url: '/dashboard/credit/view-credit',
        icon: 'assets/img/web_logo.png',
      },
      //Property
      {
        title: this.translate.instant('sidebar.properties'),
        url: '',
        icon: 'assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.manageProjects'),
            url: '/dashboard/projects/view-projects',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageProperties '),
            url: '/dashboard/properties/view-properties',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.managePropertiesForSale'),
            url: '/dashboard/properties-for-sale/view-properties-for-sale',
            icon: 'assets/img/web_logo.png',
          }
        ]
      },
      //leads
      {
        title: this.translate.instant('sidebar.leads'),
        url: '',
        icon: 'assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.manageLeads'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.dataCollector'),
                url: '/dashboard/leads/data-collectors',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRSeller'),
                url: '/dashboard/view-inhouse-users/csr-sellers',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRBuyer'),
                url: '/dashboard/view-inhouse-users/csr-buyers',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.inhouseAgentBuyer'),
                url: '/dashboard/leads/inhouse-broker/buyer',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.inhouseAgentSeller'),
                url: '/dashboard/leads/inhouse-broker/seller',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRClosure'),
                url: '/dashboard/view-inhouse-users/csr-closers',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.outsideAgent'),
                url: '/dashboard/leads/outside-broker',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRClosure'),
                url: '/dashboard/leads/csr-closers',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.CSRRenter'),
                url: '/dashboard/leads/csr-renters',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.creditAgent'),
                url: '/dashboard/leads/credit-agents',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.collectionAgent'),
                url: '/dashboard/leads/collection-agents',
                icon: 'assets/img/web_logo.png',
              }
            ]
          },

          {
            title: this.translate.instant('sidebar.manualLeads'),
            url: '/dashboard/manual-leads/view-all',
            icon: 'assets/img/web_logo.png',
          }
        ]
      },
      //products
      {
        title: this.translate.instant('sidebar.manageProduct'),
        url: '',
        icon: 'assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.manageProduct'),
            url: '/dashboard/product/view-product',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.managesuppliers'),
            url: '/dashboard/suppliers/view-all',
            icon: 'assets/img/web_logo.png',
          }
        ]
      },
      //office/hotels
      {
        title: this.translate.instant('sidebar.offices'),
        url: '',
        icon: 'assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.manageOffice'),
            url: '/dashboard/office/view-office',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageHotels'),
            url: '/dashboard/hotels/view-hotels',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.hotelCompany'),
            url: '/dashboard/hotel-companies/view-all',
            icon: 'assets/img/web_logo.png'
          },
        ]
      },
      //contract
      {
        title: this.translate.instant('sidebar.manageContacts'),
        url: '/dashboard/manage-contracts/view-all',
        icon: 'assets/img/web_logo.png',
      },
      //collection
      {
        title: this.translate.instant('sidebar.collections'),
        url: '',
        icon: 'assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.manageCollections'),
            url: '/dashboard/collections/view-collections',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.manageCommissions'),
            url: '/dashboard/commissions/view-commissions',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.collectionReports'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.generalReport'),
                url: '/dashboard/collection-report/general-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.monthlyReport'),
                url: '/dashboard/collection-report/monthly-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.modelReport'),
                url: '/dashboard/collection-report/model-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.conceptReport'),
                url: '/dashboard/collection-report/concept-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.arrearReport'),
                url: '/dashboard/collection-report/arrear-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.salesReport'),
                url: '/dashboard/collection-report/sales-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.salesTrend'),
                url: '/dashboard/collection-report/sales-booking',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.commissionIncome'),
                url: '/dashboard/collection-report/commission-income',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.cashFlowReport'),
                url: '/dashboard/collection-report/cash-flow-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.projectReport'),
                url: '/dashboard/collection-report/project-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.buyerReport'),
                url: '/dashboard/collection-report/buyer-report',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.deliveryReport'),
                url: '/dashboard/collection-report/delivery-report',
                icon: 'assets/img/web_logo.png',
              },
            ]
          }
        ]
      },
      //settings
      {
        title: this.translate.instant('sidebar.settings'),
        url: '',
        icon: '/assets/img/web_logo.png',
        children: [
          {
            title: this.translate.instant('sidebar.templates'),
            url: '/dashboard/templates/view-all',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.appointments'),
            url: '/dashboard/appointments',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.notifications'),
            url: 'notifications',
            icon: 'assets/img/web_logo.png',
          },
          {
            title: this.translate.instant('sidebar.settings'),
            url: '',
            icon: 'assets/img/web_logo.png',
            children: [
              {
                title: this.translate.instant('sidebar.location'),
                url: '/dashboard/settings/setting-location',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.locality'),
                url: '/dashboard/settings/setting-locality',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.property'),
                url: '/dashboard/settings/setting-property',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.project'),
                url: '/dashboard/settings/setting-project',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.office'),
                url: '/dashboard/settings/setting-office',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.hotel'),
                url: '/dashboard/settings/setting-hotel',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.room'),
                url: '/dashboard/settings/setting-room',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.defaultSettings'),
                url: '/dashboard/settings/default-settings',
                icon: 'assets/img/web_logo.png',
              },
              {
                title: this.translate.instant('sidebar.documentListing'),
                url: '/dashboard/settings/documents-listing',
                icon: 'assets/img/web_logo.png',
              }
              // {
              //   title: this.translate.instant('sidebar.logout'),
              //   url: '/dashboard/collection-report/project-report'
              // },
            ]
          }
        ]
      },
    ]
    this.treeControl = new NestedTreeControl<MyTreeNode>(this.makeGetChildrenFunction())
    this.treeDataSource = new MatTreeNestedDataSource()
    this.treeDataSource.data = demoNodes

    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
      this.image = success['image'];
      this.messagingService.requestPermission(success['id']);
      this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
      // if (this.messagingService.fcmTokens) {
      //   this.updateDeviceToken();
      // }
    });

    // this.msg.currentMessage$.subscribe(r => {
    //   if ( r != null && r.data.notification_type !== 100) {
    //     /* count if not a push of chat messages */
    //     this.msg_count++;
    //   }
    // });
    this.getNotifications();
    this.getNotificationsCount();
  }
  hasChildren = (_: number, node: MyTreeNode) => {
    return node.children && node.children.length > 0
  }

  private makeGetChildrenFunction() {
    return node => of(node.children)
  }

  ngOnInit() {
    this.commonService.notificationUnreadCount$.subscribe(r => {
      if (r) {
        this.notificationCount = r;
      }
    })

  }

  updateDeviceToken() {
    this.admin.postDataApi('updateDeviceToken', { device_id: this.admin.deviceId, device_token: this.messagingService.fcmTokens })
      .subscribe(
        success1 => {
          // console.log('suc', success1);
        });
  }

  setData() {
    this.admin.postDataApi('get-details', {})
      .subscribe(
        success1 => {
          localStorage.setItem('all', JSON.stringify(success1));
          localStorage.setItem('user-id', JSON.stringify(((success1 || {}).data || {}).id));
          this.fullName = success1.data.name;
          this.image = success1.data.image;
          const dd = success1.data.m.map((obj, index) => {
            const key = Object.keys(obj)[0];
            this.admin.admin_acl[key] = obj[key];
          });
        });
  }

  onLoggedout() {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToLogout'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: this.translate.instant('message.error.logoutBtn')
    }).then((result) => {
      if (result.value) {
        this.logout();
      }
    });
  }


  logout() {
    this.spinner.show();
    this.admin.postDataApi('logout', {}).subscribe(r => {
      this.spinner.hide();
      if (r) {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.logoutSuccessfully'), 'success');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('permissions');
        localStorage.removeItem('admin_acl');
        this.admin.admin_acl = {};
        this.admin.admin_acl_array = [];
        this.admin.permissions = {};
        this.router.navigate(['']);
      }
    }, error => {
      this.spinner.hide();
    });
  }


  getNotifications() {
    this.admin.postDataApi('getNotifications', {}).subscribe(r => {
      this.parameter.items = r.data;
      // this.msg_count = r.total_count;
    });
  }

  viewNotification() {
    this.msg_count = 0;
    this.router.navigate(['/dashboard/notifications']);
  }

  getNotificationsCount() {
    this.admin.postDataApi('getNotificationsCount', {}).subscribe(r => {
      this.notificationCount = r.data.count;
      localStorage.setItem('notificationCount', r.data.count);
      // this.msg_count = r.total_count;
    });
  }
}
