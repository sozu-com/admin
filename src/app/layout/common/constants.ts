export class Constant {
    public limit: number = 10;
    public userPlaceholder: string = '../../../assets/img/default_usr.png';
    public errorMsg : any = {
        COUNTRY_NAME_REQUIRED : 'Country is required.',
        STATE_NAME_REQUIRED : 'State is required.',
        CITY_NAME_REQUIRED : 'City is required.',
        PROPERTY_TYPE_REQUIRED : 'Name is required.',
        PROPERTY_CONFIG_REQUIRED : 'Name is required.',
        MISSING_COUNTRY_NAME_ES : 'Country name is missing in spanish.',
        SAVE_ENGLISH_COUNTRY_NAME : "We'll save english country name in place of spanish.",
        SAVE_ENGLISH_STATE_NAME : "We'll save english state name in place of spanish.",
        SAVE_ENGLISH_CITY_NAME : "We'll save english city name in place of spanish.",
        SAVE_ENGLISH_PROPERTY_CONFIG : "We'll save english property configuration in place of spanish.",
        SAVE_ENGLISH_PROPERTY_TYPE : "We'll save english property type in place of spanish.",
        SAVE_ENGLISH_AMENITY : "We'll save english amenity in place of spanish.",
        NO_COUNTRY_FOUND : "No country found!",
        NO_STATE_FOUND : "No state found!",
        NO_CITY_FOUND : "No city found!",
        NO_CONFIGURATION_FOUND : "No property configuration found!",
        NO_PROPERTY_TYPE_FOUND : "No property type found!",
        NO_AMENITY_FOUND : "No amenity found!",
    };
    public successMsg : any = {
        COUNTRY_ADDED_SUCCESSFULLY : 'Country added successfully',
        COUNTRY_UPDATED_SUCCESSFULLY: 'Country updated successfully',
        PROPERTY_CONFIG_UPDATED_SUCCESSFULLY: 'Property configuration updated successfully',
        PROPERTY_CONFIG_ADDED_SUCCESSFULLY: 'Property configuration added successfully',
        PROPERTY_TYPE_UPDATED_SUCCESSFULLY: 'Property type updated successfully',
        PROPERTY_TYPE_ADDED_SUCCESSFULLY: 'Property type added successfully',
        AMENITY_UPDATED_SUCCESSFULLY: 'Amenity updated successfully',
        AMENITY_ADDED_SUCCESSFULLY: 'Amenity added successfully',
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
        UNBLOCK_CITY : 'You want to unblock this city?',
        BLOCK_PROPERTY_TYPE : 'You want to block this property type?',
        UNBLOCK_PROPERTY_TYPE : 'You want to unblock this property type?',
        BLOCK_PROPERTY_CONFIG : 'You want to block this property configuration?',
        UNBLOCK_PROPERTY_CONFIG : 'You want to unblock this property configuration?',
        REMOVE_PROPERTY_CONFIGURATION : 'You want to block this configuration?',
        UNBLOCK_AMENITY : 'You want to unblock this amenity?',
        BLOCK_AMENITY : 'You want to block this amenity?'
    }
}