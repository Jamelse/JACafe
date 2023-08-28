class StripeController < ApplicationController

  def order_success
    create_order
    update_cart_items
    render json: @order
  end


  private

  def create_order
    @order = @current_user.orders.create!(
      date: DateTime.now.strftime('%m/%d/%Y'),
      total: params[:total],
      status: 'Processing'
    )
  end

  def update_cart_items
    params[:items].each do |item|
      cart_item = CartItem.find_by(id: item)
      cart_item.update!(order_id: @order.id, cart_id: nil)
    end
  end
end
