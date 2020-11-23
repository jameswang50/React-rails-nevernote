class Api::NotebooksController < ApplicationController
  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def index
    @notebooks = Notebook.where(author_id: current_user.id)
    render :index
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    if @notebook && author?
      @notebook.destroy
      render json: {}
    else
      render json: ["Could not delete notebook."], status: 404
    end
  end

  private
  def notebook_params
    params.require(:notebook).permit(:id, :title, :author_id)
  end

  def author?
    @notebook.author_id == current_user.id
  end
end
