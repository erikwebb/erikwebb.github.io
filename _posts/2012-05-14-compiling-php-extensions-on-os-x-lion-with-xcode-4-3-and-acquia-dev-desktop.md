---
layout: post
title: Compiling PHP Extensions on OS X Lion with XCode 4.3 and Acquia Dev Desktop
created: 1337008284
permalink: blog/compiling-php-extensions-os-x-lion-xcode-43-and-acquia-dev-desktop
categories: [infrastructure, drupal]
---
With OS X Lion and the new XCode 4.3, locations have changed and SDKs are no longer available. The [current Acquia documentation](https://docs.acquia.com/dev-desktop/php/extensions) also no longer works. I have begun compiling extensions using the following trick -

{% highlight bash %}
/Applications/acquia-drupal/php5_3/bin/phpize
CFLAGS='-arch i386 -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.6.sdk -mmacosx-version-min=10.5' ./configure --with-php-config=/Applications/acquia-drupal/php5_3/bin/php-config
make
{% endhighlight %}
