import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit() {}

  changeListner(event) {
    var reader = new FileReader();
    var image = this.element.nativeElement.querySelector('.profile_image');

    reader.onload = function(e) {
        var src = e.target['result'];
        image.src = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
