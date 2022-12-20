import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { fetchProducts } from './api'
import { products } from './interface'


//lokal variabel som innehåller alla produkter från server
let productsCard: products[] = []

// test för att få eventlistener att fungerar på rederad data
// let isRend = false

const getProducts = async () => {
  
  productsCard = await fetchProducts()
  if (productsCard.length > 0){
      console.log(productsCard)


    renderProducts(productsCard);

    // test för att få eventlistener att fungerar på rederad data
    // isRend = true
    }
}


getProducts()

function renderProducts(array:products[]) {
	// Render not completed todos
	document.querySelector('main')!.innerHTML = array
		.map(product=> (`
        <div class="card">
        <img src="https://www.bortakvall.se/${product.images.thumbnail}" alt="product">
        <h1 class="name">${product.name}</h1>
        <p class="price">${product.price}kr</p>
<<<<<<< HEAD
        <a href="('some html', yourWindowName')" class="info">More info</a>
=======
        <a href="" class="info">More info</a>
>>>>>>> US-1
        <p><button class="button" data-id="${product.id}">Add to Cart</button></p>
      </div>
		`)).join('')
		
}


<<<<<<< HEAD
document.querySelector<HTMLButtonElement>('.info')?.addEventListener('click', async (e) =>{
  
  //fungerar inte med Anchor!
  // e.preventDefault()

  await console.log('hej')
    
    
    
=======
document.querySelector('.button')?.addEventListener('click', (e) => {

    e.defaultPrevented
    console.log(e.target);

})

// Open Cart
document.querySelector('.cart-icon')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.remove('d-none')
})

// Close cart
document.querySelector('.cart-close')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.add('d-none')
>>>>>>> US-1
})