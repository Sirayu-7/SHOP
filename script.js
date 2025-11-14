// สินค้า
const products = [
    { name:"Apex Ancient", price:210, image:"img/Product_Apex_Legends_Ancient__Products.jpg" },
    { name:"PUBG STEAM FECURITY", price:160, image:"img/fecuritypubg.jpg" },
    { name:"ARC Raiders Crooked Arms", price:220, image:"img/Product_ARC_Raiders_Crooked_Arms_Products.jpg" },
    { name:"Delta Force Fecurity", price:250, image:"img/Product_Delta_Force__Products.jpg" }
  ];
  
  // โหลดตะกร้า
  function loadCart(){ return JSON.parse(localStorage.getItem("cart"))||[]; }
  function saveCart(cart){ localStorage.setItem("cart",JSON.stringify(cart)); }
  
  // เพิ่มสินค้า
  function addToCart(name, price, image){
    let cart=loadCart();
    let found=cart.find(item=>item.name===name);
    if(found){ found.qty+=1; } else{ cart.push({name,price,image,qty:1}); }
    saveCart(cart);
    alert("เพิ่มสินค้าเข้าตะกร้าแล้ว!");
    updateCartCount();
  }
  
  // แสดงจำนวนสินค้าใน header
  function updateCartCount(){
    let count=loadCart().reduce((sum,item)=>sum+item.qty,0);
    let el=document.getElementById("cart-count");
    if(el) el.textContent=count;
  }
  
  // แสดงสินค้าหน้า index.html
  document.addEventListener("DOMContentLoaded",()=>{
    updateCartCount();
    let productList=document.getElementById("product-list");
    if(productList){
      products.forEach((p,index)=>{
        let div=document.createElement("div"); div.classList.add("product");
        div.innerHTML=`<img src="${p.image}"><h3>${p.name}</h3><p>฿${p.price}</p><button onclick="addToCart('${p.name}',${p.price},'${p.image}')">เพิ่มไปยังตะกร้า</button>`;
        productList.appendChild(div);
      });
    }
    displayCart(); // สำหรับ cart.html
  });
  
  // แสดงตะกร้า
  function displayCart(){
    let cart=loadCart();
    let cartBox=document.getElementById("cartItems");
    if(!cartBox) return;
    cartBox.innerHTML=""; let total=0;
    cart.forEach((item,index)=>{
      let itemTotal=Number(item.price)*Number(item.qty); total+=itemTotal;
      cartBox.innerHTML+=`<div class="cart-item"><div class="item-info"><img src="${item.image}"><div><div class="item-name">${item.name}</div><div class="item-price">${item.price} ฿ × ${item.qty}</div></div></div><button class="remove-btn" onclick="removeItem(${index})">ลบ</button></div>`;
    });
    document.getElementById("cartTotal").innerText=total;
  }
  
  // ลบสินค้า
  function removeItem(index){
    let cart=loadCart();
    if(index>=0 && index<cart.length){ cart.splice(index,1); saveCart(cart); displayCart(); updateCartCount(); }
  }
  
  // Checkout (จำลอง)
  function checkout(){
    let cart=loadCart();
    if(cart.length===0){ alert("ตะกร้าว่าง!"); return; }
    alert("ชำระเงินสำเร็จ!"); localStorage.removeItem("cart"); displayCart(); updateCartCount();
  }
  