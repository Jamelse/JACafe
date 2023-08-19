class CoffeeDetailsController < ApplicationController
  before_action :find_detail, only: [:update]
  before_action :admin_authorization

  def update
    @detail.update!(detail_params)
    render json: @detail, status: :accepted
   end

   def create
    render json: CoffeeDetail.create!(detail_params), status: :accepted
  end

  private

  def find_detail
    @detail = CoffeeDetail.find(params[:id])
  end

  def detail_params
    params.permit(:coffee_id, :espresso_shots, :milk, :syrup, :syrup_pumps)
  end

  def admin_authorization
    render json: { errors: [ "Not Authorized" ] }, status: :unauthorized unless @current_user.isAdmin?
  end

end
