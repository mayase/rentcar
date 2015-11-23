# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' },{ name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
car = Car.new
  car.lat =  55.0
  car.lng =  37.0
  car.price =  5000
  car.class =  1
  car.seats = 4
  car.luggage =  3
  car.conditioning =  false
  car.transmission = 3
  car.availability_start_date =  Date
  car.name = 'Toyota-huyota'
car.save
