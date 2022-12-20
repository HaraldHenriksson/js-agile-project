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
      console.log(productsCard)


      //Rendering av produkter
    renderProducts(productsCard);

    // test för att få eventlistener att fungerar på rederad data
    // isRend = true
    }
}


getProducts()

//rendering av produkter på main sida
function renderProducts(array:products[]) {

	document.querySelector('main')!.innerHTML = array
		.map(product=> (`
        <div class="card">
        <img src="https://www.bortakvall.se/${product.images.thumbnail}" alt="product">
        <h1 class="name">${product.name}</h1>
        <p class="price">${product.price}kr</p>
        <a href="javascript:;" id="mInfo" data-id="${product.id}" class="info">More info</a>
        <p><button class="button">Add to Cart</button></p>
      </div>
		`)).join('')
		
    // more info button + gettin ID from target

   
  




document.querySelector('#mInfo')?.addEventListener('click', (e) => {
  console.log('hej');
  const target = e.target as HTMLElement
  console.log(target.dataset);
  
  document.querySelector('.mInfo')?.classList.toggle('d-none') 
  
  })
    
}

// Open Cart
document.querySelector('.cart-icon')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.remove('d-none')
})

// Close cart
document.querySelector('.cart-close')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.add('d-none')
})






