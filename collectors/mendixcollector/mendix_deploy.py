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
	api_url = "https://deploy.mendix.com/api/1/apps/"+str(appID)+"/environments/"+str(mode)+"package/"
	header = {'Content-Type': 'application/json','Mendix-Username':username,'Mendix-ApiKey':api_key}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		return response.json()
	else:
		return ""
		
def getEnvironment(appname,appID,username,api_key):
	envir = getenvir(appname,appID,username,api_key) 
	env=[]
	for i in range(len(envir)):
		output = getdeployedpackage(envir[i]["Mode"],appname,appID,username,api_key)
		for i in range(len(output)):
			b_={}
			c_={}
			c_["environmentName"] = str(envir[i]["Mode"])
			b_["environmentName"] = str(envir[i]["Mode"])
			c_["componentName"] = output[i]["Name"]
			b_["componentName"] = output[i]["Name"]
			c_["componentVersion"] = output[i]["Version"]
			b_["online"]= str(envir[i]["Status"])
			c_["deployed"] =  output[i]["Status"]
			c_["deployTime"]= 0
			c_["asOfDate"] = output[i]["CreationDate"]
			env=env.append(b_)
	
	return env
	