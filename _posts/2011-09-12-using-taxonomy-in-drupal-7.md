---
layout: post
title: Using Taxonomy in Drupal 7
created: 1315877587
permalink: blog/using-taxonomy-drupal-7
categories: drupal
tags: [taxonomy, development]
---
Even though taxonomy terms can now have fields, there are still some big differences with nodes that prevent them from being true equals. When deciding whether you should create content as nodes or terms, there are a few differences to consider -

- **Taxonomy terms have no workflow.** There is no concept of a *published* or *unpublished* taxonomy term. If terms need any sort of approval or moderation, you should consider a content type.

- **Without an [additional module](http://drupal.org/project/edit_term), taxonomy terms cannot be added to menus.** Even though this module solves the problem, it's obvious that this is a bolted on feature. Combining this with the first point, taxonomy terms have no access control in the menu like node grants provides.

- **Term references cannot be formatted as rendered terms.** Although this seems like an oversight, there is no field formatter to display a taxonomy term in its rendered form inside of another node. This could easily be created, but again it emphasizes the different focus on how terms *should* be used.

- **Terms are not natively searchable in Drupal.** Drupal's search implementations, including core and Apache Solr, are not designed to index taxonomy terms. As long as terms are only supplemental information, this is the expected behavior. On the other hand, if you overextend taxonomy terms to include real *content* as well, this is a substantial hindrance to users finding your content.
