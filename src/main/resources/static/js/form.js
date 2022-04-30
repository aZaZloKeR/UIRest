let isAnimationCompleted = true;

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

function changeBlocks(blockId1, blockId2){
	if(isAnimationCompleted == true){
		isAnimationCompleted == false;
		let block1 = document.getElementById(blockId1);
		let block2 = document.getElementById(blockId2);

		if (block2.classList.contains('inactive'))
		{
			block1.classList.add('inactive');
			block2.classList.add('active');
			block1.classList.remove('active');
			block2.classList.remove('inactive');
			block1.style.display = 'none';
			setTimeout(() => {isAnimationCompleted = true;}, 500);
		}
	}
}

function addClass(testInput, className){
	if(testInput.value === null || testInput.value === ""){
		testInput.classList.add(className);
	}
	else{ testInput.classList.remove(className);}
}

function AddBorderToLoginForm()
{
	var loginBlock = document.getElementById('loginFormDiv');
	var registrationBlock = document.getElementById('regFormDiv');
	registrationBlock.classList.remove('borderBottom');
	regFormLink.classList.remove('choose');
	loginFormDiv.classList.add('borderBottom');
	logFormLink.classList.add('choose');
}

function AddBorderToRegistrationForm()
{
	var loginBlock = document.getElementById('loginFormDiv');
	var registrationBlock = document.getElementById('regFormDiv');
	loginBlock.classList.remove('borderBottom');
	registrationBlock.classList.add('borderBottom');
	regFormLink.classList.add('choose');
	logFormLink.classList.remove('choose');
}

function ValidMail(){
	var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	var eMail = document.getElementById('email');
	let labelEMail = document.getElementById('labelEMail');
	var valid = re.test(eMail.value);
	if (!valid){
		labelEMail.textContent = 'Введите корректный eMail';
		email.classList.add('redWarning');
		return false;
	}
	else{
		labelEMail.innerHTML = '&nbsp;';
		email.classList.remove('redWarning');
		return true;
	}
}

function ValidPhone(){
	var re = /^[\d\+]{1}[\d\(\)\ -]{2,14}\d$/
	let phone = document.getElementById('phoneNumber');
	let labelPhone = document.getElementById('labelPhone');
	var valid = re.test(phone.value);
	if (!valid){
		labelPhone.innerHTML = 'Введите корректный номер телефона';
		phone.classList.add('redWarning');
		return false;
	}
	else{
		labelPhone.innerHTML = '&nbsp;';
		phone.classList.remove('redWarning');
		return true;
	}
}

function ValidBirthDate()
{
	var birthDate = document.getElementById('birthDate');
	var labelBirthDate = document.getElementById('labelBirthDate');
	var re = /^((0[1-9]|[12]\d)\.(0[1-9]|1[012])|(30\.0[13-9]|1[012]|31\.(0[13578]|1[02])))\.(19|20)\d\d$/;
	var valid = re.test(birthDate.value);
	if (!valid){
		labelBirthDate.innerHTML = 'Введите корректную дату рождения.';
		birthDate.classList.add('redWarning');
		return false;
	}
	else{
		labelBirthDate.innerHTML = '&nbsp;';
		birthDate.classList.remove('redWarning');
		return true;
	}
}

function ValidPassword()
{
	var password1 = document.getElementById('password1');
	var labelPassword1 = document.getElementById('labelPassword1');
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	var valid = re.test(password1.value);
	if (!valid){
		labelPassword1.innerHTML = 'Пароль может включать в себя только латинские буквы и цифры. Так же должен содержать минимум 1 цифру, 1 строчную и 1 заглавную буквы.';
		password1.classList.add('redWarning');
		return false;
	}
	else{
		labelPassword1.innerHTML = '&nbsp;';
		password1.classList.remove('redWarning');
		return true;
	}
}

function onLogin(){
	changeBlocks('registrationBlock', 'loginBlock');
}

function onRegistration(){
	changeBlocks('loginBlock', 'registrationBlock');
}

