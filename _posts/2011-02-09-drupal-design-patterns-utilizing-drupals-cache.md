---
layout: post
title: 'Drupal Design Patterns: Utilizing Drupal''s cache'
created: 1297284955
permalink: blog/drupal-design-patterns/cache
categories: drupal
tags: [design patterns, development]
---
When values don't change between requests (unlike static variables), Drupal's caching system is a great, simple way to reduce the workload on your site and provide a flexible way to configure the storage duration of this data. Using just our handy [cache\_get()](http://api.drupal.org/api/drupal/includes--cache.inc/function/cache_get/7) and [cache\_set()](http://api.drupal.org/api/drupal/includes--cache.inc/function/cache_set/7) functions, we can implement an elegant solution to increasing performance across a stateless application.

First, let's analyze the [cache_set()](http://api.drupal.org/api/drupal/includes--cache.inc/function/cache_set/7) parameters -

{% highlight php %}
<?php
function cache_set($cid, $data, $bin = 'cache', $expire = CACHE_PERMANENT) {
  /* ... */
}
?>
{% endhighlight %}

#### Example #1 (using a simple cache) ####

{% highlight php %}
<?php
  $value = cache_get('cache_key');
  if (FALSE == $value) {
    // generate $value
    cache_set('cache_key', $value);
  }
?>
{% endhighlight %}

#### Example #2 (creating your own cache) ####

{% highlight php %}
<?php
  /* @file my_module.install */
  function my_module_schema() {
    $schema['cache_my_cache'] = drupal_get_schema_unprocessed('system', 'cache');
    $schema['cache_my_cache']['description'] = 'A cache table for my module.';
    return $schema;
  }
?>
{% endhighlight %}  
{% highlight php %}
<?php
  /* @file my_module.module */
  function my_module_flush_caches() {
    return array('cache_my_cache');
  }
?>
{% endhighlight %}
