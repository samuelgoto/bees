var csv = require("fast-csv");

csv
 .fromPath("bees.csv")
 .on("data", function(data){
     console.log(data);
 })
 .on("end", function(){
     console.log("done");
 });
