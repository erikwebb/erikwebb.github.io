---
layout: post
title: "Drupal CSS/JS Aggregation Options"
description: ""
category: "Drupal"
tags: [performance]
---
{% include JB/setup %}

The built-in aggregation method in Drupal core (6 and 7 at least) works efficiently for average sites, but can run into issues for larger sites with complex page structures or specific use of many CSS and JS files.

In certain circumstances, this can even cause downtime showing many piled up queries similar to

{% highlight sql %}
SELECT 1 AS expression FROM variable variable WHERE ( (name = 'drupal_css_cache_files') ) FOR UPDATE
{% endhighlight %}
     
This is caused by a combination of Drupal's built-in variable system and a lack of locking when saving newly created aggregates.

### Issues

To clearly outline the problem, here are some of the primary issues involved with core's method -

- **In-process generation** - The creation of CSS/JS aggregates takes place within the request itself. Although this doesn't inherently make the creation of these files slower, it can cause the initial page request to take longer than needed while aggregates are being created.
- **Large, frequent variable sets** - Each time a new aggregate file needs to be created, the information about that file hash is saved into a large serialized array within a single variable. Even after just a single page refresh on a relatively simple site, we are left with this information in the variables table -

  {% highlight sql %}
  mysql> SELECT * FROM variable WHERE `name` LIKE 'drupal_%_cache_files'\G
  *************************** 1. row ***************************
   name: drupal_css_cache_files
  value: a:5:{s:64:"50de3a2ac6d46fc312e327a0e9334525acf51876d7b5b20eb0945c53e1ed1e55";s:64:"public://css/css_2dnsXXDOYbhMIp93wkVzeIMl6qOWn2OarFfG0XSIfqA.css";s:64:"ee6e99158f83f2f70637b851ac5fd1f44456ce2fe06fab6b646ff672e8cb1540";s:64:"public://css/css_N4VRt5b80rK5kloFWk7wKRDqDjANnel62RFDxWhU9aQ.css";s:64:"c52513e9370afed3f59c6da64488088e3b608fad6c361488284da484b147780e";s:64:"public://css/css_YDGfOJevHQv0hcxGbrTyva7FLEjnvpfhmaj5AdOyCJQ.css";s:64:"736e536d6e2926df2d80b6735a5f9fdb0133e47543f0494200c53173a07cb348";s:64:"public://css/css_GtGcAWxHrzbRFS_i2o1K9-IUHtQC0wKv8jXphOy4Cgk.css";s:64:"12e11a930a943e34b03a19823ab1ce9675167aef1e119607cbb99ee76eaa0a42";s:64:"public://css/css_AbpHGcgLb-kRsJGnwFEktk7uzpZOCcBY74-YBdrKVGs.css";}
  *************************** 2. row ***************************
  name: drupal_js_cache_files
  value: a:6:{s:64:"26a730e65b3041b0c4bd746283e9f4f896d1d06d7279c3adb1abf1be5e4e3dae";s:61:"public://js/js_pPx82f2NEgcdA0dGig51elAOdhZikdCvHgf8UnEy7_s.js";s:64:"75c07ae0955e602529e7abbd3a7426b2234b191667dd4b3a73b6ed02af8a1517";s:61:"public://js/js_ZpJJbWcnnM1coYfZHlZbonoPG7yc97Gp-EA83pwd1VI.js";s:64:"ba1fce0df903109fc2885ecf98dd83549dffa0ea6841a361824c1f84a14386f6";s:61:"public://js/js_KLHrXpspIdtLbftPpJEZEdRX2I4fsh1RaPyU5GNVUzg.js";s:64:"0965433aed8217d58a50a23603edc6a6db0d61225ff1264f804c1ac9af5a9592";s:61:"public://js/js_RU5Gn1hNhIAPv1pKQEFmDv-Q-KtqelK6M8P5clytA3A.js";s:64:"bb76c810b61a4e2964ef69898a1e1a465384c8e9785e365551a6919a16a188d7";s:61:"public://js/js_hmTS3gmkINcAx55xhQAzjf41aMdl1ZYKXYvhPcPWTqc.js";s:64:"fa8e5f80b78790fe8c927c1c9e1fcbe4f0ba5efc53f6a87be731b785c3647aad";s:61:"public://js/js_K46I5RmWQ2ia0EgUesZLN0x0x8yTQAcjXNgIeFPtZM8.js";}
  2 rows in set (0.00 sec)
  {% endhighlight %}

### Common Causes

This issue doesn't *just* happen to random Drupal sites. It takes very specific types of functionality to create this problem. Here are a few common examples -

- **Conditional CSS/JS inclusion** - You will often see this type of behavior when certain CSS or JS files are only needed in specific circumstances and not on the site as a whole. If the included CSS or JS is a very large library, then this approach is perfectly fine, but managing small files in this way is not especially effective. These conditional includes look similar to the following example -

  > **Most importantly, these conditional includes should *never* be used to disguise the fact that certain CSS or JS files cannot be included on the same page without issues. That shows a poor use of CSS classes or the need for more.**

- **Functional variability between users** - Each page may have some differentiation in their CSS and JS files, which is completely expected. If you have pages that differ extensively between users, however, the total number of aggregates may increase significantly based on the number of variations across the site. Common examples include showing/hiding blocks on a user/role basis or page components specific to administrators.

### Replacement Modules

- [Advanced CSS/JS Aggregation](https://drupal.org/project/advagg) - This is by far the most common module used to solve this aggregation problem. In addition to refactoring how aggregates are managed, it also includes a number of useful features for manipulating how aggregates are created, such as using minification or aiming for a target number of total bundles.
- [Aggregate cache](https://drupal.org/project/agrcache) - Rather than taking a fully-featured approach like the Advanced CSS/JS Aggregation, this module attempts to transparently replace the core behavior with a more efficient, safer method for creating aggregates. Since it's aim is not to add additional features, Aggregate cache remains very lightweight and easy to understand.
- [Smart preprocess](https://drupal.org/sandbox/erikwebb/2215617) - This is a sandbox module that I've created to help isolate conditional CSS/JS files to help identify during development. Its goal is to isolate the CSS and JS files that are explicitly needed on all pages, while preventing others from being included in aggregates at all.

### The Real Answer

So with all of this potential complexity, is simply enabling one of these modules really the right answer? **No.**

Assuming that you are building a large project with a significant amount of custom theming, it can often be beneficial for a lot of reasons to deliver a single large CSS (or JS) file to clients. Maintaining a single large file is not really a viable option for development, but through the use of preprocessors like [SASS](http://sass-lang.com/), [Less](http://lesscss.org/), or other automated tasks using something like [Grunt](http://gruntjs.com/), this single file can be created easily for delivery.

In addition, removing unneeded (or completely overridden) CSS and JS files is also beneficial for this situation. Some themes that remove includes from Drupal core and other modules are slightly less susceptible to these problems.

### Related d.o Issues

- [Consider using imagecache style generation of CSS and JS aggregates](https://drupal.org/node/1014086)
- [Add stampede protection for css and js aggregation](https://drupal.org/node/886488)
- [Potential race condition on variable_set() due to merge query implementation](https://drupal.org/node/910010)
- [DEADLOCK errors on MergeQuery INSERT due to InnoDB gap locking when condition in SELECT ... FOR UPDATE results in 0 rows](https://drupal.org/node/937284#comment-8348863)
