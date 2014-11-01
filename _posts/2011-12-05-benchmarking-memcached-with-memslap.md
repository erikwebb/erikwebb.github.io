---
layout: post
title: Benchmarking Memcached with memslap
created: 1323143844
permalink: blog/benchmarking-memcached-memslap
categories: infrastructure
tags: [memcached]
---
Just like any other component in a server stack, it is important to be able to isolate the performance of each server to granularly test small configuration changes. Apache ships with ab for this purpose. Memcached has the memslap program provided by libMemcached. To run tests, we'll start two small Memcached servers on the local machine -

{% highlight bash %}
memcached -d -m 256 -p 11211
memcached -d -m 256 -p 11212
{% endhighlight %}

Now we'll run a test to see how the binary protocol affects the performance of our Memcached server. First we run the test without the --binary flag, then with -

{% highlight bash %}
memslap --servers=127.0.0.1:11211,127.0.0.1:11212 --concurrency=100 --execute-number=10000 --initial-load=10000 --flush
    Threads connecting to servers 100
    Took 42.635 seconds to load data
memslap --servers=127.0.0.1:11211,127.0.0.1:11212 --concurrency=100 --execute-number=10000 --initial-load=10000 --flush --binary
    Threads connecting to servers 100
    Took 32.220 seconds to load data
{% endhighlight %}

From this test we can see that enabling the binary protocol increased performance by approximately 25%. These metrics would be otherwise hard to calculate without a dedicated Memcached benchmarking tool. To see a complete list of options for memslap, run
`memslap --help`
