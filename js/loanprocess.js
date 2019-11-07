/*
Master account : raghuram.t+demo@zohotest.com
*/
var HTTP_PROTOCOL = "http://";
var indexpage = "/index.html";
var CLIENT_ID = "1000.Q9E406JIIMXV43406U49J68XQGAV9H";
var SCOPES = "ZohoCRM.modules.Leads.ALL,ZohoCRM.users.READ,ZohoCRM.org.READ,AaaServer.profile.Read,ZohoCRM.modules.Notes.ALL,ZohoCRM.modules.attachments.ALL,ZohoCRM.modules.contacts.ALL";
var ACCOUNTS_URL = "https://accounts.zoho.com"
var checklists = [{"label":"SSN","id":"checkboxssn", 'api_name':'SSN'},{"label":"Passport","id":"checkboxppt", 'api_name':'Passport'},{"label":"Address","id":"checkboxadd", 'api_name':'Address'}];
var files = [{"label":"SSN", "id": "myfilessn"},{"label":"Passport", "id": "myfileppt"},{"label":"Address", "id": "myfileadd"}];
var cvidmapping = {"pending":"2938383000001645025", "rejected":"2938383000001666065", "approved":"converted", "all":"-1"}
var cvnames = ["All Applications", "Pending Applications", "Rejected Applications", "Approved Applications"]
var defaultOption = 1;

function getLanding(){
	return "2";
}

function getNum(){
	var html = window.location.pathname;
	if(html.endsWith("2.html")){
		return "2";
	}
	return "";
}

