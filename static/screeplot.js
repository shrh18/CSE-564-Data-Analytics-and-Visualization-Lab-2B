let elbowIndex = 4;
let Kmeans = 0;
let idi = 0;



function plotkMeansMSE(kMeansMSE) {
    rectColor = 'steelblue'
    // Clear the existing scree plot
    const svgWidth = 600;
    const svgHeight = 600;
    const margin = { top: 10, right: 20, bottom: 60, left: 100 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const kk = d3.select('#graph-container').remove();
    let barGraphContainer = d3.select("#chart").append("div")
                                .attr("id","graph-container")
                                .attr("class", "bg-light m-3");

    let hh = d3.select("#graph-container").append("div")
                .attr("id", "KMeansMSECol")
                .attr("class", "bg-light row justify-content-evenly"); 

    let ll = d3.select("#KMeansMSECol").append("div")
                .attr("id", "kMeansMSE")
                .attr("class", "bg-light m-1 col-5")                        

    const svg = d3.select('#kMeansMSE')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Use a linear scale for the y-axis
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(kMeansMSE)+2])
        .range([height, 30]);

    // Use a band scale for the x-axis
    var xScale = d3.scaleBand()
        .domain(d3.range(1, kMeansMSE.length+1))
        .range([0, width])
        .padding(0.1);

    // Create X and Y axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).tickValues(d3.range(0, d3.max(kMeansMSE)+2), 4); // Format ticks as desired, .2s will use SI-prefix formatting

    // Append X and Y axes to the SVG
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 20)
        .attr("x", 0)
        .attr("dy", ".35em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");

    svg.append("g")
        .call(yAxis);

    // Create a bar chart for eigenvalues
    var barChart = svg.selectAll('rect')
        .data(kMeansMSE)
        .enter().append('rect')
        .attr('id', 'myGroup')
        .attr('x', function (d, i) { return xScale(i+1); })
        .attr('y', function (d) { return yScale(d); })
        .attr('width', xScale.bandwidth())
        .attr('height', function (d) { return height - yScale(d); })
        .attr('fill', function (d,i){ 
            if(i==elbowIndex){
                Kmeans = 5;
                if(idi == 0){
                    idi = 5
                }
                biplot(idi, Kmeans);
                console.log("Biplot called");
                return 'orange';
            }
            else{
                return 'steelblue'
            }
            });

    // Add labels and title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom-10)
        .attr('text-anchor', 'middle')
        .text('K Value of Clusters');

    svg.append('text')
        .attr('x', -height / 2)
        .attr('y', margin.left/2 - 85)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Mean Squared Errors');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('K-MEANS MEAN SQUARED ERRORS');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 60)
        .attr('text-anchor', 'middle')
        .text('(red dot represents elbow point)');


    svg.append("circle")
        .attr("cx", xScale(4 + 1) + xScale.bandwidth() / 2)
        .attr("cy", yScale(kMeansMSE[4]))
        .attr("r", 5)
        .attr("fill", "red");
    
    // Add interaction element (e.g., click event for selecting intrinsic dimensionality)
    barChart.on('click', function (d, i) {
        // Implement your logic for handling the click event   
        var currentColor = d3.select(this).attr('fill');
        
        barChart.attr('fill', 'steelblue')

        // Change fill color to orange if currently steelblue
        d3.select(this).attr('fill', 'orange');
        console.log('Selected k ' + (i+1));
        console.log("value is - " + kMeansMSE[i]);
        // showTooltip(svg, i, eigenvalues);
        // showTooltip(d3.select('#EigenBars'), i, eigenvalues);
        Kmeans = i+1;
        idi = 4+1;
        biplot(idi, Kmeans)

    });

    svg.append("rect")
        .attr("x", 0-80)
        .attr( "y", 0-5)
        .attr("width", svgWidth-20) // Adjusted width
        .attr("height", svgHeight-5) // Adjusted height
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 2);

    
    
}

function biplot(idi, k){
    console.log("In Biplot Function")
    $('#loader').show();
    $.ajax({
        url: '/biplot',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
                              'kMean': k
                            }),
        dataType: 'json',                          
        success: function(response){
          console.log("In Success Part of Biplot")
          console.log(response)
        //   updateBiplot(response["data"], response["scores"], response["loadings"], response["components"], response["eigenvalues"], response["explained_variance_ratio"], response["IDIval"], response["featureNames"], response["labels"]);
            //   LoadingsTable(response["AllFeatures"], response["loadings"], response["knee"], response["sumofSqLoadings"])
            //   updateScatterplotMatrix(response["top4Data"], response["featureNames"], response["labels"])
        createMDSScatterplot(response["data_plot"]);
        createVariableMDSPlot(response["variables_plot"], response["X"], response["data_plot"]);

        if (document.getElementById('ParallelCoordinatesPlot') != null) {
            const polylines = document.querySelectorAll('.polyline');
            colorScale = d3.scaleOrdinal(d3.schemeCategory10);

            polylines.forEach((polyline, index) => {
                const clusterId = response['data_plot']['labels'][index];
                const color = colorScale(clusterId);
                polyline.style.stroke = color;
            });

            document.getElementById('MDSPlots').appendChild(document.getElementById('ParallelCoordinatesPlot'));
        }

        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log('AJAX Error:', textStatus, errorThrown);
          console.log(jqXHR.responseText); // Log the detailed error response
        },
        complete: function(){
            // Hide loader when the AJAX request is complete (whether it was successful or not)
            $('#loader').hide();
        }
    });
}








