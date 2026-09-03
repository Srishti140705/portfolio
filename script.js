const progressBar = document.getElementById("progress-bar");
const loader = document.getElementById("loader");
const portfolio = document.getElementById("portfolio");
const catTrack = document.querySelector(".cat-track");
const catTrail = document.querySelector(".cat-trail");

let progress = 0;
let catMoveTimeout;
let lastScrollY = window.scrollY;

if (catTrail) {

    catTrail.innerHTML = "";

    for (let i = 0; i < 70; i++) {

        const paw = document.createElement("span");
        paw.className = "paw-print";
        paw.style.left = `${i * 28}px`;
        paw.style.top = i % 2 === 0 ? "4px" : "1px";
        paw.style.transform = i % 2 === 0
            ? "rotate(-12deg) scale(.82)"
            : "rotate(12deg) scale(.76)";

        catTrail.appendChild(paw);

    }

}

const moveCat = () => {

    if (!catTrack) return;

    const currentScrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
    const maxTravel = window.innerWidth - 150;
    const catX = scrollProgress * maxTravel;

    catTrack.classList.toggle("is-reversing", currentScrollY < lastScrollY);
    lastScrollY = currentScrollY;

    catTrack.style.setProperty("--cat-x", `${catX}px`);
    catTrack.style.setProperty("--paw-width", `${catX + 18}px`);
    catTrack.classList.add("is-moving");

    clearTimeout(catMoveTimeout);
    catMoveTimeout = setTimeout(() => {
        catTrack.classList.remove("is-moving");
    }, 260);

};

window.addEventListener("scroll", moveCat);
window.addEventListener("resize", moveCat);
moveCat();

if (sessionStorage.getItem("portfolioLoaded")) {

    loader.style.display = "none";
    portfolio.style.display = "block";
    portfolio.style.opacity = "1";

} else {

const loading = setInterval(() => {

    progress += 2;

    progressBar.style.width = progress + "%";

    if (progress >= 100) {

        clearInterval(loading);
        progressBar.style.width = "100%";
        sessionStorage.setItem("portfolioLoaded", "true");

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

                portfolio.style.display = "block";

                setTimeout(() => {

                    portfolio.style.opacity = "1";

                }, 100);

            }, 1000);

        }, 500);

    }

}, 18);

}
