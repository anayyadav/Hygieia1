#!/bin/bash

cat > $PROP_FILE <<EOF
#Database Name - default is test
database=${DB_DATABASE:-dashboard}
#Database HostName - default is localhost
dbhost=${DB_HOST:-db}
#Database Port - default is 27017
dbport=${DB_PORT:-27017}
#Database Username - default is blank
dbusername=
#Database Password - default is blank
dbpassword=
#Logging File
logging.file=${APPDYNAMICS_LOGFILE:-./logs/appd-collector.log}
#Collector schedule (required)
appdynamics.cron=${APD_CRON}
#Appdynamics server (required)
appdynamics.instanceUrls=${APD_URLS}
#Appdynamics Username (required)
appdynamics.username=${APD_USERNAME} # (if multi-tenancy APPD_USERNAME@TENANT)
#Appdynamics Password (required)
appdynamics.password=${APD_PASSWORD}
#Appdynamics Dashboard (required)
appdynamics.dashboardUrl=${APD_DASHBOARD_URL}
EOF
