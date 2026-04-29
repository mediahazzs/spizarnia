let products = JSON.parse(localStorage.getItem('spizarnia')) || [];
function exportShoppingPDF(){
 alert("działa");
}
function save(){
localStorage.setItem('spizarnia', JSON.stringify(products));
}

function render(){
let list=document.getElementById('productList');
list.innerHTML='';

products.forEach((item,index)=>{
let row=document.createElement('div');
row.className='item';

row.innerHTML=`
<div class="swipe-wrap">
  <div class="delete-bg" onclick="removeProduct(${index})">
     Usuń
  </div>

  <div class="swipe-item">
    <div>
      <strong>${item.name}</strong><br>
      ${item.amount} ${item.unit}
    </div>

    <div class="controls">
      <button onclick="decrease(${index})">-</button>
      <button onclick="increase(${index})">+</button>
    </div>
  </div>
</div>
`;

list.appendChild(row);
});
}
 function exportShoppingPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Lista zakupów",20,20);

let lowStock=products.filter(p=>p.amount<=2);

let y=40;

if(lowStock.length===0){
doc.text("Brak produktów do kupienia.",20,y);
}else{
lowStock.forEach(item=>{
doc.text("- " + item.name,20,y);
y+=10;
});
    }

    doc.output('dataurlnewwindow');
}

function addProduct(){
const name=document.getElementById('productName').value;
const amount=parseFloat(document.getElementById('productAmount').value);
const unit=document.getElementById('productUnit').value;

if(!name) return;

products.push({
name,
amount,
unit
});

save();
render();

productName.value='';
productAmount.value=1;
productUnit.value='';
}
function removeProduct(i){
 if(confirm(`Usunąć ${products[i].name}?`)){
   products.splice(i,1);
   save();
   render();
 }
}
function editAmount(i){
const newValue = prompt(
`Nowa ilość dla ${products[i].name}:`,
products[i].amount
);

if(newValue!==null && !isNaN(newValue)){
products[i].amount=parseFloat(newValue);
save();
render();
}
}

function increase(i){
products[i].amount++;
save();
render();
}

function decrease(i){
if(products[i].amount>0){
products[i].amount--;
save();
render();
}
}


function renderShoppingList(){
const shop=document.getElementById('shoppingList');
shop.innerHTML='';

const lowStock=products.filter(p=>p.amount<=2);

if(lowStock.length===0){
shop.innerHTML='Wszystko uzupełnione ✅';
return;
}

lowStock.forEach(item=>{
const div=document.createElement('div');
div.className='item';
div.innerHTML=`Kup: ${item.name}`;
shop.appendChild(div);
});
}
render();renderShoppingList();let startX=0;

document.addEventListener('touchstart',e=>{
const card=e.target.closest('.swipe-item');
if(!card) return;
startX=e.changedTouches[0].clientX;
});

document.addEventListener('touchend',e=>{
const card=e.target.closest('.swipe-item');
if(!card) return;

let endX=e.changedTouches[0].clientX;
let diff=startX-endX;

if(diff>60){
card.classList.add('swiped');
}

if(diff<-40){
card.classList.remove('swiped');
}
 function exportShoppingPDF(){
 alert("funkcja działa");
}
}
});
