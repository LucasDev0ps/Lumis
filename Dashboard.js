async function loadDashboard(){

let res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?select=*`,{

headers:{
"apikey":SUPABASE_KEY,
"Authorization":`Bearer ${SUPABASE_KEY}`
}

})

let data = await res.json()

let total = 0

let labels = []
let valores = []

data.forEach(t=>{

total += parseFloat(t.amount)

labels.push(t.description)
valores.push(t.amount)

})

document.getElementById("total").innerText =
"R$ " + total.toFixed(2)

document.getElementById("saldo").innerText =
"R$ " + (6300 - total).toFixed(2)

drawChart(labels,valores)

}

function drawChart(labels,valores){

let ctx = document.getElementById("grafico")

new Chart(ctx,{

type:"pie",

data:{

labels:labels,

datasets:[{

data:valores

}]

}

})

}

loadDashboard()