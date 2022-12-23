// import {products} from './interface'
import { newData } from './interface'



export const post = async (person: newData) => {
const customer = JSON.stringify(person)
  
    const res = await fetch('https://www.bortakvall.se/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: customer
      
    })
    console.log(JSON.stringify(person));
    if (!res.ok){
      
        alert('Something went wrong, try again later')
      throw new Error(`${res.status} ${res.statusText}`)
    } else {
      document.querySelector('#alertBox')!.classList.remove('d-none')
      document.querySelector('.cart-container')!.classList.add('d-none')
    }
    
    console.log(res.status);
    
    return await res.json()
    console.log(customer);
    
    
  }


  export const fetchProducts = async () => {
    const res = await fetch('https://www.bortakvall.se/api/products/')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    const result = await res.json()


    return result.data
    // return await res.json() as products[]
    
}
