

if (!localStorage.getItem('email')) {
    location.replace('index.html')
}
const cardLayout = document.getElementById('cardLayout');
const listCarts = document.querySelector('.carts');
const exit = document.getElementById('exit');
const cartShopping = document.querySelector('.cart-shopping');
const asideLayout = document.querySelector('.aside-layout');
const cartLayout = document.querySelector('.carts-layout');
const totalprice = document.querySelector('.total-price');
const Cartitem = document.querySelectorAll('.cart-item');


let carts = []; 
let products=[]


window.addEventListener('load', () => {
    
    if (localStorage.getItem('carts')) {
        carts = JSON.parse(localStorage.getItem('carts'));
        
        console.log('Loaded carts from localStorage:', carts);
    }
    else {
        console.log('No carts found in localStorage.');
    }
    fetchProductsAndDisplay() // Update HTML with the carts data from localStorage

});

// Fetch products from API
const fetchProductsAndDisplay = () => {
    fetch('https://fakestoreapi.com/products?limit=10')
        .then(res => res.json())
        .then(datas => {
            products = datas; 
            datas.forEach(data => {
                const element = `
                    <div class="card" data-id="${data.id}">
                        <img class="card-img-top w-50" src="${data.image}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.price}</p>
                            <p class="card-text">${data.description}</p>
                            <a href="#" class="btn btn-primary add-btn">Add to cart</a>
                        </div>
                    </div>`;
                cardLayout.innerHTML += element;
            });

            // Add event listeners to "Add to cart" buttons
            const addBtns = document.querySelectorAll('.add-btn');
            addBtns.forEach(btn => {
                btn.addEventListener('click', addtocart);
            });

            console.log('done');
            addtohtml(); // Update HTML with the carts data from localStorage after products are fetched
        })
        .catch(error => console.error('Error fetching products:', error));
};

// Function to handle adding to cart logic
const addtocart = (event) => {
    let positionCart = event.target;
    if (positionCart.classList.contains('add-btn')) {
        let product_id = positionCart.closest('.card').dataset.id;
        cartlogic(product_id);
    }
};

// Function to update carts array and localStorage
const cartlogic = (product_id) => {
    let checkItem = carts.findIndex((item) => item.item_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            item_id: product_id,
            quantity: 1
        }];
    } else if (checkItem < 0) {
        carts.push({
            item_id: product_id,
            quantity: 1
        });
    } else {
        carts[checkItem].quantity += 1;
    }
    addtohtml(); // Update the HTML
    addtoLocalStorage(); // Update localStorage
};

// Function to update localStorage with carts array
const addtoLocalStorage = () => {
    if (localStorage.getItem('email')) {
    localStorage.setItem('carts', JSON.stringify(carts));
}
}

// Function to update HTML based on carts array
const addtohtml = () => {
    if (carts.length > 0 && products.length > 0) { // Ensure both carts and products are populated
        cartLayout.innerHTML = ''; // Clear the cart layout before adding items
        let totalPrice = 0; // Initialize totalPrice
        carts.forEach(cart => {
            let productInfo = products.find(item => item.id == cart.item_id);
            if (productInfo) { // Check if product was found
                let price = parseFloat(productInfo.price); // Ensure price is a number
                totalPrice += price * cart.quantity; // Calculate total price
                cartLayout.innerHTML += `<div class="d-flex align-items-center justify-content-between cart-item" data-id="${cart.item_id}">
                    <img src="${productInfo.image}" class="cart-img" alt="">
                    <div class='w-25'>
                        <h5> ${productInfo.title} </h5>
                    </div>
                    <h5> ${price.toFixed(2)} </h5>
                    <div class="q-btns plus">
                        <i class="fa-solid fa-plus plus"></i>
                    </div>
                    <h5>${cart.quantity}</h5>
                    <div class="q-btns minus">
                        <i class="fa-solid fa-minus minus"></i>
                    </div>
                  
                </div>`;
            }
        });

        // Update the total price element
        totalprice.innerText = totalPrice.toFixed(2); // Format to 2 decimal places if needed
    }
};

// Retrieve carts from localStorage when the page loads



// Function to handle quantity change in cart
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = carts.findIndex(item => item.item_id == product_id);
    if (positionItemInCart !== -1) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity++;
                break;
            case 'minus':
                if (carts[positionItemInCart].quantity > 1) {
                    carts[positionItemInCart].quantity--;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
        addtohtml();
        addtoLocalStorage(); 
    }
};

// Event listeners for plus and minus buttons
cartLayout.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('plus') || positionClick.classList.contains('minus')) {
        let product_id = positionClick.closest('.cart-item').dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});




// Retrieve carts from localStorage when the page loads

asideLayout.classList.add('block');
// Event listener for showing/hiding the cart sidebar
cartShopping.addEventListener('click', () => {
    asideLayout.classList.remove('block');
    asideLayout.classList.add('active');
});

// Event listener for hiding the cart sidebar
exit.addEventListener('click', () => {
    asideLayout.classList.remove('active');
    asideLayout.classList.add('block');
});
