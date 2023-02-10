export interface products {
    id: number,
    name: string,
    description: string,
    price: number,
    on_sale: boolean,

    //Stämmer denna kod?? Titta upp!
    images: {
        thumbnail: string,
        large: string
    },
    
    stock_status: string,
    stock_quantity: null
}


export interface order_items {
    product_id: number,
    qty: number,
    item_price:number,
    item_total:number,
}

export interface newData  {
    customer_first_name: string,
    customer_last_name: string,
    customer_address: string,
    customer_postcode: string,
    customer_city: string,
    customer_phone_number?: number,
    customer_email:string,
    order_total: number,
    order_items: order_items[],
}

export interface OrderResponse  {
    order_id: number,
    customer_first_name: string,
    customer_last_name: string,
    customer_address: string,
    customer_postcode: string,
    customer_city: string,
    customer_phone_number?: number,
    customer_email:string,
    order_total: number,
    order_items: order_items[],
}

