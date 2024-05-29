FROM openjdk:17-jdk-slim
ADD build/libs/dashboard-kanban-1.0.jar dashboard-kanban-1.0.jar
ADD db.sql /docker-entrypoint-initdb.d
ENTRYPOINT [ "java", "-jar", "dashboard-kanban-1.0.jar"]
