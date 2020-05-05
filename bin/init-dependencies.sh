#!/bin/bash

# This script could be tidied up by handling container naming conflicts
# for now it assumes there is a fresh environment with docker running

cd ..

echo "---> cloning InterMine Compose"
git clone https://github.com/intermine/intermine_compose

echo "---> cloning InterMine Configurator"
git clone https://github.com/intermine/intermine_configurator

echo "---> running server startup scripts"
cd wizard
source bin/startup.sh
