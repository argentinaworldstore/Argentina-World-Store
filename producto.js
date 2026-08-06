
const PRODUCT_ID=document.body.dataset.productId;
const PRODUCTS=window.PRODUCTOS||[];
const PRODUCT=PRODUCTS.find(p=>p.id===PRODUCT_ID);
const CURRENCY_BY_COUNTRY={"AD": "EUR", "AE": "AED", "AF": "AFN", "AG": "XCD", "AI": "XCD", "AL": "ALL", "AM": "AMD", "AO": "AOA", "AR": "ARS", "AS": "USD", "AT": "EUR", "AU": "AUD", "AW": "AWG", "AX": "EUR", "AZ": "AZN", "BA": "BAM", "BB": "BBD", "BD": "BDT", "BE": "EUR", "BF": "XOF", "BG": "BGN", "BH": "BHD", "BI": "BIF", "BJ": "XOF", "BL": "EUR", "BM": "BMD", "BN": "BND", "BO": "BOB", "BQ": "USD", "BR": "BRL", "BS": "BSD", "BT": "INR", "BV": "NOK", "BW": "BWP", "BY": "BYN", "BZ": "BZD", "CA": "CAD", "CC": "AUD", "CD": "CDF", "CF": "XAF", "CG": "XAF", "CH": "CHF", "CI": "XOF", "CK": "NZD", "CL": "CLP", "CM": "XAF", "CN": "CNY", "CO": "COP", "CR": "CRC", "CU": "CUP", "CV": "CVE", "CW": "XCG", "CX": "AUD", "CY": "EUR", "CZ": "CZK", "DE": "EUR", "DJ": "DJF", "DK": "DKK", "DM": "XCD", "DO": "DOP", "DZ": "DZD", "EC": "USD", "EE": "EUR", "EG": "EGP", "EH": "MAD", "ER": "ERN", "ES": "EUR", "ET": "ETB", "FI": "EUR", "FJ": "FJD", "FK": "FKP", "FM": "USD", "FO": "DKK", "FR": "EUR", "GA": "XAF", "GB": "GBP", "GD": "XCD", "GE": "GEL", "GF": "EUR", "GG": "GBP", "GH": "GHS", "GI": "GIP", "GL": "DKK", "GM": "GMD", "GN": "GNF", "GP": "EUR", "GQ": "XAF", "GR": "EUR", "GS": "GBP", "GT": "GTQ", "GU": "USD", "GW": "XOF", "GY": "GYD", "HK": "HKD", "HM": "AUD", "HN": "HNL", "HR": "EUR", "HT": "HTG", "HU": "HUF", "ID": "IDR", "IE": "EUR", "IL": "ILS", "IM": "GBP", "IN": "INR", "IO": "USD", "IQ": "IQD", "IR": "IRR", "IS": "ISK", "IT": "EUR", "JE": "GBP", "JM": "JMD", "JO": "JOD", "JP": "JPY", "KE": "KES", "KG": "KGS", "KH": "KHR", "KI": "AUD", "KM": "KMF", "KN": "XCD", "KP": "KPW", "KR": "KRW", "KW": "KWD", "KY": "KYD", "KZ": "KZT", "LA": "LAK", "LB": "LBP", "LC": "XCD", "LI": "CHF", "LK": "LKR", "LR": "LRD", "LS": "ZAR", "LT": "EUR", "LU": "EUR", "LV": "EUR", "LY": "LYD", "MA": "MAD", "MC": "EUR", "MD": "MDL", "ME": "EUR", "MF": "EUR", "MG": "MGA", "MH": "USD", "MK": "MKD", "ML": "XOF", "MM": "MMK", "MN": "MNT", "MO": "MOP", "MP": "USD", "MQ": "EUR", "MR": "MRU", "MS": "XCD", "MT": "EUR", "MU": "MUR", "MV": "MVR", "MW": "MWK", "MX": "MXN", "MY": "MYR", "MZ": "MZN", "NA": "ZAR", "NC": "XPF", "NE": "XOF", "NF": "AUD", "NG": "NGN", "NI": "NIO", "NL": "EUR", "NO": "NOK", "NP": "NPR", "NR": "AUD", "NU": "NZD", "NZ": "NZD", "OM": "OMR", "PA": "PAB", "PE": "PEN", "PF": "XPF", "PG": "PGK", "PH": "PHP", "PK": "PKR", "PL": "PLN", "PM": "EUR", "PN": "NZD", "PR": "USD", "PS": "ILS", "PT": "EUR", "PW": "USD", "PY": "PYG", "QA": "QAR", "RE": "EUR", "RO": "RON", "RS": "RSD", "RU": "RUB", "RW": "RWF", "SA": "SAR", "SB": "SBD", "SC": "SCR", "SD": "SDG", "SE": "SEK", "SG": "SGD", "SH": "SHP", "SI": "EUR", "SJ": "NOK", "SK": "EUR", "SL": "SLE", "SM": "EUR", "SN": "XOF", "SO": "SOS", "SR": "SRD", "SS": "SSP", "ST": "STN", "SV": "USD", "SX": "XCG", "SY": "SYP", "SZ": "SZL", "TC": "USD", "TD": "XAF", "TF": "EUR", "TG": "XOF", "TH": "THB", "TJ": "TJS", "TK": "NZD", "TL": "USD", "TM": "TMT", "TN": "TND", "TO": "TOP", "TR": "TRY", "TT": "TTD", "TV": "AUD", "TW": "TWD", "TZ": "TZS", "UA": "UAH", "UG": "UGX", "UM": "USD", "US": "USD", "UY": "UYU", "UZ": "UZS", "VA": "EUR", "VC": "XCD", "VE": "VES", "VG": "USD", "VI": "USD", "VN": "VND", "VU": "VUV", "WF": "XPF", "WS": "WST", "YE": "YER", "YT": "EUR", "ZA": "ZAR", "ZM": "ZMW", "ZW": "USD", "AQ": "USD", "XK": "EUR"};
const T={"es": {"menu": "Menú", "search": "Buscar", "signin": "Iniciar sesión", "cart": "Carrito", "sale": "Producto argentino", "color": "Color", "size": "Talle", "quantity": "Cantidad", "buy": "Agregar al carrito", "desc": "Descripción y cuidados", "shipping": "Envíos y devoluciones", "recommended": "Productos recomendados", "retail": "Precio Argentina", "foreign": "Precio internacional", "community": "Comunidad Argentina World Store", "news": "Recibí novedades y nuevos productos", "subscribe": "Suscribirme", "help": "Ayuda", "categories": "Categorías", "company": "Nosotros", "contact": "Contacto", "added": "Producto agregado al carrito", "priceNote": "La conversión se actualiza por Internet. Si no hay conexión, se muestra el precio de referencia en ARS."}, "en": {"menu": "Menu", "search": "Search", "signin": "Sign in", "cart": "Cart", "sale": "Argentine product", "color": "Color", "size": "Size", "quantity": "Quantity", "buy": "Add to cart", "desc": "Description and care", "shipping": "Shipping and returns", "recommended": "Recommended products", "retail": "Argentina price", "foreign": "International price", "community": "Argentina World Store community", "news": "Get news and new products", "subscribe": "Subscribe", "help": "Help", "categories": "Categories", "company": "Company", "contact": "Contact", "added": "Product added to cart", "priceNote": "Currency conversion updates online. If unavailable, the reference price is shown in ARS."}, "pt": {"menu": "Menu", "search": "Buscar", "signin": "Entrar", "cart": "Carrinho", "sale": "Produto argentino", "color": "Cor", "size": "Tamanho", "quantity": "Quantidade", "buy": "Adicionar ao carrinho", "desc": "Descrição e cuidados", "shipping": "Envios e devoluções", "recommended": "Produtos recomendados", "retail": "Preço Argentina", "foreign": "Preço internacional", "community": "Comunidade Argentina World Store", "news": "Receba novidades e novos produtos", "subscribe": "Assinar", "help": "Ajuda", "categories": "Categorias", "company": "Empresa", "contact": "Contato", "added": "Produto adicionado ao carrinho", "priceNote": "A conversão é atualizada pela Internet."}, "fr": {"menu": "Menu", "search": "Rechercher", "signin": "Se connecter", "cart": "Panier", "sale": "Produit argentin", "color": "Couleur", "size": "Taille", "quantity": "Quantité", "buy": "Ajouter au panier", "desc": "Description et entretien", "shipping": "Livraison et retours", "recommended": "Produits recommandés", "retail": "Prix Argentine", "foreign": "Prix international", "community": "Communauté Argentina World Store", "news": "Recevez les nouveautés", "subscribe": "S’abonner", "help": "Aide", "categories": "Catégories", "company": "Entreprise", "contact": "Contact", "added": "Produit ajouté au panier", "priceNote": "La conversion est mise à jour en ligne."}, "de": {"menu": "Menü", "search": "Suchen", "signin": "Anmelden", "cart": "Warenkorb", "sale": "Argentinisches Produkt", "color": "Farbe", "size": "Größe", "quantity": "Menge", "buy": "In den Warenkorb", "desc": "Beschreibung und Pflege", "shipping": "Versand und Rückgabe", "recommended": "Empfohlene Produkte", "retail": "Preis Argentinien", "foreign": "Internationaler Preis", "community": "Argentina World Store Community", "news": "Neuigkeiten erhalten", "subscribe": "Abonnieren", "help": "Hilfe", "categories": "Kategorien", "company": "Unternehmen", "contact": "Kontakt", "added": "Produkt hinzugefügt", "priceNote": "Die Umrechnung wird online aktualisiert."}, "it": {"menu": "Menu", "search": "Cerca", "signin": "Accedi", "cart": "Carrello", "sale": "Prodotto argentino", "color": "Colore", "size": "Taglia", "quantity": "Quantità", "buy": "Aggiungi al carrello", "desc": "Descrizione e cura", "shipping": "Spedizioni e resi", "recommended": "Prodotti consigliati", "retail": "Prezzo Argentina", "foreign": "Prezzo internazionale", "community": "Comunità Argentina World Store", "news": "Ricevi novità", "subscribe": "Iscriviti", "help": "Aiuto", "categories": "Categorie", "company": "Azienda", "contact": "Contatto", "added": "Prodotto aggiunto", "priceNote": "La conversione si aggiorna online."}, "zh": {"menu": "菜单", "search": "搜索", "signin": "登录", "cart": "购物车", "sale": "阿根廷产品", "color": "颜色", "size": "尺码", "quantity": "数量", "buy": "加入购物车", "desc": "描述与保养", "shipping": "配送与退货", "recommended": "推荐产品", "retail": "阿根廷价格", "foreign": "国际价格", "community": "Argentina World Store 社区", "news": "接收新品资讯", "subscribe": "订阅", "help": "帮助", "categories": "分类", "company": "关于我们", "contact": "联系", "added": "商品已加入购物车", "priceNote": "汇率通过互联网更新。"}, "ja": {"menu": "メニュー", "search": "検索", "signin": "ログイン", "cart": "カート", "sale": "アルゼンチン製品", "color": "カラー", "size": "サイズ", "quantity": "数量", "buy": "カートに追加", "desc": "商品説明とお手入れ", "shipping": "配送と返品", "recommended": "おすすめ商品", "retail": "アルゼンチン価格", "foreign": "海外価格", "community": "Argentina World Store コミュニティ", "news": "新商品情報を受け取る", "subscribe": "登録", "help": "ヘルプ", "categories": "カテゴリー", "company": "会社情報", "contact": "お問い合わせ", "added": "カートに追加しました", "priceNote": "為替換算はオンラインで更新されます。"}, "ko": {"menu": "메뉴", "search": "검색", "signin": "로그인", "cart": "장바구니", "sale": "아르헨티나 제품", "color": "색상", "size": "사이즈", "quantity": "수량", "buy": "장바구니에 추가", "desc": "설명 및 관리", "shipping": "배송 및 반품", "recommended": "추천 상품", "retail": "아르헨티나 가격", "foreign": "해외 가격", "community": "Argentina World Store 커뮤니티", "news": "새 상품 소식 받기", "subscribe": "구독", "help": "도움말", "categories": "카테고리", "company": "회사", "contact": "문의", "added": "상품이 장바구니에 추가되었습니다", "priceNote": "환율은 온라인으로 업데이트됩니다."}, "ar": {"menu": "القائمة", "search": "بحث", "signin": "تسجيل الدخول", "cart": "السلة", "sale": "منتج أرجنتيني", "color": "اللون", "size": "المقاس", "quantity": "الكمية", "buy": "أضف إلى السلة", "desc": "الوصف والعناية", "shipping": "الشحن والإرجاع", "recommended": "منتجات موصى بها", "retail": "سعر الأرجنتين", "foreign": "السعر الدولي", "community": "مجتمع Argentina World Store", "news": "استلم أحدث المنتجات", "subscribe": "اشترك", "help": "المساعدة", "categories": "الفئات", "company": "الشركة", "contact": "اتصل بنا", "added": "تمت إضافة المنتج", "priceNote": "يتم تحديث التحويل عبر الإنترنت."}};

