# SIA CUBE Systems Homework

## Setup the project

1. Pull the git repository;
2. Go to the project root in terminal;
3. Run `composer install`;
3. Run `npm install`;
4. If there is no `.env` file, in the terminal run `cp .env.example .env`;
5. Create mysql data base;
6. In `.env` configure the database credentials:
   1. Set `DB_DATABASE` to the created database name;
   2. Set `DB_USERNAME` to the mysql username;
   3. Set `DB_PASSWORD` to the mysql user password.
7. Run `php artisan migrate`;
8. Run `php artisan serve`;
9. In separate window run `npm run dev` or `npm run watch` if you are developing new FE features;
10. Open the app in `http://127.0.0.1/`.

### Happy learning!

#### Deploy to production:
To deploy to production, please change all the necessary server details in `.github/workflows/deploy-application.yml` file.
