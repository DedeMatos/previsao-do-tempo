document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value;

    if (!cityName) {
        return showAlert('Você precisa digitar uma cidade...');
    }

    const apiKey = 'cc0ff9578aceb2d9b2af9fdbcf321d36';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
            });
        } else {
            showAlert('Não foi possível localizar...');
        }
    } catch (error) {
        showAlert('Erro ao buscar dados.');
    }
});

function showInfo(json) {
    showAlert('');
    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp-desc').innerHTML = `${json.description}`;

    changeImageWithTransition(json.temp);
}

function changeImageWithTransition(temp) {
    const imgElement = document.querySelector('#img img');
    imgElement.classList.add('fade-out');

    
    setTimeout(() => {
        if (temp > 25) {
            imgElement.setAttribute('src', '/src/img/sun.png');
        } else if (temp >= 19 && temp <= 25) {
            imgElement.setAttribute('src', '/src/img/sun-rain.png');
        } else {
            imgElement.setAttribute('src', '/src/img/rain.png');
        }

        imgElement.classList.remove('fade-out');
    }, 250);
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
