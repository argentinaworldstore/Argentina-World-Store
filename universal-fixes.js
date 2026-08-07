(function(){
  "use strict";

  const ALL_LANGUAGES = {
    es:"Español", en:"English", zh:"中文", pt:"Português", fr:"Français",
    de:"Deutsch", it:"Italiano", ja:"日本語", ko:"한국어", ru:"Русский",
    ar:"العربية", hi:"हिन्दी", nl:"Nederlands", pl:"Polski",
    el:"Ελληνικά", tr:"Türkçe", id:"Bahasa Indonesia"
  };

  const COUNTRY_LANGUAGE = {
    AR:"es",BO:"es",CL:"es",CO:"es",CR:"es",CU:"es",DO:"es",EC:"es",SV:"es",GT:"es",HN:"es",MX:"es",NI:"es",PA:"es",PY:"es",PE:"es",PR:"es",UY:"es",VE:"es",ES:"es",
    US:"en",GB:"en",CA:"en",AU:"en",NZ:"en",IE:"en",JM:"en",ZA:"en",SG:"en",PH:"en",
    BR:"pt",PT:"pt",AO:"pt",MZ:"pt",
    FR:"fr",BE:"fr",CH:"de",DE:"de",AT:"de",LI:"de",
    IT:"it",SM:"it",VA:"it",
    CN:"zh",TW:"zh",HK:"zh",MO:"zh",
    JP:"ja",KR:"ko",KP:"ko",
    RU:"ru",BY:"ru",KZ:"ru",
    SA:"ar",AE:"ar",QA:"ar",KW:"ar",OM:"ar",BH:"ar",EG:"ar",JO:"ar",DZ:"ar",MA:"ar",TN:"ar",IQ:"ar",LB:"ar",
    IN:"hi",NP:"hi",
    NL:"nl",PL:"pl",GR:"el",CY:"el",TR:"tr",ID:"id"
  };


  const REGION_PROMPT = {
    es:{title:"Región detectada",message:"Detectamos que no estás en Argentina. ¿Querés cambiar la tienda a tu región: {country}?",yes:"Sí, cambiar a mi región",no:"No, mantener Argentina"},
    en:{title:"Region detected",message:"We detected that you are not in Argentina. Would you like to switch the store to your region: {country}?",yes:"Yes, switch to my region",no:"No, keep Argentina"},
    pt:{title:"Região detectada",message:"Detectamos que você não está na Argentina. Deseja mudar a loja para sua região: {country}?",yes:"Sim, mudar para minha região",no:"Não, manter Argentina"},
    fr:{title:"Région détectée",message:"Nous avons détecté que vous n'êtes pas en Argentine. Voulez-vous passer la boutique à votre région : {country} ?",yes:"Oui, changer de région",no:"Non, garder l'Argentine"},
    de:{title:"Region erkannt",message:"Wir haben erkannt, dass Sie sich nicht in Argentinien befinden. Möchten Sie den Shop auf Ihre Region {country} umstellen?",yes:"Ja, Region wechseln",no:"Nein, Argentinien behalten"},
    it:{title:"Regione rilevata",message:"Abbiamo rilevato che non ti trovi in Argentina. Vuoi impostare il negozio sulla tua regione: {country}?",yes:"Sì, cambia regione",no:"No, mantieni Argentina"},
    zh:{title:"检测到地区",message:"我们检测到您不在阿根廷。是否将商店切换到您所在的地区：{country}？",yes:"是，切换到我的地区",no:"否，保持阿根廷"},
    ja:{title:"地域を検出しました",message:"アルゼンチン国外からのアクセスを検出しました。ストアをお住まいの地域（{country}）に切り替えますか？",yes:"はい、地域を変更",no:"いいえ、アルゼンチンのまま"},
    ko:{title:"지역 감지됨",message:"아르헨티나 외 지역에서 접속한 것으로 감지되었습니다. 스토어를 현재 지역({country})으로 변경하시겠습니까?",yes:"예, 내 지역으로 변경",no:"아니요, 아르헨티나 유지"},
    ru:{title:"Регион определён",message:"Мы определили, что вы находитесь не в Аргентине. Переключить магазин на ваш регион: {country}?",yes:"Да, сменить регион",no:"Нет, оставить Аргентину"},
    ar:{title:"تم اكتشاف المنطقة",message:"اكتشفنا أنك لست في الأرجنتين. هل تريد تغيير المتجر إلى منطقتك: {country}؟",yes:"نعم، غيّر إلى منطقتي",no:"لا، أبقِ الأرجنتين"},
    hi:{title:"क्षेत्र पहचाना गया",message:"हमने पाया कि आप अर्जेंटीना में नहीं हैं। क्या आप स्टोर को अपने क्षेत्र {country} पर बदलना चाहते हैं?",yes:"हाँ, मेरा क्षेत्र चुनें",no:"नहीं, अर्जेंटीना रखें"},
    nl:{title:"Regio gedetecteerd",message:"We hebben gedetecteerd dat je niet in Argentinië bent. Wil je de winkel wijzigen naar jouw regio: {country}?",yes:"Ja, wijzig mijn regio",no:"Nee, behoud Argentinië"},
    pl:{title:"Wykryto region",message:"Wykryliśmy, że nie jesteś w Argentynie. Czy chcesz przełączyć sklep na swój region: {country}?",yes:"Tak, zmień region",no:"Nie, pozostaw Argentynę"},
    el:{title:"Εντοπίστηκε περιοχή",message:"Εντοπίσαμε ότι δεν βρίσκεστε στην Αργεντινή. Θέλετε να αλλάξετε το κατάστημα στην περιοχή σας: {country};",yes:"Ναι, αλλαγή περιοχής",no:"Όχι, διατήρηση Αργεντινής"},
    tr:{title:"Bölge algılandı",message:"Arjantin'de olmadığınızı algıladık. Mağazayı bölgenize geçirmek ister misiniz: {country}?",yes:"Evet, bölgeme geç",no:"Hayır, Arjantin kalsın"},
    id:{title:"Wilayah terdeteksi",message:"Kami mendeteksi bahwa Anda tidak berada di Argentina. Ingin mengganti toko ke wilayah Anda: {country}?",yes:"Ya, ganti ke wilayah saya",no:"Tidak, tetap Argentina"}
  };
  const ALL_COUNTRIES = {"América":[["Argentina","AR"],["Bolivia","BO"],["Brasil","BR"],["Canadá","CA"],["Chile","CL"],["Colombia","CO"],["Costa Rica","CR"],["Cuba","CU"],["Ecuador","EC"],["El Salvador","SV"],["Estados Unidos","US"],["Guatemala","GT"],["Haití","HT"],["Honduras","HN"],["Jamaica","JM"],["México","MX"],["Nicaragua","NI"],["Panamá","PA"],["Paraguay","PY"],["Perú","PE"],["República Dominicana","DO"],["Uruguay","UY"],["Venezuela","VE"]],"Europa":[["Alemania","DE"],["Austria","AT"],["Bélgica","BE"],["Bulgaria","BG"],["Croacia","HR"],["Dinamarca","DK"],["Eslovaquia","SK"],["Eslovenia","SI"],["España","ES"],["Estonia","EE"],["Finlandia","FI"],["Francia","FR"],["Grecia","GR"],["Hungría","HU"],["Irlanda","IE"],["Islandia","IS"],["Italia","IT"],["Letonia","LV"],["Lituania","LT"],["Luxemburgo","LU"],["Malta","MT"],["Noruega","NO"],["Países Bajos","NL"],["Polonia","PL"],["Portugal","PT"],["Reino Unido","GB"],["República Checa","CZ"],["Rumania","RO"],["Suecia","SE"],["Suiza","CH"],["Ucrania","UA"]],"Asia":[["Arabia Saudita","SA"],["Bangladés","BD"],["China","CN"],["Corea del Sur","KR"],["Emiratos Árabes Unidos","AE"],["Filipinas","PH"],["India","IN"],["Indonesia","ID"],["Israel","IL"],["Japón","JP"],["Jordania","JO"],["Kazajistán","KZ"],["Kuwait","KW"],["Malasia","MY"],["Nepal","NP"],["Omán","OM"],["Pakistán","PK"],["Qatar","QA"],["Singapur","SG"],["Sri Lanka","LK"],["Tailandia","TH"],["Turquía","TR"],["Vietnam","VN"]],"África":[["Argelia","DZ"],["Angola","AO"],["Camerún","CM"],["Costa de Marfil","CI"],["Egipto","EG"],["Etiopía","ET"],["Ghana","GH"],["Kenia","KE"],["Marruecos","MA"],["Mozambique","MZ"],["Namibia","NA"],["Nigeria","NG"],["Senegal","SN"],["Sudáfrica","ZA"],["Tanzania","TZ"],["Túnez","TN"],["Uganda","UG"],["Zambia","ZM"],["Zimbabue","ZW"]],"Oceanía":[["Australia","AU"],["Fiyi","FJ"],["Nueva Zelanda","NZ"],["Papúa Nueva Guinea","PG"],["Samoa","WS"],["Tonga","TO"],["Vanuatu","VU"]]};

  const UI = {
    es:{detected:"Idioma detectado",offer:"Detectamos que estás en {country}. ¿Traducir toda la tienda a {language}?",translate:"Traducir",keep:"Mantener español"},
    en:{detected:"Detected language",offer:"We detected that you are in {country}. Translate the entire store into {language}?",translate:"Translate",keep:"Keep Spanish"},
    pt:{detected:"Idioma detectado",offer:"Detectamos que você está em {country}. Traduzir toda a loja para {language}?",translate:"Traduzir",keep:"Manter espanhol"},
    fr:{detected:"Langue détectée",offer:"Nous avons détecté que vous êtes en {country}. Traduire toute la boutique en {language} ?",translate:"Traduire",keep:"Garder l’espagnol"},
    de:{detected:"Erkannte Sprache",offer:"Wir haben erkannt, dass Sie sich in {country} befinden. Den gesamten Shop auf {language} übersetzen?",translate:"Übersetzen",keep:"Spanisch behalten"},
    it:{detected:"Lingua rilevata",offer:"Abbiamo rilevato che ti trovi in {country}. Tradurre tutto il negozio in {language}?",translate:"Traduci",keep:"Mantieni spagnolo"},
    zh:{detected:"检测到的语言",offer:"检测到您位于{country}。是否将整个商店翻译成{language}？",translate:"翻译",keep:"保留西班牙语"},
    ja:{detected:"検出された言語",offer:"現在地は{country}と検出されました。ストア全体を{language}に翻訳しますか？",translate:"翻訳する",keep:"スペイン語のまま"},
    ko:{detected:"감지된 언어",offer:"현재 위치가 {country}(으)로 감지되었습니다. 전체 스토어를 {language}(으)로 번역할까요?",translate:"번역",keep:"스페인어 유지"},
    ru:{detected:"Определённый язык",offer:"Мы определили, что вы находитесь в {country}. Перевести весь магазин на {language}?",translate:"Перевести",keep:"Оставить испанский"},
    ar:{detected:"اللغة المكتشفة",offer:"اكتشفنا أنك في {country}. هل تريد ترجمة المتجر بالكامل إلى {language}؟",translate:"ترجمة",keep:"الإبقاء على الإسبانية"},
    hi:{detected:"पहचानी गई भाषा",offer:"हमने पाया कि आप {country} में हैं। पूरी दुकान का {language} में अनुवाद करें?",translate:"अनुवाद करें",keep:"स्पैनिश रखें"}
  };

  function prefix(){return location.pathname.includes('/productos/')||location.pathname.includes('/subcategorias/')?'../':'';}
  function normalizedLanguage(value){const code=String(value||'').toLowerCase().split('-')[0];return ALL_LANGUAGES[code]?code:'en';}
  function currentLanguage(){return normalizedLanguage(localStorage.getItem('awsLang')||localStorage.getItem('awsLanguage')||document.documentElement.lang||'es');}
  function regionName(code,lang=currentLanguage()){try{return new Intl.DisplayNames([lang],{type:'region'}).of(code)||code}catch{return code}}
  function languageName(code,lang=currentLanguage()){try{return new Intl.DisplayNames([lang],{type:'language'}).of(code)||ALL_LANGUAGES[code]||code}catch{return ALL_LANGUAGES[code]||code}}

  function setGoogleCookie(lang){
    const value=`/es/${lang}`;
    document.cookie=`googtrans=${value}; path=/`;
    document.cookie=`googtrans=${value}; path=/; domain=${location.hostname}`;
  }

  function clearGoogleCookie(){
    document.cookie='googtrans=; Max-Age=0; path=/';
    document.cookie=`googtrans=; Max-Age=0; path=/; domain=${location.hostname}`;
  }

  function applyLanguage(lang,reload=true){
    lang=normalizedLanguage(lang);
    localStorage.setItem('awsLanguage',lang);
    localStorage.setItem('awsLang',lang);
    if(lang==='es') clearGoogleCookie(); else setGoogleCookie(lang);
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    if(reload) location.reload();
  }

  window.googleTranslateElementInit=function(){
    if(!window.google?.translate?.TranslateElement)return;
    new google.translate.TranslateElement({
      pageLanguage:'es',
      includedLanguages:Object.keys(ALL_LANGUAGES).join(','),
      autoDisplay:false,
      multilanguagePage:true
    },'google_translate_element');
  };

  function loadGoogleTranslate(){
    if(document.getElementById('google_translate_element'))return;
    const holder=document.createElement('div');
    holder.id='google_translate_element';
    holder.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden';
    document.body.appendChild(holder);
    const script=document.createElement('script');
    script.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async=true;
    document.head.appendChild(script);
  }

  function fixHomeLinks(){const home=prefix()+'index.html#inicio';document.querySelectorAll('a[data-i18n="home"],a.brand').forEach(a=>a.href=home)}
  function normalizeCart(){let cart=[];try{cart=JSON.parse(localStorage.getItem('awsCart')||'[]')}catch{}if(!Array.isArray(cart))cart=[];cart=cart.map(i=>({...i,quantity:Math.max(1,Number(i.quantity)||1)}));const count=cart.reduce((s,i)=>s+(Number(i.quantity)||1),0);localStorage.setItem('awsCart',JSON.stringify(cart));localStorage.setItem('awsCartCount',String(count));document.querySelectorAll('#cartCount').forEach(el=>el.textContent=String(count))}

  function rebuildLanguageSelector(){
    document.querySelectorAll('#languageSelect').forEach(select=>{
      const lang=currentLanguage();
      select.innerHTML=Object.entries(ALL_LANGUAGES).map(([c,n])=>`<option value="${c}">${n}</option>`).join('');
      select.value=lang;
      select.onchange=()=>applyLanguage(select.value,true);
    });
    updateDetectedLabel();
  }

  function updateDetectedLabel(countryCode,detectedLang){
    const lang=currentLanguage();
    const ui=UI[lang]||UI.en;
    document.querySelectorAll('#languageDetectedLabel').forEach(label=>{
      const detected=detectedLang||normalizedLanguage(navigator.language);
      label.textContent=`${ui.detected}: ${languageName(detected,lang)} → ${languageName(lang,lang)}`;
    });
  }

  function rebuildCountries(filter){
    const groups=document.getElementById('countryGroups');if(!groups)return;
    const query=String(filter||'').toLocaleLowerCase(currentLanguage());
    groups.innerHTML=Object.entries(ALL_COUNTRIES).map(([continent,list])=>{
      const hits=list.filter(([name,code])=>(name+' '+regionName(code,currentLanguage())).toLocaleLowerCase(currentLanguage()).includes(query));
      if(!hits.length)return'';
      return `<div class="country-group"><h4>${continent}</h4><div class="country-list">${hits.map(([name,code])=>`<button type="button" data-code="${code}">${regionName(code,currentLanguage())}</button>`).join('')}</div></div>`;
    }).join('');
    groups.querySelectorAll('button[data-code]').forEach(button=>button.onclick=()=>{
      const code=button.dataset.code;localStorage.setItem('awsCountryCode',code);
      document.getElementById('selectedCountry')?.replaceChildren(document.createTextNode(regionName(code,currentLanguage())));
      document.getElementById('countryPanel')?.classList.remove('open');location.reload();
    });
  }

  function initCountries(){rebuildCountries('');const search=document.getElementById('countrySearch');if(search)search.oninput=()=>rebuildCountries(search.value);const selected=document.getElementById('selectedCountry');const code=localStorage.getItem('awsCountryCode')||'AR';if(selected)selected.textContent=regionName(code,currentLanguage())}

  function addStyles(){
    if(document.getElementById('aws-universal-styles'))return;
    const style=document.createElement('style');style.id='aws-universal-styles';style.textContent=`
      .added-success{background:#15803d!important;color:#fff!important}.cart-count-pulse{animation:awsPulse .65s ease}@keyframes awsPulse{0%{transform:scale(1)}50%{transform:scale(1.6);background:#1ba7e1;color:#fff}100%{transform:scale(1)}}#cartCount{min-width:22px;height:22px;display:inline-grid;place-items:center;border-radius:999px}
      #aws-language-offer{position:fixed;inset:0;z-index:2147483000;background:rgba(4,20,38,.62);display:grid;place-items:center;padding:20px}
      #aws-language-offer[hidden]{display:none!important}.aws-lang-card{max-width:540px;background:#fff;color:#082746;padding:28px;border-radius:14px;box-shadow:0 20px 70px rgba(0,0,0,.3)}.aws-lang-card h3{margin:0 0 12px;font-size:26px}.aws-lang-card p{font-size:17px;line-height:1.5}.aws-lang-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}.aws-lang-actions button{border:1px solid #082746;padding:12px 18px;border-radius:999px;font:inherit;font-weight:700;cursor:pointer}.aws-lang-primary{background:#082746;color:#fff}.aws-lang-secondary{background:#fff;color:#082746}
      html[dir="rtl"] body{text-align:right}.goog-te-banner-frame.skiptranslate,.goog-te-banner-frame{display:none!important}body{top:0!important}.goog-logo-link,.goog-te-gadget span{display:none!important}
    `;document.head.appendChild(style);
  }

  async function detectRegion(){
    const cached=localStorage.getItem('awsDetectedCountry');
    if(cached)return cached;
    const sources=['https://ipapi.co/json/','https://ipwho.is/'];
    for(const url of sources){
      try{
        const r=await fetch(url,{cache:'no-store'});if(!r.ok)continue;const d=await r.json();
        const code=String(d.country_code||d.country_code2||'').toUpperCase();
        if(/^[A-Z]{2}$/.test(code)){localStorage.setItem('awsDetectedCountry',code);return code;}
      }catch{}
    }
    return '';
  }

  function showRegionOffer(country,lang){
    if(!country||country==="AR")return;
    const choice=localStorage.getItem('awsRegionChoice');
    if(choice===`accepted:${country}`||choice===`declined:${country}`)return;
    if(document.getElementById('aws-language-offer'))return;
    const prompt=REGION_PROMPT[lang]||REGION_PROMPT.en;
    const overlay=document.createElement('div');overlay.id='aws-language-offer';
    const msg=prompt.message.replace('{country}',regionName(country,lang));
    overlay.innerHTML=`<div class="aws-lang-card" role="dialog" aria-modal="true" aria-labelledby="aws-region-title"><h3 id="aws-region-title">${prompt.title}</h3><p>${msg}</p><div class="aws-lang-actions"><button class="aws-lang-primary" type="button">${prompt.yes}</button><button class="aws-lang-secondary" type="button">${prompt.no}</button></div></div>`;
    overlay.querySelector('.aws-lang-primary').onclick=()=>{
      localStorage.setItem('awsRegionChoice',`accepted:${country}`);
      localStorage.setItem('awsCountryCode',country);
      localStorage.setItem('awsLanguageChosen','1');
      applyLanguage(lang,true);
    };
    overlay.querySelector('.aws-lang-secondary').onclick=()=>{
      localStorage.setItem('awsRegionChoice',`declined:${country}`);
      localStorage.setItem('awsCountryCode','AR');
      location.reload();
    };
    document.body.appendChild(overlay);
  }

  async function initDetection(){
    const country=await detectRegion();
    let browserLang=normalizedLanguage(navigator.languages?.[0]||navigator.language);
    const detected=ALL_LANGUAGES[browserLang]?browserLang:(COUNTRY_LANGUAGE[country]||'en');
    updateDetectedLabel(country,detected);
    if(country&&country!=="AR")showRegionOffer(country,detected);
  }

  function init(){
    fixHomeLinks();normalizeCart();addStyles();loadGoogleTranslate();rebuildLanguageSelector();initCountries();initDetection();
  }

  document.addEventListener('DOMContentLoaded',init);
  window.addEventListener('aws-cart-updated',normalizeCart);
  window.addEventListener('storage',normalizeCart);
})();