// Idiomas adicionales para mantener todas las páginas sincronizadas con el selector superior.
Object.assign(T,{
 ru:{...T.en,menu:"Меню",search:"Поиск",signin:"Войти",cart:"Корзина",sale:"Аргентинский товар",color:"Цвет / Вариант",size:"Размер",quantity:"Количество",buy:"Добавить в корзину",desc:"Описание и уход",shipping:"Доставка и возврат",recommended:"Рекомендуемые товары"},
 hi:{...T.en,menu:"मेनू",search:"खोजें",signin:"साइन इन",cart:"कार्ट",sale:"अर्जेंटीना उत्पाद",color:"रंग / विकल्प",size:"आकार",quantity:"मात्रा",buy:"कार्ट में जोड़ें",recommended:"अनुशंसित उत्पाद"},
 nl:{...T.en,menu:"Menu",search:"Zoeken",signin:"Inloggen",cart:"Winkelwagen",sale:"Argentijns product",color:"Kleur / Variant",size:"Maat",quantity:"Aantal",buy:"Toevoegen aan winkelwagen",recommended:"Aanbevolen producten"},
 pl:{...T.en,menu:"Menu",search:"Szukaj",signin:"Zaloguj się",cart:"Koszyk",sale:"Produkt argentyński",color:"Kolor / Wariant",size:"Rozmiar",quantity:"Ilość",buy:"Dodaj do koszyka",recommended:"Polecane produkty"},
 el:{...T.en,menu:"Μενού",search:"Αναζήτηση",signin:"Σύνδεση",cart:"Καλάθι",sale:"Αργεντίνικο προϊόν",color:"Χρώμα / Παραλλαγή",size:"Μέγεθος",quantity:"Ποσότητα",buy:"Προσθήκη στο καλάθι",recommended:"Προτεινόμενα προϊόντα"},
 tr:{...T.en,menu:"Menü",search:"Ara",signin:"Giriş yap",cart:"Sepet",sale:"Arjantin ürünü",color:"Renk / Varyant",size:"Beden",quantity:"Adet",buy:"Sepete ekle",recommended:"Önerilen ürünler"},
 id:{...T.en,menu:"Menu",search:"Cari",signin:"Masuk",cart:"Keranjang",sale:"Produk Argentina",color:"Warna / Varian",size:"Ukuran",quantity:"Jumlah",buy:"Tambahkan ke keranjang",recommended:"Produk rekomendasi"}
});
const HEADER_T={
 es:{home:"Inicio",featured:"Destacados",categories:"Categorías",subcategories:"Subcategorías",contact:"Contacto",countries:"Elige tu país",login:"Iniciar sesión",food:"Productos Regionales",clothing:"Indumentaria",bazaar:"Bazar y Accesorios",mates:"Mates y Bombillas"},
 en:{home:"Home",featured:"Featured",categories:"Categories",subcategories:"Subcategories",contact:"Contact",countries:"Countries",login:"Sign in",food:"Food",clothing:"Clothing",bazaar:"Home goods",mates:"Mates & Bombillas"},
 zh:{home:"首页",featured:"精选",categories:"分类",subcategories:"子分类",contact:"联系",countries:"国家",login:"登录",food:"食品",clothing:"服装",bazaar:"家居用品",mates:"马黛茶与吸管"},
 pt:{home:"Início",featured:"Destaques",categories:"Categorias",subcategories:"Subcategorias",contact:"Contato",countries:"Elige tu país",login:"Entrar",food:"Alimentos",clothing:"Vestuário",bazaar:"Bazar y Accesorios",mates:"Mates e Bombillas"},
 fr:{home:"Accueil",featured:"Sélection",categories:"Catégories",subcategories:"Sous-catégories",contact:"Contact",countries:"Pays",login:"Se connecter",food:"Alimentation",clothing:"Vêtements",bazaar:"Maison",mates:"Matés et bombillas"},
 de:{home:"Start",featured:"Empfohlen",categories:"Kategorien",subcategories:"Unterkategorien",contact:"Kontakt",countries:"Länder",login:"Anmelden",food:"Lebensmittel",clothing:"Kleidung",bazaar:"Haushalt",mates:"Mate und Bombillas"}
};
const FALLBACK="../assets/logo-argentina-world-store.jpeg";
let currentLang=(localStorage.getItem("awsLang")||navigator.language||"es").split("-")[0];
if(!T[currentLang])currentLang="en";
let countryCode=(localStorage.getItem("awsCountryCode")||((navigator.language||"es-AR").split("-")[1])||"AR").toUpperCase();
let rates=null;
function tr(k){return (T[currentLang]||T.en)[k]||T.en[k]||k}
function imagePath(file){return `../Fotos/${PRODUCT.subcategory}/${file}`;}
function setLanguage(lang){
 currentLang=T[lang]?lang:"en";localStorage.setItem("awsLang",currentLang);document.documentElement.lang=currentLang;document.documentElement.dir=currentLang==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-t]").forEach(el=>el.textContent=tr(el.dataset.t));
 const hd=HEADER_T[currentLang]||HEADER_T.en||{};document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;el.textContent=hd[k]||tr(k)||el.textContent});
 const sel=document.getElementById("languageSelect");if(sel)sel.value=currentLang;
 renderPrice();renderRecommendations();renderVariants();
}
function basePrice(){return countryCode==="AR"?PRODUCT.basePriceARS:(PRODUCT.foreignPriceARS||PRODUCT.basePriceARS*2)}
function formatMoney(value,currency){
 try{return new Intl.NumberFormat(currentLang+"-"+countryCode,{style:"currency",currency,maximumFractionDigits:currency==="JPY"?0:2}).format(value)}
 catch{return `${currency} ${Math.round(value).toLocaleString()}`}
}
async function loadRates(){
 try{const r=await fetch("https://open.er-api.com/v6/latest/ARS",{cache:"no-store"});const j=await r.json();if(j&&j.rates)rates=j.rates;}catch(e){console.info("Conversión online no disponible")}
 renderPrice();
}
function renderPrice(){
 if(!PRODUCT)return;
 const currency=countryCode==="AR"?"ARS":(CURRENCY_BY_COUNTRY[countryCode]||"USD");
 let value=basePrice();
 if(currency!=="ARS"&&rates&&rates[currency])value*=rates[currency];
 document.getElementById("price").textContent=formatMoney(value,currency);
 document.getElementById("priceType").textContent=countryCode==="AR"?tr("retail"):tr("foreign");
 document.getElementById("countryCode").textContent=countryCode+" · "+currency;
}
function initGallery(){
 const main=document.getElementById("mainImage"),thumbs=document.getElementById("thumbs");
 main.src=imagePath(PRODUCT.images[0]);main.onerror=()=>{main.onerror=null;main.src=FALLBACK};
 thumbs.innerHTML=PRODUCT.images.map((f,i)=>`<button class="${i===0?"active":""}" data-file="${encodeURIComponent(f)}"><img src="${imagePath(f)}" onerror="this.src='${FALLBACK}'"></button>`).join("");
 thumbs.querySelectorAll("button").forEach(b=>b.onclick=()=>{thumbs.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");main.src=imagePath(decodeURIComponent(b.dataset.file));});
}
function renderRecommendations(){
 let list=PRODUCTS.filter(p=>p.subcategory===PRODUCT.subcategory&&p.id!==PRODUCT.id).slice(0,4);if(list.length<4)list=list.concat(PRODUCTS.filter(p=>p.id!==PRODUCT.id&&!list.some(x=>x.id===p.id)).slice(0,4-list.length));
 document.getElementById("recommendGrid").innerHTML=list.map(p=>`<a class="rec-card" href="${p.id}.html"><img src="../Fotos/${p.subcategory}/${p.images[0]}" onerror="this.src='${FALLBACK}'"><div><h3>${p.name}</h3><p>${formatMoney((countryCode==="AR"?p.basePriceARS:(p.foreignPriceARS||p.basePriceARS*2))*((countryCode==="AR"||!rates)?1:(rates[CURRENCY_BY_COUNTRY[countryCode]||"USD"]||1)),countryCode==="AR"?"ARS":(CURRENCY_BY_COUNTRY[countryCode]||"USD"))}</p></div></a>`).join("");
}
function addCart(){
 let cart=[];try{cart=JSON.parse(localStorage.getItem("awsCart")||"[]")}catch{}
 if(!Array.isArray(cart))cart=[];
 const minQty=Number(PRODUCT.minOrder)||1; const maxQty=Number(PRODUCT.maxOrder)||99; const qty=Math.min(maxQty,Math.max(minQty,Number(document.querySelector('.selector select:last-child')?.value)||minQty));
 if(((Array.isArray(PRODUCT.sizes)&&PRODUCT.sizes.length)||PRODUCT.sizeMode==="text")&&!selectedSize){
   alert("Seleccioná o escribí el talle antes de agregar el producto.");
   return;
 }
 if(qty<getMinimumPurchaseQuantity()){
   alert(`La compra mínima para este producto es de ${getMinimumPurchaseQuantity()} unidades.`);
   return;
 }
 const existing=cart.find(x=>String(x.id)===String(PRODUCT.id)&&String(x.color||"")===String(selectedColor||"")&&String(x.size||"")===String(selectedSize||""));
 if(existing){
   existing.quantity=(Number(existing.quantity)||0)+qty;
   existing.variantIndex=selectedVariantIndex;
   existing.color=selectedColor;
   existing.size=selectedSize;
 }else{
   cart.push({id:PRODUCT.id,quantity:qty,variantIndex:selectedVariantIndex,color:selectedColor,size:selectedSize});
 }
 cart=cart.map(x=>({...x,quantity:Math.max(1,Number(x.quantity)||1)}));
 localStorage.setItem("awsCart",JSON.stringify(cart));
 const c=cart.reduce((a,x)=>a+(Number(x.quantity)||1),0);
 localStorage.setItem("awsCartCount",String(c));
 const count=document.getElementById("cartCount");
 if(count){count.textContent=String(c);count.classList.add("cart-count-pulse");setTimeout(()=>count.classList.remove("cart-count-pulse"),700)}
 const button=document.getElementById("buyBtn");
 if(button){const original=tr("buy");button.textContent="✓ "+tr("added");button.classList.add("added-success");setTimeout(()=>{button.textContent=original;button.classList.remove("added-success")},1800)}
 const toast=document.getElementById("toast");
 if(toast){toast.textContent="✓ "+tr("added")+" · "+c;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600)}
 window.dispatchEvent(new Event("aws-cart-updated"));
}
// CONTROLES COMPLETOS DEL HEADER EN PÁGINAS DE PRODUCTO
const PRODUCT_LANGUAGES={"es":"Español","en":"English","zh":"中文","pt":"Português","fr":"Français","de":"Deutsch","it":"Italiano","ja":"日本語","ko":"한국어","ru":"Русский","ar":"العربية","hi":"हिन्दी","nl":"Nederlands","pl":"Polski","el":"Ελληνικά","tr":"Türkçe","id":"Bahasa Indonesia"};
function buildLanguageSelector(select){
  select.innerHTML=Object.entries(PRODUCT_LANGUAGES).map(([code,name])=>`<option value="${code}">${name}</option>`).join("");
  select.value=currentLang;
}

const PRODUCT_COUNTRIES={
"América":[["Argentina","AR","es"],["Bolivia","BO","es"],["Brasil","BR","pt"],["Canadá","CA","en"],["Chile","CL","es"],["Colombia","CO","es"],["Costa Rica","CR","es"],["Cuba","CU","es"],["Ecuador","EC","es"],["El Salvador","SV","es"],["Estados Unidos","US","en"],["Guatemala","GT","es"],["Guyana","GY","en"],["Haití","HT","fr"],["Honduras","HN","es"],["Jamaica","JM","en"],["México","MX","es"],["Nicaragua","NI","es"],["Panamá","PA","es"],["Paraguay","PY","es"],["Perú","PE","es"],["República Dominicana","DO","es"],["Surinam","SR","en"],["Trinidad y Tobago","TT","en"],["Uruguay","UY","es"],["Venezuela","VE","es"]],
"Europa":[["Alemania","DE","de"],["Austria","AT","de"],["Bélgica","BE","fr"],["Dinamarca","DK","en"],["España","ES","es"],["Finlandia","FI","en"],["Francia","FR","fr"],["Grecia","GR","en"],["Irlanda","IE","en"],["Italia","IT","it"],["Noruega","NO","en"],["Países Bajos","NL","en"],["Polonia","PL","en"],["Portugal","PT","pt"],["Reino Unido","GB","en"],["Rumania","RO","en"],["Suecia","SE","en"],["Suiza","CH","de"],["Ucrania","UA","en"]],
"Asia":[["Arabia Saudita","SA","ar"],["China","CN","zh"],["Corea del Sur","KR","ko"],["Emiratos Árabes Unidos","AE","ar"],["Filipinas","PH","en"],["India","IN","en"],["Indonesia","ID","en"],["Israel","IL","en"],["Japón","JP","ja"],["Malasia","MY","en"],["Singapur","SG","en"],["Tailandia","TH","en"],["Turquía","TR","en"],["Vietnam","VN","en"]],
"Oceanía":[["Australia","AU","en"],["Fiyi","FJ","en"],["Nueva Zelanda","NZ","en"],["Papúa Nueva Guinea","PG","en"],["Samoa","WS","en"],["Tonga","TO","en"],["Vanuatu","VU","fr"]]
};
function localCountryName(code,fallback){try{return new Intl.DisplayNames([currentLang],{type:"region"}).of(code)||fallback}catch{return fallback}}
function renderProductCountries(filter=""){
 const groups=document.getElementById("countryGroups");if(!groups)return;
 const q=filter.toLocaleLowerCase(currentLang);
 groups.innerHTML=Object.entries(PRODUCT_COUNTRIES).map(([continent,list])=>{
   const hits=list.filter(([name,code])=>(name+" "+localCountryName(code,name)).toLocaleLowerCase(currentLang).includes(q));
   if(!hits.length)return "";
   return `<div class="country-group"><h4>${continent}</h4><div class="country-list">${hits.map(([name,code,lang])=>`<button type="button" data-code="${code}" data-lang="${lang}">${localCountryName(code,name)}</button>`).join("")}</div></div>`;
 }).join("");
 groups.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{
   countryCode=btn.dataset.code;localStorage.setItem("awsCountryCode",countryCode);
   const countryLanguage=countryCode==="AR"?"es":(T[btn.dataset.lang]?btn.dataset.lang:"en");
   localStorage.setItem("awsLang",countryLanguage);
   setLanguage(countryLanguage);
   const selected=document.getElementById("selectedCountry");if(selected)selected.textContent=localCountryName(countryCode,countryCode);
   document.getElementById("countryPanel")?.classList.remove("open");renderPrice();renderRecommendations();
 });
}
const countryPanel=document.getElementById("countryPanel");
const countryButton=document.getElementById("countryButton");
const closeCountries=document.getElementById("closeCountries");
const countrySearch=document.getElementById("countrySearch");
if(countryButton)countryButton.onclick=e=>{e.stopPropagation();countryPanel?.classList.toggle("open");renderProductCountries(countrySearch?.value||"")};
if(closeCountries)closeCountries.onclick=()=>countryPanel?.classList.remove("open");
if(countrySearch)countrySearch.oninput=e=>renderProductCountries(e.target.value);
document.addEventListener("click",e=>{if(countryPanel&&!e.target.closest(".country-wrap"))countryPanel.classList.remove("open")});
const selectedCountry=document.getElementById("selectedCountry");if(selectedCountry)selectedCountry.textContent=localCountryName(countryCode,countryCode);
renderProductCountries();

