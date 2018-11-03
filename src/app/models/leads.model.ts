
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
}

export class FillInformation {
    lead_id: number;
    family_size: number;
    car_type_id: string;
    pets: string;
    kid_count: string;
    min_price: number;
    max_price: number;
    price_range: Array<number>;
    planning_to_buy: Date;
    proximity_place_ids: Array<number>;
    car_types: Array<CarTypes>;
    proximity_places: Array<number>;
    property_types: Array<number>;
    configurations: Array<number>;
    proximity_places_array: Array<ProximityPlaces>;
    property_types_array: Array<PropertyTypes>;
    configurations_array: Array<Configuration>;
}

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
    statua: any;
    commision: number;
    banks: Array<BankAssigned>;
    noataries: Array<NotaryAssigned>;
    selected_documents: Array<Documents>;
    allDocuments: Array<Documents>;
    uploaded_documents: Array<UploadedDocuments>;
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
