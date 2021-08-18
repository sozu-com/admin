import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatComponent } from '../layout/common-blocks/chat/chat.component';
import { ChatTimePipe } from '../pipes/chat-time.pipe';
import { NotesComponent } from '../layout/common-blocks/notes/notes.component';
import { MomentPipe } from '../pipes/moment.pipe';
import { ThousandPipe } from '../pipes/thousand.pipe';
import { BlockGetPropertyComponent } from '../layout/common-blocks/block-get-property/block-get-property.component';
import { ImgPipe } from '../pipes/img.pipe';
import { NumberWithCommasPipe } from '../pipes/number-with-commas.pipe';
import { ChatTabsComponent } from '../layout/common-blocks/chat-tabs/chat-tabs.component';
import { PricePipe } from '../pipes/price.pipe';
import { PropertyConfigurationComponent } from '../layout/common-blocks/property-configuration/property-configuration.component';
import { PercentagePipe } from '../pipes/percentage.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectBlockComponent } from '../layout/common-blocks/project-block/project-block.component';
import { RoundNumberPipe } from '../pipes/round-number.pipe';
import { UptoTwoDigitDecimalNumberDirective } from '../directives/upto-two-digit-decimal-number.directive';
import { LocalizedNumericInputDirective } from '../directives/localized-numeric-input.directive';
import { AddressComponent } from 'src/app/layout/inhouse-users/address/address.component';
import { PreventDoubleClickDirective } from '../directives/prevent-double-click.directive';
import { UptoThreeDecimalDirective } from '../directives/upto-three-decimal.directive';
import { CsrBuyerDetailComponent } from '../layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component';
import { InterestedPropertyComponent } from '../layout/common-blocks/interested-property/interested-property.component';
import { ViewedPropertyComponent } from '../layout/common-blocks/viewed-property/viewed-property.component';
import { ViewedProjectsComponent } from '../layout/common-blocks/viewed-projects/viewed-projects.component';
import { FillInformationComponent } from '../layout/common-blocks/fill-information/fill-information.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CalendarModule } from 'primeng/primeng';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { RouterModule } from '@angular/router';
import { OnlyNumberDirective } from '../directives/only-number.directive';
import { OnlyDecimalDirective } from '../directives/only-decimal.directive';
import { OfferBlockComponent } from '../layout/common-blocks/offer-block/offer-block.component';
import { CustomPricePipe } from '../pipes/custom-price.pipe';
import { InterestedProjectComponent } from '../layout/common-blocks/interested-project/interested-project.component';
import { PreferencesPropertyComponent } from '../layout/common-blocks/preferences-property/preferences-property.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MalihuScrollbarModule.forRoot(),
    NgxPaginationModule,
    LazyLoadImageModule,
    CalendarModule,
    Ng2TelInputModule,
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    CsrBuyerDetailComponent,
    PreferencesPropertyComponent,
    InterestedPropertyComponent,
    ViewedPropertyComponent,
    ViewedProjectsComponent,
    InterestedProjectComponent,
    FillInformationComponent,
  //  PropertyDetailsComponent,
    ChatComponent,
    ChatTabsComponent,
    NotesComponent,
    PropertyConfigurationComponent,
    BlockGetPropertyComponent,
    ChatTimePipe,
    MomentPipe,
    ThousandPipe,
    ImgPipe,
    NumberWithCommasPipe,
    PricePipe,
    PercentagePipe,
    ProjectBlockComponent,
    OfferBlockComponent,
    RoundNumberPipe,
    UptoTwoDigitDecimalNumberDirective,
    LocalizedNumericInputDirective,
    AddressComponent,
    PreventDoubleClickDirective,
    UptoThreeDecimalDirective,
    OnlyNumberDirective,
    OnlyDecimalDirective,
    CustomPricePipe
  ],
  exports: [
    CsrBuyerDetailComponent,
  //  PropertyDetailsComponent,
    InterestedPropertyComponent,
    ViewedPropertyComponent,
    ViewedProjectsComponent,
    InterestedProjectComponent,
    FillInformationComponent,
    ChatComponent,
    ChatTabsComponent,
    NotesComponent,
    PropertyConfigurationComponent,
    BlockGetPropertyComponent,
    ChatTimePipe,
    MomentPipe,
    ThousandPipe,
    ImgPipe,
    NumberWithCommasPipe,
    PricePipe,
    PercentagePipe,
    ProjectBlockComponent,
    OfferBlockComponent,
    RoundNumberPipe,
    UptoTwoDigitDecimalNumberDirective,
    LocalizedNumericInputDirective,
    AddressComponent,
    PreventDoubleClickDirective,
    UptoThreeDecimalDirective,
    OnlyNumberDirective,
    OnlyDecimalDirective,
    CustomPricePipe
  ]
})
export class SharedModule { }


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
// import { LazyLoadImageModule } from 'ng-lazyload-image';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { ChatComponent } from '../layout/common-blocks/chat/chat.component';
// import { ChatTimePipe } from '../pipes/chat-time.pipe';
// import { NotesComponent } from '../layout/common-blocks/notes/notes.component';
// import { MomentPipe } from '../pipes/moment.pipe';
// import { ThousandPipe } from '../pipes/thousand.pipe';
// import { BlockGetPropertyComponent } from '../layout/common-blocks/block-get-property/block-get-property.component';
// import { ImgPipe } from '../pipes/img.pipe';
// import { NumberWithCommasPipe } from '../pipes/number-with-commas.pipe';
// import { ChatTabsComponent } from '../layout/common-blocks/chat-tabs/chat-tabs.component';
// import { PricePipe } from '../pipes/price.pipe';
// import { PropertyConfigurationComponent } from '../layout/common-blocks/property-configuration/property-configuration.component';
// import { PercentagePipe } from '../pipes/percentage.pipe';
// import { TranslateModule } from '@ngx-translate/core';
// import { ProjectBlockComponent } from '../layout/common-blocks/project-block/project-block.component';
// import { RoundNumberPipe } from '../pipes/round-number.pipe';
// import { UptoTwoDigitDecimalNumberDirective } from '../directives/upto-two-digit-decimal-number.directive';
// import { LocalizedNumericInputDirective } from '../directives/localized-numeric-input.directive';
// import { AddressComponent } from 'src/app/layout/inhouse-users/address/address.component';
// import { PreventDoubleClickDirective } from '../directives/prevent-double-click.directive';
// import { UptoThreeDecimalDirective } from '../directives/upto-three-decimal.directive';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MalihuScrollbarModule.forRoot(),
//     NgxPaginationModule,
//     LazyLoadImageModule,
//     TranslateModule
//   ],
//   declarations: [
//     ChatComponent,
//     ChatTabsComponent,
//     NotesComponent,
//     PropertyConfigurationComponent,
//     BlockGetPropertyComponent,
//     ChatTimePipe,
//     MomentPipe,
//     ThousandPipe,
//     ImgPipe,
//     NumberWithCommasPipe,
//     PricePipe,
//     PercentagePipe,
//     ProjectBlockComponent,
//     RoundNumberPipe,
//     UptoTwoDigitDecimalNumberDirective,
//     LocalizedNumericInputDirective,
//     AddressComponent,
//     PreventDoubleClickDirective,
//     UptoThreeDecimalDirective
//   ],
//   exports: [
//     ChatComponent,
//     ChatTabsComponent,
//     NotesComponent,
//     PropertyConfigurationComponent,
//     BlockGetPropertyComponent,
//     ChatTimePipe,
//     MomentPipe,
//     ThousandPipe,
//     ImgPipe,
//     NumberWithCommasPipe,
//     PricePipe,
//     PercentagePipe,
//     ProjectBlockComponent,
//     RoundNumberPipe,
//     UptoTwoDigitDecimalNumberDirective,
//     LocalizedNumericInputDirective,
//     AddressComponent,
//     PreventDoubleClickDirective,
//     UptoThreeDecimalDirective
//   ]
// })
// export class SharedModule { }