const productSidebar=document.getElementById("shopSidebar"),productBackdrop=document.getElementById("sidebarBackdrop");
function toggleProductSidebar(open){productSidebar?.classList.toggle("open",open);productBackdrop?.classList.toggle("open",open);document.body.style.overflow=open?"hidden":"";}
document.getElementById("openSidebar")?.addEventListener("click",()=>toggleProductSidebar(true));
document.getElementById("closeSidebar")?.addEventListener("click",()=>toggleProductSidebar(false));
productBackdrop?.addEventListener("click",()=>toggleProductSidebar(false));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){toggleProductSidebar(false);countryPanel?.classList.remove("open")}});

const mainHeader=document.getElementById("siteHeader");
function updateHeader(){if(!mainHeader)return;const hovered=mainHeader.matches(":hover");mainHeader.classList.toggle("scrolled",window.scrollY>80&&hovered);}
window.addEventListener("scroll",updateHeader);mainHeader?.addEventListener("mouseenter",updateHeader);mainHeader?.addEventListener("mouseleave",()=>mainHeader.classList.remove("scrolled"));



function escapeProductHtml(value){
 return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]));
}
function renderProductSelectors(){
 if(!PRODUCT)return;
 const selectors=[...document.querySelectorAll(".product-info .selector")];
 const colorRow=selectors[0], sizeRow=selectors[1];

 if(colorRow && Array.isArray(PRODUCT.colors) && PRODUCT.colors.length){
   selectedColor=PRODUCT.colors[0].name;
   colorRow.innerHTML=`<span data-t="color">${tr("color")}</span>
     <div class="color-choice-wrap" id="colorChoiceWrap">
       <div class="color-swatches">
         ${PRODUCT.colors.map((color,index)=>`
           <button type="button" class="color-swatch ${index===0?"selected":""}"
             data-color="${escapeProductHtml(color.name)}"
             title="${escapeProductHtml(color.name)}"
             aria-label="${escapeProductHtml(color.name)}"
             style="--swatch:${color.swatch}">
             <span></span>
           </button>`).join("")}
       </div>
       <strong id="selectedColorLabel">${escapeProductHtml(selectedColor)}</strong>
     </div>`;
   colorRow.querySelectorAll(".color-swatch").forEach(button=>{
     button.onclick=()=>{
       colorRow.querySelectorAll(".color-swatch").forEach(x=>x.classList.remove("selected"));
       button.classList.add("selected");
       selectedColor=button.dataset.color||"";
       const label=document.getElementById("selectedColorLabel");
       if(label)label.textContent=selectedColor;
     };
   });
 }

 if(sizeRow){
   if(PRODUCT.sizeMode==="text"){
     sizeRow.innerHTML=`<span data-t="size">${tr("size")}</span>
       <input class="size-text-input" id="productSizeInput" type="text"
       placeholder="${escapeProductHtml(PRODUCT.sizePlaceholder||"Escribí el talle")}" />`;
     const input=document.getElementById("productSizeInput");
     input?.addEventListener("input",()=>selectedSize=input.value.trim());
   }else if(Array.isArray(PRODUCT.sizes) && PRODUCT.sizes.length){
     sizeRow.innerHTML=`<span data-t="size">${tr("size")}</span>
       <select id="productSizeSelect">
         <option value="">Seleccionar</option>
         ${PRODUCT.sizes.map(size=>`<option value="${escapeProductHtml(size)}">${escapeProductHtml(size)}</option>`).join("")}
       </select>`;
     const select=document.getElementById("productSizeSelect");
     select?.addEventListener("change",()=>selectedSize=select.value);
   }
 }

 const desc=document.querySelector(".description details:first-child p");
 if(desc && PRODUCT.description)desc.textContent=PRODUCT.description;
}


