import json
import requests
import calendar
import datetime
import time
from pymongo import MongoClient
import config


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
		
def isExited(appname,scmRevisionNumber):
	conn = MongoClient(config.Mendix_collector['db_host'],config.Mendix_collector['db_port'])
	db = conn.dashboarddb
	my_collection = db.mendixdata
	myquery = { "appname": appname, "scmRevisionNumber" : scmRevisionNumber }
	my_collection.delete_many(myquery)	
	
def getRevisionTeamServer(appname,appID,username,api_key,branchname):
	data = getrevision(appname,appID,username,api_key,branchname)
	conn = MongoClient(config.Mendix_collector['db_host'],config.Mendix_collector['db_port'])
	db = conn.dashboarddb
	print db
	my_collection = db.mendixdata
	
	for i in range(len(data)):
		c_={}
		c_["appname"] = str(appname)
		ts = time.time()
		c_["timestamp"] = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
		c_["firstEverCommit"] =False
		c_["branchname"] = str(branchname)
		c_["scmAuthor"] = data[i]["Author"]
		c_["scmCommitLog"] = data[i]["CommitMessage"]
		c_["scmCommitTimestamp"] = data[i]["Date"]
		c_["scmRevisionNumber"] = data[i]["Number"]
		isExited(str(appname),data[i]["Number"])
		my_collection.insert(c_)
	
	
	
def getrevisions(appname,appID,username,api_key):
	pack_data = getBranches(appname,appID,username,api_key) 
	commit=[]
	for i in range(len(pack_data)):
		branchname = pack_data[i]["Name"]
		getRevisionTeamServer(appname,appID,username,api_key,branchname)
		
	