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
        $('.view-content h2 a').each(function (i, elem) {
            c++
            scrapeArticle($(this).prop('href'), i)
        })

        if (i <= 64) scrapeIndex(i + 1)
    })
}

function scrapeArticle(url, i) {
    request(baseUrl + url, function (err, res, bod) {
        if (err) {
            throw err
        }
        if (res !== 200 || !bod) {
            console.log(url + " FAILED !!!!!!!!!!!")
            return
        }
        let $ = cheerio.load(bod)
        let title = $('#content h1').text()
        let date = $('#content .date').text()
        let content = $('#content .field-items p').map(function (i, el) {
            return $(this).text()
        }).get().toString()
        ArticleInfo.push({
            title, date, content
        })
        c--
        if (c === 0 && i === 64) {
            fs.writeFile("output.js", JSON.serialize(ArticleInfo), (error) => {
                if (err) throw err
            })
        }
    })
}

scrapeIndex(0)