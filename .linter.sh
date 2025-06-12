#!/bin/bash
cd /home/kavia/workspace/code-generation/recipehub-38928-afb023f7/recipehub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

