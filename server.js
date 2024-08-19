let express = require("express")
let { MongoClient, ObjectId } = require("mongodb")
let app = express()
let db
const uri =
  "mongodb+srv://spritethirstman:SuperSimpleSyrupSlurpsSloppily@clusterfuck.lypazcb.mongodb.net/simplestack?retryWrites=true&w=majority&appName=Clusterfuck"

app.use(express.static("public"))

async function go() {
  let client = new MongoClient(uri)
  try {
    await client.connect()
    db = client.db("simplestack")
    app.listen(3000)
  } catch (e) {
    console.log(e)
  }
}

go()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname))

app.get("/", async (req, res) => {
  const punches = await db.collection("punches").find().toArray()
  res.send(`<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <link rel='stylesheet' href='simple.css' />
    <title>Document</title>
  </head>
  <body>
    <div class='page'>
      <h1>Punchy!</h1>
      <div class='punch'>
        <form action='/punch' method='POST'>
          <label><input autofocus name='punch' /><button>Add new item</button></label>
        </form>
      </div>
    </div>
    <div class='listbox'>
      <ul class='list'>
        ${punches
          .map(punch => {
            return `<li class="item">
          <p>${punch.text}</p>
          <button data-timestamp='${() =>
            ObjectId.createFromTime(
              parseInt(timestamp, 10)
            )}' class="edit">Edit</button><button class="delete">Delete</button>
        </li>`
          })
          .join("")}
      </ul>
    </div>
        <div class="test">
      <button class="test-local" data-stringId='${
        punches._id
      }'>Check Local</button><button class="test-network" data-stringId="${
    punches._id
  }">Check...Network?</button>
    </div>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/browser.js"></script>
   </body>
</html>
`)
})

//

app.post("/punch", async (req, res) => {
  await db.collection("punches").insertOne({ text: req.body.punch })
  res.redirect("/")
})

app.post("/test", (req, res) => {
  res.send(`Test route working
    <a href="localhost:3000">Home</a>
    `)
})

app.post("/change-punch", async (req, res) => {
  try {
    const { timestamp, punch } = req.body
    const updateDoc = { $set: { text: punch } }
    const objectId = ObjectId.createFromTime(parseInt(timestamp, 10))
    const docId = { _id: objectId }

    console.log("Received data:", req.body)
    const result = await db.collection("simplestack").findOneAndUpdate(docId, updateDoc)
    console.log("Update result:", result)

    // if (result.matchedCount === 0) {
    //   return res.status(404).send("Document not found")
    // }

    res.send("Edits approved")
  } catch (err) {
    console.error("Error during database operation:", err)
    res.status(500).send("Error updating document")
  }
})
