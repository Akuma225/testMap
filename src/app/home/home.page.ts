import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

declare const google: any; // Déclarer google comme une variable globale

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  async initMap() {
    const mapOptions = {
      center: { lat: -25.344, lng: 131.031 },
      zoom: 15,
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const textWidth = this.getTextWidth('25.000 XOF', '16px bold Arial');
    const textWidth2 = this.getTextWidth('152.850 XOF', '16px bold Arial');

    console.log('Text width: ', textWidth, textWidth2);

    // Recuperer le path du groupe pas le svg
    const pathString = this.generatePillPath(textWidth + 20, 30);
    const pathString2 = this.generatePillPath(textWidth + 20, 30);

    const svgMarker = {
      path: pathString,
      fillColor: "#A578FE",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
    };

    const svgMarker2 = {
      path: pathString,
      fillColor: "#A578FE",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
    };

    // Ajouter un marqueur personnalisé
    const marker = new google.maps.Marker({
      position: { lat: -25.344, lng: 131.031 },
      map: map,
      icon: svgMarker,
      label: {
        text: '25.000 XOF',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold'
      },
    });

    const marker2 = new google.maps.Marker({
      position: { lat: -25.344, lng: 131.065 },
      map: map,
      icon: svgMarker2,
      label: {
        text: '152.850 XOF',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold'
      },
    });

    console.log('Google Maps ready.');

    // Ajouter le marqueur à la carte
    marker.setMap(map);
    marker2.setMap(map);
    console.log('Marker added to map: ', marker);

  }

  getTextWidth(text: string, font: string) {
    // Créer un élément de mesure temporaire
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width;
    }
    return 0;
  }

  /*generatePillPath(width: number, height: number) {
    // Définir les dimensions de la pilule
    const pillWidth = width || 100;
    const pillHeight = height || 50;
    const pillRadius = 10; // Rayon des coins arrondis

    // Créer un générateur de chemin SVG avec D3.js
    const pathGenerator = d3.path();

    // Définir les points du chemin pour dessiner la pilule
    pathGenerator.moveTo(-pillWidth / 2 + pillRadius, -pillHeight / 2); // Déplacer au coin supérieur gauche
    pathGenerator.arcTo(-pillWidth / 2, -pillHeight / 2, -pillWidth / 2, 0, pillRadius); // Dessiner un arc vers le coin inférieur gauche
    pathGenerator.lineTo(-pillWidth / 2, pillHeight / 2 - pillRadius); // Dessiner une ligne vers le coin inférieur gauche
    pathGenerator.arcTo(-pillWidth / 2, pillHeight / 2, -pillWidth / 2 + pillRadius, pillHeight / 2, pillRadius); // Dessiner un arc vers le coin inférieur droit
    pathGenerator.lineTo(pillWidth / 2 - pillRadius, pillHeight / 2); // Dessiner une ligne vers le coin inférieur droit
    pathGenerator.arcTo(pillWidth / 2, pillHeight / 2, pillWidth / 2, 0, pillRadius); // Dessiner un arc vers le coin supérieur droit
    pathGenerator.lineTo(pillWidth / 2, -pillHeight / 2 + pillRadius); // Dessiner une ligne vers le coin supérieur droit
    pathGenerator.arcTo(pillWidth / 2, -pillHeight / 2, pillWidth / 2 - pillRadius, -pillHeight / 2, pillRadius); // Dessiner un arc vers le coin supérieur gauche (fermeture du chemin)
    pathGenerator.closePath(); // Fermer le chemin

    // Retourner le chemin SVG sous forme de chaîne
    return pathGenerator.toString();
  }*/

  generatePillPath(width: number, height: number) {
    // Définir les dimensions de la pilule
    const pillWidth = width || 100;
    const pillHeight = height || 50;
    const pillRadius = 10; // Rayon des coins arrondis
    const pinchWidth = 20; // Largeur du pincement en bas

    // Créer un générateur de chemin SVG avec D3.js
    const pathGenerator = d3.path();

    // Définir les points du chemin pour dessiner la pilule
    pathGenerator.moveTo(-pillWidth / 2 + pillRadius, -pillHeight / 2); // Déplacer au coin supérieur gauche
    pathGenerator.arcTo(-pillWidth / 2, -pillHeight / 2, -pillWidth / 2, 0, pillRadius); // Dessiner un arc vers le coin inférieur gauche
    pathGenerator.lineTo(-pillWidth / 2, pillHeight / 2 - pillRadius); // Dessiner une ligne vers le coin inférieur gauche
    pathGenerator.arcTo(-pillWidth / 2, pillHeight / 2, -pillWidth / 2 + pillRadius, pillHeight / 2, pillRadius); // Dessiner un arc vers le coin inférieur droit
    pathGenerator.lineTo(-pinchWidth / 2, pillHeight / 2); // Dessiner une ligne vers le début du pincement
    pathGenerator.lineTo(0, pillHeight / 2 + pillRadius); // Dessiner une ligne vers le point de pincement
    pathGenerator.lineTo(pinchWidth / 2, pillHeight / 2); // Dessiner une ligne vers la fin du pincement
    pathGenerator.lineTo(pillWidth / 2 - pillRadius, pillHeight / 2); // Dessiner une ligne vers le coin inférieur droit
    pathGenerator.arcTo(pillWidth / 2, pillHeight / 2, pillWidth / 2, 0, pillRadius); // Dessiner un arc vers le coin supérieur droit
    pathGenerator.lineTo(pillWidth / 2, -pillHeight / 2 + pillRadius); // Dessiner une ligne vers le coin supérieur droit
    pathGenerator.arcTo(pillWidth / 2, -pillHeight / 2, pillWidth / 2 - pillRadius, -pillHeight / 2, pillRadius); // Dessiner un arc vers le coin supérieur gauche (fermeture du chemin)
    pathGenerator.closePath(); // Fermer le chemin

    // Retourner le chemin SVG sous forme de chaîne
    return pathGenerator.toString();
}

}
