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


rebuild_web:
	docker-compose stop
	docker-compose rm -f web
	docker-compose build

init_db:
	docker-compose run web python manage.py makemigrations
	docker-compose run web python manage.py migrate
	docker-compose run web python manage.py createsuperuser

poblate_db:
	docker-compose run web python manage.py shell < script_carga.py

static_files:
	docker-compose run web python manage.py collectstatic

deploy:
	docker-compose stop
	git pull
	docker-compose rm -f
	docker-compose up &
