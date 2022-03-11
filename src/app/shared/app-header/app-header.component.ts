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
  title: string, title_es: string, url: any, icon: any, acl: any,
  children?: MyTreeNode[]
}

declare let swal: any;
const demoNodes: MyTreeNode[] = [
  {
    title: 'Sozu',
    title_es: 'Sozu',
    url: '',
    acl: "admin?.admin_acl['Dashboard']?.can_read==1",
    icon: 'assets/img/ic_commission.png',
    children: [
      {
        title: 'Income',
        title_es: 'Ingresos',
        url: '/dashboard/income/sozu-income',
        acl: "admin?.admin_acl['Dashboard']?.can_read==1",
        icon: 'assets/img/Ellipse.png'
      }
    ]
  },
  {
    title: 'Dashboards',
    title_es: 'Cuadros de mando',
    url: '',
    acl: "admin?.admin_acl['Dashboard']?.can_read==1",
    icon: 'assets/img/chart.png',
    children: [
      {
        title: 'Dashboard',
        title_es: 'Tablero',
        url: '/dashboard',
        acl: "admin?.admin_acl['Dashboard']?.can_read==1",
        icon: 'assets/img/Ellipse.png'
      },
      {
        title: 'Metatags',
        title_es: 'Metaetiquetas',
        url: '',
        acl: "admin?.admin_acl['Metatags']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Home',
            title_es: 'Inicio',
            url: '/dashboard/metatags/metatag-home',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'For sale',
            title_es: 'En venta',
            url: '/dashboard/metatags/metatag-sale',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Rent',
            title_es: 'Alquilar',
            url: 'metatags/metatag-rent',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Sell',
            title_es: 'Vender',
            url: 'metatags/metatag-sell',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Mortage Loans',
            title_es: 'Préstamo hipotecario',
            url: 'metatags/metatag-mortage-loans',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'New Projects',
            title_es: 'Proyectos nuevos',
            url: 'metatags/metatag-new-project',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Developers',
            title_es: 'Desarrolladoras',
            acl: '',
            url: 'metatags/metatag-devloper',
            icon: 'assets/img/Rectangle.png'
          }
        ]
      },
      {
        title: 'Market Analysis',
        title_es: 'Análisis De Mercado',
        url: '',
        acl: "admin?.admin_acl['Market Analysis']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Project Analysis',
            title_es: 'Análisis De Proyecto',
            url: '/dashboard/market-analysis/project-analysis',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Location Analysis',
            title_es: 'Análisis De Ubicación',
            acl: '',
            url: '/dashboard/market-analysis/location-analysis',
            icon: 'assets/img/Rectangle.png',
          }
        ]
      },
      {
        title: 'Reports',
        title_es: 'Reportes',
        url: '',
        acl: "admin?.admin_acl['Reports']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Seller',
            title_es: 'Vendedor',
            url: '/dashboard/reports/seller',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Buyer',
            title_es: 'Comprador',
            url: '/dashboard/reports/buyer',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Notary',
            title_es: 'Notario',
            url: '/dashboard/reports/notary',
            acl: '',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Bank',
            title_es: 'Banco',
            url: '/dashboard/reports/bank',
            acl: '',
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
    acl: '',
    children: [
      {
        title: 'Manage Agencies',
        title_es: 'Administrar agencias',
        acl: "admin?.admin_acl['Agencies Management']?.can_read==1",
        url: '/dashboard/agencies/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Developers',
        title_es: 'Desarrolladores',
        acl: "admin?.admin_acl['Developers Management']?.can_read==1",
        url: '/dashboard/developers/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Companies',
        title_es: 'Administrar compañías',
        acl: "admin?.admin_acl['Companies Management']?.can_read==1",
        url: '/dashboard/companies/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Managers',
        title_es: 'Administrar gerentes',
        acl: "admin?.admin_acl['Managers Management']?.can_read==1",
        url: '/dashboard/managers/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Legal Entity',
        title_es: 'Gestionar entidad jurídica',
        acl: "admin?.admin_acl['Manage Legal Entity']?.can_read==1",
        url: '/dashboard/legal-entities/view-all',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Notaries',
        title_es: 'Administrar notarios',
        url: '',
        acl: "admin?.admin_acl['Notaries Management']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Notary',
            title_es: 'Notario',
            acl: "admin?.admin_acl['Notaries Management']?.can_read==1",
            url: '/dashboard/notary/view-notary',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Leads',
            acl: "admin?.admin_acl['Notary Lead Management']?.can_read==1 || admin?.permissions?.can_noatary==1",
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
        acl: "admin?.admin_acl['Bank Management']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Banks',
            title_es: 'Bancos',
            url: '/dashboard/banks/view-banks',
            acl: "admin?.admin_acl['Bank Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Leads',
            title_es: 'Leads',
            url: '/dashboard/banks/bank-leads',
            acl: "admin?.admin_acl['Bank Lead Management']?.can_read==1 || admin?.permissions?.can_bank==1",
            icon: 'assets/img/Rectangle.png',
          }
        ]
      },
      {
        title: 'Manage Agents',
        title_es: 'Administrar agentes',
        url: '',
        acl: "admin?.admin_acl['Inhouse Agent Management']?.can_read==1 && admin?.admin_acl['Outside Agent Management']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Inhouse Agent',
            title_es: 'Agentes internos',
            url: '/dashboard/view-inhouse-users/inhouse-broker',
            acl: "admin?.admin_acl['Inhouse Agent Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Outside Agent',
            title_es: 'Agentes externos',
            url: '/dashboard/view-inhouse-users/outside-broker',
            acl: "admin?.admin_acl['Outside Agent Management']?.can_read==1",
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
    acl: "admin?.admin_acl['User Management']?.can_read==1",
    icon: 'assets/img/user_edit.png',
    children: [
      {
        title: 'Manage Users',
        title_es: 'Administrar Usuarios',
        url: '/dashboard/users/view-users',
        acl: "admin?.admin_acl['User Management']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'ACL',
        title_es: 'ACL',
        url: '/dashboard/access-control-mgt',
        acl: "admin?.admin_acl['Access Controls']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Inhouse Users',
        title_es: 'Administrar usuarios internos',
        url: '',
        acl: "admin?.admin_acl['Data Collector Management']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Data Collector',
            title_es: 'Data Collector',
            acl: "admin?.admin_acl['Data Collector Management']?.can_read==1",
            url: '/dashboard/view-inhouse-users/data-collectors',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Seller',
            title_es: 'Vendedor CSR',
            acl: "admin?.admin_acl['Seller Management']?.can_read==1",
            url: '/dashboard/view-inhouse-users/csr-sellers',
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Buyer',
            title_es: 'Comprador CSR',
            url: '/dashboard/view-inhouse-users/csr-buyers',
            acl: "admin?.admin_acl['Buyer Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Closure',
            title_es: 'Cerrador CSR',
            url: '/dashboard/view-inhouse-users/csr-closers',
            acl: "admin?.admin_acl['Closer Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Credit Agent',
            title_es: 'Agente de crédito',
            url: '/dashboard/view-inhouse-users/credit-agents',
            acl: "admin?.admin_acl['Credit Agent Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Renter',
            title_es: 'CSR Renter',
            url: '/dashboard/view-inhouse-users/csr-renters',
            acl: "admin?.admin_acl['Renter Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Collection Agent',
            title_es: 'Agente de cobranza',
            url: '/dashboard/view-inhouse-users/collection-agents',
            acl: "admin?.admin_acl['Collection Agent Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Alliance Agent',
            title_es: 'Agente Alianza',
            url: '/dashboard/view-inhouse-users/alliance-agents',
            acl: "admin?.admin_acl['Alliance Agent Management']?.can_read == 1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Cordinator Agent',
            title_es: 'Agente coordinador',
            url: '/dashboard/view-inhouse-users/cordinator-agents',
            acl: "admin?.admin_acl['Alliance Agent Management']?.can_read == 1",
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
    acl: "admin?.admin_acl['Manage Credits']?.can_read == 1",
    icon: 'assets/img/vuesax_twotone_card.png',
    children: [
      {
        title: 'Credits',
        title_es: 'créditos',
        url: '/dashboard/credit/view-credit',
        acl: "admin?.admin_acl['Manage Credits']?.can_read == 1",
        icon: 'assets/img/Ellipse.png',
      }
    ]
  },
  //Property
  {
    title: 'Properties',
    title_es: 'Propiedades',
    url: '',
    acl: "admin?.admin_acl['Property Management']?.can_read==1",
    icon: 'assets/img/vuesax_twotone_buliding.png',
    children: [
      {
        title: 'Manage Projects',
        title_es: 'Administrar proyectos',
        url: '/dashboard/projects/view-projects',
        acl: "admin?.admin_acl['Project Management']?.can_read==1",
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Manage Properties',
        title_es: 'Administrar Propiedades',
        url: '/dashboard/properties/view-properties',
        acl: "admin?.admin_acl['Property Management']?.can_read==1",
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Properties For Sale',
        title_es: 'Propiedades en venta',
        url: '/dashboard/properties-for-sale/view-properties-for-sale',
        acl: "admin?.admin_acl['Properties For Sale Management']?.can_read == 1",
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
    acl: "admin?.admin_acl['Data Collector Lead Management']?.can_read==1",
    children: [
      {
        title: 'Manual Leads',
        title_es: 'Leads manuales',
        url: '/dashboard/manual-leads/view-all',
        acl: "admin?.admin_acl['Manual Leads']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Leads',
        title_es: 'Administrar leads',
        url: '',
        acl: "admin?.admin_acl['Data Collector Lead Management']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Data Collector',
            title_es: 'Data Collector',
            url: '/dashboard/leads/data-collectors',
            acl: "admin?.admin_acl['Data Collector Lead Management']?.can_read==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Seller',
            title_es: 'Vendedor CSR',
            url: '/dashboard/leads/csr-sellers',
            acl: "admin?.admin_acl['Seller Lead Management']?.can_read==1 || admin?.permissions?.can_csr_seller==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'CSR Buyer',
            title_es: 'Comprador CSR',
            url: '/dashboard/leads/csr-buyers',
            acl: "admin?.admin_acl['Buyer Lead Management']?.can_read==1 || admin?.permissions?.can_csr_buyer==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Inhouse Agent Buyer',
            title_es: 'Comprador agentes internos',
            url: '/dashboard/leads/inhouse-broker/buyer',
            acl: "admin?.admin_acl['Inhouse Agent Lead Management']?.can_read==1 || admin?.permissions?.can_in_house_broker==1",
            icon: 'assets/img/Rectangle.png',
          },
          {
            title: 'Inhouse Agent Seller',
            title_es: 'Vendedor agentes internos',
            url: '/dashboard/leads/inhouse-broker/seller',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Inhouse Agent Lead Management']?.can_read==1 || admin?.permissions?.can_in_house_broker==1",
          },
          {
            title: 'Outside Agent',
            title_es: 'Agentes externos',
            url: '/dashboard/leads/outside-broker',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Outside Agent Lead Management']?.can_read==1 || admin?.permissions?.can_outside_broker==1",
          },
          {
            title: 'CSR Closure',
            title_es: 'Cerrador CSR',
            url: '/dashboard/leads/csr-closers',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Closer Lead Management']?.can_read==1 || admin?.permissions?.can_csr_closer==1",
          },
          {
            title: 'CSR Renter',
            title_es: 'CSR Renter',
            url: '/dashboard/leads/csr-renters',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Renter Lead Management']?.can_read==1 || admin?.permissions?.can_csr_renter==1",
          },
          {
            title: 'Credit Agent',
            title_es: 'Agente de crédito',
            url: '/dashboard/leads/credit-agents',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Credit Agent Lead Management']?.can_read==1 || admin?.permissions?.can_credit_agent==1",
          },
          {
            title: 'Collection Agent',
            title_es: 'Agente de cobranza',
            url: '/dashboard/leads/collection-agents',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Collection Agent Lead Management']?.can_read==1 || admin?.permissions?.can_collection_agent==1",
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
    acl: "admin?.admin_acl['Manage Product']?.can_read==1",
    children: [
      {
        title: 'Products',
        title_es: 'Producto',
        url: '/dashboard/product/view-product',
        acl: "admin?.admin_acl['Manage Product']?.can_read==1",
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Suppliers',
        title_es: 'Proveedores',
        url: '/dashboard/suppliers/view-all',
        acl: "admin?.admin_acl['Manage Suppliers']?.can_read==1",
        icon: 'assets/img/Rectangle.png',
      }
    ]
  },
  //office/hotels
  {
    title: 'Offices/Hotels',
    title_es: 'Oficinas/Hoteles',
    url: '',
    acl: "admin?.admin_acl['Manage Offices']?.can_read==1",
    icon: 'assets/img/vuesax_twotone_buildings-2.png',
    children: [
      {
        title: 'Manage Offices',
        title_es: 'Gestionar Oficina',
        url: '/dashboard/office/view-office',
        acl: "admin?.admin_acl['Manage Offices']?.can_read==1",
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Manage Hotels',
        title_es: 'Gestionar Hoteles',
        url: '/dashboard/hotels/view-hotels',
        acl: "admin?.admin_acl['Hotel Management']?.can_read==1",
        icon: 'assets/img/Rectangle.png',
      },
      {
        title: 'Hotel company',
        title_es: 'Empresa hotelera',
        url: '/dashboard/hotel-companies/view-all',
        acl: "admin?.admin_acl['Hotel Companies Management']?.can_read==1",
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
    acl: "admin?.admin_acl['Manage Contracts']?.can_read==1",
    children: [
      {
        title: 'Contracts',
        title_es: 'Contratos',
        url: '/dashboard/manage-contracts/view-all',
        acl: '',
        icon: 'assets/img/Ellipse.png',
      }
    ]
  },
  //collection
  {
    title: 'Collections',
    title_es: 'Colecciones',
    url: '',
    acl: "admin?.admin_acl['Manage Collections']?.can_read==1",
    icon: 'assets/img/vuesax_twotone_money-recive.png',
    children: [
      {
        title: 'Manage Collections',
        acl: "admin?.admin_acl['Manage Collections']?.can_read==1",
        title_es: 'Administrar colecciones',
        url: '/dashboard/collections/view-collections',
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Manage Commissions',
        title_es: 'Administrar Comisiones',
        url: '/dashboard/commissions/view-commissions',
        acl: "admin?.admin_acl['Manage Commission']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
      },
      {
        title: 'Collection Reports',
        title_es: 'Informes de colección',
        url: '',
        icon: 'assets/img/Ellipse.png',
        acl: "admin?.admin_acl['Collection Reports']?.can_read==1",
        children: [
          {
            title: 'General Report',
            title_es: 'Informe general',
            url: '/dashboard/collection-report/general-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Monthly Report',
            title_es: 'Reporte mensual',
            url: '/dashboard/collection-report/monthly-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Model Report',
            title_es: 'Informe modelo',
            url: '/dashboard/collection-report/model-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Concept Report',
            title_es: 'Informe conceptual',
            url: '/dashboard/collection-report/concept-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Arrear Report',
            title_es: 'Informe de atrasos',
            url: '/dashboard/collection-report/arrear-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Sales Report',
            title_es: 'Reporte de ventas',
            url: '/dashboard/collection-report/sales-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Sales Trend',
            title_es: 'Tendencia de ventas',
            url: '/dashboard/collection-report/sales-booking',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Commission Report',
            title_es: 'Informe de la Comisión',
            url: '/dashboard/collection-report/commission-income',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Revenue Report',
            title_es: 'Informe de ingresos',
            url: '/dashboard/collection-report/cash-flow-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Project Report',
            title_es: 'Reporte de Proyecto',
            url: '/dashboard/collection-report/project-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Buyer Report',
            title_es: 'Informe del comprador',
            url: '/dashboard/collection-report/buyer-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Delivery Report',
            title_es: 'Informe de entrega',
            url: '/dashboard/collection-report/delivery-report',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
        ]
      },
      {
        title: 'Cashflow',
        title_es: 'Flujo de efectivo',
        url: '',
        icon: 'assets/img/Ellipse.png',
        acl: "admin?.admin_acl['Cashflow']?.can_read==1",
        children: [
          {
            title: 'Income',
            title_es: 'Ingresos',
            url: '/dashboard/cash/income',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Cashflow']?.can_read==1",
          },
          {
            title: 'Expenditures',
            title_es: 'Egresos',
            url: '/dashboard/cash/expenditures',
            icon: 'assets/img/Rectangle.png',
            acl: "admin?.admin_acl['Cashflow']?.can_read==1",
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
    acl: "admin?.admin_acl['Settings']?.can_read==1",
    children: [
      {
        title: 'Settings',
        title_es: 'Ajustes',
        url: '',
        acl: "admin?.admin_acl['Settings']?.can_read==1",
        icon: 'assets/img/Ellipse.png',
        children: [
          {
            title: 'Location',
            title_es: 'Ubicación',
            url: '/dashboard/settings/setting-location',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Locality',
            title_es: 'Localidad',
            url: '/dashboard/settings/setting-locality',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Property',
            title_es: 'Departamento',
            url: '/dashboard/settings/setting-property',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Project',
            title_es: 'Proyecto',
            url: '/dashboard/settings/setting-project',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Office',
            title_es: 'Oficina ',
            url: '/dashboard/settings/setting-office',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Hotel',
            title_es: 'Hotel',
            url: '/dashboard/settings/setting-hotel',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Room',
            title_es: 'Habitación',
            url: '/dashboard/settings/setting-room',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Default Settings',
            title_es: 'Configuración por defecto',
            url: '/dashboard/settings/default-settings',
            icon: 'assets/img/Rectangle.png',
            acl: '',
          },
          {
            title: 'Document Listing',
            title_es: 'Listado de documentos',
            url: '/dashboard/settings/documents-listing',
            icon: 'assets/img/Rectangle.png',
            acl: '',
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
        acl: "admin?.admin_acl['Templates']?.can_read==1",
      },
      {
        title: 'Appointments',
        title_es: 'Citas',
        url: '/dashboard/appointments',
        icon: 'assets/img/Ellipse.png',
        acl: "admin?.admin_acl['Appointments']?.can_read==1",
      },
      {
        title: 'Notifications',
        title_es: 'Notificaciones',
        url: 'notifications',
        icon: 'assets/img/Ellipse.png',
        acl: '',
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
  isShowIcon: boolean = false;
  isShowSidebar: boolean = false;
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
  public language_code: string; $user: string;
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
    this.treeDataSource.data = demoNodes,
      // this.treeDataSource.data.forEach(x => {

      //   console.log(x.title, "node");
      // })
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
    this.route.params.subscribe(params => {
      this.admin.userback.subscribe(user => {
        this.$user = user;
        console.log(this.$user, "setset");
      });
    });
  }
  setStateAsActive(item) {
    this.activeState = this.language_code == 'en' ? item.title : item.title_es;
    this.activeIcon = item.icon;
    console.log(this.activeIcon, "activeIcon");
    console.log(this.activeState, "activeState");
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
  showIcon() {
    this.isShowIcon = !this.isShowIcon;
    if (this.isShowIcon) {
      this.admin.setUser(this.isShowSidebar = true);
    } else {
      this.admin.setUser(this.isShowSidebar = false);
    }
  }
  show() {
    this.isShowIcon = false;
    this.admin.setUser(this.isShowSidebar = false);
  }
}
