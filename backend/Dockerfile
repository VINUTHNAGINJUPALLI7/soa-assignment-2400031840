
FROM amazoncorretto:21 AS build

WORKDIR /app

RUN yum install -y tar gzip && yum clean all

COPY .mvn .mvn
COPY mvnw pom.xml ./
COPY src src

RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

FROM amazoncorretto:21

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 9081

ENTRYPOINT ["java", "-jar", "app.jar"]
