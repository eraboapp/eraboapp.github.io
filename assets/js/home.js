const AWS_API               = 'https://s3tw89tyl5.execute-api.us-east-2.amazonaws.com/Beta';
let newsletterBanner        = document.querySelector('.banner.form');
let newsletterSubmitInput   = document.querySelector('#erabo-cloud-form input');
let newsletterSubmitButton  = document.querySelector('#erabo-cloud-form button');
let submitErrorMessage      =  document.querySelector('.banner__error');


if(newsletterSubmitButton) {
    newsletterSubmitButton.addEventListener('click', handleNewsletterSubmission)
    newsletterSubmitInput.addEventListener('focus', clearMessage)
}

function clearMessage(event)
{
    newsletterBanner.classList.remove('--error');
    newsletterBanner.classList.remove('--submited');
}

function handleNewsletterSubmission(event)
{
    event.preventDefault();

    newsletterBanner.classList.remove('--error');
    let email = newsletterSubmitInput.value;

    // if empty
    if(!email) {
        newsletterBanner.classList.add('--error')
        submitErrorMessage.textContent = '✖ We need something to send!'
        return;
    }

    // if invalid
    if(!validateEmail(email)) {
        newsletterBanner.classList.add('--error')
        submitErrorMessage.textContent = '✖ Email not valid. Try again.'
        return;
    }

    fetch(`${AWS_API}/api/newsletter`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {

        let { statusCode, message, error } = data;

        if(error) {
            newsletterBanner.classList.add('--error')
            console.error(error, message);
            return;
        } 

        if(statusCode === 'OK') {
            newsletterBanner.classList.add('--submited')
        }
        else if(statusCode === 'ALREADY_EXISTS') {
            submitErrorMessage.textContent = `✖ ${message}`;
            newsletterBanner.classList.add('--error')
        } 
        else {
            newsletterBanner.classList.add('--error')
            console.error(message)
        }
    })
    .catch( error => {
        newsletterBanner.classList.add('--error')
        console.error(error)
    })
}


function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}