#!/bin/sh

# curl --header "Content-Type: application/json" \
#   	 --request POST \
#      --data '{"description":"xyz","category":"xyz","src":"x","type":"y"}' \
#      http://localhost:5050/links


curl --header "Content-Type: application/json" \
  	 --request POST \
     --data '[{"description":"xyz","category":"xyz","src":"x","type":"y"},
     					{"description":"xyz","category":"xyz","src":"x","type":"y"}]' \
     http://localhost:5050/links/links