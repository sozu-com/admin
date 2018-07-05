import { Component, OnInit } from '@angular/core';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.css'],
  providers: [UIService]
})
export class SessionModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
