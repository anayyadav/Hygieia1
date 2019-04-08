import json
import requests	
import datetime

def get_applications(server_url, access_token,workspaceid):
#GET /api/workspaces/{workspaceID}/applications
	api_url = server_url+'/agm/api/workspaces/'+workspaceid+'/applications/'
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		print "collecting data of applications... "
		return response.json()["data"]
	else:
		print "status code = ", response.status_code
		return ""

def getStroryPoints(backlog_data,app_id):
	sp = 0
	for i in range(len(backlog_data)):
		if not(backlog_data[i]['application_id']== None)  and not(backlog_data[i]['story_points']== None) and backlog_data[i]['application_id']['id'] == app_id  :
			sp = sp + backlog_data[i]['story_points']
				
	return sp 	

		
def get_defect(server_url, access_token,workspaceid,wname,backlog_data,app_data):
	a_={}
	for i in range(len(app_data)):
		a_[app_data[i]["id"]] = app_data[i]["name"]
	
	
	data = []
	for i in range(len(backlog_data)):
		if("defect_status" in backlog_data[i]):
			b_={}
			b_["id"] = str(backlog_data[i]['id'])
			b_["dstatus"]= backlog_data[i]['defect_status']
			b_["detection_date"] = backlog_data[i]['detection_date']
			b_["workspacename"]=str(wname)
			b_["workspaceid"]=str(wname)+"-"+str(workspaceid)
			day = datetime.datetime.strptime(datetime.datetime.today().strftime('%Y-%m-%d'), '%Y-%m-%d') - datetime.datetime.strptime(backlog_data[i]['detection_date'],'%Y-%m-%d')
			b_["activeday"] = abs((day).days)
			if not(backlog_data[i]['application_id']== None):
				b_["app_id"] = backlog_data[i]['application_id']['id']
				b_["Tstorypoints"] = getStroryPoints(backlog_data,backlog_data[i]['application_id']['id'])
				b_["app_name"] = a_[backlog_data[i]['application_id']['id']]
			else:
				b_["app_id"] = "None"
				b_["app_name"] = "None"
			data.append(b_)
	return data
	
def test_defectRejectionRatio(data,appId):
	t_={}
	total = 0 
	rejected = 0
	for i in range(len(data)):
		if data[i]['app_id'] == appId:
			total = total +1
		if data[i]['app_id'] == appId and data[i]['dstatus'] == 'Rejected':
			rejected = rejected +1
	t_['total'] =  total
	t_["rejected"]= rejected
	return t_
		
def defectRejectionRatio(server_url, access_token,workspaceid,wname,app_data,data):
			
	adata=[]
	for i in range(len(app_data)):
		a_={}
		a_['id'] = app_data[i]["id"]
		a_['name'] = app_data[i]["name"]
		adata.append(a_)
	
	
	dRration=[]
	for i in range(len(adata)):
		d_={}
		d_['appname'] = adata[i]['name']
		d_['appid'] = str(adata[i]['id'])
		d_["workspacename"]=str(wname)
		d_["workspaceid"]=str(wname)+"-"+str(workspaceid)
		d = test_defectRejectionRatio(data,adata[i]['id'])
		d_["total"]=d['total']
		d_["rejected"]=d["rejected"]
		dRration.append(d_)
		
	return dRration
	
def defectAgeing(server_url, access_token,workspaceid,wname,data):
	defectAgeing=[]
	for i in range(len(data)):
		if data[i]["dstatus"] == "New" and  data[i]["activeday"] > 20:
			n_={}
			n_['bid']= data[i]['id']
			n_["activeday"]= data[i]["activeday"]
			n_["status"] = data[i]["dstatus"]
			n_["workspacename"]=data[i]["workspacename"]
			n_["workspaceid"]=data[i]["workspaceid"]
			n_["appname"] = data[i]["app_name"]
			
			defectAgeing.append(n_)
		elif data[i]["dstatus"] == "Open" and  data[i]["activeday"] > 20:
			n_={}
			n_['bid']= data[i]['id']
			n_["activeday"]= data[i]["activeday"]
			n_["status"] = data[i]["dstatus"]
			n_["workspacename"]=data[i]["workspacename"]
			n_["workspaceid"]=data[i]["workspaceid"]
			n_["appname"] = data[i]["app_name"]
			defectAgeing.append(n_)
		elif data[i]["dstatus"] == "Fixed" and  data[i]["activeday"] > 20:
			n_={}
			n_['bid']= data[i]['id']
			n_["activeday"]= data[i]["activeday"]
			n_["status"] =data[i]["dstatus"]
			n_["workspacename"]=data[i]["workspacename"]
			n_["workspaceid"]=data[i]["workspaceid"]
			n_["appname"] = data[i]["app_name"]
			defectAgeing.append(n_)
		elif data[i]["dstatus"] == "Propose Close" and  data[i]["activeday"] > 20:
			n_={}
			n_['bid']= data[i]['id']
			n_["activeday"]= data[i]["activeday"]
			n_["status"] =data[i]["dstatus"]
			n_["workspacename"]=data[i]["workspacename"]
			n_["workspaceid"]=data[i]["workspaceid"]
			n_["appname"] = data[i]["app_name"]
			defectAgeing.append(n_)
			
	return defectAgeing
	
def foundDefect(data,id):
	sum =0
	workspacename=""
	workspaceid=""
	tSP=0
	for i in range(len(data)):
		if (data[i]['app_id'] == id and not (data[i]['dstatus'] == 'Rejected')):
			sum = sum +1
			#workspacename=data[i]["workspacename"]
			#workspaceid=data[i]["workspaceid"]
			tSP=data[i]["Tstorypoints"]
	
	data={}
	data["tStorypoints"]= tSP
	data["tDefect"]= sum
	return data
	
def defectConcentration(server_url, access_token,workspaceid,wname,app_data,data):
	
	codeQuality=[]
	for i in range(len(app_data)):
		a_={}
		output = foundDefect(data,app_data[i]['id'])
		a_['workspacename'] = str(wname)
		a_['workspaceid'] = str(wname)+"-"+str(workspaceid)
		a_['tStorypoints'] = output["tStorypoints"]
		a_['tDefect'] = output["tDefect"]
		a_['appname'] = app_data[i]['name']
		a_['appid'] = app_data[i]['id']
		codeQuality.append(a_)
		
	return codeQuality
