# StarWars API (Nuxt3+Vuetify)

This repository contains a Nuxt 3 project with components and stores tested using Vitest. The tests cover fetching data, interacting with components, and ensuring proper navigation.

This project relies on  https://swapi.dev/ and it is built with Nuxt3 + Pinia + Vuetify + Tailwind + Vitest 

Use `nuxt dev` for development and `npx vitest` for testing. More details below. 

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Running Tests

Run your tests using Vitest:

```
npx vitest

```

## Docker

Docker allows the application to run consistently across different environments, making it easier to develop, test, and deploy.

### Prerequisites


Ensure that you have the following installed on your machine:

Docker (version 18.09 or higher)
Docker Compose (optional, for using Docker Compose)

### Building the Docker Image

Build the docker image

```
docker build -t sw-api .

```

### Running the Docker Container 
To start the application in development mode, run the following command:

```
docker run -p 3000:3000 sw-api

```

## Structure

The project is structured as follows:

```markdown
.
├── components
│   ├── CharacterAutocomplete.vue
│   ├── FilmSection.vue
│   ├── HomeworldSection.vue
│   ├── PlanetsSection.vue
│   ├── ResidentsSection.vue
│   ├── SpeciesSection.vue
│   ├── StarshipsSection.vue
│   └── VehiclesSection.vue
├── stores
│   └── characters.ts
├── test
│   ├── components
│   │   ├── CharacterAutocomplete.spec.js
│   │   ├── FilmSection.spec.js
│   │   ├── HomeworldSection.spec.js
│   │   ├── PlanetsSection.spec.js
│   │   ├── ResidentsSection.spec.js
│   │   ├── SpeciesSection.spec.js
│   │   ├── StarshipsSection.spec.js
│   │   └── VehiclesSection.spec.js
│   └── setup.js
├── pages
│   ├── films
│   │   ├── [id]
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── people
│   │   ├── [id]
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── planets
│   │   ├── [id]
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── species
│   │   ├── [id]
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── starships
│   │   ├── [id]
│   │   │   └── index.vue
│   │   └── index.vue
│   └── vehicles
│       ├── [id]
│       │   └── index.vue
│       └── index.vue
├── .dockerignore
├── .gitattributes
├── .gitignore
├── app.vue
├── Dockerfile
├── favicon.ico
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── vitest.config.js
└── yarn.lock

```

## Information Flow

### Data Fetching

#### API Requests:

The application uses axios to make HTTP requests to the SWAPI (Star Wars API) to fetch data about characters, films, planets, species, vehicles, and starships.
Example endpoint: `https://swapi.dev/api/people/`
#### Pinia Store:

The `characters.ts` store manages the state of character data.
The `fetchCharacters` action in the store makes API requests to fetch all characters and stores them in the state.

### Rendering

#### Components:

Components like `CharacterAutocomplete`, `FilmSection`, `HomeworldSection`, etc., use the data from the store to render lists of characters, films, homeworlds, etc. 

These components use computed properties to derive the necessary data from the store and render it using Vue's template syntax.

#### Example:


`CharacterAutocomplete.vue` uses a computed property to get character names from the store and renders them in a Vuetify autocomplete component.

```js
<template>
  <div class="p-4">
    <v-autocomplete
      v-model="search"
      :items="characterNames"
      :loading="loading"
      hide-no-data
      hide-selected
      label="Search for a character"
      @change="onCharacterSelect"
    ></v-autocomplete>
  </div>
</template>

```

### Routing

#### Vue Router:

The application uses Vue Router to handle navigation between different views.

When a user selects a character from the autocomplete, the application navigates to the character's detail page using router.push.


#### Dynamic Routes:
The pages directory structure defines the routes for the application. Dynamic routes (e.g., [id]) are used to handle variable segments in the URL.
Example: `pages/people/[id]/index.vue renders` the details of a specific character based on their ID.

#### Navigation Example:

In `CharacterAutocomplete.vue`, the `onCharacterSelect` method constructs the target URL and uses the router to navigate to the character's detail page.

```js
const onCharacterSelect = (selectedName) => {
  const selectedCharacter = charactersStore.characters.find(character => character.name === selectedName);
  if (selectedCharacter) {
    const id = selectedCharacter.url.split('/').filter(Boolean).pop();
    const targetUrl = `/people/${id}`;
    router.push(targetUrl);
  }
};

```

