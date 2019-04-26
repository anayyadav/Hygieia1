#!/bin/bash

cat > $PROP_FILE <<EOF
#Database Name
dbname=${DB_DATABASE:-dashboard}

#Database HostName - default is localhost
dbhost=${DB_HOST:-db}

#Database Port - default is 27017
dbport=${DB_PORT:-27017}

#Database Username - default is blank
dbusername=${HYGIEIA_API_ENV_SPRING_DATA_MONGODB_USERNAME:-}

#Database Password - default is blank
dbpassword=${HYGIEIA_API_ENV_SPRING_DATA_MONGODB_PASSWORD:-}

#Collector schedule (required)
gitlab.cron=${GITLAB_CRON:-0 0/1 * * * *}

#Gitlab host (optional, defaults to "gitlab.com")
gitlab.host=${GITLAB_HOST:-gitlab.erieinsurance.com}

#Gitlab protocol (optional, defaults to "http")
gitlab.protocol=${GITLAB_PROTOCOL:-https}

#Gitlab port (optional, defaults to protocol default port)
gitlab.port=${GITLAB_PORT:-}

#Gitlab path (optional, defaults to no path)
gitlab.path=${GITLAB_PATH:-}
  
#Gitlab API Token (required, must be an admin account to retrieve all teams for the instance of gitlab.  If not admin, will only retrieve teams the user belongs to)
gitlab.apiToken=${GITLAB_API_TOKEN:-pX2akBSQv7e2rY6exyTn}

#Gitlab selfSignedCertificate (optional, defaults to false, set to true if your instance of gitlab is running on https without a trusted certificate
gitlab.selfSignedCertificate=${GITLAB_SELF_SIGNED_CERTIFICATE:-false}

#Gitlab API Version (optional, defaults to current version of 4)
gitlab.apiVersion=${GITLAB_API_VERSION:-4}

EOF

echo "

===========================================
Properties file created `date`:  $PROP_FILE
Note: passwords hidden
===========================================
`cat $PROP_FILE |egrep -vi password`
 "

exit 0
