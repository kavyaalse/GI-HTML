//This file will have the back calculation for simulations
var r=""; // String for rules selected
var genotypeNos;
var agentA,agentB;
var agentEA,agentEB;
var studentModel,expertModel;
var expOutcome;
function Property(property,value){
	this.property=property;
	this.value=value;
}
function Agent(properties) {
	this.properties=properties;
	this.addProperty=function(property){
		properties.push(property);
	}
	this.genotype="";
	this.number=0;
	this.genotypeNos;
	this.phenotypeNos;
	this.crossStack=new Array();
	this.phenotypeNos=[0.0,0.0,0.0,0.0];//Tall yellow, Tall green, Short yellow, Short green
}
function initialiseGenotypeNos(agent){

	agent.genotypeNos = new Array(); 
	agent.genotypeNos['TTYY'] = 0.0;
	agent.genotypeNos['TTYy'] = 0.0;
	agent.genotypeNos['TtYY'] = 0.0;
	agent.genotypeNos['TtYy'] = 0.0;
	agent.genotypeNos['TTyy'] = 0.0;
	agent.genotypeNos['Ttyy'] = 0.0;
	agent.genotypeNos['ttYY'] = 0.0;
	agent.genotypeNos['ttYy'] = 0.0;
	agent.genotypeNos['ttyy'] = 0.0;

}

function initialiseAgents(){
	//Initialise Agent A
	agentA = new Agent(new Array());
	var plantHeight= new Property("plantHeight",$("#agentAPlantHeight").val());
	var seedColor = new Property("seedColor",$("#agentASeedColor").val());
	agentA.addProperty(plantHeight);
	agentA.addProperty(seedColor);
	agentA.number=parseFloat($("#agentAbehaviour2").val());
	initialiseGenotypeNos(agentA);
	//Initialise Agent B
	agentB = new Agent(new Array());
	plantHeight= new Property("plantHeight",$("#agentBPlantHeight").val());
	seedColor = new Property("seedColor",$("#agentBSeedColor").val());
	agentB.addProperty(plantHeight);
	agentB.addProperty(seedColor);
	agentB.number=parseFloat($("#agentBbehaviour2").val());
	initialiseGenotypeNos(agentB);
	
}

function initialiseGenotype(agent){
	agent.properties.forEach( function (arrayItem)
	{
	    agent.genotype+=arrayItem.value;
	});
	//alert("Genotype="+agent.genotype);
	agent.genotypeNos[agent.genotype]=agent.number;
	agent.crossStack.push(agent.genotype);
}

function setRules(){
	r="";
	if($("#rule1").is(':checked'))	r+="1"; else r+="0";
	if($("#rule2").is(':checked')) r+="1"; else r+="0";
	if($("#rule3").is(':checked'))	r+="1"; else r+="0";
}

