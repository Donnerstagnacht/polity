import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on: any, config: any) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:4200',
        defaultCommandTimeout: 10000
    }
});
