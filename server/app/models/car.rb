class Car < ActiveRecord::Base
  def self.search(args={})
    current_scope = Car.all
    #equal filters
    current_scope = current_scope.where(class_id: args[:class]) if args[:class]
    current_scope = current_scope.where(seats: args[:seats]) if args[:seats]
    current_scope = current_scope.where(luggage: args[:luggage]) if args[:luggage]
    current_scope = current_scope.where(conditioning: args[:conditioning]) if args[:conditioning]
    current_scope = current_scope.where(transmission: args[:transmission]) if args[:transmission]

    #gte lte checks
    current_scope = current_scope.where('availability_start_date >= ?', args[:availability_start_date]) if args[:availability_start_date]
    current_scope = current_scope.where('price >= ?', args[:price_start]) if args[:price_start]
    current_scope = current_scope.where('lat >= ?', args[:boundary_bottom_right_lat]) if args[:boundary_bottom_right_lat]
    current_scope = current_scope.where('lng >= ?', args[:boundary_top_left_lng]) if args[:boundary_top_left_lng]
    current_scope = current_scope.where('availability_end_date <= ?', args[:availability_end_date]) if args[:availability_end_date]
    current_scope = current_scope.where('price <= ?', args[:price_end]) if args[:price_end]
    current_scope = current_scope.where('lat <= ?', args[:boundary_top_left_lat]) if args[:boundary_top_left_lat]
    current_scope = current_scope.where('lng <= ?', args[:boundary_bottom_right_lng]) if args[:boundary_bottom_right_lng]

    #sorting if needed
    if (args[:user_lat] && args[:user_lng])
      current_scope = current_scope.sort_by{|x| distance([x.lat, x.lng], [args[:user_lat], args[:user_lng]])}
    else
      current_scope = current_scope.sort_by{|x| x.price}
    end
    current_scope
  end

  #returns distance in meters
  def distance loc1, loc2
    rad_per_deg = Math::PI/180
    r = 6371000

    dlat_rad = (loc2[0]-loc1[0]) * rad_per_deg
    dlon_rad = (loc2[1]-loc1[1]) * rad_per_deg

    lat1_rad, lon1_rad = loc1.map {|i| i * rad_per_deg }
    lat2_rad, lon2_rad = loc2.map {|i| i * rad_per_deg }

    a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

    r * c # Delta in meters
  end
end
