@echo off

REM SCRIPT REQUIRES RUNNING DOCKER DESKTOP

REM Specify the destination folder where the file will be copied
set "destination_folder=%~dp0supabase\migrations"

REM Delete all files in destination
del /q "%destination_folder%\*.*"

REM Use the copy command to copy the migration files to the destination folder
copy "%~dp0supabase\migrations\01_migration_preparation_and_schemas\*" "%destination_folder%"

copy "%~dp0supabase\migrations\000000_migration_preparation_and_schemas\*" "%destination_folder%"
copy "%~dp0supabase\migrations\001000_profiles\*" "%destination_folder%"
copy "%~dp0supabase\migrations\001001_profile_counters\*" "%destination_folder%"
copy "%~dp0supabase\migrations\001002_profile_followers\*" "%destination_folder%"

copy "%~dp0supabase\migrations\002000_groups\*" "%destination_folder%"
copy "%~dp0supabase\migrations\002001_group_counters\*" "%destination_folder%"
copy "%~dp0supabase\migrations\002002_group_member_requests\*" "%destination_folder%"
copy "%~dp0supabase\migrations\002003_group_member_invitations\*" "%destination_folder%"
copy "%~dp0supabase\migrations\002004_group_members\*" "%destination_folder%"
copy "%~dp0supabase\migrations\002005_group_relation_requests\*" "%destination_folder%"
copy "%~dp0supabase\migrations\002006_group_relations\*" "%destination_folder%"
copy "%~dp0supabase\migrations\002007_group_followers\*" "%destination_folder%"

copy "%~dp0supabase\migrations\003000_meetings\*" "%destination_folder%"
copy "%~dp0supabase\migrations\004000_amendments\*" "%destination_folder%"
copy "%~dp0supabase\migrations\005000_change_requests\*" "%destination_folder%"
copy "%~dp0supabase\migrations\006000_elections\*" "%destination_folder%"
copy "%~dp0supabase\migrations\007000_todos\*" "%destination_folder%"
copy "%~dp0supabase\migrations\008000_payments\*" "%destination_folder%"
copy "%~dp0supabase\migrations\009000_blogs\*" "%destination_folder%"
copy "%~dp0supabase\migrations\010000_statements\*" "%destination_folder%"
copy "%~dp0supabase\migrations\011000_chats\*" "%destination_folder%"
copy "%~dp0supabase\migrations\041000_assistants\*" "%destination_folder%"
copy "%~dp0supabase\migrations\051000_searches\*" "%destination_folder%"
copy "%~dp0supabase\migrations\051001_hashtags\*" "%destination_folder%"
copy "%~dp0supabase\migrations\071000_notifications\*" "%destination_folder%"

copy "%~dp0supabase\migrations\099998_access_grants\*" "%destination_folder%"
copy "%~dp0supabase\migrations\099999_seed\*" "%destination_folder%"

REM Check if the copy operation was successful
    pause

if errorlevel 1 (
    echo Error: Failed to copy the file.
) else (
    echo File has been successfully copied to "%destination_folder%".
)


setlocal enabledelayedexpansion
REM Change to the destination directory
set "start_folder=%CD%"
cd /d "%destination_folder%"

REM remove the first "_" after the postgres object type 2 digits
for %%f in (*) do (
    set "filename=%%f"
    set "newfilename=!filename:~0,2!!filename:~3!"
    ren "%%f" "!newfilename!"
)

REM remove the second underscore after the running number of 3 digits
for %%f in (*) do (
    set "filename=%%f"
    set "newfilename=!filename:~0,5!!filename:~6!"
    ren "%%f" "!newfilename!"
)

REM Add the prefix "000" to each file name to create 14 starting digits (yyyy - mm - dd - hh - mm - ss) (default
REM postgres setting
 for %%f in (*) do (
     set "filename=%%f"
     set "newfilename=000!filename!"
     ren "%%f" "!newfilename!"
 )

cd /d "%start_folder%"
endlocal

@REM  Apply migrations locally: (requires supabase start once to start db)
@REM      supabase start
     supabase db reset
     pause

@REM     Apply migrations remote
  echo Y | npx supabase db reset --linked
    supabase db push --include-all
    pause

REM    supabase functions deploy
REM    pause

@REM     Generate types from remote (requires to click apply editor config to work locally, else wise type errors
@REM occure)
echo Start generating types
supabase gen types typescript --project-id "kvfoskstaagtgqvbrwbo" --schema public > supabase/types/supabase.public.ts
supabase gen types typescript --project-id "kvfoskstaagtgqvbrwbo" --schema authenticated > supabase/types/supabase.authenticated.ts
supabase gen types typescript --project-id "kvfoskstaagtgqvbrwbo" --schema hidden > supabase/types/supabase.hidden.ts
supabase gen types typescript --project-id "kvfoskstaagtgqvbrwbo" --schema security > supabase/types/supabase.security.ts
supabase gen types typescript --project-id "kvfoskstaagtgqvbrwbo" --schema postgres > supabase/types/supabase.postgres.ts

@REM Start angular client and run tests
@REM     pause
@REM     ng serve
@REM    npx cypress run --spec "cypress/e2e/all.cy.ts" --record false

REM Delete all files in destination
del /q "%destination_folder%\*.*"
