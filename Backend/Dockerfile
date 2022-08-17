FROM node:14.17.0-slim
# Create app directory
RUN apt update && apt install -y wget netcat git

#usuario root
RUN wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

COPY ./prisma ./prisma/
RUN npx prisma generate

CMD npm run dev