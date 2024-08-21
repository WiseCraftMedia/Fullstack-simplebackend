document.addEventListener("click", e => {
  if (e.target.classList.contains("edit")) {
    const punch = prompt(
      "New punch?",
      e.target.parentElement.parentElement.querySelector(".single-punch").innerHTML
    )
    const id = { id: e.target.getAttribute("data-id") }

    if (punch) {
      axios
        .post("/change-punch", { punch, id: e.target.getAttribute("data-id") })
        .then(() => {
          e.target.parentElement.parentElement.querySelector(".single-punch").innerHTML = punch
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})

document.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    if (confirm("u extra extra sure????")) {
      axios
        .post("/feint-punch", { id: e.target.getAttribute("data-id") })
        .then(() => {
          e.target.parentElement.parentElement.remove()
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})
