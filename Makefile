VERSION_TAG=$(shell git describe --match 'v[0-9]*' --dirty='.m' --always)
PROJECT_SLUG=prototype-web-app
ENV ?= dev

.PHONY: image pull push deploy-dry-run deploy

image:
	docker build --build-arg BUILD_STAGE=prod -t ${PROJECT_SLUG}:${VERSION_TAG} .

pull:
ifndef REGISTRY
	$(error REGISTRY must be set for pull)
endif
ifndef PROJECT_SLUG
	$(error PROJECT_SLUG must be set for pull)
endif
	# Caller can define the registry they are pulling from
	docker pull ${REGISTRY}${PROJECT_SLUG}:${VERSION_TAG}
	docker tag ${REGISTRY}${PROJECT_SLUG}:${VERSION_TAG} ${PROJECT_SLUG}:${VERSION_TAG}

push:
ifndef REGISTRY
	$(error REGISTRY must be set for push)
endif
	# Caller can define the registry they are pushing to.
	docker tag ${PROJECT_SLUG}:${VERSION_TAG} ${REGISTRY}${PROJECT_SLUG}:${VERSION_TAG}
	docker push ${REGISTRY}${PROJECT_SLUG}:${VERSION_TAG}

deploy-dry-run:
ifndef ENV
	$(error ENV must be set for deploy)
endif
	helm template juno-application ./deploy/juno-application -f ./deploy/values.${ENV}.yaml --set image.tag=${VERSION_TAG} | kubectl apply --dry-run='server' -f -

deploy:
ifndef ENV
	$(error ENV must be set for deploy)
endif
	helm upgrade --atomic --install juno-application ./deploy/juno-application -f ./deploy/values.${ENV}.yaml --set image.tag=${VERSION_TAG}
Cruise
