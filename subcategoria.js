
const folder=document.body.dataset.folder;
const products=(window.CATALOGO&&window.CATALOGO[folder])||[];
const grid=document.getElementById("productGrid"), count=document.getElementById("count");
const search=document.getElementById("pageSearch"), sort=document.getElementById("sort"), customerFilter=document.getElementById("customerFilter");
const FALLBACK="../assets/logo-argentina-world-store.jpeg";
let cart=Number(localStorage.getItem("awsCartCount")||0);
document.getElementById("cartCount").textContent=cart;
const hoverTimers=new Map();

const CURRENCY_BY_COUNTRY={"AD": "EUR", "AE": "AED", "AF": "AFN", "AG": "XCD", "AI": "XCD", "AL": "ALL", "AM": "AMD", "AO": "AOA", "AR": "ARS", "AS": "USD", "AT": "EUR", "AU": "AUD", "AW": "AWG", "AX": "EUR", "AZ": "AZN", "BA": "BAM", "BB": "BBD", "BD": "BDT", "BE": "EUR", "BF": "XOF", "BG": "BGN", "BH": "BHD", "BI": "BIF", "BJ": "XOF", "BL": "EUR", "BM": "BMD", "BN": "BND", "BO": "BOB", "BQ": "USD", "BR": "BRL", "BS": "BSD", "BT": "INR", "BV": "NOK", "BW": "BWP", "BY": "BYN", "BZ": "BZD", "CA": "CAD", "CC": "AUD", "CD": "CDF", "CF": "XAF", "CG": "XAF", "CH": "CHF", "CI": "XOF", "CK": "NZD", "CL": "CLP", "CM": "XAF", "CN": "CNY", "CO": "COP", "CR": "CRC", "CU": "CUP", "CV": "CVE", "CW": "XCG", "CX": "AUD", "CY": "EUR", "CZ": "CZK", "DE": "EUR", "DJ": "DJF", "DK": "DKK", "DM": "XCD", "DO": "DOP", "DZ": "DZD", "EC": "USD", "EE": "EUR", "EG": "EGP", "EH": "MAD", "ER": "ERN", "ES": "EUR", "ET": "ETB", "FI": "EUR", "FJ": "FJD", "FK": "FKP", "FM": "USD", "FO": "DKK", "FR": "EUR", "GA": "XAF", "GB": "GBP", "GD": "XCD", "GE": "GEL", "GF": "EUR", "GG": "GBP", "GH": "GHS", "GI": "GIP", "GL": "DKK", "GM": "GMD", "GN": "GNF", "GP": "EUR", "GQ": "XAF", "GR": "EUR", "GS": "GBP", "GT": "GTQ", "GU": "USD", "GW": "XOF", "GY": "GYD", "HK": "HKD", "HM": "AUD", "HN": "HNL", "HR": "EUR", "HT": "HTG", "HU": "HUF", "ID": "IDR", "IE": "EUR", "IL": "ILS", "IM": "GBP", "IN": "INR", "IO": "USD", "IQ": "IQD", "IR": "IRR", "IS": "ISK", "IT": "EUR", "JE": "GBP", "JM": "JMD", "JO": "JOD", "JP": "JPY", "KE": "KES", "KG": "KGS", "KH": "KHR", "KI": "AUD", "KM": "KMF", "KN": "XCD", "KP": "KPW", "KR": "KRW", "KW": "KWD", "KY": "KYD", "KZ": "KZT", "LA": "LAK", "LB": "LBP", "LC": "XCD", "LI": "CHF", "LK": "LKR", "LR": "LRD", "LS": "ZAR", "LT": "EUR", "LU": "EUR", "LV": "EUR", "LY": "LYD", "MA": "MAD", "MC": "EUR", "MD": "MDL", "ME": "EUR", "MF": "EUR", "MG": "MGA", "MH": "USD", "MK": "MKD", "ML": "XOF", "MM": "MMK", "MN": "MNT", "MO": "MOP", "MP": "USD", "MQ": "EUR", "MR": "MRU", "MS": "XCD", "MT": "EUR", "MU": "MUR", "MV": "MVR", "MW": "MWK", "MX": "MXN", "MY": "MYR", "MZ": "MZN", "NA": "ZAR", "NC": "XPF", "NE": "XOF", "NF": "AUD", "NG": "NGN", "NI": "NIO", "NL": "EUR", "NO": "NOK", "NP": "NPR", "NR": "AUD", "NU": "NZD", "NZ": "NZD", "OM": "OMR", "PA": "PAB", "PE": "PEN", "PF": "XPF", "PG": "PGK", "PH": "PHP", "PK": "PKR", "PL": "PLN", "PM": "EUR", "PN": "NZD", "PR": "USD", "PS": "ILS", "PT": "EUR", "PW": "USD", "PY": "PYG", "QA": "QAR", "RE": "EUR", "RO": "RON", "RS": "RSD", "RU": "RUB", "RW": "RWF", "SA": "SAR", "SB": "SBD", "SC": "SCR", "SD": "SDG", "SE": "SEK", "SG": "SGD", "SH": "SHP", "SI": "EUR", "SJ": "NOK", "SK": "EUR", "SL": "SLE", "SM": "EUR", "SN": "XOF", "SO": "SOS", "SR": "SRD", "SS": "SSP", "ST": "STN", "SV": "USD", "SX": "XCG", "SY": "SYP", "SZ": "SZL", "TC": "USD", "TD": "XAF", "TF": "EUR", "TG": "XOF", "TH": "THB", "TJ": "TJS", "TK": "NZD", "TL": "USD", "TM": "TMT", "TN": "TND", "TO": "TOP", "TR": "TRY", "TT": "TTD", "TV": "AUD", "TW": "TWD", "TZ": "TZS", "UA": "UAH", "UG": "UGX", "UM": "USD", "US": "USD", "UY": "UYU", "UZ": "UZS", "VA": "EUR", "VC": "XCD", "VE": "VES", "VG": "USD", "VI": "USD", "VN": "VND", "VU": "VUV", "WF": "XPF", "WS": "WST", "YE": "YER", "YT": "EUR", "ZA": "ZAR", "ZM": "ZMW", "ZW": "USD", "AQ": "USD", "XK": "EUR"};
let awsCountryCode=String(localStorage.getItem("awsCountryCode")||"AR").toUpperCase();
let arsPerUsd=null;
let usdRates={USD:1};

