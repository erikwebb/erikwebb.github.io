---
layout: post
title: 'Drupal Design Patterns: Storing objects in the database'
created: 1297285007
permalink: blog/drupal-design-patterns/objects
categories: drupal
tags: [design patterns, development]
---
Both of the examples use the following database schema -

{% highlight php %}
<?php
  // use the following table schema
  $schema['my_table'] = array(
    'description' => 'My table.',
    'fields' => array(
      'id' => array('type' => 'serial', 'unsigned' => TRUE, 'not null' => TRUE,),
      'value' => array('type' => 'varchar', 'length' => 255, 'not null' => TRUE, 'default' => '',),
      'options' => array('type' => 'text', 'serialize' => TRUE, 'default' => '',),
    ),
    'primary key' => array('id'),
  );
?>
{% endhighlight %}

### Saving Objects ###

Inevitably, you will need to save large objects to the database. In basic PHP, this would require writing out each object properties in a SQL statement or PDO object to perform the operation. Instead, Drupal adds a few easy ways to save this information with minimal effort. First,   [drupal\_write\_record()](http://api.drupal.org/api/drupal/includes--common.inc/function/drupal_write_record/7) directly maps class properties to column names. When using [fetchObject](http://api.drupal.org/api/drupal/includes--database--database.inc/function/DatabaseStatementEmpty%3A%3AfetchObject/7 "DatabaseStatementEmpty::fetchObject") in D7 or [db\_fetch\_object()](http://api.drupal.org/api/drupal/includes--database.mysqli.inc/function/db_fetch_object/6) in D6, you can load objects make necessary changes, then use [drupal\_write\_record()](http://api.drupal.org/api/drupal/includes--common.inc/function/drupal_write_record/7) to save these changes.

#### Example ####

{% highlight php %}
<?php
  $my_data = new stdClass();
  $my_data->id = 1;    // remove this to see INSERT behavior
  $my_data->value = 'some value';

  if ($my_data->id) {
    // if this is an existing entry, specify table's primary key
    drupal_write_record('my_table', $my_data, array('id'));
  }
  else {
    drupal_write_record('my_table', $my_data); // $my_data->id is now set
  }
?>
{% endhighlight %}

### Serializing Objects ###

Alternatively, you can save entire objects (or arrays) to a single column in your database. Most used for fields holding additional options, the [Schema API](http://api.drupal.org/api/drupal/includes--database--schema.inc/group/schemaapi/7) provides a mechanism for automatically serializing and unserializing data as its loaded and unloaded, respectively, from the database. This can be accomplished by simply setting the '[serialize](http://api.drupal.org/api/drupal/includes--database--schema.inc/group/schemaapi/7 "Schema API")' key for any field.

#### Example ####

{% highlight php %}
<?php
  $my_data = new stdClass();
  $my_data->id = 1;    // remove this to see INSERT behavior
  $my_data->value = 'some value';
  $my_data->options = array(
    'opt1' => 'value1',
    'opt2' => 'value2',
  );

  if ($my_data->id) {
    // if this is an existing entry, specify table's primary key
    drupal_write_record('my_table', $my_data, array('id'));
  }
  else {
    drupal_write_record('my_table', $my_data);
  }
?>
{% endhighlight %}