// Buscador global: usa exactamente la primera foto configurada para cada producto.
(function syncGlobalSearchImages(){
 const allProducts=window.PRODUCTOS||[];
 document.querySelectorAll(".search-wrap input").forEach(input=>{
   let box=input.parentElement?.querySelector(".search-suggestions");
   if(!box){
     box=document.createElement("div");
     box.className="search-suggestions";
     input.parentElement?.appendChild(box);
   }
   input.addEventListener("input",()=>{
     const q=input.value.trim().toLowerCase();
     if(q.length<2){box.classList.remove("show");box.innerHTML="";return;}
     const prefix=location.pathname.includes("/productos/")||location.pathname.includes("/subcategorias/")?"../":"";
     const hits=allProducts.filter(p=>p.name.toLowerCase().includes(q)).slice(0,8);
     const foreign=String(localStorage.getItem("awsCountryCode")||"AR").toUpperCase()!=="AR";
     const formatPrice=value=>new Intl.NumberFormat(foreign?"en-US":"es-AR",{style:"currency",currency:foreign?"USD":"ARS",maximumFractionDigits:foreign?2:0}).format(foreign?Number(value||0)/Number(window.AWS_ARS_PER_USD||1200):Number(value||0));
     box.innerHTML=hits.map(p=>`<button type="button" data-href="${prefix}${p.page||`productos/${p.id}.html`}">
       <img src="${prefix}Fotos/${p.subcategory}/${p.images[0]}" alt="${String(p.name||'').replace(/"/g,'&quot;')}" onerror="this.src='${prefix}assets/logo-argentina-world-store.jpeg'">
       <span class="aws-search-copy"><strong>${p.name}</strong><small>${p.subcategory||'Producto argentino'}</small></span>
       <b class="aws-search-price">${formatPrice(foreign?(p.foreignPriceARS||p.basePriceARS):p.basePriceARS)}</b>
     </button>`).join("");
     box.classList.toggle("show",hits.length>0);
     box.querySelectorAll("button").forEach(btn=>btn.onclick=()=>location.href=btn.dataset.href);
   });
 });
})();


