
const COUNTRY_CODE_MAP = {"Argentina": "AR", "Bolivia": "BO", "Brasil": "BR", "Canadá": "CA", "Chile": "CL", "Colombia": "CO", "Costa Rica": "CR", "Cuba": "CU", "Ecuador": "EC", "El Salvador": "SV", "Estados Unidos": "US", "Guatemala": "GT", "Guyana": "GY", "Honduras": "HN", "Jamaica": "JM", "México": "MX", "Nicaragua": "NI", "Panamá": "PA", "Paraguay": "PY", "Perú": "PE", "República Dominicana": "DO", "Trinidad y Tobago": "TT", "Uruguay": "UY", "Venezuela": "VE", "Albania": "AL", "Alemania": "DE", "Andorra": "AD", "Austria": "AT", "Bélgica": "BE", "Bielorrusia": "BY", "Bosnia y Herzegovina": "BA", "Bulgaria": "BG", "Chipre": "CY", "Dinamarca": "DK", "Eslovaquia": "SK", "Eslovenia": "SI", "España": "ES", "Estonia": "EE", "Francia": "FR", "Grecia": "GR", "Hungría": "HU", "Irlanda": "IE", "Islandia": "IS", "Liechtenstein": "LI", "Malta": "MT", "Montenegro": "ME", "Países Bajos": "NL", "Polonia": "PL", "Portugal": "PT", "Reino Unido": "GB", "República Checa": "CZ", "Rumania": "RO", "Rusia": "RU", "San Marino": "SM", "Serbia": "RS", "Suecia": "SE", "Suiza": "CH", "Ucrania": "UA", "Vaticano": "VA", "Afganistán": "AF", "Arabia Saudita": "SA", "Armenia": "AM", "Azerbaiyán": "AZ", "Bangladés": "BD", "Baréin": "BH", "Brunéi": "BN", "Bután": "BT", "Camboya": "KH", "Catar": "QA", "China": "CN", "Corea del Norte": "KP", "Corea del Sur": "KR", "Emiratos Árabes Unidos": "AE", "Filipinas": "PH", "Georgia": "GE", "India": "IN", "Indonesia": "ID", "Irak": "IQ", "Irán": "IR", "Israel": "IL", "Japón": "JP", "Jordania": "JO", "Kazajistán": "KZ", "Kirguistán": "KG", "Kuwait": "KW", "Laos": "LA", "Líbano": "LB", "Malasia": "MY", "Maldivas": "MV", "Mongolia": "MN", "Myanmar": "MM", "Nepal": "NP", "Omán": "OM", "Pakistán": "PK", "Singapur": "SG", "Siria": "SY", "Sri Lanka": "LK", "Tailandia": "TH", "Tayikistán": "TJ", "Timor Oriental": "TL", "Turkmenistán": "TM", "Turquía": "TR", "Uzbekistán": "UZ", "Vietnam": "VN", "Yemen": "YE", "Australia": "AU", "Fiyi": "FJ", "Islas Marshall": "MH", "Islas Salomón": "SB", "Kiribati": "KI", "Micronesia": "FM", "Nauru": "NR", "Nueva Zelanda": "NZ", "Palaos": "PW", "Papúa Nueva Guinea": "PG", "Samoa": "WS", "Tonga": "TO", "Tuvalu": "TV", "Vanuatu": "VU"};

