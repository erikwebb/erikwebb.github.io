---
layout: post
title: Balancing Software Development - Simplicity, Flexibility, and Scalability
created: 1286504013
permalink: blog/balancing-software-development-simplicity-flexibility-and-scalability
categories: drupal
---
In photography, there is the concept of the Exposure Triangle - an equilateral triangle balancing between aperture, ISO sensitivity, and shutter speed at each point. When you alter one of the three, the other two are affected as well. If you choose to increase the shutter speed for example, the aperture and ISO must change in order to compensate. Creatively, the ideal exposure does not always exist at the center point.

Like in photography, software development must balance three factors as well - simplicity, flexibility, and scalability. Any given project can entirely focus on any two of the factors, but in return the third factor is neglected. Just as much as a heavily weighted project may fail due to omitting the third factor, a perfectly balanced project may fail because it was unable to differentiate itself. This triangle is a method of focusing efforts and priorities, regardless of ultimate execution.

![Complexity triangle](/assets/images/complexity_triangle.png)

This graphic came out of a long discussion with a current client attempting to visualize how Drupal and Wordpress (their current CMS of choice) differ in focus and execution. While Wordpress is an elegantly simple CMS, it has never excelled in its flexibility or scalability (from the perspective of scaling complexity). It has gained its popularity driven by its intuitive interface and install-to-setup time. On the other hand, Drupal has never strived to be a simple product, or even find a balance directly in the middle. Instead, flexibility and scalability have taken center stage and left the job of adding simplicity to distribution builders and site developers. Drupal is positioned as a platform, in contrast to a pure CMS like Wordpress.

So with Drupal 7 on the horizon, where does Drupal now fit on this diagram?

### Simplicity ###

The initial ease of use of the product (i.e. learning curve). In Drupal versions previous to 7, this was Drupal's sacrifice in the triangle. It was exceptionally difficult to hand Drupal as-is over to a user and feel confident in their understanding of the tool. A site builder could instead sacrifice flexibility, by removing features or reworking UI, in order to provide a more usable product.

Largely thanks to the [D7UX project](http://www.d7ux.org/), Drupal 7 is now a much more user-friendly product out-of-the-box. Terminology is more consistent and less technical. Core menus are now functionally organized to provide more intuitive navigation. And the process of adding and updating modules is greatly simplified, allowing beginners to avoid manual file management or scary command-line commands.

Additionally, the emergence of well-crafted Drupal distributions is exciting. If a client is looking for a corporate intranet solution, [Drupal Commons](http://acquia.com/products-services/drupal-commons) can be installed and now the lack of simplicity is moot. Similar options are available for team collaboration ([OpenAtrium](http://openatrium.com/)), publishing web sites ([OpenPublish](http://openpublishapp.com/)), or academic web sites ([OpenScholar](http://openscholar.harvard.edu/)). These distributions bridge the gap between Drupal's sometimes steep learning curve and a well-crafted finished product, moving Drupal into the center of the triangle.

### Flexibility ###

Drupal has always been and still is a great example of a flexible software platform. The number and quality of contributed modules is astonishing. Flexibility has very different meanings to developers and end users.

To an end user, however, their first impression is the most important. Just by including CCK/Fields in core D7, Drupal takes a large leap forward for end users with a more flexible content structure from the start. Now users can begin prototyping their IA without yet thinking of adding more modules and functionality. From a developer's perspective, this seems like a limited improvement, but, to the average CMS user unfamiliar with Drupal, the less additional effort they must undertake, the better Drupal will seem to fit their needs.

### Scalability ###

Can Drupal scale? I have heard this question countless times dealing with many clients of the past six months. There is no real answer here. The real question, instead, is - What tools can Drupal work with to help it scale?

The scalability of a PHP application is purely dependent on how open the application is to offloading work and letting purpose-built tools do their part. PHP can scale, just like any other language (generally speaking). Enter APC, Memcache, Varnish, Lighttpd, nginx, etc. The interaction of all of these tools make Drupal scalable. Following the fine work of [Pressflow](http://pressflow.org/) in D6, D7 can now scale to incorporate all of these tools natively. Exemplified by the high traffic of such sites as The Economist, The Examiner, and The White House, Drupal can definitely scale to tens of millions of hits per month, more than enough to prove Drupal can scale.

All in all, where does Drupal now fit? From a user's perspective, Drupal 7 is out-of-the-box a much more balanced product. Because of the fine work of the core developers and also thanks to the hard work of distribution builders, Drupal can not only better balance these goals, but further excel in each.

In the perpetual comparison between Drupal and Wordpress, will there ever be a "winner"? No. Both of these products have different priorities and live in different parts of this software development triangle. Both of these products win in their different ways - Wordpress in its simplicity for content management; Drupal in its ability to remain flexible and scalable as an application platform.