function imagePath(file){return `../Fotos/${folder}/${file}`;}
function esc(s){return String(s).replace(/"/g,"&quot;")}
function money(value,currency){
  try{return new Intl.NumberFormat(undefined,{style:"currency",currency,maximumFractionDigits:currency==="JPY"||currency==="KRW"?0:2}).format(value)}
  catch{return `${currency} ${Number(value||0).toFixed(2)}`}
}
function rawProductPrice(p){return awsCountryCode==="AR"?Number(p.basePriceARS||0):Number(p.foreignPriceARS||p.basePriceARS||0)}
function localPrice(p){
  const raw=rawProductPrice(p);
  if(awsCountryCode==="AR")return {value:raw,currency:"ARS"};
  let currency=CURRENCY_BY_COUNTRY[awsCountryCode]||"USD";
  if(!(Number(arsPerUsd)>0))return {value:raw,currency:"ARS"};
  const usd=raw/Number(arsPerUsd);
  if(currency==="USD")return {value:usd,currency:"USD"};
  const rate=Number(usdRates[currency]);
  if(Number.isFinite(rate)&&rate>0)return {value:usd*rate,currency};
  return {value:usd,currency:"USD"};
}
async function loadLocalRates(){
  if(awsCountryCode==="AR"){render();return;}
  try{
    const ar=await fetch("https://open.er-api.com/v6/latest/USD",{cache:"no-store"}).then(r=>r.json());
    arsPerUsd=Number(ar?.rates?.ARS)||null;
    usdRates=ar?.rates||{USD:1};
  }catch(e){
    console.warn("No se pudieron actualizar las monedas de la subcategoría",e);
  }
  render();
}

function card(p){
 const first=p.images[0]||"";
 const encoded=encodeURIComponent(JSON.stringify(p.images));
 const local=localPrice(p);
 return `<article class="product" data-id="${p.id}" data-images="${encoded}" onmouseenter="startHover(this)" onmouseleave="stopHover(this)">
 <a class="image-stage product-image-link" href="../productos/${p.id}.html" aria-label="Ver ${esc(p.name)}">
  <img class="card-main-image" src="${imagePath(first)}" alt="${esc(p.name)}" onerror="this.onerror=null;this.src='${FALLBACK}';this.classList.add('missing')">
  <span class="photo-count">${p.images.length} foto${p.images.length===1?"":"s"}</span>
 </a>
 <div class="info"><h2>${p.name}</h2><p class="card-price">${money(local.value,local.currency)}</p>
 ${Number(p.minPurchaseQuantity)>1 ? `<p class="card-minimum">Compra mínima: ${p.minPurchaseQuantity} unidades</p>` : ""}
 <div class="actions"><a class="view" href="../productos/${p.id}.html">Comprar</a><button class="cart" onclick="addCart(event)">＋</button></div></div>
 </article>`;
}
function render(){
 stopAllHover();
 let list=[...products],q=(search?.value||"").trim().toLowerCase();
 if(q)list=list.filter(p=>p.name.toLowerCase().includes(q));
 if(customerFilter&&customerFilter.value==="minorista")list=list.filter(p=>p.saleType!=="mayorista");
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
function closeModal(){document.getElementById("modal")?.classList.remove("open");document.body.style.overflow=""}
search?.addEventListener("input",render);customerFilter?.addEventListener("change",render);
document.querySelector(".newsletter form")?.addEventListener("submit",e=>{e.preventDefault();alert("¡Gracias por suscribirte!")});

const subMenu=document.getElementById("subMenu"),backdrop=document.getElementById("subMenuBackdrop");
function toggleMenu(open){subMenu?.classList.toggle("open",open);backdrop?.classList.toggle("open",open)}
document.getElementById("openSubMenu")?.addEventListener("click",()=>toggleMenu(true));
document.getElementById("closeSubMenu")?.addEventListener("click",()=>toggleMenu(false));
backdrop?.addEventListener("click",()=>toggleMenu(false));

window.addEventListener("storage",e=>{
 if(e.key==="awsCountryCode"){awsCountryCode=String(e.newValue||"AR").toUpperCase();loadLocalRates();}
});

render();
loadLocalRates();

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

