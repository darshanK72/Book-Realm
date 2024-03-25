export interface Book{
    id:string;
    title:string;
    rating:number;
    description:string;
    publishDate:string;
    images:string[];
    price:number;
    discountPercentage:number;
    pages:number;
    bookFormat:string;
    language:string;
    tags:string[];
    reviews:number[];
    authorName:string;
    authorId:number;
    publisherName:string;
    publisherId:number;
    genreId:number;
    subgenreId:string;
}