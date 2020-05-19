#!/bin/bash

# This script checks out the relevant repos to the directory _above_ wizard.
# It then runs starup.sh. Once you've run this script you won't need to run it
# again, just use startup.sh instead

cd ..

echo "---> cloning InterMine Compose"
git clone https://github.com/intermine/intermine_compose

echo "---> cloning InterMine Configurator"
git clone https://github.com/intermine/intermine_configurator

echo "---> running server startup scripts"
cd wizard
source bin/startup.sh
