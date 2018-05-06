/**
 * Product Order
 */
export class Order {
    id: number;
    location: string;
    commentary: string;
    productId: number;
    total: number;
    prepay: number;
    userId: number;
    clientId: number;
    removed: boolean;
    date: Date;
    datePrepay: Date;
}
