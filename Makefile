IMAGE_NAME=firewall-client
CONTAINER_NAME=firewall-client-container
PORT=3000
.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .

.PHONY: run
run:
	docker run -d -p $(PORT):80 --name $(CONTAINER_NAME) $(IMAGE_NAME)

.PHONY: restart
restart:
	docker rm -f $(CONTAINER_NAME) || true
	make run

.PHONY: stop
stop:
	docker rm -f $(CONTAINER_NAME) || true

.PHONY: clean
clean:
	docker rmi $(IMAGE_NAME) || true

.PHONY: build-react
build-react:
	npm install
	npm run build

.PHONY: logs
logs:
	docker logs -f $(CONTAINER_NAME)