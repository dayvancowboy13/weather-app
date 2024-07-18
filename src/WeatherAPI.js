const WeatherAPI = {
    'queryURL': 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
    'city': 'victoria',
    'key': 'P8RGM9Y4ZKCJG7GNNZ8C47U59',

    async sendRequest(location) {

        if (location !== undefined) {

            this.city = location;

        }
        const response = await fetch(`${this.queryURL}${this.city}?key=${this.key}`,
            { 'mode': 'cors' });
        return response.json();

    }
};

export default WeatherAPI;