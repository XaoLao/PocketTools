const $=id=>document.getElementById(id);
const text=$('textInput');
const updateStats=()=>{const v=text.value;$('textStats').textContent=`${v.length} chars • ${v.trim()?v.trim().split(/\s+/).length:0} words • ${v? v.split(/\n/).length:0} lines`};
text.addEventListener('input',updateStats);
document.querySelectorAll('[data-text]').forEach(b=>b.onclick=()=>{const a=b.dataset.text,v=text.value;if(a==='trim')text.value=v.replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();if(a==='upper')text.value=v.toUpperCase();if(a==='lower')text.value=v.toLowerCase();if(a==='title')text.value=v.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());updateStats()});
$('jsonFormat').onclick=()=>jsonAction(false);$('jsonMinify').onclick=()=>jsonAction(true);function jsonAction(min){try{const o=JSON.parse($('jsonInput').value);$('jsonInput').value=JSON.stringify(o,null,min?0:2);$('jsonStatus').textContent='Valid JSON ✓'}catch(e){$('jsonStatus').textContent='Invalid JSON: '+e.message}}
$('passwordGenerate').onclick=()=>{const n=Math.max(8,Math.min(128,+$('passwordLength').value||20)),chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=',buf=new Uint32Array(n);crypto.getRandomValues(buf);$('passwordOutput').value=[...buf].map(x=>chars[x%chars.length]).join('')};
$('uuidGenerate').onclick=()=>{$('uuidOutput').value=crypto.randomUUID()};
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{await navigator.clipboard.writeText($(b.dataset.copy).value);const old=b.textContent;b.textContent='Copied ✓';setTimeout(()=>b.textContent=old,900)});
$('timestampConvert').onclick=()=>{const v=Number($('timestampInput').value);$('timestampOutput').value=Number.isFinite(v)?new Date(v*(v<1e12?1000:1)).toLocaleString():'Invalid timestamp'};
$('timestampNow').onclick=()=>{$('timestampInput').value=Math.floor(Date.now()/1000);$('timestampConvert').click()};
$('base64Encode').onclick=()=>{try{$('base64Input').value=btoa(unescape(encodeURIComponent($('base64Input').value)))}catch(e){alert(e.message)}};
$('base64Decode').onclick=()=>{try{$('base64Input').value=decodeURIComponent(escape(atob($('base64Input').value.trim())))}catch(e){alert('Invalid Base64')}};
$('urlEncode').onclick=()=>{$('urlInput').value=encodeURIComponent($('urlInput').value)};$('urlDecode').onclick=()=>{try{$('urlInput').value=decodeURIComponent($('urlInput').value)}catch(e){alert('Invalid encoded URL/text')}};
$('passwordGenerate').click();$('uuidGenerate').click();$('timestampNow').click();updateStats();