const countries = {
"América":[["Argentina","es"],["Bolivia","es"],["Brasil","pt"],["Canadá","en"],["Chile","es"],["Colombia","es"],["Costa Rica","es"],["Cuba","es"],["Ecuador","es"],["El Salvador","es"],["Estados Unidos","en"],["Guatemala","es"],["Guyana","en"],["Haití","fr"],["Honduras","es"],["Jamaica","en"],["México","es"],["Nicaragua","es"],["Panamá","es"],["Paraguay","es"],["Perú","es"],["República Dominicana","es"],["Surinam","nl"],["Trinidad y Tobago","en"],["Uruguay","es"],["Venezuela","es"]],
"Europa":[["Albania","sq"],["Alemania","de"],["Andorra","ca"],["Austria","de"],["Bélgica","fr"],["Bielorrusia","ru"],["Bosnia y Herzegovina","bs"],["Bulgaria","bg"],["Chipre","el"],["Croacia","hr"],["Dinamarca","da"],["Eslovaquia","sk"],["Eslovenia","sl"],["España","es"],["Estonia","et"],["Finlandia","fi"],["Francia","fr"],["Grecia","el"],["Hungría","hu"],["Irlanda","en"],["Islandia","is"],["Italia","it"],["Letonia","lv"],["Liechtenstein","de"],["Lituania","lt"],["Luxemburgo","fr"],["Malta","en"],["Moldavia","ro"],["Mónaco","fr"],["Montenegro","sr"],["Noruega","no"],["Países Bajos","nl"],["Polonia","pl"],["Portugal","pt"],["Reino Unido","en"],["República Checa","cs"],["Rumania","ro"],["Rusia","ru"],["San Marino","it"],["Serbia","sr"],["Suecia","sv"],["Suiza","de"],["Ucrania","uk"],["Vaticano","it"]],
"Asia":[["Afganistán","fa"],["Arabia Saudita","ar"],["Armenia","hy"],["Azerbaiyán","az"],["Bangladés","bn"],["Baréin","ar"],["Brunéi","ms"],["Bután","dz"],["Camboya","km"],["Catar","ar"],["China","zh"],["Corea del Norte","ko"],["Corea del Sur","ko"],["Emiratos Árabes Unidos","ar"],["Filipinas","fil"],["Georgia","ka"],["India","hi"],["Indonesia","id"],["Irak","ar"],["Irán","fa"],["Israel","he"],["Japón","ja"],["Jordania","ar"],["Kazajistán","kk"],["Kirguistán","ky"],["Kuwait","ar"],["Laos","lo"],["Líbano","ar"],["Malasia","ms"],["Maldivas","dv"],["Mongolia","mn"],["Myanmar","my"],["Nepal","ne"],["Omán","ar"],["Pakistán","ur"],["Singapur","en"],["Siria","ar"],["Sri Lanka","si"],["Tailandia","th"],["Tayikistán","tg"],["Timor Oriental","pt"],["Turkmenistán","tk"],["Turquía","tr"],["Uzbekistán","uz"],["Vietnam","vi"],["Yemen","ar"]],
"Oceanía":[["Australia","en"],["Fiyi","en"],["Islas Marshall","en"],["Islas Salomón","en"],["Kiribati","en"],["Micronesia","en"],["Nauru","en"],["Nueva Zelanda","en"],["Palaos","en"],["Papúa Nueva Guinea","en"],["Samoa","sm"],["Tonga","to"],["Tuvalu","en"],["Vanuatu","fr"]]
};

const es = {
login:"Iniciar sesión", shoppingMode:"¿Cómo querés comprar?", retail:"Minorista", wholesaleOnly:"Mayorista",
modeRetail:"Mostrando opciones minoristas", modeWholesale:"Mostrando opciones mayoristas",
made:"Hecho en Argentina", shipping:"Envíos nacionales e internacionales", orders:"Productos por pedido",
searchPlaceholder:"Buscar productos...", countries:"Elige tu país", chooseCountry:"Elegí tu país", countrySearch:"Buscar país...",
cart:"Carrito", home:"Inicio", featured:"Destacados", categories:"Categorías", subcategories:"Subcategorías", contact:"Contacto",
heroEyebrow:"Argentina en cada rincón del mundo", heroTitle:"Productos argentinos con identidad",
heroText:"Alimentos, indumentaria y bazar para compras minoristas y mayoristas.", explore:"Explorar tienda",
global:"Llegamos a todo el mundo", international:"Envíos internacionales",
internationalText:"Seleccioná tu país y navegá la tienda en tu idioma.", seeProducts:"Ver productos",
curated:"Selección argentina", wholesale:"Mayorista y minorista",
wholesaleText:"Armamos pedidos para clientes, comercios y revendedores.", knowMore:"Conocer más",
culture:"Cultura, tradición y calidad", fromArgentina:"Desde Argentina",
fromArgentinaText:"Una vidriera internacional para fabricantes y productos nacionales.", discover:"Descubrir",
favorites:"Sabores y estilo argentino", everywhere:"Argentina, estés donde estés",
everywhereText:"Comprá desde América, Europa, Asia u Oceanía.", contactUs:"Contactanos",
about:"Sobre nosotros", aboutText:"Conocé la historia y el propósito de nuestra tienda.",
faq:"Preguntas frecuentes", faqText:"Pagos, pedidos, envíos, cambios y tiempos de entrega.",
work:"Trabajá con nosotros", workText:"Publicá productos argentinos o generá comisiones por ventas.",
selection:"Nuestra selección", featuredProducts:"Productos destacados", new:"Nuevo",
retailWholesale:"Minorista y mayorista", addCart:"Agregar al carrito", added:"Agregado", featuredTag:"Destacado",
browse:"Explorá la tienda", wholesaleRetail:"Mayorista · Minorista", food:"Productos Regionales", clothing:"Indumentaria", bazaar:"Bazar y Accesorios",
viewCategory:"Ver categoría →", findYours:"Encontrá lo tuyo", sweets:"Golosinas", delicatessen:"Delicatessen",
savory:"Salados", yerba:"Yerba mate", cookies:"Galletitas", shirts:"Camisas", vests:"Chalecos",
shawls:"Chalinas", belts:"Cintos", ponchos:"Ponchos y Ruanas", wallets:"Billeteras", bags:"Bolsos",
mates:"Mates y Bombillas", mateBags:"Materas", backpacks:"Mochilas", phoneHolders:"Portacelulares",
community:"Comunidad Argentina World Store", newsletter:"Recibí novedades y nuevos productos",
email:"Tu correo electrónico", subscribe:"Suscribirme", help:"Ayuda", shippingTracking:"Envíos y seguimiento",
changes:"Cambios y devoluciones", terms:"Términos y condiciones", company:"Nosotros",
manufacturers:"Fabricantes argentinos", madeArgentina:"Hecho en Argentina · Para el mundo",
productMate:"Mate artesanal", productAlpargatas:"Alpargatas argentinas", productAlfajores:"Alfajores artesanales",
productPoncho:"Poncho tradicional", productMatera:"Matera de cuero", productBoina:"Boina argentina",
productTabla:"Tabla de madera", productBombacha:"Bombacha de campo", productYerbera:"Yerbera y azucarera",
alfajores:"Alfajores", alpargatas:"Alpargatas",
foodDesc:"Alfajores, golosinas, yerba y más", clothingDesc:"Alpargatas, camisas, ponchos y más",
bazaarDesc:"Mates, materas, billeteras y más", noResults:"No encontramos productos", detectedLanguage:"Idioma detectado",
changeLanguage:"Cambiar idioma", autoCountry:"País detectado automáticamente"
};

