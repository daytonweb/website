# Dayton Web Developers

A static site builder for the Dayton Web Developers website.

10/23/2018 - UPDATE  
This content needs re-written. There has not been any effort to move forward with this project.  


## Installation

- Requires node/npm ([installation instruction](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager))
- Install [Gulp](http://gulpjs.com) globally (`npm install -g gulp`)
- Install NPM packages from the root of the project (`npm install`)

## Usage

Run the following commands from withing the project:

- `gulp` - Runs a dev build with a BrowserSync server for development
- `gulp serve` - Runs the server without a build
- `gulp dist` - Runs a production build

## Deployment

We are hosting with [Divshot](http://divshot.io). To deploy, signup for an account on Divshot and make sure you have
been added to the DaytonWebDev team.

### Setup

- `npm install -g divshot-cli` - Install the Divshot CLI tool globally
- `divshot login` - This will authorize your account with the CLI tool

### Deploy

Run these commands from within the project root.

- `divshot push` - Deploy to the dev environment: http://development.daytonwebdev.divshot.io/

## Authoring Content

### Posts

- Copy any one of the sample posts files in `src/content` and give the new file any name you wish
- Files with a `.md` extension will be processed with Markdown
- Files with a `.html` extension will be rendered as is
- The meta-data at the top of the sample files is YAML front-matter.

## Contributing

- Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and
 [open a pull request](https://github.com/sparkbox/aia-mag/compare/).
- Prefix commit messages with one of (ie. "feat: add new slider widget"):
    - feat: When adding a feature/improvement
    - fix: When fixing code
    - refactor: When refactoring code
    - docs: When adding/updating documentation
    - test: When creating/updating tests
    - style: When making code style changes
    - chore: When doing anything else not directly related to code (ie. changes to your build)
- [CSS Coding Standards](docs/css.md)
