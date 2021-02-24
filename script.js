let carrinho = []
let pizzaQnt = 1
let pizzaKey = 0

const qs = (obj)=>document.querySelector(obj)                                 // Diminuir o código abreviando o QuerySelector pra uma let
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
        pizzaKey = key
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

qs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{                     // Evento de clique ao botao de menos
    if (pizzaQnt > 1) {                                                       // Verificador pra nao descer abaixo de um
        pizzaQnt--
        qs('.pizzaInfo--qt').innerHTML = pizzaQnt
    }
})

qs('.pizzaInfo--qtmais').addEventListener('click', ()=>{                      // Evento de clique ao botao de mais
    pizzaQnt++
    qs('.pizzaInfo--qt').innerHTML = pizzaQnt
})

qsa('.pizzaInfo--size').forEach((size) => {                                   // Função aplicada com forEach por causa dos 3 sizes
    size.addEventListener('click', ()=>{                                      // Evento de clique nos tamanhos
        qs('.pizzaInfo--size.selected').classList.remove('selected')          // Remoção do selected anterior
        size.classList.add('selected')                                        // Adição do selected no atual
    })
})

qs('.pizzaInfo--addButton').addEventListener('click', ()=>{                   // Função de adição da pizza ao carrinho

    let pizzaSize = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'))     // Pegando o atributo data-key do size selecionado e botando em número

    let identifier = `${pizzaJson[pizzaKey].id}@${pizzaSize}`                              // Cria um identificador para não se repetir pizzas iguais
    let identifierKey = carrinho.findIndex((item)=> item.identifier == identifier)         // Cria a chave do identificador que verifica se ele ja existe no carrinho

    if(identifierKey != -1) {                                                 // Caso a chave de ident seja igual a uma ja existente, apenas a quantidade é somada
        carrinho[identifierKey].qnt += pizzaQnt
    } else {
        carrinho.push({                                                       // Caso contrário, a pizza é adicionada normalmente ao carrinho
            identifier: identifier,
            id: pizzaJson[pizzaKey].id,
            size: pizzaSize,
            qnt: pizzaQnt
        })
    }
    carrinhoUpdate()                                                          // Atualiza o carrinho a cada pizza adicionada
    closeMenuQT()                                                             
})

function carrinhoUpdate(){                                                    // Função que ira atualizar o carrinho a cada pizza adicionada
    if(carrinho.length > 0) {

        qs('aside').classList.add('show')                                     // Css element para mostrar o aside
        qs('.cart').innerHTML = ''

        let subtotal = 0
        let total = 0
        let desconto = 0

        for(let i in carrinho) {


            let pizzaItem = pizzaJson.find((item)=> item.id == carrinho[i].id)
            let cartItem = qs('.models .cart--item').cloneNode(true)
            const cI = (obj)=>cartItem.querySelector(obj)                     // Diminui o código de qs do cartItem

            let pizzaNameSize
            switch (carrinho[i].size) {                                       // Define o tamanho que ira aparecer no cartName
                case 0:
                    pizzaNameSize = 'P'
                    break
            
                case 1:
                    pizzaNameSize = 'M'
                    break

                case 2:
                    pizzaNameSize = 'G'
                    break
            }

            let pizzaName = `${pizzaItem.name} (${pizzaNameSize})`
            
            cI('img').setAttribute('src', pizzaItem.img)                      // Adiciona as informações de cada pizza no carrinho
            cI('.cart--item-nome').innerHTML = pizzaName
            cI('.cart--item--qt').innerHTML = carrinho[i].qnt
            cI('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(carrinho[i].qnt > 1) {
                    carrinho[i].qnt-- 
                } else {
                    carrinho.splice(i, 1)
                }
                carrinhoUpdate()
            })
            cI('.cart--item-qtmais').addEventListener('click', ()=>{
                carrinho[i].qnt++
                carrinhoUpdate()
            })


            qs('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        

    } else {
        qs('aside').classList.remove('show')
    }
}