function createMDSScatterplot(data_plot) {
        console.log("In MDS Scatterplot Function")
        // console.log("Variables Plot - ", variables_plot)

        // console.log("Data Plot x = ", data_plot['x'])
        // console.log("Data Plot y = ", data_plot['y'])
        // console.log("Data Plot labels = ", data_plot['labels'])

        // console.log("x min - ", Math.min(...data_plot['x']))
        // console.log("x max - ", Math.max(...data_plot['x']))
        // console.log("y min - ", Math.min(...data_plot['y']))
        // console.log("y max - ", Math.max(...data_plot['y']))


        const svgWidth = 600;
        const svgHeight = 600;
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;
        
        colors = d3.scaleOrdinal(d3.schemeCategory10);


        d3.select('#MDSscatterplot').remove();
        // Create a new container for the scatterplot

        let hh = d3.select("#graph-container").append("div")
                .attr("id", "MDSPlots")
                .attr("class", "bg-light row justify-content-evenly");

        let scatterContainer = d3.select("#MDSPlots").append("div")
            .attr("id", "MDSscatterplot")
            .attr("class", "bg-light m-3 col-5");
        
        // Create SVG for scatterplot
        const svg = d3.select('#MDSscatterplot')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");
        
        // Create scales for x and y axes
        const xScale = d3.scaleLinear()
        .domain([Math.min(...data_plot['x'])-2, Math.max(...data_plot['x'])+2])
        .range([-width / 2, width / 2]);

        const yScale = d3.scaleLinear()
            .domain([Math.min(...data_plot['y'])-2, Math.max(...data_plot['y'])+2])
            .range([height / 2, -height / 2]);

        // Create x and y axes with ticks of 1
        const xAxis = d3.axisBottom(xScale).ticks(20);
        const yAxis = d3.axisLeft(yScale).ticks(20);

        const right = d3.axisRight(yScale).ticks(20);
        const top = d3.axisTop(xScale).ticks(20);

        // Draw faint center lines through origin to the axes
        // Draw faint center lines through origin to the axes
        svg.append("line")
            .attr("x1", xScale(0))
            .attr("y1", -height / 2)
            .attr("x2", xScale(0))
            .attr("y2", height / 2)
            .attr("stroke", "lightgray")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "4");

        svg.append("line")
            .attr("x1", -width / 2)
            .attr("y1", yScale(0))
            .attr("x2", width / 2)
            .attr("y2", yScale(0))
            .attr("stroke", "lightgray")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "4"); 

        
        // Append x and y axes to the SVG
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height / 2 + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + (-width / 2) + ",0)")
            .call(yAxis);

        // Append right and top axes to the SVG
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + (-height / 2) + ")")
            .call(top);

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + (width / 2) + ",0)")
            .call(right);
            

        // Plot data points with random jittering
        svg.selectAll("circle")
            .data(data_plot['x']) // Bind the x data to the circles
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(d)) // Use the x data for the x coordinate
            .attr("cy", (d, i) => yScale(data_plot['y'][i])) // Use the y data for the y coordinate
            .attr("r", 4)
            .style("fill", (d, i) => colors(data_plot['labels'][i])); // Adjust color as needed

        svg.append('text')
            .attr('x', width / 10)
            .attr('y', height - 215)
            .attr('text-anchor', 'middle')
            .text('MDS 1');

        svg.append('text')  
            .attr('x', height / 2 - 230)
            .attr('y', margin.left/2 - 300)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('MDS 2');

        svg.append('text')
            .attr('x', width / 20 - 50)
            .attr('y', -278)
            .attr('text-anchor', 'middle')
            .text('MDS DATA SCATTERPLOT')
            .attr('font-size', '20px');
            
        svg.append("rect")
                .attr("x", -width/2 - 50)
                .attr("y", -height/2 - 50)
                .attr("width", width + 100)
                .attr("height", height + 100)
                .style("stroke", "black")
                .style("stroke-width",  "5px")
                .style("fill", "none");
    
}




