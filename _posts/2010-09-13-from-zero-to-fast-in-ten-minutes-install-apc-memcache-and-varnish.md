---
layout: post
title: From Zero to Fast in Ten Minutes - Install APC, Memcache, and Varnish
created: 1284419871
permalink: blog/zero-fast-ten-minutes-install-apc-memcache-and-varnish
category: Drupal
tags: performance
---
**Presented at Sept '10 Atlanta Drupal User's Group Meeting**

From a base install of Ubuntu Server 10.04 ([download here](http://www.ubuntu.com/server)), we'll spend 5 minutes ramping up LAMP to be a powerful tool in order to show how easy it is to create a high-performance web site. The demonstration was geared towards non-sysadmins, possibly afraid of diving into the command-line and setting up some performance tools. Instead, I want to show how easy it can be to get your own [Pantheon](http://groups.drupal.org/pantheon) (formerly Project Mercury)-type setup done in no time!

NOTE: Ubuntu Server has no GUI. If you'd like something more comfortable, these instructions will work just the same on Ubuntu Desktop. Obviously, you would not want a GUI running on your real web server, taking up valuable resources.

For these demonstration, the follow assumptions are being made -
 - You are logged in as the main Ubuntu user (the one with sudo access).
 - You have [drush](http://drupal.org/project/drush) installed and configured in your PATH.

### Setup ###

Now, let's get started with the basics -

1. Install Ubuntu Server preselecting the "LAMP server" and "OpenSSH server" packages.

2. Pull your Drupal project onto the server at /var/www or download a copy of [Pressflow](http://pressflow.org/) and start from scratch. Run install.php and get the database setup. **Varnish requires the use of Pressflow, so an existing site must be migrated for Varnish to work properly. Memcache and APC will work with vanilla Drupal as well.**

3. Jump into a root shell -

        cd /var/www # or whatever your project directory is

4. We'll also need a command line-ready version of PHP (something Ubuntu packages separate) -

        apt-get install php5-cli

5. Turn on external page caching in Drupal -

        drush vset cache "3"


### APC ###

Our first optimization tip will be setting up PHP for success. This means using APC. Without getting into specifics, APC speeds up the processing of PHP by storing information used by PHP between processes. This shared memory prevents PHP from having to re-do a lot of repetitive work.

1. Install [APC](http://www.php.net/apc) (Alternative PHP Cache) using -

        apt-get install php-apc

2. By default, APC comes with a 64MB shared cache. For our example, we won't need to increase this.

3. First, let's get PHP amped up. To get PHP to see the new APC extension, we'll need to restart the Apache process -

        apache2ctl restart

4. Let's double-check that PHP can now see the APC extension -

        php -m | grep apc

You should see a single line output with "apc".

### Memcached ###

Now, let's get Memcached up and running. Memcache allows Drupal to move many of its cache operations into fast memory and take the strain off of MySQL.

1. Install [Memcached](http://memcached.org/), [libmemcached](http://libmemcached.org/) (C/C++ library), [memcached](http://pecl.php.net/package/memcached) PECL extension (PHP wrapper) using -

        apt-get install memcache libmemcached2 php5-memcached

2. By default, memcached runs on port 11211 with 64MB of memory. Again, we won't worry about specific configurations to keep things simple.

3. Download the [Memcache Drupal module](http://drupal.org/project/memcache) -

        drush dl memcache
        cat <<EOF >> sites/default/settings.php
        $conf['cache_inc'] = './sites/all/modules/memcache/memcache.db.inc';
        EOF

4. For the purpose of ensuring Memcache is working, enable the memcache_admin module -

        drush -y en memcache_admin

5. You should now see Memcache statistics at the bottom of each page. Disable this module after initial testing -

        drush -y dis memcache_admin
        drush -y pm-uninstall memcache_admin

### Varnish ###

Also, we are going to install Varnish and get a simple setup running. For this, you will need Pressflow as your base Drupal install.

1. Install [Varnish](http://www.varnish-cache.org/) using -

        apt-get install varnish

2. Copy the configuration from the [Four Kitchens wiki](https://wiki.fourkitchens.com/display/PF/Configure+Varnish+for+Pressflow) to replace the base 
/etc/varnish/varnish.ecl file.

3. Convert Apache to listen on port 8080 instead of the default port 80 -

        perl -pi -e 's/\**:80>/\*:8080>/g' /etc/apache2/sites-available/default
        perl -pi -e 's/Listen 80$/Listen 8080/g' /etc/apache2/ports.conf
        perl -pi -e 's/\*:80$/\*:8080/g' /etc/apache2/ports.conf

4. Change Varnish's default port to port 80 -

        perl -pi -e 's/-a :\d+ /-a :80 /g' /etc/default/varnish

5. Change Varnish's default storage from file to malloc (a.k.a. memory) with a storage size of 64M -

        perl -pi -e 's/-s file,.*\"$/-s malloc,64M\"/g' /etc/default/varnish

6. Now restart both services (in this order!) -<br>

        apache2ctl restart
        service varnish restart

7. Enjoy Varnish goodness!

### Conclusions ###

Following some strong jMeter testing, the unoptimized virtual machine (with 1GB RAM) would crash within about 20-30 secs when the load had exceeded 70. The optimized machine on the other hand, finished the test, taking about 2 minutes, with >2k reqs/sec and a load ~4.
