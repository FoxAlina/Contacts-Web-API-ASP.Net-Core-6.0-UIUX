const saveButton = document.querySelector('#btnSave');

const updateButton = document.querySelector('#btnUpdate');
const deleteButton = document.querySelector('#btnDelete');
const popup = document.querySelector('#popup');
const closePopupBtn = document.querySelector('#btnClosePopUp');

const contactsContainer = document.querySelector('#contacts__container');

const addnameInput = document.querySelector('#addname');
const addphoneInput = document.querySelector('#addphone');
const addjobTitleInput = document.querySelector('#addjobtitle');
const addbirthDateInput = document.querySelector('#addbirthdate');


const updatenameInput = document.querySelector('#updatename');
const updatephoneInput = document.querySelector('#updatephone');
const updatejobTitleInput = document.querySelector('#updatejobtitle');
const updatebirthDateInput = document.querySelector('#updatebirthdate');



getAllContacts();

function populateForm(id){
    getContactById(id);
}

function showContactInForm(contact){

    popup.classList.remove('hidden');

    updatenameInput.value = contact.name;
    updatephoneInput.value = contact.phone;
    updatejobTitleInput.value = contact.jobTitle;

    let birthDateString = contact.birthDate;
    const subStrings = birthDateString.split("T");
    let birthDate = subStrings[0];

    updatebirthDateInput.value = birthDate;

    deleteButton.setAttribute('data-id', contact.id);
    updateButton.setAttribute('data-id', contact.id);
}

function addContact(name, phone, jobTitle, birthDate) {

    const body = {
        name: name,
        phone: phone,
        jobTitle: jobTitle,
        birthDate: birthDate
    };

    fetch('https://localhost:44387/api/Contacts', {
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            "content-type": "application/json"
        }
    })
    .then(data=>data.json())
    .then(response => {
        clearForm();
        getAllContacts();
    });

}

function clearForm(){
    addnameInput.value = '';
    addphoneInput.value = '';
    addjobTitleInput.value = '';
    addbirthDateInput.value = '';

    updatenameInput.value = '';
    updatephoneInput.value = '';
    updatejobTitleInput.value = '';
    updatebirthDateInput.value = '';

    popup.classList.add('hidden');
}

function showContacts(contacts){

    let allContacts = '';

    contacts.forEach(contact => {

        let birthDateString = contact.birthDate;
        const subStrings = birthDateString.split("T");
        let birthDate = subStrings[0];

        const contactElement =
        `<div class="contact" data-id="${contact.id}">
            <table>
                <tr>
                    <td class="name">${contact.name}</td>
                    <td class="phone">${contact.phone}</td>
                </tr>
                <tr>
                    <td>${contact.jobTitle}</td>
                    <td>${birthDate}</td>
                </tr>
            </table>
        </div>`
        ;
        allContacts += contactElement;
    });

    contactsContainer.innerHTML = allContacts;

    // add event listener for updating and deleting contacts
    document.querySelectorAll('.contact').forEach(contact=>{
        contact.addEventListener('click', function(){
            populateForm(contact.dataset.id);
        });
    });
}

function getAllContacts(){
    fetch('https://localhost:44387/api/Contacts')
    .then(data=>data.json())
    .then(response => showContacts(response));
}

function getContactById(id){
    fetch(`https://localhost:44387/api/Contacts/${id}`)
    .then(data=>data.json())
    .then(response => showContactInForm(response));
}

function deleteContact(id){
    fetch(`https://localhost:44387/api/Contacts/${id}`, {
        method:'DELETE',
        headers:{
            "content-type": "application/json"
        }
    })
    .then(response => {
        clearForm();
        getAllContacts();
    }); 
}

function updateContact(id, name, phone, jobTitle, birthDate){
   
    const body = {
        name: name,
        phone: phone,
        jobTitle: jobTitle,
        birthDate: birthDate
    };

    fetch(`https://localhost:44387/api/Contacts/${id}`, {
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            "content-type": "application/json"
        }
    })
    .then(data=>data.json())
    .then(response => {
        clearForm();
        getAllContacts();
    });

}

saveButton.addEventListener('click', function(){
    addContact(addnameInput.value, addphoneInput.value, addjobTitleInput.value, addbirthDateInput.value);
});

updateButton.addEventListener('click', function(){
    const id = updateButton.dataset.id;
    if(id){
        updateContact(id,updatenameInput.value, updatephoneInput.value, updatejobTitleInput.value, updatebirthDateInput.value);
    }
})

deleteButton.addEventListener('click', function(){
    const id = deleteButton.dataset.id;
    deleteContact(id);
});

closePopupBtn.addEventListener('click', function(){
    clearForm();
    popup.classList.add('hidden');
});


addphoneInput.addEventListener('keyup', function(){
    phoneMask(addphoneInput);
});

addphoneInput.addEventListener('keydown',function(event){
    erasePhoneDigit(event, addphoneInput);
});

updatephoneInput.addEventListener('keyup', function(){
    phoneMask(updatephoneInput);
});

updatephoneInput.addEventListener('keydown',function(event){
    erasePhoneDigit(event, updatephoneInput);
});

function phoneMask(input){
    let phone = input.value.replace(/\D/g,'');

    var num = ( '+' + phone.substring(0,3) + ' ' + phone.substring(3,5) + ' ' + phone.substring(5,8) + '-' + phone.substring(8,10) + '-' +
    phone.substring(10,12)  ); 
    
    input.value = num;
}

function erasePhoneDigit(event, input){
    let phone = input.value.replace(/\D/g,''); 

    backspace = 8;
    if (event.keyCode == backspace) {
        
        phone = phone.substring(0,phone.length-1);
        console.log(phone + ' '+ phone.length);
    }

    var num = ( '+' + phone.substring(0,3) + ' ' + phone.substring(3,5) + ' ' + phone.substring(5,8) + '-' + phone.substring(8,10) + '-' +
    phone.substring(10,12)+' ' ); 
    
    input.value = num;
}