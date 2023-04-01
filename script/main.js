const name = document.querySelector('#iname')
const installments = document.querySelector('#iinstallments')
const rate = document.querySelector('#irate')
const time = document.querySelector('#itime')
const btnSimulation = document.querySelector('.btnSimulation')
const btnSimulationAgain = document.querySelector('.btnSimulationAgain')
const resultAPI = document.querySelector('.resultAPI')
const firstScreen = document.querySelector('.firstScreen')
const secondScreen = document.querySelector('.secondScreen')
const loadingScreen = document.querySelector('.loadingScreen')

btnSimulation.onclick = function btnSimulation_click(){
    const nInstallments = parseFloat(installments.value)
    const nRate = parseFloat(rate.value)
    const nTime = parseFloat(time.value)
    const nRatePerc = nRate/100
    const nTimeToMonths = nTime * 12
    
    const configs = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            expr: `${nInstallments} * (((1 + ${nRatePerc}) ^ ${nTimeToMonths} - 1) / ${nRatePerc})`,
            precision: 5
        })
    }

    startFetch(configs)
}

btnSimulationAgain.onclick = function click(){
    console.log('ok')
}

function startFetch(object){
    fetch('https://api.mathjs.org/v4/', object)
    .then(toObject)
    .then(buildHtml)
    .catch(error)  
}

function toObject(response){
    return response.json()
    
}

function buildHtml(data){
    resultAPI.innerHTML = `
        Olá ${name.value}, Juntando <span>R$${installments.value}</span> todo mês, você terá <span>R$${data.result.replace('.', ',')}</span> em <span>${time.value} ano(s)</span>.
    `

    setTimeout(() => {
        secondScreen.classList.remove('notVisible')
        secondScreen.classList.add('visible')
        loadingScreen.classList.remove('visible')
    loadingScreen.classList.add('notVisible')
    }, 5000)
    firstScreen.classList.remove('visible')
    firstScreen.classList.add('notVisible')
    loadingScreen.classList.add('visible')
    loadingScreen.classList.remove('notVisible')
}

function error(){
    console.log('Ops, algo deu errado!')
}


function click(){
    console.log('ok')
}

btnSimulationAgain.onclick = function btnSimulationAgain_click(){
    name.value = ''
    installments.value = ''
    rate.value = ''

    firstScreen.classList.remove('notVisible')
    secondScreen.classList.remove('visible')
    firstScreen.classList.add('visible')
    secondScreen.classList.add('notVisible')    
}