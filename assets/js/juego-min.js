const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],r=["A","J","Q","K"],a=0,l=[],n=document.querySelector("#btnNuevo"),d=document.querySelector("#btnPedir"),o=document.querySelector("#btnDetener"),i=document.querySelectorAll(".divCartas"),s=document.querySelectorAll("small"),u=(t=2)=>{e=c(),l=[];for(let r=0;r<t;r++)l.push(0);s.forEach(e=>e.innerText=0),i.forEach(e=>e.innerHTML=""),d.disabled=!1,o.disabled=!1},c=()=>{e=[];for(let a=2;a<=10;a++)for(let l of t)e.push(a+l);for(let n of t)for(let d of r)e.push(d+n);return _.shuffle(e)},$=()=>{if(0===e.length)throw"Ya no hay cartas";return e.pop()},f=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},b=(e,t)=>(l[t]=l[t]+f(e),s[t].innerText=l[t],l[t]),h=(e,t)=>{let r=document.createElement("img");r.src=`./cartas/${e}.png`,r.classList.add("carta"),i[t].append(r)},p=()=>{let[e,t]=l;setTimeout(()=>{t===e?alert("Nadie gana :("):e>21?alert("Computadora gana"):t>21?alert("Jugador Gana"):alert("Computadora Gana")},100)},g=e=>{let t=0;do{let r=$(),a=l.length-1;if(t=b(r,a),h(r,a),e>21)break}while(t<e&&e<=21);p()};return d.addEventListener("click",()=>{let e=$();a=b(e,0),h(e,0),a>21?(console.warn("Lo siento perdiste"),d.disabled=!0,o.disabled=!0,g(a)):21===a&&(console.warn("21, Genial!"),d.disabled=!0,o.disabled=!0,g(a))}),o.addEventListener("click",()=>{d.disabled=!0,o.disabled=!0,g(a)}),n.addEventListener("click",()=>{u()}),{nuevoJuego:u}})();