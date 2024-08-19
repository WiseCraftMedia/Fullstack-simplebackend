let express = require("express")
let app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname))

app.get("/", (req, res) => {
  res.send(`
  <form action='/answer' method='POST'>
    <p>Is the sky blue?</p>
    <input name='skyWhy' autocomplete='off'>
    <button>Submit Answer</button>
  </form>
  `)
})

app.post("/answer", (req, res) => {
  if (req.body.skyWhy.toLowerCase() == "yes") {
    res.send(`
  <p>GREAT-SUCCESS!</p>
  <a href='/'>Back to Homepage</a>
  `)
  } else {
    res.send(`
  <p>WRONG ANSWER!</p>
  <a href='/'>Get outta here!</a>
  `)
  }
})

app.use((req, res) => {
  res.redirect("/")
})

// app.get("/answer", (req, res) => {
//   res.send(
//     '<a href="/"><img src="404.webp" alt="Officer BarBrady says please move along" style="max-width: 100%; height: auto"></a>'
//   )
// })

app.listen(3000)
