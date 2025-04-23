# Instala o Node.js na versão 22, usado para construir a aplicação Angular
FROM node:22 as builder

# Cria a pasta de trabalho para o projeto dentro do container
WORKDIR /app

# Copia todo o conteúdo do diretório atual (do host) para a pasta /app dentro do container
COPY . .

# Instala as dependências do projeto, listadas no package.json
RUN npm install

# Faz a build da aplicação Angular, gerando a pasta 'dist' com os arquivos otimizados para produção
RUN npm run build

# Usa a imagem Nginx baseada no Alpine, que é mais leve e otimizada para produção
FROM nginx:alpine

# Copia os arquivos gerados pelo build da aplicação Angular para o diretório padrão de arquivos estáticos do Nginx
COPY --from=builder /app/dist/task-dashboard/browser /usr/share/nginx/html

# Substitui a configuração padrão do Nginx pela configuração personalizada (nginx.conf)
COPY nginx.conf /etc/nginx/nginx.conf

# Copia os tipos MIME personalizados, caso haja necessidade de adicionar ou ajustar tipos de arquivo
COPY mime.types /etc/nginx/mime.types

# Expõe a porta 80 para acesso à aplicação via HTTP
EXPOSE 80

# Comando que mantém o Nginx rodando no foreground, como processo principal do container
CMD ["nginx", "-g", "daemon off;"]