(function(){
  "use strict";
  const TIERS=[
    [0.5,79500,111000,123300,142900,162700],[1,101800,142900,147400,153000,182900],
    [1.5,126300,157400,166600,183500,220000],[2,142900,173300,183500,220000,254700],
    [3,166600,204100,223700,244700,305200],[4,204100,223700,244700,285500,340900],
    [5,228200,244700,275000,321000,391800],[6,275700,330700,366200,483200,499200],
    [7,305200,383500,422900,545000,560700],[8,336000,401600,465100,570000,621900],
    [9,366200,443500,483200,621900,663000],[10,391800,473800,524700,663000,691800],
    [11,411600,514600,560700,691800,710800],[12,442700,535300,595000,710800,763100],
    [13,465100,560700,632700,742800,782600],[14,483200,584900,652500,774100,818700],
    [15,514600,606100,691800,798400,865500],[16,535300,632700,710800,825000,895200],
    [17,545000,640100,725400,844600,932500],[18,560700,650000,742800,860500,960700],
    [19,570000,656600,752100,870300,996700],[20,581400,681700,763100,880600,1024700]
  ];
  const LIMITROFES=new Set(['BO','BR','CL','PY','UY']);
  const SOUTH_AMERICA=new Set(['CO','EC','PE','VE','GY','SR','GF']);
  const AMERICAS=new Set(['US','CA','MX','BZ','CR','SV','GT','HN','NI','PA','CU','DO','HT','JM','BS','BB','TT','AG','DM','GD','KN','LC','VC','PR']);
  const EUROPE=new Set(['AL','AD','AT','BE','BA','BG','BY','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MC','MD','ME','MK','MT','NL','NO','PL','PT','RO','RS','RU','SE','SI','SK','SM','UA','VA']);
  const NAME_TO_CODE={argentina:'AR',bolivia:'BO',brasil:'BR',brazil:'BR',chile:'CL',paraguay:'PY',uruguay:'UY',colombia:'CO',ecuador:'EC',peru:'PE','perú':'PE',venezuela:'VE',guyana:'GY',surinam:'SR',suriname:'SR','estados unidos':'US','united states':'US',usa:'US',canada:'CA','canadá':'CA',mexico:'MX','méxico':'MX',españa:'ES',spain:'ES',francia:'FR',france:'FR',italia:'IT',italy:'IT',alemania:'DE',germany:'DE','reino unido':'GB','united kingdom':'GB',china:'CN',japon:'JP','japón':'JP',india:'IN',australia:'AU','nueva zelanda':'NZ','new zealand':'NZ'};
  function normalizeCode(value){const raw=String(value||'').trim();if(/^[A-Za-z]{2}$/.test(raw))return raw.toUpperCase();return NAME_TO_CODE[raw.toLowerCase()]||'';}
  function regionFor(code){code=normalizeCode(code);if(code==='AR')return 'argentina';if(LIMITROFES.has(code))return 'limitrofes';if(SOUTH_AMERICA.has(code))return 'sudamerica';if(AMERICAS.has(code))return 'america';if(EUROPE.has(code))return 'europa';return 'mundo';}
  function shippingARS(code,grams){const region=regionFor(code);if(region==='argentina')return 10000;const kg=Math.max(0.001,Number(grams||0)/1000);if(kg>20)throw new Error('El pedido supera los 20 kg. Contactanos para cotizar el envío.');const tier=TIERS.find(row=>kg<=row[0])||TIERS[TIERS.length-1];const col={limitrofes:1,sudamerica:2,america:3,europa:4,mundo:5}[region];return tier[col];}
  window.AWS_SHIPPING={normalizeCode,regionFor,shippingARS};
})();
