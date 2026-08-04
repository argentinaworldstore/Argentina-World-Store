
const folder=document.body.dataset.folder;
const products=(window.CATALOGO&&window.CATALOGO[folder])||[];
const grid=document.getElementById("productGrid"), count=document.getElementById("count");
const search=document.getElementById("pageSearch"), sort=document.getElementById("sort"), customerFilter=document.getElementById("customerFilter");
const FALLBACK="../assets/logo-argentina-world-store.jpeg";
let cart=Number(localStorage.getItem("awsCartCount")||0);
document.getElementById("cartCount").textContent=cart;
const hoverTimers=new Map();

function imagePath(file){return `../Fotos/${folder}/${file}`;}
function esc(s){return String(s).replace(/"/g,"&quot;")}
function card(p){
 const first=p.images[0]||"";
 const encoded=encodeURIComponent(JSON.stringify(p.images));
 return `<article class="product" data-id="${p.id}" data-images="${encoded}" onmouseenter="startHover(this)" onmouseleave="stopHover(this)">
 <a class="image-stage product-image-link" href="../productos/${p.id}.html" aria-label="Ver ${esc(p.name)}">
  <img class="card-main-image" src="${imagePath(first)}" alt="${esc(p.name)}" onerror="this.onerror=null;this.src='${FALLBACK}';this.classList.add('missing')">
  <span class="photo-count">${p.images.length} foto${p.images.length===1?"":"s"}</span>
 </a>
 <div class="info"><h2>${p.name}</h2><p class="card-price">${new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(p.basePriceARS||0)}</p>
 ${Number(p.minPurchaseQuantity)>1 ? `<p class="card-minimum">Compra mínima: ${p.minPurchaseQuantity} unidades</p>` : ""}
 <div class="actions"><a class="view" href="../productos/${p.id}.html">Comprar</a><button class="cart" onclick="addCart(event)">＋</button></div></div>
 </article>`;
}
function render(){
 stopAllHover();
 let list=[...products],q=search.value.trim().toLowerCase();
 if(q)list=list.filter(p=>p.name.toLowerCase().includes(q));
 if(customerFilter&&customerFilter.value==="minorista")list=[];
 list.sort((a,b)=>a.name.localeCompare(b.name));
 count.textContent=`${list.length} producto${list.length===1?"":"s"}`;
 grid.innerHTML=list.length?list.map(card).join(""):`<div class="empty"><h2>Productos próximamente</h2><p>Agregá las imágenes dentro de <strong>Fotos/${folder}</strong>.</p></div>`;
}
function startHover(card){
 const images=JSON.parse(decodeURIComponent(card.dataset.images||"%5B%5D"));
 if(images.length<2)return;
 card.classList.add("is-hovering");
 let index=0; const img=card.querySelector(".card-main-image");
 const timer=setInterval(()=>{index=(index+1)%images.length;img.style.opacity=".2";setTimeout(()=>{img.src=imagePath(images[index]);img.style.opacity="1"},180)},900);
 hoverTimers.set(card,timer);
}
function stopHover(card){
 const timer=hoverTimers.get(card);if(timer)clearInterval(timer);hoverTimers.delete(card);
 card.classList.remove("is-hovering");
 const images=JSON.parse(decodeURIComponent(card.dataset.images||"%5B%5D"));
 const img=card.querySelector(".card-main-image");
 if(images[0]){img.src=imagePath(images[0]);img.style.opacity="1"}
}
function stopAllHover(){hoverTimers.forEach(clearInterval);hoverTimers.clear()}
function addCart(e){e.stopPropagation();cart++;localStorage.setItem("awsCartCount",cart);document.getElementById("cartCount").textContent=cart}
function openProduct(id){
 const p=products.find(x=>x.id===id);if(!p)return;
 const modal=document.getElementById("modal"),main=document.getElementById("modalMain");
 document.getElementById("modalTitle").textContent=p.name;main.src=imagePath(p.images[0]);
 main.onerror=()=>{main.onerror=null;main.src=FALLBACK};
 document.getElementById("thumbs").innerHTML=p.images.map((f,i)=>`<button class="${i===0?"active":""}" onclick="setPhoto('${encodeURIComponent(f)}',this)"><img src="${imagePath(f)}" onerror="this.src='${FALLBACK}'"></button>`).join("");
 modal.classList.add("open");document.body.style.overflow="hidden";
}
function setPhoto(encoded,btn){const file=decodeURIComponent(encoded),main=document.getElementById("modalMain");main.src=imagePath(file);document.querySelectorAll("#thumbs button").forEach(x=>x.classList.remove("active"));btn.classList.add("active")}
function closeModal(){document.getElementById("modal").classList.remove("open");document.body.style.overflow=""}
search.addEventListener("input",render);if(customerFilter)customerFilter.addEventListener("change",render);
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
document.querySelector(".newsletter form").addEventListener("submit",e=>{e.preventDefault();alert("¡Gracias por suscribirte!")});
const subMenu=document.getElementById("subMenu"),backdrop=document.getElementById("subMenuBackdrop");
function toggleMenu(open){subMenu.classList.toggle("open",open);backdrop.classList.toggle("open",open)}
document.getElementById("openSubMenu").onclick=()=>toggleMenu(true);
document.getElementById("closeSubMenu").onclick=()=>toggleMenu(false);
backdrop.onclick=()=>toggleMenu(false);
render();


// HEADER TRANSPARENTE COMO EN LA PÁGINA PRINCIPAL
const subHeader=document.querySelector(".sub-site-header");
function updateSubHeader(){
  if(!subHeader)return;
  const hovered=subHeader.matches(":hover");
  subHeader.classList.toggle("scrolled", window.scrollY>80 && hovered);
}
window.addEventListener("scroll",updateSubHeader);
if(subHeader){
  subHeader.addEventListener("mouseenter",updateSubHeader);
  subHeader.addEventListener("mouseleave",()=>{
    subHeader.classList.remove("scrolled");
  });
}
updateSubHeader();

// CLICK FOTO PRODUCTO
document.addEventListener('click',e=>{const photo=e.target.closest('.product-card .image,.product-card .product-image,.product-card img');if(photo){const card=photo.closest('.product-card');const id=card?.dataset?.id||photo.dataset.id;if(id)location.href='../productos/'+id+'.html';}});

// SUBCATEGORY_LANGUAGE_SYNC
document.addEventListener("DOMContentLoaded",()=>{const sel=document.getElementById("languageSelect");if(sel&&localStorage.getItem("awsLang")){sel.value=localStorage.getItem("awsLang")}});