const en = {
...es, login:"Sign in", shoppingMode:"How would you like to shop?", retail:"Retail", wholesaleOnly:"Wholesale",
modeRetail:"Showing retail options", modeWholesale:"Showing wholesale options", made:"Made in Argentina",
shipping:"Domestic and international shipping", orders:"Made-to-order products", searchPlaceholder:"Search products...",
countries:"Countries", chooseCountry:"Choose your country", countrySearch:"Search country...", cart:"Cart", home:"Home",
featured:"Featured", categories:"Categories", subcategories:"Subcategories", contact:"Contact",
heroEyebrow:"Argentina in every corner of the world", heroTitle:"Argentine products with identity",
heroText:"Food, clothing and home goods for retail and wholesale purchases.", explore:"Explore store",
global:"We ship worldwide", international:"International shipping",
internationalText:"Choose your country and browse the store in your language.", seeProducts:"See products",
curated:"Argentine selection", wholesale:"Wholesale and retail",
wholesaleText:"We prepare orders for customers, shops and resellers.", knowMore:"Learn more",
culture:"Culture, tradition and quality", fromArgentina:"From Argentina",
fromArgentinaText:"An international showcase for Argentine makers and products.", discover:"Discover",
favorites:"Argentine flavors and style", everywhere:"Argentina, wherever you are",
everywhereText:"Shop from the Americas, Europe, Asia or Oceania.", contactUs:"Contact us",
about:"About us", aboutText:"Discover the story and purpose of our store.", faq:"Frequently asked questions",
faqText:"Payments, orders, shipping, returns and delivery times.", work:"Work with us",
workText:"List Argentine products or earn sales commissions.", selection:"Our selection",
featuredProducts:"Featured products", new:"New", retailWholesale:"Retail and wholesale", addCart:"Add to cart",
added:"Added", featuredTag:"Featured", browse:"Explore the store", wholesaleRetail:"Wholesale · Retail",
food:"Food", clothing:"Clothing", bazaar:"Home & accessories", viewCategory:"View category →",
findYours:"Find your style", sweets:"Sweets", savory:"Savory", cookies:"Cookies", shirts:"Shirts",
vests:"Vests", shawls:"Scarves", belts:"Belts", ponchos:"Ponchos & ruanas", wallets:"Wallets", bags:"Bags",
mates:"Mate cups & straws", mateBags:"Mate bags", backpacks:"Backpacks", phoneHolders:"Phone holders",
community:"Argentina World Store community", newsletter:"Get news and new products", email:"Your email address",
subscribe:"Subscribe", help:"Help", shippingTracking:"Shipping and tracking", changes:"Returns and exchanges",
terms:"Terms and conditions", company:"Company", manufacturers:"Argentine makers",
madeArgentina:"Made in Argentina · For the world", productMate:"Handcrafted mate cup",
productAlpargatas:"Argentine espadrilles", productAlfajores:"Artisan alfajores", productPoncho:"Traditional poncho",
productMatera:"Leather mate bag", productBoina:"Argentine beret", productTabla:"Wooden board",
productBombacha:"Gaucho trousers", productYerbera:"Yerba and sugar containers", alfajores:"Alfajores",
alpargatas:"Espadrilles", foodDesc:"Alfajores, sweets, yerba mate and more",
clothingDesc:"Espadrilles, shirts, ponchos and more", bazaarDesc:"Mate cups, bags, wallets and more",
noResults:"No products found", detectedLanguage:"Detected language", changeLanguage:"Change language",
autoCountry:"Country detected automatically"
};

