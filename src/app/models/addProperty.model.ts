export class CarpetAreas{
    carpet_areas : Array<object> = [
        {
            area: 0,
            price: 0
        }
    ]
}

export class AddPropertyModel{
    id: string = '';
    for_rent: boolean = false;
    for_sale: boolean = false;
    country_id: string = '';
    state_id: string = '';
    city_id: string = '';
    locality_id: string = '';
    configuration_id: string = '';
    carpet_areas : Array<object> = [
        {
            area: 0,
            price: 0
        }
    ];
    property_type_id: string = '';
    property_id: string = '';
    cover_image: File;
    images: Array<File>
    floor_plan: File
    bedroom: string = '0';
    bathroom: string = '0';
    floor: string = '0';
    parking: string = '0';
    furnished: string = '0';
    description: string = '';
    quantity: string = '0';
    amenities: number[];
    banks: number[];
    pets: string = '0';
    marital_status: string = '0';
    custom_attributes: Array<object> = [
        {
            name: '',
            value: ''
        }
    ]
}