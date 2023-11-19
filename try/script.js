const input = document.querySelector('#phone-input');
let phone='';

input.addEventListener('keyup',function(){
    phone = input.value.replace(/\D/g,'');

    var num = ( '+' + phone.substring(0,3) + ' ' + phone.substring(3,5) + ' ' + phone.substring(5,8) + '-' + phone.substring(8,10) + '-' +
    phone.substring(10,12)  ); 
    
    input.value = num;
});

input.addEventListener('keydown',function(event){
    
    phone = input.value.replace(/\D/g,''); 

    backspace = 8;
    if (event.keyCode == backspace) {
        
        phone = phone.substring(0,phone.length-1);
        console.log(phone + ' '+ phone.length);
    }

    var num = ( '+' + phone.substring(0,3) + ' ' + phone.substring(3,5) + ' ' + phone.substring(5,8) + '-' + phone.substring(8,10) + '-' +
    phone.substring(10,12)+' ' ); 
    
    input.value = num;
});