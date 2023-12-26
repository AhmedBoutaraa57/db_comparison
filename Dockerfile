FROM greptime/greptimedb:latest

RUN apt-get update && apt-get install -y htop
