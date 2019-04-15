import json
import requests

def get_package(appname,appID,username,api_key):
#GET /api/workspaces/{workspaceID}/applications
	api_url = "https://deploy.mendix.com/api/1/apps/"+str(appID)+"/packages/"
	print api_url
	header = {'Content-Type': 'application/json','Mendix-Username':username,'Mendix-ApiKey':api_key}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		return response.json()
	else:
		return ""

 
def get_build_info(appname,appID,url,username,api_key):
	pack_data = get_package(appname,appID,username,api_key) 
	build=[]
	for i in range(len(pack_data)):
		b_={}
		#b_["timestamp"] = pack_data[i][""]
		b_["number"]= pack_data[i]["Version"]
		if pack_data[i]["Name"] != None and not ( pack_data[i]["Name"].lstrip('Main line') == None ):
			b_["jobname"]= 'Main line'
		elif pack_data[i]["Name"] != None:
			b_["jobname"]= pack_data[i]["Name"].rstrip("_"+pack_data[i]["Version"]+".mda")
		
		b_["startTime"]= pack_data[i]["CreationDate"]
		b_["appname"]=str(appname)
		b_["buildStatus"] =  pack_data[i]["Status"]
		b_["endTime"]= pack_data[i]["ExpiryDate"]
		b_["buildUrl"]= str(url)
		b_["packageId"] = pack_data[i]["PackageId"]
		b_["size"] = pack_data[i]["Size"]
		b_["logs"] = str(pack_data[i]["Creator"])
		if('jobname' in b_):
			build.append(b_)
	
	return build
	