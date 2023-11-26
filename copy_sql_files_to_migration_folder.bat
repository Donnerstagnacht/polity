@echo off
REM SCRIPT REQUIRES RUNNING DOCKER DESKTOP

REM Specify the destination folder where the file will be copied
set "destination_folder=%~dp0polity\supabase\migrations"

REM Delete all files in destination
del /q "%destination_folder%\*.*"

REM Use the copy command to copy the migration files to the destination folder
copy "%~dp0polity\supabase\migrations\01_core\*" "%destination_folder%"

copy "%~dp0polity\supabase\migrations\02_profile\*" "%destination_folder%"
copy "%~dp0polity\supabase\migrations\03_profile-follow\*" "%destination_folder%"
copy "%~dp0polity\supabase\migrations\04_search\*" "%destination_folder%"
copy "%~dp0polity\supabase\migrations\05_assistant\*" "%destination_folder%"
copy "%~dp0polity\supabase\migrations\06_notifications\*" "%destination_folder%"

copy "%~dp0polity\supabase\migrations\99_seed\*" "%destination_folder%"


REM Check if the copy operation was successful
if errorlevel 1 (
    echo Error: Failed to copy the file.
) else (
    echo File has been successfully copied to "%destination_folder%".

    cd polity
    supabase start
    supabase db reset
    echo Y | npx supabase db reset --linked
    supabase db push --include-all
    supabase gen types typescript --project-id "qwetlgmbngpopdcgravw" --schema public > supabase/types/supabase.ts
@REM     pause
@REM     ng serve
    npx cypress run --spec "cypress/e2e/all.cy.ts" --record false
    pause
)

