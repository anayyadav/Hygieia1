import json
import requests

def get_backlogItems(server_url, access_token,workspaceid,offset):
	api_url = server_url+'/agm/api/workspaces/'+workspaceid+'/backlog_items'+'?offset='+offset
	print api_url
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		#print("collecting data from backlog items... ")
		data=  response.json()
		return data['data']
 #response.json()['data']	
	else:
		print "status code = ", response.status_code
		return ""
	
def get_backlog(server_url, access_token,workspaceid,workspacename):
	api_url = server_url+'/agm/api/workspaces/'+workspaceid+'/backlog_items'
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		s = (response.json()['TotalResults'])
		print "total number of backlog item in workspace",workspacename,"is = ",s
	else:
		print "status code = ", response.status_code
		

	offset=0
	limit=100
	n = int(s/limit)
	m = int(s%limit)
	backlog_itesm=[]

	for i in range(0,n):
		print ".",
		data= get_backlogItems(server_url, access_token,workspaceid,str(offset))
		offset = offset+limit
		backlog_itesm = backlog_itesm + data
	
	if( m > 0 and m <= 100 ):
		print "."
		data= get_backlogItems(server_url, access_token,workspaceid,str(offset))
		backlog_itesm = backlog_itesm + data

	return backlog_itesm
