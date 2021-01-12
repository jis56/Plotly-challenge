//global variable
var data;

//init function to fill in the select option

function init() {
  d3.json("data/samples.json").then(incomingData => {
    data = incomingData;
    var selectValues = incomingData.names;

    var selectOpt = d3.select("#selDataset");

    selectValues.forEach(value => {
      selectOpt
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
  });
}


init();

//functions to clean and create bacteria/ouid lists
function fixBacteria(name) {
    var listBacteria = [];
  
    for (var i = 0; i < name.length; i++) {
      var stringName = name[i].toString();
      var splitValue = stringName.split(";");
      if (splitValue.length > 1) {
        listBacteria.push(splitValue[splitValue.length - 1]);
      } else {
        listBacteria.push(splitValue[0]);
      }
    }
    return listBacteria;
  }
  
  function fixOuid(name) {
    var listOuid = [];
    for (var i = 0; i < name.length; i++) {
      listOuid.push(`OTU ${name[i]}`);
    }
    return listOuid;
  }



