"use strict"
let _ = require("lodash")
let d3 = require("d3")
let data = require("./output.js")


const blanks = _.map(_.range(2004, 2016), yr => {
  return {
    year: yr,
    count: 0
  }
})
var drawn = false

function search(keywords) {

  let re = new RegExp(keywords.join("|"), "i");
  let o = data.filter(entry => re.test(entry.content))
  let mapped = o.map(entry => {
    let d = new Date(entry.date)
    let yr = d.getFullYear()
    return {
      title: entry.title,
      url: entry.url,
      year: yr
    }
  })
  let grouped = _.groupBy(mapped, entry => entry.year)
  console.log(grouped)
  let html = _.map(grouped, (year => yearComponent(year)))
  document.getElementById("results").innerHTML = html.join("")

  graph(_.map(grouped, yearObj => {
    return {
      year: yearObj[0].year,
      count: yearObj.length
    }
  }))
}

// function buttonHandle(){
//   let input = document.getElementById("kw").value;
//   search(input.split(",").map(word=>word.trim()))
// }

function yearComponent(yearObj) {
  let str = "<h5>" + yearObj[0].year + "</h5>"
  str += yearObj.map(ed => editorialComponent(ed)).join("<br>")
  return str
}

function editorialComponent(ed) {
  let str = "<a href=http://www.queensjournal.ca/" + ed.url + ">" + ed.title + "</a>"
  return str
}

function graph(data) {
  data = _.unionWith(data, blanks, (a, b) => a.year === b.year).sort((a, b) => a.year - b.year)

  let bars = d3.select(".chart")
    .selectAll("div")
    .data(data);

  bars.enter().append("div");
  bars.style("width", function(d) {
      return d.count * 20 + "px";
    })
    .text(function(d) {
      return d.year;
    });
  bars.exit().remove()

}

document.getElementById("btn").addEventListener("click", function() {
  let input = document.getElementById("kw").value;
  let words = _.filter(input.split(",").map(word => " " + word.trim() + " "), word => word !== "")
  search(words)
});
