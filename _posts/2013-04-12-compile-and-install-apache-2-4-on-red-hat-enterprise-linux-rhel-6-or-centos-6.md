---
layout: post
title: Compile and install Apache 2.4 on Red Hat Enterprise Linux (RHEL) 6 or CentOS 6
created: 1365778972
permalink: blog/compile-and-install-apache-24-red-hat-enterprise-linux-rhel-6-or-centos-6
categories: infrastructure
tags: [apache, rhel]
---
There are a lot of threads on the Internet that point to running Apache 2.4 on RHEL 6 as being a difficult setup. It's actually quite easy, thanks to Apache's wonderful packaging. Since Apache builds their source packages so they can easily be compiled into RPMs. (All of these steps were performed on a fresh installation of CentOS 6.3.)

First we need to install all of the tools for building RPMs and create the directory structure -

{% highlight bash %}
yum -y install rpm-build
mkdir -p ~/rpmbuild/{SOURCES,SPECS,BUILD,RPMS,SRPMS}
{% endhighlight %}

Let's start by downloading the Apache Httpd sources and trying to compile -

{% highlight bash %}
cd ~/rpmbuild/SOURCES
wget http://www.gtlib.gatech.edu/pub/apache/httpd/httpd-2.4.4.tar.bz2
{% endhighlight %}

Now we can identify the missing dependencies and figure out how to continue -

{% highlight bash %}
# rpmbuild -tb httpd-2.4.4.tar.bz2 
error: Failed build dependencies:
    autoconf is needed by httpd-2.4.4-1.x86_64
    apr-devel >= 1.4.0 is needed by httpd-2.4.4-1.x86_64
    apr-util-devel >= 1.4.0 is needed by httpd-2.4.4-1.x86_64
    pcre-devel >= 5.0 is needed by httpd-2.4.4-1.x86_64
    openldap-devel is needed by httpd-2.4.4-1.x86_64
    lua-devel is needed by httpd-2.4.4-1.x86_64
    libxml2-devel is needed by httpd-2.4.4-1.x86_64
    distcache-devel is needed by httpd-2.4.4-1.x86_64
{% endhighlight %}

We have packages available for autoconf, pcre-devel, openldap-devel, lua-devel, and libxml2-devel. APR is included in RHEL and CentOS, but it's unfortunately an old version, so we'll have to recompile that too. distcache is often the problem people are reporting when installing Apache 2.4, but continue reading for a nice trick to make this easier.

Next, we'll download the sources of all of the custom packages we need to compile for Apache (your versions may change) -

{% highlight bash %}
cd ~/rpmbuild/SOURCES
wget http://www.gtlib.gatech.edu/pub/apache/apr/apr-1.4.6.tar.bz2
wget http://www.gtlib.gatech.edu/pub/apache/apr/apr-util-1.5.2.tar.bz2
{% endhighlight %}

Each of these can now be easily used to create RPMs for installation. Let's start with APR -

{% highlight bash %}
cd ~/rpmbuild/SOURCES
# Install apr dependencies
yum -y install autoconf libtool doxygen
rpmbuild -tb apr-1.4.6.tar.bz2
# Install our freshly build apr RPMs
rpm -ivh ~/rpmbuild/RPMS/x86_64/apr-1.4.6-1.x86_64.rpm ~/rpmbuild/RPMS/x86_64/apr-devel-1.4.6-1.x86_64.rpm
# Install apr-util dependencies
yum -y install expat-devel libuuid-devel db4-devel postgresql-devel mysql-devel freetds-devel unixODBC-devel openldap-devel nss-devel
# For some reason this has failed for me once or twice, but completed successfully the next time.
rpmbuild -tb apr-util-1.5.2.tar.bz2
rpm -ivh ~/rpmbuild/RPMS/x86_64/apr-util-1.5.2-1.x86_64.rpm ~/rpmbuild/RPMS/x86_64/apr-util-devel-1.5.2-1.x86_64.rpm
{% endhighlight %}
    
Installing distcache on RHEL can be a pain, but we can take advantage of Fedora's SRPM to get us started -

{% highlight bash %}
cd ~/rpmbuild/SRPMS
wget http://www.gtlib.gatech.edu/pub/fedora.redhat/linux/releases/18/Fedora/source/SRPMS/d/distcache-1.4.5-23.src.rpm
rpmbuild --rebuild distcache-1.4.5-23.src.rpm
rpm -ivh ~/rpmbuild/RPMS/x86_64/distcache-1.4.5-23.x86_64.rpm ~/rpmbuild/RPMS/x86_64/distcache-devel-1.4.5-23.x86_64.rpm
{% endhighlight %}

Now that we have apr and distcache taken care of, the Apache compilation and install is quite easy -

{% highlight bash %}
cd ~/rpmbuild/SOURCES/
# Install remaining httpd dependencies
yum -y install pcre-devel lua-devel libxml2-devel
rpmbuild -tb httpd-2.4.4.tar.bz2
{% endhighlight %}

Now you're ready to install httpd, but you'll get one last error -

{% highlight bash %}
$ rpm -ivh ~/rpmbuild/RPMS/x86_64/httpd-2.4.4-1.x86_64.rpm 
    error: Failed dependencies:
        /etc/mime.types is needed by httpd-2.4.4-1.x86_64
{% endhighlight %}

Let's find out which package provides that file -

{% highlight bash %}
$ yum whatprovides "/etc/mime.types"
Loaded plugins: fastestmirror, security
Loading mirror speeds from cached hostfile
 * base: ftp.osuosl.org
 * epel: ftp.osuosl.org
 * extras: ftp.osuosl.org
 * updates: ftp.usf.edu
mailcap-2.1.31-2.el6.noarch : Helper application and MIME type associations for file types
Repo        : base
Matched from:
Filename    : /etc/mime.types
{% endhighlight %}

We're finally ready to install httpd -

{% highlight bash %}
yum -y install mailcap
rpm -ivh ~/rpmbuild/RPMS/x86_64/httpd-2.4.4-1.x86_64.rpm
{% endhighlight %}

Now you're all ready to go with Apache 2.4! And since you've built proper RPMs, you're also ready to deploy the packages out to all of your servers. For a guide on getting PHP-FPM setup with Apache 2.4, check out the [Apache Httpd Wiki page](https://wiki.apache.org/httpd/PHP-FPM).
