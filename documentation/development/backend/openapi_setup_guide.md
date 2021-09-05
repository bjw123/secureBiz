# OpenAPI Setup Guide

The OpenAPI Specification(OAS) 3.0 has been implemented in the
project, with API docs and API server/client code generator
support in dev environment.

## Codegen

**IMPORTANT** The project uses machine generated code:

- The front-end library is downloaded from SwaggerHub
- The back-end server library is generated by `OpenAPI Generator cli`
  https://www.npmjs.com/package/@openapitools/openapi-generator-cli

### You should not modify any of the following machine generated code:

***If the OpenAPI specs file has been changed, the following code
need to be replaced, using the auto-generated code.***

- Anything in `express/controllers/` folder, except for `generatePdfReport` function
  in `express/controllers/PublicController.js`. You need to retain or merge this function
  if you generated server libs again. 
  
  For details about the PDF report controller
  override please refer to this commit:
  
  [4c56f6d95af](https://bitbucket-students.deakin.edu.au/projects/DCVENT-PG/repos/asd-essential-eight-cyber-mitigation-toolkit_2020t3/commits/4c56f6d95afcf330b83ca6274add597102131f9f)
- Anything in `express/utils/` folder
- `express/config.js`
- `express/expressServer.js` except for `validateNodeEnvVersion` function and its
  required libs. For further reference please check this commit:
  [0be00d85e75](https://bitbucket-students.deakin.edu.au/projects/DCVENT-PG/repos/asd-essential-eight-cyber-mitigation-toolkit_2020t3/commits/0be00d85e7504571a2b8bc13c658789f3dee81a6)

- `express/index.js`
- `express/logger.js`

### Requirements

Java JVM is required for OpenAPI Codegen, if running OpenAPI codegen
in your local environment. It's required for the back-end server
stub.

####Installation guide for JVM

Basically if you install JAVA you will have JVM installed.

Download JAVA from here:

https://www.java.com/en/download/

Otherwise, you can install JDK or JRE, both comes with JVM.

To install JVM, it's suggested that JRE is installed, that'll
included the JVM.

The following are the JVM installation instruction for different OSs.
***

#### Windows 10
https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm#JSJIG-GUID-A7E27B90-A28D-4237-9383-A58B416071CA

#### Ubuntu 20.04
https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-20-04

and

https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-linux-platforms.htm#JSJIG-GUID-737A84E4-2EFF-4D38-8E60-3E29D1B884B8

#### How to Use Brew to Install Java on Mac

https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-macos.htm#JSJIG-GUID-2FE451B0-9572-4E38-A1A5-568B77B146DE

### Front-end library

The front-end machine generated SDK can be downloaded from
SwaggerHub:

1. Go to the following project URL on SwaggerHub:
https://app.swaggerhub.com/apis/jaslian/asd-essential-8/2.2.0

2. On the top right navigation (below the signup/login button)

3. Then download the SDK from `Export > Client SDK > typescript-fetch`

### Back-end library

The back-end server stub is auto-generated using
`openapi-generator-cli` with `nodejs-express-server` template.

More information can be found from its npm entry page:

https://www.npmjs.com/package/@openapitools/openapi-generator-cli

## Install Dependencies

From your terminal, cd `express` folder under your project root
directory, run `npm ci` to install dependencies.

*If you have the `node_module` folder in `express` folder already,
remove it first to have a clean re-install using `npm ci`.*

## Integration Components

The following are included in the project as part of OAS integration:

- The OpenAPI 3 specification file. The default specs yaml file
  location is `api/openapi.yaml`.
- The API docs support, the API docs now is self-hosted in the
  project and can be run on localhost.
- The OpenAPI code generator is integrated as the dev dependency.

Under the `express` folder, start the API server by running
`npm run api`, Swagger UI will update the API docs automatically.

To update the API specification, edit this file:

`api/openapi.yaml`

Highly suggested that you use a Swagger Editor that has syntax
validation like SwaggerHub.

To view the API docs locally, start the project using npm:

`npm start`

Then visit:

http://localhost:8080/api-docs

## Swagger Codegen - Server/Client code generator

### Generate the server libs

To generate the nodejs express API server code, run:

`npm run openapi-gen-server`

Server code generated can be found from:

`express/openapi/codegen/server`

You should follow the instructions from the above generated code do not override
list, to replace these generated code, if OpenAPI specs are changed.