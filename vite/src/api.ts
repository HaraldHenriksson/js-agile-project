export interface products {
    id?: number,
    name: string,
    description: string,
    price: number,
    on_sale: boolean,

    //Stämmer denna kod?? Titta upp!
    images: []
        thumbnail: string,
        large: string
    ,

    
    stock_status: string,
    stock_quantity: null
},