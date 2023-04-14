let navbar: HTMLElement | null = document.querySelector(".header .navbar");
let menu_btn: HTMLElement | null = document.querySelector("#menu-btn");

if (menu_btn != null && navbar != null) {
  menu_btn.onclick = () => {
    navbar!.classList.toggle("active");
  };
}

window.onscroll = () => {
  if (navbar != null) navbar.classList.remove("active");
};
