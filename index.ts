const express = require('express')
const app = express()

app.get('/hello', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello full stack!')
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})