function createVariableMDSPlot(variables_plot, X, clusterIDs) {
    console.log("In Variable MDS Plot Function");
    // console.log("Variables Plot - ", variables_plot);

    // console.log("Data Plot x = ", variables_plot['x']);
    // console.log("Data Plot y = ", variables_plot['y']);
    // console.log("Data Plot labels = ", variables_plot['labels']);

    // console.log("x min - ", Math.min(...variables_plot['x']));
    // console.log("x max - ", Math.max(...variables_plot['x']));
    // console.log("y min - ", Math.min(...variables_plot['y']));
    // console.log("y max - ", Math.max(...variables_plot['y']));

    const svgWidth = 600;
    const svgHeight = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    colors = d3.scaleOrdinal(d3.schemeCategory10);

    d3.select('#VariableMDSPlot').remove();
    // Create a new container for the scatterplot


    let scatterContainer = d3.select("#MDSPlots").append("div")
        .attr("id", "VariableMDSPlot")
        .attr("class", "bg-light m-3 col-5");

    // Create SVG for scatterplot
    const svg = d3.select('#VariableMDSPlot')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

    // Create scales for x and y axes
    const xScale = d3.scaleLinear()
        .domain([Math.min(...variables_plot['x']) - 0.1, Math.max(...variables_plot['x']) + 0.1])
        .range([-width / 2, width / 2]);

    const yScale = d3.scaleLinear()
        .domain([Math.min(...variables_plot['y']) - 0.1, Math.max(...variables_plot['y']) + 0.1])
        .range([height / 2, -height / 2]);

    // Create x and y axes with ticks of 1
    const xAxis = d3.axisBottom(xScale).ticks(20);
    const yAxis = d3.axisLeft(yScale).ticks(20);

    const right = d3.axisRight(yScale).ticks(20);
    const top = d3.axisTop(xScale).ticks(20);

    // Draw faint center lines through origin to the axes
    svg.append("line")
        .attr("x1", xScale(0))
        .attr("y1", -height / 2)
        .attr("x2", xScale(0))
        .attr("y2", height / 2)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4");

    svg.append("line")
        .attr("x1", -width / 2)
        .attr("y1", yScale(0))
        .attr("x2", width / 2)
        .attr("y2", yScale(0))
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4");

    // Append x and y axes to the SVG
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + (-width / 2) + ",0)")
        .call(yAxis);

    // Append right and top axes to the SVG
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (-height / 2) + ")")
        .call(top);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + (width / 2) + ",0)")
        .call(right);

    // Plot data points with random jittering
    svg.selectAll("circle")
        .data(variables_plot['x']) // Bind the x data to the circles
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(d)) // Use the x data for the x coordinate
        .attr("cy", (d, i) => yScale(variables_plot['y'][i])) // Use the y data for the y coordinate
        .attr("r", 6)
        .style("fill", 'orange') // Adjust color as needed
        .append("text")
        .attr("x", (d, i) => xScale(d)) // Use the x data for the x coordinate
        .attr("y", (d, i) => yScale(variables_plot['y'][i])) // Use the y data for the y coordinate with an offset of 10 pixels
        .text((d, i) => variables_plot['labels'][i]) // Set the text content to the label value
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "black");

    let labels = svg.selectAll(null)
        .data(variables_plot['x'])
        .enter()
        .append("text")
        .attr("x", (d, i) => xScale(d)) // Use the x data for the x coordinate
        .attr("y", (d, i) => yScale(variables_plot['y'][i])-10) // Use the y data for the y coordinate with an offset of 10 pixels
        .text((d, i) => variables_plot['labels'][i]) // Set the text content to the label value
        .attr("text-anchor", "middle")
        .attr("font-size", "15px")
        .attr("fill", "black");

    // svg.selectAll("text")
    //     .data(variables_plot['labels']) // Bind the labels data to the text elements
    //     .enter()
    //     .append("text")
    //     .attr("x", (d, i) => xScale(variables_plot['x'][i])) // Use the x data for the x coordinate
    //     .attr("y", (d, i) => yScale(variables_plot['y'][i])) // Use the y data for the y coordinate with an offset of 10 pixels
    //     .text((d, i) => d) // Set the text content to the label value
    //     .attr("text-anchor", "middle")
    //     .attr("font-size", "10px")
    //     .attr("fill", "black");

    svg.append('text')
        .attr('x', width / 10)
        .attr('y', height - 215)
        .attr('text-anchor', 'middle')
        .text('MDS 1');

    svg.append('text')
        .attr('x', height / 2 - 230)
        .attr('y', margin.left / 2 - 305)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('MDS 2');

    svg.append('text')
        .attr('x', width / 20 - 50)
        .attr('y', -280)
        .attr('text-anchor', 'middle')
        .text('MDS VARIABLES')
        .attr("font-size", "20px");

    // svg.append("rect")
    //     .attr("x", -width/2 - 50)
    //     .attr("y", -height/2 - 50)
    //     .attr("width", width + 100)
    //     .attr("height", height + 100)
    //     .style("stroke", "black")
    //     .style("stroke-width",  "5px")
    //     .style("fill", "none");

    d3.select("#VariableMDSPlot").style("border", "3px solid black");

    // Create a text field to store selected variables
    const textField = d3.select("#VariableMDSPlot")
        .append("input")
        .attr("type", "text")
        .attr("id", "selectedVariable")
        .attr("placeholder", "Selected Variables")
        .style("width", "100%");

    PCPVariables = [];
    
    // Function to handle click event on data points
    function dothandleClick(d, i) {
        const selectedVariable = d3.select("#selectedVariable");
        const circle = d3.select(this);

        if (selectedVariable.property("value").includes(variables_plot['labels'][i])) {
            // Remove variable from text field and change color back to original
            selectedVariable.property("value", selectedVariable.property("value").replace(variables_plot['labels'][i]+", ", ""));
            circle.style("fill", 'orange');
            PCPVariables.splice(PCPVariables.indexOf(variables_plot['labels'][i]), 1);
        } else {
            // Add variable to text field and change color to black
            selectedVariable.property("value", selectedVariable.property("value") + variables_plot['labels'][i] + ", ");
            circle.style("fill", "green");
            PCPVariables.push(variables_plot['labels'][i]);
        }

        // Remove any existing arrows
        svg.selectAll(".arrow").remove();
        d3.select("arrow").remove();

        // Iterate over PCPVariables
        for (let i = 0; i < PCPVariables.length - 1; i++) {
            let currentLabel = PCPVariables[i];
            let nextLabel = PCPVariables[i + 1];
            
            // Find corresponding dots for current and next labels
            let currentDot = svg.selectAll("circle").filter((d, i) => variables_plot['labels'][i] === currentLabel);
            let nextDot = svg.selectAll("circle").filter((d, i) => variables_plot['labels'][i] === nextLabel);

            // Ensure both currentDot and nextDot exist
            if (!currentDot.empty() && !nextDot.empty()) {
                // Draw arrow
                let arrow = svg.append("line")
                    .attr("class", "arrow")
                    .attr("x1", currentDot.attr("cx"))
                    .attr("y1", currentDot.attr("cy"))
                    .attr("x2", nextDot.attr("cx"))
                    .attr("y2", nextDot.attr("cy"))
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("marker-end", "url(#arrowhead)");

                // Attach arrowhead to the end of the line
                svg.append("defs").append("marker")
                    .attr("id", "arrowhead")
                    .attr("viewBox", "0 -7.5 15 15")
                    .attr("refX", 15)
                    .attr("refY", 0)
                    .attr("orient", "auto")
                    .attr("markerWidth", 15)
                    .attr("markerHeight", 15)
                    .append("path")
                    .attr("d", "M0,-7.5L15,0L0,7.5")
                    .attr("fill", "black");
            }
        }

    }


    // Add click event listener to data points
    svg.selectAll("circle")
        .on("click", dothandleClick);
 
    // Create a button to plot parallel coordinate plots
    const addAllbutton = d3.select("#VariableMDSPlot")
        .append("button")
        .attr("id", "addAllPCPBtn")
        .attr("class", "btn btn-primary m-1")
        .text("Add All Coordinates")
        .on("click", addAllVariables);
    
    const removeAllbutton = d3.select("#VariableMDSPlot")
        .append("button")
        .attr("id", "removeAllPCPBtn")
        .attr("class", "btn btn-danger m-1")
        .text("Remove all variables, PCP")
        .on("click", removeAllVariables);

    const plotbutton = d3.select("#VariableMDSPlot")
        .append("button")
        .attr("id", "plotPCPBtn")
        .attr("class", "btn btn-success m-1")
        .text("Plot Parallel Coordinates")
        .on("click", plotParallelCoordinates);

    // Function to plot parallel coordinate plots

    function addAllVariables(){
        variables_plot['labels'].forEach((variable) => {
            PCPVariables.push(variable);
        });
    
        // Change circle color to green
        svg.selectAll("circle")
            .style("fill", "green");
    
        // Fill in all variable names in the text field
        const textField = d3.select("#selectedVariable");
        textField.node().value = variables_plot['labels'].join(", ");

        // Remove any existing arrows
        svg.selectAll(".arrow").remove();
        d3.select("arrow").remove();

        // Iterate over PCPVariables
        for (let i = 0; i < PCPVariables.length - 1; i++) {
            let currentLabel = PCPVariables[i];
            let nextLabel = PCPVariables[i + 1];
            
            // Find corresponding dots for current and next labels
            let currentDot = svg.selectAll("circle").filter((d, i) => variables_plot['labels'][i] === currentLabel);
            let nextDot = svg.selectAll("circle").filter((d, i) => variables_plot['labels'][i] === nextLabel);

            // Ensure both currentDot and nextDot exist
            if (!currentDot.empty() && !nextDot.empty()) {
                // Draw arrow
                let arrow = svg.append("line")
                    .attr("class", "arrow")
                    .attr("x1", currentDot.attr("cx"))
                    .attr("y1", currentDot.attr("cy"))
                    .attr("x2", nextDot.attr("cx"))
                    .attr("y2", nextDot.attr("cy"))
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("marker-end", "url(#arrowhead)");

                // Attach arrowhead to the end of the line
                svg.append("defs").append("marker")
                    .attr("id", "arrowhead")
                    .attr("viewBox", "0 -7.5 15 15")
                    .attr("refX", 15)
                    .attr("refY", 0)
                    .attr("orient", "auto")
                    .attr("markerWidth", 15)
                    .attr("markerHeight", 15)
                    .append("path")
                    .attr("d", "M0,-7.5L15,0L0,7.5")
                    .attr("fill", "black");
            }
        }
    }
    
    function removeAllVariables(){
        if(PCPVariables.length > 0){
            PCPVariables = [];
        }
        
        // Change circle color to orange
        svg.selectAll("circle")
            .style("fill", "orange");
    
        // Clear the text field
        const textField = d3.select("#selectedVariable");
        textField.node().value = "";

        d3.select('#ParallelCoordinatesPlot').remove();

        svg.selectAll(".arrow").remove();
    }

    function plotParallelCoordinates() {
        const selectedVariables = d3.select("#selectedVariable").property("value").split("");
        // Sort selected variables in the order they were selected
        const sortedVariables = variables_plot['labels'].filter(variable => selectedVariables.includes(variable));


        GG = []
        X.forEach((row) => {
            arr = []
            PCPVariables.forEach((dimension) => {
                arr.push(row[variables_plot['labels'].indexOf(dimension)]);
            }); 
            GG.push(arr);
        });

        console.log("Selected Variables - ", PCPVariables);
        console.log("Data to PCP - ", GG);

        // Call createParallelCoordinatesPlot function with sorted variables
        createParallelCoordinatesPlot(GG, PCPVariables, clusterIDs);
    }
}





