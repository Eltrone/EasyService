.PHONY: build up down logs clean

# Build both client and server containers
build:
	docker-compose build

# Bring up containers
up:
	docker-compose up -d

# Bring down containers
down:
	docker-compose down

# Show logs
logs:
	docker-compose logs -f

# Clean up everything
clean:
	docker-compose down --volumes --rmi all