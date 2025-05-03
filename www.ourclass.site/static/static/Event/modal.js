var modalArea = document.getElementById("modal__area");
var images = document.querySelectorAll(".eachevent_image");
var modalImg = document.getElementById("modal-image");

images.forEach(image => {
    image.onclick = function () {
        modalImg.src = this.src;
        modalArea.style.display = "flex";
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeThing()
            };
        });
    };

});

function closeThing() {
    document.body.style.overflow = 'auto';
    modalArea.style.display = 'none';
};
