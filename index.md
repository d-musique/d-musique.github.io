---
layout: page
title: Index
permalink: /
---

<script src="/assets/js/audio-player.js"></script>

|ALL|ARC|HYM|Titre| |Tonalité|
|---|---|---|-----|-|--------|
{% for c in site.data.cantiques -%}
| {{ c.id }} | {{ c.id_arc }} | {% if c.id_hymnary %}[🔗](https://hymnary.org/text/{{ c.id_hymnary }}){% endif %} | {{ c.title }} | <audio controls loop src="/assets/audio/{{ c.file }}"></audio>  | {{ c.key }} |
{% endfor %}
