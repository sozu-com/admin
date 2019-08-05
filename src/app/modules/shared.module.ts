import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from '../layout/common-blocks/chat/chat.component';
import { ChatTimePipe } from '../pipes/chat-time.pipe';
import { NotesComponent } from '../layout/common-blocks/notes/notes.component';
import { MomentPipe } from '../pipes/moment.pipe';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ThousandPipe } from '../pipes/thousand.pipe';
import { BlockGetPropertyComponent } from '../layout/common-blocks/block-get-property/block-get-property.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImgPipe } from '../pipes/img.pipe';
import { NumberWithCommasPipe } from '../pipes/number-with-commas.pipe';
import { ChatTabsComponent } from '../layout/common-blocks/chat-tabs/chat-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MalihuScrollbarModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [
    ChatComponent,
    ChatTabsComponent,
    ChatTimePipe,
    NotesComponent,
    MomentPipe,
    ThousandPipe,
    ImgPipe,
    BlockGetPropertyComponent,
    NumberWithCommasPipe
  ],
  exports: [
    ChatComponent,
    ChatTabsComponent,
    ChatTimePipe,
    NotesComponent,
    MomentPipe,
    ThousandPipe,
    ImgPipe,
    BlockGetPropertyComponent,
    NumberWithCommasPipe
  ]
})
export class SharedModule { }
