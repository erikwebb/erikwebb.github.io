---
layout: post
title: Providing Date Module Functionality for Custom Date Fields in D6
created: 1339537797
permalink: blog/providing-date-module-functionality-custom-date-fields
alias: blog/providing-date-module-functionality-custom-date-fields-d6
categories: drupal
tags: [development]
---
The Date module creates a standardized way to interface with date fields across many different data types. When creating a custom module that creates its own date or timestamp field, you may want to take advantage of common functionality, such as easy Views integration with popup exposed filters.

To accomplish this, there are two hooks that you must implement in your existing module -

 - `hook_date_api_tables()` notifies the Date API module about the existence of your custom data table that includes a date field. This is the key to proper integration.

{% highlight php %}
<?php
/**
 * Implementation of hook_date_api_tables().
 */
function mymodule_date_api_tables() {
  return array('mymodule');
}
?>
{% endhighlight %}

 - `hook_date_api_fields()` exposes your specific date fields to the Date API module and gives developers added options to customize the handling of its particular date field.

{% highlight php %}
<?php
/**
 * Implementation of hook_date_api_fields().
 */
function mymodule_date_api_fields($field) {
  $values = array(
    // The type of date: DATE_UNIX, DATE_ISO, DATE_DATETIME.
    'sql_type' => DATE_UNIX,
    // Timezone handling options: 'none', 'site', 'date', 'utc'.
    'tz_handling' => 'site',
    // Needed only for dates that use 'date' tz_handling.
    'timezone_field' => '',
    // Needed only for dates that use 'date' tz_handling.
    'offset_field' => '',
    // Array of "table.field" values for related fields that should be
    // loaded automatically in the Views SQL.
    'related_fields' => array(),
    // Granularity of this date field's db data.
    'granularity' => array('year', 'month', 'day', 'hour', 'minute', 'second'),
  );

  switch ($field) {
    case 'mymodule.timestamp':
      return $values;
  }
}
?>
{% endhighlight %}
