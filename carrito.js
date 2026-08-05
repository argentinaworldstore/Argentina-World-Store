(function(){
 const products=window.PRODUCTOS||[];
 let cart=[];
 try{cart=JSON.parse(localStorage.getItem("awsCart")||"[]")}catch{}
 if(!Array.isArray(cart))cart=[];

 // Eliminar artículos antiguos o inexistentes para evitar un contador fantasma.
 cart = cart.filter(item =>
   products.some(product => String(product.id) === String(item.id))
 );
 localStorage.setItem("awsCart", JSON.stringify(cart));
 localStorage.setItem(
   "awsCartCount",
   String(cart.reduce((sum,item)=>sum+(Number(item.quantity)||1),0))
 );

 const countryCode=(localStorage.getItem("awsCountryCode")||"AR").toUpperCase();
 const foreign=countryCode!=="AR";
 let arsPerUsd=null;
 let paypalConfigured=false;

 function unitPriceARS(p){
   return foreign
     ? Number(p.foreignPriceARS||Number(p.basePriceARS||0)*2)
     : Number(p.basePriceARS||0);
 }

 function moneyARS(value){
   return new Intl.NumberFormat("es-AR",{
     style:"currency",
     currency:"ARS",
     maximumFractionDigits:0
   }).format(value);
 }

 function moneyUSD(value){
   return new Intl.NumberFormat("en-US",{
     style:"currency",
     currency:"USD",
     minimumFractionDigits:2,
     maximumFractionDigits:2
   }).format(value);
 }

 function displayMoney(arsValue){
   if(foreign && Number.isFinite(arsPerUsd) && arsPerUsd>0){
     return moneyUSD(arsValue/arsPerUsd);
   }
   return moneyARS(arsValue);
 }

 function save(){
   cart=cart.map(item=>({
     ...item,
     quantity:Math.max(1,Number(item.quantity)||1)
   }));
   localStorage.setItem("awsCart",JSON.stringify(cart));
   localStorage.setItem(
     "awsCartCount",
     String(cart.reduce((sum,item)=>sum+(Number(item.quantity)||1),0))
   );
   window.dispatchEvent(new Event("aws-cart-updated"));
   render();
 }

 function render(){
   const wrap=document.getElementById("cartItems");
   const count=cart.reduce((sum,item)=>sum+(Number(item.quantity)||1),0);

   document.getElementById("cartProductCount").textContent=count;
   document.getElementById("summaryCount").textContent=count;
   document.querySelectorAll("#cartCount").forEach(el=>el.textContent=count);

   const info=document.getElementById("paymentProviderInfo");
   if(info){
     if(foreign){
       info.textContent=Number.isFinite(arsPerUsd) && arsPerUsd>0
         ? `Pago internacional con PayPal en USD · País: ${countryCode}`
         : `Pago internacional con PayPal · Falta configurar ARS_PER_USD`;
     }else{
       info.textContent="Pago en Argentina con Mercado Pago";
     }
   }

   if(!cart.length){
     wrap.innerHTML=
       '<div class="empty-cart">'+
       '<h2>Tu carrito está vacío</h2>'+
       '<p>Elegí productos de nuestras categorías para comenzar tu compra.</p>'+
       '<a class="checkout-btn" href="index.html#destacados">Ver productos</a>'+
       '</div>';
     document.getElementById("cartSubtotal").textContent=displayMoney(0);
     document.getElementById("cartTotal").textContent=displayMoney(0);
     return;
   }

   let totalARS=0;

   wrap.innerHTML=cart.map((item,index)=>{
     const product=products.find(p=>String(p.id)===String(item.id));
     if(!product)return "";

     const minimum=Math.max(1,Number(product.minPurchaseQuantity)||1);
     const quantity=Math.max(minimum,Number(item.quantity)||minimum);
     const priceARS=unitPriceARS(product);
     totalARS+=priceARS*quantity;

     const foreignNote=foreign
       ? (
          Number.isFinite(arsPerUsd) && arsPerUsd>0
            ? `<p>Precio internacional: ${moneyUSD(priceARS/arsPerUsd)} USD por unidad.</p>`
            : '<p>Configurá ARS_PER_USD en .env para mostrar y cobrar en USD.</p>'
         )
       : "";

     return `
       <article class="cart-item">
         <img
           src="Fotos/${product.subcategory}/${product.images[0]}"
           onerror="this.src='assets/logo-argentina-world-store.jpeg'"
           alt="${product.name}"
         >
         <div>
           <h3>${product.name}</h3>
           <p>
             CANTIDAD:
             <input
               data-index="${index}"
               class="cart-qty"
               type="number"
               min="${minimum}"
               value="${quantity}"
             >
           </p>
           <strong>${displayMoney(priceARS)}</strong>
           ${item.color ? `<p><b>Color:</b> ${item.color}</p>` : ""}
           ${item.size ? `<p><b>Talle:</b> ${item.size}</p>` : ""}
           ${minimum>1 ? `<p class="minimum-cart-note"><b>Compra mínima:</b> ${minimum} unidades</p>` : ""}
           ${foreignNote}
           ${Array.isArray(item.selections) && item.selections.length ? `<div class="cart-selections"><strong>Modelos elegidos:</strong><ul>${item.selections.map(s=>`<li>${s.name}: ${s.quantity}</li>`).join("")}</ul></div>` : ""}
         </div>
         <button class="cart-remove" data-index="${index}">×</button>
       </article>
     `;
   }).join("");

   document.getElementById("cartSubtotal").textContent=displayMoney(totalARS);
   document.getElementById("cartTotal").textContent=displayMoney(totalARS);

   document.querySelectorAll(".cart-qty").forEach(input=>{
     input.onchange=()=>{
       const index=Number(input.dataset.index);
       const product=products.find(p=>String(p.id)===String(cart[index].id));
       const minimum=Math.max(1,Number(product?.minPurchaseQuantity)||1);
       cart[index].quantity=Math.max(minimum,Number(input.value)||minimum);
       save();
     };
   });

   document.querySelectorAll(".cart-remove").forEach(button=>{
     button.onclick=()=>{
       cart.splice(Number(button.dataset.index),1);
       save();
     };
   });
 }

 async function checkout(){
   const button=document.getElementById("startCheckout");
   const errorBox=document.getElementById("checkoutError");

   errorBox.hidden=true;
   errorBox.textContent="";

   if(!cart.length){
     errorBox.textContent="El carrito está vacío.";
     errorBox.hidden=false;
     return;
   }

   if(foreign){
     if(!Number.isFinite(arsPerUsd) || arsPerUsd<=0){
       errorBox.textContent=
         "Falta ARS_PER_USD en el archivo .env. Ejemplo: ARS_PER_USD=1400";
       errorBox.hidden=false;
       return;
     }

     if(!paypalConfigured){
       errorBox.textContent=
         "Faltan PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET Live en el archivo .env.";
       errorBox.hidden=false;
       return;
     }
   }

   button.disabled=true;
   button.textContent="Preparando pago…";

   try{
     const endpoint=foreign
       ? "/api/checkout/paypal"
       : "/api/checkout/mercadopago";

     const response=await fetch(endpoint,{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify({items:cart,countryCode})
     });

     const data=await response.json();

     if(!response.ok){
       throw new Error(data.error||"No se pudo iniciar el pago.");
     }

     location.href=data.checkoutUrl;
   }catch(error){
     errorBox.textContent=error.message;
     errorBox.hidden=false;
     button.disabled=false;
     button.textContent="Continuar al pago";
   }
 }

 async function init(){
   if(foreign){
     try{
       const response=await fetch("/api/store-config",{cache:"no-store"});
       const config=await response.json();

       arsPerUsd=Number(config.arsPerUsd);
       paypalConfigured=Boolean(config.paypalConfigured);
     }catch(error){
       arsPerUsd=null;
       paypalConfigured=false;
     }
   }

   document.getElementById("startCheckout").onclick=checkout;
   render();
 }

 init();
})();