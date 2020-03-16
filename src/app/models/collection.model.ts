import { User } from './inhouse-users.model';
import { Towers, Configuration } from './addProject.model';

export class Collection {
    id: number;
    step: number;
    name: string;
    building_towers_id: string;
    floor_num: string;
    building_towers: Towers;
    for_rent: boolean;
    for_sale: boolean;
    for_hold: boolean;
    availabilityStatusId: string;
    is_property_sold: boolean;
    country_id = '';
    state_id = '';
    city_id = '';
    locality_id = '';
    building_configuration_id = '';
    configuration_id = '';
    property_type_id = '';
    // carpet_areas: any = [
    //     {
    //         area: '',
    //         price: ''
    //     }
    // ];
    carpet_areas: any = [];
    property_id = '';
    cover_image: File;
    images: any = [];
    images360: any = [];
    videos: any = [];
    floor_plan: File;
    bedroom = 1;
    bathroom = 1;
    half_bathroom = 1;
    floor = 1;
    parking = 1;
    parking_count = 0;
    parking_for_sale = 0;
    furnished = 1;
    description = '';
    quantity = 1;
    amenities: any = [];
    banks: any = [];
    pets = 1;
    kids_friendly = 1;
    students_friendly = 1;
    lgtb_friendly = 1;
    mature_people_friendly = 1;
    property_price = 1;
    marital_status: any = [1];
    custom_attributes: any = [];
    property_quantity_details: any = [];
    building_id: string;
    videoLoader: boolean;
    configuration: Configuration;
    creator: User;
    broker_commision = 0;
}
