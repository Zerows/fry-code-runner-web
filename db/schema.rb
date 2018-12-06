# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181206083347) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "results", force: :cascade do |t|
    t.string "output"
    t.string "error"
    t.bigint "submission_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["submission_id"], name: "index_results_on_submission_id"
  end

  create_table "submission", id: :serial, force: :cascade do |t|
    t.jsonb "output", null: false
    t.text "language", null: false
    t.text "filename", null: false
    t.text "content", null: false
  end

  create_table "submissions", force: :cascade do |t|
    t.text "content"
    t.string "language"
    t.string "filename"
    t.json "output"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "results", "submissions"
end
