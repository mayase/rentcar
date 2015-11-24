class CarsController < ApplicationController
  before_action :set_car, only: [:show, :update, :destroy]

    #GENERATED STUFF. NOT RESPONSIBLE FOR THIS SHIT
  # GET /cars
  # GET /cars.json
  def index
    @cars = Car.all

    render json: @cars
  end

  # GET /cars/1
  # GET /cars/1.json
  def show
    render json: @car
  end

  # POST /cars
  # POST /cars.json
  def create
    @car = Car.new(car_params)

    if @car.save
      render json: @car, status: :created, location: @car
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cars/1
  # PATCH/PUT /cars/1.json
  def update
    @car = Car.find(params[:id])

    if @car.update(car_params)
      head :no_content
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cars/1
  # DELETE /cars/1.json
  def destroy
    @car.destroy

    head :no_content
  end

  def search
    found_cars,maxp, minp = Car.search params
    #get top & offset params
    top = 10
    top = params[:top].to_i if params[:top]

    offset = 0
    offser = params[:offset].to_i if params[:offset]
    #render response
    response = Hash.new
    response[:max_price] = maxp
    response[:min_price] = minp
    response[:total] = found_cars.length
    response[:result] = found_cars[offset..top - offset - 1]
    render json: response
  end

  private
    def set_car
      @car = Car.find(params[:id])
    end

    def car_params
      params.require(:car).permit(:name, :lat, :lng, :price, :class, :seats, :luggage, :conditioning, :transmission, :availability_start_date, :availability_end_date)
    end
end
