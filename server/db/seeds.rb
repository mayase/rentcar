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
car.seats = 4
car.luggage = 3
car.conditioning = true
car.transmission = 3
car.availability_start_date = Date.today
car.availability_end_date = Date.today
car.save
