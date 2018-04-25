echo "Creating a new post!"
echo "===================="
printf "Title: "
read -r title

lctitle="$(echo $title | sed -e 's/\(.*\)/\L\1/' | sed -e 's/\s/-/g')"
contentDir="./contents/articles/"
postDir=$contentDir$lctitle
date=`date +%Y-%m-%d`

echo ""
echo "Creating post under $postDir/index.md"
echo "Title: $title"
echo "Date: $date"
mkdir $postDir
cat ./templates/post-header.md | sed -e "s/__TITLE/$title/m" | sed -e "s/__DATE/$date/m" > $postDir"/index.md"