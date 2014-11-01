---
layout: post
title: Announcing Entitlements API
created: 1284920519
permalink: blog/announcing-entitlements-api
categories: drupal
---
After several clients requesting this, I've decided to create the [Entitlements API](http://drupal.org/project/entitlements) module. The authentication/authorization framework in Drupal is not very pluggable with external systems. This module attempts to alleviate that pain point.

### What does it do? ###

Entitlements API is designed to build out a pluggable authorization system. On one side, the hooks provide for module to gather user entitlements. On the other side, more hooks provide for modules to consume these entitlements and map them to Drupal content. Currently, there is a submodule to map entitlements to OG memberships. In the future, this could be applied to add access-control on any Drupal structure. For information on the API itself, please read [this](http://drupalcode.org/viewvc/drupal/contributions/modules/entitlements/entitlements.api.php?view=markup).

Because getting a list of entitlements is nearly always a custom development, this module is not really usable without some development. The facility to create this is very simple, so the overhead knowledge is minimal.

### What are the possibilities? ###

Many companies have internal systems, usually related to sales, mapping users and companies to their associated products or permissions. Instead of re-creating this system in Drupal, this module will allow users to simply write the code to associate users with entitlements, then use the group of provided modules to add the access-control functionality you desire.

### Where am I going next? ###

The real power won't be realized until modules are created to map entitlements to other Drupal structures, namely roles, permissions, node access, and user status. All of these are up on the agenda.
