// import LocomotiveScroll from "locomotive-scroll";

// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
// });
// scroll.init();
// scroll.update();

const nav = document.querySelector("nav");
nav.classList.add("scrolled");
const hero = document.querySelector("section");
const sideNavBtn = document.querySelector(".nav--circl");
const navCircl = document.querySelector(".nav--circl");
const logo = document.querySelector(".logo svg");
const pointColorChange =
  hero.getBoundingClientRect().bottom - window.scrollY - 200;
const skillsContainer = document.querySelector(".skills");
const bgProgress = document.querySelector(".bg--animation");

const navObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      nav.classList.toggle("scrolled");
      sideNavBtn.classList.remove("active");
      console.log("sds");
    });
  },
  {
    rootMargin: "-95% 0px 0px 0px",
  }
);
navObserver.observe(hero);
// changeing background color based on the section
const navBarBgColor = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        nav.style.setProperty("--bg-color", "var(--main-color)");
        navCircl.style.backgroundColor = "#eee";
        navCircl.style.setProperty("--bg-lines", "#000");
      } else {
        nav.style.removeProperty("--bg-color", "var(--main-color)");
        navCircl.style.backgroundColor = "var(--main-color)";
        navCircl.style.setProperty("--bg-lines", "#fff");
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "-200px 0px 0px 0px",
  }
);
navBarBgColor.observe(hero);
const navLinks = document.querySelectorAll("nav > .links .nav--links  li");
navLinks.forEach((link, i) => {
  link.style.setProperty("--x", i);
});

const flipTextElements = document.querySelectorAll("[text-flip]");
flipTextElements.forEach((ele) => {
  addFlipAnimation(ele);
  console.log(ele);
});
console.log(flipTextElements);
function addFlipAnimation(ele) {
  const eleText = ele.innerText;
  ele.innerHTML = `<span class="text">${eleText}</span>`;
  ele.setAttribute("content", eleText);

  // ele.appendChild(clone);
}

sideNavBtn.addEventListener("click", () => {
  sideNavBtn.classList.toggle("active");
  sideNavBtn.classList.toggle("closed");
  document.body.classList.toggle("hidden");
  S;
});

// add mouse move effect
const mouseCericl = document.querySelector(".cursor");
const cursorWidth = mouseCericl.getBoundingClientRect().width;
let mouseX = 0,
  mouseY = 0; // Actual mouse position
let circleX = 0,
  circleY = 0; // Circle's position
const delay = 0.08; // The smaller this number, the slower the delay
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Smoothly move the circle toward the mouse position
  circleX += (mouseX - circleX) * delay;
  circleY += (mouseY - circleY) * delay;

  // Apply the new position to the circle
  mouseCericl.style.left = `${circleX}px`;
  mouseCericl.style.top = `${circleY}px`;

  requestAnimationFrame(animate); // Continue the animation
}

animate();

const elements = Array.from(document.querySelectorAll("[data-mouse-effect]"));
elements.forEach((ele) => {
  let { width, x, y, height } = ele.getBoundingClientRect();
  const max = width / 10;
  ele.addEventListener("mousemove", (e) => {
    let offX = e.screenX - x;
    const ratioX = ((offX / width) * 2 - 1) * max;
    let offY = e.screenY - y - 76;
    const ratioY = ((offY / width) * 2 - 1) * max;
    ele.style.setProperty("--x", ratioX + "px");
    ele.style.setProperty("--y", ratioY + "px");
  });
});
