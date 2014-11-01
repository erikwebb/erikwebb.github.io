---
layout: post
title: Installing Apache Solr with Jetty in RHEL 6
created: 1375207860
keywords: solr,apache solr,jetty,rhel,red hat,search
permalink: blog/installing-apache-solr-jetty-rhel-6
categories: infrastructure
tags: [solr, rhel]
---
Apache Solr comes with the Jetty web server to be run as an example server. For single-instance installations, this built-in configuration is robust enough. Enabling Solr as a typical startup service makes management much easier. All of the following directions should be run as the root user and are loosely based on the Solr wiki.

As a prerequisite, newer versions of Solr require an upgraded version of Java -

{% highlight bash %}
yum -y install java-1.7.0-openjdk.x86_64
{% endhighlight %}

To download Solr and drop it into our installation directory (/opt/solr) -

{% highlight bash %}
curl -O http://www.us.apache.org/dist/lucene/solr/4.4.0/solr-4.4.0.tgz
tar xzf solr-4.4.0.tgz
mv solr-4.4.0/example /opt/solr
{% endhighlight %}

Now to enable Solr as a standard service (since Red Hat typically uses /etc/sysconfig for storing environment variables, this location is changed as well) -

{% highlight bash %}
# Download the Jetty default startup script
curl -o /etc/init.d/solr http://dev.eclipse.org/svnroot/rt/org.eclipse.jetty/jetty/trunk/jetty-distribution/src/main/resources/bin/jetty.sh

# Change file to be executable
chmod +x /etc/init.d/solr

# Change references from Jetty configuration to Solr
perl -pi -e 's/\/default\/jetty/\/sysconfig\/solr/g' /etc/init.d/solr

# Enable the Solr service
chkconfig solr on
{% endhighlight %}

Creating a dedicated Solr user allows permissions to be explicitly defined and reduce confusion caused by shared user accounts -

{% highlight bash %}
useradd -r -d /opt/solr -M -c "Apache Solr" solr
{% endhighlight %}

Change permissions of Solr installation to this user

{% highlight bash %}
chown -R solr:solr /opt/solr/
{% endhighlight %}

The startup script looks for environment variables in /etc/sysconfig/solr. That configuration file should look like -

{% highlight bash %}
JAVA_HOME=/usr/java/default
JAVA_OPTIONS="-Dsolr.solr.home=/opt/solr/solr $JAVA_OPTIONS"
JETTY_HOME=/opt/solr
JETTY_USER=solr
JETTY_LOGS=/opt/solr/logs
{% endhighlight %}

At this point, you should be able start Solr as a normal service!
