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
<<<<<<< HEAD
        <a href="" class="info">More info</a>
        <div class="card d-none">
      <div class="card-body">
        <h5 class="card-title">En mix av lakrits och gelé med fruktsmak</h5>
        <p class="card-text">Innehållsförteckning: Socker, glukossirap, glukos-fruktossirap, stärkelse, VETEMJÖL, melass, syra (citronsyra), fuktighetsbevarande medel (sorbitoler, glycerol), lakritsextrakt, salt, vegetabiliska oljor (kokos, palm), aromer, färgämnen (E153, E120, E100, E141), ytbehandlingsmedel (bivax), stabiliseringsmedel (E471)</p>

      </div>
    </div>
=======
        <a href="javascript:;" class="info">More info</a>
>>>>>>> US-1
        <p><button class="button" data-id="${product.id}">Add to Cart</button></p>
      </div>
		`)).join('')
		
    document.querySelector('.button')?.addEventListener('click', (e) => {
      e.defaultPrevented
      console.log();
      
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






