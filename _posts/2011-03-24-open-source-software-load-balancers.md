---
layout: post
title: Open-source, Software Load Balancers
created: 1300994990
permalink: blog/open-source-software-load-balancers
categories: infrastructure
---
There are countless load balancers available on the market. Some hardware, some proprietary, some hosted - there are too many options to enumerate. Instead, here is a quick list of some of the most popular open-source software load balancers and their advantages/disadvantages -

### [nginx](http://nginx.org/en/) ###

Primarily built as a lightweight HTTP server, nginx also serves quite well as an HTTP(S) load balancer. Of the listed options, nginx provides the most number of features, including many options for caching and file serving. To simplify matters further, SSL termination is also supported. All in all, nginx provides all you can ask for from an HTTP-specific load balancer.

### [HAProxy](http://haproxy.1wt.eu/) ###
The most general load balancer of these four, HAProxy is actually a general TCP load balancer with added features for HTTP. Because it can balance at the TCP level, other services can also be served by HAProxy, such as multiple MySQL or caching servers. HAProxy offers the most options of a true load balancer and scales extremely well. HAProxy does not offer SSL termination, so you must relay on an additional service such as [stunnel](http://stunnel.org/) to receive requests and pass them to HAProxy.

### [Pound](http://www.apsis.ch/pound/) ###

Between nginx and HAProxy, Pound is a lightweight HTTP-only load balancer. It offers many of the load balancing features of nginx without any of the web server capabilities. This keeps Pound small and efficient with easy-to-read configuration options.

### [Varnish](http://www.varnish-cache.org/) ###

Although primarily used as a reverse proxy cache, Varnish also includes functionality to act as a load balancer. It does not offer a great deal of configuration, but, if already using Varnish for caching, it may be possible to also make use of its load balancing abilities to greatly simplify an architecture. Similar to HAProxy, however, Varnish does not support SSL termination.
