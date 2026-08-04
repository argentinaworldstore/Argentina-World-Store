
(function(){
  function pathPrefix(){return location.pathname.includes("/productos/")||location.pathname.includes("/subcategorias/")?"../":""}
  function openAuth(){document.getElementById("authOverlay")?.classList.add("open");document.body.style.overflow="hidden"}
  function closeAuth(){document.getElementById("authOverlay")?.classList.remove("open");document.body.style.overflow=""}
  document.addEventListener("click",e=>{
    if(e.target.closest(".login-btn")){e.preventDefault();openAuth()}
    if(e.target.closest(".auth-close")||e.target.id==="authOverlay"){if(e.target.id==="authOverlay"||e.target.closest(".auth-close"))closeAuth()}
    if(e.target.closest(".cart-btn")){e.preventDefault();location.href=pathPrefix()+"carrito.html"}
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAuth()});
  function syncCart(){
    let cart=[];try{cart=JSON.parse(localStorage.getItem("awsCart")||"[]")}catch{}
    const count=cart.reduce((a,x)=>a+(Number(x.quantity)||1),0);
    localStorage.setItem("awsCartCount",String(count));document.querySelectorAll("#cartCount").forEach(x=>x.textContent=count);
  }
  syncCart();
  window.addEventListener("storage",syncCart);
})();
