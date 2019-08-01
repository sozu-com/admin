import { Component, OnInit } from '@angular/core';
declare const PhotoSphereViewer: any;

@Component({
  selector: 'app-img360viewer',
  templateUrl: './img360viewer.component.html',
  styleUrls: ['./img360viewer.component.css']
})
export class Img360viewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const div = document.getElementById('container');
    const PSV = new PhotoSphereViewer({
        panorama: 'http://tassedecafe.org/wp-content/uploads/2013/01/parc-saint-pierre-amiens.jpg',
        container: div,
        time_anim: 3000,
        navbar: true,
        navbar_style: {
          backgroundColor: 'rgba(58, 67, 77, 0.7)'
        },
      });
  }
  // https://apitest.sozu.com//storage//uploads//1563271998YCSRW26Nxb0OS2RGdlh3NiIBcGefRL.jpg
}
