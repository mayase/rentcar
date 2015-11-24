# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
car = Car.new(name: "toyota test")
car.lat = 55.0
car.lng = 37.0
car.price = 700
car.class_id = 3
car.seats = 1
car.luggage = 3
car.conditioning = true
car.transmission = 3
car.availability_start_date = Date.today
car.availability_end_date = Date.today
car.save

car2 = Car.new(name: "honda test")
car2.lat = 55.1
car2.lng = 37.1
car2.price = 400
car2.class_id = 2
car2.seats = 2
car2.luggage = 3
car2.conditioning = false
car2.transmission = 1
car2.availability_start_date = Date.tomorrow
car2.availability_end_date = Date.tomorrow
car2.save
