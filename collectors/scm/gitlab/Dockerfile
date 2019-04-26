FROM openjdk:8-jre

VOLUME ["/hygieia/logs"]

RUN mkdir /hygieia/config

EXPOSE 8080

ENV PROP_FILE /hygieia/config/application.properties

COPY certificates/ /usr/local/share/ca-certificates/
RUN update-ca-certificates && \
    ls -1 /usr/local/share/ca-certificates | while read cert; do \
        openssl x509 -outform der -in /usr/local/share/ca-certificates/$cert -out $cert.der; \
        keytool -import -alias $cert -keystore $JAVA_HOME/lib/security/cacerts -trustcacerts -file $cert.der -storepass changeit -noprompt; \
        rm $cert.der; \
    done

WORKDIR /hygieia

COPY target/*.jar /hygieia
COPY docker/properties-builder.sh /hygieia/

CMD ./properties-builder.sh &&\
  java -Djava.security.egd=file:/dev/./urandom -jar *.jar --spring.config.location=$PROP_FILE