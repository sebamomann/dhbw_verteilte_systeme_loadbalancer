# Stage 1: Build an Angular Docker Image
FROM node as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app

ARG prod="false"
RUN if [[ -z "$prod" == "true" ]] ; then npm run deploy --outputPath=./dist/out ; else npm run build --outputPath=./dist/out ; fi
#RUN if [[ -z "$prod" == "true" ]] ; then echo true ; else echo false ; fi

#RUN npm run build -- --outputPath=./dist/out --configuration $configuration
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
