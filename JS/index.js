// API 
const API_key = "e0f7a13a90a13a706871b97a0aae7b4e";
const API_url = "https://api.openweathermap.org/data/2.5/weather?q="+cidade+"&appid="+API_key+"&lang=pt_br";


// Variaveis Elementos

const info = document.querySelector('.info');
const btn = document.querySelector('.search-button');

// Elementos Principais

const city = document.querySelector('.city');
const icon = document.querySelector('#icon');
const estado = document.querySelector('.estado');
const graus = document.querySelector('.graus');

// Elementos Temperatura

const temperatura = document.querySelector('.temperatura');
const mint = document.querySelector('.mint');
const maxt = document.querySelector('.maxt');

// Elementos Secundarios

const info2 = document.querySelector('.info2');
const um = document.querySelector('.um');
const vento = document.querySelector('.vento');
const chuva = document.querySelector('.chuva');
const uv = document.querySelector('.uv');


// Eventos


    // Consulta a API do OpenWeather 

btn.addEventListener("click", function(event){
    event.preventDefault();

    const cidade = document.querySelector('#cidade').value;

    console.log(cidade);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q="+cidade+"&appid="+API_key+"&units=metric&lang=pt_br");
    xmlhttp.send();
    xmlhttp.addEventListener("load", function() {
        var json = JSON.parse(xmlhttp.responseText);
        console.log(json);
        if (json.cod === 200){
            mostrarInfo({
                city: json.name,
                pais: json.sys.country,
                temp: json.main.temp,
                humidade: json.main.humidity,
                descricao: json.weather[0].description,
                icone: json.weather[0].icon,
                vento: json.wind.speed,
                max_temp: json.main.temp_max,
                min_temp: json.main.temp_min,
                soln: json.sys.sunrise,
                sols: json.sys.sunset,
                
            })
        }else{
            showAlert('Local não encontrado')
        }
    })

})

// Funçoes

function mostrarInfo(json){

    info.style.display = 'block';
    city.innerText = `${json.city} - ${json.pais}`;
    estado.innerText = `${json.descricao}`;
    graus.innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')}°C`;
    icon.setAttribute('src',`https://openweathermap.org/img/wn/${json.icone}@2x.png`);

    temperatura.style.display = 'block';
    mint.innerText = `  ${json.min_temp.toFixed(1).toString().replace('.',',')}°C`;
    maxt.innerText = `  ${json.max_temp.toFixed(1).toString().replace('.',',')}°C`

    info2.style.display = 'block';
    um.innerText = `Umidade: ${json.humidade} %`;
    uv.innerText = `UV: ${json.soln}`;
    vento.innerText = `Vento: ${json.vento} km/h`;
    chuva.innerText = `${json.sols}`;
}  