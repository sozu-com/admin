import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { ExcelDownload } from 'src/app/common/excelDownload';
declare let swal: any;

@Component({
  selector: 'app-legal-entity',
  templateUrl: './legal-entity.component.html',
  styleUrls: ['./legal-entity.component.css'],
  providers: [Users]
})
export class LegalEntityComponent implements OnInit {

  public parameter: IProperty = {};
  items: Array<Users>;
  comm_name: string;
  legal_name: string;
  name: string;
  email: string;
  phone: string;
  legal_rep_name: string;
  developer_name: string;
  developer_id: number;
  legal_entity_id: string;
  private exportfinalData: any[] = [];

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.sub = this.route.params.subscribe((params) => {
      this.developer_name = params['developer_name'];
      this.developer_id = params['developer_id'];
      this.legal_entity_id = params['legal_entity_id'];
    });
    this.getLegalEntity();
  }

  getPage(page: number) {
    this.parameter.page = page;
    this.getLegalEntity();
  }

  getLegalEntity = (): void => {
    const input = {
      comm_name: this.comm_name,
      legal_name: this.legal_name,
      phone: this.phone,
      email: this.email,
      name: this.name,
      developer_name: this.developer_name,
      legal_rep_name: this.legal_rep_name,
      developer_id: this.developer_id,
      page: this.parameter.page,
      legal_entity_id: this.legal_entity_id
    };
    this.spinner.show();
    this.admin.postDataApi('getLegalEntity', input).subscribe((success) => {
      this.spinner.hide();
      this.items = success.data;
      this.parameter.total = success.total_count;
    }, (error) => {
      this.spinner.hide();
    });
  }

  editUser(item: Users) {
    this.router.navigate(['/dashboard/legal-entities/add-legal-entity', item.id]);
    // this.router.navigate(['/dashboard/legal-entities/edit-legal-entity', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number) {
    this.parameter.index = index;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockLegalEntity');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockLegalEntity');
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
        this.blockAdmin(index, id, flag);
      }
    });
  }


  blockAdmin(index: number, id: any, flag: any) {
    this.parameter.index = index;
    this.parameter.url = flag == 1 ? 'blockLegalEntity' : 'unblockLegalEntity';
    this.admin.postDataApi(this.parameter.url, { id: id })
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = this.translate.instant('message.error.wantToDeleteLegalEntity');

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
    this.admin.postDataApi('deleteLegalEntity',
      { id: item.id }).subscribe(r => {
        this.items.splice(index, 1);
        this.parameter.total--;
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  viewDeveloper(item: any) {
    if (item.user && item.user.name) {
      this.router.navigate(['/dashboard/developers/view-all', item.user.name]);
    }
  }

  getExportlisting = (): void => {
    this.spinner.show();
    const input = {
      comm_name: this.comm_name,
      legal_name: this.legal_name,
      phone: this.phone,
      email: this.email,
      name: this.name,
      developer_name: this.developer_name,
      legal_rep_name: this.legal_rep_name,
      developer_id: this.developer_id,
      page: this.parameter.page,
      legal_entity_id: this.legal_entity_id
    };
    input.page = 0;
    this.admin.postDataApi('getLegalEntity', input).subscribe((success) => {
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
          'Commercial Name': p.comm_name || '',
          'Legal Name': p.legal_name || '',
          'Email': p.email || '',
          'Phone': p.phone ? p.dial_code + ' ' + p.phone : '',
          'Legal Representative': p.legal_reps && p.legal_reps.name ? p.legal_reps.name + ' ' + p.legal_reps.first_surname + '' + p.legal_reps.second_surname : '',
          'Developer': p.user ? p.user.name : '',
          'System Dashbaord (Yes/No)': p.legal_reps && p.legal_reps.have_dev_panel_access ? 'Yes' : 'No'  
        });
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'Companies');
    }
  }
}
