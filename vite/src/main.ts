import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import {fetchProducts, post} from './api'
import {newData, order_items, products} from './interface'

//lokal variabel som innehåller alla produkter från server
let productsCard: products[] = []

//Hämtning av produkter från API
const getProducts = async () => {
    productsCard = await fetchProducts()

// funktion för att hämta antal produkter i lager
  const qtyProducts = () => {
    let productQty = productsCard.length

    productsCard.forEach(item => {
        if(item.stock_status==="outofstock"){
          productQty -= 1
        }
    })
      return productQty
    }

    if (productsCard.length > 0){

    //Rendering av produkter och antal produkter i lager
    renderProducts(productsCard);
    document.querySelector('.productsQty')!.innerHTML = `Vi har hela  ${qtyProducts()} sorter godis inne av sjuka ${productsCard.length}, fräckt!`
    }
}

getProducts()

let globalProductArray:any[]

//rendering av produkter på main sida
function renderProducts(array:products[]) {
    globalProductArray = array

    document.querySelector('.filtered-items')!.innerHTML = `${array.length} godisar visas i listan`
	document.querySelector('.grid-container')!.innerHTML = array
		.map(product=> (`
        <div class="card">
        <div class="outofstock d-none" data-stock="${product.stock_status}"><span class="outofstock-text">Slutsåld</span></div>
        <img src="https://www.bortakvall.se/${product.images.thumbnail}" alt="product">
        <h1 class="name">${product.name}</h1>
        <p class="price">${product.price}kr</p>
        <span class="qty" data-qty="${product.stock_quantity}">Antal i lager: ${product.stock_quantity}</span>
        <button class="info" data-id="${product.id}">Mer info</button>
        <div id="${product.id}" class="card-inner d-none">
      <div class="card-body">
      <div class="popup-close">X</div>
      <img src="https://www.bortakvall.se/${product.images.thumbnail}" class="thumbnail-img" alt="product">
        <h1 class="name">${product.name}</h1>
        <p class="price">${product.price}kr</p>
        ${product.description}
      </div>
      </div>
      <button id="cart" class="button" data-idcart="${product.id}">Lägg till i varukorgen</button>
    </div>
    </div>
	`)).join('')

    // Function that displays if the product is out of stock or not
    inStock()

    // type of "function" that target the product and displays its description with toggle effect
    const infoBtns = document.querySelectorAll('.info')
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
    if(cartItemData.length===0) {
        alert('Varukorgen är tom, fyll på med godis!')
    } else {
        document.querySelector('.contact-form')!.classList.remove('d-none')
        document.querySelector('#checkout')!.classList.add('d-none')
        document.querySelector('#arrow')!.classList.remove('d-none')
  }})
        document.querySelector('#arrow')?.addEventListener('click', () => {
        document.querySelector('.contact-form')!.classList.add('d-none')
        document.querySelector('#checkout')!.classList.remove('d-none')
        document.querySelector('#arrow')!.classList.add('d-none')
  })


    document.querySelector('#mInfo')?.addEventListener('click', () => {
        document.querySelector('.mInfo')?.classList.toggle('d-none')
    })

    updateTotalItems()
}

const updateTotalItems = () => {
    document.querySelector('.cart-item-number')!.innerHTML = `${cartItemData.length}`
}

document.querySelector('.sortbyname')!.addEventListener('click', () => {
    sortProducts(globalProductArray)
    renderProducts(productsCard)
})

// Sort list based on name
const sortProducts = (globalArray:any) => {
    renderProducts(globalArray.sort((a:any, b:any) => a.name.localeCompare(b.name)))
}

// Show or hide if the product is out of stock
const inStock = () => {
    const stockElement = document.querySelectorAll<HTMLElement>('.outofstock')
    stockElement.forEach(item => {
        if(item.dataset.stock === 'instock') {
            item.classList.add('d-none')
        } else {
            item.classList.remove('d-none')
        }
    })
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

        // Making target a number instead of string
        const IDToNumber:number = (parseInt(target.dataset.idcart));
        //array with ID from products in the cart
        const IdInCartItemData:number[] = cartItemData.map(obj => parseInt(obj.id))
      
        if(IdInCartItemData.includes(IDToNumber)){
            updateProductQty("add",IDToNumber )
        } else {
        cartItemData.push({ 
            id: selectedItem![0].id,
            name: selectedItem![0].name,
            description: selectedItem![0].description,
            price: selectedItem![0].price,
            image: selectedItem![0].images.thumbnail,
            selected: 1,// Hur många produkter kunder väljer
            qty: selectedItem![0].stock_quantity
            })
        }
        saveItem()
    }
})

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
    let buyButton = document.querySelector('[data-idcart="' + productId + '"]')! as HTMLButtonElement
    buyButton.disabled = false
    const index = cartItemData.findIndex(item => item.id === productId)
    cartItemData.splice(index, 1)
    saveItem()
}

