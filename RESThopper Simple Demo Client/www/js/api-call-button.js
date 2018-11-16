function gh_api_request(){
  var url_input_id ='api_url_input'

  var inputvalues = ['twistVal',
                    'heightVal',
                    'radiusXVal',
                    'radiusYVal'];
  var ghx_input_id = 'upload_files';

  var url = document.getElementById(url_input_id).value;

  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'text';
  request.onload = function() {
    let this_responce = request.response;
    console.log(this_responce);
  };
  request.send();
}
