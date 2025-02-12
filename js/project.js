const navBar = document.querySelector("nav");
const nextProject = document.querySelector(".next--project");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navBar.classList.add("page--end");
    } else {
      navBar.classList.remove("page--end");
    }
  });
});
if (nextProject) {
  observer.observe(nextProject);
}

// get Project From Locacl Storage

function getProject() {
  const project = JSON.parse(localStorage.getItem("project"));
  return project;
}

// Display Project

function displayProject() {
  const project = getProject();
  const {
    name,
    role,
    credit,
    mainImg,
    description,
    disktopImgs,
    mobileImgs,
    year,
  } = project;
  const projectName = document.querySelector(".project--name");
  const projectRole = document.querySelector(".project--role");
  const projectCredit = document.querySelector(".project--credit");
  const mainImgElement = document.querySelector("#mainImg");

  projectName.innerHTML = name;
  projectRole.innerHTML = role;
  projectCredit.innerHTML = credit;
  mainImgElement.src = mainImg;

  const disktopImgsContainer = document.querySelector(".disktop");

  // insure that the container is empty
  disktopImgsContainer.innerHTML = "";
  disktopImgs.forEach((img) => {
    const imgElement = document.createElement("img");
    imgElement.src = img;
    disktopImgsContainer.appendChild(imgElement);
  });

  const projcetMobileImgs = document.querySelector(".mobile");
  // insure that the container is empty
  projcetMobileImgs.innerHTML = "";
  mobileImgs.forEach((img) => {
    const imgElement = document.createElement("img");
    imgElement.src = img;
    projcetMobileImgs.appendChild(imgElement);
  });
}
displayProject();
