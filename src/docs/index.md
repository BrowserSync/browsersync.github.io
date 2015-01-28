---
layout: "documentation.hbs"
page-label: "docs"
title: "BrowserSync Documentation"
---

Here you can find all the information you'll need to begin using BrowserSync. We have extensive information covering 
command-line usage, the API, Grunt/Gulp integrations and all available options.

{{#loop site.docs-navigation}}
- [{{ this.label }}]({{ this.url }})
{{/loop}}

This site is [open source on Github]({{site.links.site-github}}) & we welcome corrections/improvements.
