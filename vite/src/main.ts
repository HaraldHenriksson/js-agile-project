import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { fetchProducts } from './api'
import { products } from './interface'
import { post } from './api'
import { newData } from './interface'




//lokal variabel som innehåller alla produkter från server
let productsCard: products[] = []


//Hämtning av produkter från API
const getProducts = async () => {
  
  productsCard = await fetchProducts()
  if (productsCard.length > 0){

console.log("Samtliga produkter", productsCard);

      //Rendering av produkter
    renderProducts(productsCard);
    document.querySelector('.productsQty')!.innerHTML = `Vi har sjukt nog  ${productsCard.length} olika sorters godis, fräckt!`
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
      <div class="popup-close">X</div>
      <img src="https://www.bortakvall.se/${product.images.thumbnail}" class="thumbnail-img" alt="product">
        <h1 class="name">${product.name}</h1>
        <p class="price">${product.price}kr</p>
        ${product.description}
      </div>
      </div>
      <button class="button" data-idcart="${product.id}">Add to Cart</button>
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

    // pop close when clicking outside of div and "X"
    const popUp = document.querySelectorAll('.card-inner')
    const close = document.querySelectorAll('.popup-close')

    popUp.forEach((pop, index) => {
      pop?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
      
        if (target === close[index]){
          pop?.classList.toggle('d-none')
        }
        
        if (target === pop){
          pop?.classList.toggle('d-none')
        }
      })
    })
  
  document.querySelector('#checkout')?.addEventListener('click', () => {
    document.querySelector('.contact-form')!.classList.remove('d-none')
    document.querySelector('#checkout')!.classList.add('d-none')
    document.querySelector('#arrow')!.classList.remove('d-none')
  })

  document.querySelector('#arrow')?.addEventListener('click', () => {
    document.querySelector('.contact-form')!.classList.add('d-none')
    document.querySelector('#checkout')!.classList.remove('d-none')
    document.querySelector('#arrow')!.classList.add('d-none')
  })


document.querySelector('#mInfo')?.addEventListener('click', (e) => {
  console.log('hej');
  const target = e.target as HTMLElement
  console.log(target.dataset);
  
  document.querySelector('.mInfo')?.classList.toggle('d-none') 
  
  })

    //Checks if there is products in local storage and then prints out the number.
    document.querySelector('.cart-item-number')!.innerHTML = `${cartItemData.length}`
}

// Add to cart button
const getJson = localStorage.getItem('products') ?? '[]'
const cartItemData:any[] = JSON.parse(getJson)

document.querySelector('.grid-container')!.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement
    if(target.dataset.idcart) {
        let selectedItem = productsCard ? productsCard.filter(post => {
            return post.id === Number(target.dataset.idcart)
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
    }})

// Select the itemcollection div element for the cart
const itemCollection = document.querySelector('#itemcollection')! as HTMLDivElement

// Click the trashcan to delete
itemCollection.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if(target.classList.contains('trash')) {
        deleteProduct(Number(target.dataset.itemid))
    }
})

// Delete Product from cart
const deleteProduct = (productId:Number) => {
    const index = cartItemData.findIndex(item => item.id === productId)
    cartItemData.splice(index, 1)
    saveItem()
}

// Update product qty cart data
const updateProductQty = (data:any, productId:Number) => {
    console.log(data, productId)
    const index = cartItemData.findIndex(item => item.id === productId)
    if(cartItemData[index].selected >= 0) {
        if (data === 'add') {
            cartItemData[index].selected = Number(cartItemData[index].selected) + 1
        } else if (data === 'remove') {
            cartItemData[index].selected = Number(cartItemData[index].selected) - 1
            if(cartItemData[index].selected === 0) {
                deleteProduct(productId)
            }
        }
        saveItem()
    }
}

// Save product to local storage
let jsonItem = ``
const saveItem = () => {
    jsonItem = JSON.stringify(cartItemData)
    localStorage.setItem('products', jsonItem)
    document.querySelector('.cart-item-number')!.innerHTML = `${cartItemData.length}`
    viewCart()
}

//Render cart with products
const viewCart = () => {
    let productCounter = 1
    itemCollection.innerHTML = cartItemData.map(product => `
        <div class="cart-item">
            <span class="itemnumber">${productCounter++}</span>
            <img class="img-fluid rounded cart-image" src="https://www.bortakvall.se/${product.image}" alt="${product.name}">
            <span class="product-name">${product.name}</span>
            <div class="add-remove">
                <span class="add" data-productid="${product.id}">+</span> ${product.selected} <span class="remove" data-productid="${product.id}">-</span>
            </div>
            <span class="product-price">${product.price} sek/st</span>
            <span class="total-price">${product.price * product.selected} sek</span>
            <div class="delete-item">
                <span class="material-symbols-outlined trash">delete</span>
            </div>
        </div>
    `).join('')
    updateTotalPrice()
}

// Edit product quantity i cart
itemCollection.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    if(target.tagName === "SPAN") {
        const productId = Number(target.dataset.productid)
        if(target.classList.contains('add')) {
            updateProductQty('add', productId)
        }
        if(target.classList.contains('remove')) {
            updateProductQty('remove', productId)
        }
    }
})

// Render and display total cost
const updateTotalPrice = () => {
    let productCost = 0
    let totalPrice = 0
    console.log("Starting total cost")
    const totalCost = document.querySelectorAll('.total-price')
    totalCost.forEach(item => {
        productCost = Number(item.innerHTML.replace(" sek", ""))
        totalPrice += productCost
    })
    document.querySelector('.pay-price')!.innerHTML = `${totalPrice} sek`
}

// Open Cart
document.querySelector('.cart-icon')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.remove('d-none')
    // Render the cart view
    viewCart()
})

// Close cart
document.querySelector('.cart-close')!.addEventListener('click', () => {
    document.querySelector('.cart-container')!.classList.add('d-none')
    document.querySelector('.contact-form')!.classList.add('d-none')
    document.querySelector('#checkout')!.classList.remove('d-none')
    document.querySelector('#arrow')!.classList.add('d-none')
})


document.querySelector('.contact-form')!.addEventListener('submit', async e => {
  e.preventDefault()
  //post(person)

  const firstName = document.querySelector<HTMLInputElement>('#newFirstName')?.value
  const lastName = document.querySelector<HTMLInputElement>('#newLastName')?.value
  const adress = document.querySelector<HTMLInputElement>('#newAdress')?.value
  const postalNumber = document.querySelector<HTMLInputElement>('#newPostalNumber')?.value
  const city = document.querySelector<HTMLInputElement>('#newCity')?.value
  const phoneNumber = document.querySelector<HTMLInputElement>('#newPhoneNumber')?.value
  const email = document.querySelector<HTMLInputElement>('#newEmail')?.value

  //console.log(firstName, lastName, adress, postalNumber, city, phoneNumber, email)

     let person:newData[]= [
      {
        customer_first_name: firstName ?? '',
        customer_last_name: lastName ?? '',
        customer_address: adress ?? '',
        customer_postcode: Number(postalNumber),
        customer_city: city ?? '',
        customer_phone_number: Number(phoneNumber) ?? '',
        customer_email: email ?? '',
        order_total: 53,
        order_items: {
                   product_id: 9,
                   qty: 11,
               }
            }
        ]
  console.log(person)

  await post(person)
})

document.querySelector('.closebtn')!.addEventListener('click', () => {
  document.querySelector('#alertBox')!.classList.add('d-none')
})