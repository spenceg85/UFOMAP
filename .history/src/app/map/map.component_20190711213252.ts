import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from '../../../node_modules/leaflet';
import { TopoServiceService } from '../topo-service.service';
import * as $ from 'jquery';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet/dist/leaflet';
// import 'leaflet.markercluster/dist/leaflet.markercluster';
//import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant';
declare var require: any

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  mymap: any;
  clusterGroup: any;

  constructor(public sy?: TopoServiceService) {
   }

  ngOnInit() {
    this.mymap = L.map('mapid', {renderer: L.canvas()}).setView([42.505, -97], 4);

    // tslint:disable-next-line:max-line-length
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
  maxZoom: 14,
  minZoom: 4
}).addTo(this.mymap);
// L.tileLayer('http://www.justicemap.org/tile/{size}/income/{z}/{x}/{y}.png', {
// 	attribution: '<a href="http://www.justicemap.org/terms.php">Justice Map</a>',
// 	size: 'county',
// 	bounds: [[14, -180], [72, -56]]
// }).addTo(this.mymap);
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    //   maxZoom: 18,
    //   attribution: 'Edwin Grier',
    //   preferCanvas: true,
    //   id: 'mapbox.streets'
    // }).addTo(this.mymap);
let that = this
    that.mymap.locate({setView: true, maxZoom: 4});

    this.mymap.on('locationfound', onLocationFound);
  function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(that.mymap)
    .bindPopup('You are here').openPopup();
       // .bindPopup("You are within " + radius + " meters from this job").openPopup();

    L.circle(e.latlng, radius).addTo(that.mymap);
}
this.mymap.on('locationerror', onLocationError);

function onLocationError(e) {
  alert(e.message);
}
this.clusterGroup = new L.markerClusterGroup({
  maxClusterRadius: 80,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  imagePath: 'https://www.mydomain.com/m',
  zoomToBoundsOnClick: true
});
//this.getSeries();

// const sidebar = L.control.sidebar({ container: 'sidebar', position: 'left' })
// .addTo(this.mymap)
// .open('home');
//sidebar.open('home');
  }

  ngAfterViewInit(){
   //var require: any
    const jsonURL = require('../../assets/csvjson.json');
    console.log(jsonURL)
    var endTime = new Date('01/12/2010 12:00:00 AM').toUTCString();
    for (let a = 0; a < jsonURL.length; a++) {
      var city = jsonURL[a].city;
      var comments = jsonURL[a].comments;
      var country = jsonURL[a].country;
      var date = jsonURL[a].datetime;
      // var duration = jsonURL[a].duration
      var lat = jsonURL[a].latitude
      var lng = jsonURL[a].longitude
      var shape = jsonURL[a].shape
      //var state = jsonURL[a].state

      //var datetimeEnd = "12/23/2004 07:15"

    
      //var endTime = new Date('02/12/2013 12:00:00 AM');
      if(shape == 'fireball'){
      var iconImage = 'assets/img/ufo.png';
      }
      else if(shape == 'chevron'){
        var iconImage = 'assets/img/chevron.png';
        }
        else if(shape == 'oval'){
          var iconImage = 'assets/img/oval.png';
          }
          else if(shape == 'formation'){
            var iconImage = 'assets/img/formation.png';
            }
            else if(shape == 'sphere'){
              var iconImage = 'assets/img/sphere.png';
              }
              else if(shape == 'light'){
                var iconImage = 'assets/img/light.png';
                }
                else if(shape == 'rectangle'){
                  var iconImage = 'assets/img/rectangle.png';
                  }
                  else if(shape == 'disk'){
                    var iconImage = 'assets/img/disk.png';
                    }
                    else if(shape == 'changing'){
                      var iconImage = 'assets/img/changing.png';
                      }
                      else if(shape == 'cigar'){
                        var iconImage = 'assets/img/cigar.png';
                        }
                        else if(shape == 'circle'){
                          var iconImage = 'assets/img/circle.png';
                          }
                          else
                          {
                          var iconImage = 'assets/img/circle.png';
                          }
      var icon = L.icon({
        iconUrl: iconImage,
        iconSize: [20, 18],
        iconAnchor: [10, 9]
      });
      var markers = [];

      if( country == 'us' ){
        var marker = L.marker([lat,lng], {icon: icon})//.addTo(this.mymap);
        this.clusterGroup.addLayer(marker);
        marker.bindPopup('Date: ' + date + ' ' + comments);
        // '<div class ="popup-a" id="selectSite" data-tab="select" data-lat="' + lat + '" data-lang="' + lang + '">' + 'Select' + '</div>' + '<div class="popup-a" id="selectDetails" data-tab="0">' + 'View Details' + '</div>' + '<div class="popup-a" id="selectEquip" data-tab="1">' + 'Equipment' + '</div>' + '<div class="popup-a" id="selectCircuit" data-tab="2">' + 'Circuit' + '</div>'
     }
    }
    //console.log(markers)
    //this.clusterGroup.addLayers(markers);
    this.clusterGroup.addTo(this.mymap);
   
     
     
    
  }
  showPanel() {
    // setTimeout(function () {
    //   // var x = document.getElementById("slide-panels")
    //   // x.style.display = "block"
    //     $(".slide-panels").show();
    //     $(document).ready(function () {
    //         $(".collapse.in").each(function () {
    //             $(this).siblings(".panel-heading").find(".glyphicon").addClass("glyphicon-minus").removeClass("glyphicon-plus");
    //         });
    //         $(".collapse").on('show.bs.collapse', function () {
    //             $(this).parent().find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
    //         }).on('hide.bs.collapse', function () {
    //             $(this).parent().find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
    //         });
    //     });


    // }, 200);
}
  getSeries() {
    const seriesBody = {
      seriesid: ['OEUN000000000000015113001'],
      startyear: '2018',
      endyear: '2018',
      catalog: true,
      calculations: false,
      //annualaverage: true,
      registrationkey: '324ee24d5dac410485461df0d4f492db'
    };
       this.sy.getSeries(seriesBody).subscribe(
        data => {
          console.log(data);
        //  this.books = data[0]
        //  this.movies = data[1]
         });
  }

}
