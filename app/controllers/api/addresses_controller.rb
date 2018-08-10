class Api::AddressesController < ApiController
  def validate
    address = Address.new(address_params)
    address.valid?

    if address.valid?
      render json: address.tap {|a| a.default = true }
    else
      render json: {errors: address.errors}
    end
  end

  private

  def set_address
    @address = Address.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def address_params
    params.require(:address).permit(:email, :address1, :address2, :city, :state, :zip, :default, :first_name, :last_name, :company)
  end
end
