/**
 * Created by work on 1/7/2017.
 */
function displayData(data){
    canvas.selectAll("*").remove();
    if(!data ){
        //canvas.selectAll("*").remove();
        return;
    }
    var nodes = tree.nodes(data); //runs tree layout and returns all objects in data in array form
    var links = tree.links(nodes); //returns an array of objects with a source and target property. source is source node

    var node = canvas.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";})

    var diagonal = d3.svg.diagonal();

    canvas.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#ADADAD")
        .attr("fill", "brown")
        .attr("d", diagonal);

    node.append("circle")
        .attr("r", 30)
        .attr("fill", function(data){
            if(typeof data.red === "undefined")
            {return "green";}
            else {
                if(data.red === true){
                    return "red";
                }
                else {
                    return "black";
                }
            }
        });

    node.append("text")
        .attr("text-anchor", "middle")
        .style('fill', 'white')
        .style("font-_size", "30px")
        .text(function (d) {return d.name;});

    d3.selectAll('link').on('mouseenter', function() {
        this.parentElement.appendChild(this);
    });



}