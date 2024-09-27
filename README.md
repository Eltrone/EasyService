## push
```bash
git add . && git commit -m "test" && git push
```

## running
```bash
cd server && npm run build && cd .. && make clean && make down && make build && make up
```

## remove containers
```bash
docker rm 73d3e7967fc8 f8b3fe85a126 c6aed5adc9f4 f1ded1f8044a f53624c01c03
```

## access the database mysql
```bash
docker exec -it mysql_db mysql -uuser -puser_password
```

## start docker
```bash
docker start mysql_db
```