function getMinimumPurchaseQuantity(){
 return Math.max(1,Number(PRODUCT?.minPurchaseQuantity)||1);
}

function configureMinimumPurchase(){
 if(!PRODUCT)return;

 const minimum=getMinimumPurchaseQuantity();
 const selectors=[...document.querySelectorAll(".product-info .selector")];
 const quantityRow=selectors[2];
 if(!quantityRow)return;

 const currentSelect=quantityRow.querySelector("select");
 const maximum=Math.max(25,minimum+20);

 quantityRow.innerHTML=`
   <span data-t="quantity">${tr("quantity")}</span>
   <div class="minimum-quantity-control">
     <select id="productQuantitySelect" aria-label="Cantidad">
       ${Array.from(
          {length:maximum-minimum+1},
          (_,index)=>minimum+index
        ).map(quantity=>`
          <option value="${quantity}">${quantity}</option>
        `).join("")}
     </select>
     ${minimum>1 ? `
       <small class="minimum-order-message">
         Compra mínima: ${minimum} unidades ·
         Total mínimo aproximado:
         ${new Intl.NumberFormat("es-AR",{
           style:"currency",
           currency:"ARS",
           maximumFractionDigits:0
         }).format((PRODUCT.basePriceARS||0)*minimum)}
       </small>
     ` : ""}
   </div>
 `;
}

