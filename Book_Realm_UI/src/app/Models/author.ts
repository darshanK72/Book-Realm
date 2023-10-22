export interface Author{
    id: number;
    name: string;
    email: string;
    password: string;
    role:string;
    birthDate: string;
    addressId: number;
    cartId: number;
    wishlistId: number;
    reviews: number[];
    orders: number[];
    description:string;
    publishedBooks:number[];
}