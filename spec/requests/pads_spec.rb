require 'rails_helper'

RSpec.describe 'Pads API', type: :request do
  # initialize test data
  let(:user) { create(:user) }
  let!(:pads) { create_list(:pad, 10, user_id: user.id) }
  let(:pad_id) { pads.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /pads
  describe 'GET /api/pads' do
    # make HTTP get request before each example
    before { get '/api/pads' }

    it 'returns pads' do
      # Note `json` is a custom helper to parse JSON responses
      expect(JSON.parse(response.body)).not_to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/pads/:pad_id' do
    # make HTTP get request before each example
    before { get "/api/pads/#{pad_id}" }

    it 'returns pad content' do
      # Note `json` is a custom helper to parse JSON responses
      expect(JSON.parse(response.body)).not_to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end