// Products Data
const productsData = [
  {
    id: 0,
    types: [
      {
        imgUrl: 'product-example-1.jpg',
        color: 'product__color-1',
      },
      {
        imgUrl: 'product-example-5.jpg',
        color: 'product__color-2',
      },
      {
        imgUrl: 'product-example-12.jpg',
        color: 'product__color-3',
      },
      {
        imgUrl: 'product-example-1.jpg',
        color: 'product__color-1',
      },
      {
        imgUrl: 'product-example-5.jpg',
        color: 'product__color-2',
      },
      {
        imgUrl: 'product-example-12.jpg',
        color: 'product__color-3',
      },
      {
        imgUrl: 'product-example-1.jpg',
        color: 'product__color-1',
      },
      {
        imgUrl: 'product-example-5.jpg',
        color: 'product__color-2',
      },
      {
        imgUrl: 'product-example-12.jpg',
        color: 'product__color-3',
      }
    ]
  },
  {
    id: 1,
    types: [
      {
        imgUrl: 'product-example-5.jpg',
        color: 'product__color-1',
      },
      {
        imgUrl: 'product-example-1.jpg',
        color: 'product__color-2',
      },
      {
        imgUrl: 'product-example-12.jpg',
        color: 'product__color-3',
      }
    ]
  },
  {
    id: 2,
    types: [
      {
        imgUrl: 'product-example-12.jpg',
        color: 'product__color-1',
      },
      {
        imgUrl: 'product-example-1.jpg',
        color: 'product__color-2',
      },
      {
        imgUrl: 'product-example-5.jpg',
        color: 'product__color-3',
      },
      {
        imgUrl: 'product-example-5.jpg',
        color: 'product__color-3',
      },
      {
        imgUrl: 'product-example-5.jpg',
        color: 'product__color-3',
      }
    ]
  },
]


/* ELEMENTS */
const products = document.querySelectorAll('.product');
const productImageWrappers = document.querySelectorAll('.js-product-image-wrapper');
const allSizesDivs = document.querySelectorAll('.js-product-sizes-wrapper');
const allSizeItems = document.querySelectorAll('.js-product-size');
const descriptions = document.querySelectorAll('.js-product-description');
const radioGroups = document.querySelectorAll('.js-product-radio-group-wrapper');
const radioBtns = document.querySelectorAll('.js-product-radio-button');
const hearts = document.querySelectorAll('.js-product-inner-heart-button');

productImageWrappers.forEach(product => product.addEventListener('click', (e) => toggleSizes(e)))
allSizeItems.forEach(sizeItem => sizeItem.addEventListener('click', (e) => addToCart(e)))
descriptions.forEach(description => description.addEventListener('click', (e) => toggleDescription(e)))
hearts.forEach(heart => heart.addEventListener('click', (e) => addToFavourites(e)));

/* FUNCTIONS */

const toggleSizes = (e) => {

  // get current product
  const product = e.currentTarget;
  // get sizes div of current element
  const sizesDiv = product.querySelector('.js-product-sizes-wrapper');
  // remove all open sizes divs unless its a current one (need class to stay afterwards for toggle)
  allSizesDivs.forEach(current => {
    current !== sizesDiv && current.classList.add('display-none')
  });
  // show sizes div of current element if hidden, hide if shown
  // if clicked on empty space between size items don't hide
  !sizesDiv.className.includes('display-none') && !e.target.className.includes('js-product-sizes-wrapper') ?
    sizesDiv.classList.add('display-none') :
    sizesDiv.classList.remove('display-none');
  console.log('Sizes Toggled');
}

const addToCart = (e) => {
  const currentSizeItem = e.target;
  const addToCartDiv = currentSizeItem.closest('.product').querySelector('.product__add-to-cart');
  // check if next sibling exists (if not, it's the last element, meaning it is info icon, which shouldn't add item to cart)
  if (currentSizeItem.nextElementSibling) {
    addToCartDiv.querySelector('.product__add-to-cart-text').innerText = 'Item Added to Cart!';
    addToCartDiv.style.display = 'flex';
    addToCartDiv.style.opacity = '1';
    console.log('Item added to Cart (Size was chosen)');
  }
}

// show more / less of description on click
const toggleDescription = (e) => {
  const clicked = e.target;
  clicked.className.includes('remove-ellipsis') ? clicked.classList.remove('remove-ellipsis') : clicked.classList.add('remove-ellipsis');
  console.log('Toggling description');

}

// choose product image by clicking on radio button
// on first render choose first image of each product by default
const chooseImage = (e, img) => {
  if (e) {
    const clickedButton = e.currentTarget;
    const product = clickedButton.closest('.product');
    const radioButtons = product.querySelectorAll('.js-product-radio-button');
    radioButtons.forEach(button => {
      button !== clickedButton ?
        button.classList.remove('product__radio-button--active') :
        button.classList.add('product__radio-button--active');
    })
    const image = product.querySelector('.product__image');
    image.src = `assets/images/${img}`;
    console.log('Different Image Chosen');
  } else {
    productImageWrappers.forEach((product, index) => {
      const image = product.querySelector('.product__image');
      image.src = `assets/images/${productsData[index].types[0].imgUrl}`;
    })
  }
}

//create radio buttons based on data
const displayRadioBtns = () => {
  productsData.forEach((productData, productIndex) => {
    const radioGroup = products[productIndex].querySelector('.product__radio-group');
    productData.types.forEach((type, typeIndex) => {
      const button = document.createElement('div');
      button.classList.add('product__radio-button', 'js-product-radio-button');
      // make first button active
      if (typeIndex === 0) {
        button.classList.add('product__radio-button--active');
      }
      if (typeIndex < 3) {
        const buttonInner = document.createElement('div');
        buttonInner.classList.add('product__radio-button-inner', type.color);
        // if color is "pale", add one more border (change color of existing white border)
        if (type.color === 'product__color-1') {
          buttonInner.classList.add('product__radio-button-inner--colored-border');
        }
        button.appendChild(buttonInner);
        radioGroup.appendChild(button);
        const img = type.imgUrl;
        button.addEventListener('click', (e) => chooseImage(e, img))
      }
    })
    if (productData.types.length > 3) {
      const viewMore = document.createElement('a');
      viewMore.href = 'https://www.google.com';
      viewMore.target = '_blanc';
      viewMore.innerText = `(+${productData.types.length - 3})`
      radioGroup.appendChild(viewMore);
    }
  })
  chooseImage();
}
displayRadioBtns();

const addToFavourites = (e) => {
  const clickedHeart = e.currentTarget;
  clickedHeart.className.includes('product__inner--add-to-favourites--added') ?
    clickedHeart.classList.remove('product__inner--add-to-favourites--added') :
    clickedHeart.classList.add('product__inner--add-to-favourites--added');
  console.log('Added / Removed favourite');
}