const zh = {
...en, login:"登录", shoppingMode:"您想如何购买？", retail:"零售", wholesaleOnly:"批发",
modeRetail:"正在显示零售选项", modeWholesale:"正在显示批发选项", made:"阿根廷制造",
shipping:"国内和国际配送", orders:"按订单生产", searchPlaceholder:"搜索产品...", countries:"国家",
chooseCountry:"选择您的国家", countrySearch:"搜索国家...", cart:"购物车", home:"首页", featured:"精选商品",
categories:"分类", subcategories:"子分类", contact:"联系我们",
heroEyebrow:"把阿根廷带到世界每个角落", heroTitle:"具有阿根廷特色的产品",
heroText:"食品、服装和家居用品，支持零售与批发。", explore:"浏览商店",
global:"配送至世界各地", international:"国际配送",
internationalText:"选择您的国家，并使用您的语言浏览商店。", seeProducts:"查看产品",
curated:"阿根廷精选", wholesale:"批发与零售", wholesaleText:"我们为个人客户、商店和经销商准备订单。",
knowMore:"了解更多", culture:"文化、传统与品质", fromArgentina:"来自阿根廷",
fromArgentinaText:"面向世界展示阿根廷制造商和本国产品。", discover:"发现更多",
favorites:"阿根廷风味与风格", everywhere:"无论身在何处，都能感受阿根廷",
everywhereText:"可从美洲、欧洲、亚洲或大洋洲购买。", contactUs:"联系我们",
about:"关于我们", aboutText:"了解我们的故事和商店使命。", faq:"常见问题",
faqText:"付款、订单、配送、退换货与送达时间。", work:"与我们合作",
workText:"发布阿根廷产品，或通过销售获得佣金。", selection:"我们的精选",
featuredProducts:"精选产品", new:"新品", retailWholesale:"零售与批发", addCart:"加入购物车",
added:"已加入", featuredTag:"推荐", browse:"浏览商店", wholesaleRetail:"批发 · 零售",
food:"食品", clothing:"服装", bazaar:"家居与配件", viewCategory:"查看分类 →",
findYours:"找到适合您的产品", sweets:"糖果", delicatessen:"精品食品", savory:"咸味食品",
yerba:"马黛茶叶", cookies:"饼干", shirts:"衬衫", vests:"背心", shawls:"披巾",
belts:"腰带", ponchos:"斗篷与披肩", wallets:"钱包", bags:"包袋", mates:"马黛茶杯与吸管",
mateBags:"马黛茶套包", backpacks:"双肩包", phoneHolders:"手机袋",
community:"Argentina World Store 社区", newsletter:"接收新品与最新资讯",
email:"您的电子邮箱", subscribe:"订阅", help:"帮助", shippingTracking:"配送与追踪",
changes:"退换货", terms:"条款与条件", company:"关于我们", manufacturers:"阿根廷制造商",
madeArgentina:"阿根廷制造 · 面向世界", productMate:"手工马黛茶杯",
productAlpargatas:"阿根廷麻底鞋", productAlfajores:"手工夹心饼", productPoncho:"传统斗篷",
productMatera:"皮革马黛茶包", productBoina:"阿根廷贝雷帽", productTabla:"木质托盘",
productBombacha:"高乔裤", productYerbera:"马黛茶叶罐与糖罐", alfajores:"阿尔法霍尔夹心饼",
alpargatas:"麻底鞋", foodDesc:"夹心饼、糖果、马黛茶叶等",
clothingDesc:"麻底鞋、衬衫、斗篷等", bazaarDesc:"马黛茶杯、套包、钱包等",
noResults:"未找到相关产品", detectedLanguage:"检测到的语言", changeLanguage:"切换语言",
autoCountry:"已自动检测国家"
};

