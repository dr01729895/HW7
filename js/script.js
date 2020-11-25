/* 
    File: /domenic_ruocco_hw7/js/script.js
    Assignment: HW5
    Domenic Ruocco, UML Comp Sci, druocco@cs.uml.edu
    Course: 91.61 GUI Programming I
    Copyright (c) 2020 by Domenic Ruocco. All rights reserved.
*/

//Added new rules for checking if numbers are correct
jQuery.validator.addMethod("lessthan", function(value, element, tester) {
    return this.optional(element) || Number(value) <= Number($(tester).val());
});

jQuery.validator.addMethod("greaterthan", function(value, element, tester) {
    return this.optional(element) || Number(value) >= Number($(tester).val());
});

//jQuery Validator functions
$("#InputForm").validate({
    rules: {
        MinCol: {
            required: true,
            lessthan: "#MaxCol"
        },
        MaxCol: {
            required: true,
            greaterthan: "#MinCol"
        },
        MinRow: {
            required: true,
            lessthan: "#MaxRow"
        },
        MaxRow: {
            required: true,
            greaterthan: "#MinRow"
        }
    },
    messages: {
        MinCol: {
            required: "Please enter a valid number.",
            lessthan: "Number entered is too big."
        },
        MaxCol:  {
            required: "Please enter a valid number.",
            greaterthan: "Number entered is too small."
        },
        MinRow:  {
            required: "Please enter a valid number.",
            lessthan: "Number entered is too big."
        },
        MaxRow:  {
            required: "Please enter a valid number.",
            greaterthan: "Number entered is too small."
        },
    }
});

function genTable(MinCol, MaxCol, MinRow, MaxRow, TableName){

    if ($("#InputForm").valid()){

        //Clear old table
        var multTable = document.getElementById(TableName);
        while(multTable.hasChildNodes()){
            multTable.removeChild(multTable.firstChild);
        }

        //Create Rows Header
        var rowHeader = document.createElement("tr");
        rowHeader.appendChild(document.createElement("td"));
        rowHeader.firstChild.id = "test";
        for(var i = MinCol; i <= MaxCol; i++){
            var HeaderBox = document.createElement("td");
            HeaderBox.id = "Header";
            var HeaderNum = document.createTextNode(i);
            HeaderBox.appendChild(HeaderNum);
            rowHeader.appendChild(HeaderBox);
        }
        multTable.appendChild(rowHeader);

        //Make Table
        for(var i = MinRow ; i <= MaxRow; i++ ){
            var row = document.createElement("tr");
            var HeaderBox = document.createElement("td");
            HeaderBox.id = "Header";
            var HeaderNum = document.createTextNode(i);
            HeaderBox.appendChild(HeaderNum);
            row.appendChild(HeaderBox);
            //Make Columns
            for( var j = MinCol; j <= MaxCol; j++ ){
                var box = document.createElement("td");
                var num = document.createTextNode(i*j);
                box.appendChild(num);
                row.appendChild(box);
            }
            multTable.appendChild(row);
        }
    }
}

genTable(1,10,1,10, "MultTable-1");

//Adapted to jQuery
$("#Submit").click(function(){
    addTab();

    genTable(
        Number($("#MinCol").val()), 
        Number($("#MaxCol").val()), 
        Number($("#MinRow").val()), 
        Number($("#MaxRow").val()),
        "MultTable-" + tabCounter
    );
    tabCounter++;

});

$("#InputForm").keyup(function(){
    $("#InputForm").valid();
});

$("#MinMaxColSlider").slider({
    range: true,
    min: -50,
    max: 50,
    values: [ 1, 10 ],
    slide: function( event, ui ) {
        Number($("#MinCol").val( ui.values[0] ));
        Number($("#MaxCol").val( ui.values[1] ));
        genTable(
            Number($("#MinCol").val()), 
            Number($("#MaxCol").val()), 
            Number($("#MinRow").val()), 
            Number($("#MaxRow").val()),
            "MultTable-" + getTable()
        );
        updaterange(getTable());
    }
});

$("#MinMaxRowSlider").slider({
    range: true,
    min: -50,
    max: 50,
    values: [ 1, 10 ],
    slide: function( event, ui ) {
        Number($("#MinRow").val( ui.values[0] ));
        Number($("#MaxRow").val( ui.values[1] ));
        genTable(
            Number($("#MinCol").val()), 
            Number($("#MaxCol").val()), 
            Number($("#MinRow").val()), 
            Number($("#MaxRow").val()),
            "MultTable-" + getTable()
        );
        updaterange(getTable());
    }
});

