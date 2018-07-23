export class Location{
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
