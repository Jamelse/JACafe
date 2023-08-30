class StripeController < ApplicationController

  before_action :set_stripe_key

  def checkout 
    orderItems = params[:items].collect do |item|
      cart_item = CartItem.find_by(id: item)

      {
          price_data: {
              currency: 'usd',
              product_data: {
                  name: cart_item.coffee.name,
              },
              unit_amount: cart_item.coffee.price.to_i * 100

          },
          quantity: cart_item.quantity,

       }

    end
    session = Stripe::Checkout::Session.create({
      line_items: orderItems,
      payment_method_types: ['card'],
      mode: 'payment',
      success_url:  "#{ENV['WEBSITE_URL']}order-confirmation",
      cancel_url:    ENV["WEBSITE_URL"]
      })

      render json: {url: session.url}, status: :see_other
  end

  def order_success
    create_order
    update_cart_items
    render json: @order
  end


  private

  def set_stripe_key 
    Stripe.api_key = ENV['STRIPE_SECRET_KEY']
  end


  def create_order
    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    customer = Stripe::Customer.retrieve(session.customer)
    @current_user.update!(stripe_id: customer.id)
    @order = @current_user.orders.create!(
      date: DateTime.now.strftime('%m/%d/%Y'),
      total: session.amount_total / 100,
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
