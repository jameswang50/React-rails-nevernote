@shortcuts.each do |shortcut|
  json.set! shortcut.id do
    json.partial! "api/shortcuts/shortcut", shortcut: shortcut
  end
end
