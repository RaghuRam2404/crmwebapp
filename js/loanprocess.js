/*
Master account : raghuram.t+demo@zohotest.com
*/

var HTTP_PROTOCOL = "http://";
var CLIENT_ID = "1000.Q9E406JIIMXV43406U49J68XQGAV9H";
var SCOPES = "ZohoCRM.modules.Leads.ALL,ZohoCRM.users.READ,ZohoCRM.org.READ,AaaServer.profile.Read,ZohoCRM.modules.Notes.ALL,ZohoCRM.modules.attachments.ALL,ZohoCRM.modules.contacts.ALL";
var ACCOUNTS_URL = "https://accounts.zoho.com"
var checklists = [{"label":"SSN","id":"checkboxssn", 'api_name':'SSN'},{"label":"Passport","id":"checkboxppt", 'api_name':'Passport'},{"label":"Address","id":"checkboxadd", 'api_name':'Address'}];
var files = [{"label":"SSN", "id": "myfilessn"},{"label":"Passport", "id": "myfileppt"},{"label":"Address", "id": "myfileadd"}];
var cvidmapping = {"pending":"2938383000001645025", "rejected":"2938383000001666065", "approved":"converted", "all":"-1"}
var cvnames = ["All Applications", "Pending Applications", "Rejected", "Approved"]
var defaultOption = 1;

function checkLogin(bool){
	var isLoggedIn = localStorage.hasOwnProperty('access_token');
	if(!((!isLoggedIn && !bool) || (isLoggedIn && bool)))
		location.href = getBaseURL()+(isLoggedIn?"/home.html":"/index.html");
	if(document.getElementById("zes_client_scope") == null){
		var elem = document.createElement('div');
		elem.setAttribute("data-scope",SCOPES);
		elem.setAttribute("data-clientid",CLIENT_ID);
		elem.setAttribute("data-accounts-url",ACCOUNTS_URL);
		elem.setAttribute("id","zes_client_scope");
		
		document.body.appendChild(elem);
	}
}

