async function addTransaction(){

let desc = document.getElementById("desc").value
let valor = document.getElementById("valor").value

if(!desc || !valor){
alert("Preencha descrição e valor")
return
}

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
amount:parseFloat(valor)

})

})

document.getElementById("desc").value=""
document.getElementById("valor").value=""

loadTransactions()

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
R$ ${t.amount}
</li>
`

})

}

loadTransactions()

function showScreen(screen){

document.querySelectorAll(".screen").forEach(s=>{

s.style.display="none"

})

document.getElementById(screen).style.display="block"

}

showScreen("dashboard")