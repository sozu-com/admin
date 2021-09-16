import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Agency } from 'src/app/models/agency.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ExcelDownload } from 'src/app/common/excelDownload';
declare let swal: any;

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  @ViewChild('viewAgentsModel') viewAgentsModel: ElementRef;
  @ViewChild('closeViewAgentsModel') closeViewAgentsModel: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;

  public parameter: IProperty = {};
  model: Agency;
  items: Array<Agency>;
  label: string;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  private exportfinalData: any[] = [];
  public select_columns_list: any[] = [];
  public selectedColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  public keyword: string = '';
  language_code: string;

  constructor(public constant: Constant,
    private spinner: NgxSpinnerService,
    public admin: AdminService, private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getAgencyHome();
    this.language_code = localStorage.getItem('language_code');
    this.label = this.translate.instant('table.title.chooseAgenciesFile');
    this.model = new Agency();
    this.model.property_sort = null; // desc
    this.model.agent_sort = 2; // desc
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.route.params.subscribe(params => {
      this.model.name = params.name;
    });
    this.getAgencies();
  }

  getPage(page: number) {
    this.parameter.page = page;
    this.getAgencies();
  }

  getFileName() {
    const fi = this.fileInput.nativeElement;
    const uploadedFile = fi.files[0];
    this.label = uploadedFile.name;
  }

  sortData(value: number, param: string) {
    this.model[param] = value;
    if (param === 'property_sort') {
      this.model.agent_sort = null;
      this.model.project_sort = null;
    } else if (param === 'project_sort') {
      this.model.agent_sort = null;
      this.model.property_sort = null;
    } else {
      this.model.property_sort = null;
      this.model.project_sort = null;
    }
    this.getAgencies();
  }

  getAgencies() {
    this.model.page = this.parameter.page;
    this.spinner.show();
    this.admin.postDataApi('getAgencies', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          this.parameter.total = success.total_count;
        }, error => {
          this.spinner.hide();
        });
  }

  editUser(item: Agency) {
    this.router.navigate(['/dashboard/agencies/add-agency', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number) {
    this.parameter.index = index;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockAgency');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockAgency');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockAgency(index, id, flag);
      }
    });
  }


  blockAgency(index: number, id: any, flag: any) {
    this.parameter.index = index;
    this.parameter.url = 'blockAgency';
    const input = new FormData();
    input.append('agency_id', id);
    input.append('flag', flag);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = this.translate.instant('message.error.wantToDeleteAgency');

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteData(item, index);
      }
    });
  }

  deleteData(item: any, index: number) {
    this.admin.postDataApi('deleteAgency',
      { agency_id: item.id }).subscribe(r => {
        this.items.splice(index, 1);
        this.parameter.total--;
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }


  importAgency() {
    const file = this.fileInput.nativeElement;
    let attachment: File;
    if (file.files && file.files[0]) {
      attachment = file.files[0];
      if (attachment.size > this.constant.fileSizeLimit) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeLimit'), 'error');
        return false;
      }
      this.spinner.show();
      const input = new FormData();
      input.append('attachment', attachment);
      this.admin.postDataApi('importAgency', input)
        .subscribe(
          success => {
            this.spinner.hide();
            this.fileInput.nativeElement.value = '';
            this.label = this.translate.instant('table.title.chooseAgenciesFile');
            swal(this.translate.instant('swal.success'), this.translate.instant('message.success.importedSuccessfully'), 'success');
            this.getAgencies();
          }, error => {
            this.fileInput.nativeElement.value = '';
            this.spinner.hide();
          });
    } else {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFile'), 'error');
      return false;
    }
  }

  getAgencyAgents(agency_id: string) {
    this.spinner.show();
    this.admin.postDataApi('getAgencyAgents', { agency_id: agency_id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.viewAgentsModel.nativeElement.click();
          this.parameter.items = success.data;
        }, error => {
          this.spinner.hide();
        });
  }
  
  getExportlisting = (): void => {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.model));
    input.page = -1;
    this.admin.postDataApi('getAgencies', input).subscribe((success) => {
      this.exportfinalData = success['data'] || [];
      this.exportData();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  exportData = (): void => {
    if (this.exportfinalData.length > 0) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];

        exportfinalData.push({
          'Company name': p.name || '',
          'Contact number': p.phone || '',
          'Email': p.email || '',
          'Location': p.address || '',
          'Latitude': p.lat || '',
          'Longitude': p.lng || '',
          'Linked agent': p.agents_count || 0,
          'Linked properties': p.property_count || 0,
          'Linked projects': p.project_count || 0
        });
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'Agencies');
    }
  }

  changeRoute(item){
    item.is_external_agent != 1 ? this.router.navigate(['/dashboard/view-inhouse-users/inhouse-broker', item.id]) : this.router.navigate(['/dashboard/view-inhouse-users/outside-broker', item.id]);
    this.closeViewAgentsModel.nativeElement.click();
  
  }

  getAgencySelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getAgencySelection', { name: keyword }).subscribe((response) => {
      this.spinner.hide();
      this.select_columns_list = (response.data || []).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      (this.select_columns_list || []).forEach((data, index) => {
        this.makeSelectedColumns(data.id, index);
      });
      this.changeSelect();
      if (isFirstTime) {
        this.keyword = '';
        this.isSelectAllColumns = false;
        this.language_code = localStorage.getItem('language_code');
        this.openSelectColumnsModal.nativeElement.click();
      }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), ((error || {}).error || {}).message, 'error');
    });
  }

  changeSelect = (): void => {
    let index = 0;
    (this.select_columns_list || []).forEach((data) => {
      if (data.isCheckBoxChecked) {
        index += 1;
      }
    });
    if ((this.select_columns_list || []).length == index) {
      this.isSelectAllColumns = true;
    } else {
      this.isSelectAllColumns = false;
    }
  }

  makeSelectedColumns = (id: number, index: number): void => {
    switch (id) {
      case 1:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.company_name;
        break;
      case 2:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.contact_number;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.email;
        break;
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.linked_agent;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.linked_projects;
        break;
      case 6:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.linked_properties;
        break;
      case 22:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.image;
        break;
      case 23:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.action;
      break;
      default:
        break;
    }

  }

  getAgencyHome = (): void => {
    //this.spinner.show();
    this.admin.postDataApi('getAgencyHome', { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
      //this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.message, 'error');
    });
  }

  changeSelectAll = (): void => {
    (this.select_columns_list || []).forEach((data) => {
      data.isCheckBoxChecked = this.isSelectAllColumns;
    });
  }

  closeSelectColumnsPopup = (): void => {
    this.keyword = '';
    this.isSelectAllColumns = false;
    this.closeSelectColumnsModal.nativeElement.click();
  }

  applyShowSelectedColumns = (): void => {
    this.spinner.show();
    this.admin.postDataApi('updateAgencyHome', this.getPostRequestForColumn()).subscribe((response) => {
      this.spinner.hide();
      this.closeSelectColumnsPopup();
      this.getAgencyHome();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
      return {
        user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
        company_name: (this.select_columns_list[0] || []).isCheckBoxChecked,
        contact_number: (this.select_columns_list[1] || []).isCheckBoxChecked,
        email: (this.select_columns_list[2] || []).isCheckBoxChecked,
        image: (this.select_columns_list[6] || []).isCheckBoxChecked,
        linked_agent: (this.select_columns_list[3] || []).isCheckBoxChecked,
        linked_projects: (this.select_columns_list[5] || []).isCheckBoxChecked,
        linked_properties: (this.select_columns_list[4] || []).isCheckBoxChecked,
        actions: (this.select_columns_list[7] || []).isCheckBoxChecked,
      };
  }
}
