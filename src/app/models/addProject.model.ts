export class CarpetAreas {
    carpet_areas: Array<object> = [
        {
            area: 0,
            price: 0
        }
    ];
}

export class AddProjectModel {
    id = '';
    name = '';
    for_rent = false;
    for_sale = true;
    floors:any='';
    address = '';
    avg_price='';
    cover_image: File;
    images = [];
    building_images:any = [];
    description = '';
    amenities = [];
    lat:any = '';
    lng:any = '';
    custom_attributes = [
        {
            name: '',
            value: ''
        }
    ];
    custom_values = [
        {
            name: '',
            value: ''
        }
    ];
    configurations = [];
    developer = {
      name:'',
      email:'',
      country_code:'',
      dial_code:'',
      phone:'',
      logo:'',
    };
    developer_id:any;
    dev_countrycode:any='';
    dev_dialcode:any='';
    dev_email:any='';
    dev_phone:any='';
    dev_name:any='';
    dev_logo:any='';

    building_age = '';
    building_type = '';
    building_type_id:any ='';
    possession_status_id:any='';
    launch_date:any='';

}


export class Configuration {
  base_price:any='';
  building_id:any='';
  carpet_area:any='';
  config:any={
      created_at:'',
      created_by:'',
      id:'',
      name:'',
      name_en:'',
      name_es:'',
      status:'',
      updated_at:''
  };
  configuration_id:any='';
  created_at:any='';
  created_by:any='';
  floor_map_image:any='';
  id:any='';
  other_images:any=[];
  images_files:any=[];
  images_path:any=[];
  images:any=[];
  updated_at:any='';
}
