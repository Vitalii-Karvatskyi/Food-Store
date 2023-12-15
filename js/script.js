
// function number2(arr){

//   return arr.filter(arr => typeof(arr) == "string" && arr.length >= 10);
// };
// console.log(number2([true,10,"James",50,"Sam Fisher fron Nevada"]));





// function number(arr){

//   return String(arr).split("").reverse().join("");
// };
// console.log(number(12345));

try{
  $('.slider_inner').slick({
    centerMode: true,
    centerPadding: '40px',
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
  
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
        }
      }
    ]
  });
}
catch{
  
};


const btn = document.querySelectorAll(".slider_item_cart")
const plus = document.querySelectorAll(".slider_item_plus")
const minus = document.querySelectorAll(".slider_item_minus")
const counter = document.querySelectorAll(".slider_counter_inner")
const counter_num = document.querySelectorAll(".slider_counter")
const counter_price = document.querySelectorAll(".slider_item_price")
const mainCounter = document.querySelector(".count")
let cartItemNumbers = document.querySelectorAll(".page_cart_order_item")

let cartPost = document.getElementById("all_orders")

const cartAddItemBtn = document.querySelectorAll(".page_cart_add_to_cart_item_btn")
const cartSubtitleCounter = document.querySelector(".page_cart_subtitle_counter")





let total_cart = []
total_cart = loadTotalCart()
mainCounter.textContent = total_cart.length
try{
  showItemInCart(cartPost)
}
catch{
  
};
console.log(total_cart)






for (let index = 0; index < btn.length; index++) {
  let dishes_num = 0;
  let currentDishItem ={}
  let price1 = parseInt(counter_price[index].textContent.replace(/\s/g, ""));
  
  cartPost = document.getElementById("all_orders")
  btn[index].addEventListener("click",function(){
    
    btn[index].classList.remove("active")
    plus[index].classList.add("active")
    minus[index].classList.add("active")
    counter[index].classList.add("active")
    counter_num[index].textContent=1
    dishes_num = 1
    


    currentDishItem = {
      img : document.querySelectorAll(".slider_item_photo")[index].src,
      title : document.querySelectorAll(".slider_item_title")[index].textContent,
      subtitle : document.querySelectorAll(".slider_item_subtitle")[index].textContent,
      weight : document.querySelectorAll(".slider_item_weight")[index].textContent,
      price : price1,
      
    }
    total_cart.push(currentDishItem)
    refreshTotalCart()
    mainCounter.textContent = total_cart.length
    
    
  
    
    
    



    

  });
  plus[index].addEventListener("click",function(){
    dishes_num++;
    total_cart.push(currentDishItem)
    refreshTotalCart()
    mainCounter.textContent = total_cart.length
   

    counter_num[index].textContent=dishes_num;
    counter_price[index].textContent = dishes_num * price1+" ₽";
    
  
   
  
    
  });
  minus[index].addEventListener("click",function(){
    dishes_num--;
    
    let deleteElementIndex = total_cart.findIndex(item => item.title == document.querySelectorAll(".slider_item_title")[index].textContent)
    total_cart.splice(deleteElementIndex,1)
    refreshTotalCart()
    mainCounter.textContent = total_cart.length


    if (dishes_num <= 0) {
      btn[index].classList.add("active")
      plus[index].classList.remove("active")
      minus[index].classList.remove("active")
      counter[index].classList.remove("active")
      

      
    }
    else {
      counter_num[index].textContent=dishes_num;
      counter_price[index].textContent = dishes_num * price1+" ₽";
    };
    
    
    
    
    
  });



  
};



function refreshTotalCart() {
  localStorage.clear()
  for (let index = 0; index < total_cart.length; index++) {
    localStorage.setItem(index,JSON.stringify(total_cart[index]))
    
   
  }
  
}

function loadTotalCart() {
  for (let index = 0; index < localStorage.length; index++) {
    total_cart.push(JSON.parse(localStorage.getItem(index)))
    
  }
  
  return total_cart
}

function showItemInCart(cartPost) {

  

  cartPost.innerHTML =""
  mainCounter.textContent = total_cart.length
  let totalPrice = 0
  for (let index = 0; index < total_cart.length; index++) {
    let divCartItem = document.createElement("div")
    divCartItem.innerHTML =`<div class="page_cart_order_inner">
    <div class="page_cart_order_item">
        <div class="page_cart_order_info_inner">
        <img src="${total_cart[index].img}" alt="..," class="page_cart_order_info_photo">
            <div class="page_cart_order_info_descr_inner">
                <h2 class="page_cart_order_info_title">${total_cart[index].title}</h2>
                <p class="page_cart_order_info_subtitle">${total_cart[index].subtitle}</p>
            </div>
            
        </div>
        <div class="page_cart_order_cost_inner">
            
            <h2 class="page_cart_order_cost_price">${total_cart[index].price} ₽</h2>
            <button class="page_cart_order_cost_num_close_btn "><img src="./icons/close_cart.svg" alt="" class="page_cart_order_cost_num_plus_photo"></button>
        </div>
      </div>
    </div>`
    cartPost.appendChild(divCartItem)
    totalPrice += Number(total_cart[index].price)
  }
  cartSubtitleCounter.textContent = total_cart.length
  removeBtn(cartPost)

  const freeDelivery = document.querySelector(".page_cart_total_result_delivery")
  let showTotalPrice = document.querySelector(".page_cart_total_result_price_span")
  showTotalPrice.textContent = totalPrice + " ₽"
  if (totalPrice>500) {
    freeDelivery.textContent = "Включена бесплатная доставка"
  }
  else{
    freeDelivery.innerHTML = `До бесплатной доставки не хватет: <span class="page_cart_total_result_delivery_span">${500 -totalPrice} ₽</span>`
  }
  // ${500 -totalPrice}
}


function removeBtn(cartPost) {
  for (let index = 0; index < total_cart.length; index++) {
    let cancelBtn = document.querySelectorAll(".page_cart_order_cost_num_close_btn")
    cancelBtn[index].addEventListener("click",function(){
      total_cart.splice(index,1)
      refreshTotalCart()
      showItemInCart(cartPost)
    });
    
  }
  
}



for (let index = 0; index < cartAddItemBtn.length; index++) {
  cartAddItemBtn[index].addEventListener("click", function(){
    currentDishItem = {
      img : document.querySelectorAll(".page_cart_add_to_cart_img")[index].src,
      title : document.querySelectorAll(".page_cart_add_to_cart_item_title")[index].textContent,
      subtitle : "",
      weight : 0,
      price : document.querySelectorAll(".page_cart_add_to_cart_item_price")[index].textContent
      
    }
    total_cart.push(currentDishItem)
    mainCounter.textContent = total_cart.length

    showItemInCart(cartPost)
  })
  
}






