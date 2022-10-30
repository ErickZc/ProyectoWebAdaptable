//constantes para el filtro que se realiza en el llenado de colores en el mapa
FILTRO1 = 100000
FILTRO2 = 5000000

//colores
LIGHT = "rgb(255,80,80)"
MEDIUM = "rgb(240,30,30)"
STRONG = "rgb(175,0,0)"

const numberFormat = new Intl.NumberFormat('en-US')

//almacenamiento para evitar saturar la aplicacion con demasiadas peticiones a la api
var pruebas = [];

//creacion de objetos DOM para la informacion del modal de cada pais de forma dinamica
const COUNTRY = document.createElement("label");
const DESCRIPTION = document.createElement("label");
const DESCRIPTION2 = document.createElement("label");
const DESCRIPTION3 = document.createElement("label");
const DESCRIPTION4 = document.createElement("label");
const DESCRIPTION5 = document.createElement("label");
const DESCRIPTION6 = document.createElement("label");
const DESCRIPTION7 = document.createElement("label");
const DESCRIPTION8 = document.createElement("label");
const DESCRIPTION9 = document.createElement("label");
const DESCRIPTION10 = document.createElement("label");
const IMAGE = document.createElement("img");

class CountryCollection {
    constructor(items) {
        this.items = items
    }

    static get() {
        return new CountryCollection(document.querySelectorAll("path"));
    }

    for(funcion) {
        this.items.forEach(countryPath => {
            funcion(new CountryPath(countryPath))
        });
    }
}

class CountryPath {
    constructor(element) {
        this.element = element;
    }

    fill(color) {
        this.element.setAttribute("fill", color);
    }
}

class Response {
    constructor(objeto) {
        this.objeto = objeto;
    }
}

class CountryApi {
    static async FindByName() {
        const response = await $.ajax({
            "url": "https://api.apify.com/v2/key-value-stores/SmuuI0oebnTWjRTUh/records/LATEST?disableRedirect=true",
            "method": "GET",
            "timeout": 0,
        }).done(function (response) {
            var listadoPath = new CountryPath(CountryCollection.get().items)

            pruebas = response.regionData;

            response.regionData.forEach(element => {

                for (let i = 0; i < listadoPath.element.length; i++) {
                    if (element.country != "Total:" && element.country != "") {
                        if (element.country == listadoPath.element[i].attributes["title"].value) {
                            if (element.totalCases <= FILTRO1) {
                                new CountryPath(listadoPath.element[i]).fill(LIGHT);
                            } else if (element.totalCases > FILTRO1 && element.totalCases <= FILTRO2) {
                                new CountryPath(listadoPath.element[i]).fill(MEDIUM);
                            } else
                                new CountryPath(listadoPath.element[i]).fill(STRONG);
                        }
                    }
                }
            });
        })

        return new Response((await response));
    }
}

//creacion del modal que mostrar la informacion del mapa la que se le a colocado el mouse
function Mensaje(string) {

    var selected = new CountryPath(string)

    for (let i = 0; i < pruebas.length; i++) {
        if (selected.element.attributes["title"].value == pruebas[i].country) {
            var id = selected.element.attributes["id"].value.toLowerCase()
            var name = pruebas[i].country
            var size = 80

            COUNTRY.setAttribute("for", 'label')
            COUNTRY.innerHTML = "<h2>" + pruebas[i].country + "</h2>"
            document.getElementById("titulo").appendChild(COUNTRY)

            IMAGE.setAttribute("src", `https://flagcdn.com/h${size}/${id}.png`)
            IMAGE.setAttribute("srcset", `https://flagcdn.com/h${size * 2}/${id}.png 2x, https://flagcdn.com/h${size * 3}/${id}.png 3x`)
            IMAGE.setAttribute("alt", name)
            IMAGE.setAttribute("height", `${size}`)
            IMAGE.setAttribute("style", "border: 1px solid;")
            document.getElementById("bandera").appendChild(IMAGE)

            DESCRIPTION.setAttribute("for", 'label')
            DESCRIPTION.innerHTML = "<span> " + numberFormat.format(pruebas[i].totalCases) + "</span>"
            document.getElementById("campo1").appendChild(DESCRIPTION)

            DESCRIPTION2.setAttribute("for", 'label')
            DESCRIPTION2.innerHTML = "<span> " + numberFormat.format(pruebas[i].newCases) + "</span>"
            document.getElementById("campo2").appendChild(DESCRIPTION2)

            DESCRIPTION3.setAttribute("for", 'label')
            DESCRIPTION3.innerHTML = "<span> " + numberFormat.format(pruebas[i].totalDeaths) + "</span>"
            document.getElementById("campo3").appendChild(DESCRIPTION3)

            DESCRIPTION4.setAttribute("for", 'label')
            DESCRIPTION4.innerHTML = "<span> " + numberFormat.format(pruebas[i].newDeaths) + "</span>"
            document.getElementById("campo4").appendChild(DESCRIPTION4)

            DESCRIPTION5.setAttribute("for", 'label')
            DESCRIPTION5.innerHTML = "<span> " + numberFormat.format(pruebas[i].totalRecovered) + "</span>"
            document.getElementById("campo5").appendChild(DESCRIPTION5)

            DESCRIPTION6.setAttribute("for", 'label')
            DESCRIPTION6.innerHTML = "<span> " + numberFormat.format(pruebas[i].newRecovered) + "</span>"
            document.getElementById("campo6").appendChild(DESCRIPTION6)

            DESCRIPTION7.setAttribute("for", 'label')
            DESCRIPTION7.innerHTML = "<span> " + numberFormat.format(pruebas[i].activeCases) + "</span>"
            document.getElementById("campo7").appendChild(DESCRIPTION7)

            DESCRIPTION8.setAttribute("for", 'label')
            DESCRIPTION8.innerHTML = "<span> " + numberFormat.format(pruebas[i].seriousCritical) + "</span>"
            document.getElementById("campo8").appendChild(DESCRIPTION8)

            DESCRIPTION9.setAttribute("for", 'label')
            DESCRIPTION9.innerHTML = "<span> " + numberFormat.format(pruebas[i].totalTests) + "</span>"
            document.getElementById("campo9").appendChild(DESCRIPTION9)

            DESCRIPTION10.setAttribute("for", 'label')
            DESCRIPTION10.innerHTML = "<span> " + numberFormat.format(pruebas[i].population) + "</span>"
            document.getElementById("campo10").appendChild(DESCRIPTION10)

            // muestra el modal
            $('#modalInformation').modal('show')
        }
    }
}

//cierra el modal
function closeModal() {
    $('#modalInformation').modal('hide')
}


//llenado del mapa al iniciar la pagina
CountryApi.FindByName()