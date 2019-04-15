import json
import requests

def getApps(username,api_key):
	api_url = "https://deploy.mendix.com/api/1/apps"
	header = {'Content-Type': 'application/json','Mendix-Username':username,'Mendix-ApiKey':api_key}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		print "collecting application data"
		return response.json()
	else:
		
		return ""
		
	
def apps(appdata):
	app=[]
	for i in range(len(appdata)):
		a_={}
		a_["appID"]= appdata[i]["AppId"]
		a_["appName"]=appdata[i]["Name"]
		a_["projectID"]=appdata[i]["ProjectId"]
		a_["url"]=appdata[i]["Url"]
		app.append(a_)
	
	return app

	
	
def getResult(username,api_key):
	appdata = getApps(username,api_key)
	app =apps(appdata)
	
	return app 