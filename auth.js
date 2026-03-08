async function login(){

if(!window.PublicKeyCredential){

alert("Biometria não suportada")

return

}

try{

await navigator.credentials.get({

publicKey:{

challenge:new Uint8Array([1,2,3,4]),

timeout:60000,

userVerification:"required"

}

})

localStorage.setItem("lumis_auth","true")

window.location="index.html"

}

catch(e){

alert("Falha no Face ID")

}

}