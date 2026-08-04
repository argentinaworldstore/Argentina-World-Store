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
  function currentLanguage(){return normalizedLanguage(localStorage.getItem('awsLanguage')||document.documentElement.lang||'es');}
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
      const hits=list.filter(([name,code])=>(name+' '+regionName(code,name)).toLocaleLowerCase(currentLanguage()).includes(query));
      if(!hits.length)return'';
      return `<div class="country-group"><h4>${continent}</h4><div class="country-list">${hits.map(([name,code])=>`<button type="button" data-code="${code}">${regionName(code,name)}</button>`).join('')}</div></div>`;
    }).join('');
    groups.querySelectorAll('button[data-code]').forEach(button=>button.onclick=()=>{
      const code=button.dataset.code;localStorage.setItem('awsCountryCode',code);
      document.getElementById('selectedCountry')?.replaceChildren(document.createTextNode(regionName(code,code)));
      document.getElementById('countryPanel')?.classList.remove('open');location.reload();
    });
  }

  function initCountries(){rebuildCountries('');const search=document.getElementById('countrySearch');if(search)search.oninput=()=>rebuildCountries(search.value);const selected=document.getElementById('selectedCountry');const code=localStorage.getItem('awsCountryCode')||'AR';if(selected)selected.textContent=regionName(code,code)}

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

  function showLanguageOffer(country,lang){
    if(!ALL_LANGUAGES[lang]||lang==='es'||localStorage.getItem('awsLanguageChosen'))return;
    const ui=UI[lang]||UI.en;
    const overlay=document.createElement('div');overlay.id='aws-language-offer';
    const msg=ui.offer.replace('{country}',regionName(country,lang)).replace('{language}',languageName(lang,lang));
    overlay.innerHTML=`<div class="aws-lang-card" role="dialog" aria-modal="true"><h3>${languageName(lang,lang)}</h3><p>${msg}</p><div class="aws-lang-actions"><button class="aws-lang-primary" type="button">${ui.translate}</button><button class="aws-lang-secondary" type="button">${ui.keep}</button></div></div>`;
    overlay.querySelector('.aws-lang-primary').onclick=()=>{localStorage.setItem('awsLanguageChosen','1');localStorage.setItem('awsCountryCode',country);applyLanguage(lang,true)};
    overlay.querySelector('.aws-lang-secondary').onclick=()=>{localStorage.setItem('awsLanguageChosen','1');localStorage.setItem('awsCountryCode',country);overlay.remove()};
    document.body.appendChild(overlay);
  }

  async function initDetection(){
    const country=await detectRegion();
    const browserLang=normalizedLanguage(navigator.languages?.[0]||navigator.language);
    const regionLang=COUNTRY_LANGUAGE[country]||browserLang;
    const detected=ALL_LANGUAGES[regionLang]?regionLang:browserLang;
    if(country&&!localStorage.getItem('awsCountryCode'))localStorage.setItem('awsCountryCode',country);
    updateDetectedLabel(country,detected);
    showLanguageOffer(country||'US',detected);
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
     box.innerHTML=hits.map(p=>`<button type="button" data-href="${prefix}productos/${p.id}.html">
       <img src="${prefix}Fotos/${p.subcategory}/${p.images[0]}" alt="">
       <span>${p.name}</span>
     </button>`).join("");
     box.classList.toggle("show",hits.length>0);
     box.querySelectorAll("button").forEach(btn=>btn.onclick=()=>location.href=btn.dataset.href);
   });
 });
})();
