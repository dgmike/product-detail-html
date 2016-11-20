VERSION := $(shell which stepup > /dev/null && stepup version --next-release --format mvn)
USER := $(shell git config user.name)
DATE := $(shell date +'%b/%d %Y %H:%M %z')
CHECK_FILES := $(shell find -type f -name '*.php' -or -name '*.tpl')
CHANGELOG_FILE := Changelog.wiki
ifdef VERSION
STEPUP_HAS_NOTES := $(shell test `stepup notes | wc -l` -gt 1 && echo true)
endif

build:
ifndef VERSION
	$(error "step-up gem is required")
endif
ifndef STEPUP_HAS_NOTES
	$(error "no notes found")
endif
	@echo "generating version... ${VERSION}"
	echo '==' ${VERSION} '('${DATE} 'by '${USER}') ==' > ${CHANGELOG_FILE}
	stepup notes | sed "s/^---$$//" >> ${CHANGELOG_FILE}
	echo >> ${CHANGELOG_FILE}
	stepup changelog -f wiki >> ${CHANGELOG_FILE}
	git add ${CHANGELOG_FILE}
	git commit -m 'Updating changelog'
	sed -i -e 's/"version":.*,/"version": "${VERSION}",/' package.json
	git add package.json
	git commit -m "dump version ${VERSION}"
	stepup version create --no-editor
	git push origin master
	git push --tags
