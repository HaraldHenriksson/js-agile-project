export interface products {
    id?: number,
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

export interface newData  {
    "customer_first_name": [
        "myfirstname"
    ],
    "customer_last_name": [
        "mylastname"
    ],
    "customer_address": [
        "adress 5"
    ],
    "customer_postcode": [
        "234 40"
    ],
    "customer_city": [
        "malmö"
    ],
    "customer_email": [
        "email@email.com"
    ],
    "order_total": [
        "52"
    ],
    "order_items": [
        "The 'order_items' field must be an array with at least 1 object."
    ]
}