export class Constant {
    public projectName = 'Kanguroo';
    public itemsPerPage = 10;
    public limit4 = 4;
    public p = 1;
    public country_code = 'mx';
    public dial_code = '+52';
    public propertyPlaceholder = 'assets/img/placeholder.png';
    public floorMapPlaceholder = 'assets/img/placeholder.png';
    public userPlaceholder = 'assets/img/default_usr.png';
    public initialCountry = 'mx';
    public minValue = 0;
    public maxValue = 1000000; // 1000000000;
    public fileSizeLimit = 25000000; // 25MB
    public steps = 1000;
    public months = [
        {id: 1, name: 'JAN'},
        {id: 2, name: 'FEB'},
        {id: 3, name: 'MAR'},
        {id: 4, name: 'APR'},
        {id: 5, name: 'MAY'},
        {id: 6, name: 'JUN'},
        {id: 7, name: 'JUL'},
        {id: 8, name: 'AUG'},
        {id: 9, name: 'SEP'},
        {id: 10, name: 'OCT'},
        {id: 11, name: 'NOV'},
        {id: 12, name: 'DEC'}
    ];
    public confirmButtonColor = '#00b96f';
    public cancelButtonColor = '#ee7b7c';
    public phonePattern = '^[0-9]{5,15}$';
    public emailPattern = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';
    // public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    // ^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$
    // ^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$
    public userType = {
        csr_buyer: 1,
        inhouse_broker: 2,
        csr_closer: 3,
        csr_seller: 4,
        bank: 5,
        notary: 6,
        user_buyer: 7,
        user_seller_dev: 8
    };

    public buildingStatus = {
        1: 'Live',
        2: 'Pending Data',
        3: 'Submitted for approval',
        4: 'Rejected',
        5: 'Update requested',
        6: 'Hidden',
        7: 'Deleted'
    };

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
        SAVE_ENGLISH_DOCUMENT_NAME : 'Please add document name in Spanish or we will update it same as in English.',
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
        NO_INTERESTED_PROPERTY_FOUND : 'No interests added by user.',
        NO_VIEWED_PROPERTY_FOUND : 'No property or project viewed by you.',
        NO_NOTE_FOUND : 'No notes to show.',
        FILE_SIZE_EXCEEDS : 'The file you have selected is too large. The maximum size is 25MB.'
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
        DOCUMENT_NAME_UPDATED_SUCCESSFULLY: 'Document name updated successfully',
        DOCUMENT_NAME_ADDED_SUCCESSFULLY: 'Document name added successfully',
        PROJECT_TYPE_UPDATED_SUCCESSFULLY: 'Project type updated successfully',
        PROJECT_TYPE_ADDED_SUCCESSFULLY: 'Project type added successfully',
        STATE_ADDED_SUCCESSFULLY : 'State added successfully',
        STATE_UPDATED_SUCCESSFULLY : 'State updated successfully',
        CITY_ADDED_SUCCESSFULLY : 'City added successfully',
        CITY_UPDATED_SUCCESSFULLY : 'City updated successfully',
        BLOCKED_SUCCESSFULLY : 'Blocked successfully',
        UNBLOCKED_SUCCESSFULLY : 'Unblocked successfully',
        NOTE_ADDED_SUCCESSFULLY : 'Note added successfully',
        NOTE_DELETED_SUCCESSFULLY : 'Note deleted successfully',
        DETAILS_UPDATED_SUCCESSFULLY : 'Details updated successfully',
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
        BLOCK_LEAD : 'You want to block this lead?',
        UNBLOCK_LEAD : 'You want to unblock this lead?',
        DELETE_BLOG: 'You want to delete this template?'
    };
}
