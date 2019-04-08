from pymongo import MongoClient
import config

def get_data():
	conn = MongoClient(config.Agilemanager_collector['db_host'],config.Agilemanager_collector['db_port'])
	db = conn.dashboard
	collection = db.hpmdata_brun	
	cursor = collection.find()
	data=[]
	for record in cursor:
		del record['_id']
		data.append(record)
		
	return data
