# ASD Essential Eight Cyber Mitigation Toolkit

The Australian Cyber Security Centre (ACSC) has published a series of [strategies to mitigate cyber-security incidents](https://www.cyber.gov.au/acsc/view-all-content/publications/strategies-mitigate-cyber-security-incidents). The strategies focus on three categories of threat:

1. Malicious software (malware) delivery and execution:
2. Network propagation
3. Data exfiltration

Eight of the mitigation strategies are classified as [essential](https://www.cyber.gov.au/acsc/view-all-content/publications/essential-eight-explained), and are recommended as a baseline to mitigate cyber-security threats.

The [Essential Eight Maturity Model](https://www.cyber.gov.au/acsc/view-all-content/publications/essential-eight-maturity-model). the model defines three maturity levels for each of the eight mitigation strategies. The maturity levels indicate to what level an organisation is aligned to the mitigation strategies.

The **Securebiz** web application is a tool designed to assist small and medium-size businesses, who do not have cyber-security specialists, to ascertain their level of preparedness. The application uses a set of core questions based on the [Essential Eight Maturity Model](https://www.cyber.gov.au/acsc/view-all-content/publications/essential-eight-maturity-model) to calculate an organisation’s maturity level.

A series of ancillary questions are available that allow an organisation to assess other mitigation strategies beyond the essential eight.

## Project administration

- [Git workflow](documentation/development/general/git_workflow.md)
- [Documentation workflow](documentation/development/general/documentation_workflow.md)

## Folder Explained

- backend - application server (Lambda)
- database - database schema, plus backups
- documentations - previous administrative files
- express - previous application server, used as reference only
- fontend - web application (Amplify)
- scripts - testing scripts

## Common Setup (Front & Back)

**Setup Prettier on VS Code**

1. Open VS Code
2. Go to Extensions by press Ctrl + Shift + X
3. Press Install

## Run back-end server locally

Ensure you have NodeJS version is `14.16.0` or above, run `node -v`.

1. Go to your local sercurebiz folder, run `git checkout master`
2. run `git pull` (or merge master/rebase onto master if you
   are on your feature branch)
3. Create 3 env files `.env.dev, .env.test, .env.prod` under /backend folder.
   Copy the `backend/.env.template` file's content and parse it
   to the `.env` file created. (or copy `.env.template` file
   to a new file named `.env`):

   `cd backend && touch .env && cat .env.template > .env`
   or
   `cd backend && cp .env.template .env`

4. Update these values of the .env files:
   ```
    MONGODB_ENV=atlas
    ATLAS_DB_USER=atlas_db_user_name
    ATLAS_DB_PASSWORD=atlas_db_user_password
    MONGODB_DB_NAME=securebiz
    MONGODB_SESSION_COLLECTION_NAME=sessions
    MONGODB_SESSION_SECRET=any_string_scret_of_your_choice
    TOKEN_SECRET=tokenSecret
    ENCRYPT_SECRET=encryptSecret
   ```
5. Once done the above, remove `backend/node_modules` folder (if
   you have already had that).
6. In `backend` directory, run `npm ci`.

   Note, this is different from
   `npm install`, it'll install the node dependencies with the
   exact version numbers as specified in `package-lock.json`
   file.

7. In `backend` directory, run `npm start` to bring up the API server.
8. Run DB migration `migrate` command to initialise Atlas DB using JSON data from
   `database/` (requires DB and `.env` variable setup):
   - Command format: `npm run migrate [modelName] [command]`
   - Eg. To clear `Question` model's collection (which is `Questions`)
     run: `npm run migrate Questions down` this will clear up Questions
     collection.
     To populate `Question` model's collection using
     `database/Questions.json` file's data, run: `npm run migrate Questions up`

Note: If you are getting alot of squiggles from `eslint/prettier`, this usually mean there is an issue with 'End of Line Sequence'. [Try change CRLF to LF](https://webstoked.com/vs-code-fix-end-of-line-character-is-invalid/#:~:text=Click%20on%20the%20CRLF%20button,see%20in%20the%20second%20step.&text=Click%20on%20LF%20at%20the,That's%20it!)

## Deploy Backend to AWS

1. Run `AWS configure` on command line, if undefined, please install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)
2. Run `serverless` on command line, if undefined, please install npm i -g serverless
3. Run `AWS configure`, set to Deakin's ASD account
4. Deploy to test env, run `npm run deploytest`. Or, deploy to prod, run `npm run deployprod`

Note: To remove deployment run, `npm run removetest` or `npm run removeprod`

Troubleshoot Tips:
If you get build error run `rm -r .serverless && rm -r .build`, than run step 4 again.

## Run front-end server locally

1. Go to your local sercurebiz folder, run `git checkout master`
2. run `git pull` (or merge master/rebase onto master if you
   are on your feature branch)
3. Go to `./frontend/ folder`
4. Run command (using your terminal such as GitBash, PowerShell) `npm ci`
5. Run command `npm start`
6. Application should run from http://localhost:8081/

## Deploy Frontend to AWS

1. Open `./src/Config/Config.tsx`
2. Change stage to the appropriate value `'test'` or `'prod'`
3. Run `npm run build`
4. Go to `./public/`
5. Zip all files (including js and folders)
6. Sign in to AWS Console to manually deploy

Note: Unfortunately, with Amplify's zip upload method, there is no env variable option, hence need to manually change the stage.

##Note:

1. By default hot reload server will run on port 8081, however if that is occupied, it will increment to the next available port. If so, please go to `./src/Config/Config.tsx` and change `clientBaseURL` to the port used.
2. For the application to work correct, the `back-end API server` should be 1st be running.
