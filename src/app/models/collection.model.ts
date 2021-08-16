import { User } from './inhouse-users.model';
import { Towers, Configuration } from './addProject.model';
import { Building } from './addProperty.model';

export class Collection {
    id: string;
    property_id: any;
    add_iva_to_pc: any;
    add_iva_to_ac: any;
    add_iva_to_cc: any;
    add_iva_to_oac: any;
    step: number;
    iva_percent: any;
    building_id: string;
    building_towers_id: string;
    property_offer_payment_id: string;
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
    final_price: string;
    final_price_per_m2: string;
    cancellation_commission:any;
    availabilityStatusId: string;
    is_property_sold: boolean;
    deal_price: number;
    seller_type: any;
    buyer_type: any;
    initial_status: any;
    final_status: any;
    building_configuration?: any;
    building_configuration_id: any;
    collection_commissions: any;
    payment_choices?: Array<any>;
    property?: any;
    deal_purchase_date?: any;
    delivery_date?: any;
    currency?: any;
    buyer_leg_rep_name?: string;
    buyer_leg_rep_email?: string;
    buyer_leg_rep_phone?: string;
    seller_leg_rep_name?: string;
    seller_leg_rep_email?: string;
    seller_leg_rep_phone?: string;
    paid?: any;
    total?: any;
    totalPenalty?: any;
    total_payment_recieved?: any;
    penalty?: any;
    deal_commission_agents?: Array<any>;
    collection_seller_banks?: Array<any>;
    collection_buyer_banks?: Array<any>;
    collection_buyer_rep_banks: Array<any>;
    collection_seller_rep_banks: Array<any>;
    deal_commission_outside_agents: Array<any>;
    buyer_legal_entity?: any;
    seller_legal_entity?: any;
    payment_received_by?: number;
    offer_id?: any;
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
    legal_rep_banks?: any;
    legal_representative?: any;
}