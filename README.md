# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?
    - There are definitely things I can think of make this app better if I had more time and permission and authority, off top of my head:
      - Error Handling: calls in api.js file doesnt handle errors, I didnt add anything in App.js either given time restriction, but I would definitely integrate better error handling. Using react queries (tanstack-useQuery) would work nicely.
      - Better component structure & State management: I know it s a small app, but I think we could still make use of ContextAPI and proper folder structure of components
      - Better Styling Tailwind|SASS|SCSS: I think it would have been nicer if we made use of modern styling tools, it would be less to zero CSS code writing especially with tailwind, I love tailwind:)
      - We are fetching a lot more data than what we display: in an ideal world, we should only fetch what we need, if we had authonmy to build our own stuff, graphql or some sort of midlayer would make payloads much lighter.
      - Caching: I would cache the initial list, but I wasnt sure if that was part of the ask.
      - Better TypeChecking: I didnt add any typechecking for time sake, but it d be nice to convert this project into TypeScript or add some simple type enforcement.
      - I would try to add more colorful and engaging things, change the layout, add pagination
      - I would make the search functionality more broad (with real API calls) rather than searching within only 151 results. Might add debounce for keystrokes
- Is there anything you would consider doing if we were to go live with this app?
  - All of the above plus:
  - I would use TypeScript
  - I would add Tests/CI/CD
  - I would think about security stuff, maybe add prevention methods for abuse (eg DDoS) and maybe load balancers in the deploy side

- What was the most challenging aspect of this work for you (if at all)?
  - My self-doubt about Pokemon knowledge & Evolution Chain Debugging:
    - It wasnt very difficult to write the code to traverse the chain but I noticed something in the api results that got me thinking, which was, bulbasaur eventually evolves to venusaur but when I click on venusaur to see its evolution chain I see whole bunch of different pokemons(squirtle,wartortle, blastoise). I was expecting to see no further evolution of venusaur. But I double checked the api results and just accepted the data as they are. But best to my knowledge venusaur is the final form of bulbasaur. That being said, maybe I indeed wrongly implemented this thing, I hope not! fingers crossed :)