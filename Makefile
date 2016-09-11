default: build

build:
	npm run build

publish:
	git checkout -B gh-pages
	git add -f build
	git commit -am "Rebuild website"
	git filter-branch -f --prune-empty --subdirectory-filter build
	git push -f origin gh-pages
	git checkout -

.PHONY: build publish
