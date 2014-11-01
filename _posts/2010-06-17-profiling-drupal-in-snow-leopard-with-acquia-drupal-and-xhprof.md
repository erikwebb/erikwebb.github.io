---
layout: post
title: Profiling Drupal in Snow Leopard with Acquia Drupal and xhprof
created: 1276781791
permalink: blog/profiling-drupal-snow-leopard-acquia-drupal-and-xhprof
categories: Drupal
---
**UPDATE: The [latest version of the devel module](http://drupal.org/node/990464) includes xhprof support. No separate module is needed anymore.**

[xhprof](http://php.net/xhprof) is a great utility for profiling and now apparently the only method of profiling memory usage as Xdebug has recently removed this requisite feature (as of 2.0.0RC4). Here are the steps I used to allow xhprof to run seamlessly on my 64-bit Snow Leopard machine.

-  Add the Acquia Drupal executables to your PATH variable, then open a new terminal. Here is the PATH variable in my .bash_profile file -

{% highlight bash %}
PATH=/Applications/acquia-drupal/mysql/bin:/Applications/acquia-drupal/php/bin:/Applications/acquia-drupal/apache/bin:$PATH
{% endhighlight %}

-  Install Git. The easiest way to install git on your Mac is using the git-osx-installer project on [Google Code](http://code.google.com/p/git-osx-installer/).

-  Download the latest xhprof release from [PECL](http://pecl.php.net/package/xhprof) -

{% highlight bash %}
pecl d xhprof-0.9.2
{% endhighlight %}

-  Extract the xhprof PECL package -

{% highlight bash %}
tar xzf xhprof-0.9.2.tgz
{% endhighlight %}

-  Compile the xhprof package. Here's the trick: because Snow Leopard is 64-bit, you must add the correct architecture flags to the compilation process -

{% highlight bash %}
cd xhprof-0.9.2/extension
phpize
CFLAGS='-arch i386 -isysroot /Developer/SDKs/MacOSX10.5.sdk -mmacosx-version-min=10.5' \
./configure --with-php-config=/Applications/acquia-drupal/php/bin/php-config
make
sudo make install
{% endhighlight %}

-  Now add the newly created xhprof extension to your php.ini file using this configuration -

{% highlight ini %}
[xhprof]
extension=xhprof.so
;
; directory used by default implementation of the iXHProfRuns
; interface (namely, the XHProfRuns_Default class) for storing
; XHProf runs.
;
xhprof.output_dir=/private/tmp
{% endhighlight %}

-  Restart Apache and double-check that the xhprof extension is properly loading -

{% highlight bash %}
apachectl restart
php -m | grep xhprof
{% endhighlight %}

-  Download the xhprof module for Drupal from github -

{% highlight bash %}
cd sites/all/modules
/usr/local/git/bin/git clone http://github.com/pifantastic/drupal-xhprof.git
{% endhighlight %}

-  Enable the xhprof module using drush -

{% highlight bash %}
drush en xhprof
{% endhighlight %}

- Configure the xhprof module's variables within your Drupal installation. I use the XHPROF_ENABLED query flag to denote when to profile -

{% highlight bash %}
drush variable-set xhprof_include_paths "*?XHPROF_ENABLED" -y
{% endhighlight %}
