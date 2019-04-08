import json
import requests	

def get_workspace(server_url, access_token):
	api_url = server_url+'/agm/api/workspaces'+'?offset=0&limit=2000'
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	workspace_data=[]
	data ={}
	print "connecting....."
	if response.status_code == 200:
		print "connection established and collecting workspace data "
		data = response.json()['data']
	else:
		print "Connection failed with status code = ", response.status_code
		
	for i in range(len(data)):
		d_={}
		d_['workspace_id']= data[i]['id']
		d_['workspace_name']= data[i]['name']
		workspace_data.append(d_)
		
	return workspace_data
