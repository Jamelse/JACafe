class OrdersController < ApplicationController
  before_action :find_order, only: :update

  def index 
    render json: Order.all.order(:created_at)
  end

  def user_orders
    orders = @current_user.orders.all
    render json: orders
  end

  def update
    @order.update!(order_params)
    render json: @order, status: :accepted
  end

  private 

  def find_order 
   @order = Order.find(params[:id])
  end

  def order_params
    params.permit(:status, :date)
  end
end
