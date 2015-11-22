Rentcar 
===
Запуск сервера
---
1. `> git clone https://github.com/mayase/rentcar.git`
2.  подготовка сервера `rentcar\server> bundle install | rake db:migrate`
3.  запуск сервера  `rails s


Настройка фронтового окружения
---
1.  установить [node.js](https://nodejs.org/en/)
2.  установка треубемых пакетов  `rentcar\client> npm install | bower install`
3.  запуск фронта для дева (сервер должен быть запущен и слушать localhost:3000) `gulp run`