const pt = {...en,made:"Feito na Argentina",shipping:"Envios nacionais e internacionais",orders:"Produtos sob encomenda",searchPlaceholder:"Buscar produtos...",countries:"Elige tu país",chooseCountry:"Escolha seu país",countrySearch:"Buscar país...",cart:"Carrinho",home:"Início",featured:"Destaques",categories:"Categorias",subcategories:"Subcategorias",contact:"Contato",login:"Entrar",food:"Alimentos",clothing:"Vestuário",bazaar:"Bazar e acessórios",about:"Sobre nós",work:"Trabalhe conosco",featuredProducts:"Produtos em destaque",addCart:"Adicionar ao carrinho",detectedLanguage:"Idioma detectado",changeLanguage:"Mudar idioma"};
const fr = {...en,made:"Fabriqué en Argentine",shipping:"Livraisons nationales et internationales",orders:"Produits sur commande",searchPlaceholder:"Rechercher des produits...",countries:"Pays",chooseCountry:"Choisissez votre pays",countrySearch:"Rechercher un pays...",cart:"Panier",home:"Accueil",featured:"À la une",categories:"Catégories",subcategories:"Sous-catégories",contact:"Contact",login:"Se connecter",food:"Alimentation",clothing:"Vêtements",bazaar:"Maison et accessoires",about:"À propos",work:"Travaillez avec nous",featuredProducts:"Produits vedettes",addCart:"Ajouter au panier",detectedLanguage:"Langue détectée",changeLanguage:"Changer de langue"};
const de = {...en,made:"Hergestellt in Argentinien",shipping:"Nationaler und internationaler Versand",orders:"Produkte auf Bestellung",searchPlaceholder:"Produkte suchen...",countries:"Länder",chooseCountry:"Land auswählen",countrySearch:"Land suchen...",cart:"Warenkorb",home:"Startseite",featured:"Highlights",categories:"Kategorien",subcategories:"Unterkategorien",contact:"Kontakt",login:"Anmelden",food:"Lebensmittel",clothing:"Kleidung",bazaar:"Haus und Accessoires",about:"Über uns",featuredProducts:"Ausgewählte Produkte",addCart:"In den Warenkorb",detectedLanguage:"Erkannte Sprache",changeLanguage:"Sprache ändern"};
const it = {...en,made:"Prodotto in Argentina",shipping:"Spedizioni nazionali e internazionali",orders:"Prodotti su ordinazione",searchPlaceholder:"Cerca prodotti...",countries:"Paesi",chooseCountry:"Scegli il tuo paese",countrySearch:"Cerca paese...",cart:"Carrello",home:"Home",featured:"In evidenza",categories:"Categorie",subcategories:"Sottocategorie",contact:"Contatto",login:"Accedi",food:"Alimenti",clothing:"Abbigliamento",bazaar:"Casa e accessori",about:"Chi siamo",featuredProducts:"Prodotti in evidenza",addCart:"Aggiungi al carrello",detectedLanguage:"Lingua rilevata",changeLanguage:"Cambia lingua"};
const ja = {...en,made:"アルゼンチン製",shipping:"国内・国際配送",orders:"受注生産品",searchPlaceholder:"商品を検索...",countries:"国",chooseCountry:"国を選択",countrySearch:"国を検索...",cart:"カート",home:"ホーム",featured:"注目商品",categories:"カテゴリー",subcategories:"サブカテゴリー",contact:"お問い合わせ",login:"ログイン",food:"食品",clothing:"衣料品",bazaar:"生活雑貨",featuredProducts:"注目の商品",addCart:"カートに追加",detectedLanguage:"検出された言語",changeLanguage:"言語を変更"};
const ko = {...en,made:"아르헨티나산",shipping:"국내 및 국제 배송",orders:"주문 제작 상품",searchPlaceholder:"상품 검색...",countries:"국가",chooseCountry:"국가 선택",countrySearch:"국가 검색...",cart:"장바구니",home:"홈",featured:"추천",categories:"카테고리",subcategories:"하위 카테고리",contact:"문의",login:"로그인",food:"식품",clothing:"의류",bazaar:"생활용품",featuredProducts:"추천 상품",addCart:"장바구니에 추가",detectedLanguage:"감지된 언어",changeLanguage:"언어 변경"};
const ru = {...en,made:"Сделано в Аргентине",shipping:"Доставка по стране и за рубеж",orders:"Товары под заказ",searchPlaceholder:"Поиск товаров...",countries:"Страны",chooseCountry:"Выберите страну",countrySearch:"Найти страну...",cart:"Корзина",home:"Главная",featured:"Избранное",categories:"Категории",subcategories:"Подкатегории",contact:"Контакты",login:"Войти",detectedLanguage:"Определённый язык",changeLanguage:"Сменить язык"};
const ar = {...en,made:"صنع في الأرجنتين",shipping:"شحن محلي ودولي",orders:"منتجات حسب الطلب",searchPlaceholder:"البحث عن المنتجات...",countries:"الدول",chooseCountry:"اختر بلدك",countrySearch:"ابحث عن بلد...",cart:"السلة",home:"الرئيسية",featured:"مختارات",categories:"الفئات",subcategories:"الفئات الفرعية",contact:"اتصل بنا",login:"تسجيل الدخول",detectedLanguage:"اللغة المكتشفة",changeLanguage:"تغيير اللغة"};
const hi = {...en,made:"अर्जेंटीना में निर्मित",shipping:"राष्ट्रीय और अंतर्राष्ट्रीय शिपिंग",orders:"ऑर्डर पर उत्पाद",searchPlaceholder:"उत्पाद खोजें...",countries:"देश",chooseCountry:"अपना देश चुनें",countrySearch:"देश खोजें...",cart:"कार्ट",home:"होम",featured:"विशेष",categories:"श्रेणियाँ",subcategories:"उपश्रेणियाँ",contact:"संपर्क",login:"साइन इन",detectedLanguage:"पहचानी गई भाषा",changeLanguage:"भाषा बदलें"};
const nl = {...en,made:"Gemaakt in Argentinië",shipping:"Nationale en internationale verzending",orders:"Producten op bestelling",countries:"Landen",cart:"Winkelwagen",home:"Home",categories:"Categorieën",subcategories:"Subcategorieën",contact:"Contact",login:"Inloggen"};
const pl = {...en,made:"Wyprodukowano w Argentynie",shipping:"Wysyłka krajowa i międzynarodowa",orders:"Produkty na zamówienie",countries:"Kraje",cart:"Koszyk",home:"Strona główna",categories:"Kategorie",subcategories:"Podkategorie",contact:"Kontakt",login:"Zaloguj się"};
const el = {...en,made:"Κατασκευάζεται στην Αργεντινή",shipping:"Εθνικές και διεθνείς αποστολές",orders:"Προϊόντα κατόπιν παραγγελίας",countries:"Χώρες",cart:"Καλάθι",home:"Αρχική",categories:"Κατηγορίες",contact:"Επικοινωνία",login:"Σύνδεση"};
const tr = {...en,made:"Arjantin'de üretildi",shipping:"Yurt içi ve uluslararası gönderim",orders:"Sipariş üzerine ürünler",countries:"Ülkeler",cart:"Sepet",home:"Ana sayfa",categories:"Kategoriler",contact:"İletişim",login:"Giriş yap"};
const id = {...en,made:"Dibuat di Argentina",shipping:"Pengiriman domestik dan internasional",orders:"Produk berdasarkan pesanan",countries:"Negara",cart:"Keranjang",home:"Beranda",categories:"Kategori",contact:"Kontak",login:"Masuk"};

