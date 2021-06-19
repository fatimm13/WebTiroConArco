google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Puesto', 'Veces'],
        ['Primer puesto', 5],
        ['Segundo puesto', 10],
        ['Tercer puesto', 15],
        ['Fuera de podio', 26]
    ]);

    var data2 = google.visualization.arrayToDataTable([
        ['Puntos', 'Porcentaje'],
        ['10 puntos', 25],
        ['9 puntos', 30],
        ['Fuera de amarillo', 40],
        ['Fallo', 5]
    ]);

    var options = {
        title: 'Estadísticas de puesto',
        pieSliceText: 'value',
        pieSliceTextStyle: {fontSize: 25},

        slices: {
            0: { color: '#f0bf00' },
            1: { color: '#c41800' },
            2: { color: '#0092e7'},
            3: { color: '#464645'}},
            
        titleTextStyle:{
            color: 'black', 
            fontSize: 20
        },
        legend:{
            position: 'labeled',
            textStyle: {fontSize: 18}
        }
    };

    var options2 = {
        title: 'Estadísticas de flecha',
        pieSliceText: 'none',
        slices: {
            0: { color: '#f0bf00' },
            1: { color: '#c41800' },
            2: { color: '#0092e7'},
            3: { color: '#464645'}
        },

        titleTextStyle:{
            color: 'black', 
            fontSize: 20
        },

        legend:{
            position: 'labeled',
            textStyle: {fontSize: 18}
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));

    chart.draw(data, options);
    chart2.draw(data2, options2);
}