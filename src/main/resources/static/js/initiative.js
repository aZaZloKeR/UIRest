async function SendInitiative(){
    var name = document.getElementById("nameInitiative");
    var textArea = document.getElementById("textArea");
    var image = document.getElementById("inputImage");

    if (CheckIsFilled() == false)
    {
        return;
    }

   // const url ='/balancer/registration';
   // try {
    //    const response = await fetch(url, {
    //        method: 'POST', // или 'PUT'
    //        body: JSON.stringify([firstName,lastName,thirdName,birthDate,phoneNumber,address,email,password1]), // данные могут быть 'строкой' или {объектом}!
            //пока в JSON складывается адрес одной строкой, однако для API нужно разделить его на квартиру, дом и бла бла
      //      headers: {'Content-Type': 'application/json'}});
     //   const json = await response.json();
     //   console.log('Успех:', JSON.stringify(json));
   // } catch (error) {
  //      console.error('Ошибка:', error);
  //  }
    if (true) // otvet http
    {
        console.log("za");
    }
}

function CheckIsFilled()
{
    var name = document.getElementById("nameInitiative");
    var textArea = document.getElementById("textArea");
    var image = document.getElementById("inputImage");
    var button = document.getElementById("submitForm");
    console.log(name.value, textArea.value, image.value);
    if (name.value && textArea.value && image.value)
    {
        button.disabled = false;
        button.style.backgroundColor = "#0d47a1";
        return true;
    }
    else
    {
        button.style.backgroundColor = "#809dca";
        button.disabled = true;
        return false;
    }
}