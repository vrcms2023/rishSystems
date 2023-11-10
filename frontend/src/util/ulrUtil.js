export function getBaseURL() {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URL
    : "http://127.0.0.1:8000";
}

// export function getBaseURL() {
//   return "https://jettik8s.xyz/";
// }

export function removeActiveClass() {
  const id = document.getElementById("projectLink");
  if (id) {
    id.classList.remove("active");
  }
}

export function hideHandBurgerIcon(pathList) {
  return pathList.indexOf(window.location.pathname) >= 0 ? true : false;
}
