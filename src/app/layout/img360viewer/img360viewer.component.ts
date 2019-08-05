import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const PhotoSphereViewer: any;

@Component({
  selector: 'app-img360viewer',
  templateUrl: './img360viewer.component.html',
  styleUrls: ['./img360viewer.component.css']
})
export class Img360viewerComponent implements OnInit {

  @ViewChild('show360ImgViewer') show360ImgViewer: ElementRef;
  constructor() { }

  ngOnInit() {
    // this.loadPredefinedPanorama();
    // const div = document.getElementById('container');
    // const PSV = new PhotoSphereViewer({
    //     panorama: 'http://tassedecafe.org/wp-content/uploads/2013/01/parc-saint-pierre-amiens.jpg',
    //     container: div,
    //     time_anim: 3000,
    //     navbar: true,
    //     navbar_style: {
    //       backgroundColor: 'rgba(58, 67, 77, 0.7)'
    //     },
    //   });
  }
  // https://apitest.sozu.com//storage//uploads//1563271998YCSRW26Nxb0OS2RGdlh3NiIBcGefRL.jpg

  open360imgviewerModal(evt) {
    this.show360ImgViewer.nativeElement.click();
    this.loadPredefinedPanorama(evt);
  }

  // Load the predefined panorama
  loadPredefinedPanorama(evt) {
    evt.preventDefault();

    // Loader
    const loader = document.createElement('div');
    loader.className = 'loader';

    // Panorama display
    const div = document.getElementById('container');
    div.style.height = '30px';

    const PSV = new PhotoSphereViewer({
      // Path to the panorama
      panorama: 'https://apitest.sozu.com/storage/uploads/1563271998YCSRW26Nxb0OS2RGdlh3NiIBcGefRL.jpg',
      // panorama: 'assets/img/sun.jpg',

      // Container
      container: div,

      // Deactivate the animation
      time_anim: true,

      // Display the navigation bar
      navbar: true,

      // Resize the panorama
      size: {
        width: '100%',
        height: '500px'
      },

      autoload: true,
      tilt_up_max: '180deg',
      tilt_down_max: '180deg',
      keyboard_long_offset: '30deg',
      keyboard_lat_offset: '30deg',

      // HTML loader
      loading_html: loader,

      // Overlay
      overlay: {
        image: 'assets/img/web_logo.png',
        size: {
          // width: '42px'
        },
        position: {
          x: 'left',
          y: 'top'
        }
      }
    });
  }

  // Load a panorama stored on the user's computer
  // upload() {
  //   // Retrieve the chosen file and create the FileReader object
  //   const file = document.getElementById('pano').files[0];
  //   const reader = new FileReader();

  //   reader.onload = function () {
  //     const div = document.getElementById('your-pano');

  //     const PSV = new PhotoSphereViewer({
  //       // Panorama, given in base 64
  //       panorama: reader.result,

  //       // Container
  //       container: div,

  //       // Deactivate the animation
  //       time_anim: false,

  //       // Display the navigation bar
  //       navbar: true,

  //       // Resize the panorama
  //       size: {
  //         width: '100%',
  //         height: '500px'
  //       },

  //       // No XMP data
  //       usexmpdata: false
  //     });
  //   };

  //   reader.readAsDataURL(file);
  //   }

  }