function getBaseURL(){
	var add = "";
	if(window.location.host.includes("github"))
		add = "/crmwebapp"
	return window.location.protocol+"//"+window.location.host+add;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function typeChange(){
	//var type = document.getElementById('approvaltype').value;
	location.href = getBaseURL()+"/view.html?type="+type;
}

function loadTopBar(){

	ZCRM.API.USERS.get({"params":{"type":"CurrentUser"}}).then(function(resp){
		//debugger;
    	var data = JSON.parse(resp);
    	var name = data["users"][0].full_name
    	document.getElementById("topname").innerHTML = "<span id='tophello'>Hello, </span><span id='topnamefull'>"+name+"</span>&nbsp;&nbsp;&nbsp;<span id='profileimg'>"+
    													"<img src='https://contacts.zoho.com/file?ID=634144653&fs=thumb' class='profileimage' />"
    													+"</span>";

	});
}

function populateData(){
	loadTopBar();
	var params = getUrlVars();
	var converted = 'false';
	var currentOption = "";
	var optionss = "";
	for(var i=0; i<cvnames.length; i++){
		optionss += "<div class='optionone'>"+cvnames[i]+"</div>";
	}

	$(".availableoptions").html(optionss);

	if(params != null && params.hasOwnProperty('type')){
		//converted = pmap[decodeURIComponent(params["type"])];
		//document.getElementById("approvaltype").value = converted;
		currentOption = decodeURIComponent( params['type'] )
	}else{
		currentOption = decodeURIComponent(cvnames[defaultOption]);
	}
	$("#currentoption").html(currentOption);

	var recordParams = {};
	switch(currentOption){
		case cvnames[0] : 
			recordParams = {"converted":"both"}
		break;
		case cvnames[1] : 
			recordParams = {"cvid": cvidmapping["pending"]}
		break;
		case cvnames[2] : 
			recordParams = {"cvid": cvidmapping["rejected"]}
		break;
		case cvnames[3] : 
			recordParams = {"converted" : "true"}
		break;
	}


	var input = {'module' : 'Leads', 'params': recordParams};
	ZCRM.API.RECORDS.get(input).then(function(resp){
		//debugger;
		var data = JSON.parse(resp).data;
		var rowdata = " ";
		for(i=0; data!=null && i<data.length; i++){
			var record = data[i];
			if(record['Lead_Status'] == 'Pre-Qualified')
				record['Lead_Status'] = 'Approved'
			var rowd = "<div "+(record['Lead_Status'] == "Pending" ? "style='cursor: pointer;' onclick='view(\""+record['id']+"\")'" : "")+ "class='row indrow'>"+
							"<div class='col-2 tablecontent'>"+record['Full_Name']+"</div>"+
							"<div class='col-2 tablecontent'>"+record['Phone']+"</div>"+
							"<div class='col-3 tablecontent'>"+record['Email']+"</div>"+
							"<div class='col-2 tablecontent'>"+record['Street']+"</div>"+
							"<div class='col-2 tablecontent'>"+record['State']+"</div>"+
							"<div class='col-1 tablecontent'>"+record['Lead_Status']+"</div>"+
						"</div>";
			rowdata += rowd;
		}
		document.getElementById("leaddata").innerHTML = rowdata;
	});
}

function getName(){
	ZCRM.API.ORG.get();
}

function view(id){
	window.location.href = getBaseURL()+"/approve.html?id="+id+"&from="+encodeURIComponent(window.location.href);
}

function print(value){
	if(value == null)
		return "-NA-";
	return value.trim();
}

function populateIndividualData(){
	var params = getUrlVars();
	var input = {'module' : 'Leads', 'id':params.id};

	$(".leftarrow").attr('onclick', "window.location='"+decodeURIComponent(getUrlVars()['from'])+"'")

	ZCRM.API.RECORDS.get(input).then(function(resp){
		//debugger;
		var data = JSON.parse(resp).data;
		var rowdata = " ";
		var record = data[0];
		var rowd = "<div class='row' onclick='view(\""+record['id']+"\")'>"+
						"<div class='col-2 tablecontent'>"+record['Full_Name']+"</div>"+
						"<div class='col-2 tablecontent'>"+record['Phone']+"</div>"+
						"<div class='col-2 tablecontent'>"+record['Email']+"</div>"+
						"<div class='col-2 tablecontent'>"+record['Street']+"</div>"+
						"<div class='col-2 tablecontent'>"+record['State']+"</div>"+
						"<div class='col-2 tablecontent'>"+record['Lead_Status']+"</div>"+
					"</div>";
		rowdata += rowd;
		$(".realname").html(print(record['Full_Name']));
		$("#rowphone").html(print(record['Phone']));
		$("#rowemail").html(print(record['Email']));
		$("#rowstreet").html(print(record['Street']));
		$("#rowregion").html(print(record['City']));

		$(".approvebtn").attr('onclick', 'convertlead("'+params.id+'")')
		$(".rejectbtn").attr('onclick', 'rejectlead("'+params.id+'")')
		

		//checklists
		/*
		rowdata += ""+
			"<div class='row1'><h3>Checklists</h3>";

		for(var i=0; i<checklists.length; i++){
			rowdata += "<div class='row'>"+
				"	<div class='col-6'>"+checklists[i].label+"</div>"+
				"	<div class='col-6'><input type='checkbox' name='"+checklists[i].id+"' id='"+checklists[i].id+"'></div>"+
				"</div>";
		} rowdata += "</div>";

		//files
		
		rowdata += ""+
			"<div class='row1'><h3>Files</h3>";

		for(var i=0; i<files.length; i++){
			rowdata += "<div class='row'>"+
				"	<div class='col-6'>"+files[i].label+"</div>"+
				"	<div class='col-6'><input type='file' name='"+files[i].id+"' id='"+files[i].id+"'></div>"+
				"</div>";
		} rowdata += "</div>";

		rowdata += "<div class='row'><input type='button' value='submit' onclick='convertlead(\""+params.id+"\")' /></div>"
		*/
		//document.getElementById("leaddata").innerHTML = rowdata; 
	});
}

function showLoading(message){
	$(".cssload-loader").html(message);
	$("#overlay").show();
	$(".cssload-loader").show();
}
function hideLoading(){
	$("#overlay").hide();
	$(".cssload-loader").hide();
}

function convertlead(id){
	showLoading('Approving');
	var count = 0;
	var input = {'id':id, 'body':{'data':[{}]}};
	ZCRM.API.ACTIONS.convert(input).then(function(resp){
		var data = JSON.parse(resp).data[0].Contacts;
		console.log('converted contact '+data)
		var dateString = new Date().toLocaleDateString();
		var timeString = new Date().toLocaleTimeString();
		var content = "";
		var contactdata = {};
		for(var i=0; i<checklists.length; i++){
			var checked = document.getElementById(checklists[i].id).checked;
			content += checklists[i].label+" Verification :  "+(checked)+"\n";
			contactdata[checklists[i].api_name] = checked
		}
		var inp = {'module':'Notes', 'body':{'data':[{'Note_Title':'Approval Details', 'Note_Content':'Approved on '+dateString+" "+timeString+"\n"+content, 'Parent_Id':''+data, 'se_module':'Contacts'}]}};
		ZCRM.API.RECORDS.post(inp).then(function(res){
			console.log(res);
			var data = JSON.parse(resp).data[0];
			console.log('Contact id '+data['Contacts'])
			for(var i=0; i<files.length; i++){
				var file1 = document.getElementById(files[i].id).files[0]
				console.log(file1)
				var input = {module:'Contacts', id:data['Contacts'], x_file_content:file1}
				ZCRM.API.ATTACHMENTS.uploadFile(input).then(function(resp){console.log(resp); count++; });
			}
			var input = {'id':data['Contacts'], 'module':'Contacts', 'body':{'data':[contactdata]}};
			ZCRM.API.RECORDS.put(input).then(function(resp){
				count++;
				console.log(resp);
				debugger
			});
		});
	});

	setInterval(function(){
		if(count == files.length+1){
			hideLoading();
			//$("#overlay").show();
			//$(".application_approved").show();
			//setTimeout(function(){
				window.location = getBaseURL()+"/view.html?type="+cvnames[1]
			//}, 2000);
		}
	}, 200)

}

function rejectlead(id){
	showLoading('Rejecting');
	var input = {'id':id, 'module':'Leads', 'body':{'data':[{"Lead_Status" : "Rejected"}]}};
	ZCRM.API.RECORDS.put(input).then(function(resp){
		var data = JSON.parse(resp).data[0].Contacts;
		console.log(data);
		hideLoading();
		//$("#overlay").show();
		//$(".application_rejected").show();
		//setTimeout(function(){
			window.location = getBaseURL()+"/view.html?type="+cvnames[1]
		//}, 2000);
	});
}

function toggle(){
	if(document.getElementsByClassName('options')[0].style.display == 'none'){

		var currentOption = $("#currentoption").html()
		console.log(currentOption)
		$(".optionone").each(function(){
			if($(this).html() == currentOption){
				$(this).addClass("selected")
			}else{
				$(this).removeClass("selected")
			}
		});
		document.getElementsByClassName('options')[0].style.display = 'block'
	}
	else
		document.getElementsByClassName('options')[0].style.display = 'none'
}

function hoverFunction(){
	$(".optionone").hover(function(){
		$(".optionone").each(function(){
			$(this).removeClass('selected');
		});
		$(this).addClass('selected');
	});
}