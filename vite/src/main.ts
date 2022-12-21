import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { fetchProducts } from './api'
import { products } from './interface'


//lokal variabel som innehåller alla produkter från server
let productsCard: products[] = []

// test för att få eventlistener att fungerar på rederad data
// let isRend = false

//Hämtning av produkter från API
const getProducts = async () => {
  
  productsCard = await fetchProducts()
  if (productsCard.length > 0){

console.log("Samtliga produkter", productsCard);

      //Rendering av produkter
    renderProducts(productsCard);

    // test för att få eventlistener att fungerar på rederad data
    // isRend = true
    }
}


getProducts()

//rendering av produkter på main sida
function renderProducts(array:products[]) {

	document.querySelector('.grid-container')!.innerHTML = array
		.map(product=> (`
        <div class="card">
        <img src="https://www.bortakvall.se/${product.images.thumbnail}" alt="product">
        <h1 class="name">${product.name}</h1>
        <p class="price">${product.price}kr</p>
        <button class="info" data-id="${product.id}">More info</button>
        <div id="${product.id}" class="card-inner d-none">
      <div class="card-body">
        ${product.description}
      </div>
      </div>
      <button class="button" data-id="${product.id}">Add to Cart</button>
    </div>
    </div>
   
      
		`)).join('')
		
// type of "function" that target the product and displays its description with toggle effect
    const infoBtns = document.querySelectorAll('.info')
    console.log(infoBtns);
    infoBtns.forEach((btn) => {

      btn.addEventListener('click', (e) => {

        const target = e.target as HTMLElement
        const productId = parseInt(target.dataset.id!)
        const infos = document.querySelectorAll('.card-inner')
        
        infos!.forEach((info) => {
        if (parseInt(info.id)=== productId){
          info.classList.toggle('d-none')
          }
        })
      })
    })


   
  




document.querySelector('#mInfo')?.addEventListener('click', (e) => {
  console.log('hej');
  const target = e.target as HTMLElement
  console.log(target.dataset);
  
  document.querySelector('.mInfo')?.classList.toggle('d-none') 
  
  })

}

// Add to cart button
// 1. - X - När man klickar på knappen "Add to cart" ska produkt data sparas ner som objekt i en array
// 2. - X - Arrayen görs om till en JSON-string och sparas local-storage
// 3. Hämta data till varukorgen genom att läsa från Local-storage och sedan göra om det till Array-objekt.
const getJson = localStorage.getItem('products') ?? '[]'
const cartItemData:any[] = JSON.parse(getJson)

document.querySelector('.grid-container')!.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement
    if(target.dataset.id) {
        let selectedItem = productsCard ? productsCard.filter(post => {
            return post.id === Number(target.dataset.id)
        }) : null
        cartItemData.push({
            id: selectedItem![0].id,
            name: selectedItem![0].name,
            description: selectedItem![0].description,
            price: selectedItem![0].price,
            image: selectedItem![0].images.thumbnail,
            selected: 1 // Hur många produkter kunder väljer
        })
        saveItem()
    }
})

// Save product to local storage
let jsonItem = ``
const saveItem = () => {
    jsonItem = JSON.stringify(cartItemData)
    localStorage.setItem('products', jsonItem)
    document.querySelector('.cart-item-number')!.innerHTML = `${cartItemData.length}`
}

//Render cart with products
const viewCart = () => {
    let productCounter = 1
    document.querySelector('#itemcollection')!.innerHTML = cartItemData.map(product => `
       <tr>
        <th scope="row">${productCounter++}</th>
        <td><img src="https://www.bortakvall.se/${product.image}" class="img-fluid rounded cart-image" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td><span class="add">+</span> ${product.selected} <span class="remove">-</span></td>
        <td>${product.price}</td>
        <td>${product.price * product.selected}</td>
        <td><span class="material-symbols-outlined trash">delete</span></td>
    </tr>
    `).join('')
}

// Open Cart
document.querySelector('.cart-icon')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.remove('d-none')
    viewCart()
})

// Close cart
document.querySelector('.cart-close')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.add('d-none')
})






