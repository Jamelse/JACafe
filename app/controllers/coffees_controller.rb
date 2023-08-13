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

  private

  def find_coffee
    @coffee = Coffee.find(params[:id])
  end

  def coffee_params
    params.permit(:name, :price, :image, :description, :calories, :hot)
  end

end
