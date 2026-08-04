@echo off
title Argentina World Store - Local
cd /d "%~dp0"
echo.
echo Instalando dependencias si es necesario...
call npm.cmd install
echo.
echo Abriendo la tienda en http://localhost:3000
start "" "http://localhost:3000"
echo.
call npm.cmd start
pause
