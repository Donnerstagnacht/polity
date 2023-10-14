@echo off

REM Specify the destination folder where the file will be copied
set "destination_folder=%~dp0polity\supabase\migrations"

REM Delete all files in destination
del /q "%destination_folder%\*.*"

REM Use the copy command to copy the file to the destination folder
copy "%~dp0polity\src\app\core\database\10001_profile_table.sql" "%destination_folder%"
copy "%~dp0polity\src\app\core\database\40001_handle_new_user.sql" "%destination_folder%"



REM Check if the copy operation was successful
if errorlevel 1 (
    echo Error: Failed to copy the file.
) else (
    echo File has been successfully copied to "%destination_folder%".
)

pause