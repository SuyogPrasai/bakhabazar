import multiprocessing

wsgi_app = "bakhabazar.asgi:application"
worker_class = "uvicorn.workers.UvicornWorker"
workers = multiprocessing.cpu_count() *2 + 1
bind = "0.0.0.0:8000"