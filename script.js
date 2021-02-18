let pizzaQnt = 1

const qs = (obj)=>document.querySelector(obj)                                 // Diminuir o código abreviando o QuerySelector pra uma var
const qsa = (obj)=>document.querySelectorAll(obj)

// Informações do Menu de Tamanhos e Quantidades

pizzaJson.map((pizza, numero)=>{                                              // Usar o map pra fazer a mesma coisa com todos os modelos de pizza
    let pizzaItem = qs('.models .pizza-item').cloneNode(true)                 // CloneNode(true) pra criar um pizza-item pra cada modelo no pizzaJson
    const pI = (obj)=>pizzaItem.querySelector(obj)                            // Diminuir o código de Query do pizzaItem
    
    pizzaItem.setAttribute('data-key', numero)                                // Adiciona um valor chave pra cada modelo de pizza baseado no index dado pelo map

    pI('.pizza-item--img img').setAttribute('src', pizza.img)                 // Coloca as infos dadas no pizzaJson
    pI('.pizza-item--name').innerHTML = `${pizza.name}`
    pI('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`
    pI('.pizza-item--desc').innerHTML = `${pizza.description}`
    pI('a').addEventListener('click', (e)=>{                                  // Cria um evento de clique vinculado a imagem da pizza

        e.preventDefault()                                                    // Previne que o evento base seja redirecionamento de página
        let key = e.target.closest(".pizza-item").getAttribute('data-key')    // Adiciona à variavel key, a chave da pizza clicada
        pizzaQnt = 1

        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name                   // Coloca as informações da pizza selecionada (com base na chave) ao menu de tamanhos 
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        qs('.pizzaBig img').setAttribute('src', pizzaJson[key].img)
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
        qs('.pizzaInfo--size.selected').classList.remove('selected')
        qsa('.pizzaInfo--size').forEach((size, sizeIndex)=>{                               // Seleciona todas as classes de tamanho e aplica um forEach
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }
            
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]         // Junto do ForEach, usa o sizeIndex para selecionar os tamanhos adequados 
        })

        qs('.pizzaInfo--qt').innerHTML = pizzaQnt

        qs('.pizzaWindowArea').style.opacity = 0                              // Gera uma animação no menu de tamanhos deixando a opacidade no zero
        qs('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=> qs('.pizzaWindowArea').style.opacity = 1, 100);       // Leva a opacidade de 0 a 1 em 100 milisegundos, criando a animação

    })

    qs('.pizza-area').append (pizzaItem)                                      // Adiciona todos os modelos criados, com suas informações, na class .pizza-area
})

// Eventos do Menu de Tamanhos e Quantidades

function closeMenuQT() {                                                      // Função para fechar o menu
    qs('.pizzaWindowArea').style.opacity = 0                                  // Animação de fechamento
    setTimeout(() => {qs('.pizzaWindowArea').style.display = 'none'}, 100);   // Fecha o menu
}

qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{          // Para cada botao de cancelar
    item.addEventListener('click', closeMenuQT)                                            // Se adiciona o evento de clique, onde executa a função closeMenuQT
})

qs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (pizzaQnt > 1) {
        pizzaQnt--
        qs('.pizzaInfo--qt').innerHTML = pizzaQnt
    }
})

qs('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    pizzaQnt++
    qs('.pizzaInfo--qt').innerHTML = pizzaQnt
})

qsa('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', (e)=>{
        qs('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})