// Update product qty cart data
const updateProductQty = (data:any, productId:Number) => {
    const index = cartItemData.findIndex(item => item.id === productId)
    let buyButton = document.querySelector('[data-idcart="' + productId + '"]')! as HTMLButtonElement
    if(cartItemData[index].selected >= 0) {
        if (data === 'add' && cartItemData[index].selected < cartItemData[index].qty) {
            cartItemData[index].selected = Number(cartItemData[index].selected) + 1
        } else if (data === 'remove') {
            cartItemData[index].selected = Number(cartItemData[index].selected) - 1
            buyButton.disabled = false
            if(cartItemData[index].selected === 0) {
                deleteProduct(productId)
            }
        }
        else {
            buyButton.disabled = true
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
                <span class="add" data-btadd="${product.id}" data-productid="${product.id}">+</span> ${product.selected} <span class="remove" data-productid="${product.id}">-</span>
            </div>
            <span class="qty">${product.qty} </span>
            <span class="product-price">${product.price} sek/st</span>
            <span class="total-price">${product.price * product.selected} sek</span>
            <div class="delete-item">
                <span class="material-symbols-outlined trash" data-itemid="${product.id}">delete</span>
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
    const totalCost = document.querySelectorAll('.total-price')
    totalCost.forEach(item => {
        productCost = Number(item.innerHTML.replace(" sek", ""))
        totalPrice += productCost
    })
    document.querySelector('.pay-price')!.innerHTML = `${totalPrice} sek`
}

// Open Cart
document.querySelector('.cart-icon')!.addEventListener('click', () => {
  updateTotalItems()
    document.querySelector('.cart-container')!.classList.remove('d-none')
    document.querySelector('.cart-list')!.classList.remove('d-none')
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

    document.querySelector('.cart-list')?.classList.add('d-none')
    document.querySelector('.order-receipt')?.classList.remove('d-none')

    const cartToSend = localStorage.getItem('products')
    const finalCart = JSON.parse(cartToSend!!)

    const newArray: order_items[] = []
  
    finalCart.forEach((item:any) => {
        const objects = {
            product_id: undefined,
             qty:0,
             item_price:0,
             item_total:0,
        }

        objects.product_id=item.id
        objects.qty = item.selected
        objects.item_price = item.price
        objects.item_total = item.price*item.selected

        newArray.push(objects)
    });

    const orderTotal = (arr:any) => {
        let total = 0
        arr.forEach((item:order_items) => {
            total += item.item_total!
        })
        return total
    }

    const firstName = document.querySelector<HTMLInputElement>('#newFirstName')?.value
    const lastName = document.querySelector<HTMLInputElement>('#newLastName')?.value
    const adress = document.querySelector<HTMLInputElement>('#newAdress')?.value
    const postalNumber = document.querySelector<HTMLInputElement>('#newPostalNumber')?.value
    const city = document.querySelector<HTMLInputElement>('#newCity')?.value
    const phoneNumber = document.querySelector<HTMLInputElement>('#newPhoneNumber')?.value
    const email = document.querySelector<HTMLInputElement>('#newEmail')?.value

    let person:newData= {
        customer_first_name: firstName ?? '',
        customer_last_name: lastName ?? '',
        customer_address: adress ?? '',
        customer_postcode: postalNumber??'',
        customer_city: city ?? '',
        customer_phone_number: Number(phoneNumber) ?? '',
        customer_email: email ?? '',
        order_total: orderTotal(newArray),
        order_items : newArray
    }

    await post(person)
  
    let productCounter = 1
    document.querySelector('.order-receipt')!.innerHTML =`
        <div class="cart-list-header">
            <span class="cart-title"><br>
            </span>
            <span class="material-symbols-outlined receipt-close">cancel</span>
        </div>
        <div class="cart-content-container">
            <div id="alertBox" class="alert success">
            Tack för din beställning!🥳 Följande varor är påväg till dig:
            </div><br>
            <div class="item-header">
                <div class="cart-item-titles">
                    <span>#</span>
                    <span></span>
                    <span class="product-name">Produkt</span>
                    <span class="add-remove">Antal</span>
                    <span>Pris</span>
                    <span>Totalt</span>
                    <span></span>
                </div>
            </div>
            ${cartItemData.map(product =>`
            <div class="cart-item">
                <span class="itemnumber">${productCounter++}</span>
                <img class="img-fluid rounded cart-image" src="https://www.bortakvall.se/${product.image}" alt="${product.name}">
                <span class="product-name">${product.name}</span>
                <div class="add-remove">
                    ${product.selected}
                </div>
                <span class="product-price">${product.price} sek/st</span>
                <span class="total-price">${product.price * product.selected} sek</span>
                <div class="delete-item">
                    <span class="material-symbols-outlined trash" data-itemid="${product.id}">delete</span>
                </div>
            </div>`).join('')}
            <div class="topay">
                <span class="pay">Att betala: </span><span class="pay-price">${orderTotal(newArray)}</span>
            </div>
        </div>
        </div>
        `
    document.querySelector('.total-price')!.innerHTML = '0 sek'

    document.querySelector('.receipt-close')?.addEventListener('click', () => {
        document.querySelector('.order-receipt')!.classList.add('d-none')
        document.querySelector('.order-receipt')!.innerHTML=''
        document.querySelector('.cart-container')?.classList.add('d-none')
        document.querySelector('.contact-form')!.classList.add('d-none')
        document.querySelector('#checkout')!.classList.remove('d-none')
        document.querySelector('#arrow')!.classList.add('d-none')
    })

    // Empty local storage from products when person has clicked submit
    while (cartItemData.length > 0) {
        cartItemData.pop()
    }

    localStorage.clear()
    updateTotalItems()
})


// Add filter text form event
const filterForm = document.querySelector('#filter') as HTMLFormElement
filterForm.addEventListener('keyup', (e) => {
    e.preventDefault()
    
    const searchKey:string = filterForm.filtertext.value.toLowerCase().trim()
    filterQuery(searchKey)
    if(!searchKey) {
        renderProducts(productsCard);
    }
})

// Text filter function
const filterQuery = (key:string) => {
    const searchedItems = productsCard.filter(item => item.name.toLowerCase().trim().includes(key))
    // Render products
    renderProducts(searchedItems)
}

// Filter buttons form
const filterButtonForm = document.querySelector('#filter-check') as HTMLFormElement
filterButtonForm.addEventListener('click', (e) => {
    e.preventDefault()
    const target = e.target as HTMLElement
    if(target.tagName === 'BUTTON') {
        let isSelected: boolean
        if(!target.classList.contains('selected')) {
            isSelected = true
            target.classList.add('selected')
        } else {
            isSelected = false
            target.classList.remove('selected')
        }
        filterByButton(target.getAttribute('id'), isSelected)
    }
})

// Filter by buttons add filter strings function
// We can add strings or filter words by adding new arrays
const filterAlt1:string[] = ['vete', 'korn', 'malt']
const filterAlt2:string[] = ['mjölk']
const filterAlt3:string[] = ['nöt']
// Global button filter result
let filterSelected:any[] = []

const filterByButton = (filterType:any, isSelected:boolean) => {
    if(filterType === 'filter-alt1' && isSelected) {
        filterSelected.push(filterAlt1)
    } else if (filterType === 'filter-alt1' && !isSelected) {
        filterSelected = removeButtonFilter(filterAlt1)
    }
    if(filterType === 'filter-alt2' && isSelected) {
        filterSelected.push(filterAlt2)
    } else if (filterType === 'filter-alt2' && !isSelected) {
        filterSelected = removeButtonFilter(filterAlt2)
    }
    if(filterType === 'filter-alt3' && isSelected) {
        filterSelected.push(filterAlt3)
    } else if (filterType === 'filter-alt3' && !isSelected) {
        filterSelected = removeButtonFilter(filterAlt3)
    }
    filterButtonResult(filterSelected.flat(1))
}

// Remove filter
const removeButtonFilter = (filterArr:any) => {
    return filterSelected.flat(1).filter((item: any) => !filterArr.some((altItem: any) => item === altItem))
}

// Get the button filtered result and render it
const filterButtonResult = (filterResult:any[]) => {
    let filteredArray:any = []
    let savedArray: any = []
    filterResult.forEach(word => {
        filteredArray = productsCard.filter(item => item.description.toLowerCase().trim().includes(word))
        savedArray.push(filteredArray)
    })
    savedArray = savedArray.flat(1)
    let mergeFilter:any = savedArray.filter((item:any, index:any) => savedArray.indexOf(item) === index)
    let finalFilter:any = productsCard.filter(items => !mergeFilter.some((mergeItem:any) => items.name === mergeItem.name))
    renderProducts(finalFilter)
    if(savedArray.length === 0) {
        renderProducts(productsCard)
    }
}