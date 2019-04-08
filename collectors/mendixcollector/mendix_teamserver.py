import json
import requests
import calendar;
import time;

def getBranches(appname,appID,username,api_key):
#GET /api/workspaces/{workspaceID}/applications
	api_url = "https://deploy.mendix.com/api/1/apps/"+str(appID)+"/branches/"
	header = {'Content-Type': 'application/json','Mendix-Username':username,'Mendix-ApiKey':api_key}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		return response.json()
	else:
		return ""


def getrevision(appname,appID,username,api_key,branchname):
	api_url = "https://deploy.mendix.com/api/1/apps/"+str(appID)+"/branches/"+str(branchname)+"/revisions"
	print api_url
	header = {'Content-Type': 'application/json','Mendix-Username':username,'Mendix-ApiKey':api_key}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		return response.json()
	else:
		return ""
		
def getRevisionTeamServer(appname,appID,username,api_key,branchname):
	data = getrevision(appname,appID,username,api_key,branchname)
	output=[]
	for i in range(len(data)):
		c_={}
		c_["appname"] = str(appname)
		c_["timestamp"] = calendar.timegm(time.gmtime())
		c_["firstEverCommit"] =False
		c_["scmAuthor"] = data[i]["Author"]
		c_["scmCommitLog"] = data[i]["CommitMessage"]
		c_["scmCommitTimestamp"] = data[i]["Date"]
		c_["scmRevisionNumber"] = data[i]["Number"]
		output.append(c_)
	
	return output
	
def getrevisions(appname,appID,username,api_key):
	pack_data = getBranches(appname,appID,username,api_key) 
	commit=[]
	for i in range(len(pack_data)):
		branchname = pack_data[i]["Name"]
		commit = commit + getRevisionTeamServer(appname,appID,username,api_key,branchname)
	
	return commit
	