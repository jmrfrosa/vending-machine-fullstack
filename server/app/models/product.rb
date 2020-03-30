class Product < ApplicationRecord

  validates :price, presence: true, numericality: { only_integer: true }
  validates :stock, presence: true, numericality: { only_integer: true }

end
