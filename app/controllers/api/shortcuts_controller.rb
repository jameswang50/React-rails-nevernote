class Api::ShortcutsController < ApplicationController
  def create
    @shortcut = Shortcut.new(shortcut_params)
    if @shortcut.save
      render :show
    else
      render json: @shortcut.errors.full_messages, status: 422
    end
  end

  def index
    @shortcuts = Shortcut.where(author_id: current_user.id)
    render :index
  end

  def destroy
    @shortcut = Shortcut.find(params[:id])
    if @shortcut
      @shortcut.destroy
      render json: {}
    else
      render json: ["Could not delete shortcut."], status: 404
    end
  end

  private
  def shortcut_params
    params.require(:shortcut).permit(:id, :name, :route, :author_id)
  end
end
