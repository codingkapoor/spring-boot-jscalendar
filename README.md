# spring-boot-jscalendar

A Simple 12 month calendar on a Single page built using HTML5/CSS3/JavaScript.

It uses Spring MVC and Hibernate based backend for the purpose of storing public holidays. Hovering on a particular holiday date displays the occasion (e.g., Christmas, New Year, etc).

The application should take care of Leap years while rendering calendar.

# Launch
- To build the application and host it on **localhost:8080**
  `mvn clean compile spring-boot:run`
  
- **H2 web console** is accessible on: `localhost:8080/console`

- You can also access the restful webservices on **POSTMAN**:
  ```
  http://localhost:8080/years
  http://localhost:8080/years/2016
  http://localhost:8080/years/2016/holidays
  ```

# Snapshots
