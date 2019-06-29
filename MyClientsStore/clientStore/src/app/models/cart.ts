import { CartItem } from "./cartItem";
import { Product } from "./product";

export class Cart {
    private _items: { [id: number]: CartItem };
    dateCreated: Date;
    constructor() {
        this._items = {};
        this.dateCreated = new Date();
    }
    addItem(product: Product, qty: number = 1) {
        if (!this._items[product.id]) {
            const item = new CartItem();
            item.product = product;
            item.qty = qty;
            this._items[product.id] = item;
        } else {
            this._items[product.id].qty += qty;
            if (this._items[product.id].qty === 0) {
                delete this._items[product.id];
            }
        }
    }
    deleteItem(id: number) {
        if (this._items[id]) {
            delete this._items[id];
        }
    }
    get items():Array<CartItem> {
        const cart: Array<CartItem> = [];
        for(var id in this._items) {
            cart.push(this._items[id]);
        }
        return cart;
    }

    get total():number {
        let sum = 0;
        for(var id in this._items) {
            sum += this._items[id].product.price * this._items[id].qty;
        }
        return sum;
    }
}
