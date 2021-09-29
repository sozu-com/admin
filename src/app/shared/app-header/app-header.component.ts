import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../common/constants';
import { IProperty } from '../../common/property';
import { MessagingService } from 'src/app/fire-base/messaging.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { NestedTreeControl } from '@angular/cdk/tree'
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { of } from 'rxjs'

interface MyTreeNode {
  title: string, title_es: string, url: any, icon: any,
  children?: MyTreeNode[]
}

declare let swal: any;
const demoNodes: MyTreeNode[] = [
  {
    title: 'Dashboards',
    title_es: 'Cuadros de mando',
    url: '',
    icon: 'assets/img/chart.png',
    children: [
      {
        title: 'Dashboard',
        title_es: 'Tablero',
        url: '/dashboard',
        icon: 'assets/img/Ellipse.png'
      },
      {
        title: 'Metatags',
        title_es: 'Metaetiquetas',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Home',
            title_es: 'Inicio',
            url: '/dashboard/metatags/metatag-home',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'For sale',
            title_es: 'En venta',
            url: '/dashboard/metatags/metatag-sale',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Rent',
            title_es: 'Alquilar',
            url: 'metatags/metatag-rent',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Sell',
            title_es: 'Vender',
            url: 'metatags/metatag-sell',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Mortage Loans',
            title_es: 'Préstamo hipotecario',
            url: 'metatags/metatag-mortage-loans',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'New Projects',
            title_es: 'Proyectos nuevos',
            url: 'metatags/metatag-new-project',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Developers',
            title_es: 'Desarrolladoras',
            url: 'metatags/metatag-devloper',
            icon: 'assets/img/Rectangle.png'
          }
        ]
      },
      {
        title: 'Market Analysis',
        title_es: 'Análisis De Mercado',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Project Analysis',
            title_es: 'Análisis De Proyecto',
            url: '/dashboard/market-analysis/project-analysis',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Location Analysis',
            title_es: 'Análisis De Ubicación',
            url: '/dashboard/market-analysis/location-analysis',
            icon: 'assets/img/Rectangle.png',
          }
        ]
      },
      {
        title: 'Reports',
        title_es: 'Reportes',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Seller',
            title_es: 'Vendedor',
            url: '/dashboard/reports/seller',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Buyer',
            title_es: 'Comprador',
            url: '/dashboard/reports/buyer',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Notary',
            title_es: 'Notario',
            url: '/dashboard/reports/notary',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Bank',
            title_es: 'Banco',
            url: '/dashboard/reports/bank',
            icon: 'assets/img/Rectangle.png',
          }]
      },
    ]
  },
  //Entities
  {
    title: 'Entities',
    title_es: 'Entidades',
    url: '',
    icon: 'assets/img/entry.png',
    children: [
      {
        title: 'Manage Agencies',
        title_es: 'Administrar agencias',
        url: '/dashboard/agencies/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Developers',
        title_es: 'Desarrolladores',
        url: '/dashboard/developers/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Companies',
        title_es: 'Administrar compañías',
        url: '/dashboard/companies/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Managers',
        title_es: 'Administrar gerentes',
        url: '/dashboard/managers/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Legal Entity',
        title_es: 'Gestionar entidad jurídica',
        url: '/dashboard/legal-entities/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Notaries',
        title_es: 'Administrar notarios',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Notary',
            title_es: 'Notario',
            url: '/dashboard/notary/view-notary',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Leads',
            title_es: 'Leads',
            url: '/dashboard/notary/notary-leads',
            icon: 'assets/img/Rectangle.png',
          }
        ]
      },
      {
        title: 'Manage Banks',
        title_es: 'Administrar bancos',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Banks',
            title_es: 'Bancos',
            url: '/dashboard/banks/view-banks',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Leads',
            title_es: 'Leads',
            url: '/dashboard/banks/bank-leads',
            icon: 'assets/img/Rectangle.png',
          }
        ]
      },
      {
        title: 'Manage Agents',
        title_es: 'Administrar agentes',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Inhouse Agent',
            title_es: 'Agentes internos',
            url: '/dashboard/view-inhouse-users/inhouse-broker',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Outside Agent',
            title_es: 'Agentes externos',
            url: '/dashboard/view-inhouse-users/outside-broker',
            icon: 'assets/img/Rectangle.png',
          }]
      }
    ]
  },
  //Users
  {
    title: 'Users',
    title_es: 'Usuarias',
    url: '',
    icon: 'assets/img/user_edit.png',
    children: [
      {
        title: 'Manage Users',
        title_es: 'Administrar Usuarios',
        url: '/dashboard/users/view-users',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'ACL',
        title_es: 'ACL',
        url: '/dashboard/access-control-mgt',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Inhouse Users',
        title_es: 'Administrar usuarios internos',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Data Collector',
            title_es: 'Data Collector',
            url: '/dashboard/view-inhouse-users/data-collectors',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Seller',
            title_es: 'Vendedor CSR',
            url: '/dashboard/view-inhouse-users/csr-sellers',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Buyer',
            title_es: 'Comprador CSR',
            url: '/dashboard/view-inhouse-users/csr-buyers',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Closure',
            title_es: 'Cerrador CSR',
            url: '/dashboard/view-inhouse-users/csr-closers',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Credit Agent',
            title_es: 'Agente de crédito',
            url: '/dashboard/view-inhouse-users/credit-agents',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Renter',
            title_es: 'CSR Renter',
            url: '/dashboard/view-inhouse-users/csr-renters',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Collection Agent',
            title_es: 'Agente de cobranza',
            url: '/dashboard/view-inhouse-users/collection-agents',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Alliance Agent',
            title_es: 'Agente Alianza',
            url: '/dashboard/view-inhouse-users/alliance-agents',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Cordinator Agent',
            title_es: 'Agente coordinador',
            url: '/dashboard/view-inhouse-users/cordinator-agents',
            icon: 'assets/img/Rectangle.png',
          },
        ]
      }
    ]
  },
  //credits
  {
    title: 'Manage Credits',
    title_es: 'Gestionar créditos',
    url: '',
    icon: 'assets/img/vuesax_twotone_card.png',
    children: [
      {
        title: 'Credits',
        title_es: 'créditos',
        url: '/dashboard/credit/view-credit',
        icon: 'assets/img/Ellipse.png',
      }
    ]
  },
  //Property
  {
    title: 'Properties',
    title_es: 'Propiedades',
    url: '',
    icon: 'assets/img/vuesax_twotone_buliding.png',
    children: [
      {
        title: 'Manage Projects',
        title_es: 'Administrar proyectos',
        url: '/dashboard/projects/view-projects',
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Manage Properties',
        title_es: 'Administrar Propiedades',
        url: '/dashboard/properties/view-properties',
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Properties For Sale',
        title_es: 'Propiedades en venta',
        url: '/dashboard/properties-for-sale/view-properties-for-sale',
        icon: 'assets/img/Rectangle.png',
      }
    ]
  },
  //leads
  {
    title: 'Leads',
    title_es: 'Leads',
    url: '',
    icon: 'assets/img/vuesax_twotone_people.png',
    children: [
      {
        title: 'Manual Leads',
        title_es: 'Leads manuales',
        url: '/dashboard/manual-leads/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Leads',
        title_es: 'Administrar leads',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Data Collector',
            title_es: 'Data Collector',
            url: '/dashboard/leads/data-collectors',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Seller',
            title_es: 'Vendedor CSR',
            url: '/dashboard/leads/csr-sellers',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Buyer',
            title_es: 'Comprador CSR',
            url: '/dashboard/leads/csr-buyers',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Inhouse Agent Buyer',
            title_es: 'Comprador agentes internos',
            url: '/dashboard/leads/inhouse-broker/buyer',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Inhouse Agent Seller',
            title_es: 'Vendedor agentes internos',
            url: '/dashboard/leads/inhouse-broker/seller',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Outside Agent',
            title_es: 'Agentes externos',
            url: '/dashboard/leads/outside-broker',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Closure',
            title_es: 'Cerrador CSR',
            url: '/dashboard/leads/csr-closers',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: '"CSR Renter',
            title_es: 'CSR Renter',
            url: '/dashboard/leads/csr-renters',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Credit Agent',
            title_es: 'Agente de crédito',
            url: '/dashboard/leads/credit-agents',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Collection Agent',
            title_es: 'Agente de cobranza',
            url: '/dashboard/leads/collection-agents',
            icon: 'assets/img/Rectangle.png',
          }
        ]
      }
    ]
  },
  //products
  {
    title: 'Products',
    title_es: 'Producto',
    url: '',
    icon: 'assets/img/vuesax_twotone_shopping-cart.png',
    children: [
      {
        title: 'Products',
        title_es: 'Producto',
        url: '/dashboard/product/view-product',
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Suppliers',
        title_es: 'Proveedores',
        url: '/dashboard/suppliers/view-all',
        icon: 'assets/img/Rectangle.png',
      }
    ]
  },
  //office/hotels
  {
    title: 'Offices/Hotels',
    title_es: 'Oficinas/Hoteles',
    url: '',
    icon: 'assets/img/vuesax_twotone_buildings-2.png',
    children: [
      {
        title: 'Manage Offices',
        title_es: 'Gestionar Oficina',
        url: '/dashboard/office/view-office',
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Manage Hotels',
        title_es: 'Gestionar Hoteles',
        url: '/dashboard/hotels/view-hotels',
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Hotel company',
        title_es: 'Empresa hotelera',
        url: '/dashboard/hotel-companies/view-all',
        icon: 'assets/img/Rectangle.png'
      },
    ]
  },
  //contract
  {
    title: 'Contracts',
    title_es: 'Contratos',
    url: '',
    icon: 'assets/img/vuesax_twotone_document-text.png',
    children: [
      {
        title: 'Contracts',
        title_es: 'Contratos',
        url: '/dashboard/manage-contracts/view-all',
        icon: 'assets/img/Ellipse.png',
      }
    ]
  },
  //collection
  {
    title: 'Collections',
    title_es: 'Colecciones',
    url: '',
    icon: 'assets/img/vuesax_twotone_money-recive.png',
    children: [
      {
        title: 'Manage Collections',
        title_es: 'Administrar colecciones',
        url: '/dashboard/collections/view-collections',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Commissions',
        title_es: 'Administrar Comisiones',
        url: '/dashboard/commissions/view-commissions',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Collection Reports',
        title_es: 'Informes de colección',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'General Report',
            title_es: 'Informe general',
            url: '/dashboard/collection-report/general-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Monthly Report',
            title_es: 'Reporte mensual',
            url: '/dashboard/collection-report/monthly-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Model Report',
            title_es: 'Informe modelo',
            url: '/dashboard/collection-report/model-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Concept Report',
            title_es: 'Informe conceptual',
            url: '/dashboard/collection-report/concept-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Arrear Report',
            title_es: 'Informe de atrasos',
            url: '/dashboard/collection-report/arrear-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Sales Report',
            title_es: 'Reporte de ventas',
            url: '/dashboard/collection-report/sales-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Sales Trend',
            title_es: 'Tendencia de ventas',
            url: '/dashboard/collection-report/sales-booking',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Commission Report',
            title_es: 'Informe de la Comisión',
            url: '/dashboard/collection-report/commission-income',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Revenue Report',
            title_es: 'Informe de ingresos',
            url: '/dashboard/collection-report/cash-flow-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Project Report',
            title_es: 'Reporte de Proyecto',
            url: '/dashboard/collection-report/project-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Buyer Report',
            title_es: 'Informe del comprador',
            url: '/dashboard/collection-report/buyer-report',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Delivery Report',
            title_es: 'Informe de entrega',
            url: '/dashboard/collection-report/delivery-report',
            icon: 'assets/img/Rectangle.png',
          },
        ]
      },
      {
        title: 'Cashflow',
        title_es: 'Flujo de efectivo',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Income',
            title_es: 'Ingresos',
            url: '/dashboard/cash/income',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Expenditures',
            title_es: 'Egresos',
            url: '/dashboard/cash/expenditures',
            icon: 'assets/img/Rectangle.png',
          }
        ]
      },
    ]
  },
  //settings
  {
    title: 'Settings',
    title_es: 'Ajustes',
    url: '',
    icon: '/assets/img/vuesax_twotone_setting-2.png',
    children: [
      {
        title: 'Settings',
        title_es: 'Ajustes',
        url: '',
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Location',
            title_es: 'Ubicación',
            url: '/dashboard/settings/setting-location',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Locality',
            title_es: 'Localidad',
            url: '/dashboard/settings/setting-locality',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Property',
            title_es: 'Departamento',
            url: '/dashboard/settings/setting-property',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Project',
            title_es: 'Proyecto',
            url: '/dashboard/settings/setting-project',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Office',
            title_es: 'Oficina ',
            url: '/dashboard/settings/setting-office',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Hotel',
            title_es: 'Hotel',
            url: '/dashboard/settings/setting-hotel',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Room',
            title_es: 'Habitación',
            url: '/dashboard/settings/setting-room',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Default Settings',
            title_es: 'Configuración por defecto',
            url: '/dashboard/settings/default-settings',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Document Listing',
            title_es: 'Listado de documentos',
            url: '/dashboard/settings/documents-listing',
            icon: 'assets/img/Rectangle.png',
          }
          // {
          //   title: this.translate.instant('sidebar.logout'),
          //   url: '/dashboard/collection-report/project-report'
          // },
        ]
      },
      {
        title: 'Templates',
        title_es: 'Plantillas',
        url: '/dashboard/templates/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Appointments',
        title_es: 'Citas',
        url: '/dashboard/appointments',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Notifications',
        title_es: 'Notificaciones',
        url: 'notifications',
        icon: 'assets/img/Ellipse.png',
      }

    ]
  }
]
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  treeControl: NestedTreeControl<MyTreeNode>
  treeDataSource: MatTreeNestedDataSource<MyTreeNode>
  // Fixed node height
  options = {
    useVirtualScroll: true,
    nodeHeight: 22
  }
  activeState: any;
  activeIcon: any;
  message: any;
  public parameter: IProperty = {};
  fullName: string;
  image: string;
  admin_acl: any;
  msg_count = 0;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
  notificationCount: any;
  public language_code: string;
  constructor(public admin: AdminService,
    private route: ActivatedRoute, private router: Router,
    public constant: Constant,
    private messagingService: MessagingService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private commonService: CommonService
  ) {
    this.language_code = localStorage.getItem('language_code');
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
  setStateAsActive(item) {
    this.activeState = this.language_code == 'en' ? item.title : item.title_es;
    this.activeIcon = item.icon;
    console.log(this.activeIcon, "item");
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
