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
    seller_type: number;
    buyer_type: number;
    building_configuration?: any;
    building_configuration_id: any;
    collection_commissions: any;
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