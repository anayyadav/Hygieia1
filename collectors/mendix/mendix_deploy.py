import json
import requests

def getenvir(appname,appID,username,api_key):
#GET /api/workspaces/{workspaceID}/applications
	api_url = "https://deploy.mendix.com/api/1/apps/"+str(appID)+"/environments/"
	header = {'Content-Type': 'application/json','Mendix-Username':username,'Mendix-ApiKey':api_key}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		return response.json()
	else:
		return ""
		
def getdeployedpackage(mode,appname,appID,username,api_key):
	api_url = "https://deploy.mendix.com/api/1/apps/"+str(appID)+"/environments/"+str(mode)+"/package"
	header = {'Content-Type': 'application/json','Mendix-Username':username,'Mendix-ApiKey':api_key}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		return response.json()
	else:
		return ""

def getUnit(mode,appname,appID,username,api_key,status,url,):
	unit  = getdeployedpackage(mode,appname,appID,username,api_key)
	b={}
	online = False
	if len(unit) > 0:
		b["name"]= unit["Name"]
		b["version"] = unit["Version"]
		if status == "Running":
			b["deployed"] = True
			online = True
		else:
			b["deployed"] = False
		b["lastupdated"] = unit["CreationDate"]
		b["packageid"] = unit["PackageId"]
		b["servers"] = {"name": url, "online": online }
		b["mendixversion"] = unit["MendixVersion"]
			
	return b

def getEnvironment(appname,appID,username,api_key):
	envir = getenvir(appname,appID,username,api_key)
	env=[]
	for i in range(len(envir)):
		c={}
		c["name"]= envir[i]["Mode"]
		result = getUnit(envir[i]["Mode"],appname,appID,username,api_key,envir[i]["Status"],envir[i]["Url"])
		c["units"]= result
		c["url"] = envir[i]["Url"]
		c["appname"] = appname
		env.append(c)
	return env
	