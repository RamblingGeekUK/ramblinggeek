---
title: "HOW TO: Use Powershell to obtain PC Serial Number"
publishDate: 2014-10-30
categories: 
  - "general"
tags: 
  - "powershell"
  - "windows"
  - "archived"
image: ~/assets/images/archived.svg
---

Open powershell and enter the following :

```
(get-wmiobject WIN32\_bios).SerialNumber
```

Which will return the system's serial number registered in the BIOS.

🙂 Enjoy.
