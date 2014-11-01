---
layout: post
title: Installing uploadprogress PECL library on pair Networks Shared Hosting
created: 1318253330
permalink: blog/installing-uploadprogress-pecl-library-pair-networks-shared-hosting
categories: infrastructure
---

{% highlight bash %}
cd /tmp/ewebb/
pecl download uploadprogress
tar xzf uploadprogress-1.0.3.1.tgz 
cd uploadprogress-1.0.3.1
phpize 
./configure 
make
make test
mkdir ~/php-extensions
cp modules/uploadprogress.so ~/php-extensions/
cat >> ~/public_html/fcgi-bin/php.ini <<EOF
\[uploadprogress\]
extension=/usr/home/ewebb/php-extensions/uploadprogress.so
EOF
{% endhighlight %}
