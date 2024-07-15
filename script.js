const scriptURL = 'https://script.google.com/macros/s/AKfycbwD3Pj5erSOdl9cjFR9BCkUIKQL10iuPfhWYKSHPSRatRyHs6SryNnO3vStJ_3puZ9Q/exec';
const form = document.getElementById('submit-to-google-sheet');

form.addEventListener('submit', e => {
    e.preventDefault();
    const fon = document.getElementById("fon");
    fon.style.display = "flex"; // Show the loader

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            console.log('Success!', response);
            sendTelegram(); // Call your function to send to Telegram after Google Sheet submission
        })
        .catch(error => {
            console.error('Error!', error.message);
            fon.style.display = "none"; // Hide the loader on error
        });
});

//bot token
let telegram_bot_id = "7370398929:AAFaj5AgaCeuFxyfvTJct5Uwmr_Qv0R2-g0"; // token'ni o'rniga Siz yaratgan Bot tokenini yozing
//chat id
let chat_id = 6728847941; // 1111'ni o'rniga habar borishi kerak bo'lgan joyni ID'sini yozing (Batafsil videoda)
let u_name, phone, price;
let ready = function() {
    u_name = document.getElementById("name").value.trim();
    phone = document.getElementById("phone").value.trim();
    price = document.getElementById("price").value.trim();
    
    message = "\nIsm: " + u_name + "\nTelefon raqam: " + phone + "\nInvestitsiya: " + price;
};
function sendTelegram() {   
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
    $.ajax(settings).done(function(response) {
        window.location.href = 'index.html'; // Redirect to index.html
    }).fail(function(error) {
        console.error('Telegram Error!', error.message);
        document.getElementById("submitButton").removeAttribute("disabled");
    }).always(function() {
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("price").value = "";
        fon.style.display = "none"; // Hide the loader
    });
    return false;
};

// Function to check form validity
function checkForm() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let price = document.getElementById("price").value.trim();

    let nameRegex = /^[a-zA-Z]+$/;

    if (name.length >= 3 && name.length <= 20 && name.match(nameRegex) &&
        phone !== "" && phone.length >= 9 && phone.length <= 13 &&
        price !== "") {
        document.getElementById("submitButton").removeAttribute("disabled");
    } else {
        document.getElementById("submitButton").setAttribute("disabled", "disabled");
    }
}

// Event listeners for form inputs
document.getElementById("name").addEventListener("input", checkForm);
document.getElementById("phone").addEventListener("input", checkForm);
document.getElementById("price").addEventListener("input", checkForm);

document.addEventListener("DOMContentLoaded", function () {
    const fon = document.getElementById("fon");
    const submitButton = document.getElementById("submitButton");

    form.addEventListener("input", function () {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const price = document.getElementById("price").value;

        if (name && phone && price) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Show the loader
        fon.style.display = "flex";

        // Simulate a delay of 3 seconds before processing the form
        setTimeout(function () {
            // Hide the loader
            fon.style.display = "none";

            // Redirect to index.html
            window.location.href = "index.html";
        }, 2000);
    });
});
