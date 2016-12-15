# What You'll Need

- a Slack account

## Step 1: Add a Slash Command Configuration

On the [Slash Commands](https://slack.com/apps/A0F82E8CA-slash-commands)  page select 'Add Configuration', set the Slash Command you want to use, for our example app, this should be `/contentful`. 

You can set it to anything, so long as you update the handler for it in the project code, too. For the 'URL' value, use your project's publish URL (Click 'Show' above), this has the format 'https://project-name.gomix.me', so in our example app it is 'https://impossible-salmon.gomix.me/'. Leave the method to the default 'POST' value and set the other values as you need to, but be sure to copy the Token value for use in the next step.

## Step 2: Copy the Command Token

Copy the token value for the Slash Command into the `.env` file in your project. You'll see an entry for `SLACK_TOKEN`. Paste the token against that variable name.

## Step 3: Copy the CMA token from Contentful

Go to your Contentful account and get a Content Management Token. Add it to `env`, too.

## Step 4: Define the content type you want to deal with

This projects purpose is to display entries in a given space of a content type in a particular language. Fill these infos also in the `.env` file and you're ready to go.

Things to set:

- `CF_POST_CONTENT_TYPE_ID`
- `CF_SPACE_ID`
- `CF_LANGUAGE`