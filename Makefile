FILES = README.md icon.png manifest.json onlyj.js

.PHONY: dist
default:

dist:
	rm -rf dist
	mkdir -p dist/OnlyJforLR
	cp $(FILES) dist/OnlyJforLR/
	cd dist && zip -r OnlyJforLR.zip OnlyJforLR
