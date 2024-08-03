.PHONY: install install-quick start stop rebuild

include ./docker/env/.env.local

#Spring
install:
	mvn clean install

install-quick:
	mvn install

start:
	$(eval CURRENT_VERSION := $(shell git describe --tags))
	@echo $(CURRENT_VERSION)
	mvn spring-boot:start

stop:
	mvn spring-boot:stop

rebuild: stop install-quick start


#Docker
docker-start:
	docker-compose up -d

docker-stop:
	docker-compose down

docker-clean:
	docker volume rm $(shell docker volume ls -q)

docker-rebuild: docker-stop docker-clean docker-start


#Vue
vue-install:
	npm --prefix ./vue/src/vue install

vue-run:
	npm --prefix ./vue/src/vue run dev -- --host 0.0.0.0

#Production
vue-build:
	npm --prefix ./vue/src/vue run build

vue-rebuild: vue-install vue-run