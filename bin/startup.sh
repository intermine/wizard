#!/bin/bash

# This script could be tidied up by handling container naming conflicts
# for now it assumes there is a fresh environment with docker running

cd ../intermine_compose
docker build -t intermine/compose:latest .
cd ../intermine_configurator
docker build -t intermine/configurator:latest .
cd ../wizard

docker-compose up --build --force-recreate