/* ===== Navegación, menú móvil y nombres comerciales unificados ===== */
(function awsNavigationAndMobileFixes(){
  "use strict";
  function pagePrefix(){return (location.pathname.includes('/productos/')||location.pathname.includes('/subcategorias/'))?'../':'';}
  function homeHash(hash){return pagePrefix()+'index.html'+hash;}
  function normalizeCommercialNames(){
    document.querySelectorAll('[data-i18n="food"]').forEach(el=>el.textContent='Productos Regionales');
    document.querySelectorAll('[data-i18n="clothing"]').forEach(el=>el.textContent='Indumentaria');
    document.querySelectorAll('[data-i18n="bazaar"]').forEach(el=>el.textContent='Bazar y Accesorios');
    if(document.body?.dataset.productId==='camisas-6'){
      document.title='Camisa de Damas | Argentina World Store';
      document.getElementById('productName')?.replaceChildren(document.createTextNode('Camisa de Damas'));
      document.getElementById('crumb')?.replaceChildren(document.createTextNode('Camisas / Camisa de Damas'));
      document.querySelectorAll('#mainImage,[alt="camisasdedamas"]').forEach(img=>img.alt='Camisa de Damas');
    }
  }
  function fixInternalLinks(){
    const isHome=/\/(index\.html)?$/.test(location.pathname)||location.pathname.endsWith('/index.html');
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(!href||!href.startsWith('#'))return;
      if(['#comida','#vestimenta','#bazar','#destacados','#categorias','#subcategorias','#inicio','#footer'].includes(href)&&!isHome){
        a.setAttribute('href',homeHash(href));
      }
    });
    document.querySelectorAll('.cart-btn').forEach(btn=>{
      btn.type='button';
      btn.onclick=e=>{e.preventDefault();e.stopPropagation();location.href=pagePrefix()+'carrito.html';};
    });
    document.querySelectorAll('.brand').forEach(a=>a.href=homeHash('#inicio'));
  }
  function ensureMobileSearch(){
    document.querySelectorAll('.shop-sidebar').forEach(sidebar=>{
      if(sidebar.querySelector('.aws-sidebar-search'))return;
      const source=document.querySelector('.header-search-area .search-wrap,.search-wrap');
      const wrap=document.createElement('div');wrap.className='aws-sidebar-search';
      wrap.innerHTML='<div class="search-wrap"><span>⌕</span><input autocomplete="off" placeholder="Buscar productos..." type="search"><div class="search-suggestions"></div></div>';
      const head=sidebar.querySelector('.sidebar-head');
      if(head)head.insertAdjacentElement('afterend',wrap);else sidebar.prepend(wrap);
      const input=wrap.querySelector('input'),box=wrap.querySelector('.search-suggestions');
      input.addEventListener('input',()=>{
        const q=input.value.trim().toLowerCase();
        const products=window.PRODUCTOS||[];
        if(q.length<2){box.innerHTML='';box.classList.remove('show');return;}
        const hits=products.filter(p=>String(p.name||'').toLowerCase().includes(q)).slice(0,8);
        box.innerHTML=hits.map(p=>`<button type="button" data-href="${pagePrefix()}${p.page||`productos/${p.id}.html`}"><img src="${pagePrefix()}Fotos/${p.subcategory}/${p.images[0]}" alt="" onerror="this.src='${pagePrefix()}assets/logo-argentina-world-store.jpeg'"><span class="aws-search-copy"><strong>${p.name}</strong><small>${p.subcategory||'Producto argentino'}</small></span></button>`).join('');
        box.classList.toggle('show',!!hits.length);
        box.querySelectorAll('button').forEach(b=>b.onclick=()=>location.href=b.dataset.href);
      });
    });
  }
  function bindHeaderControls(){
    const sidebar=document.getElementById('shopSidebar'),backdrop=document.getElementById('sidebarBackdrop');
    const setOpen=open=>{sidebar?.classList.toggle('open',open);backdrop?.classList.toggle('open',open);document.body.classList.toggle('no-scroll',open)};
    document.querySelectorAll('#openSidebar,.menu-btn').forEach(b=>b.onclick=e=>{e.preventDefault();setOpen(true)});
    document.querySelectorAll('#closeSidebar').forEach(b=>b.onclick=()=>setOpen(false));
    backdrop?.addEventListener('click',()=>setOpen(false));
    const panel=document.getElementById('countryPanel');
    document.querySelectorAll('#countryButton').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();panel?.classList.toggle('open')});
    document.getElementById('closeCountries')?.addEventListener('click',()=>panel?.classList.remove('open'));
  }
  function init(){normalizeCommercialNames();fixInternalLinks();ensureMobileSearch();bindHeaderControls();}
  document.addEventListener('DOMContentLoaded',init);
  window.addEventListener('load',()=>setTimeout(init,200));
})();

