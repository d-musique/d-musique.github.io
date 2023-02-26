---
layout: page
title: Vendredi saint 2023
permalink: /vendredi-saint-2023.html
---

<script src="/assets/js/audio-player.js"></script>

|ALL|ARC|HYM|Titre| |Tonalité|
|---|---|---|-----|-|--------|
{% for c in site.data.vendredi_saint_2023 -%}
| {{ c.id }} | {{ c.id_arc }} | {% if c.id_hymnary %}[🔗](https://hymnary.org/text/{{ c.id_hymnary }}){% endif %} | {{ c.title }} | <audio controls loop src="/assets/audio/vendredi-saint-2023/{{ c.file }}"></audio>  | {{ c.key }} |
{% endfor %}
