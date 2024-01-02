# Kullanılacak base image belirleniyor
FROM node:latest

# Uygulama dosyalarını /app klasörüne kopyala
WORKDIR /app
COPY . .

# Bağımlılıkları yükle
RUN yarn install

EXPOSE 5000

# Uygulamayı çalıştır
CMD ["yarn", "start"]