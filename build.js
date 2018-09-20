var csv = require("fast-csv");

async function main() {
 let sets = {};

 await new Promise(function(resolve, reject) {
   csv.fromPath("bees.csv")
    .on("data", function(data){
      let subspecies = data[5];
      if (subspecies == -1) {
       return;
      }
      // console.log(data);
      let image = {
       "@type": "Image",
       "url": `images/${data[0]}`,
       "date": data[1],
       "time": data[2],
       "location": data[3]
      };
      sets[subspecies] = sets[subspecies] || [];
      sets[subspecies].push(image);
      // result.entries.push(image);
      // resolve();
     })
    .on("end", function(){
      // console.log("done");
      resolve();
     });
 });

 let result = {
  "@context": "https://code.sgo.to/datasets/",
  "@type": "Dataset",
  "name": "Annotated Honey Bee Images",
  "url": "https://code.sgo.to/bees/index.jsonld",
  "description": "The kaggle honey bee dataset in JSON-LD",
  "entries": []
 };

 for (let subspecies in sets) {
  // console.log(subspecies);
  let entry = {
   "@type": "Entry",
   "@id": encodeURIComponent(subspecies),
   "name": subspecies,
   "examples": sets[subspecies]
  };
  result.entries.push(entry);
 }

 console.log(JSON.stringify(result, undefined, 2));
}

main();