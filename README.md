# Github React Repos

## Summary

This repository contains the some code to display React Repositories.

## Development

1. Ensure you have [npm](https://npmjs.com) installed.
2. Clone this repository.
3. Install dependencies: `npm install`.
4. Using the `src/etc/.env.example` create a `.env` file in the same folder with your personal github access token.
5. Start the repository: `npm start` (for local development).
6. Go to http://localhost:8080.

## Generate/Update GraphQL Types

Use `npm run generate` and the types will be generated in `src/generated`  directory. Server must be running.
Config file is `codegen.yaml`.
