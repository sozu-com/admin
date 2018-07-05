import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [UIService]
})

export class LayoutComponent implements OnInit {
  constructor(public UIService: UIService, private router: Router, private admin: AdminService) {}
  ngOnInit() {}
}