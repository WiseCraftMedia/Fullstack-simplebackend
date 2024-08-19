let http = require("http")

let app = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("sup daddio")
  }
  if (req.url == "/about") {
    res.end("u dont know shit about me!")
  }
})
app.listen(3000)
