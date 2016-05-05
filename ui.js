//This file will have the UI related js functions
var agentA = {
  name: "Plant A",
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
    "Growth in Height", "Number of Plants"
  ]
};

var agentB = {
  name: "Plant B",
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
    "Growth in Height", "Number of Plants"
  ]
};

var rules = ["When TTYY do tall, green", "When ttyy do short, yellow", "When TtYy do 9, 3, 3, 1 "]
$( document ).ready(function() {

    $("#menu4").css('visibility','hidden');
    $("#menu5").css('visibility','hidden');
    $("#menu6").css('visibility','hidden');
    /*$("#menu7").css('visibility','hidden');*/


    $( "#addAgentButton" ).click(function() {
        $( "#addAgentDialog" ).html("<fieldset><input type=\"checkbox\" name=\"selectAgent\" id=\"selectedAgentA\" value=\"plantA\" /> Plant A <br /><input type=\"checkbox\" name=\"selectAgent\" id=\"selectedAgentB\" value=\"plantB\" /> Plant B <br /> </fieldset>");
        $( "#addAgentDialog" ).dialog({
                dialogClass: "no-close",
                resizable: true,
                modal: true,
                title: "Select Agents",
                buttons: [
                  {
                    text: "OK",
                    click: function() {

                      if ($('#selectedAgentA').is(':checked')) {
                        //If Agent A is selected from the text box, display the Agent A block of properties and behaviours
                            console.log("Yeh kya hua?");
                            var temp_text = "<p> Agent :" + agentA.name + "<br/> Properties: </p> <fieldset id=\"agentAproperty\">" +
                                    "<input type=\"checkbox\" name=\"agentAproperty1\" id=\"agentAproperty1\" value=\"plantHeight\" />" + agentA.properties[0].name + ": <div id=\"agentAproperty1valueSpace\"> </div>  " +
                                    "<input type=\"checkbox\" name=\"agentAproperty2\" id=\"agentAproperty2\" value=\"seedColor\" />" + agentA.properties[1].name + ": <div id=\"agentAproperty2valueSpace\"> </div> " +
                                    "<input type=\"checkbox\" name=\"agentAproperty3\" id=\"agentAproperty3\" value=\"seedShape\" />" + agentA.properties[2].name + 
                                    "<br/> <input type=\"checkbox\" name=\"agentAproperty4\" id=\"agentAproperty4\" value=\"flowerColor\" />" + agentA.properties[3].name + 
                                    "</fieldset>" +
                                    "<br/> <p> Behaviours: </p> <fieldset>";
                            $( "#addAgentA" ).css("border", "1px solid #07c");
                            $( "#addAgentA" ).css("width", "35%");
                            $( "#addAgentA" ).html(temp_text);
                            $('<input />', { type: 'checkbox', id: 'agentAbehaviour1', value: agentA.behaviour[0] }).appendTo("#addAgentA");
                            $( "#addAgentA" ).append(agentA.behaviour[0] + "</fieldset>");
                            $( "#addAgentA" ).append("<br/>" + agentA.behaviour[1] + ": ");
                            $('<input />', { type: 'number', id: 'agentAbehaviour2', width: '60px'}).appendTo("#addAgentA");
                            

                            //add event handlers for dynamically added elements
                            $( "#agentAproperty1" ).change(displayProperty1ValuesAgentA);
                            $( "#agentAproperty2" ).change(displayProperty2ValuesAgentA);
                      }

                       if ($('#selectedAgentB').is(':checked')) {
                            var temp_text = "<p> Agent :" + agentB.name + "</p> <fieldset id=\"agentBproperty\">" +
                                "<input type=\"checkbox\" name=\"agentBproperty1\" id=\"agentBproperty1\" value=\"plantHeight\" />" + agentB.properties[0].name + ": <div id=\"agentBproperty1valueSpace\"> </div>  " +
                                "<input type=\"checkbox\" name=\"agentBproperty2\" id=\"agentBproperty2\" value=\"seedColor\" />" + agentB.properties[1].name + ": <div id=\"agentBproperty2valueSpace\"> </div> " +
                                "<input type=\"checkbox\" name=\"agentBproperty3\" id=\"agentBproperty3\" value=\"seedShape\" />" + agentB.properties[2].name + 
                                "<br/> <input type=\"checkbox\" name=\"agentBproperty4\" id=\"agentBproperty4\" value=\"flowerColor\" />" + agentB.properties[3].name + 
                                "</fieldset>" +
                                "<br/> <p> Behaviours: </p> <fieldset>";
                            $( "#addAgentB" ).css("width", "45%");
                            $( "#addAgentB" ).html(temp_text);
                            $('<input />', { type: 'checkbox', id: 'agentBbehaviour1', value: agentB.behaviour[0] }).appendTo("#addAgentB");
                            $( "#addAgentB" ).append(agentB.behaviour[0] + "</fieldset>");
                            $( "#addAgentB" ).append("<br/>" + agentB.behaviour[1] + ": ");
                            $('<input />', { type: 'number', id: 'agentBbehaviour2', width: '60px'}).appendTo("#addAgentB");
                             $( "#addAgentB" ).css("border", "1px solid #07c");

                            //add event handlers for dynamically added elements
                            $( "#agentBproperty1" ).change(displayProperty1ValuesAgentB);
                            $( "#agentBproperty2" ).change(displayProperty2ValuesAgentB);
                      }
                      $( this ).dialog( "close" );
                    }
                  }
                ],
                open: function(event, ui) {
                    $(this).parent().css('position','fixed');
                }
        });
        $( "#addAgentDialog" ).dialog(open);
        $('[data-toggle="tooltip"]').tooltip(); 
    });

    //If a property is selected, allow for the values to be put in. This function has to be automated yet.

     
    function displayProperty1ValuesAgentA(event) {
          console.log ("Name : " + agentA.properties[0].name);
          if ($(this).is(':checked')) {
              var temp_text = "<select> <option> " + agentA.properties[0].value[0] + "</option> <option> " + agentA.properties[0].value[1] + "</option> <option>" + agentA.properties[0].value[2] + "</option> </select>" ;
              $( "#agentAproperty1valueSpace" ).html(temp_text);

          } else {
             $( "#agentAproperty1valueSpace" ).html("");
          }
      }

    function displayProperty2ValuesAgentA(event) {
          console.log ("Name : " + agentA.properties[1].name);
          if ($(this).is(':checked')) {
              var temp_text = "<select> <option> " + agentA.properties[1].value[0] + "</option> <option> " + agentA.properties[1].value[1] + "</option> <option>" + agentA.properties[1].value[2] + "</option> </select>" ;
              $( "#agentAproperty2valueSpace" ).html(temp_text);
          } else {
             $( "#agentAproperty2valueSpace" ).html("");
          }
      }

    function displayProperty1ValuesAgentB(event) {
          console.log ("Name : " + agentB.properties[0].name);
          if ($(this).is(':checked')) {
              var temp_text = "<select> <option> " + agentB.properties[0].value[0] + "</option> <option> " + agentB.properties[0].value[1] + "</option> <option>" + agentB.properties[0].value[2] + "</option> </select>" ;
              $( "#agentBproperty1valueSpace" ).html(temp_text);
          } else {
             $( "#agentBproperty1valueSpace" ).html("");
          }
      }

    function displayProperty2ValuesAgentB(event) {
          console.log ("Name : " + agentB.properties[1].name);
          if ($(this).is(':checked')) {
              var temp_text = "<select> <option> " + agentB.properties[1].value[0] + "</option> <option> " + agentB.properties[1].value[1] + "</option> <option>" + agentB.properties[1].value[2] + "</option> </select>" ;
              $( "#agentBproperty2valueSpace" ).html(temp_text);
          } else {
             $( "#agentBproperty2valueSpace" ).html("");
          }
      }

    $( "#addRuleButton" ).click(function() {
            
            //populate HTML content to be diplayed on click
            
            
            $("#addRuleDialog").html( $('<input />', { type: 'checkbox', id: 'rule1', value: 'rule1'}));
            $("#addRuleDialog").append( $('<label />', { for: 'rule1' , text:rules[0] }));
            $("#addRuleDialog").append("<br/>");
            $("#addRuleDialog").append( $('<input />', { type: 'checkbox', id: 'rule2', value: 'rule2'}));
            $("#addRuleDialog").append( $('<label />', { for: 'rule2' , text:rules[1] }));
            $("#addRuleDialog").append("<br/>");
            $("#addRuleDialog").append( $('<input />', { type: 'checkbox', id: 'rule3', value: 'rule3'}));
            $("#addRuleDialog").append( $('<label />', { for: 'rule3' , text:rules[2] }));
            $("#addRuleDialog").dialog({
                dialogClass: "no-close",
                resizable: true,
                modal: true,
                title: "Select Agents",
                buttons: [
                    {
                        text: "OK",
                        click: function() {
                            //
                            var temp_text = "Here is the list of rules you have selected: <br/>"
                            $( this ).dialog( "close" );
                            if ($("#rule1").is(':checked')){
                                temp_text += rules[0];
                                temp_text += "<br/>";
                            }
                            if ($("#rule2").is(':checked')){
                                temp_text += rules[1];
                                temp_text += "<br/>";
                            }
                            if ($("#rule3").is(':checked')){
                                temp_text += rules[2];
                                temp_text += "<br/>";
                            }
                            $("#ruleDisplaySpace").html(temp_text);
                        }
                    }
                ],
                open: function() {

                    $(this).parent().css('position','fixed');
                    console.log ("function on open");

                    //$(this).html( $('<input />', { type: 'checkbox', id: 'agentAbehaviour1', value:'rule1', text: 'Rule1' }));
                }
            });

            //$("#addRuleDialog"). append ("<br/> <fieldset> ");
            $( "#addRuleDialog" ).dialog(open);          
            console.log (" again");
       });


//document.ready closes after this
});


    
