export class Location {
    public countryModel = {
        country_id: '',
        name_es: '',
        name_en: '',
        status: 0
    };

    public stateModel = {
        country_id: '',
        state_id: '',
        name_es: '',
        name_en: '',
        status: 0
    };

    public cityModel = {
        country_id: '',
        state_id: '',
        city_id: '',
        name_es: '',
        name_en: '',
        status: 0
    };

    public localityModel = {
        city_id: '',
        locality_id: '',
        name_es: '',
        name_en: '',
        status: 0,
        poly_coordinates: []
    };
}

export class Country {
    id: string;
    name: string;
    name_es: string;
    name_en: string;
    status: string;
}

export class State {
    id: string;
    country_id: string;
    name: string;
    name_es: string;
    name_en: string;
    status: string;
    country?: Country;
}

export class City {
    id: string;
    state_id: string;
    name: string;
    name_es: string;
    name_en: string;
    status: string;
    state?: State;
}
