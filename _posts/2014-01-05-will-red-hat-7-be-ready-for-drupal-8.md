---
layout: post
title: "Will Red Hat 7 Be Ready for Drupal 8?"
description: ""
category: "drupal"
tags: [sysadmin, rhel, apache, mysql]
---
In mid-December, the upcoming release of the seventh version Red Hat Enterprise Linux ("RHEL") [arrived for public testing](https://www.redhat.com/about/news/archive/2013/12/red-hat-announces-availability-of-red-hat-enterprise-linux-7-beta). With the last major release of RHEL arriving in late 2010, a lot has changed in the world of hosting Drupal sites. The final release of RHEL 7 will likely come just after Drupal 8 is released, so by the time Drupal 8 sites begin to be launched, RHEL 7 will become a serious consideration in your hosting decision.

A quick glance at Drupal's [installation requirements](https://drupal.org/requirements) shows that there is a new PHP version requirement for Drupal 8, but more important are the overall trends in the other software needed to host a high-performance, scalable Drupal web site. Acquia Cloud strives hard to keep up with these changes over time. If you're unable to use Acquia Cloud, RHEL often grows old quickly with four or more years between major releases.

###No More MySQL###

The biggest news is Red Hat has officially moved way from the MySQL distribution packaged by Oracle. Instead, Red Hat has chosen to use MariaDB 5.5 as its default MySQL-compatible database. (For more information on the history of MySQL and its distributions, read [this excellent blog post](https://www.acquia.com/blog/drupal-mysql-open-source-history) from Acquia.com earlier this year.)

While Drupal developers do not need to change their code to work with MariaDB, the official adoption of MariaDB by a large enterprise Linux provider is [huge news](http://www.zdnet.com/red-hat-enterprise-linux-7-beta-arrives-with-mariadb-as-its-default-database-7000024194/). Drupal.org has run MariaDB for several years, indicating strong support and acceptance from the Drupal community. Acquia moved away from the standard MySQL distribution way back in [March 2012](https://www.acquia.com/blog/acquia-cloud-big-numbers).

###PHP is Keeping Pace###

With the previously included version of PHP (5.3.3) [nearing end of life (EOL)](https://wiki.php.net/rfc/php53eol), upgrading PHP was key to keeping pace with the times. Drupal 8 will require PHP 5.4 and thankfully that what RHEL 7 will provide for us (5.4.16). While the Drupal community has historically lagged behind the most current versions of PHP at the time, PHP 5.5 was released 18 months ago and will surely become a desirable PHP version before long. With RHEL typically being a long-term investment, Drupal developers will certainly be looking past PHP 5.4 and asking for the latest and greatest by the time Drupal 9 rolls around in a few years.

Inevitably platforms like Drupal evolve at a different rate than Linux distributions. Rather than choosing the current leader or chasing new releases, Acquia Cloud allows its users to [choose their own PHP version](https://docs.acquia.com/cloud/configure/environments#php), allowing developers to choose whichever PHP version best suits their Drupal site. As Drupal and PHP versions evolve, so does Acquia Cloud.

###Apache Learns Some New Tricks###

Since RHEL 6 was released, [nginx](http://nginx.com/) has taken hold as a viable competitor to the venerable Apache HTTP Server (just "Apache" to most). This change has happened largely for three reasons - 1) Apache's default configuration is typically more memory-intensive than nginx; 2) the request handling model in Apache could be more efficient when handling very high traffic demands; and 3) better integration with newer ways to manage PHP processes, namely PHP-FPM.

For better or worse, RHEL 7 does not include nginx, but does include the latest version of Apache, which levels the playing field. Version 2.4 catches up with all three of those key differentiator that brings it closer to nginx for maximum performance - the Event MPM ([technical explanation](https://httpd.apache.org/docs/2.4/mod/event.html)) and the FastCGI Proxy module. At a high level, the Event MPM essentially changes the request processing model from something akin to a "courier" (a single thread manages the entire request, then returns for another request) to a "dispatcher" (a single thread hands off the task and continues accepting more requests). The split limits the overall memory usage of each individual thread and brings down the average consumption per request. This change becomes even more powerful when paired with the combination of the FastCGI Proxy module and PHP-FPM. This combination allows the dispatcher to immediately hand off the request to PHP, allowing Apache to return to handling more requests.

While nginx may be the current king of lightweight web servers, these new features in Apache certainly make it a level competitor and, in my opinion, tips the scales back toward the veteran in the field, especially for those with years of experience managing Apache installations.

###Other Interesting Version Notes###

- PHP APC: 3.1.9 to Not included?
    
    Obviously this is a beta release, so this may change, but this is an odd omission from the base repository.

- Memcached: 1.4.4 to 1.4.15

