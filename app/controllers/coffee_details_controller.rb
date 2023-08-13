class CoffeeDetailsController < ApplicationController

  def update
    @coffee.coffee_detail.first.update!(detail_params)
    render json: @coffee, status: :accepted
   end

   def create
    @coffee.coffee_detail.create!(detail_params)
    render json: @coffee, status: :accepted
  end

  private

  def find_coffee
    @coffee = Coffee.find(params[:id])
  end

  def detail_params
    params.permit(:espresso_shots, :milk, :syrup, :syrup_pumps)
  end

end
