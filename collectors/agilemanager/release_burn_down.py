import json
import requests	
import backlog
import releases
import datetime 
import config
from pymongo import MongoClient

def get_data(backlog_data,r_id):
	sum = 0
	for j in range(len(backlog_data)):
			if not(backlog_data[j]['story_points'] == None) and not(backlog_data[j]['release_id'] ==None) and not(backlog_data[j]['status'] =="Done") :
				if(backlog_data[j]['release_id']['id']==r_id ):
					sum =sum+int(backlog_data[j]['story_points'])
	
	return sum

def getstatus(backlog_data,r_id,url,appID):
	new=0
	inp=0
	intesting=0
	done=0
	inpSP=0
	newSP =0 
	doneSP =0
	intestingSP = 0
	for j in range(len(backlog_data)):
			if not(backlog_data[j]['story_points'] == None) and not(backlog_data[j]['release_id'] ==None) and not(backlog_data[j]['application_id'] ==None):
				if(backlog_data[j]['release_id']['id']==r_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'In Progress'):
					inp= inp+1
					inpSP =  inpSP + backlog_data[j]['story_points']
				elif(backlog_data[j]['release_id']['id']==r_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'New'):
					new = new+1
					newSP =  newSP + backlog_data[j]['story_points']
				elif(backlog_data[j]['release_id']['id']==r_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'Done'):
					done =done+1
					doneSP =  doneSP + backlog_data[j]['story_points']
				elif (backlog_data[j]['release_id']['id']==r_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'In Testing'):
					intesting = intesting+1
					intestingSP =  intestingSP + backlog_data[j]['story_points']
	result={}
	result["New"]=new
	result["inpSP"] = inpSP
	result["newSP"] = newSP
	result["doneSP"] = doneSP
	result["intestingSP"] = intestingSP
	result["In_Progress"]=inp
	result["In_testing"]=intesting
	result['Done']=done
	result['Url']= url+"/agm/login"
	return result
	
def remaning_sp(server_url, access_token,workspaceid,workspace_name,url,release_data,backlog_data,app_data):
	data={}
	r_data=[]
	rburn=[]
	app=[]
	for i in range(len(app_data)):
		a_={}
		a_["id"] = app_data[i]["id"]
		a_["name"] = app_data[i]["name"]
		app.append(a_)
		
#	try:
	conn = MongoClient(config.Agilemanager_collector['db_host'],config.Agilemanager_collector['db_port'])
	print conn	
	#print("Connected successfully!!!")
	#except:
	#	print "Could not connect to MongoDB"
	
	db = conn.dashboard
	collection = db.hpmdata_brun
	for j in range(len(app)):
		for i in range(len(release_data)):
			rb_={}
			if(j == 0):
				#rb_['appID'] = str(app[j]["name"])+"-"+str(app[j]["id"])
				rb_['releaseid'] =  str(release_data[i]['name'])+"-"+str(release_data[i]['id'])
				rb_['workspaceid'] = str(workspace_name)+"-"+str(workspaceid)
				rb_['releasename'] = release_data[i]['name']
				rb_["startdate"] = release_data[i]['start_date']
				rb_['enddate'] = release_data[i]['end_date']
				rb_["today"] = datetime.datetime.today().strftime('%Y-%m-%d') 
				sp = get_data(backlog_data,release_data[i]['id'])
				rb_['remainingSP']=sp
				status = getstatus(backlog_data,release_data[i]['id'],url,app[j]["id"])
				rb_['status']=status
				collection.insert(rb_)
				rburn.append(rb_)

			r_={}
			r_['appID'] = str(app[j]["name"])+"-"+str(app[j]["id"])
			r_['releaseid']=  str(release_data[i]['name'])+"-"+str(release_data[i]['id'])
			r_['workspaceid']=str(workspace_name)+"-"+str(workspaceid)
			r_['releasename']=release_data[i]['name']
			r_["startdate"]=release_data[i]['start_date']
			r_['enddate'] =release_data[i]['end_date']
			r_["today"]=datetime.datetime.today().strftime('%Y-%m-%d')
			sp = get_data(backlog_data,release_data[i]['id'])
			r_['remainingSP']=sp
			status=getstatus(backlog_data,release_data[i]['id'],url,app[j]["id"])
			r_['status']=status
			r_data.append(r_)
	
	data["rburn"] = rburn
	data["r_data"] = r_data
	return data

def getSpikecount(apid,backlog_data):
	sData = {}
	spike =0
	spike_point = 0 
	for i in range(len(backlog_data)):
		if not(backlog_data[i]['application_id']== None)  and not(backlog_data[i]['story_points']== None) and backlog_data[i]['application_id']['id'] == apid  :
			if backlog_data[i]['story_points'] > 8:
				spike = spike+1
				spike_point= spike_point + backlog_data[i]['story_points']
	
	sData['spike'] = spike
	sData['spike_point'] =spike_point	
	
	return sData
	
def spikedata(release_data,backlog_data,app_data,workspace_name,workspaceid):
	s=[]
	for i in range(len(app_data)):
		for j in range(len(release_data)):
			s_={}
			s_['releaseid'] =  str(release_data[j]['name'])+"-"+str(release_data[j]['id'])
			s_['workspaceid'] = str(workspace_name)+"-"+str(workspaceid)
			spike = getSpikecount(app_data[i]["id"],backlog_data)
			s_["appID"]= str(app_data[i]["name"]) +"-"+ str(app_data[i]["id"])
			s_["appname"] = app_data[i]["name"]
			s_["spikeCount"] = spike['spike']
			s_["spikePoints"] = spike['spike_point']
			s.append(s_)
		
	return s
