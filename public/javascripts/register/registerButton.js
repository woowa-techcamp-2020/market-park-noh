import {
    checkId,
    checkEmail,
    checkEmailDomain,
    checkPhoneNumEmpty,
    checkPassword,
    comparePassword,
    checkName,
} from './essentialInfo/formCheck.js';

const registerButton = document.querySelector('.register-button');
registerButton.addEventListener('click', submitRegister)

function submitRegister(e){
    e.preventDefault();
    
    if(!checkId()) return;
    if(!comparePassword()) return;
    if(!checkEmail()) return;
    if(!checkEmailDomain()) return;
    if(!checkPhoneNumEmpty()) return;
    if(!checkName()) return;
    if(!checkAgreement()) return;
    if(!checkVerification()) return;

    console.log('왜 안될까');
    const formData = makeFormData();
    postData(formData)
    .then(data => {
        console.log(data);
        // console.log('전송 성공');
    })
}

function postData(formData){
    const url = 'http://localhost:8000/register';
    return fetch(url, {
        method : 'POST',
        body : new URLSearchParams(formData),
    })
}

function makeFormData(){
    
    const registerForm = document.getElementById('register-form');
    const formData = new FormData(registerForm);

    const emailFirst = document.getElementById('email-first').value;
    const emailSecond = document.getElementById('email-second').value;
    const email = emailFirst + '@' + emailSecond;

    const addressFirst = document.getElementById('address').value;
    const addressDetail = document.getElementById('address-detail').value;
    const address = addressFirst + ' ' + addressDetail;
     
    const essentialAgreement = document.getElementById('essential-agreement').checked;

    formData.append('email', email);
    formData.append('essentialAgreement', essentialAgreement);
    formData.append('address', address);

    return formData;
}

function checkAgreement(){
    const checkmarkEssential = document.querySelector('#essential-label')
    if(!document.getElementById('essential-agreement').checked){
        checkmarkEssential.style.outline = "0.5px solid red";
        checkmarkEssential.focus();
    }else{
        checkmarkEssential.style.outline = 'none';
        return true;
    }
}

function checkVerification(){
    const certification = document.getElementById('certification');
    if(certification.textContent !== '인증 완료'){
        certification.style.borderColor = 'red';
        return certification.focus();
    }
    return true;
}

