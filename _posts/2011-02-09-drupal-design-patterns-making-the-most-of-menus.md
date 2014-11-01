---
layout: post
title: 'Drupal Design Patterns: Making the most of menus'
created: 1297285031
permalink: blog/drupal-design-patterns/menus
categories: drupal
tags: [design patterns, development]
---
The menu system in Drupal is known to most people as "that thing in the cache I have to constantly clear to find my links!" That is true. Also, it's a vastly powerful framework for, not just managing your URLs, but adding context and power around the URLs themselves.

### Load functions ###

The following menu item receives a single argument to the URL, an ID for some data -

{% highlight php %}
<?php
  $item['my-module/%my_module_data'] = array(
    'title' => 'My path',
    'page callback' => 'my_module_path',
    'page arguments' => array(1),
  );
?>
{% endhighlight %}

When this URL is received, Drupal appends '_load' to the argument's name to call its load function -

{% highlight php %}
<?php
  function my_module_data_load($my_data) {
    // lookup $my_data index
    return $my_data_object;
  }
?>
{% endhighlight %}

Now, your page callback will receive the full, loaded object, rather than just the ID from the URL -

{% highlight php %}
<?php
  function my_module_path($my_data_object) {
    // object available, passed through load
    // load function my_modula_data_load
  }
?>
{% endhighlight %}
