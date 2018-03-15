

 /* function Account(id, name, balance)
          {
            this.Id = id;
            this.Name = name;
            this.Balance = balance;
          }

          // this is View Model
          function AccountViewModel(acc)
          {
            this.Id = acc.id;
            this.Name = acc.name;
            this.Balance = ko.observable(acc.Balance);
          }

          var acc = new Account(1, "A1", 10000);
          var accViewModel = new AccountViewModel(acc);
          ko.applyBindings(accViewModel); */

  (function(global) {
  "use strict";

  // 'use strict';
  // Information about the places these dogs live
  var gymLocations = [{

      title: "Yang Style Tai Chi Chuan",

      image: "yang.jpg",

      username: "yangstyletaichi",

      description: "Tai chi (taiji), short for t'ai chi ch'üan (taijiquan; 太极拳), is an internal Chinese martial art practiced for both its defense...  ",

      wiki_info: "tai_chi",

      location: {

        lat: 36.992107,

        lng: 127.112946


      }


    },

    {

      title: "Krav Maga",

      image: "Krav-Maga2.png",

      username: "kravmaga",

      description: "Krav Maga (; Hebrew: קְרַב מַגָּע‬ [ˈkʁav maˈɡa], lit. \"contact-combat\") is a military self-defence and fighting system developed.....",

      wiki_info: "Krav_Maga",

      location: {

        lat: 37.017650,

        lng: 127.098311


      }

    },

    {

      title: "MMA Gym",

      description: "Mixed martial arts (MMA) is a full-contact combat sport that allows both striking and grappling, both standing and on the ground....",

      image: "mma.jpg",

      wiki_info: "mixed_martial_arts",

      username: "MMA",

      location: {

        lat: 36.998720,

        lng: 127.087155


      }

    },

    {

      title: "Brazilian Jujitsu",

      description: "Brazilian jiu-jitsu (; Portuguese: [ˈʒiw ˈʒitisu], [ˈʒu ˈʒitisu], [dʒiˈu dʒiˈtisu]) (BJJ; Portuguese: jiu-jitsu brasileiro) is a martial art....",

      image: "bjj.jpg",

      username: "bjj",

      wiki_info: "brazilian_jiu-jitsu",

      location: {

        lat: 36.992454,

        lng: 127.116997


      }

    },

       {

      title: "Chen Style Tai Chi Chuan",

      description: "Tai chi (taiji), short for t'ai chi ch'üan (taijiquan; 太极拳), is an internal Chinese martial art practiced for both its defense training...",

      image: "chen.jpg",

      wiki_info: "tai_chi",

      username: "chenstyletaichi",

      location: {

        lat: 37.001919,

        lng: 127.111247


      }

    },

    {

      title: "Muay Thai",

      description: "Muay Thai (Thai: มวยไทย, RTGS: Muai Thai, pronounced [mūa̯j tʰāj] ( listen)) or Thai boxing is a combat sport of Thailand that ...",

      image: "muaythai.jpg",

      wiki_info: "Muay_Thai",

      username: "muaythai",

      location: {

        lat: 37.025925,

        lng: 127.083499


      }

    },

    {

      title: "Kali/Arnis",

      description: "Arnis, also known as Kali or Eskrima, is the national sport and martial art of the Philippines. The three are roughly interchangeable...",
      image: "kali.jpg",

      wiki_info: "arnis",

      username: "arnis",

      location: {

        lat: 37.026261,

        lng: 127.100047


      }

    },

        {

      title: "Wing Chun",

      description: "Wing Chun (traditional Chinese: 詠春) is a traditional Southern Chinese Kung fu martial art specializing in close range combat.",

      image: "wingchun.jpg",

      wiki_info: "Wing_Chun",

      username: "wingchun",

      location: {

        lat: 36.996385,

        lng: 127.120286


      }

    },

            {

      title: "Goju Ryu Karate",

      description: "Gōjū-ryū (剛柔流), Japanese for \"hard-soft style,\" is one of the main traditional Okinawan styles of karate.....",

      image: "gojuryukarate.jpg",

      wiki_info: "Gōjū-ryū",

      username: "gojuryukarate",

      location: {

        lat: 36.997955,

        lng: 127.139892


      }

    },

            {

      title: "Taekwondo",

      description: "Taekwondo ( TY-kwon-DOH, UK: ty-KWON-doh; from Korean 태권도 [tʰɛ.k͈wʌn.do] ( listen)) is a Korean martial art.......",

      image: "taekwondo.jpg",

      wiki_info: "Taekwondo",

      username: "Taekwondo",

      location: {

        lat: 37.003697,

        lng: 127.075388


      }

    },

            {

      title: "Hapkido",

      description: "Hapkido (RP: hap-kee-DOH, US: hahp-KEE-doh, also spelled hap ki do or hapki-do; from Korean hapgido Korean pronunciation:.....",

      image: "hapkido.jpg",

      wiki_info: "Hapkido",

      username: "Hapkido",

      location: {

        lat: 37.009085,

        lng: 127.091069


      }

    },


                {

      title: "Japanese Jujitsu",

      description: "Jujutsu ( joo-JOOT-soo; Japanese: 柔術, jūjutsu  listen ), also known in the West as ju-jitsu or jiu-jitsu, .....",

      image: "jj.jpg",

      wiki_info: "jujutsu",

      username: "japanesejujutsu",

      location: {

        lat: 37.000969,

        lng: 127.059532


      }

    },




  ];


  var map;

  var markers = [];

  function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {

      center: {

        lat: 37.009743,

        lng: 126.976526
        

      },

      zoom: 15

    });

    // Markers and infowindows

    var largeInfoWindow = new google.maps.InfoWindow();

    var gymLocationMarker = function(f, marker){
      gymLocations[f].marker = marker;
    };

    var markerListener = function(marker){
      marker.addListener('click', function(){
        // no marker wiki_info exists, and this was a string.
        getData(marker.wiki_info);
        populateInfoWindow(this, largeInfoWindow);
      });
    };

    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create another array of markers on initialize.

    for (var i = 0; i < gymLocations.length; i++){

      var position      = gymLocations[i].location;
      var title         = gymLocations[i].title;
      var description   = gymLocations[i].description;
      var image         = gymLocations[i].image;
      var username      = gymLocations[i].username;
      var wiki_info    = gymLocations[i].wiki_info;


      // Create a marker per location, and put into markers array.

      var marker = new google.maps.Marker({

        map: map,
        position: position,
        image: image,
        description: description,
        title: title,
        username: username,
        id: i,
        wiki_info: wiki_info
      });


      marker.addListener('click', function(){
        for (var i = 0; i < markers.length; i++){
          markers[i].setAnimation(null);
        }
        toggleBounce(this);
        map.setZoom(10);
        map.setCenter(marker.getPosition());
      });

      function toggleBounce(ele){
        if(ele.getAnimation() !== null){
          ele.setAnimation(null);
        } else {
          ele.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

      markers.push(marker);

      gymLocationMarker(i, marker);

      markerListener(marker);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  // Wikipedia API
  function getData(wiki_info){
    // Source: https://www.mediawiki.org/wiki/API:Main_page
    $.ajax({
      type: "GET",
      url: "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + wiki_info + "&callback=?",
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    }).then(function(data, textStatus, jqXHR){
      Object.values(data.query.pages).forEach(function(item){

        FVM.details([]);
        FVM.details.push(item.extract);
        FVM.wiki_info(wiki_info);
        FVM.hideGym(false);
     
      });

    }).catch(function(errorMessage){
      console.error(errorMessage);
    });
    // If error in loading Wikipedia articles.
    $(document).ajaxError (function (evt,jqXHR, settings, err){
        alert("No martial art schools found in Wikipedia");
    });
  }

  function getContentString(marker){
    var contentString = '<div class="infoWindow pinklink"><h4><strong>' + marker.title + '</strong></h4><br>' + '<p>' + marker.description + '</p>' +'<div><a href="https://www.instagram.com/explore/tags/' + marker.username + '">Instagram page</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.youtube.com/results?search_query=' + marker.username + '">YouTube</a></div>' + '<br>'+ '<img src="imgs/' + marker.image + '" /></div>';
  
    return contentString;

  }

  function populateInfoWindow(marker, infowindow) {

    if (infowindow.marker != marker){
      infowindow.marker = marker;

      infowindow.setContent(getContentString(marker));

      infowindow.open(map, marker);

      infowindow.addListener('closeclick', function(){
        infowindow.marker = null;
      });
    }
  }

  function GymLocation(title, location, count) {
    var self = this;
    self.count = count;
    self.title = title;
    self.location =location;
    self.visibility = ko.observable(true);
    self.eventClickWindow = function(el){
      google.maps.event.trigger(markers[count], 'click');
    };
}    

function GymsViewModel(){
  var self = this;

  self.searchSection = ko.observable('');
  self.wiki_info =  ko.observable('');
  self.details = ko.observableArray();
  self.hideGym = ko.observable(true);
  self.searchResults = ko.computed(function(){
    var results = "";
    results += self.searchSection().toUpperCase();
    return results;
  }, (self));

  self.capitalizeInput = function(){
    var currentVal = self.searchSection();
    self.searchSection(currentVal.toUpperCase());
  };

  //init the friends
  self.gymLocations = ko.observableArray();
  var i = 0;
  gymLocations.forEach((gym) => {
    self.gymLocations.push(new GymLocation(gym.title, gym.location, i));
    i += 1;
  });

  self.filteredList = ko.computed(function(){
    var filter = self.searchResults().toUpperCase();
    if(filter === ""){
      self.gymLocations().forEach((gym) => {
        gym.visibility(true);
        markers.forEach((marker) => {
          marker.setVisible(true);
        });
      });
      return self.gymLocations(); 
    } else {
      return ko.utils.arrayFilter(self.gymLocations(), function(gym){
        var string = gym.title.toUpperCase();
        var result = (string.search(filter) >= 0);
        gym.visibility(result);
        markers[gym.count].setVisible(result);
        return result;
      });

    }
  });

}


  var FVM = new GymsViewModel();
  ko.applyBindings(FVM);

  global.initMap = initMap;
})(window);

//Google API error handler
function MapError() {
  alert('No cake!');
}

