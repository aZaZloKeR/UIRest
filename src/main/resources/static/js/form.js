var isAnimationCompleted = true;

function changeClass(elem1, elem2, enterClass, flag){
	if(flag){
		elem2.classList.remove(enterClass);
		elem1.classList.add(enterClass);
		flag = false;
	}
	else{
		elem1.classList.remove(enterClass);
		elem2.classList.add(enterClass);
		flag = true;
	}
}
function AddBorderToLoginForm(){
	let loginBlock = document.getElementById('loginFormDiv');
	let registrationBlock = document.getElementById('regFormDiv');
	let logLink = document.getElementById('logFormLink');
	let regLink = document.getElementById('regFormLink');
	changeClass(loginBlock, registrationBlock, 'borderBottom', true);
	changeClass(logLink, regLink, 'choose', true);
}

function AddBorderToRegistrationForm(){
	var loginBlock = document.getElementById('loginFormDiv');
	var registrationBlock = document.getElementById('regFormDiv');
	let logLink = document.getElementById('logFormLink');
	let regLink = document.getElementById('regFormLink');
	changeClass(loginBlock, registrationBlock, 'borderBottom', false);
	changeClass(logLink, regLink, 'choose', false);
}

function ValidMail(){
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

function ValidPhone(){
	//var re = /^[\d\+]{1}[\d]{4,14}$/;
	var re = /^[\d\+]{1}[\d\(\)\ -]{2,14}\d$/
	let phone = document.getElementById('phoneNumber')
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

function ValidBirthDate()
{
	var birthDate = document.forms.registForm.birthDate.value;
	var labelBirthDate = document.getElementById('labelBirthDate');
	var re = /^((0[1-9]|[12]\d)\.(0[1-9]|1[012])|(30\.0[13-9]|1[012]|31\.(0[13578]|1[02])))\.(19|20)\d\d$/;
	var valid = re.test(birthDate);
	if (!valid)
	{
		labelBirthDate.innerHTML = 'Пароль может включать в себя только латинские буквы и цифры. Так же должен содержать минимум 1 цифру, 1 строчную и 1 заглавную буквы.';
		return false;
	}
	else
	{
		labelBirthDate.innerHTML = '&nbsp;';
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
		labelPassword1.innerHTML = 'Введите корректную дату рождения';
		return false;
	}
	else
	{
		labelPassword1.innerHTML = '&nbsp;';
		return true;
	}
}


function onLogin(){
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

function onRegistration(){
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

async function login(){
	let mail = document.getElementById("mail");
	let password =  document.getElementById("password");

	addWarningClass(mail);
	addWarningClass(password);

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

async function registration(){
	let firstName =document.getElementById("firstName");
	let lastName = document.getElementById("lastName");
	let thirdName = document.getElementById("thirdName");
	let birthDate = document.getElementById("birthDate");
	let password1 = document.getElementById("password1");
	let password2 = document.getElementById("password2");
	let phoneNumber = document.getElementById("phoneNumber");
	let address = document.getElementById("address");
	let email = document.getElementById("email");
	var regInputArr = [
		lastName,
		firstName,
		thirdName,
		birthDate,
		password1,
		password2,
		phoneNumber,
		address,
		email
	];
	for (let i = 0; i < regInputArr.length; i++){
		addWarningClass(regInputArr[i]);
	}

	if (comparePasswords() == false)
	{
		return;
	}

	const url ='/balancer/registration';
	try {
		const response = await fetch(url, {
			method: 'POST', // или 'PUT'
			body: JSON.stringify([firstName,lastName,thirdName,birthDate,phoneNumber,address,email,password1]), // данные могут быть 'строкой' или {объектом}!
			//пока в JSON складывается адрес одной строкой, однако для API нужно разделить его на квартиру, дом и бла бла
			headers: {'Content-Type': 'application/json'}});
		const json = await response.json();
		console.log('Успех:', JSON.stringify(json));
	} catch (error) {
		console.error('Ошибка:', error);
	}
}

function addWarningClass(testInput){
	if(testInput.value === null || testInput.value === ""){
		testInput.classList.add('redWarning');
	}
	else{ testInput.classList.remove('redWarning');}
}


// function input(){
//     var firstName = document.forms.registForm.firstName.value;
//     var lastName = document.forms.registForm.lastName.value;
//     location.href = "./successfulRegistration.htm?" + firstName + " " + lastName;
//     // document.getElementById('name1').innerHTML = firstName;
//     // document.getElementById('name2').innerHTML = lastName;
//     return false;
// }