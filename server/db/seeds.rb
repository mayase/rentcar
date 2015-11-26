# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# car = Car.new(name: "toyota test")
# car.lat = 55.0
# car.lng = 37.0
# car.price = 700
# car.class_id = 3
# car.seats = 1
# car.luggage = 3
# car.conditioning = true
# car.transmission = 3
# car.availability_start_date = Date.today
# car.availability_end_date = Date.today
# car.save

Car.delete_all

def range (min, max)
  rand * (max-min) + min
end

# def time_rand (from = 0.0, to = Time.now)
#   Time.at(from.to_ + rand * (to.to_f - from.to_f)).to_date
# end

1.upto(1000) do |i|
  Car.create(:name => "Test car #{i}", :lat => range(55.7016478, 55.7976993), :lng => range(37.5114644, 37.7318277),
  :price => (range(300, 3000)).round, :seats => rand(1..3), :class_id => rand(1..4), :luggage => rand(1..4),
  :transmission => [1, 3].sample, :conditioning => false,
  :availability_start_date => Date.yesterday,
  :availability_end_date =>  rand(1.month).from_now)
end