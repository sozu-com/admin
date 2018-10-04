import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from '../layout/common-blocks/chat/chat.component';
import { ChatTimePipe } from '../pipes/chat-time.pipe';
import { NotesComponent } from '../layout/common-blocks/notes/notes.component';
import { MomentPipe } from '../pipes/moment.pipe';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ThousandPipe } from '../pipes/thousand.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MalihuScrollbarModule.forRoot(),
  ],
  declarations: [
    ChatComponent,
    ChatTimePipe,
    NotesComponent,
    MomentPipe,
    ThousandPipe
  ],
  exports: [
    ChatComponent,
    ChatTimePipe,
    NotesComponent,
    MomentPipe,
    ThousandPipe
  ]
})
export class SharedModule { }
