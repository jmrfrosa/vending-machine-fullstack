# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Coin.delete_all
Product.delete_all

coin_quantities = {
  1   => 10,
  2   => 5 ,
  5   => 5 ,
  10  => 5 ,
  20  => 5 ,
  50  => 3 ,
  100 => 2 ,
  200 => 1
}

coin_quantities.each do |value, quantity|
  quantity.times do
    Coin.create({ value: value, user_supplied: false })
  end
end

Product.create([
  { name: "Cola"     , stock: 3, price: 90  },
  { name: "Sandwich" , stock: 2, price: 120 },
  { name: "Croissant", stock: 5, price: 100 },
  { name: "Chocolate", stock: 1, price: 70  },
  { name: "Candy"    , stock: 0, price: 60  },
  { name: "Almonds"  , stock: 2, price: 85  },
  { name: "Chips"    , stock: 9, price: 97  },
  { name: "Water"    , stock: 3, price: 45  }
])