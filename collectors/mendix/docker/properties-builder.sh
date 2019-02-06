#Database Name
mendix.dbname=${DB_DATABASE:-dashboard}
#Database HostName - default is localhost
mendix.dbhost=${MONGO_HOST:-db}
#Database Port - default is 27017
mendix.dbport=${MONGO_PORT:-27017}
#Database Username - default is blank
dbusername=
#${HYGIEIA_API_ENV_SPRING_DATA_MONGODB_USERNAME:-dashboarduser}
#Database Password - default is blank
dbpassword=
#${HYGIEIA_API_ENV_SPRING_DATA_MONGODB_PASSWORD:-dbpassword}
#Collector schedule (required)
# mendix app url (required)
mendix.appname=${MENDIX_APPNAME}
# mendix app username
mendix.username=${MENDIX_USERNAME}
# mendix app apikeys
mendix.apikey=${MENDIX_APIKEY}
EOF
echo "
===========================================
Properties file created `date`:  $PROP_FILE
Note: passwords hidden
===========================================
`cat $PROP_FILE |egrep -vi password`
 "
exit 0
