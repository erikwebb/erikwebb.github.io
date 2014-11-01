---
layout: post
title: 'Drupal Design Patterns: Putting It Together'
created: 1297313194
permalink: blog/drupal-design-patterns/putting-it-together
categories: drupal
tags: [design patterns, development]
---
With these simple concepts, how much can you accomplish?

### Example: Exportables ###

Here's a simple example illustrating collecting exportables using aggregate hooks and static variables -

{% highlight php %}
<?php
  function my_module_data_get_all() {
    $data = &drupal_static(__FUNCTION__);
    // check for existing $data from previous function call
    if (!isset($data)) {
      // pull all $data from database
      $data = db_select('my_table', 'mt')->fields('mt')->fetchAll();
      // cycle through all code-based hook_default_my_data implementations
      // and add to database entries
      foreach (module_implements('default_my_data') as $module) {
        // combine $data with returned array (db takes precedence)
        $data = array_merge(module_invoke($module, 'default_my_data'), $data);
      }
    }
    return $data;
  }
?>
{% endhighlight %}

This method can then be used when listing all data from a menu callback -

{% highlight php %}
<?php
  $items['my-module'] = array(
    'title' => 'List all data',
    'page callback' => 'my_module_data_view',
  );
  $items['my-module/%my_module_data'] = array(
    'title callback' => 'my_module_data_title',
    'title arguments' => array(1),
    'page callback' => 'my_module_data_view',
    'page arguments' => array(1),
  );
  $items['my-module/%my_module_data/view'] = array(
    'title' => 'View',
    'type' => MENU_DEFAULT_LOCAL_TASK,
    'weight' => -10,
  );
  $items['my-module/%my_module_data/export'] = array(
    'title' => 'Export',
    'page callback' => 'my_module_data_export',
    'page arguments' => array(1),
    'type' => MENU_LOCAL_TASK,
  );
?>
{% endhighlight %}
{% highlight php %}
<?php
  // menu load function
  function my_module_data_load($my_data) {
    $data = my_module_data_get_all();
    return isset($data[$my_data]) ? $data[$my_data] : NULL;
  }
  // menu title callback
  function my_module_data_title($my_data, $op = 'view') {
    return is_object($my_data) && isset($my_data->value) ? ucwords($op) . $my_data->value : '';
  }
?>
{% endhighlight %}

Everything is now loaded and passed with full objects to our page callbacks. Our page callback can now be as simple as a theme callback -

{% highlight php %}
<?php
  // view page callback
  function my_module_data_view($my_data = NULL) {
    return theme('my_data', array('data' => $my_data));
  }
  // simple export page callback
  function my_module_data_export($my_data) {
    return var_export($my_data, TRUE);
  }
?>
{% endhighlight %}