// INICIALIZACIÓN SEGURA DESPUÉS DE CREAR LOS CONTROLES DEL HEADER
function initProductPage(){
 if(!PRODUCT){document.body.innerHTML="<h1>Producto no encontrado</h1>";return;}
 document.title=PRODUCT.name+" | Argentina World Store";
 document.getElementById("productName").textContent=PRODUCT.name;
 document.getElementById("crumb").textContent=PRODUCT.subcategory+" / "+PRODUCT.name;
 document.getElementById("productCode").textContent=PRODUCT.id.toUpperCase();
 initGallery();
 renderVariants();
 renderProductSelectors();
 configureMinimumPurchase();
 document.getElementById("cartCount").textContent=localStorage.getItem("awsCartCount")||0;
 const topLanguage=document.getElementById("languageSelect");
 if(topLanguage){buildLanguageSelector(topLanguage);topLanguage.value=currentLang;topLanguage.onchange=e=>setLanguage(e.target.value);}

 const qtySelect=document.querySelector('.selector select:last-child');
 if(qtySelect&&PRODUCT.minOrder){qtySelect.innerHTML=Array.from({length:(Number(PRODUCT.maxOrder)||Number(PRODUCT.minOrder))-Number(PRODUCT.minOrder)+1},(_,i)=>{const q=Number(PRODUCT.minOrder)+i;return `<option value="${q}">${q}</option>`}).join('');qtySelect.value=String(PRODUCT.minOrder);}
 document.getElementById("buyBtn").onclick=addCart;
 setLanguage(currentLang);
 renderProductCountries();
 const selected=document.getElementById("selectedCountry");
 if(selected)selected.textContent=localCountryName(countryCode,countryCode);
 loadRates();
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initProductPage)}else{initProductPage()}

