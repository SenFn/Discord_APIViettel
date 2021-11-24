let jsonGet = ["1","2"];

jsonGet.push("asd");//addlast
jsonGet.shift();//remove first

json_string = JSON.stringify(jsonGet); //to json for save


var fs = require('fs');
fs.writeFileSync("./queue.json", json_string, function(err) {
    if (err) {
        console.log(err);
    }
});
console.log(json_string)

let jsonRead = require("./queue.json"); //string to Json for read

console.log(jsonRead[0])
//eyJpdiI6IlJiaW1rQ0Z3bzQzakNob0NSWExlT3c9PSIsInZhbHVlIjoiMHpPQndyTGJ2cCt6SDJnUVZDVnVlaHNRRTJJbEFRbldKQzJYWDhXZ1J0OTRNaGpHbUIrSFwvRDVYRU04SXkzNDQiLCJtYWMiOiI3NWI0NTk3OWY0Yzg0NzdkMmM4ZWM1OWViZmRkZTYyY2Y1NmZmY2U5MDA0M2NiNjVlNjQ5YmM3Y2QwZjg4NmM4In0%3D