export interface Publisher{
    id: number;
    name: string;
    email: string;
    password: string;
    role:string;
    addressId: number;
    cartId: number;
    wishlistId: number;
    orders: number[];
    reviews: number[];
    description: string;
    foundationDate: string;
    websiteUrl: string;
    publishedBooks: number[];   
}