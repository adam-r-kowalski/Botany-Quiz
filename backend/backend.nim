import ospaths, json, strutils

echo "Content-Type: application/json;charset=us-ascii"
echo "Access-Control-Allow-Origin: *"
echo "\n\n"

let query = getEnv("QUERY_STRING")

if query == "load":
  echo readFile("plants.json").parseJson

elif query.startsWith("store="):
  echo %*{"store": true}

else:
  echo %*{"invlalid": true}
