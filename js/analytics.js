$('.loaderData').addClass('spinner-border text-dark');
init()

function init(){
    var url="https://api.covid19api.com/summary"
    var newConfirmed='';
    var totalConfirmed='';
    var newDeaths='';
    var countrylist='';

    $.get(url,function(data){
        newConfirmed=`
        <br>
        <h2 class="text-center"> ${data.Global.NewConfirmed} </h2>
        `
        totalConfirmed=`
        <br>
        <h2 class="text-center"> ${data.Global.TotalConfirmed} </h2>
        `

        newDeaths=`
        <br>
        <h2 class="text-center"> ${data.Global.TotalDeaths} </h2>
        `
        data.Countries.forEach(element => {
            console.log(element.Slug)
            var option = document.createElement("option")
            option.value=element.Slug
            option.text = element.Country
            document.getElementById('names').add(option)
        });

        $("#newConfirmed").html(newConfirmed)
        $("#totalConfirmed").html(totalConfirmed)
        $("#newDeaths").html(newDeaths)
        $('.loaderData').removeClass('spinner-border text-dark')
        
    })
}

var form = document.getElementById('formDatos')
form.addEventListener('submit', function (e) {
  e.preventDefault()
    clearDataByCountry()
  $('.loader').addClass('spinner-border');
  var pais = document.getElementById('names').value
  var url = "https://api.covid19api.com/live/country/" + pais
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      var length = res.length
      var index = length - 1
      var byCountryCases = document.getElementById('byCountryCases')
      var byCountryDeaths = document.getElementById('byCountryDeaths')
      var byCountryRecovered = document.getElementById('byCountryRecovered')

      byCountryCases.innerHTML = '';
      byCountryDeaths.innerHTML = '';
      byCountryRecovered.innerHTML = '';

      byCountryCases.append(res[index].Confirmed)
      byCountryDeaths.append(res[index].Deaths)
      byCountryRecovered.append(res[index].Recovered)
      $('.loader').removeClass('spinner-border')
    })
})

function clearData(){
    $("#newConfirmed").empty()
    $("#totalConfirmed").empty()
    $("#newDeaths").empty()
    init()
}

function clearDataByCountry(){
    $("#byCountryCases").empty()
    $("#byCountryDeaths").empty()
    $("#byCountryRecovered").empty()
}


$('#refresh').click(function(){
    $('.loaderData').addClass('spinner-border text-dark');
    clearData()
});