// SELECTOR DE COLOR / VARIANTE BASADO EN LAS FOTOS DEL PRODUCTO
let selectedVariantIndex=0;
let selectedColor='';
let selectedSize='';
function renderVariants(){
 if(!PRODUCT)return; const grid=document.getElementById('variantGrid'); if(!grid)return;
 grid.innerHTML=PRODUCT.images.map((f,i)=>`<button type="button" class="variant-option ${i===selectedVariantIndex?'selected':''}" data-index="${i}"><img src="${imagePath(f)}" onerror="this.src='${FALLBACK}'"><span>${(PRODUCT.imageLabels&&PRODUCT.imageLabels[i])||(PRODUCT.images.length>1?'Producto '+(i+1):'Producto')}</span></button>`).join('');
 grid.querySelectorAll('.variant-option').forEach(btn=>btn.onclick=()=>selectVariant(Number(btn.dataset.index)));
 const mini=document.getElementById('variantMini'); if(mini){mini.src=imagePath(PRODUCT.images[selectedVariantIndex]);mini.onerror=()=>mini.src=FALLBACK}
 const text=document.getElementById('variantText');if(text)text.textContent=(PRODUCT.imageLabels&&PRODUCT.imageLabels[selectedVariantIndex])||(PRODUCT.images.length>1?'Foto '+(selectedVariantIndex+1):'Única foto');
}
function selectVariant(index){selectedVariantIndex=index;const f=PRODUCT.images[index];const main=document.getElementById('mainImage');if(main)main.src=imagePath(f);document.querySelectorAll('#thumbs button').forEach((b,i)=>b.classList.toggle('active',i===index));renderVariants();document.getElementById('variantOverlay')?.classList.remove('open');}
document.addEventListener('click',e=>{if(e.target.closest('#variantTrigger')){renderVariants();document.getElementById('variantOverlay')?.classList.add('open')}if(e.target.closest('#variantClose')||e.target.id==='variantOverlay')document.getElementById('variantOverlay')?.classList.remove('open')});
