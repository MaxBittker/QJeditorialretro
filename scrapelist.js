'use strict'
var fs = require('fs')
let cheerio = require('cheerio')
let request = require('request')
let _ = require('lodash')
// let csv =  fs.readFileSync('./quotes.csv', 'utf8');
// csv  = csv.split("\n")
// csv
// csv = _.map(csv,o=>{return {
//     url:o.split(",")[0],
//     quote:o.split(",").slice(1).join(",")
//   }
// })

let csv =  fs.readFileSync('./Eds Project - Mental Health.csv', 'utf8');
csv  = csv.split("\n")
csv = _.map(csv,o=>{return {
    url:o
    // quote:o.split(",").slice(1).join(",")
  }
})
csv.pop()
let AO = _.map(csv,scrapeArticle)
let c = AO.length
let alist = []

let articleTemplate =  _.template("<div class = 'story row'><div class='three columns'> <div class='title'> <%= title %> </div> <div class='date'><%= date %>  </div></div> <div class='nine columns'> <p class='article'> <%= pre %></p></div></div>")

function scrapeArticle(A) {
    let url = A.url
    console.log(url)

    request(url, function (err, res, bod) {
        if (err) {
            throw err
        }
        if (res.statusCode !== 200 || !bod) {
            console.log(url + res.statusCode + " FAILED !!!!!!!!!!!")
            return
        }
        let $ = cheerio.load(bod)
        let title = $('#content h1').text()
        console.log(title)
        let date = $('#content .date').text()
        let content = $('#content .field-items p').map(function (i, el) {
            return $(this).text()
        }).get().join("<br>").toString()
        let pre = content
        let post = ""
        alist.push({
            title, url, date, content, pre, post
        })
        c--
        console.log(c)
        if(c==0){
          let out = _.map(alist,o=>{
            o.html = articleTemplate(o);
            return o
          })
          out = _.sortBy(out,function(o) { return Date.parse(o.date) })
          out = _.map(out,'html').join("")

          fs.writeFileSync("out.html",out)
        }
    })
}
// function rendertimelineelement(article){
    // _.
// }

// scrapeIndex(0)

// var quoteStrings = ''
