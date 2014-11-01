---
layout: post
title: Setup Simple SSH-Based Git Hosting
created: 1335922845
permalink: blog/setup-simple-ssh-based-git-hosting
alias: blog/simple-ssh-based-git-hosting
categories: infrastructure
tags: [git, ssh]
---
Unlike Subversion, Git can be hosted using basic files and a simple access method such as SSH. This setup requires only three steps -

Create a dedicated user to host the Git repository -

{% highlight bash %}
# As ‘root’
useradd git
{% endhighlight %}

Add all developers’ SSH public keys to the Git user to enable password-less Git access -

{% highlight bash %}
# As ‘git’
mkdir ~git/.ssh
touch ~git/.ssh/authorized_keys
chmod 700 ~git/.ssh
chmod 600 ~git/.ssh/authorized_keys
cat developer1_key.pub >> ~git/.ssh/authorized_keys
cat developer2_key.pub >> ~git/.ssh/authorized_keys
{% endhighlight %}

Create a Git repository in the new user’s home directory and provide the URL to all developers -

{% highlight bash %}
# As ‘git’
mkdir ~/repo.git
cd ~/repo.git
git init --bare
# Repository can now be accessed at git@hostname:repo.git
{% endhighlight %}

Finally as an added step for security, lock down the git account to prevent any shell access -

{% highlight bash %}
# As 'root'
chsh -s /usr/bin/git-shell git    # Prevent full login for security reasons
{% endhighlight %}
