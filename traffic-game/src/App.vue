<template>
  <div class="app-container">
    <div class="map-container">
      <div id="map"></div>
    </div>
    <div class="info-panels">
      <div class="marker-panel" v-if="selectedMarker">
        <h2>Combat Actions</h2>
        <ul>
          <li v-for="option in selectedMarkerOptions" :key="option">
            <a @click="handleMarkerOptionClick(option)" class="clickable-option">{{ option }}</a>
          </li>
        </ul>
      </div>
      <div class="region-panel" v-if="selectedRegion">
        <h2>Preventive Actions</h2>
        <ul>
          <li v-for="option in selectedRegionOptions" :key="option">
            <a @click="handleRegionOptionClick(option)" class="clickable-option">{{ option }}</a>
          </li>
        </ul>
      </div>
    </div>

  </div>
    <!-- <button @click="increaseScoresBasedOnTime(this.updatedScores)">Start</button> -->
</template>

<script>
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world'

import 'jsvectormap/dist/js/jsvectormap.min.js'
    
import countriesData from '@/../../model/world.json';
import countriesToMarkData from '@/../../model/countries.json';
import data from '../../model/output.json'

import { reactive } from 'vue';

export default {
  data() {
    return {
      map: null,
      markers: [],
      selectedMarker: null,
      selectedRegion: null,
      timeFactor: 1.5,
      jsonData: data,
      updatedScores: reactive(data),
      scoresUpdated: 0,
    }
  },
  computed: {
    selectedMarkerOptions() {
      // Define the marker-specific options
      if (this.selectedMarker) {
        return [
          'Adopt legislative measures to criminalize conduct outlined in the UN Protocol to Prevent Trafficking in Persons.',
          'Coordinate with local law enforcement agencies.',
          'Establish specialized anti-trafficking units with advanced training.',
          'Provide effective protection for witnesses.',
          'Provide or improve training for relevant officials in all aspects of trafficking.',
          // Add other measures as needed
        ];
      }
      return [];
    },
    selectedRegionOptions() {
      // Define the region-specific options
      if (this.selectedRegion) {
        return [
          'Strengthen border controls to prevent and detect trafficking in this region.',
          'Implement awareness campaigns targeted at vulnerable populations.',
          'Improve research on the character and scale of trafficking.',
          'Adopt or review laws related to licensing and operation of businesses involved in trafficking.',
          'Promote cooperation with other relevant partners and organizations.',
          'Ensure the quality of travel documents to prevent misuse.',
          'Organize hackathons to find solutions to the problem.'
          // Add other measures as needed
        ];
      }
      return [];
    },
  },
  mounted() {
    this.map = new jsVectorMap({
      selector: '#map',
      map: 'world',
      backgroundColor: '#3d85c6',
      markers: this.markers,
      markerStyle: {
        initial: { fill: '#3498db', stroke: '#ffffff' },
        hover: { fill: '#2c3e50', stroke: '#ffffff' },
      },
      zoomButtons: false,
      showTooltip: false,
      regionsSelectable: true,
      regionsSelectableOne: true,

      regionStyle: {
        initial: {
          fill: '#ddf0b2',
          stroke: '#000000',
          strokeWidth: 0.3,
          fillOpacity: 1
        },
        hover: {
          fillOpacity: 0.8,
          cursor: 'pointer'
        },
        selected: {
          fillOpacity: 0.9,
          fill: '#ffffff',
          stroke: '#ff8b00',
          strokeWidth: 1,
        },
      },
      visualizeData: {
        scale: ['#f6685e', '#7a211b'],
        values: data,
      },

      onMarkerClick: (event, index) => {
        this.selectedMarker = this.markers[index];
        this.selectedRegion = null;
        console.log('Marker clicked:', this.selectedMarker.name);
      },
      onRegionClick: (event, code) => {
        this.selectedMarker = null;
        this.selectedRegion = { name: code }; // Use the region code as a placeholder
        console.log('Region clicked:', code);
      },
    });
    this.loadMarkersFromJson();
    this.increaseScoresBasedOnTime(this.updatedScores)
  },

  methods: {
    loadMarkersFromJson() {
      const countriesToMark = countriesToMarkData.countries;

      // Filter out only the countries you want to mark
      this.markers = countriesData
        .filter(country => countriesToMark.includes(country.name))
        .map(country => ({
          name: country.name,
          coords: [country.latitude, country.longitude],
        }));

      this.map.addMarkers(this.markers); // Add markers to the map
    },

    // Function to increase scores based on time
    increaseScoresBasedOnTime(scores) {
      setInterval(() => {
        for (const country in scores) {
          if (country != 'asd') {
            scores[country] = scores[country] + 3;
            const roundedScore = Math.round(scores[country]);
            this.updatedScores[country] = roundedScore;
          }
        }
        console.log(this.updatedScores);
        this.map.params.visualizeData.values = this.updatedScores;
        this.scoresUpdated += 1;
       
      }, 1000); // Set the interval to one second (1000 milliseconds)
    },


    handleMarkerOptionClick(option) {
      // Handle clicks on marker options
      console.log('Marker option clicked:', option);
    },
    handleRegionOptionClick(option) {
      console.log(data)
      // Handle clicks on region options
      console.log('Region option clicked:', option);
    },
    // Function to update map data
  },
}
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  /* Adjust the height as needed */
  width: 78%;
}

#map {
  width: 100%;
  height: 100%;
  /* Adjust the height as needed */
}

.info-panels {
  width: 20%;
  /* padding: 20px; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
}

.marker-panel,
.region-panel {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.marker-panel h2,
.region-panel h2 {
  color: #3498db;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}

.clickable-option {
  cursor: pointer;
  color: #3498db;
  border: 1px solid transparent;
  /* Initially transparent border */
  padding: 2px;
  /* Add padding for a bit of spacing */
  transition: border-color 0.3s ease-in-out;
  display: inline-block;
  /* Ensure the border surrounds the text */
}

.clickable-option:hover {
  border-color: #3498db;
  /* Change border color on hover */
}
</style>
