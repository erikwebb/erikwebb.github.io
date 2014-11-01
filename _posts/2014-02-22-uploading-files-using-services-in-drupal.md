---
layout: post
title: "Uploading files using Services in Drupal"
description: ""
category: "drupal"
tags: [services]
---
The [Services](http://drupal.org/project/services) module in Drupal provides a web service endpoint for Drupal content quite easily. The ability to upload files associated with content is a bit more difficult and actually requires a second web service request.

To enable this, ensure your `hook_default_services_endpoint()` makes the `attach_file` resource available -

{% highlight php %}
<?php
/**
 * Implements hook_default_services_endpoint().
 */
function myservices_default_services_endpoint() {

  // ...
  $endpoint->resources = array(
    // ...
    'node' => array(
      // ...
      'targeted_actions' => array(
        'attach_file' => array(
          'enabled' => '1',
        ),
      ),
    // ...
  );
  // ...

  return $export;
}
{% endhighlight %}

I ran into this issue on a recent project and wasn't able to find any direction documentation to solve the problem. Here's my solution using the excellent [Guzzle PHP HTTP client](http://docs.guzzlephp.org/) -

{% highlight php %}
<?php
$file = '/path/to/file';

// First send the report itself
$response = $this->client->post('node', array(), array(
  'type' => 'report',
));
$report = json_decode($response->getBody(TRUE));

// Second attach the report file to the report
$attachment = $this->client->post('node/' . $report->nid . '/attach_file', array(), array(
    'field_name' => 'field_file',
    'files[]' => '@' . $file,
));
{% endhighlight %}

Although 2 requests are required, the actual code is quite simple.

