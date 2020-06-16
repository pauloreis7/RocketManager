const localPage = location.pathname
const menuItens = document.querySelectorAll("header .links a ")

for ( item of menuItens) {
    if (localPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}


function createPagination(totalPages, selectedPage) {
    
    let pages = []

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        
        const defaultPages = currentPage == 1 || currentPage == 2 || currentPage == totalPages -1 || currentPage == totalPages

        const pagesBeforeSelectedPages = currentPage >= selectedPage -2
        const pagesAfterSelectedPages = currentPage <= selectedPage +2

        if (defaultPages || pagesBeforeSelectedPages && pagesAfterSelectedPages) {
            
            
            if (selectedPage - currentPage == 2 && currentPage >= 5 ||  currentPage - selectedPage >= 5 && currentPage != totalPages) {

                pages.push('...')
            }

            if ( currentPage == 4 && selectedPage == 6 || currentPage - selectedPage == 4 && currentPage !=totalPages) {

            pages.push(currentPage - 1)
            }
           
            pages.push(currentPage)
        }
    }

    return pages
}



const pagination = document.querySelector(".pagination")
const total = +pagination.dataset.total
const page = +pagination.dataset.page
const search = pagination.dataset.search

const pages = createPagination(12, 5)
let elements = ""

for ( let page of pages) {
    elements += `<a href="?page=${ page }">${ page }</a>`
}

pagination.innerHTML = elements

 console.log(elements)