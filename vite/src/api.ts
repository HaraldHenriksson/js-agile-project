import {products} from './interface'
import { newData } from './interface'


export const fetchProducts = async () => {
    const res = await fetch('https://www.bortakvall.se/api/products/')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    const result = await res.json()


    return result.data
    // return await res.json() as products[]
    
}

const newData = {
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

export const post = async () => {
    const res = await fetch('https://www.bortakvall.se/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData)
    })
  
    if (!res.ok) {
      throw new Error('${res.status} ${res.statusText}')
    }
    return await res.json() as newData
  }