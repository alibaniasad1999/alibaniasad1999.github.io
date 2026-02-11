---
title: Publications
layout: default
permalink: /publications/
published: true
---

# Publications

---

{% assign pubs = site.publications | sort: "year" | reverse %}
{% for pub in pubs %}

<div style="margin-bottom: 1.8em;">
  <h3 style="margin-bottom: 0.2em;">
    {% if pub.redirect %}
      <a href="{{ pub.redirect }}" target="_blank">{{ pub.title }}</a>
    {% else %}
      {{ pub.title }}
    {% endif %}
  </h3>
  <p style="margin: 0.2em 0;">
    {{ pub.authors }}
  </p>
  <p style="margin: 0.2em 0; font-style: italic;">
    {% if pub.journal %}{{ pub.journal }}{% endif %}{% if pub.conference %}{{ pub.conference }}{% endif %}{% if pub.volume %}, vol. {{ pub.volume }}{% endif %}{% if pub.pages %}, pp. {{ pub.pages }}{% endif %}{% if pub.year %}, {{ pub.year }}{% endif %}.
  </p>
  {% if pub.content != "" %}
  <p style="margin: 0.4em 0; font-size: 0.9em;">{{ pub.content | strip_html | truncatewords: 50 }}</p>
  {% endif %}
</div>

{% endfor %}
