import express, { Request, Response, json, static as serveStatic } from 'express'
import google from 'googlethis'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(json())

app.get('/ping', (_: Request, res: Response) => {
  res.send('pong')
})

app.post('/search', async (req: Request, res: Response) => {
  res.send(await google.search(req.body.q, {
    page: 0,
    safe: false,
    parse_ads: true,
    additional_params: {
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en'
    }
  }))
})

app.use(serveStatic('public'))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})