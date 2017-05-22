run:
	docker-compose stop
	docker-compose up &

clean:
	docker-compose stop
	docker-compose rm -f
	docker volume rm db_data


build:
	docker-compose stop
	docker-compose rm -f
	docker-compose build
	docker volume create db_data

init_db:
	docker-compose run web python manage.py makemigrations
	docker-compose run web python manage.py migrate
	docker-compose run web python manage.py createsuperuser


 
