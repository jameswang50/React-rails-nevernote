class Api::NotesController < ApplicationController
  def create
    @note = Note.new(note_params)
    if @note.save
      render :show, include: [:tags]
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def index
    @notes = Note.includes(:tags).where(author_id: current_user.id)
    render :index
  end

  def show
    @note = Note.find(params[:id])
    if @note && author?
      render :show, include: [:tags]
    elsif author?
      render json: ["This note doesn't exist."], status: 404
    else
      render json: ["Action not allowed."], status: 422
    end
  end

  def update
    @note = Note.find(params[:id])
    @note.tag_ids = note_params[:tag_ids] || []
    if author? && @note.update_attributes(note_params)
      render :show, include: [:tags]
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    if @note && author?
      @note.destroy
      render json: {}
    else
      render json: ["Could not delete note."], status: 404
    end
  end

  private
  def note_params
    params.require(:note).permit(:id, :title, :body, :author_id, :notebook_id, tag_ids: [])
  end

  def author?
    @note.author_id == current_user.id
  end
end
