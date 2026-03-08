async function loadDashboard(){

let res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?select=*`,{

headers:{
"apikey":SUPABASE_KEY,
"Authorization":`Bearer ${SUPABASE_KEY}`
}

})

let data = await res.json()

let total = 0
let categorias = {}

data.forEach(t=>{

let valor = parseFloat(t.amount)

total += valor

let cat = t.category || "Outros"

if(!categorias[cat]){

categorias[cat] = 0

}

categorias[cat] += valor

})

document.getElementById("total").innerText =
"R$ " + total.toFixed(2)

document.getElementById("saldo").innerText =
"R$ " + (6300 - total).toFixed(2)

let labels = Object.keys(categorias)
let valores = Object.values(categorias)

drawChart(labels,valores)

}

function drawChart(labels,valores){

let ctx = document.getElementById("grafico")

if(window.chart){
window.chart.destroy()
}

window.chart = new Chart(ctx,{

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