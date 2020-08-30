// var pushArray = [];
// function cut(){
// var newDate = new Date();
// pushArray.push(newDate);
// }

// function cekDataSemua(){
//     console.log(pushArray);  
// }
// getData()
// async function getData(){
//     const response = await fetch("api-01/test.csv")
//     const data = await response.text()
//     console.log(data);
    
// }
// const abc = ["tiko","priantiko","nur","adi","pratama"]
// console.log(abc[0].split(""));

// setChart()

getChart()
    // var data = await getData()
async function getChart(){
    const data = await getData()
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'line', 
    data: {
        labels: data.xs,
        datasets: [{
            fill: false,
            label: 'Global',
            data: data.xyG,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            fill: false,
            label: 'North Hemisphere',
            data: data.xyN,
            backgroundColor: 'rgba(51, 51, 255, 0.2)',
            borderColor: 'rgba(51, 51, 255, 1)',
            borderWidth: 1
        },
        {
            fill: false,
            label: 'South Hemisphere',
            data: data.xyS,
            backgroundColor: 'rgba(0, 157, 71, 0.2)',
            borderColor: 'rgba(0, 157, 71, 1)',
            borderWidth: 1
        },

    ]
      
    },

})};


async function getData() {
    const xs = []
    const xyG = []
    const xyN = []
    const xyS = []
    const res = await fetch('ZonAnn.Ts+dSST.csv')
    const data = await res.text();

    const row = data.split("\n").splice(1)
    row.forEach(elt =>{
       const row = elt.split(",")
       const year = row[0]
       const tempG =  row[1]
       const tempN = row[2]
       const tempS = row[3]
       xs.push(year);
       xyG.push(parseFloat(tempG) + 14);
       xyN.push(parseFloat(tempN) + 14);
       xyS.push(parseFloat(tempS) + 14);

    //    console.log(year,temp);  
    }  
    );
    // console.log(xs)
    return {xs, xyG,xyN,xyS}
}




async function getISS(){
    const xyZ = []
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
     const data = await res.json();
    //console.log(data);
    const {latitude, longitude} = data;
    document.getElementById("lat").innerText = data.latitude
    document.getElementById("long").innerText = data.longitude
    // marker.setLatLng(latitude,longitude)
    // map.setView([latitude,longitude],5)
    const abc = data.longitude
    const bca = data.latitude
    return {abc, bca}
   
}

// getISS()
//var abc = console.log(data);
async function abc(){
    const data  = await getISS()
    var map = L.map('mapid').setView([51.505, -0.09], 1);
const marker1 = L.marker([0,0]).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var myIcon = L.icon({
    iconUrl: 'Orbital_Station-512.webp',
    iconSize: [30, 30],
    iconAnchor: [30, 30],
});
var marker = L.marker([data.bca,data.abc]).addTo(map);
console.log('test',data.abc ,data.bca)
}

abc()