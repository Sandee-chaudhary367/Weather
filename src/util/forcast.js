const postmanRequest=require("postman-request");

let Forecast=(latitude,longitude,callback)=>{

    const URL=`http://api.weatherstack.com/current?access_key=bc857b88c410a05df0408187f789196a&query=${latitude},${longitude}&units=m`;

    postmanRequest({url:URL,json:true},(error,response)=>{
        if(error){
            callback("Unable to reach site",undefined);
        }else if(response.body.error){
            callback("Unable to locate your location's Weather",undefined);
        }else{
            const data={WeatherDescriptions:response.body.current.weather_descriptions,
                temperature:response.body.current.temperature,
                feels:response.body.current.feelslike
            }
             callback(undefined,data);
        }
    });

}

module.exports=Forecast;