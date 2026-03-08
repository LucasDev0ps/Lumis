async function login(){

let email = document.getElementById("email").value
let senha = document.getElementById("senha").value

let res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{
method:"POST",
headers:{
"Content-Type":"application/json",
"apikey":SUPABASE_KEY,
"Authorization":`Bearer ${SUPABASE_KEY}`
},
body:JSON.stringify({
email:email,
password:senha
})
})

let data = await res.json()

console.log(data)

if(data.access_token){

localStorage.setItem("lumis_auth",data.access_token)

window.location = "index.html"

}else{

alert("Erro: "+data.error_description)

}

}