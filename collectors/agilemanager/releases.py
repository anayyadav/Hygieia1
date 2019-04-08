import json
import requests	

def get_releases_items(server_url, access_token,workspaceid,workspacename):
	api_url = server_url+'/agm/api/workspaces/'+workspaceid+'/releases'
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		print "collecting data of releases from workspace",workspacename
		return response.json()["data"]
		
	else:
		print "status code = ", response.status_code
		return ""
	
def get_release_teams(server_url, access_token,workspaceid,workspacename):
	api_url = server_url+'/agm/api/workspaces/'+workspaceid+'/release_teams'
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		print "collecting data of releases teams from workspace",workspacename
		return response.json()["data"]
		
	else:
		print "status code = ", response.status_code
		return ""