/* ===== Acciones visibles en menú móvil: iniciar sesión, países y carrito ===== */
(function awsMobileAccountActions(){
  'use strict';
  function prefix(){return (location.pathname.includes('/productos/')||location.pathname.includes('/subcategorias/'))?'../':'';}
  function init(){
    document.querySelectorAll('.shop-sidebar').forEach(sidebar=>{
      if(sidebar.querySelector('.aws-mobile-account-actions'))return;
      const actions=document.createElement('div');
      actions.className='aws-mobile-account-actions';
      actions.innerHTML='<button type="button" class="aws-mobile-login">Iniciar sesión</button><button type="button" class="aws-mobile-countries">Elige tu país</button><button type="button" class="aws-mobile-cart">Carrito</button>';
      const search=sidebar.querySelector('.aws-sidebar-search');
      if(search)search.insertAdjacentElement('afterend',actions); else sidebar.querySelector('.sidebar-head')?.insertAdjacentElement('afterend',actions);
      actions.querySelector('.aws-mobile-login').onclick=()=>{
        sidebar.classList.remove('open');
        document.getElementById('sidebarBackdrop')?.classList.remove('open');
        const login=document.querySelector('.login-btn');
        if(login)login.click(); else document.getElementById('authOverlay')?.classList.add('open');
      };
      actions.querySelector('.aws-mobile-countries').onclick=()=>{
        sidebar.classList.remove('open');
        document.getElementById('sidebarBackdrop')?.classList.remove('open');
        document.getElementById('countryPanel')?.classList.add('open');
      };
      actions.querySelector('.aws-mobile-cart').onclick=()=>location.href=prefix()+'carrito.html';
    });
    document.querySelectorAll('.country-wrap .header-link span:nth-child(2)').forEach(el=>{
      if(matchMedia('(max-width:700px)').matches) el.textContent='Elige tu país';
    });
  }
  document.addEventListener('DOMContentLoaded',init);
  window.addEventListener('load',()=>setTimeout(init,250));
})();


