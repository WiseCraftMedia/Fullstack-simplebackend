document.addEventListener("click", e => {
  if (e.target.classList.contains("edit")) {
    const punch = prompt("New punch?")
    const timestamp = Math.floor(new Date().getTime() / 1000)

    axios
      .post("/change-punch", { timestamp, punch }) // Use 'id' consistently
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
