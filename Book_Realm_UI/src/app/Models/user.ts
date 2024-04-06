export interface User{
    id:number;
    name:string;
    email:string;
    password:string;
    mobile:string;
    role:string;
    birthDate:string;
    addressId:number;
    cartId:number;
    wishlistId:number;
    reviews:number[];
    orders:number[];
}