/* ===== Selector de país resaltado de forma permanente ===== */
(function awsCountryPermanentFocus(){
  'use strict';
  function init(){
    const button=document.getElementById('countryButton');
    const label=document.getElementById('selectedCountry');
    if(!button || !label) return;

    const current=(label.textContent||'').trim().toLowerCase();
    const generic=['países','paises','countries',''].includes(current);
    if(generic) label.textContent='Elegí tu país';

    button.setAttribute('aria-label','Elegí tu país');
    button.classList.add('aws-country-focus');
  }
  document.addEventListener('DOMContentLoaded',init,{once:true});
  window.addEventListener('load',init,{once:true});
})();


/* Limpieza definitiva de cuentas/Supabase y presentación del selector de país. */
(function awsCheckoutWithoutAccounts(){
 const clean=()=>{
   document.querySelectorAll('.login-btn,.auth-overlay,#authOverlay,.checkout-auth-note').forEach(el=>el.remove());
   document.querySelectorAll('script[src*="supabase"],script[src*="supabase-auth"]').forEach(el=>el.remove());
   const country=document.getElementById('selectedCountry');
   const code=String(localStorage.getItem('awsCountryCode')||'').toUpperCase();
   if(country && !code) country.textContent='Elegí tu país';
 };
 document.addEventListener('DOMContentLoaded',clean);
 window.addEventListener('load',clean);
})();
