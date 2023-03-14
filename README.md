# ibm-datapower-mpg-invoke-rest

## InvokeREST_MPG Configuration
![mpg-config](/images/ibm-datapower-mpg-invoke-config1.png)
![mpg-config](/images/ibm-datapower-mpg-invoke-config2.png)

## InvokeREST_MPG Policy
![mpg-policy](/images/ibm-datapower-mpg-invoke-policy.png)

## InvokeREST_MPG Policy Match Rule
![mpg-policy](/images/ibm-datapower-mpg-invoke-policy.png)

## InvokeREST_MPG Policy Set Variable: service/mpgw/skip-backside
- Variable Name: service/mpgw/skip-backside
- Variable Assignment: 1

![mpg-policy](/images/ibm-datapower-mpg-invoke-policy-setvariable-skip.png)

## InvokeREST_MPG Policy Set Variable: service/routing-url
- Variable Name: service/routing-url
- Variable Assignment: http://httpbin.org/response-headers?freeform=peru

![mpg-policy](/images/ibm-datapower-mpg-invoke-policy-setvariable-routing-url.png)

## InvokeREST_MPG Policy GatewayScript

![mpg-policy](/images/ibm-datapower-mpg-invoke-policy.png)

```
var hm = require ('header-metadata');
var urlopen = require ('urlopen');
var sm = require ('service-metadata');

var url_target = sm.getVar('var://service/routing-url');

const options = {
    target : url_target,
    method : 'get',
	contentType : 'application/json',
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
```

## InvokeREST_MPG Policy Postman

![mpg-policy](/images/ibm-datapower-mpg-invoke-postman.png)