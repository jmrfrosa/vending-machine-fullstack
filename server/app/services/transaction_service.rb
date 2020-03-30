class TransactionService

  def initialize(product, user_balance)
    @product = product
    @balance = user_balance
  end

  def process
    remaining_amount = @balance - @product.price
    
    if remaining_amount < 0
      return false
    end

    handle_returns(remaining_amount)
  end

  private

  def handle_returns(total_amount)
    remaining_amount = total_amount
    used_coins       = []

    # Sorted coins to ensure we always start from the highest
    sorted_coins    = Coin.order(value: :desc)
    remaining_coins = sorted_coins.to_a

    sorted_coins.each do |coin, idx|
      value = coin.value

      if ((remaining_amount/value).floor >= 1 && value <= remaining_amount)
        # This coin has enough value to be used
        used_coins << coin
        remaining_coins  -= used_coins
        remaining_amount -= value
      end

      if (remaining_amount == 0)
        return used_coins
      end
      
      if (remaining_coins.size == 0)
        return false
      end

      # keep iterating
    end

    return false
  end

end