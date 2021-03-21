$(document).ready(function() {
const flowersSlider = new Swiper('.flowers-slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 6,
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
      // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 6,
    }
  }
  });
  const reviewsSlider = new Swiper('.reviews-slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
  $("#review-1").on('click', function() {

    $.fancybox.open([
      {
        src  : 'https://source.unsplash.com/IvfoDk30JnI/1500x1000',
        opts : {
          caption : 'First caption',
          thumb   : 'https://source.unsplash.com/IvfoDk30JnI/240x160'
        }
      },
      {
        src  : 'https://source.unsplash.com/0JYgd2QuMfw/1500x1000',
        opts : {
          caption : 'Second caption',
          thumb   : 'https://source.unsplash.com/0JYgd2QuMfw/240x160'
        }
      }
    ], {
      loop : true,
      thumbs : {
        autoStart : true
      }
    });
  
  });
  $("#review-2").on('click', function() {

    $.fancybox.open([
      {
        src  : 'img/reviewimg/pinkflowerwine.jpg',
        opts : {
          caption : 'Green freshness',
          thumb   : 'img/reviewimg/pinkflowerwine.jpg'
        }
      },
      {
        src  : 'img/reviewimg/red_piano.jpg',
        opts : {
          caption : 'Red peonies',
          thumb   : 'img/reviewimg/red_piano.jpg'
        }
      },
      {
        src  : 'img/reviewimg/rozarozova.jpg',
        opts : {
          caption : 'Pink roses',
          thumb   : 'img/reviewimg/rozarozova.jpg'
        }
      }
    ], {
      loop : true,
      thumbs : {
        autoStart : true
      }
    });
  
  });
  const cartcalc = () => {
    // ************************************************
    // Shopping Cart API
    // ************************************************

    let  shoppingCart = (function() {
      // =============================
      // Private methods and propeties
      // =============================
      let cart = [];
      
      // Constructor
      function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
      }
      
      // Save cart
      function saveCart() {
        
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
      }
      
        // Load cart
      function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
      }
      if (localStorage.getItem("shoppingCart") != null) {
        loadCart();
      }
      

      // =============================
      // Public methods and propeties
      // =============================
      let obj = {};
      
      // Add to cart
      obj.addItemToCart = function(name, price, count) {
        for(let item in cart) {
          if(cart[item].name === name) {
            cart[item].count ++;
            saveCart();
            return;
          }
        }
        let item = new Item(name, price, count);
        cart.push(item);
        saveCart();
      }
      // Set count from item
      obj.setCountForItem = function(name, count) {
        for(let i in cart) {
          if (cart[i].name === name) {
            cart[i].count = count;
            break;
          }
        }
      };
      // Remove item from cart
      obj.removeItemFromCart = function(name) {
          for(let item in cart) {
            if(cart[item].name === name) {
              cart[item].count --;
              if(cart[item].count === 0) {
                cart.splice(item, 1);
              }
              break;
            }
        }
        saveCart();
      }

      // Remove all items from cart
      obj.removeItemFromCartAll = function(name) {
        for(let item in cart) {
          if(cart[item].name === name) {
            cart.splice(item, 1);
            break;
          }
        }
        saveCart();
      }

      // Clear cart
      obj.clearCart = function() {
        cart = [];
        saveCart();
      }

      // Count cart 
      obj.totalCount = function() {
        let totalCount = 0;
        for(let item in cart) {
          totalCount += cart[item].count;
        }
        return totalCount;
      }

      // Total cart
      obj.totalCart = function() {
        let totalCart = 0;
        for(let item in cart) {
          totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
      }

      // List cart
      obj.listCart = function() {
        let cartCopy = [];
        for(let i in cart) {
          let item = cart[i];
          let itemCopy = {};
          for(p in item) {
            itemCopy[p] = item[p];

          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy)
        }
        return cartCopy;
      }

      // cart : Array
      // Item : Object/Class
      // addItemToCart : Function
      // removeItemFromCart : Function
      // removeItemFromCartAll : Function
      // clearCart : Function
      // countCart : Function
      // totalCart : Function
      // listCart : Function
      // saveCart : Function
      // loadCart : Function
      return obj;
    })();


    // *****************************************
    // Triggers / Events
    // ***************************************** 
    // Add item
    $('.add-to-cart').click(function(event) {
      event.preventDefault();
      let name = $(this).data('name');
      let price = Number($(this).data('price'));
      shoppingCart.addItemToCart(name, price, 1);
      displayCart();
    });

    // Clear items
    $('.clear-cart').click(function() {
      shoppingCart.clearCart();
      displayCart();
    });


    function displayCart() {
      let cartArray = shoppingCart.listCart();
      let output = "";
      for(let i in cartArray) {
        output += "<tr>"
          + "<td class='texttoupc'>" + cartArray[i].name + "</td>" 
          + "<td class='texttoupc'>(" + cartArray[i].price + ")</td>"
          + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary morlessdel' data-name=" + cartArray[i].name + ">-</button>"
          + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
          + "<button class='plus-item btn btn-primary input-group-addon morlessdel' data-name=" + cartArray[i].name + ">+</button></div></td>"
          + "<td><button class='delete-item btn btn-danger clear-cart morlessdel' data-name=" + cartArray[i].name + ">X</button></td>"
          + " = " 
          + "<td class='texttoupc'>" + cartArray[i].total + "</td>" 
          +  "</tr>";
      }
      $('.show-cart').html(output);
      $('.total-cart').html(shoppingCart.totalCart());
      $('.total-count').html(shoppingCart.totalCount());
    }

    // Delete item button  

    $('.show-cart').on("click", ".delete-item", function(event) {
      let name = $(this).data('name')
      shoppingCart.removeItemFromCartAll(name);
      displayCart();
    })


    // -1
    $('.show-cart').on("click", ".minus-item", function(event) {
      let name = $(this).data('name')
      shoppingCart.removeItemFromCart(name);
      displayCart();
    })
    // +1
    $('.show-cart').on("click", ".plus-item", function(event) {
      let name = $(this).data('name')
      shoppingCart.addItemToCart(name);
      displayCart();
    })

    // Item count input
    $('.show-cart').on("change", ".item-count", function(event) {
      let name = $(this).data('name');
      let count = Number($(this).val());
      shoppingCart.setCountForItem(name, count);
      displayCart();
    });

    displayCart();


  }
  cartcalc();
  

    // more goods
    const moreFlowers = document.querySelector('.moreflowers');
    const morreflower = document.getElementById('morreflower');

    const rowMoreFlowers = () => {
         moreFlowers.style.display = ' flex';   
    };
    morreflower.addEventListener('click', rowMoreFlowers);

     // counter -+
     const counterGroups = document.querySelectorAll('.counter-group');
     for (let counterGroup in counterGroups) {

      let counterGroupp = counterGroups[counterGroup];
      console.log(counterGroupp);
      const counterInput = counterGroupp.querySelector('.counter-input');
      //const counterButtoNLess  = counterGroupp.querySelector('.counter-button_less');
      //const counterButtoNMore  = counterGroupp.querySelector('.counter-button_more');
      counterGroupp.addEventListener('click', (event) => {
          let target = event.target;
          let counter = +counterInput.value;
          if (target.classList.contains('counter-button_less')) {
            counter -= 1;
            counter = counter < 0 ? 0 : counter;
          } else if (target.classList.contains('counter-button_more')) {
            counter += 1;
            
          }
          counterInput.value = counter;
      })
    }

});




  
  