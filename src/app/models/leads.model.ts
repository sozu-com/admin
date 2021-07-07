import { UserModel } from './inhouse-users.model';
import { Users } from './users.model';
import { AddProjectModel } from './addProject.model';
import { AddPropertyModel } from './addProperty.model';

export class Leads {
    id: number;
    user_id: number;
    admin_id: number;
    name: string;
    email: string;
    country_code: string;
    dial_code: string;
    phone: string;
    broker_id: number;
    closer_id: number;
    building_id: number;
    sale_rent: number;
    is_blocked: number;
    is_finalized: number;
    lead_status_closer: number;
    lead_status_bank: number;
    lead_status_noatary: number;
    broker_assign_action: number;
    closer_assign_action: number;
    bank_assigned_at: Date;
    noatary_assigned_at: Date;
    property_id: number;
    payment_modes: Array<PaymentModes>;
    property_purposes: Array<PaymentModes>;
    buyer_amenities: Array<BuyerAmenities>;
    properties_amenities: Array<BuyerAmenities>;
    buyer_car_type: Array<CarTypes>;
    buyer_proximity: Array<ProximityPlaces>;
    buyer_property_type: Array<PropertyTypes>;
    admin: UserModel;
    user: Users;
    broker: UserModel;
    closer: UserModel;
    building: AddProjectModel;
    prefs: Prefs;
    proximity_places: Array<ProximityPlaces>;
    property_types: Array<PropertyTypes>;
    configuration: Array<Configuration>;
    selected_properties: Array<SelectedProperties>;
    appointments: Array<AddAppointment>;
    lead_type: number;
    image: string;
    first_surname: string;
    second_surname: string;
    lead_bedroom: Array<bath>;
    lead_bathroom: Array<bath>;
    lead_half_bedroom: Array<bath>;
}

export class bath {
    id: number;
    bathroom: string;
    bedroom: string;
    half_bedroom: string;
}

export class PaymentModes {
    id: number;
    name_en: string;
    name_es: string;
    is_blocked: number;
    is_selected: number;
    name: string;
}

export class Prefs {
    id: number;
    lead_id: number;
    family_size: number;
    kid_count: number;
    car_type_id: number;
    pets: number;
    planning_to_buy: Date;
    min_price: number;
    max_price: number;
    looking_for: number;
    bedroom: number;
    bathroom: number;
    half_bathroom: number;
    proximity_other: string;
    marital_statuses_id: string;
}

export class BuyerAmenities {
    id: number;
    name_en: string;
    name_es: string;
    icon: string;
    status: number;
    is_blocked: number;
    is_selected: number;
    name: string;
}

export class DealFinalize {
    lead_id: number;
    property_id: number;
    token_amount: number;
    total_amount: number;
    commision: number;
}

export class Notes {
    id: number;
    lead_id: number;
    note: string;
    title : string;
    name: string;
    reminder_date: any;
    email : any;
}

// export class FillInformation {
//     lead_id: number;
//     family_size: number;
//     car_type_id: string;
//     pets: string;
//     kid_count: string;
//     min_price: number;
//     max_price: number;
//     price_range: Array<number>;
//     planning_to_buy: Date;
//     proximity_place_ids: Array<number>;
//     car_types: Array<CarTypes>;
//     proximity_places: Array<number>;
//     property_types: Array<number>;
//     configurations: Array<number>;
//     proximity_places_array: Array<ProximityPlaces>;
//     property_types_array: Array<PropertyTypes>;
//     configurations_array: Array<Configuration>;
// }

export class ProximityPlaces {
    id: number;
    name_en: string;
    name_es: string;
    name: string;
    is_selected: number;
    status: number;
}

export class CarTypes {
    id: number;
    name_en: string;
    name_es: string;
    name: string;
    is_selected: number;
    status: number;
}

export class Configuration {
    id: number;
    name_en: string;
    name_es: string;
    name: string;
    is_selected: number;
    status: number;
}

