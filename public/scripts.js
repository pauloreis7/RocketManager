const cards = document.querySelectorAll('.card')
const cardOnly = document.querySelector('.card_only')

for (let card of cards) {
    card.addEventListener("click", function () {
        const courseId = card.getAttribute('id');
        
        window.location.href = `http://localhost:5000/rocket_course/${courseId}`
    })
}

cardOnly.addEventListener("click", function () {
    const id = cardOnly.getAttribute('id')

    window.location.href = `https://rocketseat.com.br/${id}`
})

document.querySelector(".click").addEventListener("click", function () {
    const id = cardOnly.getAttribute('id')

    window.location.href = `https://rocketseat.com.br/${id}`
})