const installments = document.querySelector('#iinstallments')
const rate = document.querySelector('#irate')
const time = document.querySelector('#itime')
const btnSimulation = document.querySelector('.btnSimulation')
const firstScreen = document.querySelector('.firstScreen')
const secondScreen = document.querySelector('.secondScreen')

btnSimulation.onclick = function btnSimulation_click(){
    const names = document.querySelector('#iname')
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
    

function startFetch(object){
    fetch('http://api.mathjs.org/v4/', object)
    .then(toObject)
    .then(buildHtml)
    .catch(error)  
}

function toObject(response){
    return response.json()
    
}

function buildHtml(data){
    console.log(data)
}

function error(){
    console.log('Ops, algo deu errado!')
}