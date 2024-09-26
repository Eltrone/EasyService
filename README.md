## push
```bash
git add . && git commit -m "test" && git push
```

## running
```bash
cd server && npm run build && cd .. && make clean && make down && make build && make up
```

## access the database mysql
```bash
docker exec -it mysql_db mysql -uuser -puser_password
```