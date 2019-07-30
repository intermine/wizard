# wizard

See also the related API spec: https://github.com/intermine/wizard-api-specs/

---

## To run

### Requirements
- git
- Node and npm (ideally installed via [nvm](https://github.com/nvm-sh/nvm))
- The [InterMine Compose server](https://github.com/intermine/intermine_compose).


### Clone and start the wizard

```bash
git clone git@github.com:yochannah/wizard.git
cd wizard
npm install
npm start
```

Visit [localhost:3000](http://localhost:3000) to see the wizard, or [localhost:3000/dev](http://localhost:3000/dev) for quick links to all the wizard pages

### Developing

If you're developing and would like the server to auto-restart after you've changed a server-side js file, run this instead of npm start

```bash
npx nodemon bin/www
```

### Running on a different port

Dev:

```bash
PORT=SOMEPORT npx nodemon bin/www
```

Prod:

```bash
PORT=SOMEPORT npm start
```
