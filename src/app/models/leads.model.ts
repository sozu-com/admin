
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
    family_size: string;
    car_type_id: string;
    pets: string;
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
