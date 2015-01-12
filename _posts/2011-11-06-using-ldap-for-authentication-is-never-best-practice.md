---
layout: post
title: Using LDAP for Authentication is Never Best Practice
created: 1320618085
permalink: blog/using-ldap-authentication-never-best-practice
categories: infrastructure
tags: [ldap]
---
Many enterprise clients rely on LDAP as their authentication and authorization provider for their websites. LDAP is used to store all of this information, the infrastructure already exists, so why not use it? There are plenty of reasons. So much so that I don't know if I can ever "recommend" a client directly integrate their web site with LDAP again.

When helping a fellow consultant recently, I was suddenly confused why LDAP is such a common tool. First of all it's a directory service, not a real IAM system. Second it requires a lot to be reimplemented on every client. Third, and maybe most importantly, it relies on each client to respect any permissions on the LDAP server. In any security best practice, do you ever rely on the client to be "secure"?

From a wonderful MSDN article on the subject[^1] -

> Identity and access management refers to the processes, technologies and policies for managing digital identities and controlling how identities can be used to access resources.

LDAP is **not** a full IAM system. It is a user directory that defines who a person **is**. Users are created with group memberships, used to explain where a user belongs in an org structure. There is not a natural translation to what the person can **do**, instead client applications must (loosely) translate these membership into application permissions. Worse, this translation is done by the client and isn't under the control of the IAM administrator, but purely under the discretion of the application developer. Sure the user's authentication can be blocked, but that doesn't solve the problems of limiting or adding permissions, only a binary allow/deny.

A real IAM system should be able to tell a single **application** if a user has access or not. This is the fundamental difference between a directory service and an IAM. Mappings should be done according to the requester, not returning all attributes and letting the application decide what's right. LDAP provides a centralized account repository and shared passwords, nothing more. Each client must configure their own connections and provide in-depth understandings of the LDAP protocol, no matter how advanced the usage is. After this excessive code is run, then the site administrator must configure how to translate the user's attributes into the context of their application.

### Conclusion ###

LDAP is simply not web- or application- friendly. In our distributed web (even within a single organization), any IAM should include SSO, no question. That IAM should be lightweight, rely solely on the logic of the centralized system, and respect the concept of **permissions** over **memberships**. In web applications LDAP is done as far as I'm concerned. LDAP is dead, it's your turn [CAS](http://www.jasig.org/cas), [Shibboleth](http://shibboleth.internet2.edu/), and [OAuth](http://oauth.net/).

**Disclaimer: If you use LDAP within your application for more than just authentication and/or authorization, this doesn't apply to you. This is a complaint about how heavy-handed LDAP is compared to a more web-aware IAM system.**

[^1]: [Identity and Access Management, MSDN](http://msdn.microsoft.com/en-us/library/aa480030.aspx)
