var isAnimationFinished = true;

function changeSlide(id, direction) {
    var currentSlider = document.getElementById(id);
    var slides = currentSlider.getElementsByClassName("slide");
    if (isAnimationFinished) {
        isAnimationFinished = false;
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('slide_active')) {
                slides[i].classList.remove("slide_active");
                slides[i].classList.add("slide_inactive");
                var temp = i;
                if (direction === "left") {
                    if (i === 0) {
                        i = slides.length - 1;
                    } else {
                        i--;
                    }
                }
                if (direction === "right") {
                    if (i === slides.length - 1) {
                        i = 0;
                    } else {
                        i++;
                    }
                }
                slides[i].classList.remove("slide_inactive");
                slides[i].classList.add("slide_active");

                setTimeout(() => {
                    isAnimationFinished = true;
                }, 500);

                break;
            }
        }
    }
}

function SlideSetStyleDisplay(slide, style) {
    slide.style.display = style;
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}