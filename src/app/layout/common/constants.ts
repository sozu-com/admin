export class Constant{
    public limit: number = 10;
    public userPlaceholder: string = '../../../assets/img/default_usr.png';
    public errorMsg : any = {
        COUNTRY_NAME_REQUIRED : 'Country is required.',
        STATE_NAME_REQUIRED : 'State is required.',
        CITY_NAME_REQUIRED : 'City is required.',
        MISSING_COUNTRY_NAME_ES : 'Country name is missing in spanish.',
        SAVE_ENGLISH_COUNTRY_NAME : "We'll save english country name in place of spanish.",
        SAVE_ENGLISH_STATE_NAME : "We'll save english state name in place of spanish.",
        SAVE_ENGLISH_CITY_NAME : "We'll save english city name in place of spanish.",
        NO_COUNTRY_FOUND : "No country found!",
        NO_STATE_FOUND : "No state found!",
        NO_CITY_FOUND : "No city found!",
    };
    public successMsg : any = {
        COUNTRY_ADDED_SUCCESSFULLY : 'Country added successfully',
        COUNTRY_UPDATED_SUCCESSFULLY: 'Country updated successfully',
        STATE_ADDED_SUCCESSFULLY : 'State added successfully',
        STATE_UPDATED_SUCCESSFULLY : 'State updated successfully',
        CITY_ADDED_SUCCESSFULLY : 'City added successfully',
        CITY_UPDATED_SUCCESSFULLY : 'City updated successfully',
        BLOCKED_SUCCESSFULLY : 'Blocked successfully',
        UNBLOCKED_SUCCESSFULLY : 'Unblocked successfully',
    };
    public title : any = {
        ARE_YOU_SURE: 'Are you sure?',
        BLOCK_COUNTRY : 'You want to block this country?',
        UNBLOCK_COUNTRY : 'You want to unblock this country?',
        BLOCK_STATE : 'You want to block this state?',
        UNBLOCK_STATE : 'You want to unblock this state?',
        BLOCK_CITY : 'You want to block this city?',
        UNBLOCK_CITY : 'You want to unblock this city?'
    }
}