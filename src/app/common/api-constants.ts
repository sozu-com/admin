export class ApiConstants {
    public possession_status_id = '9'; // pre-sale
    public payment_method_id = '1'; // pre-sale
    public possessionStatus = {
        preSale: 9,
        sale: 8
    };
    public projectStatus = {
        // approved: 1,
        // rejected: 2
        all: '',
        without_information: 0,
        basic_information: 2,
        semicompleted: 3,
        completed: 1
    };
    public propertyStatus = {
        inDraft: 1,
        pending: 2,
        approve: 3,
        unapprove: 4
    };
}
