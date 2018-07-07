import { MapsAPILoader } from '@agm/core';

declare const google;

export class AGMComponent {

    constructor(private loader: MapsAPILoader) {}
  
    map:any;
    all_overlays = [];
    selectedShape:any;
  
    init(mapDiv) {
        // Wait for the google maps script to be loaded before using the "google" keyword
        this.loader.load().then(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
    
            let map = new google.maps.Map(mapDiv.nativeElement, {
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom: 18
            });
            this.map = map;
    
            google.maps.event.addListener(map, 'click', event=> {
                this.placeMarker(event.latLng);
                console.log(event.latLng.toUrlValue(5));
            });
    
            var drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.POLYGON,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                        //google.maps.drawing.OverlayType.MARKER,
                        google.maps.drawing.OverlayType.CIRCLE,
                        google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.RECTANGLE
                    ]
                },
                markerOptions: {
                    icon: 'images/beachflag.png'
                },
                circleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 0.2,
                    strokeWeight: 3,
                    clickable: false,
                    editable: true,
                    zIndex: 1
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
    
            google.maps.event.addListener(drawingManager, 'polygoncomplete', event=> {
    
                event.getPath().getLength();
                google.maps.event.addListener(event.getPath(), 'insert_at', ()=> {
                    var len = event.getPath().getLength();
                    for (var i = 0; i < len; i++) {
                        console.log(event.getPath().getAt(i).toUrlValue(5));
                    }
                });
                google.maps.event.addListener(event.getPath(), 'set_at', ()=> {
                    var len = event.getPath().getLength();
                    for (var i = 0; i < len; i++) {
                        console.log(event.getPath().getAt(i).toUrlValue(5));
                    }
                });
            });
    
            google.maps.event.addListener(drawingManager, 'overlaycomplete', event=> {
    
                this.all_overlays.push(event);
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                    drawingManager.setDrawingMode(null);
                    //Write code to select the newly selected object.
    
                    var newShape = event.overlay;
                    newShape.type = event.type;
                    google.maps.event.addListener(newShape, 'click', ()=> {
                        this.setSelection(newShape);
                    });
    
                    this.setSelection(newShape);
                }
            });
  
  
            var centerControlDiv = document.createElement('div');
            //    var centerControl = new centerControl(centerControlDiv, map);
            var centerControl = this.CenterControl(centerControlDiv, map);
  
            //centerControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
        });
        }
        });
    }

    getPolygonCoords(newShape) {
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; i++) {
            console.log(newShape.getPath().getAt(i).toUrlValue(6));
        }
    }
  
    placeMarker(location) {
        var marker = new google.maps.Marker({
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
  
    setSelection(shape) {
        this.clearSelection();
        this.selectedShape = shape;
        shape.setEditable(true);
        // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
        // google.maps.event.addListener(selectedShape.getPath(), 'set_at', getPolygonCoords(shape));
    }
  
    deleteSelectedShape() {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
        }
    }
  
    deleteAllShape() {
        for (var i = 0; i < this.all_overlays.length; i++) {
            this.all_overlays[i].overlay.setMap(null);
        }
        this.all_overlays = [];
    }
  
    CenterControl(controlDiv, map) {
  
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Select to delete the shape';
        controlDiv.appendChild(controlUI);
  
        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Delete Selected Area';
        controlUI.appendChild(controlText);
  
        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', ()=> {
            this.deleteSelectedShape();
        });
  
    }
  
    getPolygons(){
      console.log(this.all_overlays);
  
      this.all_overlays.forEach( (item,count) =>{
        console.log('overlay'+count);
        this.getPolygonCoords(item.overlay);
      });
    }  
}
  