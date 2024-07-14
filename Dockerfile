FROM mongo

COPY init-sleepr-user.js /docker-entrypoint-initdb.d/
