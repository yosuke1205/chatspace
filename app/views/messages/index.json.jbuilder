json.array! @new_messages do |new_message|
  json.content new_message.content
  json.name new_message.user.name
  json.created_at new_message.created_at.to_s(:default)
  json.image new_message.image.url
  json.id new_message.id
end
