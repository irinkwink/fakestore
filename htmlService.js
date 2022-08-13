const ellipsis = (string, maxLength) => {
  if (string.length > maxLength) {
    return string.substring(0, 30) + '...'
  }

  return string
}

class HTMLService {
  paintProduct(product) {
    return `
      <li data-id="${product.id}">
      <img src="${product.image}" title="${product.title}"/>
      <small>${ellipsis(product.title, 30)}</small>
      <small><strong>${product.price}</strong></small>
      </li>
    `
  }

  paintProducts(products = []) {
    return products.map(this.paintProduct).join('');
  }

  paintCartItem(item) {
    return `
      <li data-type="remove" data-id="${item.id}">
        (${item.amount})
        ${item.title}
        <strong>$${item.price}</strong>
      </li>
    `
  }

  painCart({items, totalPrice}) {
    if (items.length === 0) {
      return `<p>Корзина пуста</p>`
    }

    return `
      <ul class="cart-list">
        ${items.map(this.paintCartItem).join('')}
      </ul>
      <hr/>
      <p class="info">
        <span>Общая цена: <strong>$${totalPrice.toFixed(2)}</strong></span>
        <button class="clear" data-type="clear">Очистить</button>
      </p>
    `
  }

  paintError(error) {
    return `
      <p class="error">${error.message}</p>
    `
  }
}