function showScreen(screen){

document.querySelectorAll(".screen").forEach(s=>{

s.style.display="none"

})

document.getElementById(screen).style.display="block"

}

showScreen("dashboard")

function detectCategory(desc){

desc = desc.toLowerCase()

if(desc.includes("uber")) return "Transporte"
if(desc.includes("ifood")) return "Alimentação"
if(desc.includes("mercado")) return "Alimentação"
if(desc.includes("netflix")) return "Assinatura"
if(desc.includes("amazon")) return "Compras"

return "Outros"

}

async function addTransaction(){

let desc = document.getElementById("desc").value
let valor = document.getElementById("valor").value

if(!desc || !valor){

alert("Preencha descrição e valor")
return

}

let categoria = detectCategory(desc)

await fetch(`${SUPABASE_URL}/rest/v1/transactions`,{

method:"POST",

headers:{
"apikey":SUPABASE_KEY,
"Authorization":`Bearer ${SUPABASE_KEY}`,
"Content-Type":"application/json",
"Prefer":"return=minimal"
},

body:JSON.stringify({

description:desc,
amount:parseFloat(valor),
category:categoria

})

})

document.getElementById("desc").value=""
document.getElementById("valor").value=""

loadTransactions()
loadDashboard()

}

async function loadTransactions(){

let res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?select=*`,{

headers:{
"apikey":SUPABASE_KEY,
"Authorization":`Bearer ${SUPABASE_KEY}`
}

})

let data = await res.json()

let lista = document.getElementById("lista")

lista.innerHTML=""

data.reverse().forEach(t=>{

lista.innerHTML+=`
<li>
<strong>${t.description}</strong><br>
R$ ${t.amount}<br>
<small>${t.category}</small>
</li>
`

})

}

loadTransactions()