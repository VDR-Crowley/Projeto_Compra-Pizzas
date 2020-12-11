let modalQt = 1;
const querySelector = elemento => document.querySelector(elemento);
const querySelectorAll = elemento => document.querySelectorAll(elemento);

pizzaJson.map( (item, index) => {
  let pizzaItem = querySelector('.models .pizza-item').cloneNode(true);

  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', event => {
    event.preventDefault();

    let key = event.target.closest('.pizza-item').getAttribute('data-key');
    modalQt = 1;

    querySelector('.pizzaBig img').src = pizzaJson[key].img;
    querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;;
    
    querySelector('.pizzaInfo--size.selected').classList.remove('selected');
    querySelectorAll('.pizzaInfo--size').forEach( (size, sizeIndex) => {
      if(sizeIndex == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    querySelector('.pizzaInfo--qt').innerHTML = modalQt;

    querySelector('.pizzaWindowArea').style.opacity = 0;

    querySelector('.pizzaWindowArea').style.display = 'flex';

    setTimeout( () => {
      querySelector('.pizzaWindowArea').style.opacity = 1;
    }, 300);
  });
  
  querySelector('.pizza-area').append( pizzaItem );
});