function createParallelCoordinatesPlot(X, allLabels, clusterIDs) {
    console.log("In Parallel Coordinates Plot Function");
    // console.log("X - ", X);
    // console.log("All Labels - ", allLabels);

    clusterIDs = clusterIDs['labels'];
    // console.log("Cluster IDs - ", clusterIDs);  

    const svgWidth = 1350;
    const svgHeight = 650;
    const margin = { top: 70, right: 20, bottom: 70, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const numDimensions = allLabels.length;

    // console.log("Variable labels - ", allLabels)

    // allLabels.forEach(dimension => {
    //     console.log("Dimension - ", dimension)
    // });
    // Calculate extent of each dimension
    const dimensionExtents = {};
    allLabels.forEach(dimension => {
        arr = []
        X.forEach((row) => {
            arr.push(row[allLabels.indexOf(dimension)]);
        });
        const extent = d3.extent(arr);
        // const extent = [Math.min(arr), Math.max(arr)]
        dimensionExtents[dimension] = [extent[0]-0.1*(extent[0]+1), extent[1]+0.1*(extent[1]+1)];
    });

    console.log("Dimension Extents - ", dimensionExtents)

    // Create scales
    const xScale = d3.scalePoint()
        .domain(allLabels)
        .range([0, width]);


    const yScales = {};
    allLabels.forEach(dimension => {
        yScales[dimension] = d3.scaleLinear()
            .domain(dimensionExtents[dimension])
            .range([height, 0]);
    });

    // console.log("Y Scales - ", yScales)

    // Create color scale for cluster IDs
    colorScale = d3.scaleOrdinal(d3.schemeCategory10)


    // Remove existing plot
    d3.select('#ParallelCoordinatesPlot').remove();

    // Create container for the plot
    const container = d3.select("#MDSPlots").append("div")
        .attr("id", "ParallelCoordinatesPlot")
        .attr("class", "bg-light m-1 col-11");

    // Create SVG for the plot
    const svg = container.append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Append axes to the SVG
    // Append axes to the SVG
    const axes = svg.selectAll(".axis")
    .data(allLabels)
    .enter()
    .append("g")
    .attr("class", "axis")
    .attr("transform", (d, i) => "translate(" + xScale(d) + ",0)")
    .each(function (d, i) {
        // Append axis label
        const offsetY = -10; // Alternate positioning up and down
        const axisGroup = d3.select(this);
        const axisYScale = yScales[d];
        const axisYRange = axisYScale.range();
        const labelYPosition = axisYRange[axisYRange.length - 1]; // Position at the top of the axis
        axisGroup.call(d3.axisLeft(yScales[d]))
            .append("text")
            .attr("class", "axis-label")
            .attr("y", offsetY)
            .attr("x", -15) // Adjust the x position as needed
            .attr("dy", ".71em")
            .attr("transform", "rotate(45)")
            .attr("y", labelYPosition-5) // Position the label at the top of the axis
            .text(d)
            .style("text-anchor", "end") // Adjust text-anchor if needed
            .style("fill", "black");
    });
    
    // Define line function 
    const line = d3.line()
        .x((d, i) => xScale(allLabels[i]))
        .y((d, i) => yScales[allLabels[i]](d));

    // Draw polylines for each data point
    const polylines = svg.selectAll(".polyline")
        .data(X)
        .enter()
        .append("path")
        .attr("class", "polyline")
        // Constructing the path using the line generator and data for each point
        .attr("d", (d, i) => line(allLabels.map(dim => d[allLabels.indexOf(dim)])))
        // Set fill to none to ensure only the stroke is visible
        .style("fill", "none")
        // Set stroke color based on cluster ID
        .style("stroke", (_,i) => colorScale(clusterIDs[i]))
        .style("stroke-width", 2)
        // Set opacity to 0.5
        .style("opacity", 0.2);

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height +55)
        .attr('text-anchor', 'middle')
        .text('PARALLEL COORDINATES PLOT')
        .attr("font-size", "25px");

    d3.select("#ParallelCoordinatesPlot").style("border", "3px solid black");



    
    // polylines.on("mouseover", function (d, i) {
    //     d3.select(this)
    //         // .style("stroke", colorScale(clusterIDs[i]))
    //         .style("stroke-width", 4)
    //         .style("opacity", 1);

        
    // })
    // .on("mouseout", function (d, i) {
    //     d3.select(this)
    //         .style("stroke-width", 2)
    //         .style("opacity", 0.1);
    // });

    polylines.on("mouseover", function (d, i) {
        d3.select(this)
            .style("stroke-width", 2)
            .style("opacity", 0.6);

        polylines.each(function (polyline, j) {
            if (clusterIDs[j] == clusterIDs[i]) {
                d3.select(this)
                    .style("stroke-width", 2)
                    .style("opacity", 0.6);
            }
            else{
                d3.select(this)
                    .style("stroke-width", 2)
                    .style("opacity", 0.0);
            }
        });
    })
    .on("mouseout", function (d, i) {
        d3.select(this)
            .style("stroke-width", 2)
            .style("opacity", 0.2);

        polylines.each(function (polyline, j) {
            if ((clusterIDs[j]) == (clusterIDs[i])) {
                d3.select(this)
                    .style("stroke-width", 2)
                    .style("opacity", 0.2);
            }
            else{
                d3.select(this)
                    .style("stroke-width", 2)
                    .style("opacity", 0.2);
            }
        });
    });

    let dimensions = [...allLabels]
    // Add interaction to reorder axes
    axes.on("click", function (d) {
        // dimensions = allLabels;   
        index = dimensions.indexOf(d);
        dimensions.splice(index, 1);
        dimensions.unshift(d);
        xScale.domain(dimensions);

        // Reorder data based on new dimensions order
        const reorderedX = X.map(dataPoint => {
            const reorderedDataPoint = {};
            dimensions.forEach(dim => {
                reorderedDataPoint[dim] = dataPoint[dimensions.indexOf(dim)];
            });
            return reorderedDataPoint;
        });

        // console.log("variables plot - ", allLabels)
        // console.log("MP in original at - ", allLabels.indexOf('MP'))
        XX = []
        X.forEach((row) => {
            arr = []
            dimensions.forEach((dimension) => {
                arr.push(row[allLabels.indexOf(dimension)]);
            }); 
            XX.push(arr);
        });

        // console.log("Reordered Xx - ", XX)
        // console.log("Reordered Dimensions - ", dimensions)

        // Define new yScales based on reordered dimensions
        const newYScales = {};
        dimensions.forEach(dimension => {
            newYScales[dimension] = d3.scaleLinear()
                .domain(dimensionExtents[dimension])
                .range([height, 0]);
        });

        const newxScale = d3.scalePoint()
            .domain(dimensions)
            .range([0, width]);

        // Define new line function 
        const newline = d3.line()
            .x((_, i) => newxScale(dimensions[i]))
            .y((d, i) => newYScales[dimensions[i]](d));

        svg.selectAll(".axis")
            .transition()
            .duration(500)
            .attr("transform", (d, i) => "translate(" + xScale(d) + ",0)");
        

        svg.selectAll(".polyline")
            .data(XX)
            .transition()
            .duration(500)
            .attr("d", d => {
                // const reorderedData = dimensions.map(dim => d[dim]);
                // console.log("Reordered Data - ", reorderedData)
                return newline(d);
            })
            .style("fill", "none")
            .style("stroke", (_,i) => colorScale(clusterIDs[i]))
            .style("opacity", 0.2);
    });


    KK = []
    const drag = d3.drag()
    .on("start", dragstart)
    .on("drag", dragmove)
    .on("end", dragend);

    axes.call(drag);

    function dragstart(d) {
        d3.select(this).raise().classed("active", true);
    }

    function dragmove(d) {
        const x = d3.event.x;
        const newX = Math.max(0, Math.min(width, x)); // Restrict movement within xScale range
        d3.select(this).attr("transform", `translate(${newX}, 0)`);

        // Update axes positions
        svg.selectAll(".axis")
        .attr("transform", function(axisDimension) {
            if (axisDimension === d) return `translate(${newX},0)`;
            return d3.select(this).attr("transform");
        });

        // // Update polylines
        // svg.selectAll(".polyline")
        //     .attr("d", function(dataPoint) {
        //         return line(dimensions.map(dim => dataPoint[dimensions.indexOf(dim)]));
        // });
    }

    function dragend(d) {
        const newX = d3.event.x;
    
        // Find the nearest index where the dragged axis should be placed
        let newIndex = 0;
        let minDistance = Math.abs(newX - xScale(dimensions[0])); // Initial minimum distance
    
        dimensions.forEach((dim, index) => {
            const distance = Math.abs(newX - xScale(dim));
            if (distance < minDistance) {
                minDistance = distance;
                newIndex = index;
            }
        });
    
        // Remove the dragged dimension from its current position
        const currentIndex = dimensions.indexOf(d);
        dimensions.splice(currentIndex, 1);
    
        // Insert the dragged dimension at the new position
        dimensions.splice(newIndex, 0, d);
        xScale.domain(dimensions); // Update xScale with new dimensions
        

        console.log("Rerodered dim afetr dragging - ", dimensions)

        KK = []      
        X.forEach((row) => {
            arr = []
            dimensions.forEach((dimension) => {
                arr.push(row[allLabels.indexOf(dimension)]);
            }); 
            KK.push(arr);
        });
        console.log("KK - ", KK)

        svg.selectAll(".axis")
            .transition()
            .duration(500)
            .attr("transform", (d, i) => "translate(" + xScale(d) + ",0)");
        
        // Update axes positions
        const newYScales = {};
        dimensions.forEach(dimension => {
            newYScales[dimension] = d3.scaleLinear()
                .domain(dimensionExtents[dimension])
                .range([height, 0]);
        });

        const newxScale = d3.scalePoint()
            .domain(dimensions)
            .range([0, width]);

        // Define new line function 
        const newline = d3.line()
            .x((_, i) => newxScale(dimensions[i]))
            .y((d, i) => newYScales[dimensions[i]](d));


        svg.selectAll(".polyline")
            .data(KK)
            .transition()
            .duration(500)
            .attr("d", d => {
                return newline(d);
            })
            .style("fill", "none")
            .style("stroke", (_,i) => colorScale(clusterIDs[i]))
            .style("opacity", 0.2);
            
        d3.select(this).classed("active", false);
    }
    
    
    


    
}





