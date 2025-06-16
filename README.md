This uses sqlite database, which is file database. No set up should be needed. If sql database is to be used, please configure in the program.cs and app.settings.json.

To run:

Open the API folder with visual studio by pressing on the Library.sln
The press the green hollow triangle on top.

This should run the server.

Open the client folder with visual studio code (not visual studio).
Press [ctrl] and [~] keybuttons at the same time to open the terminal on visual studio code.

put the commands:
    npm install
    ng s -o

This should run the frontend and you should see the webpage

Library App

Angular client front end
.Net server back end

home page
    shows random books

registeration
    can signup as librarian or customer

books page
    shows books
    filter search
    check out

borrowed books page
    shows the borrowed books
    if librarian than check in the books and search the users

Add books page
    add new books to the list

Edit book page
    customer can see more details
    librarian can addtionally edit the book details