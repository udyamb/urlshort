require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
// {}
// Your first API endpoint
const originalUrl = []
const shortUrl = []

app.get('/api/shorturl/:redirectToUrl',(req,res)=>{
  
   let url=req.params.redirectToUrl
   if(url<=shortUrl.length)
   {
    const redirectUrl=originalUrl[url-1]
    res.redirect(redirectUrl)
   }
   res.json({"error":"No short URL found for the given input"})
 })

app.post('/api/shorturl', function (req, res) {
  const url = req.body.url
  if(!url.startsWith('http') && !url.endsWith('.com'))
  {
    res.json({"error":"invalid url"})
  }
  const pos = originalUrl.indexOf(url)
  if (pos < 0) {
    originalUrl.push(url)
    shortUrl.push(shortUrl.length)
    return res.json({
      "original_url": url,
      "short_url": shortUrl.length - 1,

    })
  }

  return res.json({
    "original_url": url,
    "short_url": shortUrl[pos],
  });
})
app.get('/name',(req,res)=>{
  res.json("udyam ")
})


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
