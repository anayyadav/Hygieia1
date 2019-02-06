#!/bin/bash


cat > $PROP_FILE <<EOF
#Database Name
dbname=${DB_DATABASE:-dashboard}

#Database HostName - default is localhost
dbhost=${DB_HOST:-db}

#Database Port - default is 27017
dbport=${DB_PORT:-27017}


#Database Username - default is blank
dbusername=

#Database Password - default is blank
dbpassword=

#Collector schedule (required)
udeploy.cron=${UCD_CRON}

#UDeploy server (required) - Can provide multiple
udeploy.servers[0]=${UCD_SERVER}
udeploy.niceNames[0]=

#UDeploy user name (required)
udeploy.username=

#UDeploy password (required)
udeploy.password=

# UDeploy token can be used instead of username and password
udeploy.token=${UCD_TOKEN}

EOF

echo "

===========================================
Properties file created `date`:  $PROP_FILE
Note: passwords hidden
===========================================
`cat $PROP_FILE |egrep -vi password`
 "

exit 0
