// Get all the data from the API
$(document).ready(function(){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-treatment",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "ecb7dc68b5mshfa76db4189ec0fap151d4fjsn00cfee03fc28",
            "X-RapidAPI-Host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
        }
    };
    

    let isLoading = true
     
    if(isLoading == true){
        $("#table-body").append(`
        <tr>
            <td colspan="5">
                <div class="d-flex justify-content-center">
                    <i class="fa-3x fas fa-spinner fa-pulse"></i>
                </div>
            <td>
        </tr>`)
    }

    $.ajax(settings).done(function (response) {
        console.log(response)
        let data = response

        $('#table-body').empty()
        data.forEach(e => {
            let date =  new Date(e.lastUpdated)
            $("#table-body").append(
                `<tr>
                    <td>${e.developerResearcher}</td>
                    <td>${e.category}</td>
                    <td>${e.phase}</td>
                    <td>${e.nextSteps}</td>
                    <td>${date.toLocaleString()}</td>
                </tr>`
            )
        })    
        

        isLoading = false
    })

    

// Custom code to show the data in the html
})
