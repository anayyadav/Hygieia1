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
subversion.cron=${SUBVERSION_CRON:-0 0/2 * * * *}
#Shared subversion username and password
subversion.username=${SUBVERSION_USERNAME}
subversion.password=${SUBVERSION_PASSWORD}
#Maximum number of days to go back in time when fetching commits
subversion.host=${SUBVERSION_HOST}
subversion.commitThresholdDays=${SUBVERSION_COMMIT_THRESHOLD_DAYS:-20}
EOF

echo "
===========================================
Properties file created `date`:  $PROP_FILE
Note: passwords hidden
===========================================
`cat $PROP_FILE |egrep -vi password`
 "

exit 0
