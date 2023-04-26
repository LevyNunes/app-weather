// Selecionando os elementos HTML que serão manipulados
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Adicionando um evento de clique no botão de busca
search.addEventListener('click', () => {
    // Definindo a chave da API e a cidade que será pesquisada
    const APIKey = '5ad2e724762a5429501dd4e9bd588bb0';
    const city = document.querySelector('.search-box input').value;

    // Se a cidade for vazia, não faz nada
    if(city === '')
         return;

    // Faz uma requisição para a API de clima e retorna a resposta em JSON
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            // Se a resposta indicar um erro 404, exibe a mensagem de erro e esconde as outras informações
            if(json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            // Caso contrário, esconde a mensagem de erro
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Seleciona os elementos HTML que serão atualizados com as informações do clima
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature')
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span')

            // Altera a imagem do clima com base nas informações da resposta da API
            switch (json.weather[0].main){
                case 'Clear':
                    image.src = './images/clear.png';
                    break;

                case 'Rain':
                    image.src = './images/rain.png';
                    break;

                case 'Snow':
                    image.src = './images/snow.png';
                    break;

                case 'Clouds':
                    image.src = './images/cloud.png';
                    break;

                case 'Haze':
                    image.src = './images/haze.png';
                    break;

                default:
                    image.src = '';
            }

            // Atualiza os elementos HTML com as informações de temperatura, descrição, umidade e velocidade do vento
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
            
            switch (json.weather[0].description){
                case 'sky clear':
                    description.innerHTML = 'Céu Claro';
                    break;

                case 'overcast clouds':
                    description.innerHTML = 'Nuvens Nubladas';
                    break;

                case 'broken clouds':
                    description.innerHTML = 'Nuvens Pesadas';
                    break;

                case 'few clouds':
                    description.innerHTML = 'Nuvens Leves';
                    break;
    
                case 'light rain':
                    description.innerHTML = 'Chuva Leve';
                    break;
    
                case 'moderate rain':
                    description.innerHTML = 'Chuva Moderada';
                    break;
    
                case 'heavy rain':
                    description.innerHTML = 'Chuva Pesada';
                    break;
    
                case 'light snow':
                    description.innerHTML = 'Neve Leve';
                    break;

                case 'moderate snow':
                    description.innerHTML = 'Neve Leve';
                    break;

                case 'heavy snow':
                    description.innerHTML = 'Neve Leve';
                    break;     

                default:
                    description.innerHTML = '';
            }

            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Exibe as informações de clima e adiciona classes de animação para suavizar a transição
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });

});
