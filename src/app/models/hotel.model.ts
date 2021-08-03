export class Hotel {
    public possession = {
        id: '',
        name_es: '',
        name_en: '',
        status: 0
    };

    public type = {
        id: '',
        name_es: '',
        name_en: '',
        status: 0
    };

    public amenities = {
        id: '',
        icon: '',
        name_es: '',
        name_en: '',
        status: 0
    };

    public parkingLotSpaces = {
        id: '',
        icon: '',
        name_es: '',
        name_en: '',
        status: 0
    };
}

export class Amenities {
    id: string;
    icon: string;
    name_es: string;
    name_en: string;
    status: string;
}

export class ParkingLotSpaces {
    id: string;
    icon: string;
    name_es: string;
    name_en: string;
    status: string;
}
