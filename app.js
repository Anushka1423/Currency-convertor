const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const swapBtn = document.querySelector(".dropdown i");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(" .msg");

for(let select of dropdowns){
    for(let currency_code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currency_code;
        newOption.value = currency_code;
        if(select.name === "from" && currency_code==="USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currency_code==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })

}

swapBtn.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
});

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) =>{
    let currency_code = element.value;
    let country_code = countryList[currency_code];
    let newSrc = `https://flagsapi.com/${country_code}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", ()=>{
    updateExchangeRate();
})