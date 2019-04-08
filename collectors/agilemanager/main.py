import json
import requests
import rBurn
import workspace
import config
import backlog
import sprints
import sprint_sp
import applications
import releases
import release_burn_down
import datetime
from pymongo import MongoClient

# get_access_token will return a token which we will need to pull the data from the server
def get_acess_token(server_url,client_id,client_secret):
	api_url = server_url+'/agm/oauth/token'
	params = {'client_id': client_id,'client_secret': client_secret,'grant_type': 'client_credentials'}
	response =requests.post(api_url, data=params)
	print("connecting to server .....")
	if response.status_code == 200:
		print("collecting the access token...")
		return response.json()["access_token"]
	else:
		return response.status_code
		
def get_currentSprint(hpamSprint):
	currentSprint=[]
	for i in range(len(hpamSprint)):
		if ( (datetime.datetime.strptime(hpamSprint[i]["today"], '%Y-%m-%d') - datetime.datetime.strptime(hpamSprint[i]["startdate"] , '%Y-%m-%d') >= datetime.timedelta(0)) and (datetime.datetime.strptime(hpamSprint[i]["enddate"], '%Y-%m-%d') - datetime.datetime.strptime(hpamSprint[i]["today"] , '%Y-%m-%d') >= datetime.timedelta(0))):
			currentSprint.append(hpamSprint[i])

	return  currentSprint

def get_data(server_url,client_id,client_secret):
	access_token = get_acess_token(server_url,client_id,client_secret)
	workspace_data = workspace.get_workspace(server_url, access_token)
	final_data={}
	firstnext=[]
	secondnext=[]
	thirdnext=[]
	spikedata=[]
	r_burn=[]
	s_sprint=[]
	defectRej=[]
	defectAge=[]
	defectConc=[]
	for i in range(len(workspace_data)):
		wid = str(workspace_data[i]['workspace_id'])
		wname = str(workspace_data[i]['workspace_name'])
		backlog_data = backlog.get_backlog(server_url, access_token,wid,wname)
		sprint_data = sprints.get_sprints(server_url, access_token,wid,wname)
		release_data = releases.get_releases_items(server_url, access_token,wid,wname)
		app_data = applications.get_applications(server_url,access_token,wid)
		data =  applications.get_defect(server_url, access_token,wid,wname,backlog_data,app_data)
		defectRej = defectRej + applications.defectRejectionRatio(server_url, access_token,wid,wname,app_data,data)
		defectAge = defectAge + applications.defectAgeing(server_url, access_token,wid,wname,data)
		defectConc = defectConc + applications.defectConcentration(server_url, access_token,wid,wname,app_data,data)
		sData = sprint_sp.sprint_remaining_sp(server_url, access_token,wid,wname,release_data,backlog_data,sprint_data,app_data)
		s_sprint = s_sprint + sData["sdata"]
		firstnext = firstnext + sData["firstnext"]
		secondnext = secondnext + sData["secondnext"]
		thirdnext = thirdnext + sData["thirdnext"]
		r_burn = r_burn + release_burn_down.remaning_sp(server_url, access_token,wid,wname,server_url,release_data,backlog_data,app_data)["r_data"]
		spikedata = spikedata + release_burn_down.spikedata(release_data,backlog_data,app_data,wname,wid) 
	

#	try:
	conn = MongoClient(config.Agilemanager_collector['db_host'],config.Agilemanager_collector['db_port'])
#	print "Connected successfully!!!"
#	except:
#		print "Could not connect to MongoDB"
	
	hpamCurrentSprint=get_currentSprint(s_sprint)
	final_data["hpamRelease"] = r_burn
	final_data["hpamSprint"] = s_sprint
	final_data["hpamCurrentSprint"] = hpamCurrentSprint
	#final_data["hpamRBurn"] = rBurn.get_data()
	final_data["hpamDefectRejection"]=defectRej
	final_data["hpamDefectAgeing"] = defectAge
	final_data["hpamDefectConcentration"] = defectConc
	final_data["hpamFirstnext"] = firstnext 
	final_data["hpamSecondnext"] = secondnext
	final_data["hpamThirdnext"] =thirdnext
	final_data["hpamSpikedata"] = spikedata
	
	db = conn.dashboard
	print db
	my_collection = db.hpamdata
	my_collection.drop()
	my_collection.insert(final_data)
	
def main1():
	s_url = config.Agilemanager_collector['AGM_SERVER']
	if len(s_url) == 0:
		print("Please enter server URL in config.py file ")
	else:
		server_url= s_url
		client_id = config.Agilemanager_collector['client_id']
		client_secret = config.Agilemanager_collector['client_secret']
		get_data(server_url,client_id,client_secret)

if __name__ == '__main__':
    main1()
