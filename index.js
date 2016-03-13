"use strict"
function search(keywords){

  let re = new RegExp(keywords.join("|"),"i");
  let o = data.filter(entry=>re.test(entry.content))
  let mapped = o.map(entry=>{
    let d = new Date(entry.date)
    let yr = d.getFullYear()
    return {title:entry.title,
            url:entry.url,
            year:yr}
    })
  let grouped = _.groupBy(mapped,entry=>entry.year)
  console.log(grouped)
  let html = _.map(grouped,(year=>yearComponent(year)))
  document.getElementById("results").innerHTML = html.join("")
}

function buttonHandle(){
  let input = document.getElementById("kw").value;
  search(input.split(",").map(word=>word.trim()))
}

function yearComponent(yearObj){
  let str = "<h5>"+yearObj[0].year+"</h5>"
  str += yearObj.map(ed=>editorialComponent(ed)).join("<br>")
  return str
}
function editorialComponent(ed){
  let str = "<a href=http://www.queensjournal.ca/"+ed.url +">"+ed.title+"</a>"
  return str
}
