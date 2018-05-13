/**
 * Product Order
 */
export class Order {
    id: number;
    location: string;
    commentary: string;
    //productId: number;
    total: number;
    prepay: number;
    userId: number;
    clientId: number;
    discountId: number;
    removed: boolean;
    date: Date;
    datePrepay: Date;
    productsId: Array<number>;
    label: string;
}
export class OrderInfo {
    id: number;
    date: Date;
    clientId: number;
    label: string;
    location: string;
    removed: boolean;    
}
