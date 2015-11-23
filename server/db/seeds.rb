# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Car.create(name: "Toyota-huyota", lat: 55.0, lng: 37.0, price: 5000, class: 1, seats:4, luggage: 3, conditioning: false, transmission: 3, availability_start_date: Date.today, availability_end_date: Date.today + 2.days)
