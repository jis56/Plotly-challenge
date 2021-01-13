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
};
  

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

//changing plots and demographic info based on selected data
d3.selectAll("#selDataset").on("change", plotFunctions);

function plotFunctions() {
  var valueSelect = d3.select("#selDataset").node().value;
  console.log(valueSelect);
  demographicInfo(valueSelect);
  barChart(valueSelect);
  bubbleChart(valueSelect);
  gaugeChart(valueSelect);
};

function demographicInfo(valueSelect) {
    var filteredValue = data.metadata.filter(value => value.id == valueSelect);

    var panel = d3.select(".panel-body");
    panel.html("");
    panel.append("p").text(`ID: ${filteredValue[0].id}`);
    panel.append("p").text(`Ethnicity: ${filteredValue[0].ethnicity}`);
    panel.append("p").text(`Gender: ${filteredValue[0].gender}`);
    panel.append("p").text(`Age: ${filteredValue[0].age}`);
    panel.append("p").text(`Location: ${filteredValue[0].location}`);
    panel.append("p").text(`Bbtype: ${filteredValue[0].bbtype}`);
    panel.append("p").text(`Wfreq: ${filteredValue[0].wfreq}`);
    }

function barChart(valueSelect) {
  var filteredValue = data.samples.filter(value => value.id == valueSelect);
  var ouid = filteredValue.map(d => d.otu_ids);
  ouid = fixOuid(ouid[0].slice(0, 10));
  var valueX = filteredValue.map(d => d.sample_values);
  valueX = valueX[0].slice(0, 10);

  var otu_label = filteredValue.map(d => d.otu_labels);
  var names = fixBacteria(otu_label[0]).slice(0, 10);
  console.log(ouid);
  console.log(valueX);
  console.log(otu_label);
  console.log(names);

  var trace = {
    x: valueX,
    y: ouid,
    text: names,
    type: "bar",
    orientation: "h"
  };

  var layout = {
    yaxis: {
      autorange: "reversed"
    }
  };

  var dataV = [trace];

  Plotly.newPlot("bar", dataV, layout);
}


function bubbleChart(valueSelect) {
  var filteredValue = data.samples.filter(value => value.id == valueSelect);
  var ouid = filteredValue.map(d => d.otu_ids);
  ouid = ouid[0];
  var yValue = filteredValue.map(d => d.sample_values);
  yValue = yValue[0];

  var otu_label = filteredValue.map(d => d.otu_labels);
  otu_label = fixBacteria(otu_label[0]);

  var trace1 = {
    x: ouid,
    y: yValue,
    mode: "markers",
    marker: {
      color: ouid,
      size: yValue
    },
    text: otu_label
  };

  var data2 = [trace1];

  var layout = {
    showlegend: false,
    xaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bubble", data2, layout);
}


