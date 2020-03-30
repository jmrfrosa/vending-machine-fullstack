class CoinsController < ApplicationController
  # GET /coins
  def index
    @coins = Coin.all

    render json: @coins
  end

  # POST /coins
  def create
    @coin = Coin.new(coin_params)
    if @coin.save
      render json: @coin, status: :created, location: @coin
    else
      render json: @coin.errors, status: :unprocessable_entity
    end
  end

  # DELETE /coins/:value
  def destroy
    coin = Coin.find_by(value: params[:value])
    
    if coin.present? && coin.destroy
      render json: {}, status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  private
    # Only allow a trusted parameter "white list" through.
    def coin_params
      params.require(:coin).permit(:value, :user_supplied)
    end
end
