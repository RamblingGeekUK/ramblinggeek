---
title: "Windows Home Server"
publishDate: 2008-07-30
categories: 
  - "general"
tags:
  - "archived"
image: ~/assets/images/archived.svg
---

I’ve spent the last couple of evenings playing around with my latest purchase, HP MediaSmart Server.

I’m pretty happy with it, I bought the 1TB version.

I’ve had a few issues with the setup.  The first being that I’m running Vista 64bit and the software (HP and Microsoft) out the box isn’t doesn’t work with 64bit.  There is an update out now…..

So I had to install the HP software on my Laptop which was running Windows Vista 32Bit….  That installed no problem and allowed the configuration of the server and to down the latest updates from HP.

I had to log into the home server via RDP and download the Windows Home Server Power Pack 1, which had the 64 bit connector software. 😊

Once that was installed, I then had to connect to [\\servernamesoftware](//\servernamesoftware) and run the HP software from there and all was OK.

I had to setup remote access on my router as WHS couldn’t configure using uPNP, I’ve never seen uPNP work on any router yet, getting the felling it’s me.

The router I’m using is a D-Link DSL-2740B uPnP still wouldn’t work even with the latest firmware.

So I put the port forwards in and the wizard still would accept that the router was configured correctly and kind of just loops around, would be nice to have a checkbox to for manually configuration and for it to accept it, it just feels a little untidy.

There is a option in the same dialog, Domain, which allows you to have get your own domain or use domainname.homeserver.com, once I did this it all started working OK.

Still says router isn’t configured when it is!

Allworking thou and pretty happy with it thus far.
