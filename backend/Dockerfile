FROM openjdk:17-jdk-slim
ADD build/libs/dashboardKanban-1.0.jar dashboardKanban-1.0.jar
ADD db.sql /docker-entrypoint-initdb.d
ENTRYPOINT [ "java", "-jar", "dashboardKanban-1.0.jar"]
