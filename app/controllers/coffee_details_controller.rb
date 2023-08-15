class CoffeeDetailsController < ApplicationController
  before_action :find_coffee
  before_action :admin_authorization

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

  def admin_authorization
    render json: { errors: [ "Not Authorized" ] }, status: :unauthorized unless @current_user.isAdmin?
  end

end
