@echo off
REM SCRIPT REQUIRES RUNNING DOCKER DESKTOP

REM Specify the destination folder where the file will be copied
set "destination_folder=%~dp0supabase\migrations"

REM Delete all files in destination
del /q "%destination_folder%\*.*"

REM Use the copy command to copy the migration files to the destination folder
copy "%~dp0supabase\migrations\01_migration_preparation_and_schemas\*" "%destination_folder%"

copy "%~dp0supabase\migrations\02_profile\*" "%destination_folder%"
copy "%~dp0supabase\migrations\03_profile-follow\*" "%destination_folder%"
copy "%~dp0supabase\migrations\04_search\*" "%destination_folder%"
copy "%~dp0supabase\migrations\05_assistant\*" "%destination_folder%"
copy "%~dp0supabase\migrations\06_notifications\*" "%destination_folder%"
copy "%~dp0supabase\migrations\07_groups\*" "%destination_folder%"
copy "%~dp0supabase\migrations\08_group_relations\*" "%destination_folder%"
copy "%~dp0supabase\migrations\09_group_member\*" "%destination_folder%"
copy "%~dp0supabase\migrations\11_hashtags\*" "%destination_folder%"
copy "%~dp0supabase\migrations\12_meetings\*" "%destination_folder%"

copy "%~dp0supabase\migrations\98_access_grants\*" "%destination_folder%"
copy "%~dp0supabase\migrations\99_seed\*" "%destination_folder%"

REM Check if the copy operation was successful
if errorlevel 1 (
    echo Error: Failed to copy the file.
) else (
    echo File has been successfully copied to "%destination_folder%".

    pause

@REM  Apply migrations locally: (requires supabase start once to start db)
@REM      supabase start
     supabase db reset
     pause

@REM     Apply migrations remote
  echo Y | npx supabase db reset --linked
    supabase db push --include-all
    pause

    supabase functions deploy
    pause

@REM     Generate types from remote (requires to click apply editor config to work locally, else wise type errors
@REM occure)
    supabase gen types typescript --project-id "rjljgqxktntquuftngcf" --schema public > supabase/types/supabase.ts
    supabase gen types typescript --project-id "rjljgqxktntquuftngcf" --schema authenticated_access > supabase/types/supabase_authenticated_access.ts

@REM Start angular client and run tests
@REM     pause
@REM     ng serve
@REM    npx cypress run --spec "cypress/e2e/all.cy.ts" --record false
    pause
)

