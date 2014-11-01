---
layout: post
title: 'Drupal Design Patterns: Creating your own hooks'
created: 1297284658
permalink: blog/drupal-design-patterns/hooks
categories: drupal
tags: [design patterns, development]
---
Drupal's hook system allows for modules to interact and alter the workings of other modules or even Drupal core itself. It is a very simple system that allows modules to even create their own very easily. In common practice, there are two types of hooks that you would want to create - alter hooks and intercepting hooks. Alter hooks provide a common way to edit the contents of a particular object or variable, typically using [drupal\_alter()](http://api.drupal.org/api/drupal/includes--module.inc/function/drupal_alter/7). Intercepting hooks allow external modules to perform actions during the execution of another module.

### Example #1 (simple invoking) ###

{% highlight php %}
<?php
  // will call all modules implementing hook_hook_name
  module_invoke_all('hook_name');
?>
{% endhighlight %}

### Example #2 (aggregate results) ###

{% highlight php %}
<?php
  $result = array();
  foreach (module_implements('hook_name') as $module) {
    // will call all modules implementing hook_hook_name and 
    // push the results onto the $result array
    $result[] = module_invoke($module, 'hook_name');
  }
?>
{% endhighlight %}

### Example #3 (altering data using [drupal_alter](http://api.drupal.org/drupal_alter)) ###

{% highlight php %}
<?php
  $data = array(
    'key1' => 'value1',
    'key2' => 'value2',
  );
  // will call all modules implementing hook_my_data_alter
  drupal_alter('my_data', $data);
?>
{% endhighlight %}

### Example #4 (passing by reference cannot use [module_invoke](http://api.drupal.org/module_invoke)) ###

{% highlight php %}
<?php
  // @see user_module_invoke()
  foreach (module_implements('hook_name') as $module) {
    $function = $module . '_hook_name';
    // will call all modules implementing hook_hook_name
    // and can pass each argument as reference determined
    // by the function declaration
    $function($arg1, $arg2);
  }
?>
{% endhighlight %}
