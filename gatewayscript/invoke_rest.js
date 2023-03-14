var hm 			= require ('header-metadata');
var urlopen 	= require ('urlopen');
var sm 			= require ('service-metadata');

var url_target = sm.getVar('var://service/routing-url');

const options = {
    target          : url_target,
    method          : 'get',
	contentType     : 'application/json',
};

// open connection to target and send data over
urlopen.open (options, function (error, response) {
    if (error) {
        // an error occurred during request sending or response header parsing
        session.output.write ("urlopen connect error: " + JSON.stringify(error));
    } else {
        // read response data
        // get the response status code
        var responseStatusCode = response.statusCode;
        if (responseStatusCode == 200) {
            response.readAsBuffer(function(error, responseData) {
                if (error) {
                    // error while reading response or transferring data to Buffer
                    session.output.write("readAsBuffer error: " + JSON.stringify(error));
                } else {
					
					var data_response = JSON.parse(responseData.toString());

					data_response.micampo = 'desde lima ' + data_response.freeform;
					
					session.output.write(data_response);
                } 
            });
        } else {
            session.output.write ("urlopen target return statusCode " + responseStatusCode);
        }
    }
}); // end of urlopen.open()

hm.response.set ('Content-Type', 'application/json');