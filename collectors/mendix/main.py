import json
import requests
import mendix_build
import mendixApps
import mendix_teamserver
from pymongo import MongoClient
import config
	
	
def getTeamserverData():
	conn = MongoClient(config.Mendix_collector['db_host'],config.Mendix_collector['db_port'])
	db = conn.dashboarddb
	my_collection = db.mendixdata
	cursor = my_collection.find()
	data=[]
	for record in cursor:
		del record['_id']
		data.append(record)
	
	return data
	
	
def main1(username,api_key):
	apps = mendixApps.getResult(username,api_key)
	package=[]
	final_data={}
	commits=[]
	for i in range(len(apps)):
		packages = mendix_build.get_build_info(apps[i]["appName"],apps[i]["appID"],apps[i]["url"],username,api_key)
		package =package+packages
		mendix_teamserver.getrevisions(apps[i]["appName"],apps[i]["appID"],username,api_key)
		
	
	final_data["buildApiDetails"] = package
	final_data["commits"] =  getTeamserverData()
	
	conn = MongoClient(config.Mendix_collector['db_host'],config.Mendix_collector['db_port'])
	db = conn.dashboard
	print db
	my_collection = db.mendixdata
	my_collection.drop()
	my_collection.insert(final_data)

if __name__ == '__main__':
	username = config.Mendix_collector['username']
	api_key = config.Mendix_collector['apikey'] 
	main1(username,api_key)