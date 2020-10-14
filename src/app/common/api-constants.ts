export class ApiConstants {
    public possession_status_id = '9'; // pre-sale
    public payment_method_id = '1'; // pre-sale
    public possessionStatus = {
        preSale: 9,
        sale: 8
    };
    public projectStatus = {
        approved: 1,
        rejected: 2
    };
    public propertyStatus = {
        inDraft: 1,
        pending: 2,
        approve: 3,
        unapprove: 4
    };
}
