import ospaths, json, strutils, base64

echo "Content-Type: application/json;charset=us-ascii"
echo "Access-Control-Allow-Origin: *"
echo "\n\n"

var query = getEnv("QUERY_STRING")

let filename = "plants.json"

if query == "load":
  echo readFile(filename)

elif query.startsWith("store="):
  query.removePrefix("store=")
  writeFile(filename, query.decode)
  echo %*{"store": true}

else:
  echo %*{"invlalid": true}
