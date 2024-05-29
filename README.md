<h1 align="center"> Polity - Vision </h1>
<p align="center">
  <img src="https://user-images.githubusercontent.com/35246325/187027016-86be54cf-53f9-4536-9b1e-c296a6381629.png" width="120px" height="120px"/>
  <br>
  <i>The goal of polity is to create a - theoretically - global real-time decision platform for political parties, individuals and public bodies.
</i>
  <br>
</p>


<p align="center">
  <a href="https://www.figma.com/proto/cAT8Aonu8P7ojwgnKcVlkz/Polity?node-id=51098%3A4670"><strong>Our Goal & Figma Clickdummy 🚀</strong></a>
  <br>
    <a href="https://www.figma.com/proto/cAT8Aonu8P7ojwgnKcVlkz/Polity?node-id=51098%3A4670"><img src="https://img.shields.io/badge/Clickdummy-up-brightgreen" alt="Clickdummy" /></a>
  </a>
  <br>
</p>

<p align="center">
  <a href="https://donnerstagnacht.github.io/polity"><stong><strong>Current development state - prototype (daily database reset)</strong></a>
  <br>
       <a href="https://donnerstagnacht.github.io/polity"><img src="https://img.shields.io/badge/prototype-up-brightgreen" alt="Prototype" /></a>

</p>
<p align="center">
  Message <a href="tobias.hassebrock@gmail.com">tobias.hassebrock@gmail.com</a> to gain access to the Figma Design files.
</p>

<hr>

<h1>Weekly Wednesday meeting and collaboration </h1>

<p>We are meeting every Wednesday at 8pm CET on a discord server to work on the project and have a good time in general. To start, you can choose a task from our published projects or suggest your own ideas.</p>

<p align="center">
  <strong>Discord server:</strong>
  <br>
  <a href="https://discord.gg/5bpnZ5ys"><img src="https://img.shields.io/badge/Discord-down-red" alt="Discord" /></a>
   <!-- <a href="https://discord.gg/5bpnZ5ys"><img src="https://img.shields.io/badge/Discord-up-brightgreen" alt="Discord" /></a>-->

  <br>
  <strong>👉Issues</strong>
  <br>
  <a href="https://github.com/Donnerstagnacht/polity/issues"><img src="https://img.shields.io/badge/issues-up-brightgreen" /></a>
   <!-- <a href="https://github.com/Donnerstagnacht/polity/issues"><img src="https://img.shields.io/badge/issues-up-brightgreen" /></a>-->

  <br>
  <strong>👉Projects</strong>
  <br>
  <a href="https://github.com/Donnerstagnacht/polity/projects"><img src="https://img.shields.io/badge/projects-down-red" /></a>
   <!-- <a href="https://github.com/Donnerstagnacht/polity/projects"><img src="https://img.shields.io/badge/projects-up-brightgreen" /></a>-->

  <br>
  Contact:
  <br>
  <a href="tobias.hassebrock@gmail.com">tobias.hassebrock@gmail.com</a>
  <p>Drop me a message/pull request here on GitHub or per mail if you are interested in supporting the project.</p>
</p>

<hr>
<h1>Get startet with development </h1>

1. Clone the repo
   ```sh
   git clone https://github.com/Donnerstagnacht/polity.git
   ```
