# Team Awesome V2 - WineSearchaRoo Application
---
## Prerequesites:
* NPM Package Manager
* Node.js
* MySQL
* Clone our repository located at: [Team Awesome Github Page.](https://github.com/demarco40/Wine_Searcharoo)

## Setting Up The Database
1. Open a MySQL command line session.
2. Navigate to where you cloned our repository in finder or file explorer. In /Wine_Searcharoo/DB you will find the file CreateDatabase.sql.
3. In the MySQL command line type the command `source `. Do not hit enter yet.
4. Now drag the CreateDatabase.sql file into the terminal and it should add the full path to that file.
5. The command should look something like this: `source /Users/jordanrizzieri/Documents/Wine_Searcharoo/DB/CreateDatabase.sql` (Note there is a space between source and the path).
6. After successfully creating the database issue the command `USE Wine_Search;`.

## Starting The Application
1. Navigate to where you cloned our repository in a terminal window.
2. Run the command `npm install`.
3. Run the command `node server.js`.
4. In a browser navigate to: http://localhost:3000 . 
5. Use our application!



