'use strict'
var fs = require('fs')
let cheerio = require('cheerio')
let request = require('request')

const baseUrl = 'http://www.queensjournal.ca/'
let c = 0
let ArticleInfo = []

function scrapeIndex(i) {
    console.log("scraping " + i)

    request(baseUrl + "editorials/?page=" + i, function (err, res, bod) {
        if (err) {
            throw err
        }

        let $ = cheerio.load(bod);
        $('.view-content h2 a').each(function (index, elem) {
            c++
            scrapeArticle($(this).prop('href'), i)
        })

        if (i < 64) scrapeIndex(i + 1)
    })
}

function scrapeArticle(url, index) {
    request(baseUrl + url, function (err, res, bod) {
        if (err) {
            throw err
        }
        if (res.statusCode !== 200 || !bod) {
            console.log(url + res.statusCode + " FAILED !!!!!!!!!!!")
            return
        }
        let $ = cheerio.load(bod)
        let title = $('#content h1').text()
        let date = $('#content .date').text()
        let content = $('#content .field-items p').map(function (i, el) {
            return $(this).text()
        }).get().toString()
        ArticleInfo.push({
            title, url, date, content
        })
        c--
        console.log(c,index,title)
        if (c === 0 && index === 64) {
            fs.writeFile("output.js","var data = "+ JSON.stringify(ArticleInfo), (error) => {
                if (err) throw err
            })
        }
    })
}

scrapeIndex(0)
