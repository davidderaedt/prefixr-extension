Brackets prefixr extension
===


A small Brackets extension to replace the current CSS text selection with the prefixed result returned by Prefixr.

Prefixr is a service created by Jeffrey Way (from nettuts). More information on the service:
http://prefixr.com/

To install this extension, simply place the ```prefixr``` folder inside the ```brackets/src/extensions/user``` folder, and reload Brackets.

**Compatible with Brackets Sprint10**


Usage
=====
Select some CSS code, and then select "Generate CSS prefixes" from the Edit menu. Your code should then be replaced by the prefixed equivalent.


Known issues
=====

The returned Prefixr code does not include any  indentation.

No feedback is given to the user while waiting for the service response.
