export class CollectionReport {
    start_date: Date;
    end_date: Date;
    start_purchase_date : Date;
    end_purchase_date : Date;
    developer_id: Array<number>;
    building_id: Array<number>;
    building_towers_id?: Array<number>;
    floor_num: number;
    property_id: Array<number>;
    currency_id: number;
    buyer_id: number;
    month?: number;
    year?: number;
    property_name?: string;
    name?: string;
    seller_name?: string;
    buyer_name?: string;
    sort_sales_by?: number;
    amountPaidByUser?: any;
}