async function login(){
	let mail = document.getElementById("mail");
	let password =  document.getElementById("password");

	addClass(mail, 'redWarning');
	addClass(password, 'redWarning');

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
	let password1 = document.forms.registForm.password1;
	let password2 = document.forms.registForm.password2;
	let labelPassword2 = document.getElementById('labelPassword2');
	if (password1.value != password2.value)
	{
		labelPassword2.innerHTML = 'Пароли не совпадают';
		password1.classList.add('redWarning');
		password2.classList.add('redWarning');
		return false;
	}
	else
	{
		labelPassword2.innerHTML = '&nbsp;';
		password1.classList.remove('redWarning');
		password2.classList.remove('redWarning');
		return true;
	}
}

async function registration(){
	let firstName =document.getElementById("firstName");
	let lastName = document.getElementById("lastName");
	let thirdName = document.getElementById("thirdName");
	let birthDate = document.getElementById("birthDate");
	let password1 = document.getElementById("password1");
	let phoneNumber = document.getElementById("phoneNumber");
	let address = document.getElementById("address");
	let email = document.getElementById("email");


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

function sendProblem1(){
	let FIO = document.getElementById("FIO");
	// FIO.addEventListener('input', updateValue);
	let email = document.getElementById("email");
	// email.addEventListener('input', updateValue);
	let phoneNumber = document.getElementById("phoneNumber");
	// phoneNumber.addEventListener('input', updateValue);
	let textOfProblem1 = document.getElementById("textOfProblem1");
	// textOfProblem1.addEventListener('input', updateValue);

	let sendButt1 = document.getElementById("sendButt1");

	let sendArr = [FIO, email, phoneNumber, textOfProblem1];
	console.log("GG")
	//добавление события обработки значений для всех полей
	for (let i = 0; i < sendArr.length; i++){
		sendArr[i].addEventListener('change', updateValue);
		console.log('work');
	}

	let labelProblem1 = document.getElementById("labelProblem1");
	//Какие то действия при невалидной даты в textArea
	if (textOfProblem1.classList.contains('redWarning')){
		labelProblem1.style.fontSize = "14px";
		labelProblem1.style.top = "-20px";
		labelProblem1.innerHTML = 'Пожалуйста опишите проблему';
	}
	else{ labelProblem1.innerHTML = '&nbsp;';}

	sendButt1.onclick = function (){
		//отправка данных еще

		for (let i = 0; i < sendArr.length; i++){
			sendArr[i] = '';
		}
		sendButt1.disabled = true;
		document.getElementById('sendButt1').classList.remove('blueBack');
		document.getElementById('sendButt1').classList.add('grayBack');
	}

	function updateValue(event) {
		let flag = 0;
		for (let i = 0; i < sendArr.length; i++){

			// addClass(sendArr[i], 'redWarning');
			if(sendArr[i].classList.toggle("redWarning")){
				flag++;
			}
		}

		if(flag == 0){
			console.log("FALSE")
			sendButt1.disabled = false;
			document.getElementById('sendButt1').classList.remove('grayBack');
			document.getElementById('sendButt1').classList.add('blueBack');
		}
		else{
			sendButt1.disabled = true;
			document.getElementById('sendButt1').classList.remove('blueBack');
			document.getElementById('sendButt1').classList.add('grayBack');
		}
	}
}

function sendProblem2(){
	let textOfProblem2 = document.getElementById("textOfProblem2");
	let labelProblem2 = document.getElementById('labelProblem2');
	if (textOfProblem2.value === null || textOfProblem2.value === ""){
		labelProblem2.innerHTML = 'Пожалуйста опишите проблему';
		labelProblem2.style.fontSize = "14px";
	}
	else{ labelProblem2.innerHTML = '&nbsp;';}

	addClass(textOfProblem2, 'redWarning');
	if(textOfProblem2.classList.contains('redWarning')){
		document.getElementById('sendButt2').classList.remove('grayBack');
		document.getElementById('sendButt2').classList.add('blueBack');
	}
	else{
		document.getElementById('sendButt2').classList.remove('blueBack');
		document.getElementById('sendButt2').classList.add('grayBack');
	}

	changeBlocks('loginUserBlock', 'successContactBlock');
}

function sendMoreProblem(){
	changeBlocks('successContactBlock', 'newUserBlock');
}
