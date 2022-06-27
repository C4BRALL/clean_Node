# usando uma imagem do node
FROM node
# cria uma pasta onde fica o codigo
WORKDIR .
# copia só o que precisa
COPY . .
COPY package.json package-lock.json ./
# instala com segurança só as lib's que não são de dev
RUN npm ci --production
# permite a inserção de variaveis de ambiente
ENV \
  PORT=3232 \
  MYSQL_HOST=localhost \
  MYSQL_PORT=3306 \
  MYSQL_USER=root \
  MYSQL_PASSWORD=root
# roda a aplicação
CMD [ "node", "src/index.js" ]
