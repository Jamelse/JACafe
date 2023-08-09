class CoffeesController < ApplicationController

  before_action :find_coffee

  def index
    render json: Coffee.all
  end

  def show 
    render json: @coffee
  end

  def create 
    new_coffee = Coffee.create!(coffee_params)
    render json: new_coffee, status: :created
  end

  def update
    @coffee.update!(coffee_params)
    render json: @coffee, status: :accepted
  end

  def destroy
    @coffee.destroy
    render json: {}
  end

  def update_details
    @coffee.coffee_detail.first.update!(detail_params)
    render json: @coffee, status: :accepted
   end

   def create_detail
    @coffee.coffee_detail.create!(detail_params)
    render json: @coffee, status: :accepted
  end

  private

  def find_coffee
    @coffee = Coffee.find(params[:id])
  end

  def coffee_params
    params.permit(:name, :price, :image, :description, :calories, :hot)
  end

  def detail_params
    params.permit(:espresso_shots, :milk, :syrup, :syrup_pumps)
  end

end
