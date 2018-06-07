/**
 * User Model
 */
export class User {
    id: number;
    login: string;
    password: string;
    birthday: Date;
    email: string;
    name: string;
    hasPhoto: boolean;
    bonusBalance: number;
}
