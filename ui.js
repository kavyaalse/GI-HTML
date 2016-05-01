//This file will have the UI related js functions

var agentPlantA = {
  properties : [
    {
      name: "Plant Height",
      value: ["TT", "Tt", "tt"],
    }, 
    {
      name: "Seed Color",
      value: ["YY", "Yy", "yy"]
    },
    {
      name: "Seed Shape",
      value: "null"
    },
    {
      name: "Flower Color",
      value: "null"
    }
  ],
  behaviour : [
    "Growth in Height"
  ]

};

$( document ).ready(function() {

    $( "#addAgentButton" ).click(function() {
        $( "#addAgentDialog" ).html("<fieldset><input type=\"checkbox\" name=\"selectAgent\" id=\"selectedPlantA\" value=\"plantA\" /> Plant A <br /><input type=\"checkbox\" name=\"selectAgent\" id=\"selectedPlantB\" value=\"plantB\" /> Plant B <br /> </fieldset>");
        $( "#addAgentDialog" ).dialog({
        dialogClass: "no-close",
        resizable: true,
        modal: true,
        title: "Select Agents",
        buttons: [
          {
            text: "OK",
            click: function() {
              $( this ).dialog( "close" );
            }
          }
        ],
        open: function(event, ui) {
        $(this).parent().css('position','fixed');
        }
      });
        $( "#addAgentDialog" ).dialog(open);
    });

    if ($('#selectedPlantA').is(':checked')) {
      $( "#addAgentA" ).html("");
    }

});


    
