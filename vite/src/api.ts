import {products} from './interface'


export const fetchProducts = async () => {
    const res = await fetch('https://www.bortakvall.se/api/products/')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    const result = await res.json()
    return result.data
    // return await res.json() as products[]
    
}
