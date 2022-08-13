let productService
let cartService
const htmlSevrice = new HTMLService()

const productContainer = document.getElementById('products')
const filterInput = document.querySelector('.filter')
const cartContainer = document.getElementById('cart')

filterInput.addEventListener('input', event => {
  const value = event.target.value;
  const filteredProducts = productService.filterBy(value)
  renderProducts(filteredProducts)
})

productContainer.addEventListener('click', (e) => {
  id = e.target.dataset.id 
    ? e.target.dataset.id 
    : e.target.closest('li')?.dataset.id

  if (id) {
    cartService.add(
      productService.getById(+id)
    )
    renderCart()
  }
})

cartContainer.addEventListener('click', e => {
  const type = e.target?.dataset.type
  const id = e.target?.dataset.id;

  switch (type) {
    case 'clear':
      cartService.clear();
      renderCart();
      break
    case 'remove':
      cartService.remove(id)
      renderCart();
      break
    default:
  }
})

window.addEventListener('beforeunload', saveCart)

function saveCart() {
  const cart = JSON.stringify(cartService.getInfo().items)
  localStorage.setItem('fakestore/cart', cart)
}

function getCart() {
  const cart = JSON.parse(localStorage.getItem('fakestore/cart')) || []
  cartService = new CartService(cart)
}

function renderCart() {
  cartContainer.innerHTML = htmlSevrice.painCart(
    cartService.getInfo(cart)
  )
}

function renderProducts(products) {
  productContainer.innerHTML = htmlSevrice.paintProducts(products)
};

async function startApp() {
  getCart()
  renderCart()

  try {
    const response = await fetch('https://fakestoreapi.com/products/');
    const data = await response.json()
  
    productService = new ProductService(data)

    renderProducts(data)
  } catch (error) {
      productContainer.innerHTML = htmlSevrice.paintError(error);
  }
}

startApp();

