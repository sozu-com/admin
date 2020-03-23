import { User } from './inhouse-users.model';
import { Towers, Configuration } from './addProject.model';
import { Building } from './addProperty.model';

export class Collection {
    id: string;
    property_id: any;
    step: number;
    building_id: string;
    building_towers_id: string;
    floor_num: string;
    building: Building;
    building_towers: Towers;
    deal_type_id: number;
    deal_type: DealType;
    name: string;
    seller_id: string;
    seller: Seller;
    buyer_id: string;
    buyer: Seller;
    availabilityStatusId: string;
    is_property_sold: boolean;
    deal_price: number;
    country_id = '';
    state_id = '';
    city_id = '';
    locality_id = '';
    building_configuration_id = '';
    configuration_id = '';
    property_type_id = '';
    carpet_areas: any = [];
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
    videoLoader: boolean;
    configuration: Configuration;
    creator: User;
    broker_commision = 0;
}

export class DealType {
    id: string;
    name: string;
}

export class Seller {
    id: string;
    name: string;
    phone: string;
    email: string;
    dial_code: string;
    country_code: string;
}