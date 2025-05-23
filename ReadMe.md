## HTTP GET method in JavaScript to retrieve information from a films database

### Prerequisites :-

1. npm (Node Package Manager)
2. Node.js (v14 or higher)
2. Visual Studio Code

### To run the application :-

1. Run the application: node app.js
2. Open web browser or use a tool like Postman/curl to access the API
    http://localhost:3000
    http://localhost:3000/movies?substr=spiderman

### Assumptions :-

1. Added root path (http://localhost:3000) as well.
2. Displaying the search link (http://localhost:3000/movies?substr=spiderman) on root path.

### Common Issues and Resolutions :-

1. Error: Port 3000 already in use  
   Reason: Other process on local machine is already exposed on port 3000  
   Resolution: Changed the port number for other process  