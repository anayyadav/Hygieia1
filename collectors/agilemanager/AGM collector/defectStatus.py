import json
import requests	
import datetime

def getStatus(backlog_data,appID,rID,sName):
	status={}
	new =0
	open=0
	fixed =0
	pclose = 0
	close =0
	defferred =0
	duplicate =0
	rejected =0 
	for j in range(len(backlog_data)):
		if ("defect_status" in backlog_data[j]) and not(backlog_data[j]['user_06_d'] ==None) and not(backlog_data[j]['application_id'] ==None) and not(backlog_data[j]['release_id'] ==None):
			if(backlog_data[j]['release_id']['id']==rID) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['user_06_d'] == sName):
				if(backlog_data[j]['defect_status'] == "New"):
					new = new +1
				elif(backlog_data[j]['defect_status'] == "Open"):
					open =open + 1
				elif(backlog_data[j]['defect_status'] == "Fixed"):
					fixed =fixed +1
				elif(backlog_data[j]['defect_status'] == "Propose Close"):
					pclose =pclose +1
				elif(backlog_data[j]['defect_status'] == "Closed"):
					close = close +1
				elif(backlog_data[j]['defect_status'] == "Defferred"):
					defferred =defferred +1
				elif(backlog_data[j]['defect_status'] == "Duplicate"):
					duplicate =duplicate +1
				elif(backlog_data[j]['defect_status'] == "Rejected"):
					rejected= rejected +1
			
	status["New"]=new
	status["open"]=open
	status["fixed"]=fixed
	status["pclose"]=pclose
	status["close"]=close
	status["defferred"]=defferred
	status["duplicate"]=duplicate
	status["rejected"]=rejected
	return status
	
	
def getDefectStatus(app_data,release_data,sprint_data,backlog_data):
	data=[]
	for i in range(len(release_data)):
		for j in range(len(app_data)):
			for k in range(len(sprint_data)):
				d_={}
				d_["releaseid"]= str(release_data[i]['name'])+"-"+str(release_data[i]['id'])
				d_["releasename"]= str(release_data[i]['name'])
				d_["appname"]=str(app_data[j]['name'])
				d_["appID"]=str(app_data[j]['name'])+"-"+str(app_data[j]['id'])
				d_["sprintname"] = sprint_data[k]['name']
				d_["startdate"]=sprint_data[k]['start_date']
				d_['enddate'] =sprint_data[k]['end_date']
				d_["today"]=datetime.datetime.today().strftime('%Y-%m-%d')
				d_["sprintID"] = str(sprint_data[k]['id'])+"-"+str(sprint_data[k]['name'])
				d_["status"] = getStatus(backlog_data,app_data[j]['id'],release_data[i]['id'],sprint_data[k]['name'])
				data.append(d_)
	
	
	return data