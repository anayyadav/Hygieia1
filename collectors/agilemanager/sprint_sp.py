import json
import requests	
import backlog
import sprints
import datetime 
import releases


def Print3Smallest(arr): 
	MAX = 100000
	firstmin={}
	firstmin['day']= MAX
	firstmin['sprintid1']= 'sdsdfsdfff'
	secmin={}
	secmin['day']= MAX
	secmin['sprintid2']= 'sdsdfsdfsasff'
	thirdmin={}
	thirdmin['day']= MAX
	thirdmin['sprintid3']= 'sdsdfssasdasasfff'
	result ={}
	for i in range(0, len(arr)): 
		if arr[i]['day'] < firstmin['day']: 
			thirdmin['day'] = secmin['day'] 
			thirdmin['sprintid3'] = secmin['sprintid2']
			secmin['day'] = firstmin['day']
			secmin['sprintid2'] = firstmin['sprintid1']
			firstmin['day'] = arr[i]['day']
			firstmin['sprintid1'] = arr[i]['sprintid']
		elif arr[i]['day'] < secmin['day']: 
			thirdmin['day'] = secmin['day'] 
			thirdmin['sprintid3'] = secmin['sprintid2']
			secmin['day'] = arr[i]['day']
			secmin['sprintid2'] = arr[i]['sprintid']
		elif arr[i]['day'] < thirdmin['day']: 
			thirdmin['sprintid3'] = arr[i]['sprintid']
			thirdmin['day'] =arr[i]['day']
			
	result["firstmin"] = firstmin
	result["secmin"] = secmin
	result["thirdmin"] = thirdmin
	return result


def get_data(backlog_data,s_id,appID):
	sum = 0
	
	for j in range(len(backlog_data)):
			if not(backlog_data[j]['story_points'] == None) and not(backlog_data[j]['sprint_id'] == None) and not(backlog_data[j]['application_id'] == None) and (backlog_data[j]['status'] == 'Done'):
				if(backlog_data[j]['sprint_id']['id']==s_id and backlog_data[j]['application_id']['id'] == appID):
					sum =sum+int(backlog_data[j]['story_points'])
	
	
	return sum

def getstatus(backlog_data,s_id,appID):
	new=0
	new_SP = 0 
	inp=0
	inp_SP =0 
	intesting=0
	intesting_SP = 0
	done=0
	done_SP =0 
	for j in range(len(backlog_data)):
			if not(backlog_data[j]['story_points'] == None) and not(backlog_data[j]['sprint_id'] ==None) and not(backlog_data[j]['application_id'] ==None):
				if(backlog_data[j]['sprint_id']['id']==s_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'In Progress'):
					inp= inp+1
					inp_SP =inp_SP + backlog_data[j]['story_points']
				elif(backlog_data[j]['sprint_id']['id']==s_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'New'):
					new = new+1
					new_SP =new_SP +  backlog_data[j]['story_points']
				elif(backlog_data[j]['sprint_id']['id']==s_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'Done'):
					done =done+1
					done_SP =done_SP  +  backlog_data[j]['story_points']
				elif(backlog_data[j]['sprint_id']['id']==s_id) and (backlog_data[j]['application_id']['id']==appID) and (backlog_data[j]['status'] == 'In Testing'):
					intesting = intesting+1
					intesting_SP =intesting_SP + backlog_data[j]['story_points'] 
	result={}
	result["New"]=new
	result["new_SP"]=new_SP
	result["In_Progress"]=inp
	result["inp_SP"]=inp_SP
	result["In_testing"]=intesting
	result["intesting_SP"]= intesting_SP
	result['Done']=done
	result["done_SP"]= done_SP
	return result

