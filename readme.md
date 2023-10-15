# DogBook

## A social app for dog lovers 

App made for people with interests about dogs. 

### The problem

Dog owners 
* run out of ideas of activities to do 
* places to visit with their dogs
* in need of a trainer
* connect with other owners

### The solution

App allows users to post and share their activities and ideas of places to visit. By providing a Database of trainers, the App allows dog owners to find a trainer for their dog.

App has a rating system so other users can make their choices better.

### Technologies used :

1. HTML / CSS / JS (ejs) for frontend
2. Node.js / Express.js for backend
3. MongoDB for Database

### Deployed on Heroku

[DogBook - Heroku](https://dog-book-dylan-boss.herokuapp.com/)

## Heroku link is no longer supported
You can always check out the [ScreenShots](ScreenShots) available or alternatively run it on your machine to test its features as the database is still supported:

To run it on your machine, start by cloning the repo with:
```bash
git clone git@github.com:kristinegusta/DogBook.git
```
Should you have an error of the type "cannot create work tree dir" simply type:
 ```bash
cd ~/
mkdir temp
cd temp
git clone git@github.com:kristinegusta/DogBook.git
``` 
Move into the repo and download the dependencies with:
```bash
cd DogBook
npm install
npm install -g nodemon
```
And run it using: 
```bash
npm start
```
Finally you can check it out on http://localhost:3000 !


![Screenshot](DogBook.JPG "screenshot")

![Screenshot](screenshot.JPG "screenshot")
