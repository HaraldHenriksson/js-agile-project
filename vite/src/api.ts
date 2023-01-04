import { newData } from './interface'

export const fetchProducts = async () => {
    const res = await fetch('https://www.bortakvall.se/api/products/')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    const result = await res.json()

    return result.data
}

export const post = async (person: newData) => {

    const res = await fetch('https://www.bortakvall.se/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person)
    })
    
    if (!res.ok) {
        alert('Something went wrong, try again later')
      throw new Error(`${res.status} ${res.statusText}`)
    } else { }

    return await res.json() as newData[]
  }