# Welcome to Mysterious Musings

This is a web app that allows users to read, vote on and post comments to articles. 

The default page serves users a list of article cards containing basic information, which they can sort and filter using drop-down selectors. A link on each card routes to a specific page for that article, where users can read the article and give up- or down-votes. Logged in users can also comment on the articles and delete their own comments (please note that there is currently a specific user hard-coded into the app).

Error handling includes automatic navigation to error pages for non-existent articles, bad paths and topic queries, and timeouts. Errors will also show for incorrect usage (such as non-logged-in users trying to post comments), and for PATCH/POST request issues (such as for dropped connection).

## Links

The deployed version of the app can be found here: https://mysterious-musings.netlify.app

The api server used was built using this repo: https://github.com/jcampb28/seeding-data

## Running the project locally

Minimum Node version: 23.10.0

1. Clone the repo: `git clone https://github.com/jcampb28/nc-news.git`
2. Navigate to the folder: `cd nc-news`
3. Install dependencies: `npm install`
4. Run the project: `npm run dev`

*This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)*