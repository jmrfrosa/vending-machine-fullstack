Rails.application.routes.draw do
  resources :coins, except: [:update, :show] do
    delete '/:value', to: 'coins#destroy', on: :collection
  end

  resources :products, except: [:update, :show] do
    patch 'buy', on: :member
  end
end
