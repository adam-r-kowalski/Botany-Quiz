import ospaths, json, strutils, base64, cgi, strtabs

echo "Content-Type: application/json;charset=us-ascii"
echo "Access-Control-Allow-Origin: *"
echo "\n\n"

var query = getEnv("QUERY_STRING")

let filename = "plants.json"

if query == "load":
  echo readFile(filename)

elif query == "store":
  let data = cgi.readData()
  writeFile("demo.txt", data["allPlants"])

  echo %*{"store": true}

else:
  echo %*{"invalid": true}
