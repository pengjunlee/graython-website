FROM eclipse-temurin:8-jre

RUN apt-get update && apt-get install -y supervisor

WORKDIR /app

COPY backend-blossom.jar /app/blossom/blossom.jar
COPY graython-website.jar /app/website/website.jar

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ENV TZ=Asia/Shanghai
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone
EXPOSE 9999 8081

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]