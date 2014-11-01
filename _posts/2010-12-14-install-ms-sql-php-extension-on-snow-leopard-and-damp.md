---
layout: post
title: Install MS-SQL PHP extension on Snow Leopard and DAMP
created: 1292338169
permalink: blog/install-ms-sql-php-extension-snow-leopard-and-damp
categories: drupal
tags: sysadmin
---
Similar to compiling [XHProf for Snow Leopard](http://erikwebb.net/blog/profiling-drupal-snow-leopard-acquia-drupal-and-xhprof), installing any new PHP extension is usually easy. The MS-SQL extension, specifically, requires an additional library called [FreeTDS](http://www.freetds.org/). The linking tools included do not work well with Snow Leopard and need to be replaced. Here are the steps I took to compile FreeTDS and the MS-SQL extension -

- Download [PHP](http://www.php.net/downloads.php) and [FreeTDS](ftp://ftp.ibiblio.org/pub/Linux/ALPHA/freetds/stable/freetds-stable.tgz) sources. **NOTE: The PHP version needs to match your DAMP (or other server) installation.**

- Navigate to the mssql/ folder inside the PHP source -

{% highlight bash %}
cd /path/to/php/ext/mssql
{% endhighlight %}

- Run configure for FreeTDS -

{% highlight bash %}
CFLAGS="-arch i386" LDFLAGS="-arch i386" ./configure --prefix=/usr/local/freetds --enable-msdblib --with-tdsver=8.0
{% endhighlight %}

- Run phpize and configure for the MS-SQL extension -

{% highlight bash %}
phpize
CFLAGS='-arch i386 -isysroot /Developer/SDKs/MacOSX10.5.sdk -mmacosx-version-min=10.5' \
./configure --with-php-config=/Applications/acquia-drupal/php/bin/php-config --with-mssql=/usr/local/freetds
{% endhighlight %}

- Copy the libtool created by the configure command in PHP into the FreeTDS source folder -

{% highlight bash %}
cp /path/to/php/ext/mssql/libtool /path/to/freetds/
{% endhighlight %}

- Compile and install FreeTDS -

{% highlight bash %}
make && make install
{% endhighlight %}

- Compile the MS-SQL extension and copy to the DAMP installation -

{% highlight bash %}
cd /path/to/php/ext/mssql
make
cp modules/mssql.so /Applications/acquia-drupal/php/ext/
{% endhighlight %}

- Configure PHP to load the new MS-SQL extension -

{% highlight bash %}
cat >> /Applications/acquia-drupal/php/bin/php.ini <<EOF
[mssql]
extension=mssql.so
EOF
{% endhighlight %}

- Restart DAMP
