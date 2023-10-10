const Menu = (e) => {
  const list = document.querySelector("ul");
  if (list.classList.contains("hidden")) {
    list.classList.remove("hidden");
    e.name = "close";
  } else {
    list.classList.add("hidden");
    e.name = "menu";
  }
};
