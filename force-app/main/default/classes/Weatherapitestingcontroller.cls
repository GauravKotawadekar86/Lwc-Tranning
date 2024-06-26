public class Weatherapitestingcontroller {

    @AuraEnabled
    Public static Weatherwrapper getweatherapidetails(String CityName)
    {
        String Apikey='cdee806c0f4d468ba85102952241806';
        String Endpoint='http://api.weatherapi.com/v1/current.json?key='+Apikey+'&q='+CityName.replace(' ', '%20');
        system.debug('Endpoint'+Endpoint);

        Http ht= new http();
        HttpRequest rq = new HttpRequest();
        rq.setEndpoint(Endpoint);
        rq.setMethod('GET');
        HttpResponse rs= ht.send(rq);
        System.debug('rs.getBody()::::: '+JSON.serialize(rs.getBody()));
        System.debug('rs.getStatusCode()::: '+JSON.serialize(rs.getStatusCode()));
        Weatherwrapper wrapp = new Weatherwrapper();
        if(rs.getStatusCode() == 200)
        {
            Map<String,object> result = (Map<String,object>) JSON.deserializeUntyped(rs.getBody());
            Map<String,object> resultOutput = (Map<String,object>) result.get('location');
            wrapp.cityname = String.valueOf(resultOutput.get('name'));
            wrapp.region = String.valueOf(resultOutput.get('region'));
            wrapp.country = String.valueOf(resultOutput.get('country'));
            wrapp.latitude = String.valueOf(resultOutput.get('lat'));
            wrapp.longitude = String.valueOf(resultOutput.get('lon'));
            wrapp.localtime = ''+resultOutput.get('localtime');
            wrapp.timezone = String.valueOf(resultOutput.get('tz_id'));
            resultOutput = (Map<String,object>) result.get('current');
            Map<String, Object> conditionFields = (Map<String, Object>) resultOutput.get('condition');
            wrapp.icon =  String.valueOf(conditionFields.get('icon'));
            wrapp.iconstatus= String.valueOf(conditionFields.get('text'));
            wrapp.last_updated_date = ''+resultOutput.get('last_updated') ;
            wrapp.tempratur_c = String.valueOf(resultOutput.get('temp_c')) +' °C';
            wrapp.tempratur_f = String.valueOf(resultOutput.get('temp_f')) +' °F';
            wrapp.wind_mph = String.valueOf(resultOutput.get('wind_mph')) +' mi/h';
            wrapp.wind_kph = String.valueOf(resultOutput.get('wind_kph')) +' km/h';
            wrapp.wind_degree = String.valueOf(resultOutput.get('wind_degree')) +'°';
            wrapp.humidity = String.valueOf(resultOutput.get('humidity')) +' 🌦️';           
            wrapp.error = '';
         }
        else if(rs.getStatusCode() != 200 )
        {
            Map<String,object> resultError = (Map<String,object>) JSON.deserializeUntyped(rs.getBody());
            Map<String,object> resultErrorOutput = (Map<String,object>) resultError.get('error');
            wrapp.error = String.valueOf(resultErrorOutput.get('message'));
        }
        return wrapp;
    }
    public class Weatherwrapper
    {
    @AuraEnabled
    public String cityname {get;set;}
    @AuraEnabled
    public String region {get;set;}
    @AuraEnabled
    public String country {get;set;}
    @AuraEnabled
    public String latitude {get;set;}
    @AuraEnabled
    public String longitude {get;set;}
    @AuraEnabled
    public String timezone {get;set;}
    @AuraEnabled
    public String localtime {get;set;}
    @AuraEnabled
    public String error {get;set;}
    @AuraEnabled
    public String last_updated_date {get;set;}
    @AuraEnabled
    public String tempratur_c {get;set;}
    @AuraEnabled
    public String tempratur_f {get;set;}
    @AuraEnabled
    public String wind_mph {get;set;}
    @AuraEnabled
    public String wind_kph {get;set;}
    @AuraEnabled
    public String wind_degree {get;set;}
    @AuraEnabled
    public String icon {get;set;}
    @AuraEnabled
    public String iconstatus {get;set;}
    @AuraEnabled
    public String humidity {get;set;}
    }
    

}