function checkLogin(bool){

	if(getNum() == "2"){
		addClickListener();
	}

	var isLoggedIn = localStorage.hasOwnProperty('access_token');
	if(!((!isLoggedIn && !bool) || (isLoggedIn && bool)))
		location.href = getBaseURL()+(isLoggedIn?"/home"+getLanding()+".html":indexpage);
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

function logoutclick(){
	$(".logout").style()
}

function logout(){
	var svg= '<svg class="logout"'+
		' onclick="logoutclick();" '
		+'height="24px" viewBox="0 0 512.016 512" width="24px" xmlns="http://www.w3.org/2000/svg">'
		+'<path class="svgout" d="m496 240.007812h-202.667969c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16 0 8.832032-7.167969 16-16 16zm0 0"/>'
		+'<path class="svgout" d="m416 320.007812c-4.097656 0-8.191406-1.558593-11.308594-4.691406-6.25-6.253906-6.25-16.386718 0-22.636718l68.695313-68.691407-68.695313-68.695312c-6.25-6.25-6.25-16.382813 0-22.632813 6.253906-6.253906 16.386719-6.253906 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.632813l-80 80c-3.136719 3.15625-7.230469 4.714843-11.328125 4.714843zm0 0"/>'
		+'<path class="svgout" d="m170.667969 512.007812c-4.566407 0-8.898438-.640624-13.226563-1.984374l-128.386718-42.773438c-17.46875-6.101562-29.054688-22.378906-29.054688-40.574219v-384c0-23.53125 19.136719-42.6679685 42.667969-42.6679685 4.5625 0 8.894531.6406255 13.226562 1.9843755l128.382813 42.773437c17.472656 6.101563 29.054687 22.378906 29.054687 40.574219v384c0 23.53125-19.132812 42.667968-42.664062 42.667968zm-128-480c-5.867188 0-10.667969 4.800782-10.667969 10.667969v384c0 4.542969 3.050781 8.765625 7.402344 10.28125l127.785156 42.582031c.917969.296876 2.113281.46875 3.480469.46875 5.867187 0 10.664062-4.800781 10.664062-10.667968v-384c0-4.542969-3.050781-8.765625-7.402343-10.28125l-127.785157-42.582032c-.917969-.296874-2.113281-.46875-3.476562-.46875zm0 0"/>'
		+'<path class="svgout" d="m325.332031 170.675781c-8.832031 0-16-7.167969-16-16v-96c0-14.699219-11.964843-26.667969-26.664062-26.667969h-240c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-15.9999995 16-15.9999995h240c32.363281 0 58.664062 26.3046875 58.664062 58.6679685v96c0 8.832031-7.167969 16-16 16zm0 0"/>'
		+'<path class="svgout" d="m282.667969 448.007812h-85.335938c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h85.335938c14.699219 0 26.664062-11.96875 26.664062-26.667968v-96c0-8.832032 7.167969-16 16-16s16 7.167968 16 16v96c0 32.363281-26.300781 58.667968-58.664062 58.667968zm0 0"/></svg>';
	return svg;

}

function typeChange(){
	//var type = document.getElementById('approvaltype').value;
	location.href = getBaseURL()+"/view"+getNum()+".html?type="+type;
}

function logoutredirect(){
	localStorage.clear();
	window.location = getBaseURL()+indexpage;
}

function loadTopBar(){

	ZCRM.API.USERS.get({"params":{"type":"CurrentUser"}}).then(function(resp){
		//debugger;
    	var data = JSON.parse(resp);
    	var name = data["users"][0].full_name
    	document.getElementById("topname").innerHTML = "<span class='namediv'><span id='tophello'>Hello, </span><span id='topnamefull'>"+name+"</span>&nbsp;&nbsp;&nbsp;<span id='profileimg'>"+
    													"<img src='https://contacts.zoho.com/file?ID=634144653&fs=thumb' class='profileimage' />"
    													+"</span></span>&nbsp;&nbsp;&nbsp;&nbsp;"+"<span class='logouticon' onclick='logoutredirect()'  >"+logout()+"</span>";
    													//  onmouseenter='svghover(\"in\");' onmouseout='svghover(\"out\");'

	});
}

function populateData(){
	loadTopBar();
	var params = getUrlVars();
	var converted = 'false';
	var currentOption = "";
	var optionss = "";
	var perpage = 15;
	var page = 1;

	for(var i=0; i<cvnames.length; i++){
		optionss += "<div class='optionone'>"+cvnames[i]+"</div>";
	}

	$(".availableoptions").html(optionss);

	if(params != null && params.hasOwnProperty('type')){
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

	if(params != null && params.hasOwnProperty('per_page')){
		perpage = parseFloat(params['per_page']);
	}
	if(params != null && params.hasOwnProperty('page')){
		page = parseFloat(params['page']);
	}

	$(".custom-select").val(""+perpage)

	recordParams['per_page'] = perpage;
	recordParams['page'] = page;
	recordParams['sort_by'] = "Modified_Time";
	recordParams['sort_order'] = "desc";

	if(page == 0 || page == 1){
		$(".previcon").addClass('opacity50');
	}

	// (page-1)*per_page+1 to per_page*page

	var input = {'module' : 'Leads', 'params': recordParams};
	ZCRM.API.RECORDS.get(input).then(function(resp){
		//debugger;
		var jsonresp = JSON.parse(resp)
		var data = jsonresp.data;
		var more_records = jsonresp.info.more_records;
		if(!more_records){
			$(".nexticon").addClass('opacity50');
		}

		var fromrec = (page-1)*perpage+1;
		var torec = perpage*page;

		if(torec-fromrec+1 > data.length)
			torec = fromrec + data.length -1;

		//construct urls
		var html = "view"+getNum()+".html"
		var burl = getBaseURL()+"/"+html+"?type="+encodeURIComponent(currentOption)+"&page={0}&per_page="+perpage;
		var prevpageurl = (page == 1) ? "" : burl.replace("{0}",""+(page-1));
		if(prevpageurl != ""){
			$(".previcon").attr("onclick", "window.location='"+prevpageurl+"';");
			$(".previcon").attr("style", "cursor:pointer;");
		}
		var nextpageurl = !more_records ? "" : burl.replace("{0}",""+(page+1));
		if(nextpageurl != ""){
			$(".nexticon").attr("onclick", "window.location='"+nextpageurl+"';");
			$(".nexticon").attr("style", "cursor:pointer;");
		}

		$(".fromrec").html(""+fromrec);
		$(".torec").html(""+torec);
		$(".rangediv").show();
		$(".selectdiv").show();

		if(getNum() == ""){
			var rowdata = " ";
			for(i=0; data!=null && i<data.length; i++){
				var record = data[i];
				if(record['Lead_Status'] == 'Pre-Qualified')
					record['Lead_Status'] = 'Approved'
				var mail = record['Email'];
				if(mail != null && mail.length > 15)
					mail = mail.substring(0,15)+"..."
				var rowd = "<div "+(record['Lead_Status'] == "Pending" ? "style='cursor: pointer;' onclick='view(\""+record['id']+"\")'" : "")+ "class='row indrow'>"+
								"<div class='col-2 tablecontent'>"+record['Full_Name']+"</div>"+
								"<div class='col-2 tablecontent'>"+record['Phone']+"</div>"+
								"<div class='col-3 tablecontent'>"+mail+"</div>"+
								"<div class='col-2 tablecontent'>"+record['Street']+"</div>"+
								"<div class='col-2 tablecontent'>"+record['State']+"</div>"+
								"<div class='col-1 tablecontent'>"+record['Lead_Status']+"</div>"+
							"</div>";
				rowdata += rowd;
			}
			document.getElementById("leaddata").innerHTML = rowdata;
		}else{
			//newtbody
			var rowdata = " ";
			for(i=0; data!=null && i<data.length; i++){
				var record = data[i];
				if(record['Lead_Status'] == 'Pre-Qualified')
					record['Lead_Status'] = 'Approved'
				var mail = record['Email'];
				if(mail.length > 16)
					mail = mail.substring(0,16)+"..."+mail.substring(mail.length-5, mail.length)
				var rowd = "<tr "+(record['Lead_Status'] == "Pending" ? "style='cursor: pointer;' onclick='view(\""+record['id']+"\")'" : "")+ ">"+
								"<td class='name'>"+record['Full_Name']+"</td>"+
								"<td class='phone'>"+record['Phone']+"</td>"+
								"<td class='email'>"+mail+"</td>"+
								"<td class='street'>"+record['Street']+"</td>"+
								"<td class='region'>"+record['State']+"</td>"+
								"<td>"+record['Lead_Status']+"</td>"+
							"</tr>";
				rowdata += rowd;
			}
			document.getElementsByClassName("newtbody")[0].innerHTML = rowdata;
		}
	});
}

function getName(){
	ZCRM.API.ORG.get();
}

function view(id){
	window.location.href = getBaseURL()+"/approve"+getNum()+".html?id="+id+"&from="+encodeURIComponent(window.location.href);
}

function perpagechange(){
	var perpage = $(".custom-select").val();
	var params = getUrlVars();
	if(params != null && params.hasOwnProperty('type')){
		currentOption = decodeURIComponent( params['type'] )
	}else{
		currentOption = decodeURIComponent(cvnames[defaultOption]);
	}
	window.location = getBaseURL()+"/view"+getNum()+".html?type="+encodeURIComponent(currentOption)+"&page=1&per_page="+perpage;
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
				window.location = getBaseURL()+"/view"+getNum()+".html?type="+cvnames[1]
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
			window.location = getBaseURL()+"/view"+getNum()+".html?type="+cvnames[1]
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

function gotoHome(){
	window.location = getBaseURL()+"/home"+getNum()+".html";
}

function addClickListener(){
	$("#logocontainer").css("cursor","pointer").click(function(){
		gotoHome();
	});
}