
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
    min_price: string;
    max_price: string;
    price_range: Array<Number>;
    planning_to_buy: Date;
    proximity_place_ids: Array<number>;
    configuration: Array<Object>;
}
