const skillsContainer = document.querySelector(".skills");

const projectsContainer = document.querySelector(".projects");
const projectVeiwer = document.querySelector(".projects--viewer");
const projectVeiwerContainer = document.querySelector(".projects--viewer div");
// Project Vewier Width and height to center it around the cursor
const projectVeiwerWidth = projectVeiwer.getBoundingClientRect().width / 2;
const projectVeiwerHeight = projectVeiwer.getBoundingClientRect().height / 2;
// ------------------------------------------------------------------------------

// -----------------Get Projects Data-----------------------
async function getProjects() {
  const req = await fetch("./js/projects.json");
  const data = await req.json();

  displayProjects(data);
  return data;
}

function displayProjects({ data }) {
  const projectsArr = data;

  projectsArr.forEach((projcet, i) => displayProject(projcet, i, data.length));
}

function displayProject(project, indx, totalLength) {
  const { name, role, mainImg } = project;
  const a = document.createElement("a");

  a.href = "./project.html";
  a.classList.add("project");

  a.innerHTML = `
  <p class="proj--name">${name}</p>
  
  <p class="proj--role">${role}</p>`;

  projectsContainer.insertAdjacentElement("beforeend", a);

  const img = document.createElement("img");
  img.alt = "project Image";

  img.src = mainImg;
  projectVeiwerContainer.insertAdjacentElement("beforeend", img);
  a.addEventListener("mouseover", () => {
    projectVeiwerDiv.style.setProperty(
      "--translateY",
      indx * (-100 / totalLength) + "%"
    );
  });

  // Handel Link Click
  a.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("project", JSON.stringify(project));
    window.location.href = "./project.html";
  });
}
getProjects();
// --------------------------------------------
const projects = document.querySelectorAll(".project");
const projectVeiwerDiv = document.querySelector(".projects--viewer > div");

projectsContainer.addEventListener("mouseenter", (e) => {
  projectVeiwer.classList.add("active");
  const yPosition = Math.max(
    projectsContainer.getBoundingClientRect().top +
      e.clientY -
      projectVeiwerHeight
  );
  const xPosition = Math.max(
    e.clientX -
      projectsContainer.getBoundingClientRect().left -
      projectVeiwerWidth
  );
  projectVeiwer.style.setProperty("--x", xPosition + "px");
  projectVeiwer.style.setProperty("--y", yPosition + "px");
  projectVeiwer.style.setProperty("--scale", 1);
});
projectsContainer.addEventListener("mouseleave", (e) => {
  projectVeiwer.style.setProperty("--scale", 0);
  projectVeiwer.classList.remove("active");
});
let currXPos = 0;
let currYPos = 0;
let yPosition = 0;
let xPosition = 0;
let delay = 0.1;
projectsContainer.addEventListener("mousemove", (e) => {
  yPosition = e.clientY;
  xPosition = e.clientX;
});
function animateProjectVeiwer() {
  currXPos += (xPosition - currXPos) * delay;
  currYPos += (yPosition - currYPos) * delay;
  projectVeiwer.style.setProperty("--x", currXPos + "px");
  projectVeiwer.style.setProperty("--y", currYPos + "px");
  requestAnimationFrame(animateProjectVeiwer);
}
animateProjectVeiwer();
