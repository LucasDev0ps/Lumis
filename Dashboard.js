let categorias = {}

data.forEach(t=>{

let cat = t.category || "Outros"

if(!categorias[cat]){

categorias[cat] = 0

}

categorias[cat] += parseFloat(t.amount)

})

let labels = Object.keys(categorias)
let valores = Object.values(categorias)