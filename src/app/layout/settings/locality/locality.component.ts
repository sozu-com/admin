import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from '../../../common/property';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';
import { Constant } from './../../../common/constants';
import { Locality } from './../../../models/locality.model';
import { FormControl } from '@angular/forms';
declare let swal: any;
declare const google;

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.css'],
  providers: [Constant, Locality]
})

export class LocalityComponent implements OnInit {

  @ViewChild('searchLocality') searchElementRef: ElementRef;
  @ViewChild('localityOpen') localityOpen: ElementRef;
  @ViewChild('localityClose') localityClose: ElementRef;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  agm: any;
  len: any;

  map: any;
  all_overlays = [];
  selectedLocality: any;
  selectedShape: any;
  shapeName: any;

  showModal = true;

  @ViewChild('mapDiv') mapDiv: ElementRef;

  constructor(
    private loader: MapsAPILoader,
    public admin: AdminService,
    private ngZone: NgZone,
    private constant: Constant,
    public model: Locality
  ) {}

  ngOnInit() {
    this.parameter.localities = [];
    this.getCountries('');
  }

  getCountries(keyword) {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.countries = success.data;
          if (this.parameter.countries.length !== 0) {
            this.parameter.country_id = this.parameter.countries[0].id;
            this.getStates(this.parameter.countries[0].id, '');
          }
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  getStates(country_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('states', success);
          this.parameter.loading = false;
          this.parameter.states = success.data;
          if (this.parameter.states.length) {
            this.parameter.state_id = this.parameter.states[0].id;
            this.getCities(this.parameter.states[0].id, '');
          }else {
            this.parameter.city_id = '0';
            this.parameter.localityCount = 0;
            this.parameter.cities = [];
            this.parameter.localities = [];
            this.all_overlays = [];
            this.init();
          }
        }, error => {
          this.parameter.loading = false;
        });
  }

  getCities(state_id, keyword) {
    // console.log('mm', state_id, keyword);
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    const input = new FormData();
    input.append('state_id', state_id);

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('cities', success);
          this.parameter.loading = false;
          this.parameter.cities = success.data;
          if (this.parameter.cities.length) {
            this.parameter.city_id = this.parameter.cities[0].id;
            // console.log('cityid', this.parameter.city_id);
            this.getLocalities(this.parameter.city_id, '');
          }else {
            this.parameter.localityCount = 0;
            this.parameter.cities = [];
            this.parameter.localities = [];
            this.all_overlays = [];
            this.init();
          }
        }, error => {
          this.parameter.loading = false;
        });
  }


  getLatLngFromAddress() {
    // https://maps.googleapis.com/maps/api/geocode/json?address=adress&key=YOUR_API_KEY
  }


  getLocalities(city_id, keyword= '') {
    // console.log('mm', city_id, keyword);
    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('Localities', success);
          this.parameter.loading = false;
          this.parameter.localities = success.data;
          this.all_overlays = this.parameter.localities;
          this.parameter.localityCount = success.data.length;
          if (this.parameter.localities.length) {
            this.selectedLocality = this.parameter.localities[0].id;
          }else {
            this.all_overlays = [];
          }
          this.init();
        }, error => {
          this.parameter.loading = false;
        });
  }


  init() {

      // Wait for the google maps script to be loaded before using the "google" keyword
      this.loader.load().then(() => {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const map = new google.maps.Map(this.mapDiv.nativeElement, {
              center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              },
              zoom: 18
          });
          this.map = map;

          let all_overlays_index = 0;
          this.all_overlays.forEach(locality => {

            const poly_coordinates = JSON.parse(locality.poly_coordinates);
            // console.log(poly_coordinates);
            const polygon = poly_coordinates.map(ll => {
              // console.log(ll);
              const latlng = ll.split(',');
              const coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
              // console.log(coord);
              return coord;
              }
            );


            // this.setSelection(polygon);
            const singlePolygon = new google.maps.Polygon({
              paths: polygon,
              editable: false,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35
            });
            locality.overlay = singlePolygon;

            // showing selected first locality
            if (all_overlays_index === 0) {this.setSelection(singlePolygon, locality.id); }
            all_overlays_index++;

            // this.all_overlays.push(singlePolygon);
            google.maps.event.addListener(singlePolygon, 'click', () => {
              // console.log('click', singlePolygon, locality.id);
              this.setSelection(singlePolygon, locality.id);
            });

            // google.maps.event.addListener(singlePolygon, 'mouseup', function(muEvent) {
            //         console.log('33')
            //   this.setSelection(singlePolygon);
            // });

            singlePolygon.setMap(map);

          });


          google.maps.event.addListener(map, 'click', event => {
              // console.log(event);
              this.placeMarker(event.latLng);
              // console.log(event.latLng.toUrlValue(5));
          });

          const drawingManager = new google.maps.drawing.DrawingManager({

              drawingControl: true,
              drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                      // google.maps.drawing.OverlayType.MARKER,
                      // google.maps.drawing.OverlayType.CIRCLE,
                      google.maps.drawing.OverlayType.POLYGON,
                      google.maps.drawing.OverlayType.RECTANGLE
                  ]
              },
              polygonOptions: {
                  clickable: true,
                  draggable: true,
                  editable: true,
                  fillColor: '#00b96e',
                  fillOpacity: 0.5,

              },
              rectangleOptions: {
                  clickable: true,
                  draggable: true,
                  editable: true,
                  fillColor: '#ffff00',
                  fillOpacity: 0.5,
              }
          });


          drawingManager.setMap(map);

          google.maps.event.addListener(drawingManager, 'polygoncomplete', event => {

              event.getPath().getLength();
              google.maps.event.addListener(event.getPath(), 'insert_at', () => {
                  const len = event.getPath().getLength();
                  for (let i = 0; i < len; i++) {
                      console.log(event.getPath().getAt(i).toUrlValue(5));
                  }
              });
              google.maps.event.addListener(event.getPath(), 'set_at', () => {
                  const len = event.getPath().getLength();
                  for (let i = 0; i < len; i++) {
                      console.log(event.getPath().getAt(i).toUrlValue(5));
                  }
              });
          });

          google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {

            this.parameter.overlay = this.getPolygonCoords(event.overlay);
            this.localityOpen.nativeElement.click();

console.log('xx', typeof this.getPolygonCoords(event.overlay));
            // this.swal.prompt({
            //   text:''
            // }).then(f=>{

            //   this.shapeName = f;

            //   var locality = {
            //     name_en: this.shapeName,
            //     name_es: this.shapeName,
            //     coordinates: this.getPolygonCoords(event.overlay),
            //     poly_coordinates: JSON.stringify(this.getPolygonCoords(event.overlay)),
            //     status:'1',
            //     city_id:this.parameter.city_id,
            //     overlay: event.overlay
            //   };
            //   //console.log(locality);
            //   //this.all_overlays.push(locality);
            //   //this.all_overlays = this.all_overlays;
            //   //this.all_overlays.splice(0,2);
            //   //this.len = this.all_overlays.length;
            //   console.log(this.all_overlays);
            //   delete locality.overlay;
            //   //console.log(locality);

            //   this.admin.postDataApi('addLocality', locality).subscribe(
            //       r => {
            //         console.log(r);
            //         this.all_overlays.push(r.data);
            //         //this.getLocalities(this.parameter.city_id,'');
            //       });

            // });
            // this.all_overlays = this.all_overlays;



              if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                  drawingManager.setDrawingMode(null);
                  // Write code to select the newly selected object.

                  const newShape = event.overlay;
                  newShape.type = event.type;
                  google.maps.event.addListener(newShape, 'click', () => {
                      this.setSelection(newShape);
                  });

                  this.setSelection(newShape);

              }
          });


          // var centerControlDiv = document.createElement('div');
          //    var centerControl = new centerControl(centerControlDiv, map);
          // var centerControl = this.CenterControl(centerControlDiv, map);

          // centerControlDiv.index = 1;
          // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
      });
      }
      });
  }


  checkIfLocalitySpanishNameEntered(name_en, name_es, price_per_sqft) {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addLocality(name_en, name_en, price_per_sqft);
        }
      });
    }else {
      self.addLocality(name_en, name_es, price_per_sqft);
    }
  }


  addLocality(name_en, name_es, price_per_sqft) {
    this.localityClose.nativeElement.click();
    const locality = {
      name_en: name_en,
      name_es: name_es,
      price_per_sqft: price_per_sqft,
      coordinates: this.parameter.overlay,
      poly_coordinates: JSON.stringify(this.parameter.overlay),
      status: '1',
      city_id: this.parameter.city_id,
      overlay: this.parameter.overlay
    };
// console.log('locality', locality);
    delete locality.overlay;

    this.admin.postDataApi('addLocality', locality).subscribe(
        r => {
          // console.log('zz', r);
          this.all_overlays.push(r.data);
        });
  }


  getPolygonCoords(newShape) {
    // console.log('new', newShape);
    // console.log('IN');
      const coordinates_array = [];
      const len = newShape.getPath().getLength();
      for (let i = 0; i < len; i++) {
          // console.log(newShape.getPath().getAt(i).toUrlValue(6));
          coordinates_array.push(newShape.getPath().getAt(i).toUrlValue(6));
      }
      // console.log(coordinates_array);
      return coordinates_array;
  }

  getLatLngFromString(ll) {
      const latlng = ll.split(/, ?/);
      return new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
  }

  placeMarker(location) {
      const marker = new google.maps.Marker({
          position: location,
          map: this.map
      });

  }

  clearSelection() {
      if (this.selectedShape) {
          this.selectedShape.setEditable(false);
          this.selectedShape = null;
      }
  }

  setSelection(shape, locality= '') {
// console.log('zzzzzzzzzzzz', shape);
      this.clearSelection();
      this.selectedLocality = locality;

      this.selectedShape = shape;
      shape.setEditable(true);
      const coords = this.getPolygonCoords(shape);

      const latlng = coords[0].split(',');
      const coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));


      // console.log(coords);
      // var center = new google.maps.LatLngBounds(shape).getCenter();
      // let center = shape.my_getBounds().getCenter()

      this.map.setCenter(coord);

      // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
      // google.maps.event.addListener(shape.getPath(), 'set_at', this.getPolygonCoords(shape));
  }

  deleteSelectedShape() {
      if (this.selectedShape) {
          this.selectedShape.setMap(null);
      }
  }

  deleteAllShape() {
      for (let i = 0; i < this.all_overlays.length; i++) {
          this.all_overlays[i].overlay.setMap(null);
      }
      this.all_overlays = [];
  }

  getPolygons() {
    // console.log(this.all_overlays);
    this.all_overlays.forEach( (item, count) => {
      // console.log('overlay' + count);
      this.getPolygonCoords(item.overlay.overlay);
    });
  }

  blockUnblockLocality(locality, index, type) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (type) {
      case 0:
        this.parameter.text = this.constant.title.BLOCK_LOCALITY;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.UNBLOCK_LOCALITY;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
    }

    swal({
      // title: this.parameter.title,
      // text: this.parameter.text,
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.removeSelection(locality, index, type);
        swal('Success', this.parameter.successText, 'success');
      }
    });
  }

  removeSelection(locality, index, status) {
      // console.log('Removing...', locality);
      locality.status = status;
      // this.all_overlays.splice(index,1);
      // locality.overlay.setMap(null);
      delete locality.overlay;
      this.admin.postDataApi('addLocality', locality).subscribe(
      r => {
        // console.log(r);
        // this.all_overlays.push(r.data);
        // this.getLocalities(this.parameter.city_id,'');
      });
  }

  upadteSelection(locality, index) {

  }

  markLocalityFeatured (index, locality_id, flag) {
    let title = '';
    if (flag === 1) {
      title = 'You want to feature this locality?';
    } else {
      title = 'You want to unfeature this locality?';
    }
    swal({
      html: 'Are you sure' + '<br>' + title,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.admin.postDataApi('markLocalityFeatured', {locality_id: locality_id, flag: flag}).subscribe(
          r => {
            this.parameter.localities[index] = r.data;
            swal('Success', this.parameter.successText, 'success');
          });
      }
    });
  }

  loadPlaces() {

    console.log('locality', this.searchElementRef.nativeElement);
    // load Places Autocomplete
    this.loader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const place = autocomplete.getPlace();
console.log('place', place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          if (place.formatted_address) {
            console.log('==', place.formatted_address);
          }

          const map = new google.maps.Map(this.mapDiv.nativeElement, {
            center: {
                lat: this.latitude,
                lng: this.longitude
            },
            zoom: 18
          });
          this.map = map;

        });
      });
    });
  }

}
