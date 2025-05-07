---
title: Projects
layout: default
permalink: /projects/
published: true
sort_by:    order           # ← use the numbers above
sort_order: ascending       # ← 1, 2, 3…
---

<div class="ProjectContainer">
  <div class="gallery">
    {% for project in site.projects %}
      {% if project.redirect %}
        <div
          class="projectTile custom-bg"
          style="background-image: url('{{ project.image | relative_url }}')"
        >
          <a href="{{ project.redirect }}" target="_blank" rel="noopener">
            <span>
              <h2>{{ project.title }}</h2>
              <p>{{ project.description }}</p>
            </span>
          </a>
        </div>
      {% else %}
        <div
          class="projectTile custom-bg"
          style="background-image: url('{{ project.image | relative_url }}')"
        >
          <a href="{{ project.url | prepend: site.baseurl | prepend: site.url }}" target="_blank" rel="noopener">
            <span>
              <h2>{{ project.title }}</h2>
              <p>{{ project.description }}</p>
            </span>
          </a>
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>
