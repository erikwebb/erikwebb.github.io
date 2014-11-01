---
layout: post
title: 'Drupal Design Patterns: Effectively using static variables'
created: 1297284884
permalink: blog/drupal-design-patterns/static
categories: drupal
tags: [design patterns, development]
---
Often you'll create some utility functions that are called incessantly to only return the same result every time during a request. Although not a feature of Drupal itself, harnessing the power of [PHP static variables](http://www.php.net/manual/en/language.variables.scope.php#language.variables.scope.static "Using static variables") can do for your code's performance.

### Example #1 (simple, PHP method) ###

{% highlight php %}
<?php
  function i_get_called_way_too_much() {
    static $static_var;
    if (!isset($static_var)) {
      // generate contents of static variable
      $static_var = 'some value';
    }
    return $static_var;
  }
?>
{% endhighlight %}

Drupal 7 includes a new way to store and use static variables. The new method [drupal_static()](http://api.drupal.org/api/drupal/includes--bootstrap.inc/function/drupal_static/7), providing a centralized function, allows other module to dynamically reset these variables. In a normal PHP implementation, only the function in which the variable is in scope could do this.

### Example #2 (Drupal 7 method) ###

{% highlight php %}
<?php
  function i_get_called_way_too_much() {
    $var = &drupal_static(__FUNCTION__);
    if (!isset($var)) {
      // generate contents of static variable
      $var = 'some value';
    }
    return $var;
  }
  // allows for static variables to be reset from another function
  drupal_static_reset('i_get_called_way_too_much');
?>
{% endhighlight %}
