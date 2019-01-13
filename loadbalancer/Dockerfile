# Use the standard Nginx image from Docker hub
FROM nginx

# Copy the config file from the current dir and paste it
# inside the container to use as Nginx default config
COPY nginx.conf /etc/nginx/nginx.conf

# Port 8080 of the container will be exposed and then 
# mapped to post 8080 of host machine via Compose. This way
# can access server via localhost:8080 on host
EXPOSE 8080

# Start nginx when container has provisioned 
CMD [ "nginx", "-g", "daemon off;" ]