const translations = {es,en,zh,pt,fr,de,it,ja,ko,ru,ar,hi,nl,pl,el,tr,id};
const supportedLanguageNames = {
es:"Español", en:"English", zh:"中文", pt:"Português", fr:"Français", de:"Deutsch", it:"Italiano",
ja:"日本語", ko:"한국어", ru:"Русский", ar:"العربية", hi:"हिन्दी", nl:"Nederlands",
pl:"Polski", el:"Ελληνικά", tr:"Türkçe", id:"Bahasa Indonesia"
};

let currentLang = "es";
let currentCountryCode = "AR";

function normalizedSupportedLanguage(lang) {
  const code = (lang || "en").toLowerCase().split("-")[0];
  return translations[code] ? code : "en";
}

function displayCountry(code, lang=currentLang) {
  try { return new Intl.DisplayNames([lang], {type:"region"}).of(code) || code; }
  catch { return code; }
}

function displayLanguage(code, lang=currentLang) {
  try { return new Intl.DisplayNames([lang], {type:"language"}).of(code) || supportedLanguageNames[code] || code; }
  catch { return supportedLanguageNames[code] || code; }
}

function applyTranslations(lang, persist=true) {
  currentLang = normalizedSupportedLanguage(lang);
  const dict = translations[currentLang] || en;
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = dict[key] ?? en[key] ?? es[key] ?? el.textContent;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = dict[key] ?? en[key] ?? es[key] ?? el.placeholder;
  });

  document.getElementById("selectedCountry").textContent = displayCountry(currentCountryCode, currentLang);
  buildLanguageSelector();
  renderCountries(document.getElementById("countrySearch")?.value || "");
  updateDetectedLanguageLabel();

  if (persist) localStorage.setItem("awsLang", currentLang);
}

function buildLanguageSelector() {
  const select = document.getElementById("languageSelect");
  if (!select) return;
  select.innerHTML = Object.keys(translations).map(code =>
    `<option value="${code}" ${code===currentLang?"selected":""}>${supportedLanguageNames[code]}</option>`
  ).join("");
  select.onchange = e => applyTranslations(e.target.value);
}

function updateDetectedLanguageLabel() {
  const label = document.getElementById("languageDetectedLabel");
  if (!label) return;
  const browserLang = normalizedSupportedLanguage(navigator.language);
  const dict = translations[currentLang] || en;
  label.textContent = `${dict.detectedLanguage}: ${displayLanguage(browserLang,currentLang)} → ${displayLanguage(currentLang,currentLang)}`;
}

const slides=[...document.querySelectorAll(".hero-slide")], dots=document.getElementById("heroDots");
let heroIndex=0,timer;
slides.forEach((_,i)=>{const b=document.createElement("button");b.ariaLabel=`Ir a imagen ${i+1}`;b.onclick=()=>showSlide(i);dots.appendChild(b)});
function showSlide(i){slides[heroIndex].classList.remove("active");dots.children[heroIndex].classList.remove("active");heroIndex=(i+slides.length)%slides.length;slides[heroIndex].classList.add("active");dots.children[heroIndex].classList.add("active");clearInterval(timer);timer=setInterval(()=>showSlide(heroIndex+1),6500)}
document.querySelector(".hero-arrow.prev").onclick=()=>showSlide(heroIndex-1);
document.querySelector(".hero-arrow.next").onclick=()=>showSlide(heroIndex+1);
showSlide(0);
const mainHeader=document.getElementById("siteHeader");
function updateMainHeaderTransparency(){
  if(!mainHeader)return;
  const isHovered=mainHeader.matches(":hover");
  mainHeader.classList.toggle("scrolled", window.scrollY>80 && isHovered);
}
window.addEventListener("scroll",updateMainHeaderTransparency);
if(mainHeader){
  mainHeader.addEventListener("mouseenter",updateMainHeaderTransparency);
  mainHeader.addEventListener("mouseleave",()=>mainHeader.classList.remove("scrolled"));
}
updateMainHeaderTransparency();

