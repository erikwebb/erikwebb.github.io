---
layout: post
title: 'Drupal on RHEL 6: Is It Ready?'
created: 1316004713
permalink: blog/drupal-rhel-6-it-ready
categories: [drupal, infrastructure]
tags: rhel
---
Since Red Hat Enterprise Linux (RHEL) 5 came out in March 2007, it has become quite long-in-the-tooth compared to Ubuntu and other flavors with much faster release cycles. It's of course Red Hat's policy not to upgrade components to ensure the maximum amount of backward compatibility, so this lag is to be expected. Additionally many Red Hat support customers are weary of installing packages from other repositories like EPEL or freshrpms. Thankfully RHEL 5.6 added the ability to run PHP 5.3, but most other components were still missing and out-of-date.

Now, let's take a look at where RHEL 6 is out-of-the-box to support a strong Drupal infrastructure -

## PHP ##

Now the default PHP version is 5.3.2. This is the recommended version for Drupal 7 and, looking forward, the requirement for Drupal 8. This version upgrade keeps Red Hat's PHP version current for at least a few years. As a whole it looks like the included PHP version and extensions are more than enough for the average Drupal setup.

### Included (Relevant) Extensions ###

- [APC](http://pecl.php.net/package/APC) 3.1.3p1 - This version is fairly old, but the APC extension itself hasn't evolved much in the past few years.
- [Memcache](http://pecl.php.net/package/memcache) 3.0.4 - Many current Drupal setups tend to include Memcache 2.2.x. Both are compatible, but Memcache 3.0.x includes some new handy [redundancy settings](http://us2.php.net/manual/en/memcache.ini.php).
- Other included extensions - gd, imap, ldap, mbstring, mysql, pdo, pgsql, soap, xml, xmlrpc

## MySQL ##

The biggest issue with RHEL 5 for Drupal performance was the ancient version of MySQL included. Now it has been bumped to 5.1.52, but this is still lagging behind the 5.5 version released in December 2009. Since this will not be bumped to at least 5.5 until RHEL 7, this looks like an opportunity for [MariaDB](http://mariadb.org/) or [Percona Server](http://www.percona.com/software/) to become an even better candidate for the default database installed on RHEL.

## Other Software ##

- Object cache [Memcached](http://memcached.org/) 1.4.4 - Finally included and ready to run.
- Load balancer [LVS-based](http://www.linuxvirtualserver.org/) 1.25 - Although many current Drupal sites run HAproxy or nginx for load-balancing, LVS is a cool Linux-centric solution that performs very well.
- [Git](http://git-scm.com/) 1.7.1 - Subversion is a thing of the past...
- [Pacemaker](http://www.clusterlabs.org/) 1.1.2 - A great failover tool for MySQL database or Varnish servers to ensure only one server is active.

## Missing ##

- [Varnish](https://www.varnish-cache.org/) - For any Drupal site with significant traffic, Varnish is a must-have and it's a shame it's not included here.
- Any PHP FastCGI support
