document.addEventListener("click", e => {
  if (e.target.classList.contains("edit")) {
    let edits = prompt("New punch?")
    axios
      .post("/change-punch", { id: e.target.getAttribute("data-stringId"), punch: edits }) // Use 'id' consistently
      .then(() => {
        // Do something interesting here
      })
      .catch(err => {
        console.log(err)
      })
  }
})

document.addEventListener("click", e => {
  if (e.target.classList.contains("test-local")) {
    axios
      .post("/test", { _id: e.target.getAttribute("data-_id") })
      .then(() => {
        console.log("Test route called successfully")
      })
      .catch(err => {
        console.log(err)
      })
  }
})
// document.addEventListener("click", e => {
//   if (e.target.classList.contains("edit")) {
//     let edits = prompt("New punch?")
//     axios
//       .post("/change-punch", { punch: edits, _id: e.target.getAttribute("data-_id") })
//       .then(() => {
//         // do something interesting here
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// })
document.addEventListener("click", e => {
  if (e.target.classList.contains("test-network")) {
    let edits = prompt("New punch?")
    axios
      .post("/db-check", { punch: edits, _id: e.target.getAttribute("data-_id") })
      .then(() => {
        // do something interesting here
      })
      .catch(err => {
        console.log(err)
      })
  }
})
