class UsersController < ApplicationController

  def create 
    user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
  end

  def show
    render json: @current_user, status: :created
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user, status: :accepted
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end

end
