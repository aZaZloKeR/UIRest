var isAnimationCompleted = true;

function ValidMail() 
{
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var eMail = document.forms.registForm.email;
	let labelEMail = document.getElementById('labelEMail');
    var valid = re.test(eMail.value);
    if (!valid)
	{
		labelEMail.innerHTML = 'Введите корректный eMail';
		return false;
	}
	else
	{
		labelEMail.innerHTML = '&nbsp;';
		return true;
	}
}

function ValidPhone()
{
    //var re = /^[\d\+]{1}[\d]{4,14}$/;
	var re = /^[\d\+]{1}[\d\(\)\ -]{2,14}\d$/
    var phone = document.getElementById('phone')
	let labelPhone = document.getElementById('labelPhone');
    var valid = re.test(phone.value);
    if (!valid)
	{
		labelPhone.innerHTML = 'Введите корректный номер телефона';
		return false;
	}
	else
	{
		labelPhone.innerHTML = '&nbsp;';
		return true;
	}
}  

function onLogin()
{
	if (isAnimationCompleted == true)
	{
		isAnimationCompleted == false;
		let loginBlock = document.getElementById('loginBlock');
		let registrationBlock = document.getElementById('registrationBlock');
		if (loginBlock.classList.contains('inactive'))
		{
			registrationBlock.classList.add('inactive');
			loginBlock.classList.add('active');
			registrationBlock.classList.remove('active');
			loginBlock.classList.remove('inactive');
			registrationBlock.style.display = 'none';
			setTimeout(() => {isAnimationCompleted = true;}, 500);
		}
	}
}

function onRegistration()
{
	if (isAnimationCompleted == true)
	{
		isAnimationCompleted == false;
		let loginBlock = document.getElementById('loginBlock');
		let registrationBlock = document.getElementById('registrationBlock');
		if (registrationBlock.classList.contains('inactive'))
		{
			loginBlock.classList.add('inactive');
			registrationBlock.classList.add('active');
			loginBlock.classList.remove('active');
			registrationBlock.classList.remove('inactive');
			loginBlock.style.display = 'none';
			setTimeout(() => {isAnimationCompleted = true;}, 500);
		}
	}
}

async function login()
{
	let mail = document.forms.loginForm.mail.value;
	let password = document.forms.loginForm.password.value;
	const url = '/balancer/login';

	const response = await fetch(url, {
		method: 'POST', // или 'PUT'
		body: JSON.stringify({
			login: mail,
			password: password
		}), // данные могут быть 'строкой' или {объектом}!
		headers: {'Content-Type': 'application/json'}});
	const json = await response.json();



	if (response.ok){
		console.log('Успех:', response.text());
	}
}

function comparePasswords()
{
	let password1 = document.forms.registForm.password1.value;
	let password2 = document.forms.registForm.password2.value;
	let labelPassword2 = document.getElementById('labelPassword2');
	if (password1 != password2)
	{
		labelPassword2.innerHTML = 'Пароли не совпадают';
		return false;
	}
	else
	{
		labelPassword2.innerHTML = '&nbsp;';
		return true;
	}
}

async function registration()
{
	let firstName=document.forms.registForm.firstName.value;
	let lastName=document.forms.registForm.lastName.value;
	let thirdName=document.forms.registForm.thirdName.value;
	let birthday=document.forms.registForm.birthDate.value;
	let password1 = document.forms.registForm.password1.value;
	let password2 = document.forms.registForm.password2.value;
	let phoneNumber=document.forms.registForm.phone.value;
	let address=document.forms.registForm.address.value;
	let mail=document.forms.registForm.email.value;
	
	if (comparePasswords() == false)
	{
		return;
	}
	
	const url ='/balancer/registration';
	try {
		const response = await fetch(url, {
			method: 'POST', // или 'PUT'
			body: JSON.stringify([firstName,lastName,thirdName,birthday,phoneNumber,address,mail,password1]), // данные могут быть 'строкой' или {объектом}!
			//пока в JSON складывается адрес одной строкой, однако для API нужно разделить его на квартиру, дом и бла бла
			headers: {'Content-Type': 'application/json'}});
		const json = await response.json();
		console.log('Успех:', JSON.stringify(json));
	} catch (error) {
		console.error('Ошибка:', error);
	}
}
