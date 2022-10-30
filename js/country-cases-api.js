
let countries = null
$(document).ready(function(){
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://covid-19-statistics.p.rapidapi.com/reports",
        // "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=SLV",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "ecb7dc68b5mshfa76db4189ec0fap151d4fjsn00cfee03fc28",
            "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        
        let bandera = 1;
        countries = response.data.filter(country => {
        

        if(bandera)
            return country

        if(country.region.iso == 'SLV')
            bandera = 0
        });
    });
})

