FROM gradle:8.5-jdk17-alpine AS build

# Define workidir
WORKDIR /home/gradle/src

RUN apk add --no-cache dos2unix
# Copy Gradle and wrapper configuration files to root container
# COPY build.gradle settings.gradle ./
# COPY gradlew ./
# COPY gradle ./gradle

COPY . .

RUN dos2unix ./gradlew
RUN ls -la

RUN chmod +x ./gradlew

# Copy sourde code
# COPY src ./src

# Execute compilation command
RUN ./gradlew clean build -x test --no-daemon --stacktrace

# Run build
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /home/gradle/src/build/libs/*.jar dashboardKanban-1.0.jar

# ADD build/libs/dashboardKanban-1.0.jar dashboardKanban-1.0.jar
ADD db.sql /docker-entrypoint-initdb.d
ENTRYPOINT [ "java", "-jar", "dashboardKanban-1.0.jar"]
