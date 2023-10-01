---
layout: page
title: Orgue
permalink: /orgue
---

<script src="/assets/js/audio-player.js"></script>

|Légende| |
|-------|-|
|MGBT|Montre 8 ; Gambe 8 ; Bourdon 8 ; Trompette 8|
|CFDP|Voix Céleste 8 ; Flute douce 4 ; Doublette 2 ; Prestant 4|
|+tr|Pédale tremolo|
|+exp|Pédale expression|
|+oct|Toutes les notes décalées à l'octave supérieur|

|Audio| |
|-----|-|
{% for item in site.data.orgue -%}
| {{ item.name }} | <audio controls src="/assets/audio/orgue/{{ item.name }}.m4a"></audio>  |
{% endfor %}
