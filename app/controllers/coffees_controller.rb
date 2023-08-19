class CoffeesController < ApplicationController
  skip_before_action :authorize_user, only: :create
  before_action :find_coffee, only: [:show, :update, :destroy]
  before_action :admin_authorization, only: [:update, :destroy]

  def index
    render json: Coffee.all
  end

  def show 
    render json: @coffee
  end

  def create 
    render json: Coffee.create!(coffee_params), status: :created
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

  def admin_authorization
    render json: { errors: [ "Not Authorized" ] }, status: :unauthorized unless @current_user.isAdmin?
  end

  def find_coffee
    @coffee = Coffee.find(params[:id])
  end

  def coffee_params
    params.permit(:name, :price, :image, :description, :calories, :hot)
  end

end
