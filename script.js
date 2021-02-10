const qs = (obj)=>document.querySelector(obj)
const qsa = (obj)=>document.querySelectorAll(obj)

pizzaJson.map((pizza, numero)=>{
    let pizzaItem = qs('.models .pizza-item').cloneNode(true)
    const pI = (obj)=>pizzaItem.querySelector(obj)
    
    pizzaItem.setAttribute('data-key', numero)

    pI('.pizza-item--img img').setAttribute('src', pizza.img)
    pI('.pizza-item--name').innerHTML = `${pizza.name}`
    pI('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`
    pI('.pizza-item--desc').innerHTML = `${pizza.description}`
    pI('a').addEventListener('click', (e)=>{ 

        e.preventDefault() 
        let key = e.target.closest(".pizza-item").getAttribute('data-key')
        
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        qs('.pizzaBig img').setAttribute('src', pizzaJson[key].img)
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`



        qs('.pizzaWindowArea').style.opacity = 0
        qs('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=> qs('.pizzaWindowArea').style.opacity = 1, 200);


    })
    

    qs('.pizza-area').append (pizzaItem)
})