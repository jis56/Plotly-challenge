var data;

//function to create gauge chart based on selected value
function gaugeChart(valueSelect) {
    var filteredValue = data.metadata.filter(value => value.id == valueSelect);
    var weeklyFreq = filteredValue[0].wfreq;
  
    var bubbleData = [
      {
        type: "indicator",
        mode: "gauge",
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
        gauge: {
          axis: {
            range: [0, 9],
            tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            ticks: "outside"
          },
        bordercolor: "gray",
        steps: [
            { range: [0, 1], color: "#F1F8E9"},
            { range: [1, 2], color: "#D5F5E3" },
            { range: [2, 3], color: "#ABEBC6" },
            { range: [3, 4], color: "#82E0AA" },
            { range: [4, 5], color: "#58D68D" },
            { range: [5, 6], color: "#27AE60" },
            { range: [6, 7], color: "#229954" },
            { range: [7, 8], color: "#1E8449" },
            { range: [8, 9], color: "#196F3D" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 1,
            value: weeklyFreq
          }
        }
      }
    ];
  
    var layout = { 
    width: 600, 
    height: 500,
    //margin: { t: 0, b: 0 } 
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "black", family: "Arial" }
    };
    
    Plotly.newPlot("gauge", bubbleData, layout);
  }