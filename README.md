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
2.  установить bower `npm install -g bower`
3.  установка треубемых пакетов  `rentcar\client> npm install | bower install`
4.  запуск фронта для дева (сервер должен быть запущен и слушать localhost:3000) `gulp run`


API
---
###CAR
По идее правильнее было бы отпилить класс тачки, кол-во мест и т.п. в отдельные сущности, но мы не оч серьезно, поэтому так.
Для некоторых полей прописано во что мапятся их значения, это вспомогательная информация.
####Model
```javascript
{
  id: pk int/uid?
  name: String,
  lat: float,
  lng: float,
  price: int,
  class: int, values [0, 1, 2, 3, 4] => ['undef', 'two-seats', 'small', 'mid', 'large']
  seats: int, values [0, 1, 2, 3] => ['undef', 2, 4, 5+]
  luggage: int, values [0, 1, 2, 3, 4] => ['undef', 1, 2, 3, 4+]
  conditioning: boolean,
  transmission: int, values [0, 1, 2, 3] => ['undef', 'manual', 'semi-automatic', 'automatic'],
  availabilityStartDate: Date,
  availabilityEndDate: Date
}
```
####Methods
##### CRUD (стандартные, из коробки)
**endpoint:** `/api/cars`
##### Search
**endpoint:** `GET /api/cars/search`

**params:**
```
    price_start?, 
    price_end?, 
    class?, 
    seats?, 
    luggage?, 
    conditioning?, 
    transmission?, 
    availabilityStartDate?, 
    availabilityEndDate?, 
    boundaryTopLeftLat?,
    boundaryTopLeftLng?, 
    boundaryBottomRightLat?, 
    boundaryBottomRightLng?,
    userLat?,
    userLng?,
    top=10?,
    offset=0?`
```
все параметры опциональны. Пустой запрос запрос возвращает первые 10 тачек, сортировка по цене.

**return:**

```javascript
{
  result: [Car]
  total: int, total_number_of_cars_matching_request,
  price_min: int,
  price_max: int
}
```

Фильтры на equal:
```
    class?, 
    seats?, 
    luggage?, 
    conditioning?, 
    transmission?
```
Фильтры на gte, lte:
```
    price_start?, 
    price_end?, 
    availabilityStartDate?, 
    availabilityEndDate?, 
    boundaryTopLeftLat?,
    boundaryTopLeftLng?, 
    boundaryBottomRightLat?, 
    boundaryBottomRightLng?,
```
Сортировка:

Если `userLat, userLng` не указаны (один или оба), то по цене.

Если указаны, то сортировка по удаленности от пользователя (от близких к далеким)

