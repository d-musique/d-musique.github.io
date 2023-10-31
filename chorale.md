---
layout: page
title: Chorale
permalink: /chorale
---

<script src="/assets/js/audio-player.js"></script>

|Audio| | |
|-----|-|-|
{% for item in site.data.chorale -%}
| {{ item.title }} | <audio controls src="/assets/audio/chorale/{{ item.title | escape }}.m4a"></audio> | <a href="/assets/partitions/chorale/{{ item.title | escape }}.pdf"><img height="32" alt="partition" src="/assets/icons/file-pdf-regular.svg" /></a> |
{% endfor %}
