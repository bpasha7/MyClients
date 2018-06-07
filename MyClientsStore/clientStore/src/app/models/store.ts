import { Product } from './product';

export class Store {
    id: number;
    visits: number;
    avarage: number;
    about: string;
    name: string;
    userName: string;
    products: Array<Product>;
}
