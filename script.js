const scriptURL = 'https://script.google.com/macros/s/AKfycbwD3Pj5erSOdl9cjFR9BCkUIKQL10iuPfhWYKSHPSRatRyHs6SryNnO3vStJ_3puZ9Q/exec';
const form = document.getElementById('submit-to-google-sheet');
const submitButton = document.getElementById('submitButton');
const loader = document.getElementById("fon");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));
    sendtelegram(e);
});

let telegram_bot_id = "7370398929:AAFaj5AgaCeuFxyfvTJct5Uwmr_Qv0R2-g0";
let chat_id = 6526885714;

let u_name, phone, price;
let message;

function ready() {
    u_name = document.getElementById("name").value.trim();
    phone = document.getElementById("phone").value.trim();
    price = document.getElementById("price").value.trim();
    
    message = "\nIsm: " + u_name + "\nTelefon raqam: " + phone + "\nInvestitsiya: " + price;
}

function sendtelegram(event) {
    event.preventDefault();
    ready();

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };

    loader.style.display = "flex";

    $.ajax(settings).done(function(response) {
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    });

    form.reset();
    submitButton.setAttribute("disabled", "disabled");

    return false;
}

function checkForm() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let price = document.getElementById("price").value.trim();

    let nameRegex = /^[a-zA-Z]+$/;

    if (name.length >= 3 && name.length <= 20 && name.match(nameRegex) &&
        phone !== "" && phone.length >= 9 && phone.length <= 13 &&
        price !== "") {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
}

document.getElementById("name").addEventListener("input", checkForm);
document.getElementById("phone").addEventListener("input", checkForm);
document.getElementById("price").addEventListener("input", checkForm);
