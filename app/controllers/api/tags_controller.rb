class Api::TagsController < ApplicationController
  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      render :show
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def index
    @tags = Tag.where(author_id: current_user.id)
    render :index
  end

  def destroy
    @tag = Tag.find(params[:id])
    if @tag
      @tag.destroy
      render json: {}
    else
      render json: ["Could not delete tag."], status: 404
    end
  end

  private
  def tag_params
    params.require(:tag).permit(:id, :name, :author_id)
  end
end
