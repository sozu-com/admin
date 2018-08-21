export class Constant {
    public itemsPerPage = 10;
    public p = 1;
    public country_code = 'mx';
    public dial_code = '52';
    public userPlaceholder = '../../../assets/img/default_usr.png';
    public initialCountry = 'mx';
    // public SERVER_URL = 'http://45.232.252.136:8080';
    public SERVER_URL = 'http://kanguroo.com.mx:8080';
    public errorMsg: any = {
        COUNTRY_NAME_REQUIRED : 'Please enter country.',
        STATE_NAME_REQUIRED : 'Please enter state.',
        CITY_NAME_REQUIRED : 'Please enter city.',
        PROPERTY_TYPE_REQUIRED : 'Please enter name.',
        PRICE_PER_SQFT_REQUIRED: 'Please enter price per sqft.',
        PRICE_PER_SQFT_MIN: 'Price per sqft must be greater than 1',
        FILE_REQUIRED : 'Please choose file.',
        PROPERTY_CONFIG_REQUIRED : 'Please enter name.',
        MISSING_COUNTRY_NAME_ES : 'Country name is missing in spanish.',
        SAVE_ENGLISH_COUNTRY_NAME : 'Please add country name in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_STATE_NAME : 'Please add state name in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_CITY_NAME : 'Please add city name in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_PROPERTY_CONFIG : 'Please add property configuration in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_PROPERTY_TYPE : 'Please add property type in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_AMENITY : 'Please add amenity in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_PROJECT_POSSESION : 'Please add possession status in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_PROJECT_TYPE : 'Please add property type in Spanish or we will update it same as in English.',
        SAVE_ENGLISH_PROJECT_AMENITY : 'Please add amenity in Spanish or we will update it same as in English.',
        NO_COUNTRY_FOUND : 'No country found!',
        NO_STATE_FOUND : 'No state found!',
        NO_CITY_FOUND : 'No city found!',
        NO_LOCATION_FOUND: 'No location found!',
        NO_LOCALITY_FOUND: 'No locality found!',
        NO_CONFIGURATION_FOUND : 'No property configuration found!',
        NO_PROPERTY_TYPE_FOUND : 'No property type found!',
        NO_AMENITY_FOUND : 'No amenity found!',
        NO_POSSESSION_FOUND : 'No project possession status found!',
        NO_PROJECT_TYPE_FOUND : 'No project type found!',
        NO_PROJECT_AMENITY_FOUND : 'No amenity found!',
        NO_USER_FOUND : 'No user found!',
        NO_INTERESTED_PROPERTY_FOUND : 'No interested property found. Click Add button to add property.'
    };
    public successMsg: any = {
        COUNTRY_ADDED_SUCCESSFULLY : 'Country added successfully',
        COUNTRY_UPDATED_SUCCESSFULLY: 'Country updated successfully',
        PROPERTY_CONFIG_UPDATED_SUCCESSFULLY: 'Property configuration updated successfully',
        PROPERTY_CONFIG_ADDED_SUCCESSFULLY: 'Property configuration added successfully',
        PROPERTY_TYPE_UPDATED_SUCCESSFULLY: 'Property type updated successfully',
        PROPERTY_TYPE_ADDED_SUCCESSFULLY: 'Property type added successfully',
        AMENITY_UPDATED_SUCCESSFULLY: 'Amenity updated successfully',
        AMENITY_ADDED_SUCCESSFULLY: 'Amenity added successfully',
        PROJECT_POSSESSION_UPDATED_SUCCESSFULLY: 'Project possession status updated successfully',
        PROJECT_POSSESSION_ADDED_SUCCESSFULLY: 'Project possession status added successfully',
        PROJECT_TYPE_UPDATED_SUCCESSFULLY: 'Project type updated successfully',
        PROJECT_TYPE_ADDED_SUCCESSFULLY: 'Project type added successfully',
        STATE_ADDED_SUCCESSFULLY : 'State added successfully',
        STATE_UPDATED_SUCCESSFULLY : 'State updated successfully',
        CITY_ADDED_SUCCESSFULLY : 'City added successfully',
        CITY_UPDATED_SUCCESSFULLY : 'City updated successfully',
        BLOCKED_SUCCESSFULLY : 'Blocked successfully',
        UNBLOCKED_SUCCESSFULLY : 'Unblocked successfully',
    };
    public title: any = {
        ARE_YOU_SURE: 'Are you sure',
        BLOCK_COUNTRY : 'You want to block this country?',
        UNBLOCK_COUNTRY : 'You want to unblock this country?',
        BLOCK_STATE : 'You want to block this state?',
        UNBLOCK_STATE : 'You want to unblock this state?',
        BLOCK_CITY : 'You want to block this city?',
        UNBLOCK_CITY : 'You want to unblock this city?',
        BLOCK_LOCALITY : 'You want to block this locality?',
        UNBLOCK_LOCALITY : 'You want to unblock this locality?',
        BLOCK_PROPERTY_TYPE : 'You want to block this property type?',
        UNBLOCK_PROPERTY_TYPE : 'You want to unblock this property type?',
        BLOCK_PROPERTY_CONFIG : 'You want to block this property configuration?',
        UNBLOCK_PROPERTY_CONFIG : 'You want to unblock this property configuration?',
        REMOVE_PROPERTY_CONFIGURATION : 'You want to block this configuration?',
        UNBLOCK_AMENITY : 'You want to unblock this amenity?',
        BLOCK_AMENITY : 'You want to block this amenity?',
        BLOCK_PROJECT_TYPE : 'You want to block this project type?',
        UNBLOCK_PROJECT_TYPE : 'You want to unblock this project type?',
        BLOCK_PROJECT_POSSESSION : 'You want to block this project possession status?',
        UNBLOCK_PROJECT_POSSESSION : 'You want to unblock this project possession status?',
        BLOCK_USER : 'You want to block this user?',
        UNBLOCK_USER : 'You want to unblock this user?',
    };
}
