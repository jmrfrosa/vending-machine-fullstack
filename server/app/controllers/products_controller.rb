class ProductsController < ApplicationController
  before_action :set_product, only: [:buy, :destroy]

  # GET /products
  def index
    @products = Product.all

    render json: @products
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    if @product.destroy
      render json: {}, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def buy
    user_balance = Coin.user_supplied.sum(&:value)
    if @product.stock > 0
      returns = TransactionService.new(@product, user_balance).process

      if returns
        # Update product stock
        @product.update({ stock: @product.stock - 1 })

        # Reset user balance
        Coin.user_supplied.update_all(user_supplied: false)

        # Delete returned coins
        Coin.where(id: returns.pluck(:id)).delete_all
      end

      render json: { returns: returns }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :price, :stock)
    end
end
