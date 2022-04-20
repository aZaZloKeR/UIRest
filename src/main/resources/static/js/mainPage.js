let initiatives = [];
for (let i = 0; i < 6; i++) {
    initiatives.push({
        id: i + 1,
        name: "it's a " + (i + 1) + " initiative",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto consequatur " +
            "consequuntur corporis dolor ea, eius eligendi fuga fugit ipsam iure non omnis optio quasi quis " +
            "quod quos velit voluptates.",
        likes: Math.floor(Math.random() * 100),
        image: `exampleInit${i + 1}.png`,
    });
}

FillInitiatives();

function FillInitiatives() {
    let table = document.querySelector("table");
    let counter = 0;
    for (let i = 0, row; row = table.rows[i]; i++) {
        for (let j = 0, col; col = row.cells[j]; j++) {
            console.log(col);
            if (counter >= 6) return;
            AddInitiative(col, initiatives[counter]);
            counter++;
        }
    }
}

function AddInitiative(tdElem, initiative) {
    let link = document.createElement("a");
    link.href = "./initiative/" + initiative.id;
    let img = document.createElement("img");
    img.alt = ""
    img.src = "/static/img/" + initiative.image;
    img.className = "initiativeImage";

    link.appendChild(img);
    tdElem.appendChild(link);
    tdElem.appendChild(CreateInitiativeContent(initiative));
}

function CreateInitiativeContent(initiative) {
    let div = document.createElement("div");
    div.className = "initiativeContent";

    let header = document.createElement("h3");
    header.textContent = initiative.name;
    let text = document.createElement("p");
    text.textContent = initiative.description;

    div.appendChild(header);
    div.appendChild(text);
    div.appendChild(CreateLikeBlock(initiative.id, initiative.likes));

    return div;
}

function CreateLikeBlock(initiativeId, numberOfLikes) {
    let ul = document.createElement("ul");
    ul.className = "likeUl";
    ul.disabled = "disabled";
    for (let i = 0; i < 4; i++) {
        ul.appendChild(document.createElement("li"));
    }
    let likeImg = document.createElement("span");
    likeImg.innerHTML = getLikeSvg();
    likeImg.className = "likeImg";
    ul.children[0].appendChild(likeImg);

    let likeAddFlag = document.createElement("span");
    likeAddFlag.innerHTML = "<svg width=\"15\" height=\"12\" viewBox=\"0 0 15 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path d=\"M8.3125 5.76562V7.46094H0.515625V5.76562H8.3125ZM5.32812 2.57812V10.8594H3.50781V2.57812H5.32812ZM14.8906 0.585938V12H13.0078V2.82031L10.2188 3.76562V2.21094L14.6641 0.585938H14.8906Z\" fill=\"#0D47A1\"/>\n" +
        "</svg>\n"
    likeAddFlag.className = "likeFlag";
    likeAddFlag.style.display = "none";
    ul.children[1].appendChild(likeAddFlag);

    let likeCounter = document.createElement("span");
    likeCounter.textContent = "(" + numberOfLikes + ")";
    likeCounter.className = "likeCounter";
    ul.children[2].appendChild(likeCounter);

    let likeText = document.createElement("span");
    likeText.textContent = "Голосовать";
    likeText.className = "likeText";
    ul.children[3].appendChild(likeText);

    ul.onclick = async () => {
        let response = await fetch("./rest/like/" + initiativeId);
        if (likeAddFlag.style.display === "none"){
            likeAddFlag.style.display = "block";
        } else {
            likeAddFlag.style.display = "none";
        }
    };

    return ul;
}

function getLikeSvg(){
    return "<svg width=\"18\" height=\"17\" viewBox=\"0 0 18 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path d=\"M5.06449 15.9999H2.6258C2.19461 15.9999 1.78108 15.8419 1.47618 15.5606C1.17129 15.2793 1 14.8977 1 14.4999V9.24995C1 8.85213 1.17129 8.4706 1.47618 8.18929C1.78108 7.90799 2.19461 7.74996 2.6258 7.74996H5.06449M10.7548 6.24997V3.24999C10.7548 2.65325 10.4979 2.08096 10.0405 1.65901C9.58316 1.23705 8.96287 1 8.31609 1L5.06449 7.74996V15.9999H14.234C14.6261 16.004 15.0066 15.8772 15.3053 15.6429C15.6041 15.4086 15.801 15.0826 15.8598 14.7249L16.9816 7.97496C17.017 7.75997 17.0012 7.54047 16.9355 7.33165C16.8698 7.12283 16.7557 6.92968 16.601 6.7656C16.4464 6.60151 16.2549 6.47041 16.0399 6.38138C15.8249 6.29234 15.5915 6.2475 15.3558 6.24997H10.7548Z\" stroke=\"#0D47A1\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
        "</svg>\n";
}