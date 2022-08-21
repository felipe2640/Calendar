#!/bin/bash

npm install

npx prisma migrate dev --name init

npx prisma generate

#tail -f /dev/null

npm start