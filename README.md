## Installation

Clone repository:

``` bash
git clone https://github.com/matgawin/playcanvas-typescript-template.git
cd playcanvas-typescript-template
```
then:

``` bash
pnpm install
```
or

``` bash
npm install
```
or

``` bash
yarn install
```

## Configuraion

1. Copy `.env.example` and rename to `.env`. This is environment variables config file for pushing code to playcanvas servers.
2. Open `.env` and update properties.
    - PLAYCANVAS_API_KEY - [Instructions](https://developer.playcanvas.com/en/user-manual/api/#authorization)
    - PLAYCANVAS_PROJECT_ID - [Instructions](https://developer.playcanvas.com/en/user-manual/api/#project_id)
    - PLAYCANVAS_BRANCH_ID
        - You can update it manually [Instructions](https://developer.playcanvas.com/en/user-manual/api/#branch_id)
        - Or better remove this line, name your playcanvas branches same as git branches and it will work automatically.
3. (Optional) Open tools/download-build.js and add scene ids that should be included in the build. First id is the initial scene.

## Scripts
| Command                      | Description                                                                                  |
|------------------------------|----------------------------------------------------------------------------------------------|
| `pnpm run check:branch`      | If you named your playcanvas branch the same as git branch, it will update branch id property.|
| `pnpm gulp build:debug`      | Compiles files without minification, with inline sourcemaps and then bundles to `build/main.bundle.js`.|
| `pnpm gulp build:release`    | Compiles files with minification, and then bundles to `build/main.bundle.js`.                |
| `pnpm run build:debug`       | Compiles files without minification, with inline sourcemaps, bundles to `build/main.bundle.js`, and then pushes to playcanvas server.|
| `pnpm run build:release`     | Compiles files with minification, bundles to `build/main.bundle.js`, and then pushes to playcanvas server.|
| `pnpm run push:all`          | Pushes `build/main.bundle.js` to playcanvas project.                                         |
| `pnpm run pull:all`          | Pulls files from playcanvas project.                                                         |
| `pnpm run download`          | Downloads your applications build from playcanvas, and unpacks it in `out` directory.        |
| `pnpm run start`             | Starts server local server with downloaded build located in `out` directory.                 |
| `pnpm run build:run`         | Makes debug build, pushes it, downloads application and then starts local server.            |
| `pnpm gulp docs`             | Generates TypeDoc documentation files in `docs` directory.                                   |
| `pnpm gulp eslint`           | Start eslint linter.                                                                         |