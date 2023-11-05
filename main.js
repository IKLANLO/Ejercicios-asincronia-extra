const listaRazas = document.querySelector('#listaRazasBtn')
const imagenRandom = document.querySelector('#imagenRandomRazaBtn')
const listaImagenes = document.querySelector('#imagenesRazaBtn')
const paintContainer = document.querySelector('#container')
const searchUrlPart1 = 'https://dog.ceo/api/breed/'
const searchUrlPart3 = '/images/random'

async function getListaRazas() {
    let request = ''
    const razas = await axios.get('https://dog.ceo/api/breeds/list/all')
        .then((res) => {
            const { data } = res
            for (let key in data.message){
                if (data.message[`${key}`].length > 0){
                    for (let j = 0; j < data.message[`${key}`].length; j++){
                        request += `<p class="mx-3">${data.message[`${key}`][j]} ${key}</p>`
                        console.log(`${data.message[`${key}`][j]} ${key}`);
                    }
                } else {
                    request += `<p class="mx-3">${key}</p>`
                    console.log(key);
                }
            }
            paintContainer.innerHTML = request
        })
        .catch((err) => console.error(err))
}

async function getImagenRandom(){
    paintContainer.innerHTML = ''
    const razas = await axios.get('https://dog.ceo/api/breeds/list/all')
        .then((res) => {
            const { data } = res, listaRazas = []
            const random = Math.floor(Math.random() * Object.keys(data.message).length)
            for (let key in data.message){
                if (data.message[`${key}`].length > 0){
                    for (let j = 0; j < data.message[`${key}`].length; j++){
                        listaRazas.push(`${key}/${data.message[key][j]}`)
                        
                    }
                } else {
                    listaRazas.push(key)
                }
            }
            const imagen = axios.get (searchUrlPart1 + listaRazas[random] + searchUrlPart3)
            .then((res) => {
                console.log(res.data.message);
                paintContainer.innerHTML = `<img src="${res.data.message}"></img>`
            })
            .catch((error) => {
                console.error(error)
                getImagenRandom()
            })
        })     
}

async function getListaImagenes(){
    const inputTextData = document.querySelector('#inputText').value
    paintContainer.innerHTML = ''
    let imagen, request = '', searchNewBreed = ''
    
    const razas = await axios.get('https://dog.ceo/api/breeds/list/all')
        .then((res) => {
            const { data } = res, listaRazas = []
            const random = Math.floor(Math.random() * Object.keys(data.message).length)
            for (let key in data.message){
                if (data.message[`${key}`].length > 0){
                    for (let j = 0; j < data.message[`${key}`].length; j++){
                        listaRazas.push(`${key}/${data.message[key][j]}`)
                    }
                } else {
                    listaRazas.push(key)
                }
            }
            
            if (inputTextData === ''){
                searchNewBreed = searchUrlPart1 + listaRazas[random] + '/images'
            } else {
                searchNewBreed = searchUrlPart1 + inputTextData + '/images'
            }
                imagen = axios.get (searchNewBreed)
                    .then((res) => {
                        for (let i = 0; i < res.data.message.length; i++){
                            console.log(res.data.message[i]);
                            request += `<img src="${res.data.message[i]}"></img>`
                        }
                        paintContainer.innerHTML = request   
                    })
                    .catch((error) => {
                        console.error(error);
                    })    
        })        
}

listaRazas.addEventListener('click', getListaRazas)
imagenRandom.addEventListener('click', getImagenRandom)
listaImagenes.addEventListener('click', getListaImagenes)