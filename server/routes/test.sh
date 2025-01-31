#!/bin/sh

# curl --header "Content-Type: application/json" \
#   	 --request POST \
#      --data '{"description":"xyz","category":"xyz","src":"x","type":"y"}' \
#      http://localhost:5050/links


# curl --header "Content-Type: application/json" \
#   	 --request POST \
#      --data '[{"description":"xyz","category":"xyz","src":"x","type":"y"},
#      					{"description":"xyz","category":"xyz","src":"x","type":"y"}]' \
#      http://localhost:5050/links/links


# curl --header "Content-Type: application/json" \
#   	 --request PATCH \
#      --data '{"description":"updated","category":"updated","src":"updated","type":"updated"}' \
#      http://localhost:5050/links/679d22f395fd55e319d73453


curl --request DELETE http://localhost:5050/links/679d22f395fd55e319d73453