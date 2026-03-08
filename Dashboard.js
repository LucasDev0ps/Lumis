async function loadDashboard(){

let res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?select=*`, {

headers:{
"apikey":SUPABASE_KEY,
"Authorization":`Bearer ${SUPABASE_KEY}`
}

})

let data = await res.json()

let total = 0

data.forEach(t => {

total += parseFloat(t.amount)

})

document.getElementById("total").innerText =
"R$ " + total.toFixed(2)

document.getElementById("saldo").innerText =
"R$ " + (6300 - total).toFixed(2)

}

loadDashboard()