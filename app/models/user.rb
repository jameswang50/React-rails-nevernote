# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  attr_reader :password

	validates :username, presence: true, uniqueness: true
	validates :session_token, presence: true
	validates :password_digest, presence: true
	validates :password, length: { minimum: 6, allow_nil: true }

	before_validation :ensure_session_token

  has_many :notes,
    foreign_key: :author_id
    
  has_many :notebooks

  has_many :tags,
    through: :notes,
    source: :tags

	def self.find_by_credentials(username, pw)
		user = User.find_by_username(username)
		return user if user && user.is_password?(pw)
		nil
	end

	def self.generate_session_token
		SecureRandom.urlsafe_base64
	end

	def ensure_session_token
		self.session_token ||= User.generate_session_token
	end

	def reset_session_token!
		self.session_token = User.generate_session_token
		self.save!
		self.session_token
	end

  def password=(pw)
		@password = pw
		self.password_digest = BCrypt::Password.create(pw)
	end

	def is_password?(pw)
		BCrypt::Password.new(self.password_digest).is_password?(pw)
	end
end
