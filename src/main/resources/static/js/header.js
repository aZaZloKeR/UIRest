var headerText =
    '<header id="header">\n' +
    '    <ul class="nav">\n' +
    '        <li class="liHeader">\n' +
    '            <div id="logo_info">\n' +
    '                <img id="logo_img" src="./img/Шапка/Vect.png" />\n' +
    '                <img id="logo_line" src="./img/Шапка/Line%201.png" />\n' +
    '                <a href="index.htm"><p id="sait_name"><strong>Инициативы<br/>жителей Дубны</strong></p></a>\n' +
    '            </div>\n' +
    '        </li>\n' +
    '        <li class="liHeader">\n' +
    '            <form id="search_form" action="#">\n' +
    '                <input type="search" placeholder="Поиск" name="search" class="search_box">\n' +
    '            </form>\n' +
    '        </li>\n' +
    '        <li class="liHeader"><a class="nav" href="#">Предложить инициативу</a></li>\n' +
    '        <li class="liHeader"><a class="nav" href="#">Правила работы</a></li>\n' +
    '        <li class="liHeader"><a class="nav" href="#">Контакты</a></li>\n' +
    '        <li class="liHeader"><a id="navButt" href="./login.htm" class="button blueBack" onclick="onLogin()">Войти</a></li>\n' +
    '    </ul>\n' +
    '</header>';

function setHeader() {
    var header =  document.createElement("div");
    header.innerHTML = headerText ;
    document.body.insertAdjacentElement('afterbegin', header );
}

setHeader();