const supabase = window.supabase.createClient(
"https://gdwzmhnquasobzqmgxmz.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdkd3ptaG5xdWFzb2J6cW1neG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NDc4MTUsImV4cCI6MjA4ODUyMzgxNX0.tOuumoZzzdCVUnRZXmQw9-ctHjVSAN7a301CWs_d39Q"
)


// LOGIN
async function login(){

const email = document.getElementById("email").value
const senha = document.getElementById("senha").value

const { data, error } = await supabase.auth.signInWithPassword({
email: email,
password: senha
})

if(error){
alert("Erro no login")
return
}

window.location = "dashboard.html"

}



// ADICIONAR GASTO
async function addGasto(){

const descricao = document.getElementById("descricao").value
const valor = document.getElementById("valor").value

const { error } = await supabase
.from("gastos")
.insert([
{
descricao: descricao,
valor: valor
}
])

if(error){
alert("Erro ao salvar")
return
}

document.getElementById("descricao").value = ""
document.getElementById("valor").value = ""

carregar()

}



// LISTAR GASTOS
async function carregar(){

const lista = document.getElementById("lista")

if(!lista) return

const { data, error } = await supabase
.from("gastos")
.select("*")
.order("id", { ascending:false })

lista.innerHTML = ""

data.forEach(g => {

lista.innerHTML += `
<div class="card">
${g.descricao} - R$ ${g.valor}
</div>
`

})

}



// EXECUTA AUTOMÁTICO
carregar()

if ("serviceWorker" in navigator) {

navigator.serviceWorker.register("sw.js")
.then(() => console.log("PWA ativo"))

}


