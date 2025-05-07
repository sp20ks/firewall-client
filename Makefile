IMAGE_NAME=firewall-client
CONTAINER_NAME=firewall-client-container
PORT=3000
.PHONY: rebuild
rebuild:
	docker build -t $(IMAGE_NAME) .

.PHONY: up
up:
	docker run -d \
	-p $(PORT):80 \
	--env-file .env \
	--name $(CONTAINER_NAME) \
	$(IMAGE_NAME)

.PHONY: down
down:
	docker rm -f $(CONTAINER_NAME) || true

.PHONY: build-react
build-react:
	npm install
	npm run build

.PHONY: logs
logs:
	docker logs -f $(CONTAINER_NAME)