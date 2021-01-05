export class Constant {
    public projectName = 'Sozu';
    public itemsPerPage = 10;
    public limit4 = 4;
    public p = 1;
    public flag = 2;    // this month
    public count_flag = 1;      // dashboard filters
    public dash_flag = 0;
    public country_code = 'mx';
    public dial_code = '+52';
    public propertyPlaceholder = 'assets/img/placeholder.png';
    public floorMapPlaceholder = 'assets/img/placeholder.png';
    public userPlaceholder = 'assets/img/default_usr.png';
    public initialCountry = 'mx';
    public minValue = 0;
    public maxValue = 1000000; // 1000000000;
    public fileSizeLimit = 60000000; // 60MB
    public pdfSizeLimit = 300000000; // 300MB
    public steps = 1000;
    public zoom = 16;
    public middleDot = ' · ';
    public language = [
        {
            code: 'en',
            label: 'English'
        },
        {
            code: 'es',
            label: 'Español'
        }
    ];
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
    public phonePattern = '^[0-9]{8,15}$';
    public accountPattern = '^[0-9]{8,20}$';
    public numberPattern = '^[0-9]+$';
    public decimalPattern = '^\d+\.?\d{0,2}$';  // not allow more than 2 digits after decimal
    public onlyWhiteSpaces = '.*\\S.*[a-zA-z0-9 ]'; // '^[a-zA-Z1-9].*'; // [\w,./_=?-]+
    public emailPattern = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';
    public emailPatternNew = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$';
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
}
