---
title: Publications
layout: default
permalink: /publications/
published: true
---

<div class="PublicationContainer">
  <div class="gallery">

  {% for pub in site.publication %}   {# ← reads from your `_publication/` folder #}

    {% assign link = pub.redirect
                   | default: pub.url
                   | prepend: site.baseurl
                   | prepend: site.url %}

    <div class="publicationTile">
      {% if pub.redirect or pub.url %}
        <a href="{{ link }}" target="_blank">
      {% endif %}
        <span>
          <h2>{{ pub.title }}</h2>
          <br/>
          <p>
            {{ pub.authors }}
            {% if pub.journal %}, <em>{{ pub.journal }}</em>{% endif %}
            {% if pub.conference %}, <em>{{ pub.conference }}</em>{% endif %}
            {% if pub.year %}, {{ pub.year }}{% endif %}.
          </p>
        </span>
      {% if pub.redirect or pub.url %}
        </a>
      {% endif %}
    </div>

  {% endfor %}

  </div>
</div>
