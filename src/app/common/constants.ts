export class Constant {
    public projectName = 'Sozu';
    public itemsPerPage = 10;
    public limit4 = 4;
    public p = 1;
    public flag = 2;    // this month
    public count_flag = 1;      // dashboard filters
    public dash_flag = 2;
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
    public zoom = 16;
    public middleDot = ' · ';
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
    public decimalPattern = '^\d+\.?\d{0,2}$';  // not allow more than 2 digits after decimal
    public onlyWhiteSpaces = '.*\\S.*[a-zA-z0-9 ]'; // '^[a-zA-Z1-9].*'; // [\w,./_=?-]+
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
        user_seller_dev: 8,
        user: 0 // just for frontend
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
        BLOCK_DEVELOPER : 'You want to block this developer?',
        UNBLOCK_DEVELOPER : 'You want to unblock this developer?',
        BLOCK_AGENCY : 'You want to block this agency?',
        UNBLOCK_AGENCY : 'You want to unblock this agency?',
        BLOCK_COMPANY : 'You want to block this company?',
        UNBLOCK_COMPANY : 'You want to unblock this company?',
        BLOCK_LEAD : 'You want to block this lead?',
        UNBLOCK_LEAD : 'You want to unblock this lead?',
        DELETE_BLOG: 'You want to delete this template?'
    };
}
