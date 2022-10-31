# Instagram Clone - Reverse Engineering a Website
Instagram is a full-stack web application in which users are able to post images for the world to see, along with browsing other's images, liking them, and commenting on them. Our team of three developers implemented a version of Instagram that allows users to do the same things that they can on the real version in a one-week sprint.

See Instagram home page: https://www.instagram.com/

## Links To Project

[Instagram Clone - Heroku Deployment](https://instagram-clone-713.herokuapp.com/)

## MVP User Stories (Basic CRUD)
As an Instagram user, I want to be able to:
* publish my own posts
* browse other user's posts
* view a more detailed version of each post that includes comments, title, etc.
* comment on posts
* edit and/or delete my comments when I make a mistake (only mine)

## Stretch Goals
As an Instagram user, I want to be able to:
* delete my own posts (only my posts, and all comments associated with them)
* like posts (only once per user per post)
* view all of an individual user's posts at once (profile page)
* view posts by newest on top
* only be able to use the site with an account while logged in

## ERD
Our Instagram copy implements 3 separate models:
* users
* posts
* comments

The relationships between them are as follows (and shown in greater detail in the image below):
* user (one) -> posts (many)
* user (one) -> comments (many)
* post (one) -> comments (many)

![ERD](https://github.com/siemenjm/Instagram-Clone-Project2/blob/jared/assets/updated_ERD.png)


## Wireframe
Our final project differed from our initial wireframes slightly, but in general we followed the style that Instagram uses. The post index page lets you scroll through all the posts, while the post show page shows more details about the post. (Instagram uses a popup for the post show page).

### Post Index Page

![Index Page Wireframe](https://github.com/siemenjm/Instagram-Clone-Project2/blob/jared/assets/index_wireframe.png)

### Post Show Page

![Show Page Wireframe](https://github.com/siemenjm/Instagram-Clone-Project2/blob/jared/assets/show_wireframe.png)

## Keeping Up With Progress
While we are working on the project, we managed our project by listing of all our MVP and highlighted ones that we accomplished together.
Also used slack as a method of communication to ensure which part of project that each of us were working on, 
so that we don't have merging issues.

Link to our planning page: https://docs.google.com/document/d/1TPx4JDyx5KWytBVPBrMdZOoQYaK7iY8Ua6LAMg4eEIU/edit?usp=sharing

## Getting Started
To use our Instagram clone, first click on the Register button on the home page, or the Login button if you already have an account. The Register page will take you through the account set-up process.

![Home Page Screenshot](https://github.com/siemenjm/Instagram-Clone-Project2/blob/jared/assets/home_page.png)

Once logged in, you will see the post index page, listing all of the current posts sorted by newest at the top. You will also notice that since you are now logged in, your username appears at the top of the header, and the navigation links have changed. From this page, you can view the basic details of each post, including post author, post title, likes, the newest comment on the post, and total comments attached to the post. You can also like the post from this page by clicking on the heart icon (it will change to red if you have already liked the post).

![Post Index Page Screenshot](https://github.com/siemenjm/Instagram-Clone-Project2/blob/jared/assets/post_index_page.png)

From the post index page, you can click on the speech bubble or "View all XX comments" to navigate to that post's show page. This page does not look much different than the index page, but it does allow you to view the comments attached to the post.

If you are the creator of this post, a trashcan icon will appear on the right side of the like and speech bubble icons. Clicking this will delete the post, along with all the comments attached to that post.

If you are the creator of any of the comments on this post, a pen icon and trashcan icon will show up next to your comment, allowing you to either edit or delete the comment. If you edit the comment, "(comment edited)" will be appended to the comment.

![Post Show Page Screenshot](https://github.com/siemenjm/Instagram-Clone-Project2/blob/jared/assets/post_show_page.png)

From both the post index and show pages, any where you see a username (including in the comments section), you can click on that username to take you to the user show page. This page shows a simplified view of all the posts created by that specific user.

![User Show Page Screenshot](https://github.com/siemenjm/Instagram-Clone-Project2/blob/jared/assets/user_show_page.png)

Users can add posts by clicking "Add New Post" in the navbar.

## Technologies Used
* EJS
* CSS
* JavaScript
* Node.js
* Express.js
* Mongoose and MongoDB
* bcryptJS

## Favorite Chunk of Code
Our favorite piece of code involves using a query to add custom messages to the login/register screens when certain actions take place (a user logs out, an incorrect password is entered, someone tries to create an account with an already in-use email, etc.).

For example, the code snippet below is for the logout get route. The user is redirected to the login page after their session is destroyed, and a message of "You have been logged out" is passed through a url query. The login EJS template then checks to see if message is defined, and if it is, displays the message.

```javascript
// auth_controller.js
router.get('/logout', async (req, res) => {
    try {
        await req.session.destroy();
        const message = 'You have been logged out.';
        return res.redirect(`/login?message=${message}`);
    } catch(err) {
        console.log(err);
    }
});

// login.ejs
<h2>Login</h2>
<% if (message !== undefined) { %>
    <p class="message"><%= message %></p>
<% } %>
```

## Next Steps
We are happy with how the project turned out, but would still like to implement the following:
* search bar to search for specific users, posts, etc.
* follow, share, save buttons
* ability to sort posts by likes, comments, etc.
* style improvements
