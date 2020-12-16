let modalQt = 1;
let cart = [];
let modalKey = 0;

const selectorElement = elemento => document.querySelector(elemento);
const selectorElementAll = elemento => document.querySelectorAll(elemento);

// Listagens das pizzas
pizzaJson.map( (item, index) => {
  let pizzaItem = selectorElement('.models .pizza-item').cloneNode(true);

  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  // Evento de click que abre o MODAl
  pizzaItem.querySelector('a').addEventListener('click', event => {
    event.preventDefault();

    let key = event.target.closest('.pizza-item').getAttribute('data-key');
    modalQt = 1;
    modalKey = key;

    selectorElement('.pizzaBig img').src = pizzaJson[key].img;
    selectorElement('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    selectorElement('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    selectorElement('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;;
    
    selectorElement('.pizzaInfo--size.selected').classList.remove('selected');
    selectorElementAll('.pizzaInfo--size').forEach( (size, sizeIndex) => {
      if(sizeIndex == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    selectorElement('.pizzaInfo--qt').innerHTML = modalQt;

    selectorElement('.pizzaWindowArea').style.opacity = 0;

    selectorElement('.pizzaWindowArea').style.display = 'flex';

    Effect(300);
  });
  
  selectorElement('.pizza-area').append( pizzaItem );
});


// Eventos do MODAL

function closeModal() {
  selectorElement('.pizzaWindowArea').style.opacity = 0;
  setTimeout( () => {
    selectorElement('.pizzaWindowArea').style.display = 'none';
  }, 600);
}

const buttonsFechaModal = selectorElementAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton');

buttonsFechaModal.forEach((item) => {
  item.addEventListener('click', closeModal);
});

// animation time
function Effect(time) {
  setTimeout( () => {
    selectorElement('.pizzaWindowArea').style.opacity = 1;
  }, time);
}

// button mais and menos
const buttonMenos = selectorElement('.pizzaInfo--qtmenos');
const buttonMais = selectorElement('.pizzaInfo--qtmais');

buttonMenos.addEventListener('click', () => {
  if(modalQt > 1) {
    modalQt--;
    selectorElement('.pizzaInfo--qt').innerHTML = modalQt;
  }
});

buttonMais.addEventListener('click', () => {
  modalQt++;
  selectorElement('.pizzaInfo--qt').innerHTML = modalQt;
});

// button de tamanho das pizzas
selectorElementAll('.pizzaInfo--size').forEach( (size, sizeIndex) => {
  
  size.addEventListener('click', (event) => {
    selectorElement('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
  });

});

// button add carrinho
selectorElement('.pizzaInfo--addButton').addEventListener('click', () => {
  // qual tamanho
  let size = parseInt(selectorElement('.pizzaInfo--size.selected').getAttribute('data-key'));
  

  let identifier = pizzaJson[modalKey].id+'@'+size;

  let key = cart.findIndex( (item) => {
    return item.identifier == identifier;
  });

  if(key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push( {
      identifier,
      id:pizzaJson[modalKey].id,
      size,
      qt:modalQt
    } );
  }

  updateCart();
  closeModal();
});

// Atualizar o carrinho
function updateCart() {
  if(cart.length > 0) {
    selectorElement('aside').classList.add('show');

    selectorElement('.cart').innerHTML = '';

    for(let i in cart) {

      let pizzaItem = pizzaJson.find( (item) => {
        return item.id == cart[i].id;
      });

      let cartItem = selectorElement('.models .cart--item').cloneNode(true);

      let pizzaSizeName;

      switch(cart[i].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }

      let pizzaName = ` ${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

      selectorElement('.cart').append(cartItem);
    }

  } else {
    selectorElement('aside').classList.remove('show');
  }
}