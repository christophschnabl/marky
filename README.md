# [Marky🐶 Collaborative Markdown Editing](https://www.markymd.io) 


Marky is an Open-Source Collaborative Markdown Editor.

# Features
* Create and share Markdown Documents (via share link)
* Render Markdown to HTML
* Random User Names based on Adjectives and Emojis
* Insert Markdown via ToolButtons (Bold, Italic, Strikethrough, Table, List, Code, ...)
* Overview of your recent Documents
* Save Documents
* Print Documents
* List of Active Users
* No Login as we do not want to save personal data!

# Known Issues
* Multiple Cursor positions on server, but no different positions in GUI
* Router not working properly with docker-compose
* ClientLeft Event does not always get triggered
* Document Names sometimes do not synchronise themselves


# Run

## Without Docker
1. Navigate to the server directory
    `cd server`
2. Launch it 
    `npm start`
3. Navigate to the frontend directory
    `cd frontend` 
4. Launch the vue app 
    `npm start`

## Docker
Make sure you have docker as well as docker compose installed
    `docker-compose up

# Contribute
