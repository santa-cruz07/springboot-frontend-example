# Stage 1: Build the application
FROM amazoncorretto:21.0.2-alpine3.19 as build
WORKDIR /app
COPY ../../pom.xml .
COPY ../../spring/ ./spring/
COPY ../../vue/ ./vue/

ENV spring.profiles.active=prod

# Update packages and install curl
RUN apk update && apk add --no-cache curl

# Install dependencies for Node.js
RUN apk add --no-cache libstdc++ libgcc

# Install Node.js 18
RUN curl -sL https://unofficial-builds.nodejs.org/download/release/v18.0.0/node-v18.0.0-linux-x64-musl.tar.xz | tar -Jxv -C /usr/local --strip-components=1 --no-same-owner

## Verify Node.js and npm installations
RUN node --version && npm --version

# Install Maven
RUN apk add --no-cache maven

RUN mvn -X -V clean install package -DskipTests

# Stage 2: Create the final Docker image
FROM amazoncorretto:21.0.2-alpine3.19
EXPOSE 8080
EXPOSE 443

ARG VERSION
ENV CURRENT_VERSION=$VERSION

ENV spring.profiles.active=prod

COPY --from=build /app/spring/target/spring-0.0.1-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]