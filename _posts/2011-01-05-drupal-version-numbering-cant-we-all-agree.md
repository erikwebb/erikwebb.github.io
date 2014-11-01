---
layout: post
title: Drupal Version Numbering - Can't We All Agree?
created: 1294281751
permalink: blog/drupal-version-numbering-cant-we-all-agree
categories: drupal
tags: development
---
In an open source community, one of the greatest advantages is that people can develop in their own way and publish as they create the next great feature. This breeds the fastest and most productive development processes. Unfortunately, the Drupal community clashes in one major place, version numbering -

 - Drupal has a very strict release policy - all minor releases of a single major release are used to fix bugs and patch any security holes that are found. No new features or API features are added within these major releases.
 - Contributed modules and themes follow any numbering scheme dependent on the current maintainer. It's often very common to see code continuously changing within a major release, sometimes even breaking developer APIs.

As a developer, it's easy to choose the recommended version (or HEAD) and move on. For people new to Drupal, it is difficult to explain how Drupal core's versioning is so strict and clear, but any of the other pieces that they may download follow no such scheme.

With the [release of Drupal 7](http://drupal.org/drupal-7.0) and the [#D7CX](http://drupal.org/project/modules?solrsort=sort_title%20asc&text=d7cx&display=table) pledges, I have noticed a lot in terms of module versioning recently, including a few practices that may seem very odd to newcomers.

 - Many modules (see [Views](http://drupal.org/node/38878/release), [Location](http://drupal.org/node/18723/release), [Administration menu](http://drupal.org/node/108746/release)) use the major version as an indicator of common development, i.e. Views 6.x-3.x and 7.x-3.x use a similar or identical API and are developed in tandem. Although this may be clearer from an administrator standpoint, can the same be automatically said of a module developed with 6.x-1.x and 7.x-1.x versions? This would obviously be a dangerous assumption.
 - Some modules implement code freezes within a major release, similar to Drupal. Once 7.x-1.0 is released, no new features or API changes will be made under the 1.x branch. Others use each major release instead to indicate a full rewrite and minor releases implement new features and APIs. Is the cost of maintaining multiple frozen branches and matching the Drupal release scheme more valuable than the freedom to add features as they are developed?
 - Modules often list their recommended version as a particular alpha release (see Features). This seems contradictory to me. If a module is in an alpha stage, should it be recommended for common use? These versions should obviously be listed as a supported release, but "alpha" and "recommended" seem to indicate different things to non-developers. An alpha should understandably contain significant bugs and be less tested, while a release candidate should be 95% complete.

Here are a few guidelines I'd like to propose to any module maintainers to follow, so that the community can gain some much-needed consistency -

 - To match Drupal's release numbering, **module should implement a code freeze when a stable release is announced for a branch**. This creates a comfortable way for users to easily update and only get bug fixes and security enhancements without fear of large change.
 - Modules should be numbered according to their sequential branch number, regardless of Drupal versions. If the first release of a module has compatible versions for Drupal 6 and 7, they should both be named version 1.x, but the next release should be 2.x irrespective of the compatible version(s) of Drupal. Simply put, **same numbered versions should imply compatibility**.
 - Only list release candidate or stable releases as recommended versions. This uniformity can help new users better understand the real meaning of [alpha, beta, RC, and stable versions](http://drupal.org/node/467020).
