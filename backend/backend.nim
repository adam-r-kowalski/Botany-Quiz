import ospaths, json, strutils, base64

echo "Content-Type: application/json;charset=us-ascii"
echo "Access-Control-Allow-Origin: *"
echo "\n\n"

var query = getEnv("QUERY_STRING")

if query == "load":
  echo readFile("plants.json")

elif query.startsWith("store="):
  query.removePrefix("store=")
  writeFile("out.json", query.decode)
  echo %*{"store": true}

else:
  echo %*{"invlalid": true}
