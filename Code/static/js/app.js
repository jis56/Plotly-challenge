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

//
