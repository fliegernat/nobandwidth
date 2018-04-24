node node_modules/wintersmith/bin/wintersmith build
[ -d build ] && rm -rf build
git add build/
git commit -m "updating build"
git push heroku master