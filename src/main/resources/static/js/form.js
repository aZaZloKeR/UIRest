var isAnimationCompleted = true;

function AddBorderToLoginForm()
{
	var loginBlock = document.getElementById('loginFormDiv');
	var registrationBlock = document.getElementById('regFormDiv');
	registrationBlock.classList.remove('borderBottom');
	loginBlock.classList.add('borderBottom');
}

function AddBorderToRegistrationForm()
{
	var loginBlock = document.getElementById('loginFormDiv');
	var registrationBlock = document.getElementById('regFormDiv');
	loginBlock.classList.remove('borderBottom');
	registrationBlock.classList.add('borderBottom');
}

function ValidMail() 
{
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var eMail = document.forms.registForm.email.value;
	var labelEMail = document.getElementById('labelEMail');
    var valid = re.test(eMail);
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
	var re = /^[\d\+]{1}[\d\(\)\ -]{2,14}\d$/;
    var phone = document.forms.registForm.phone.value;
	var labelPhone = document.getElementById('labelPhone');
    var valid = re.test(phone);
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

function OnLogin()
{
	if (isAnimationCompleted == true)
	{
		AddBorderToLoginForm();
		isAnimationCompleted == false;
		var loginBlock = document.getElementById('loginBlock');
		var registrationBlock = document.getElementById('registrationBlock');
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

function OnRegistration()
{
	if (isAnimationCompleted == true)
	{
		AddBorderToRegistrationForm()
		isAnimationCompleted == false;
		var loginBlock = document.getElementById('loginBlock');
		var registrationBlock = document.getElementById('registrationBlock');
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

async function Login()
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

function ComparePasswords()
{
	var password1 = document.forms.registForm.password1.value;
	var password2 = document.forms.registForm.password2.value;
	var labelPassword2 = document.getElementById('labelPassword2');
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

function ValidPassword()
{
	var password1 = document.forms.registForm.password1.value;
	var labelPassword1 = document.getElementById('labelPassword1');
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	var valid = re.test(password1);
    if (!valid)
	{
		labelPassword1.innerHTML = 'Пароль может включать в себя только латинские буквы и цифры. Так же должен содержать минимум 1 цифру, 1 строчную и 1 заглавную буквы.';
		return false;
	}
	else
	{
		labelPassword1.innerHTML = '&nbsp;';
		return true;
	}
}

async function Registration()
{
	var firstName=document.forms.registForm.firstName.value;
	var lastName=document.forms.registForm.lastName.value;
	var thirdName=document.forms.registForm.thirdName.value;
	var birthday=document.forms.registForm.birthDate.value;
	var password1 = document.forms.registForm.password1.value;
	var password2 = document.forms.registForm.password2.value;
	var phoneNumber=document.forms.registForm.phone.value;
	var address=document.forms.registForm.address.value;
	var mail=document.forms.registForm.email.value;
	
	if (!ComparePasswords() || !ValidPassword() || !ValidMail() || !ValidPhone())
	{
		alert('Добавить какое-то сообщение');
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
