# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

require 'rails_helper'

RSpec.describe 'Chronciles', type: :request do
  def authenticated_header(user)
    { 'Authorization' => "Bearer #{user.token}" }
  end

  let(:chronicle) { create(:chronicle) }

  context 'when logged in as ST' do
    describe 'renaming a chronicle' do
      it 'works' do
        patch "/api/v1/chronicles/#{chronicle.id}",
              headers: authenticated_header(chronicle.st),
              params:  { chronicle: { name: 'Mystic Quest' } }

        expect(response.status).to eq 200
        expect(JSON.parse(response.body)['name']).to eq 'Mystic Quest'
        chronicle.reload
        expect(chronicle.name).to eq 'Mystic Quest'
      end
    end

    describe 'deleting a chronicle' do
      it 'works' do
        character = create(:character, chronicle_id: chronicle.id)
        qc = create(:qc, chronicle_id: chronicle.id)
        battlegroup = create(:battlegroup, chronicle_id: chronicle.id)
        delete "/api/v1/chronicles/#{chronicle.id}",
               headers: authenticated_header(chronicle.st)

        expect(response.status).to eq 200
        character.reload
        expect(character.chronicle_id).to eq nil
        qc.reload
        expect(qc.chronicle_id).to eq nil
        battlegroup.reload
        expect(battlegroup.chronicle_id).to eq nil
      end
    end
  end

  context 'when logged in as a player in the Chronicle' do
    let(:not_the_st) { create(:player, chronicles: [chronicle]) }

    %i[character qc battlegroup].each do |char|
      describe "adding a #{char} to a chronicle" do
        let(:character) { create(char, player: not_the_st) }

        it 'works' do
          post "/api/v1/chronicles/#{chronicle.id}/add_#{char}/#{character.id}",
               headers: authenticated_header(not_the_st)

          expect(response.status).to eq 200
          chronicle.reload
          expect(chronicle.send("#{char}s")).to include character
        end
      end

      describe "remove a #{char} from a chronicle" do
        let(:character) { create(char, player: not_the_st) }

        it 'works' do
          post "/api/v1/chronicles/#{chronicle.id}/remove_#{char}/#{character.id}",
               headers: authenticated_header(not_the_st),
               params:  { char.to_s => { chronicle_id: nil } }

          expect(response.status).to eq 200
          chronicle.reload
          expect(chronicle.send("#{char}s")).not_to include character
        end
      end
    end
  end

  context 'when not logged in' do
    describe 'creating a record' do
      it 'returns an auth failure' do
        post '/api/v1/chronicles/'
        expect(response.status).to eq 401
      end
    end

    describe 'showing a record' do
      it 'returns an auth failure' do
        get "/api/v1/chronicles/#{chronicle.id}"
        expect(response.status).to eq 401
      end
    end

    describe 'updating a record' do
      it 'returns an auth failure' do
        patch "/api/v1/chronicles/#{chronicle.id}"
        expect(response.status).to eq 401
      end
    end

    describe 'destroying a record' do
      it 'returns an auth failure' do
        delete "/api/v1/chronicles/#{chronicle.id}"
        expect(response.status).to eq 401
      end
    end
  end
end

# rubocop:enable Metrics/BlockLength
