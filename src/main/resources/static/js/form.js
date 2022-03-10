function onLogin()
{
	document.getElementById('loginBlock').style.display='block';
	document.getElementById('registrationBlock').style.display='none';
}

function onRegistration()
{
	document.getElementById('registrationBlock').style.display='block';
	document.getElementById('loginBlock').style.display='none';
}

async function login()
{
	var mail = document.forms.loginForm.mail.value;
	var password = document.forms.loginForm.password.value;
	const url = '/balancer/login';

	try {
		const response = await fetch(url, {
			method: 'POST', // или 'PUT'
			body: JSON.stringify([mail,password]), // данные могут быть 'строкой' или {объектом}!
			headers: {'Content-Type': 'application/json'}});
		const json = await response.json();
		console.log('Успех:', JSON.stringify(json));
	} catch (error) {
		 console.error('Ошибка:', error);
	}	
}

async function registration()
{
	var firstName=document.forms.registForm.firstName.value;
	var lastName=document.forms.registForm.lastName.value;
	var thirdName=document.forms.registForm.thirdName.value;
	var birthday=document.forms.registForm.birthDate.value;
	var password=document.forms.registForm.password.value;
	var phoneNumber=document.forms.registForm.phone.value;
	var address=document.forms.registForm.address.value;
	var mail=document.forms.registForm.email.value;
	const url ='/balancer/registration';
	try {
		const response = await fetch(url, {
			method: 'POST', // или 'PUT'
			body: JSON.stringify([firstName,lastName,thirdName,birthday,phoneNumber,address,mail,password]), // данные могут быть 'строкой' или {объектом}!
			//пока в JSON складывается адрес одной строкой, однако для API нужно разделить его на квартиру, дом и бла бла
			headers: {'Content-Type': 'application/json'}});
		const json = await response.json();
		console.log('Успех:', JSON.stringify(json));
	} catch (error) {
		console.error('Ошибка:', error);
	}
}
/*var mail=document.forms.loginForm.emailL.value;
var password=document.forms.loginForm.passwordL.value;

var birthDateR=document.forms.registForm.emailL.value;
var passwordR=document.forms.registForm.passwordR.value;
var phoneR=document.forms.registForm.phoneR.value;
var addressR=document.forms.registForm.addressR.value;
var emailR=document.forms.registForm.emailR.value;*/