const track=document.getElementById("featuredTrack");
document.querySelectorAll('[data-carousel="featured"]').forEach(btn=>btn.onclick=()=>track.scrollBy({left:(btn.classList.contains("right")?1:-1)*track.clientWidth*.88,behavior:"smooth"}));

let cart=0;
document.querySelectorAll(".add-btn").forEach(btn=>btn.onclick=()=>{
  cart++; document.getElementById("cartCount").textContent=cart;
  const dict=translations[currentLang]||en; btn.textContent="✓ "+dict.added;
  setTimeout(()=>{btn.textContent=dict.addCart},900);
});

const products=[
{nameKey:"productMate",categoryKey:"bazaar",image:"assets/Africa.jpeg"},
{nameKey:"productAlpargatas",categoryKey:"clothing",image:"assets/Inglaterra.jpeg"},
{nameKey:"productAlfajores",categoryKey:"food",image:"assets/Oceania.jpeg"},
{nameKey:"productPoncho",categoryKey:"clothing",image:"assets/Francia.jpeg"},
{nameKey:"productMatera",categoryKey:"bazaar",image:"assets/Asia.jpeg"},
{nameKey:"productBoina",categoryKey:"clothing",image:"assets/Africa.jpeg"},
{nameKey:"productTabla",categoryKey:"bazaar",image:"assets/Oceania.jpeg"},
{nameKey:"productBombacha",categoryKey:"clothing",image:"assets/Asia.jpeg"},
{nameKey:"productYerbera",categoryKey:"bazaar",image:"assets/Francia.jpeg"},
{nameKey:"wallets",categoryKey:"bazaar",image:"assets/Africa.jpeg"},
{nameKey:"backpacks",categoryKey:"bazaar",image:"assets/Asia.jpeg"},
{nameKey:"shirts",categoryKey:"clothing",image:"assets/Francia.jpeg"}
];
const searchInput=document.getElementById("searchInput"), suggestionBox=document.getElementById("searchSuggestions");
searchInput.addEventListener("input",()=>{
  const dict=translations[currentLang]||en;
  const q=searchInput.value.toLocaleLowerCase(currentLang).trim();
  const hits=q?products.filter(x=>((dict[x.nameKey]||en[x.nameKey])+" "+(dict[x.categoryKey]||en[x.categoryKey])).toLocaleLowerCase(currentLang).includes(q)).slice(0,6):[];
  suggestionBox.innerHTML=hits.length
    ?hits.map(x=>`<button class="search-result"><img src="${x.image}" alt=""><span><strong>${dict[x.nameKey]||en[x.nameKey]}</strong><small>${dict[x.categoryKey]||en[x.categoryKey]} · ${dict.retailWholesale}</small></span><b>→</b></button>`).join("")
    :(q?`<div class="no-search-result">${dict.noResults} “${searchInput.value}”.</div>`:"");
  suggestionBox.classList.toggle("show",Boolean(q));
});
document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap"))suggestionBox.classList.remove("show")});

const panel=document.getElementById("countryPanel"), groups=document.getElementById("countryGroups");
function renderCountries(filter="") {
  const continentNames={"América":{es:"América",en:"Americas",zh:"美洲",pt:"América",fr:"Amériques",de:"Amerika",it:"Americhe",ja:"アメリカ大陸",ko:"아메리카",ru:"Америка",ar:"الأمريكتان"},"Europa":{es:"Europa",en:"Europe",zh:"欧洲",pt:"Europa",fr:"Europe",de:"Europa",it:"Europa",ja:"ヨーロッパ",ko:"유럽",ru:"Европа",ar:"أوروبا"},"Asia":{es:"Asia",en:"Asia",zh:"亚洲",pt:"Ásia",fr:"Asie",de:"Asien",it:"Asia",ja:"アジア",ko:"아시아",ru:"Азия",ar:"آسيا"},"Oceanía":{es:"Oceanía",en:"Oceania",zh:"大洋洲",pt:"Oceania",fr:"Océanie",de:"Ozeanien",it:"Oceania",ja:"オセアニア",ko:"오세아니아",ru:"Океания",ar:"أوقيانوسيا"}};
  groups.innerHTML=Object.entries(countries).map(([continent,list])=>{
    const matches=list.filter(([name])=>{
      const code=COUNTRY_CODE_MAP[name]||"";
      const localName=displayCountry(code,currentLang);
      return (name+" "+localName).toLocaleLowerCase(currentLang).includes(filter.toLocaleLowerCase(currentLang));
    });
    if(!matches.length)return"";
    return `<div class="country-group"><h4>${continentNames[continent]?.[currentLang]||continentNames[continent]?.en||continent}</h4><div class="country-list">${
      matches.map(([n,l])=>{const code=COUNTRY_CODE_MAP[n]||"";return `<button data-country="${n}" data-code="${code}" data-lang="${l}">${displayCountry(code,currentLang)}</button>`}).join("")
    }</div></div>`;
  }).join("");

  groups.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{
    currentCountryCode=btn.dataset.code||"AR";
    const language=currentCountryCode==="AR" ? "es" : normalizedSupportedLanguage(btn.dataset.lang);
    localStorage.setItem("awsCountryCode",currentCountryCode);
    localStorage.setItem("awsCountry",btn.dataset.country);
    localStorage.setItem("awsLang",language);
    applyTranslations(language);
    const selected=document.getElementById("selectedCountry");
    if(selected && currentCountryCode==="AR") selected.textContent="Argentina";
    panel.classList.remove("open");
  });
}
document.getElementById("countryButton").onclick=()=>panel.classList.toggle("open");
document.getElementById("closeCountries").onclick=()=>panel.classList.remove("open");
document.getElementById("countrySearch").oninput=e=>renderCountries(e.target.value);

