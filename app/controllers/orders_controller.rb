class OrdersController < ApplicationController
  before_action :find_order, only: :update
  before_action :admin_authorization, only: [:index, :update]

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

  def create 
    new_order = @current_user.orders.create!(order_params)
    cart = Cart.find_by(id: session[:cart_id])
    cart.update!(order_id: new_order.id)
    render json: new_order, status: :created
  end

  private 

  def find_order 
   @order = Order.find(params[:id])
  end

  def order_params
    params.permit(:status, :date, :cart_id)
  end

  def admin_authorization
    render json: { errors: [ "Not Authorized" ] }, status: :unauthorized unless @current_user.isAdmin?
  end

end
