import ospaths, json

echo "Content-Type: application/json;charset=us-ascii\n\n"

let query = getEnv("QUERY_STRING")

case query
of "load":
  echo readFile("plants.json").parseJson
of "store":
  echo %*{"storing": true}
else:
  echo %*{"invalid": true}