$("#MinCol").on("change", function(){
    min = Number($("#MinCol").val());
    max = Number($("#MaxCol").val());

    if(min < -50)
        min = -50;
        
    if(min > max)
        min = max;
    
    $("#MinCol").val(min);
    $("#MinMaxColSlider").slider({
        values: [min, max]
    });
    genTable(
        Number($("#MinCol").val()), 
        Number($("#MaxCol").val()), 
        Number($("#MinRow").val()), 
        Number($("#MaxRow").val()),
        "MultTable-" + getTable()
    );
    updaterange(getTable());
});

$("#MaxCol").on("change", function(){
    min = Number($("#MinCol").val());
    max = Number($("#MaxCol").val());
    
    if(max > 50)
        max = 50;

    if(max < min)
        max = min;

    $("#MaxCol").val(max);
    $("#MinMaxColSlider").slider({
        values: [min, max]
    });
    genTable(
        Number($("#MinCol").val()), 
        Number($("#MaxCol").val()), 
        Number($("#MinRow").val()), 
        Number($("#MaxRow").val()),
        "MultTable-" + getTable()
    );
    updaterange(getTable());
});

$("#MinRow").on("change", function(){
    min = Number($("#MinRow").val());
    max = Number($("#MaxRow").val());

    if(min < -50)
        min = -50;
        
    if(min > max)
        min = max;
    
    $("#MinRow").val(min);
    $("#MinMaxRowSlider").slider({
        values: [min, max]
    });
    genTable(
        Number($("#MinCol").val()), 
        Number($("#MaxCol").val()), 
        Number($("#MinRow").val()), 
        Number($("#MaxRow").val()),
        "MultTable-" + getTable()
    );
    updaterange(getTable());
});

$("#MaxRow").on("change", function(){
    min = Number($("#MinRow").val());
    max = Number($("#MaxRow").val());
    
    if(max > 50)
        max = 50;

    if(max < min)
        max = min;

    $("#MaxRow").val(max);
    $("#MinMaxRowSlider").slider({
        values: [min, max]
    });
    genTable(
        Number($("#MinCol").val()), 
        Number($("#MaxCol").val()), 
        Number($("#MinRow").val()), 
        Number($("#MaxRow").val()),
        "MultTable-" + getTable()
    );
    updaterange(getTable());
});

var tabs = $("#tabs").tabs();

var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' >X</span><input type='checkbox' id='{href}-close'></li>";

var tabCounter = 2;

function addTab() {

    var MinCol = Number($("#MinCol").val());
    var MaxCol = Number($("#MaxCol").val());
    var MinRow = Number($("#MinRow").val());
    var MaxRow = Number($("#MaxRow").val());

    var label = "Table " + tabCounter;
    var id = "tabs-" + tabCounter;
    var li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
    var tabContent = "<table> <tbody data-range1='" + MinCol + "' data-range2='" + MaxCol + "' data-range3='" + MinRow + "' data-range4='" + MaxRow + "' id='MultTable-" + tabCounter + "'></tbody></table>";

    tabs.find(".ui-tabs-nav").append(li);
    tabs.append("<div id='" + id + "'>" + tabContent + "</div>");
    tabs.tabs("refresh");

}

function getTable(){
    var tabchilds = document.getElementById("tabs").childNodes;  
    for(var i=0;i<tabchilds.length;i++){
        if(tabchilds[i].tagName == "DIV"){
            if(tabchilds[i].getAttribute("aria-hidden") == "false"){          
                return tabchilds[i].id.slice(5);
            }
        }
    } 
}

tabs.on( "click", "span.ui-icon-close", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    tabs.tabs( "refresh" );
    
});


$("#DelSelected").click(function(){
    
    var checked = $( "input:checked" ).closest( "li" );

    for(var i=0;i<checked.length;i++){
        var panelId = checked[i].remove();
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    }

});


$( "#tabs" ).on( "tabsactivate", function( event, ui ) {
    setinput( ui.newTab.context.id.slice(6) );
} );


function setinput(num){

    var MinCol = Number($("#MultTable-" + num).attr('data-range1'));
    var MaxCol = Number($("#MultTable-" + num).attr('data-range2'));
    var MinRow = Number($("#MultTable-" + num).attr('data-range3'));
    var MaxRow = Number($("#MultTable-" + num).attr('data-range4'));

    $("#MinCol").val(MinCol); 
    $("#MaxCol").val(MaxCol); 
    $("#MinRow").val(MinRow); 
    $("#MaxRow").val(MaxRow);

    $("#MinMaxColSlider").slider({
        values: [MinCol, MaxCol]
    });
    $("#MinMaxRowSlider").slider({
        values: [MinRow, MaxRow]
    });

}



function updaterange(num){

    $("#MultTable-" + num).attr('data-range1', Number($("#MinCol").val()));
    $("#MultTable-" + num).attr('data-range2', Number($("#MaxCol").val()));
    $("#MultTable-" + num).attr('data-range3', Number($("#MinRow").val()));
    $("#MultTable-" + num).attr('data-range4', Number($("#MaxRow").val()));

}
