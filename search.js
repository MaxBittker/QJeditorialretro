"use strict"
let fs = require('fs')
let _ = require('lodash')
const data = JSON.parse(fs.readFileSync('output.js'))
console.log(data.length)


function search(keywords){

  let re = new RegExp(keywords.join("|"),"i");
  let o = data.filter(entry=>re.test(entry.content))
  let mapped = o.map(entry=>{
    let d = new Date(entry.date)
    let yr = d.getFullYear()
    return {title:entry.title,
            year:yr}
    })
  let grouped = _.groupBy(mapped,entry=>entry.year)
  console.log(grouped)
}

// search(["mental health", "anxiety"])
// search(["race", "racism"])