def sortData(s_data,gv_data):
	sortList=[]
	for i in range(len(gv_data)):
		day = (datetime.datetime.strptime(gv_data[i]["startdate"], '%Y-%m-%d') - datetime.datetime.strptime(gv_data[i]["today"] , '%Y-%m-%d')).days
		if (day > 0 ):
			s_={}
			s_["day"] = day
			s_["sprintid"] = s_data[i]['sprintid']
			sortList.append(s_)
	result = Print3Smallest(sortList)
	output={}
	firstnext=[]
	secondnext=[]
	thirdnext=[]
	
	for i in range(len(s_data)):
		if(result['firstmin']['sprintid1'] == s_data[i]['sprintid']):
			firstnext.append(s_data[i])
		elif (result['secmin']['sprintid2'] == s_data[i]['sprintid']):
			secondnext.append(s_data[i])
		elif(result['thirdmin']['sprintid3'] == s_data[i]['sprintid']):
			thirdnext.append(s_data[i])
				
	output["firstnext"]= firstnext
	output["secondnext"]= secondnext
	output["thirdnext"]= thirdnext
	return output 
		
def sprint_remaining_sp(serves_url, access_token,workspaceid,workspacename,release_data,backlog_data,sprint_data,app_data):
	data={}
	app=[]
	for i in range(len(app_data)):
		a_={}
		a_["id"] = app_data[i]["id"]
		a_["name"] = app_data[i]["name"]
		app.append(a_)
	
	r_data={}
	for i in range(len(release_data)):
		r_data[release_data[i]['id']] = str(release_data[i]['name'])
	
	totalSP = 0
	for i in range(len(backlog_data)):
		if(not(backlog_data[i]['story_points'] == None)):
			totalSP = totalSP + int(backlog_data[i]['story_points'])
	gv_data=[]	
	s_data=[]
	for j in range(len(app)):
		for i in range(len(sprint_data)):
			if(j == 0):
				gv_={}
				sp = get_data(backlog_data,sprint_data[i]['id'],app[j]["id"])
				gv_['Total_SP'] = totalSP
				gv_['sprintid']= sprint_data[i]['id']
				gv_['workspaceid']=str(workspacename)+"-"+str(workspaceid)
				gv_['sprintname']=sprint_data[i]['name']
				gv_["startdate"]=sprint_data[i]['start_date']
				gv_['enddate'] =sprint_data[i]['end_date']
				gv_["today"]=datetime.datetime.today().strftime('%Y-%m-%d')
				gv_['doneSP']=sp
				status=getstatus(backlog_data,sprint_data[i]['id'],app[j]["id"])
				gv_['status']=status
				gv_['releaseid']=str(r_data[sprint_data[i]['release_id']["id"]])+"-"+str(sprint_data[i]['release_id']["id"])
				gv_['releasename']= str(r_data[sprint_data[i]['release_id']["id"]])
				gv_data.append(gv_)
				
			s_={}
			s_['appID'] = str(app[j]["name"])+"-"+str(app[j]["id"])
			sp = get_data(backlog_data,sprint_data[i]['id'],app[j]["id"])
			s_['Total_SP'] = totalSP
			s_['sprintid']= sprint_data[i]['id']
			s_['workspaceid']=str(workspacename)+"-"+str(workspaceid)
			s_['sprintname']=sprint_data[i]['name']
			s_["startdate"]=sprint_data[i]['start_date']
			s_['enddate'] =sprint_data[i]['end_date']
			s_["today"]=datetime.datetime.today().strftime('%Y-%m-%d')
			s_['doneSP']=sp
			status=getstatus(backlog_data,sprint_data[i]['id'],app[j]["id"])
			s_['status']=status
			s_['releaseid']=str(r_data[sprint_data[i]['release_id']["id"]])+"-"+str(sprint_data[i]['release_id']["id"])
			s_['releasename']= str(r_data[sprint_data[i]['release_id']["id"]])
			s_data.append(s_)
		
	data["gvdata"]=gv_data
	data["sdata"]=s_data	
	output = sortData(s_data,gv_data)
	data["firstnext"] = output["firstnext"]  
	data["secondnext"]= output["secondnext"]
	data["thirdnext"]= output["thirdnext"]
	return data
	

	

