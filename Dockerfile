FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production
COPY . /app
EXPOSE 7001
CMD npm start

# mysql 启动命令
# docker run --restart=always --privileged=true -v 
# /Users/mac/Documents/docker/mysql/data/:/var/lib/mysql 
# --name mysql -p 33060:3306 -e MYSQL_ROOT_PASSWORD=123456 
# -d mysql:5.7.24 --lower_case_table_names=1