const shopSidebar=document.getElementById("shopSidebar");
const sidebarBackdrop=document.getElementById("sidebarBackdrop");
function setSidebar(open){shopSidebar.classList.toggle("open",open);sidebarBackdrop.classList.toggle("open",open);document.body.style.overflow=open?"hidden":"";}
document.getElementById("openSidebar").addEventListener("click",()=>setSidebar(true));
document.getElementById("closeSidebar").addEventListener("click",()=>setSidebar(false));
sidebarBackdrop.addEventListener("click",()=>setSidebar(false));
document.addEventListener("keydown",e=>{if(e.key==="Escape")setSidebar(false)});
shopSidebar.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setSidebar(false)));

document.querySelectorAll(".mode-btn").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".mode-btn").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  const mode=btn.dataset.mode; document.body.dataset.shoppingMode=mode;
  const dict=translations[currentLang]||en;
  document.getElementById("selectedModeText").textContent=mode==="mayorista"?dict.modeWholesale:dict.modeRetail;
  localStorage.setItem("awsShoppingMode",mode);
}));

async function detectVisitorCountryAndLanguage() {
  const savedLang=localStorage.getItem("awsLang");
  const savedCode=localStorage.getItem("awsCountryCode");
  if(savedCode) currentCountryCode=savedCode;

  if(savedLang) {
    const safeSavedLang=currentCountryCode==="AR" ? "es" : savedLang;
    if(currentCountryCode==="AR") localStorage.setItem("awsLang","es");
    applyTranslations(safeSavedLang,false);
    return;
  }

  let detectedCode=(navigator.language.split("-")[1]||"").toUpperCase();
  let detectedLang=normalizedSupportedLanguage(navigator.language);

  try {
    const response=await fetch("https://ipapi.co/json/",{cache:"no-store"});
    if(response.ok) {
      const data=await response.json();
      if(data.country_code) detectedCode=data.country_code;
      if(data.languages) detectedLang=normalizedSupportedLanguage(data.languages.split(",")[0]);
    }
  } catch(error) {
    console.info("Detección por IP no disponible; se usa el idioma del navegador.");
  }

  currentCountryCode=detectedCode||"AR";
  localStorage.setItem("awsCountryCode",currentCountryCode);
  applyTranslations(detectedLang,false);
}

document.querySelector(".newsletter form").onsubmit=e=>{e.preventDefault();alert(currentLang==="es"?"¡Gracias por suscribirte!":"Thank you for subscribing!")};
renderCountries();
detectVisitorCountryAndLanguage();

const savedMode=localStorage.getItem("awsShoppingMode");
if(savedMode){const btn=document.querySelector(`.mode-btn[data-mode="${savedMode}"]`);if(btn)btn.click();}


// SUBCATEGORY_CARD_SLIDESHOW_V1
document.querySelectorAll(".subcategory-card[data-slide-images]").forEach((card,cardIndex)=>{
  let images=[];
  try{images=JSON.parse(card.dataset.slideImages)}catch(e){}
  if(images.length<2)return;
  let index=0;
  setTimeout(()=>{
    setInterval(()=>{
      index=(index+1)%images.length;
      card.classList.add("changing-photo");
      const preload=new Image();
      preload.onload=()=>{
        card.style.backgroundImage=`url("${images[index]}")`;
        card.classList.remove("changing-photo");
      };
      preload.onerror=()=>card.classList.remove("changing-photo");
      preload.src=images[index];
    },4000);
  },cardIndex*250);
});


// MAIN_CATEGORY_CARD_SLIDESHOW_V2
document.querySelectorAll(".category-card[data-category-images]").forEach((card,cardIndex)=>{
  let images=[];
  try{images=JSON.parse(card.dataset.categoryImages)}catch(e){}
  if(images.length<2)return;
  let index=0;
  setTimeout(()=>{
    setInterval(()=>{
      index=(index+1)%images.length;
      card.classList.add("changing-photo");
      const preload=new Image();
      preload.onload=()=>{
        card.style.backgroundImage=`url("${images[index]}")`;
        card.classList.remove("changing-photo");
      };
      preload.onerror=()=>card.classList.remove("changing-photo");
      preload.src=images[index];
    },4000);
  },cardIndex*350);
});
