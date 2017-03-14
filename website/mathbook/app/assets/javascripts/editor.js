var ready = function(){
  var Font = Quill.import("formats/font")
  Font.whitelist = ['serif'];
  Quill.register(Font, true)

  var editor = new Quill("#editor-container", {
    'modules': {toolbar: '#toolbar-container'},
    'theme': 'snow',
  });
}

$(document).ready(ready)
