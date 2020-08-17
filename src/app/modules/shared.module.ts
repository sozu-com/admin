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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MalihuScrollbarModule.forRoot(),
    NgxPaginationModule,
    LazyLoadImageModule,
    TranslateModule
  ],
  declarations: [
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
    RoundNumberPipe,
    UptoTwoDigitDecimalNumberDirective,
    LocalizedNumericInputDirective,
    AddressComponent,
    PreventDoubleClickDirective
  ],
  exports: [
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
    RoundNumberPipe,
    UptoTwoDigitDecimalNumberDirective,
    LocalizedNumericInputDirective,
    AddressComponent,
    PreventDoubleClickDirective
  ]
})
export class SharedModule { }