function calculateRatio(agent){
	var n=parseInt($("#noOfGeneration").val());
	for(i=0;i<n;i++){
	var break_flag=0;
		for(var genotype in agent.crossStack) { 
			if(break_flag==1) break;
			if(agent.crossStack[genotype]=="TTYY" ||agent.crossStack[genotype]=="TTyy" ||agent.crossStack[genotype]=="ttYY" ||agent.crossStack[genotype]=="ttyy"){
				//agent.genotypeNos[genotype]=agent.number;
				var x = agent.crossStack.shift();
				if (agent.crossStack.length==0) break_flag=1;
				if(i!=n-1)agent.crossStack.push(x);
				continue;
			}
			if(agent.crossStack[genotype]=="TTYy"){
				if(i==0){//First Generation
					agent.genotypeNos["TTYy"]= 0.5 * agent.number;
					agent.genotypeNos["TTyy"]=0.5 * agent.number;
				} else {
					agent.genotypeNos["TTYy"]+= 0.5 * agent.genotypeNos["TTYy"];
					agent.genotypeNos["TTyy"]+=0.5 * agent.genotypeNos["TTYy"];
				}
				agent.crossStack.shift();
				if (agent.crossStack.length==0) break_flag=1;
				if(i!=n-1){
					agent.crossStack.push("TTYy");agent.crossStack.push("TTyy");
				}
				continue;	
			} 
			if(agent.crossStack[genotype]=="TtYY"){
				if(i==0){
					agent.genotypeNos["TTYY"]= 0.5 * agent.number;
					agent.genotypeNos["ttYY"]=0.5 * agent.number;
				}else{
					agent.genotypeNos["TTYY"]+= 0.5 * agent.genotypeNos["TtYY"];
					agent.genotypeNos["ttYY"]+=0.5 * agent.genotypeNos["TtYY"];
				}
				agent.crossStack.shift();
				if (agent.crossStack.length==0) break_flag=1;
				if(i!=n-1){
					agent.crossStack.push("TTYY");agent.crossStack.push("ttYY");
				}
				continue;
			}
			if(agent.crossStack[genotype]=="Ttyy"){
				if(i==0){
					agent.genotypeNos["TTyy"]= 0.5 * agent.number;
					agent.genotypeNos["ttyy"]=0.5 * agent.number;
				} else{
					agent.genotypeNos["TTyy"]+= 0.5 * agent.genotypeNos["Ttyy"];
					agent.genotypeNos["ttyy"]+=0.5 * agent.genotypeNos["Ttyy"];
				}
				agent.crossStack.shift();
				if (agent.crossStack.length==0) break_flag=1;
				if(i!=n-1){
					agent.crossStack.push("TTyy");agent.crossStack.push("ttyy");
				}
				continue;
			} 
			if(agent.crossStack[genotype]=="ttYy"){
				if(i==0){
					agent.genotypeNos["ttYY"]= 0.5 * agent.number;
					agent.genotypeNos["ttyy"]=0.5 * agent.number;
				} else {
					agent.genotypeNos["ttYY"]+= 0.5 * agent.genotypeNos["ttYy"];
					agent.genotypeNos["ttyy"]+=0.5 * agent.genotypeNos["ttYy"];
				}
				agent.crossStack.shift();
				if (agent.crossStack.length==0) break_flag=1;
				if(i!=n-1){
					agent.crossStack.push("ttYY");agent.crossStack.push("ttyy");
				}
				continue;
			} 
			if(agent.crossStack[genotype]=="TtYy"){
				if(i==0){
					agent.genotypeNos["TTYY"]= (1/16)* agent.number;
					agent.genotypeNos["TTYy"]= (2/16)* agent.number;
					agent.genotypeNos["TtYY"]= (2/16)* agent.number;
					agent.genotypeNos["TtYy"]= (4/16)* agent.number;
					agent.genotypeNos["TTyy"]= (1/16)* agent.number;
					agent.genotypeNos["Ttyy"]= (2/16)* agent.number;
					agent.genotypeNos["ttYY"]= (1/16)* agent.number;
					agent.genotypeNos["ttYy"]= (2/16)* agent.number;
					agent.genotypeNos["ttyy"]= (1/16)* agent.number;
				} else {
					agent.genotypeNos["TTYY"]+= (1/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["TTYy"]+= (2/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["TtYY"]+= (2/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["TtYy"]+= (4/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["TTyy"]+= (1/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["Ttyy"]+= (2/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["ttYY"]+= (1/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["ttYy"]+= (2/16)* agent.genotypeNos["TtYy"];
					agent.genotypeNos["ttyy"]+= (1/16)* agent.genotypeNos["TtYy"];
				}
				agent.crossStack.shift();
				if (agent.crossStack.length==0) break_flag=1;
				if(i!=n-1){
					agent.crossStack.push("TTYY");agent.crossStack.push("TTYy");
					agent.crossStack.push("TtYY");agent.crossStack.push("TtYy");
					agent.crossStack.push("TTyy");agent.crossStack.push("Ttyy");
					agent.crossStack.push("ttYY");agent.crossStack.push("ttYy");
					agent.crossStack.push("ttyy");
				}
				continue;
			}

		} 
	}
	
}

function calculatePhenotypeNos(agent){
	agent.phenotypeNos[0]=agent.genotypeNos['TTYY']+agent.genotypeNos['TTYy']+agent.genotypeNos['TtYY']+agent.genotypeNos['TtYy'];
	agent.phenotypeNos[1]=agent.genotypeNos['TTyy']+agent.genotypeNos['Ttyy'];
	agent.phenotypeNos[2]=agent.genotypeNos['ttYY']+agent.genotypeNos['ttYy'];
	agent.phenotypeNos[3]=agent.genotypeNos['ttyy'];

}

function calculateTotalPhenotype(){
	$("#phenotype1").val(parseInt(agentA.phenotypeNos[0]+agentB.phenotypeNos[0]));
	$("#phenotype2").val(parseInt(agentA.phenotypeNos[1]+agentB.phenotypeNos[1]));
	$("#phenotype3").val(parseInt(agentA.phenotypeNos[2]+agentB.phenotypeNos[2]));
	$("#phenotype4").val(parseInt(agentA.phenotypeNos[3]+agentB.phenotypeNos[3]));

	//alert("Tall Yellow =" + parseFloat(agentA.phenotypeNos[0]+agentB.phenotypeNos[0]));
	//alert("Tall Green =" + parseFloat(agentA.phenotypeNos[1]+agentB.phenotypeNos[1]));
	//alert("Short Yellow =" + parseFloat(agentA.phenotypeNos[2]+agentB.phenotypeNos[2]));
	//alert("Short Green =" + parseFloat(agentA.phenotypeNos[3]+agentB.phenotypeNos[3]));
}
function runExperiment(){
	$(".feedback").hide();
	initialiseAgents();
	setRules();
	//Calculate Ratio
	initialiseGenotype(agentA);
	calculateRatio(agentA);
	initialiseGenotype(agentB);
	calculateRatio(agentB);
	calculatePhenotypeNos(agentA);
	calculatePhenotypeNos(agentB);
	calculateTotalPhenotype();
	studentModel=generateStudentModel();
	expertModel=generateExpertModel();
	generateFeedback();
}


function Model(hypothesis,iv,dv,noOfGenerations,agentA,agentB){
	this.hypothesis;
	this.iv;
	this.dv;
	this.noOfGenerations;
	this.agents=new Array();
	this.agents.push(agentA);
	this.agents.push(agentB);
}

function generateStudentModel(){
	return new Model($("HypothesisSelected").val(),$("#IV_Value").val(),$("#DV_Value").val(),parseInt($("#noOfGeneration").val()),agentA,agentB);
}


function generateExpertModel(){
	var hypothesis="Ratio of genotypes of plant at the beginning is 50% Homozygous dominant (TTYY): 50% Heterozygous (Ttyy)";
	var iv="Initial ratio of genotypes";
	var dv="Final ratio of Phenotypes";
	var noOfGenerations=2;
	agentEA = new Agent(new Array());
	var plantHeight= new Property("plantHeight","TT");
	var seedColor = new Property("seedColor","YY");
	agentEA.addProperty(plantHeight);
	agentEA.addProperty(seedColor);
	agentEA.number=50;
	//initialiseGenotypeNos(agentEB);
	//Initialise Agent B
	agentEB = new Agent(new Array());
	plantHeight= new Property("plantHeight","Tt");
	seedColor = new Property("seedColor","Yy");
	agentEB.addProperty(plantHeight);
	agentEB.addProperty(seedColor);
	agentEB.number=50;
	//initialiseGenotypeNos(agentEB);
	return new Model(hypothesis,iv,dv,noOfGenerations,agentEA,agentEB);
}

function generateFeedback(){
	$("#hypothesis_summary").show();
	$("#hypothesis_summary").html($("input[name='HypothesisSelected']:checked").val());
	var html="Dependant Variable is "+$("#DV_Value").val();
	html+="<br>Independant Variable is ";
	html+=$("#IV_Value").val();
	$("#test_summary").html(html);
	$("#actual_experiment_summary").html("3 out of 100 plant are short and green");
	$("#your_experiment_summary").html($("#phenotype4").val()+" out of 100 plants are short and green");
	$("#initial_summary").show();

}

function checkOutcomes(option){
	if(option=="yes" && $("#phenotype4").val()=="3"){// Yes and correct option
		alert("Well Done!! You have successfully completed this activity");
	}
	if($("#phenotype4").val()!="3" && option=="yes") {// No and correct option
		alert("Oops, Sorry it doesn't match. Talk to Mr. Gyaanu. He can help you");
		loadMrGyanu();
		revisePlantProperties();
	}
	if($("#phenotype4").val()!="3" && option=="no"){
		loadMrGyanu();
		revisePlantProperties();
	}

}

function loadMrGyanu(){
	$("#gyanu").show();

}
function revisePlantProperties(){
	$(".feedback").hide();
	$("#plantPropertiesFeedback").show();
	$("#PlantA_genotype_label").html(agentA.genotype);
	$("#PlantB_genotype_label").html(agentB.genotype);
	$("#noOfGenerations_label").html($("#noOfGeneration").val());
}

function revisePlantNumbers(){
	$("#plantPropertiesFeedback").hide();
	$("#plantNumbersFeedback").show();
	$("#PlantA_no_label").html(agentA.number);
	$("#PlantB_no_label").html(agentB.number);
}

function reviseVariablesFeedback(){
	$("#plantNumbersFeedback").hide();
	$("#variablesFeedback").show();
	$("#dv_label").html($("#DV_Value").val());
	$("#iv_label").html($("#IV_Value").val());

}

function reviseHypothesisFeedback(){
	$("#variablesFeedback").hide();
	$("#hypothesisFeedback").show();
	$("#hypothesis_label").html($("input[name='HypothesisSelected']:checked").val());

}
