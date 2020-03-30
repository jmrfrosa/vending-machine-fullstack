class Coin < ApplicationRecord

  validates :value, presence: true, numericality: { only_integer: true }

  scope :user_supplied, ->{ where(user_supplied: true) }

end
