---
layout: post
title: Setting up PEAR and Drush on pair Networks Shared Hosting
created: 1317779217
permalink: blog/setting-pear-and-drush-pair-networks-shared-hosting
categories: infrastructure
---
I've recently decide to switch back to [pair Networks](http://promote.pair.com/direct.pl?erikwebb.net+143665) and ran into some issues getting Drush setup via the new Pear method. Here are my notes -

- First, setup some sane Pear variables for the shared environment -

{% highlight bash %}
pear config-set bin_dir ~/bin
pear config-set temp_dir /tmp/<username>/pear/temp
pear config-set cache_dir /tmp/<username>/pear/cache
pear config-set download_dir /tmp/<username>/pear/download
{% endhighlight %}

- Now, follow Drush [setup instructions for Pear](http://pear.drush.org/) and run the following commands -

{% highlight bash %}
pear channel-discover pear.drush.org
pear remote-list -c drush
pear install drush/drush
{% endhighlight %}

- Setup Drush to use higher `memory_limit` and other good settings -

{% highlight bash %}
mkdir -p ~/.drush
cp ~/pear/drush/examples/example.drush.ini ~/.drush/drush.ini
{% endhighlight %}

- Last bump PHP's CGI `memory_limit` up to 128M as well -

{% highlight bash %}
cat > ~/public_html/fcgi-bin/php.ini <<EOF
memory_limit = 128M
EOF
{% endhighlight %}

Easy enough!
