import json
import requests

def get_sprintsItems(server_url, access_token,workspaceid,limit,offset):
	api_url = server_url+'/agm/api/workspaces/'+workspaceid+'/sprints'+'?offset='+offset+'&limit='+limit
	print api_url
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		return response.json()["data"]
	else:
		print "status code = ", response.status_code
		return ""
		
def get_sprints(server_url, access_token,workspaceid,workspacename):
	s =0
	api_url = server_url+'/agm/api/workspaces/'+workspaceid+'/sprints/'
	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {0}'.format(access_token)}
	response = requests.get(api_url, headers=header)
	if response.status_code == 200:
		s = (response.json()['TotalResults'])
		print "total number of sprint item in workspace",workspacename,"is = ",s
	else:
		print "status code = ", response.status_code
	
	offset=0
	limit=2000
	sprints_itesm=[]
	c =0
	if s < 100:
		limit = 100
		offset=0
		sprints_itesm = get_sprintsItems(server_url, access_token,workspaceid,str(limit),str(offset))
		
	elif s > 100 and s < limit:
		sdata = get_sprintsItems(server_url, access_token,workspaceid,str(limit),str(offset))
		sprints_itesm = sprints_itesm + sdata
	else:	
		while (s >= limit and c < 2):
			sdata = get_sprintsItems(server_url, access_token,workspaceid,str(limit),str(offset))
			sprints_itesm = sprints_itesm + sdata
			print(len(sdata))
			offset=limit
			if(s -limit < limit):
				limit = s
				c = c+1
			else:
				limit = 2*limit

	return sprints_itesm
