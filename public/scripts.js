const localPage = location.pathname
const menuItens = document.querySelectorAll("header .links a ")

for ( item of menuItens) {
    if (localPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}