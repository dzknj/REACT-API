# REACT Single-resource api
This is a basic single resource api that interacts with mongodb to keep track of
city names and the crime level. It is simple and straightforward, but getting
the servers started is a little confusing if you dont know what you are doing.
Follow the instructions below to get your servers started and get slummin with
your cities in city-slums!!!
###Getting Started
In order to get the servers started to enable you to be able to use this api,
you must first install all dependencies. Since there is a client side and a
server side directory, this is done by doing the following;
- from the root directory navigate to the client directory
  - **npm install**
- from root directory, navigate to the server directory
  - **npm install**

###Starting servers
- First, make sure you have mongo running by typing:
  - **mongod**
- Next, navigate from the root directory to the client directory and type:
  - **node server.js**
- Last, navigate from root directory to server directory and type:
  - **node server.js**

###Using the api
###Adding a City
- Open your favorite browser
- navigate to **_localhost:1234_**
- Enter a City name, and crime level, such as high, or low.
###Editing a city
- click the edit button next to the city you wish to edit
- enter new information for city Name and/or crime Level
- click save city
- _CONGRATULATIONS!!!_ you have just updated the databse!
###Deleting a City
-click the Delete button
-Good job. You did great!

###Other Information
In case you choose to edit any of the files in this app, keep in mind that both
the client side and the server side have gulpfiles that are independant from
eachother, so if you modify any code, make sure you run the corresponding
gulpfile within the directory to update the build before starting the servers,
otherwise, the changes will not be updated in the browser.--
