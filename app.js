const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log(req.params)
  res.send([
    { id: 1, message: 'Hello World!' },
    { id: 2, message: 'Chine says hello!' },
    { id: 3, message: 'So does Shannon 😀' }
  ])
})

app.listen(port, () => {
  console.log(`Simple Weather App currently listening on port: ${port}`)
})
