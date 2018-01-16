# Gourmet Group

## Technical Requirements
* Have at least 2 models (more if they make sense)
* Include sign up/log in functionality, with hashed passwords & an authorization flow
* Incorporate at least one API
* Have complete RESTful routes for at least one of your resources with GET, POST, PUT, and DELETE
* Utilize an ORM to create a database table structure and interact with your relationally-stored data
* Include wireframes that you designed during the planning process
* Have semantically clean HTML and CSS
* Be deployed online and accessible to the public

## Technologies Used
* Node.js
* Express
* Postgres
* jQuery and AJAX
* Materialize CSS framework
* Cloudinary

## User Stories
* I do a lot of cooking and want to have a place to organize my recipes. I am constantly slightly changing ingredients and cooking times and would like to have an easy to see notes area so that I can keep track of changes and observations. I'd like my recipes to be easy to edit and easy to find. I'd also like to upload photos of my creations. 
* I'm constantly trying to figure out what to cook with ingredients that I have at home. I'd like to be able to search for recipes by ingredients and add them to a wishlist/to be cooked later. I like looking for things to try and having an accessible list, like pinterest, of things i"m interested in. I'd like to move recipes I've tried to a list of recipes I've made and have the ability to comment on that recipe about how I've made it. 

## My Process - Trello Board
### Sprint 1
![Trello Board](/public/images/screenshot-8.png)
* Stubbed out my trello board (see above)
* Created user stories and wireframed (how I want the site to look and the routs and tables I'll need for functionality)
* Explored various APIs and chose to use Food2Fork

### Sprint 2
![Trello Board](/public/images/screenshot-4.png)
### Sprint 3
![Trello Board](/public/images/screenshot-5.png)

## Homepage
![Homepage Layout](/public/images/screenshot-7.png)

## Sample Search Results
![Search Results Page](/public/images/screenshot-6.png)

## Next Steps
* Add an about page for the site/add about information to the home page
* Add a public profile page for users
* Add the ability to search for users and view their public profile with recipes

## Getting Started
* Fork and clone this repository
* Run `npm install` to install dependencies
	* Use `nodemon` to start the server
	* Create the database using `sequelize`
	* Run migrations to use the models
	* Create an .env file with:
		* `SESSION_SECRET`
		* `FACEBOOK_APP_ID`
		* `FACEBOOK_APP_SECRET`
		* `BASE_URL` (for development, likely localhost)
		* `RECIPE_API_KEY` from Food2Fork
		* `CLOUDINARY_URL` from your cloudinary account
		* `CLOUDINARY_CLOUD_NAME` your cloudinary account name
	* Create a .gitignore file and add node_modules, .env, .DS_Store

## View the site!
https://gourmet-group.herokuapp.com/