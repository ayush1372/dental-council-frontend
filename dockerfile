FROM harbor.pmjaydevmgmt.tatacommunications.com/abdm/nginx:latest
COPY dist/council-app  /usr/share/nginx/html/web
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx
EXPOSE 80