2. Install Node-Js
   ```sh
   https://nodejs.org/en/
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Set up local development for supabase
   ```sh
   https://supabase.com/docs/guides/cli/local-development
   
   Enable webhooks in the supabase dashboard or create a "supabase_functions" schema manually.
   Update environment variables (supabaseProjectUrl, supabaseAnonKey, supabaseRoleLevelSecurityKeys VAPID_Keys ) in 
      - src/environments/environment.ts
      - supabase/migrations/<all files with webhook>
      - the .bat files
   Update redirect links in the Auth Service.
   
   Optional: Set up a remote environment on supabase.com
   ```
6. Start Angular dev server
   ```sh
   ng serve
   ```

<hr>

<h1>Techstack</h1>
<p>Polity is based 100% on OpenSource technologies and is self-hostable.</p>

<ul>
  <li>Backend: <a href="https://github.com/supabase/supabase">Supabase</a></li>
  <li>Frontend: <a href="https://github.com/angular/angular">Angular</a></li>
  <li>Frontend: State Management is self written: <a href="https://github.com/Donnerstagnacht/polity/tree/main/src/app/signal-store">Angular Signals</a></li>
  <li>UI-library: <a href="https://taiga-ui.dev/">Taiga UI</a></li>
  <li>e2e Testing: <a href="https://github.com/cypress-io/cypress">Cypress</a></li>
</ul>
<hr>

<h1> Dataflow</h1>
<p>Data is queried mostly by PostgreSQL functions. The functions are executed in a wrapper service that handles loading and UI flags.</p>
<p>Additionally, a Supabase real-time subscription is used to update the store (and therefore the UI) pessimistically whenever subscribed data in the database is changed.</p>
<p>To display data to the user, the data is stored in Angular Signals.</p>  

    *** Data in ***
    User  --> PostgreSQL function --> Database --> UI
    
    *** Data out: ***
    Database --> Query Function and/or real-time subscription --> Signal Store--> UI --> User

<p>Summary: Most business logic is transferred to powerful PostgreSQL functions.</p>
<hr>

<h1> Project Structure</h1>
<p>Angular files are organized in the <code>src/app</code>. Subfolders mirror app features and mostly correspond to the available routes.</p>
<p>Cypress files are organized in the <code>Cypress/e2e</code> folder and the file order should be identical to the test execution order.</p>
<p>Supabase files are organized in the <code>supabase/migrations</code> folder with subdirectories according to features. These files must have a prefix that determines the migration/execution order.</p>

<p>Most important project directories and files:</p>

```
.
├── cypress: End-2-End tests organized by features
│    ├── e2e: End to end tests ordered by execution
│    │    └── Feature: according to front end
│    ├── fixtures: specific test variables
│    └──  support
│          ├── commands: Definition of cypress commonands
│          └── index.d.ts: Signature and types of cypress commands
│       
├── seed_and_test_data
│    └── Data used to seed database and set test states
│
├── src
│    ├── app: Frontend
│    │    ├── auth: Authentication functionality
│    │    ├── features: Features organized by routing
│    │    │    └── feature: One feature module
│    │    │         ├── components: Presentation logic
│    │    │         ├── routes: Routes of the feature
│    │    │         ├── store: Front end store instantiations
│    │    │         ├── actions: Link between database and frontend store
│    │    │         └── guards: Protecting routes
│    │    ├── landing: Non-authenticated features (landing website before sign-in)
│    │    ├── navigation
│    │    ├── signal-store: Frontend data store
│    │    └── ui: Pure UI components
│    ├── assets: static files
│    ├── environments: Supabase parameter
│    └── styles-global: Global style sheets
│         ├── Global component styles
│         ├── Polity utility styles
│         └── TUI extensions & overwrites
│
├── supabase: Supabase / Backend, directories by feature, but file execution by prefix
│    ├── Functions: Supabase edge functions
│    ├── migrations
│    │    └── feature: according to frontend feature
│    │         ├── Schemas and other
│    │         ├── Database types/ Enums/Table definitions
│    │         ├── schema/Table definitions
│    │         ├── Database functions/queries 
│    │         ├── Database transactions (calling other functions)
│    │         └── Database seed
│    └── types
│         ├── supabase.modified.ts: Overwritten supabase types since generation is not always correct
│         ├── supabase.shorthand-types.ts: Short-handed supabase types for easier usage in Front End code
│         └── supabase.ts: Auto-generated supabase types
│
├── copy_sql_files_to_migration_folder: A windows bat file to copy supabase files into the migration directory so that automatic migration can be executed
├── package.json: Project dependencies
└── cypress.config.ts: Cypress configuration
```

<hr>

<h1>Naming conventions</h1>
<p>PostgreSQL code and code or variables that are used to call PostgreSQL functions should be written in lowercase with underscores e.g. <code>a_variable_for_a_postgres functions.</code>. Parameters and return table variables of postgres functions should be prefixed with a "_" (e.g. <code>_parameter</code>) to avoid ambitous naming conflicts. However, table returns should be avoided in general. Instead, define types and return the select result.</p> 

<p>Postgres migration files are applied in descending sequential order, must be unique and named like <code>timestamp_name.sql</code>. The codestamp must have a minimum of 6 digits and a maximum of 14 digits. After that an "_" must follow. Files which determine the initial setup do not use a timestamp. Instead, a numbercode is used to gurantee a certain execution order.</p> The number code is:

<p><code>numbercode = 000 + two digit number implying the postgres object type _ three digit running number _ six digit number determining the featuere.</code></p>
<p> The two digit number code is mapped to postgres types to ensure that postgres objects are created in the correct order (since objects on lower table lines depend on higher table lines):
    
| Code    | Description                                            |
| ------- | ------------------------------------------------------ |
| 00      | Pre migration tasks (enums, resets, schemas...) |
| 01      | Postgres return types                                  |
| 10      | Tables, indexes, row level security settings           |
| 20      | Row level security policies                            |
| 30      | Triggers and trigger related functions                 |
| 60      | Functions                                              |   
| 80      | Transactions (functions that depend on other functions)|   
| 98      | Post migration tasks (bug fixes...)                    |   
| 99      | Database/table seeding                                 |   

<p>The three digit running number is simply a running number except for the Standalone Functions (Code 60). Here, functions should order by Create, read, update, delete and others.</p>

| Code    | Description                                            |
| ------- | ------------------------------------------------------ |
| 0xx     | Functions for create operations (insert or upsert)     |
| 1xx     | Functions for read operations                          |
| 2xx     | Functions for update operations                        |
| 3xx     | Functions for delete operations                        |
| 4xx     | Other functions (checks, increments, decrements...)    |   

<p>The feature is a unique 6 diigt code. Main features should be "thousand steps" (for example: 001000 = profiles).</p>
<p>The leading "000" prefix is added by a scipt.</p>

<p>For purely frontend-related variables code camelCase is used e.g. <code>aVariableForTheFrontend</code>.</p>

<p>HTML elements used for testing should contain the attribute <code>[attr.data-cy]="'element-name'"</code>. The attribute name uses "-" seperators.</p>
<p>In general, use speaking names and choose a longer more specific name over a short unspecific name.</p>
<hr>

<h1>Documentation</h1>
<p>Document public functions (especially in services).</p>
<hr>

<h1>Database security</h1>
<p>Polity applies a database security layer concept with the following layers</p>

| Layername     | Description                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| public        | A public layer available to all roles. An API is generated automatically.                                                                     |
| authenticated | A layer available to the "authenticated" role (logged in users). An API is generated automatically.                                           |
| hidden        | A hidden layer that can only be accessed by functions (e.g. available to "authenticated" role but no API generated. This includes all tables. |
| security      | A hidden layer that can only be accessed by the postgres role. It is used to store helper functions for row level security checks.            |
| postgres      | A hidden layer that can only be accessed by the postgres role. Used to store triggers.                                                        |

<p>Additionally, each table is secured with row level security policies. Row level security policies check data access for each row. While this architecture disables the quick usage of the autogenerated supabase api, it decreases the attack vector to the parameters of functions of the public/authenticated layer. To strengthen this even further, it should be avoided to pass the id of the authenticated user as argument to a function. Instead, supabase heper functions like auth.uid() should be used directly in the database function</p> 

<p>Functions from the hidden layer should always raise an error if they fail.</p>
<hr>

<h1>Testing Approach</h1>
<p>The project uses no unit tests so far. However, all features should be committed with a working Cypress end-to-end test that covers at least the expected positive base-line scenario, e.g. the workflows possible in the GUI</p>
<p>To facilitate database security, negative scenarios (e.g. database calls which should not return results because they are not allowed) should be tested using Cypress api call tests.</p>
<hr>

<h1>Recommended "Definition of Done" Checklist</h1>
<p>This is not mandatory - but a guideline:</p>
<ol>
  <li>Check naming conventions</li>
  <li>Document public functions</li>
  <li>Implement end-to-end-tests</li>
  <li>Pass all existing end-to-end-test to ensure code compatibility</li>
</ol>

<hr>
<h1>Local development server Frontend (Angular)</h1>
<p>Run <code>ng serve</code> for a dev server. Navigate to <code>http://localhost:4200/</code>.</p>

<h1>Local development server Backend (Supabase)</h1>
<p>Run <code>supabase start</code> for a local dev server. Navigate to <code>http://localhost:54323/</code>. Follow the <a href="https://supabase.com/docs/guides/cli/local-development">local development</a> guide of Supabase to reset or reload your environment</p>

<h1>Local running Cypress end-to-end tests</h1>
Run <code>npm run e2e_open</code> to open the Cypress test runner and execute tests without resetting your Supabase environment. Run <code>npm run e2e_run</code> to run the e2e test in your command line.