export class PropertyTypes {
    id: number;
    name_en: string;
    name_es: string;
    name: string;
    is_selected: number;
    status: number;
}

export class SelectedProperties {
    property_id: number;
    token_money: number;
    total_amount: number;
    pending_amount: number;
    status: any;
    commision: number;
    banks: Array<BankAssigned>;
    noataries: Array<NotaryAssigned>;
    selected_noatary?: Array<NotaryAssigned>;
    selected_documents: Array<Documents>;
    allDocuments: Array<Documents>;
    uploaded_documents: Array<UploadedDocuments>;
    property: AddPropertyModel;
}

export class Documents {
    id: number;
    name_en: string;
    name_es: string;
    name: string;
    is_selected: number;
    status: number;
}

export class UploadedDocuments {
    attachment: string; // attachment link
    attachment_name: string; // just name of attachment
    created_at: string;
    id: number;
    selected_property_id: number;
    updated_at: string;
    user_id: number;
}

export class NotaryAssigned {
    id: number;
    name: string;
    phone: string;
    dial_code: string;
    country_code: string;
    lead_id: number;
    image: string;
    property_id: number;
    noatary_id: number;
    noatary?: any;
    // is_selected: number;
    // status: number;
}

export class BankAssigned {
    id: number;
    name: string;
    phone: string;
    dial_code: string;
    country_code: string;
    branch: string;
    is_selected: number;
    status: number;
    lead_id: number;
    property_id: number;
    bank_id: number;
}

export class NotaryLeads {
    id: string;
    name: string;
    dial_code: string;
    country_code: string;
    phone: string;
    email: string;
    selected_properties: Array<SelectedNotary>;
    datetime: any;
}

export class SelectedNotary {
    selected_noatary: Array<NotaryAvailabilty>;
}

export class NotaryAvailabilty {
    noatary_availability: Array<Datetime>;
}

export class Datetime {
    id: number;
    date_time: any;
}

export class AddNotaryAvailabilty {
    property_id: string;
    lead_id: string;
    date_time_array: Array<any> = [];
    date_time: Array<any> = [];
}

export class ScheduleMeeting {
    lead_id: any;
    property_id: any;
    id: any;
    appointment_date: any;
    sent_as: any;
}

export class AddAppointment {
    property_id: string;
    lead_id: string;
    appointment_date: any;
    sent_as: string;
    id: string;
}

export class AddAppointmentMultiple {
    id: any;
    sent_as: any;
    property_id: any;
    lead_id: any;
    appointment_date_array: Array<any> = [];
    appointment_date: Array<any> = [];
}

export class CSRBuyerLeads {
    id: number;
    user_id: number;
    admin_id: number;
    name: string;
    email: string;
    country_code: string;
    dial_code: string;
    phone: string;
    broker_id: number;
    closer_id: number;
    building_id: number;
    first_surname?: string;
    second_surname?: string;
    sale_rent: number;
    is_blocked: number;
    is_finalized: number;
    lead_status_closer: number;
    lead_status_bank: number;
    lead_status_noatary: number;
    broker_assign_action: number;
    closer_assign_action: number;
    bank_assigned_at: Date;
    noatary_assigned_at: Date;
    property_id: number;
    configuration: Array<Configuration>;
    admin: UserModel;
    user: Users;
    selected?: any;
}

export class AddPrefrences {
    lead_id: string;
    family_size: number;
    kid_count: number;
    car_type_id: number;
    pets: number;
    planning_to_buy: Date;
    min_price: number;
    max_price: number;
    looking_for: number;
    bedroom: number;
    bathroom: number;
    half_bathroom: number;
    proximity_other: string;
    payment_plans: Array<number>;
    property_purpose: Array<number>;
    amenities: Array<number>;
    proximity_place_ids: Array<number>;
    property_types: Array<number>;
    bedrooms: Array<any>;
    bathrooms: Array<number>;
    half_bedrooms: Array<number>;
}
