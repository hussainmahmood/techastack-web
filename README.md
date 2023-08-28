# techstack-web

## Clone this repo

Type following command in you terminal:

```bash
# clone this repo in your machine
git clone https://github.com/hussainmahmood/techastack-web.git

# move to project folder
cd techstack-web
```

## Setup project

Create a .env file with **SECRET_API_KEY** in root of your folder

`SECRET_API_URI=http://{hostname}:{port}/api`

add {hostname} and {port} of your django server

> {hostname}:{port}(default) = 127.0.0.1:8000

(.env.example has been attached for your convinience)

Once you've cloned this project,  install dependencies with `npm install` (or `pnpm install` or `yarn`) and start a development server:

```bash
# install dependencies
npm i

# start the dev server
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```


## Building

To create a production version of your app:

```bash
# build production version
npm run build
```

You can preview the production build with `npm run preview`.
